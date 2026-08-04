'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');

const root = path.resolve(__dirname, '..');
const patchSource = fs.readFileSync(path.join(root, 'assets/ai-performance-cache-patch.js'), 'utf8');

function buildContext() {
  const calls = {
    progress: 0,
    ukeire: 0,
    shape: 0,
    pattern: 0,
    bestDiscard: 0,
    twoStep: 0
  };

  const context = {
    console,
    performance,
    Uint8Array,
    Map,
    Object,
    Array,
    Number,
    String,
    Math,
    modeKey: 'sichuan',
    state: {
      gen: 1,
      wall: new Array(52).fill(-1),
      turn: 0,
      huCount: 0,
      lastDiscFrom: -1,
      players: [0, 1, 2, 3].map(id => ({
        id,
        hand: new Array(13).fill(id),
        melds: [],
        discards: [],
        missing: id % 3,
        done: false
      }))
    },
    mode() {
      return { tileKinds: this.modeKey === 'sichuan' ? 27 : 34 };
    },
    advisorRemainingCounts() {
      return new Array(27).fill(4);
    },
    advisorProgress(hand, player, openMelds = player.melds.length) {
      calls.progress++;
      return { phase: 'normal', shanten: hand.length + player.missing + openMelds };
    },
    advisorUkeire(hand, player, pool, openMelds = player.melds.length) {
      calls.ukeire++;
      return { total: hand.length + pool.reduce((a, b) => a + b, 0) + openMelds, tiles: [] };
    },
    handShapeScore(hand) {
      calls.shape++;
      let value = 0;
      for (let repeat = 0; repeat < 1500; repeat++) {
        for (let i = 0; i < hand.length; i++) value = (value + hand[i] * 17 + repeat) % 1000003;
      }
      return value;
    },
    advisorPatternPotential(hand, player, openMelds = player.melds.length) {
      calls.pattern++;
      return hand.length * 3 + player.id + openMelds;
    },
    advisorBestDiscardFast(hand, player, pool, openMelds = player.melds.length) {
      calls.bestDiscard++;
      return { tile: hand[0], raw: pool[0] + player.id + openMelds };
    },
    advisorTwoStep(hand, player, pool, openMelds = player.melds.length) {
      calls.twoStep++;
      return hand.reduce((a, b) => a + b, 0) + pool.reduce((a, b) => a + b, 0) + player.id + openMelds;
    }
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(patchSource, context, { filename: 'ai-performance-cache-patch.js' });
  return { context, calls };
}

(function run() {
  const { context, calls } = buildContext();
  const player = context.state.players[1];
  const hand = [0, 1, 1, 2, 4, 5, 6, 9, 10, 11, 18, 18, 19];
  const reordered = hand.slice().reverse();
  const pool = new Array(27).fill(4);

  const progressA = context.advisorProgress(hand, player, 0);
  const progressB = context.advisorProgress(reordered, player, 0);
  assert.deepEqual(progressB, progressA);
  assert.equal(calls.progress, 1, 'equivalent hands should share progress cache');

  player.missing = 2;
  context.advisorProgress(hand, player, 0);
  assert.equal(calls.progress, 2, 'player missing suit must be part of the key');
  player.missing = 1;

  const ukeireA = context.advisorUkeire(hand, player, pool, 0);
  const ukeireB = context.advisorUkeire(reordered, player, pool.slice(), 0);
  assert.deepEqual(ukeireB, ukeireA);
  assert.equal(calls.ukeire, 1, 'equivalent pool vectors should share ukeire cache');

  const changedPool = pool.slice();
  changedPool[3] = 2;
  context.advisorUkeire(hand, player, changedPool, 0);
  assert.equal(calls.ukeire, 2, 'pool changes must invalidate ukeire cache');

  const firstTwoStep = context.advisorTwoStep(hand, player, pool, 0);
  const secondTwoStep = context.advisorTwoStep(reordered, player, pool.slice(), 0);
  assert.equal(secondTwoStep, firstTwoStep);
  assert.equal(calls.twoStep, 1, 'stable public state should reuse two-step result');

  context.state.players[2].hand[0] = 8;
  context.advisorTwoStep(hand, player, pool, 0);
  assert.equal(calls.twoStep, 1, 'opponent concealed tile values must not enter the cache key');

  context.state.players[1].hand[0] = 8;
  context.advisorTwoStep(hand, player, pool, 0);
  assert.equal(calls.twoStep, 2, 'the viewer own concealed hand must enter the state-dependent key');

  context.state.players[2].discards.push(7);
  context.advisorTwoStep(hand, player, pool, 0);
  assert.equal(calls.twoStep, 3, 'public discard changes must invalidate two-step cache');

  context.state.gen = 2;
  context.advisorProgress(hand, player, 0);
  assert.equal(calls.progress, 3, 'new round generation must clear round-scoped caches');

  const before = performance.now();
  for (let i = 0; i < 100; i++) context.handShapeScore(i % 2 ? hand : reordered);
  const elapsed = performance.now() - before;
  assert.equal(calls.shape, 1, 'expensive shape calculation should execute once for equivalent hands');
  const repeatedShapeCalls = calls.shape;

  const stats = context.__getAIPerformanceCacheStats();
  assert.equal(stats.version, 'AI Performance Cache 1.0');
  assert.ok(stats.caches.shape.hits >= 99);
  for (const cache of Object.values(stats.caches)) {
    assert.ok(cache.entries <= cache.limit, 'cache must remain bounded');
  }

  const benchmark = context.__benchmarkAIPerformanceCache(3);
  assert.equal(benchmark.ok, true);
  assert.equal(benchmark.iterations, 3);
  assert.ok(benchmark.stats.caches.shape.hits >= 3);

  context.__resetAIPerformanceCaches();
  const resetStats = context.__getAIPerformanceCacheStats();
  for (const cache of Object.values(resetStats.caches)) assert.equal(cache.entries, 0);

  console.log('AI performance cache tests passed.');
  console.log(JSON.stringify({
    shapeCalls: repeatedShapeCalls,
    repeatedShapeEvaluations: 100,
    benchmarkMs: +elapsed.toFixed(3),
    cacheStats: stats.caches
  }, null, 2));
})();
