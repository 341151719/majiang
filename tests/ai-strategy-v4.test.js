'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/ai-strategy-v4-ev-patch.js'), 'utf8');

function unique(values) { return [...new Set(values)]; }

function buildContext(modeKey = 'traditional') {
  const context = {
    console, Math, Object, Array, Number, Date, performance,
    modeKey, aiLevelKey: 'advanced',
    state: {
      wall: Array.from({ length: 60 }, (_, index) => index % 34),
      turn: 0, huCount: 0, lastDiscFrom: 2,
      players: [
        { id: 0, hand: [0, 1, 2, 3, 4, 5, 7, 7, 9, 10, 11, 18, 19, 20], melds: [], discards: [], missing: -1, done: false },
        { id: 1, hand: [3, 3, 3, 4, 5, 6, 8, 9, 10, 21, 22, 23, 31], melds: [], discards: [27, 4, 12], missing: -1, done: false },
        { id: 2, hand: [6, 6, 6, 7, 8, 15, 16, 17, 24, 25, 26, 30, 30], melds: [{ type: 'pong', tile: 31 }], discards: [0, 8, 17], missing: -1, done: false },
        { id: 3, hand: [2, 2, 5, 5, 11, 11, 14, 14, 20, 20, 28, 29, 32], melds: [], discards: [2, 11, 20], missing: -1, done: false }
      ]
    },
    mode() { return modeKey === 'sichuan' ? { tileKinds: 27, dingque: true } : { tileKinds: 34, dingque: false }; },
    uniqueTiles: unique,
    removeTile(hand, tile) { const index = hand.indexOf(tile); if (index >= 0) hand.splice(index, 1); },
    advisorProgress(hand, player) {
      if (context.mode().dingque) {
        const debt = hand.filter(tile => Math.floor(tile / 9) === player.missing).length;
        if (debt) return { phase: 'dingque', debt, shanten: null, label: '定缺' };
      }
      const distinct = new Set(hand).size;
      const shanten = distinct <= 8 ? 0 : distinct <= 10 ? 1 : 2;
      return { phase: 'normal', debt: 0, shanten, label: shanten + '向听' };
    },
    advisorUkeire(hand, player, pool) {
      const tiles = [];
      for (let tile = 0; tile < pool.length; tile++) {
        if (!pool[tile]) continue;
        const neighbor = hand.some(value => value < 27 && tile < 27 && Math.floor(value / 9) === Math.floor(tile / 9) && Math.abs(value - tile) <= 2);
        if (neighbor || hand.includes(tile)) tiles.push({ tile, count: pool[tile], next: 0 });
      }
      return { tiles, total: tiles.reduce((sum, item) => sum + item.count, 0) };
    },
    handShapeScore(hand) {
      const counts = new Map(); hand.forEach(tile => counts.set(tile, (counts.get(tile) || 0) + 1));
      let score = 0;
      counts.forEach((count, tile) => {
        if (count >= 2) score += 4;
        if (tile < 27 && (counts.has(tile - 1) || counts.has(tile + 1))) score += 2;
      });
      return score;
    },
    advisorPatternPotential(hand) { return 42 + Math.max(...[0, 1, 2].map(suit => hand.filter(tile => tile < 27 && Math.floor(tile / 9) === suit).length)) * 2; },
    advisorTwoStep(hand) { return 45 + new Set(hand).size; },
    advisorRemainingCounts() { return []; },
    advisorDiscardRisk() { return 0; },
    analyzeDiscardDecision() { return null; },
    aiDiscard() { return 0; }
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(source, context, { filename: 'ai-strategy-v4-ev-patch.js' });
  return context;
}

function roundedRows(context) {
  return context.__redEdgeAiV4.buildDiscardRows(context.state.players[0], false).rows.map(row => ({
    tile: row.tile, raw: +row.raw.toFixed(6), risk: +row.risk.toFixed(6),
    loss: +row.expectedDealLoss.toFixed(6), future: +row.futureEV.toFixed(6), pareto: row.pareto
  }));
}

(function run() {
  const context = buildContext();
  const api = context.__redEdgeAiV4;
  assert.equal(api.version, 'AI Strategy 4.0 / Expected Utility Core');

  const view = api.buildDecisionView(0);
  assert.ok(view.players.every(player => !Object.prototype.hasOwnProperty.call(player, 'hand')), 'public view leaked opponent hand values');
  assert.ok(!Object.prototype.hasOwnProperty.call(view, 'wall'), 'public view leaked wall order');
  assert.equal(view.wallCount, 60);

  const known = Array.from(api.knownCounts(view));
  const remaining = Array.from(api.remainingCounts(view));
  assert.equal(known[31], 3, 'public pong must consume three visible copies');
  assert.equal(remaining[31], 1);
  assert.ok(remaining.every(count => count >= 0 && count <= 4));

  const riskBefore = api.expectedDealLoss(5, 0, view);
  context.state.players[1].discards.push(5);
  const riskAfterSameDiscard = api.expectedDealLoss(5, 0, api.buildDecisionView(0));
  assert.ok(riskAfterSameDiscard.probability > riskBefore.probability * 0.35, 'same discard incorrectly became near-absolute safety');
  assert.ok(riskAfterSameDiscard.expectedLoss > 0, 'risk must include conditional loss, not probability alone');
  context.state.players[1].discards.pop();

  const coldStart = performance.now();
  const firstRows = roundedRows(context);
  const coldMs = performance.now() - coldStart;
  assert.ok(coldMs < 1000, `strategy cold evaluation is unexpectedly slow: ${coldMs.toFixed(2)}ms`);
  context.state.players[1].hand = new Array(13).fill(26);
  context.state.players[2].hand = new Array(13).fill(0);
  context.state.players[3].hand = new Array(13).fill(33);
  context.state.wall = Array.from({ length: 60 }, () => 33);
  const hiddenMutationRows = roundedRows(context);
  assert.deepEqual(hiddenMutationRows, firstRows, 'opponent concealed values or wall order changed a root decision');

  context.state.players[2].discards.push(6);
  const publicMutationRows = roundedRows(context);
  assert.notDeepEqual(publicMutationRows, firstRows, 'public discard failed to update evaluation');

  const built = api.buildDiscardRows(context.state.players[0], true);
  assert.ok(built.rows.length > 1);
  assert.ok(built.rows.some(row => row.pareto), 'Pareto frontier is empty');
  assert.ok(built.rows.every(row => row.score >= 0 && row.score <= 100), 'relative scores escaped 0–100');
  assert.ok(built.rows.some(row => row.sameShantenImprovementMass > 0), 'same-shanten future improvements were not valued');
  assert.ok(built.rows.every(row => Number.isFinite(row.expectedDealLoss) && Number.isFinite(row.offenseEV) && Number.isFinite(row.raw)));

  const synthetic = [
    { progress: { phase: 'normal', shanten: 1 }, offenseEV: 600, futureEV: 650, expectedDealLoss: 120 },
    { progress: { phase: 'normal', shanten: 1 }, offenseEV: 550, futureEV: 620, expectedDealLoss: 180 },
    { progress: { phase: 'normal', shanten: 2 }, offenseEV: 720, futureEV: 760, expectedDealLoss: 40 }
  ];
  const frontier = Array.from(api.paretoFrontier(synthetic));
  assert.ok(frontier.includes(synthetic[0]));
  assert.ok(!frontier.includes(synthetic[1]), 'strictly dominated candidate survived the frontier');
  assert.ok(frontier.includes(synthetic[2]), 'safest/high-value route must remain available');

  const sichuan = buildContext('sichuan');
  const sichuanApi = sichuan.__redEdgeAiV4;
  assert.equal(sichuanApi.currentRuleConfig().multiRon, true);
  assert.equal(sichuanApi.currentRuleConfig().allowChi, false);
  assert.equal(sichuanApi.remainingCounts(sichuanApi.buildDecisionView(0)).length, 27, 'Sichuan mode exposed honor-tile counts');
  sichuan.state.players[0].missing = 0;
  const dingqueRows = sichuanApi.buildDiscardRows(sichuan.state.players[0], false).rows;
  assert.ok(dingqueRows.length > 0 && dingqueRows.every(row => row.tile < 9), 'Sichuan dingque did not constrain legal discards');

  const timings = [];
  for (let iteration = 0; iteration < 12; iteration++) {
    const start = performance.now();
    api.buildDiscardRows(context.state.players[0], false);
    timings.push(performance.now() - start);
  }
  timings.sort((a, b) => a - b);
  const p95 = timings[Math.min(timings.length - 1, Math.ceil(timings.length * 0.95) - 1)];
  assert.ok(p95 < 1000, `strategy benchmark p95 is unexpectedly slow: ${p95.toFixed(2)}ms`);

  console.log('AI Strategy 4.0 tests passed.');
  console.log(JSON.stringify({
    candidates: built.rows.length,
    paretoCandidates: built.rows.filter(row => row.pareto).length,
    sameShantenCandidates: built.rows.filter(row => row.sameShantenImprovementMass > 0).length,
    coldMs: +coldMs.toFixed(3),
    p95Ms: +p95.toFixed(3),
    best: built.rows[0] && {
      tile: built.rows[0].tile,
      netEV: +built.rows[0].raw.toFixed(2),
      offenseEV: +built.rows[0].offenseEV.toFixed(2),
      expectedDealLoss: +built.rows[0].expectedDealLoss.toFixed(2)
    }
  }, null, 2));
})();
