/* Red Edge AI Strategy 4.0 — expected-utility discard core.
   This incremental P0/P1 patch keeps the proven shanten/rule implementation,
   but replaces mixed risk percentages and raw ukeire counts with rule-scoped,
   public-information expected utility. */
(function () {
  'use strict';

  const VERSION = 'AI Strategy 4.0 / Expected Utility Core';
  const RULE_CONFIGS = Object.freeze({
    sichuan: Object.freeze({
      id: 'sichuan', tileCopies: 4, allowChi: false, multiRon: true,
      repeatDiscardEvidence: 0.72, baseWinPoints: 1850, baseDealLoss: 1450,
      riskTailWeight: 0.18
    }),
    traditional: Object.freeze({
      id: 'traditional', tileCopies: 4, allowChi: true, multiRon: false,
      repeatDiscardEvidence: 0.52, baseWinPoints: 1550, baseDealLoss: 1350,
      riskTailWeight: 0.14
    })
  });
  const memoStats = { riskHits: 0, riskMisses: 0, futureHits: 0, futureMisses: 0 };
  const riskMemo = new Map();
  const futureMemo = new Map();

  function boundedMemo(map, key, factory, limit, hitKey, missKey) {
    if (map.has(key)) { memoStats[hitKey]++; return map.get(key); }
    memoStats[missKey]++;
    const value = factory();
    if (map.size >= limit) map.delete(map.keys().next().value);
    map.set(key, value);
    return value;
  }

  function currentRuleConfig() {
    const key = typeof modeKey === 'string' ? modeKey : 'traditional';
    return RULE_CONFIGS[key] || RULE_CONFIGS.traditional;
  }

  function cloneMeld(meld) {
    return { type: meld.type, tile: meld.tile, tiles: Array.isArray(meld.tiles) ? meld.tiles.slice() : null };
  }

  function publicPlayer(player) {
    return {
      id: player.id, missing: player.missing, done: !!player.done,
      handCount: Array.isArray(player.hand) ? player.hand.length : 0,
      discards: (player.discards || []).slice(), melds: (player.melds || []).map(cloneMeld)
    };
  }

  function buildDecisionView(pid) {
    if (typeof state === 'undefined' || !state || !state.players || !state.players[pid]) return null;
    const own = state.players[pid];
    return Object.freeze({
      viewer: pid,
      modeKey: typeof modeKey === 'string' ? modeKey : 'traditional',
      wallCount: Array.isArray(state.wall) ? state.wall.length : 0,
      turn: state.turn, huCount: state.huCount, lastDiscFrom: state.lastDiscFrom,
      ownHand: Object.freeze(own.hand.slice()),
      ownMelds: Object.freeze(own.melds.map(cloneMeld)),
      ownMissing: own.missing,
      players: Object.freeze(state.players.map(player => Object.freeze(publicPlayer(player))))
    });
  }

  function viewKey(view) {
    if (!view) return 'none';
    return [
      view.modeKey, view.viewer, view.wallCount, view.turn, view.huCount, view.lastDiscFrom,
      view.ownHand.slice().sort((a, b) => a - b).join('.'),
      view.ownMelds.map(meld => meld.type + ':' + (meld.tiles || [meld.tile]).join('.')).join(','),
      view.players.map(player => [
        player.id, player.missing, player.done ? 1 : 0, player.handCount,
        player.discards.join('.'),
        player.melds.map(meld => meld.type + ':' + (meld.tiles || [meld.tile]).join('.')).join(',')
      ].join(':')).join('/')
    ].join('#');
  }

  function structuralKinds() {
    try { return mode().tileKinds; } catch (_) { return 34; }
  }

  function meldTileCount(meld, tile) {
    if (meld.type === 'chi') return (meld.tiles || []).filter(value => value === tile).length;
    if (meld.tile !== tile) return 0;
    return meld.type === 'pong' ? 3 : 4;
  }

  function knownCounts(view) {
    const kinds = structuralKinds();
    const result = new Array(kinds).fill(0);
    if (!view) return result;
    view.ownHand.forEach(tile => { if (tile >= 0 && tile < kinds) result[tile]++; });
    view.players.forEach(player => {
      player.discards.forEach(tile => { if (tile >= 0 && tile < kinds) result[tile]++; });
      player.melds.forEach(meld => {
        for (let tile = 0; tile < kinds; tile++) result[tile] += meldTileCount(meld, tile);
      });
    });
    return result;
  }

  function remainingCounts(view, config = currentRuleConfig()) {
    return knownCounts(view).map(count => Math.max(0, config.tileCopies - count));
  }

  function suitOf(tile) { return tile < 27 ? Math.floor(tile / 9) : 3; }
  function bounded(value, low, high) { return Math.max(low, Math.min(high, value)); }

  function opponentTileEstimate(opponent, tile, view, config) {
    if (opponent.done) return { probability: 0, conditionalLoss: 0 };
    if (view.modeKey === 'sichuan' && opponent.missing === suitOf(tile)) {
      return { probability: 0, conditionalLoss: 0 };
    }

    const startWall = structuralKinds() * config.tileCopies - 52;
    const late = 1 - bounded(view.wallCount / Math.max(1, startWall), 0, 1);
    const rankBase = tile < 27
      ? [0.036, 0.052, 0.069, 0.084, 0.094, 0.084, 0.069, 0.052, 0.036][tile % 9]
      : 0.048;
    const known = knownCounts(view)[tile] || 0;
    const calls = opponent.melds.length;
    let probability = rankBase * (0.72 + late * 0.72 + calls * 0.18);
    probability *= Math.max(0.16, 1 - known * 0.205);

    // Neither teaching ruleset implements permanent furiten. A prior identical
    // discard is evidence of lower risk, never the old near-zero hard-coded 0.08.
    if (opponent.discards.includes(tile)) probability *= config.repeatDiscardEvidence;
    if (tile < 27) {
      const sameSuitRecent = opponent.discards.slice(-7).filter(value => value < 27 && suitOf(value) === suitOf(tile)).length;
      probability *= bounded(1 - sameSuitRecent * 0.035, 0.70, 1);
      const claimedNearby = opponent.melds.some(meld => {
        const tiles = meld.type === 'chi' ? (meld.tiles || []) : [meld.tile];
        return tiles.some(value => value < 27 && suitOf(value) === suitOf(tile) && Math.abs(value % 9 - tile % 9) <= 2);
      });
      if (claimedNearby) probability *= 1.14;
    }
    probability = bounded(probability, 0, 0.72);

    const centrality = tile < 27 ? 1 - Math.abs(4 - tile % 9) / 8 : 0.32;
    const conditionalLoss = config.baseDealLoss * (1 + calls * 0.38 + late * 0.52 + centrality * 0.12);
    return { probability, conditionalLoss };
  }

  function expectedDealLoss(tile, pid, view = buildDecisionView(pid), config = currentRuleConfig()) {
    if (!view) return { probability: 0, expectedLoss: 0, cvarLoss: 0, opponents: [] };
    const key = viewKey(view) + '|' + config.id + '|' + tile;
    return boundedMemo(riskMemo, key, () => {
      const opponents = view.players
        .filter(player => player.id !== pid && !player.done)
        .map(player => ({ player: player.id, ...opponentTileEstimate(player, tile, view, config) }));
      const safeProbability = opponents.reduce((product, item) => product * (1 - item.probability), 1);
      const probability = 1 - safeProbability;
      const weightedLoss = opponents.reduce((sum, item) => sum + item.probability * item.conditionalLoss, 0);
      const probabilityMass = opponents.reduce((sum, item) => sum + item.probability, 0);
      const expectedLoss = config.multiRon
        ? weightedLoss
        : probability * (probabilityMass ? weightedLoss / probabilityMass : 0);
      const worstLoss = opponents.reduce((maximum, item) => Math.max(maximum, item.conditionalLoss), 0);
      return {
        probability: bounded(probability, 0, 1),
        expectedLoss,
        cvarLoss: probability * worstLoss,
        opponents
      };
    }, 1024, 'riskHits', 'riskMisses');
  }

  function legalDiscards(hand, player) {
    let values = uniqueTiles(hand);
    try {
      if (mode().dingque) {
        const missing = values.filter(tile => suitOf(tile) === player.missing);
        if (missing.length) values = missing;
      }
    } catch (_) { }
    return values;
  }

  function leafEstimate(hand, player, pool, openMelds, view, config) {
    const progress = advisorProgress(hand, player, openMelds);
    const ukeire = advisorUkeire(hand, player, pool, openMelds);
    const shape = handShapeScore(hand);
    const potential = advisorPatternPotential(hand, player, openMelds);
    if (progress.phase === 'dingque') {
      return {
        progress, ukeire, shape, potential,
        offenseEV: -progress.debt * 720 + shape * 3,
        reachProbability: 0
      };
    }
    if (progress.shanten < 0) {
      return { progress, ukeire, shape, potential, offenseEV: config.baseWinPoints * (1 + potential / 210), reachProbability: 1 };
    }
    const unknown = Math.max(1, pool.reduce((sum, count) => sum + count, 0));
    const drawRate = bounded(ukeire.total / unknown, 0, 1);
    const activePlayers = Math.max(1, view.players.filter(item => !item.done).length);
    const horizon = bounded(Math.floor(view.wallCount / activePlayers), 2, 7);
    const oneLayerReach = 1 - Math.pow(1 - drawRate, horizon);
    const reachProbability = Math.pow(oneLayerReach, 1 + progress.shanten * 0.78);
    const offenseEV = config.baseWinPoints * reachProbability * (0.78 + potential / 240) + shape * 2.2;
    return { progress, ukeire, shape, potential, offenseEV, reachProbability };
  }

  // Search leaves intentionally omit a second ukeire expansion. The first draw
  // and every legal continuation discard are exact; the bounded leaf combines
  // exact shanten with shape/pattern features to prevent a combinatorial third ply.
  function quickLeafEstimate(hand, player, openMelds, config) {
    const progress = advisorProgress(hand, player, openMelds);
    const shape = handShapeScore(hand);
    const potential = advisorPatternPotential(hand, player, openMelds);
    if (progress.phase === 'dingque') return { progress, shape, potential, offenseEV: -progress.debt * 720 + shape * 3 };
    if (progress.shanten < 0) return { progress, shape, potential, offenseEV: config.baseWinPoints * (1 + potential / 210) };
    const phaseValue = [0.58, 0.30, 0.14, 0.065, 0.028][Math.min(4, Math.max(0, progress.shanten))];
    return { progress, shape, potential, offenseEV: config.baseWinPoints * phaseValue * (0.82 + potential / 260) + shape * 2.4 };
  }

  function weightedFutureValue(hand, player, pool, openMelds, view, config) {
    const key = viewKey(view) + '|' + player.id + '|' + player.missing + '|' + openMelds + '|' +
      hand.slice().sort((a, b) => a - b).join('.') + '|' + pool.join('.');
    return boundedMemo(futureMemo, key, () => {
      const base = quickLeafEstimate(hand, player, openMelds, config);
      const totalUnknown = pool.reduce((sum, count) => sum + count, 0);
      if (!totalUnknown) return { expectedEV: base.offenseEV, deltaEV: 0, sameShantenImprovementMass: 0, drawTypes: 0 };
      let expectedEV = 0;
      let sameShantenImprovementMass = 0;
      let drawTypes = 0;
      for (let tile = 0; tile < pool.length; tile++) {
        const copies = pool[tile] || 0;
        if (!copies) continue;
        drawTypes++;
        const drawn = hand.concat([tile]);
        let best = null;
        legalDiscards(drawn, player).forEach(discard => {
          const next = drawn.slice();
          removeTile(next, discard);
          const leaf = quickLeafEstimate(next, player, openMelds, config);
          const loss = expectedDealLoss(discard, player.id, view, config);
          const netEV = leaf.offenseEV - loss.expectedLoss * 0.42;
          if (!best || netEV > best.netEV) best = { netEV, leaf };
        });
        const value = best ? best.netEV : base.offenseEV;
        expectedEV += copies / totalUnknown * value;
        if (best && base.progress.phase === 'normal' && best.leaf.progress.phase === 'normal' &&
            best.leaf.progress.shanten === base.progress.shanten && best.leaf.offenseEV > base.offenseEV + 1) {
          sameShantenImprovementMass += copies;
        }
      }
      return { expectedEV, deltaEV: expectedEV - base.offenseEV, sameShantenImprovementMass, drawTypes };
    }, 768, 'futureHits', 'futureMisses');
  }

  function riskLambda(progress, view) {
    if (!progress || progress.phase !== 'normal') return 0.9;
    const startWall = structuralKinds() * currentRuleConfig().tileCopies - 52;
    const late = 1 - bounded(view.wallCount / Math.max(1, startWall), 0, 1);
    return bounded(0.92 - Math.max(0, 2 - progress.shanten) * 0.17 + late * 0.16, 0.42, 1.08);
  }

  function dominates(a, b) {
    const ash = a.progress.phase === 'normal' ? a.progress.shanten : 20 + a.progress.debt;
    const bsh = b.progress.phase === 'normal' ? b.progress.shanten : 20 + b.progress.debt;
    const noWorse = ash <= bsh && a.offenseEV >= b.offenseEV &&
      a.futureEV >= b.futureEV && a.expectedDealLoss <= b.expectedDealLoss;
    const strictlyBetter = ash < bsh || a.offenseEV > b.offenseEV ||
      a.futureEV > b.futureEV || a.expectedDealLoss < b.expectedDealLoss;
    return noWorse && strictlyBetter;
  }

  function paretoFrontier(rows) {
    const frontier = rows.filter(row => !rows.some(other => other !== row && dominates(other, row)));
    if (!rows.length) return frontier;
    const shanten = Math.min(...rows.map(row => row.progress.phase === 'normal' ? row.progress.shanten : 20 + row.progress.debt));
    const bestShantenRoute = rows
      .filter(row => (row.progress.phase === 'normal' ? row.progress.shanten : 20 + row.progress.debt) === shanten)
      .reduce((best, row) => !best || row.offenseEV + row.futureEV - row.expectedDealLoss > best.offenseEV + best.futureEV - best.expectedDealLoss ? row : best, null);
    const mandatory = [
      bestShantenRoute,
      rows.reduce((best, row) => !best || row.expectedDealLoss < best.expectedDealLoss ? row : best, null),
      rows.reduce((best, row) => !best || row.offenseEV > best.offenseEV ? row : best, null)
    ].filter(Boolean);
    return Array.from(new Set(frontier.concat(mandatory)));
  }

  function buildDiscardRows(player, deep) {
    const view = buildDecisionView(player.id);
    const config = currentRuleConfig();
    const pool = remainingCounts(view, config);
    let rows = legalDiscards(player.hand, player).map(tile => {
      const next = player.hand.slice();
      removeTile(next, tile);
      const leaf = leafEstimate(next, player, pool, player.melds.length, view, config);
      const future = weightedFutureValue(next, player, pool, player.melds.length, view, config);
      const loss = expectedDealLoss(tile, player.id, view, config);
      const lambda = riskLambda(leaf.progress, view);
      const tailPenalty = config.riskTailWeight * loss.cvarLoss;
      const raw = leaf.offenseEV + future.deltaEV * 0.72 - lambda * loss.expectedLoss - tailPenalty;
      return {
        type: 'discard', tile, progress: leaf.progress, ukeire: leaf.ukeire,
        shape: bounded(45 + leaf.shape * 1.8, 0, 100), potential: leaf.potential,
        risk: loss.probability * 100, expectedDealLoss: loss.expectedLoss,
        cvarLoss: loss.cvarLoss, offenseEV: leaf.offenseEV,
        futureEV: future.expectedEV, futureDeltaEV: future.deltaEV,
        sameShantenImprovementMass: future.sameShantenImprovementMass,
        riskLambda: lambda, twoStep: 0, mc: 0, raw, pareto: false
      };
    });

    const frontier = paretoFrontier(rows);
    frontier.forEach(row => { row.pareto = true; });
    if (deep && typeof advisorTwoStep === 'function') {
      rows.forEach(row => {
        const next = player.hand.slice(); removeTile(next, row.tile);
        row.twoStep = advisorTwoStep(next, player, pool, player.melds.length);
        row.raw += (row.twoStep - 50) * 1.1;
      });
    }
    rows.sort((a, b) => Number(b.pareto) - Number(a.pareto) || b.raw - a.raw || a.expectedDealLoss - b.expectedDealLoss);
    const bestRaw = rows.length ? rows[0].raw : 0;
    const spread = Math.max(20, Math.abs(bestRaw) * 0.08);
    rows.forEach((row, index) => {
      row.rank = index + 1;
      row.score = Math.round(bounded(100 - (bestRaw - row.raw) / spread * 18, 0, 100));
    });
    return { rows, pool, view, config, frontier: frontier.map(row => row.tile) };
  }

  function chooseRow(player, rows) {
    if (!rows.length) return player.hand[0];
    const eligible = rows.filter(row => row.pareto);
    const pool = eligible.length ? eligible : rows;
    const best = pool[0];
    if (typeof aiLevelKey === 'string' && aiLevelKey === 'advanced') return best.tile;
    const tolerance = aiLevelKey === 'beginner' ? 90 : 28;
    const near = pool.filter(row => row.progress.phase === best.progress.phase &&
      row.progress.shanten === best.progress.shanten && best.raw - row.raw <= tolerance);
    if (near.length <= 1) return best.tile;
    const temperature = aiLevelKey === 'beginner' ? 42 : 18;
    const weights = near.map(row => Math.exp((row.raw - best.raw) / temperature));
    const sum = weights.reduce((total, value) => total + value, 0);
    let cursor = Math.random() * sum;
    for (let index = 0; index < near.length; index++) {
      cursor -= weights[index];
      if (cursor <= 0) return near[index].tile;
    }
    return best.tile;
  }

  advisorRemainingCounts = function (viewer) {
    const pid = viewer && Number.isInteger(viewer.id) ? viewer.id : 0;
    return remainingCounts(buildDecisionView(pid), currentRuleConfig());
  };
  advisorDiscardRisk = function (tile, pid = 0) {
    return expectedDealLoss(tile, pid).probability * 100;
  };
  analyzeDiscardDecision = function (deep = false) {
    if (typeof state === 'undefined' || !state) return null;
    const player = state.players[0];
    const built = buildDiscardRows(player, deep);
    return {
      kind: 'discard', deep, rows: built.rows, pool: built.pool,
      progress: advisorProgress(player.hand, player),
      currentUkeire: advisorUkeire(player.hand, player, built.pool),
      best: built.rows[0] || null, engine: VERSION,
      ruleConfig: built.config, paretoTiles: built.frontier
    };
  };
  aiDiscard = function (player) {
    const built = buildDiscardRows(player, typeof aiLevelKey === 'string' && aiLevelKey === 'advanced');
    const tile = chooseRow(player, built.rows);
    window.__lastComputerAiDecision = {
      version: VERSION, player: player.id, tile,
      rows: built.rows.slice(0, 7).map(row => ({
        tile: row.tile, rank: row.rank, raw: +row.raw.toFixed(2), pareto: row.pareto,
        shanten: row.progress.shanten, ukeire: row.ukeire.total,
        risk: +row.risk.toFixed(2), expectedDealLoss: +row.expectedDealLoss.toFixed(2),
        offenseEV: +row.offenseEV.toFixed(2), futureDeltaEV: +row.futureDeltaEV.toFixed(2),
        sameShantenImprovementMass: row.sameShantenImprovementMass
      })),
      publicView: built.view, ruleConfig: built.config, ts: Date.now()
    };
    return tile;
  };

  const api = Object.freeze({
    version: VERSION, ruleConfigs: RULE_CONFIGS, currentRuleConfig,
    buildDecisionView, knownCounts, remainingCounts, expectedDealLoss,
    leafEstimate, weightedFutureValue, paretoFrontier, buildDiscardRows,
    cacheStats: () => ({ ...memoStats, riskEntries: riskMemo.size, futureEntries: futureMemo.size })
  });
  window.__redEdgeAiV4 = api;
  window.__redEdgeAiPatchVersion = VERSION;

  try {
    const previousRenderAdvisor = renderAdvisor;
    renderAdvisor = function () {
      previousRenderAdvisor();
      const note = document.querySelector('#advisorPanel .advisor-note');
      if (note) note.textContent = 'AI Strategy 4.0：按规则配置计算公开剩余牌；精确枚举下一摸与最佳续打，同向听牌形改善也计入未来价值；防守使用放铳概率 × 条件损失并加入尾部损失，而不是固定危险百分比。候选按向听、进攻、未来价值与期望损失保留 Pareto 前沿。输入仍不含对手暗手或真实牌墙顺序。';
    };
  } catch (_) { }
})();
