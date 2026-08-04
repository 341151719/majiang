// Bounded memoization for repeated AI evaluation work.
// Loaded after ai-strategy-v3-public-info-patch.js.
(function () {
  'use strict';

  const PATCH_VERSION = 'AI Performance Cache 1.0';
  if (window.__redEdgeAiPerformancePatchVersion === PATCH_VERSION) return;

  const CACHE_LIMITS = Object.freeze({
    progress: 4096,
    ukeire: 2048,
    shape: 4096,
    pattern: 4096,
    bestDiscard: 768,
    twoStep: 512
  });

  class BoundedMemo {
    constructor(limit) {
      this.limit = limit;
      this.values = new Map();
      this.hits = 0;
      this.misses = 0;
      this.evictions = 0;
    }

    getOrCreate(key, factory) {
      if (this.values.has(key)) {
        this.hits++;
        return this.values.get(key);
      }
      this.misses++;
      const value = factory();
      if (this.values.size >= this.limit) {
        this.values.delete(this.values.keys().next().value);
        this.evictions++;
      }
      this.values.set(key, value);
      return value;
    }

    clear() {
      this.values.clear();
    }

    snapshot() {
      return {
        entries: this.values.size,
        limit: this.limit,
        hits: this.hits,
        misses: this.misses,
        evictions: this.evictions,
        hitRate: this.hits + this.misses
          ? +(this.hits / (this.hits + this.misses)).toFixed(4)
          : 0
      };
    }
  }

  const caches = Object.fromEntries(
    Object.entries(CACHE_LIMITS).map(([name, limit]) => [name, new BoundedMemo(limit)])
  );

  let activeScope = '';

  function currentModeKey() {
    return typeof modeKey === 'string' ? modeKey : 'unknown';
  }

  function currentTileKinds() {
    try {
      return typeof mode === 'function' && mode() ? mode().tileKinds : 34;
    } catch (_) {
      return 34;
    }
  }

  function roundScope() {
    const generation = typeof state !== 'undefined' && state ? state.gen : 'none';
    return currentModeKey() + '|' + generation;
  }

  function ensureScope() {
    const next = roundScope();
    if (next === activeScope) return;
    activeScope = next;
    Object.values(caches).forEach(cache => cache.clear());
  }

  function countKey(values, kinds = currentTileKinds()) {
    const counts = new Uint8Array(kinds);
    if (values) {
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (Number.isInteger(value) && value >= 0 && value < kinds) counts[value]++;
      }
    }
    return String.fromCharCode.apply(null, counts);
  }

  function vectorKey(values, kinds = currentTileKinds()) {
    const vector = new Uint8Array(kinds);
    if (values) {
      const length = Math.min(kinds, values.length);
      for (let i = 0; i < length; i++) vector[i] = values[i] || 0;
    }
    return String.fromCharCode.apply(null, vector);
  }

  function playerKey(player, openMelds) {
    const id = player && Number.isInteger(player.id) ? player.id : -1;
    const missing = player && Number.isInteger(player.missing) ? player.missing : -1;
    const meldCount = Number.isInteger(openMelds)
      ? openMelds
      : player && Array.isArray(player.melds)
        ? player.melds.length
        : 0;
    const melds = player && Array.isArray(player.melds)
      ? player.melds.slice(0, meldCount).map(meldKey).join(',')
      : '';
    return id + '|' + missing + '|' + meldCount + '|' + melds;
  }

  function meldKey(meld) {
    if (!meld) return '';
    return meld.type + ':' + (Array.isArray(meld.tiles) ? meld.tiles.join('.') : meld.tile);
  }

  function publicStateKey(viewerId) {
    if (typeof state === 'undefined' || !state) return 'no-state';
    const players = Array.isArray(state.players) ? state.players : [];
    const aiLevel = typeof aiLevelKey === 'string' ? aiLevelKey : 'unknown';
    return [
      currentModeKey(),
      aiLevel,
      state.gen,
      Array.isArray(state.wall) ? state.wall.length : 0,
      state.turn,
      state.huCount,
      state.lastDiscFrom,
      players.map(player => [
        player.id,
        player.missing,
        player.done ? 1 : 0,
        player.id === viewerId ? countKey(player.hand) : (Array.isArray(player.hand) ? player.hand.length : 0),
        Array.isArray(player.discards) ? player.discards.join('.') : '',
        Array.isArray(player.melds) ? player.melds.map(meldKey).join(',') : ''
      ].join(':')).join('/')
    ].join('#');
  }

  function memo(cacheName, key, factory) {
    ensureScope();
    return caches[cacheName].getOrCreate(key, factory);
  }

  if (typeof advisorProgress === 'function') {
    const original = advisorProgress;
    advisorProgress = function (hand, player, openMelds) {
      const key = currentModeKey() + '|' + playerKey(player, openMelds) + '|' + countKey(hand);
      return memo('progress', key, () => original.apply(this, arguments));
    };
  }

  if (typeof advisorUkeire === 'function') {
    const original = advisorUkeire;
    advisorUkeire = function (hand, player, pool, openMelds) {
      const key = currentModeKey() + '|' + playerKey(player, openMelds) + '|' + countKey(hand) + '|' + vectorKey(pool);
      return memo('ukeire', key, () => original.apply(this, arguments));
    };
  }

  if (typeof handShapeScore === 'function') {
    const original = handShapeScore;
    handShapeScore = function (hand) {
      const key = currentModeKey() + '|' + countKey(hand);
      return memo('shape', key, () => original.apply(this, arguments));
    };
  }

  if (typeof advisorPatternPotential === 'function') {
    const original = advisorPatternPotential;
    advisorPatternPotential = function (hand, player, openMelds) {
      const key = currentModeKey() + '|' + playerKey(player, openMelds) + '|' + countKey(hand);
      return memo('pattern', key, () => original.apply(this, arguments));
    };
  }

  if (typeof advisorBestDiscardFast === 'function') {
    const original = advisorBestDiscardFast;
    advisorBestDiscardFast = function (hand, player, pool, openMelds) {
      const key = publicStateKey(player && player.id) + '|' + playerKey(player, openMelds) + '|' + countKey(hand) + '|' + vectorKey(pool);
      return memo('bestDiscard', key, () => original.apply(this, arguments));
    };
  }

  if (typeof advisorTwoStep === 'function') {
    const original = advisorTwoStep;
    advisorTwoStep = function (hand, player, pool, openMelds) {
      const key = publicStateKey(player && player.id) + '|' + playerKey(player, openMelds) + '|' + countKey(hand) + '|' + vectorKey(pool);
      return memo('twoStep', key, () => original.apply(this, arguments));
    };
  }

  function reset() {
    activeScope = roundScope();
    Object.values(caches).forEach(cache => cache.clear());
  }

  function stats() {
    return {
      version: PATCH_VERSION,
      scope: activeScope || roundScope(),
      caches: Object.fromEntries(
        Object.entries(caches).map(([name, cache]) => [name, cache.snapshot()])
      )
    };
  }


  function now() {
    return typeof performance !== 'undefined' && performance && typeof performance.now === 'function'
      ? performance.now()
      : Date.now();
  }

  function benchmark(iterations = 5) {
    if (typeof state === 'undefined' || !state || !Array.isArray(state.players) || !state.players[0]) {
      return { ok: false, version: PATCH_VERSION, reason: '请先开始一局牌。' };
    }
    const player = state.players[0];
    if (typeof advisorRemainingCounts !== 'function') {
      return { ok: false, version: PATCH_VERSION, reason: 'advisorRemainingCounts 不可用。' };
    }
    const pool = advisorRemainingCounts(player);
    const hand = player.hand.slice();
    const rounds = Math.max(1, Math.min(50, Number(iterations) || 5));
    const evaluate = () => {
      advisorProgress(hand, player, player.melds.length);
      advisorUkeire(hand, player, pool, player.melds.length);
      handShapeScore(hand);
      advisorPatternPotential(hand, player, player.melds.length);
      if (typeof advisorTwoStep === 'function') advisorTwoStep(hand, player, pool, player.melds.length);
    };

    reset();
    const coldStart = now();
    evaluate();
    const coldMs = now() - coldStart;
    const warmStart = now();
    for (let i = 0; i < rounds; i++) evaluate();
    const warmAverageMs = (now() - warmStart) / rounds;
    return {
      ok: true,
      version: PATCH_VERSION,
      iterations: rounds,
      coldMs: +coldMs.toFixed(3),
      warmAverageMs: +warmAverageMs.toFixed(3),
      observedSpeedup: warmAverageMs > 0 ? +(coldMs / warmAverageMs).toFixed(2) : null,
      stats: stats()
    };
  }

  window.__redEdgeAiPerformancePatchVersion = PATCH_VERSION;
  window.__resetAIPerformanceCaches = reset;
  window.__getAIPerformanceCacheStats = stats;
  window.__benchmarkAIPerformanceCache = benchmark;
})();
