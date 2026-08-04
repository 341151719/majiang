// Extracted from the original self-contained HTML.


/* ===== Red Edge AI Strategy Patch v3.0 — public-information-only decision core ===== */
(function(){
'use strict';
const PATCH_VERSION='AI Strategy 3.1 / Public Behavior Inference';
window.__redEdgeAiPatchVersion=PATCH_VERSION;

/* Difficulty now changes depth/variance, not basic Mahjong competence. */
try{
  Object.assign(AI_LEVELS.beginner,{desc:'基础牌效正确，仅在接近等价候选中保留少量随机性',randomness:.9,useUkeire:true,useSafety:false});
  Object.assign(AI_LEVELS.standard,{desc:'精确向听/有效牌 + 吃碰舍牌行为推断 + 公开信息风险',randomness:.08,useUkeire:true,useSafety:true});
  Object.assign(AI_LEVELS.advanced,{desc:'两巡改良搜索 + 对手公开行为画像 + 自适应攻守',randomness:0,useUkeire:true,useSafety:true});
}catch(_){ }

function aiCloneMeld(m){return {type:m.type,tile:m.tile,tiles:m.tiles?m.tiles.slice():null};}
function aiPublicPlayer(p){return {id:p.id,missing:p.missing,done:!!p.done,discards:p.discards.slice(),melds:p.melds.map(aiCloneMeld),handCount:p.hand.length};}
function aiBuildDecisionView(pid){
  if(!state||!state.players||!state.players[pid])return null;
  const own=state.players[pid];
  return Object.freeze({
    viewer:pid,modeKey,wallCount:state.wall.length,turn:state.turn,huCount:state.huCount,lastDiscFrom:state.lastDiscFrom,
    ownHand:Object.freeze(own.hand.slice()),ownMelds:Object.freeze(own.melds.map(aiCloneMeld)),ownMissing:own.missing,
    players:Object.freeze(state.players.map(q=>Object.freeze(aiPublicPlayer(q))))
  });
}
window.__getAIPublicDecisionView=pid=>aiBuildDecisionView(Number.isInteger(pid)?pid:0);

function aiKnownCountsFromView(view){
  const k=new Array(mode().tileKinds).fill(0); if(!view)return k;
  view.ownHand.forEach(t=>{if(t>=0&&t<k.length)k[t]++;});
  view.players.forEach(q=>{
    q.discards.forEach(t=>{if(t>=0&&t<k.length)k[t]++;});
    q.melds.forEach(m=>{
      if(m.type==='chi'&&m.tiles)m.tiles.forEach(t=>{if(t>=0&&t<k.length)k[t]++;});
      else if(Number.isInteger(m.tile)&&m.tile>=0&&m.tile<k.length)k[m.tile]+=m.type==='pong'?3:4;
    });
  });
  return k.map(x=>Math.min(4,x));
}
function aiPoolFromView(view){return aiKnownCountsFromView(view).map(x=>Math.max(0,4-x));}

/* Replace shared known-count helper with the same explicit information boundary. */
advisorKnownCounts=function(viewer){
  if(!state||!viewer)return new Array(mode().tileKinds).fill(0);
  const v=aiBuildDecisionView(viewer.id);
  return aiKnownCountsFromView(v);
};
advisorRemainingCounts=function(viewer){return advisorKnownCounts(viewer).map(x=>Math.max(0,4-x));};

/* Stronger structure heuristic. It only measures the viewer's own concealed hand. */
handShapeScore=function(hand){
  const c=counts(hand),n=c.length; let score=0;
  for(let t=0;t<n;t++){
    const ct=c[t]; if(!ct)continue;
    if(ct>=2)score+=4.9; if(ct>=3)score+=5.7; if(ct===4)score+=.8;
    if(t<27){
      const r=t%9,s0=t-r;
      const left1=r>0?c[t-1]:0,right1=r<8?c[t+1]:0,left2=r>1?c[t-2]:0,right2=r<7?c[t+2]:0;
      score+=2.85*Math.min(ct,right1)+1.28*Math.min(ct,right2);
      if(left1&&right1)score+=1.2*Math.min(ct,left1,right1);
      const connected=left1||right1||left2||right2||ct>=2;
      if(!connected)score-=(r===0||r===8)?1.15:1.6;
      if(ct===1&&(r===0||r===8)&&!(left1||right1||right2||left2))score-=.35;
    }else{
      if(ct===1)score-=3.15;       // isolated honor is deliberately disposable
      else if(ct===2)score+=1.65;  // honor pair still has real set value
      else if(ct>=3)score+=3.6;
    }
  }
  return score;
};

advisorPatternPotential=function(hand,p,openMelds=p.melds.length){
  const c=counts(hand),pairs=c.filter(x=>x>=2).length,trips=c.filter(x=>x>=3).length;
  const suited=[0,1,2].map(s=>hand.filter(t=>t<27&&tileSuit(t)===s).length),totalSuited=suited.reduce((a,b)=>a+b,0),maxSuit=Math.max(0,...suited);
  const isolatedHonors=hand.filter((t,i,a)=>t>=27&&a.filter(x=>x===t).length===1).length;
  let score=42+pairs*2.8+trips*4.2-isolatedHonors*2.4;
  if(totalSuited){const concentration=maxSuit/totalSuited; if(concentration>.62)score+=(concentration-.62)*28;}
  if(openMelds===0&&pairs>=4)score+=7;
  if(modeKey==='sichuan'&&maxSuit>=8)score+=4;
  return clamp(score,0,100);
};

/* Public behavior model. Scores come only from the ordered public discard river,
   exposed chi/pong/kong groups and declared missing suit. They are tendencies,
   never reconstructed concealed tiles. */
function aiPublicOpponentProfile(op){
  const suitIntent=[0,0,0],rankIntent=new Array(9).fill(0),claims=[];
  const discards=op&&op.discards||[],melds=op&&op.melds||[];
  discards.forEach((t,i)=>{
    if(t>=27)return;
    const recency=.35+.65*(i+1)/Math.max(1,discards.length),s=tileSuit(t),r=t%9;
    suitIntent[s]-=.34+.58*recency; rankIntent[r]-=.10+.20*recency;
  });
  melds.forEach(m=>{
    const tiles=m.type==='chi'?(m.tiles||[]):new Array(m.type==='pong'?3:4).fill(m.tile);
    const weight=m.type==='chi'?1.0:(m.type==='pong'?1.28:1.48);
    tiles.forEach(t=>{if(t<27){suitIntent[tileSuit(t)]+=weight;rankIntent[t%9]+=weight*.24;}});
    claims.push({type:m.type,tile:m.tile,tiles:tiles.slice()});
  });
  if(mode().dingque&&Number.isInteger(op.missing)&&op.missing>=0&&op.missing<3)suitIntent[op.missing]-=8;
  const preferredSuit=suitIntent.indexOf(Math.max(...suitIntent)),avoidedSuit=suitIntent.indexOf(Math.min(...suitIntent));
  const spread=Math.max(...suitIntent)-Math.min(...suitIntent),confidence=clamp(melds.length*.22+Math.min(.34,discards.length*.018)+spread*.025,0,.92);
  return {player:op.id,suitIntent,rankIntent,preferredSuit,avoidedSuit,confidence,claims,recentDiscards:discards.slice(-6)};
}
function aiPublicIntentForTile(op,tile){
  const profile=aiPublicOpponentProfile(op); let multiplier=1,directClaim=false,nearClaim=false;
  if(tile<27){
    const s=tileSuit(tile),r=tile%9,mean=profile.suitIntent.reduce((a,b)=>a+b,0)/3;
    multiplier*=clamp(1+(profile.suitIntent[s]-mean)*.055*profile.confidence,.58,1.62);
    profile.claims.forEach(c=>{
      const exposed=c.tiles.filter(x=>x<27&&tileSuit(x)===s);
      if(exposed.some(x=>x===tile)){directClaim=true;multiplier*=c.type==='pong'?1.62:1.08;}
      else if(exposed.some(x=>Math.abs((x%9)-r)<=2)){nearClaim=true;multiplier*=1.10;}
    });
    const recentSame=profile.recentDiscards.filter(x=>x<27&&tileSuit(x)===s).length;
    if(recentSame>=3)multiplier*=.82;else if(recentSame===0&&profile.preferredSuit===s&&profile.claims.length)multiplier*=1.13;
  }else{
    profile.claims.forEach(c=>{if(c.tile===tile){directClaim=true;multiplier*=c.type==='pong'?1.58:1.10;}});
  }
  return {multiplier:clamp(multiplier,.45,2.25),directClaim,nearClaim,profile};
}
window.__inferOpponentPublicIntent=function(pid,tile=null){
  if(!state||!state.players[pid])return null;
  return Number.isInteger(tile)?aiPublicIntentForTile(aiPublicPlayer(state.players[pid]),tile):aiPublicOpponentProfile(aiPublicPlayer(state.players[pid]));
};

function aiThreatFromPublicPlayer(op,view){
  if(!op||op.done)return 0;
  const startWall=mode().tileKinds*4-52,late=1-clamp(view.wallCount/Math.max(1,startWall),0,1);
  const callThreat=op.melds.reduce((n,m)=>n+(m.type==='chi'?.12:(m.type==='pong'?.16:.20)),0);
  const profile=aiPublicOpponentProfile(op);
  return clamp(.10+late*.32+callThreat+Math.min(.18,op.discards.length*.01)+profile.confidence*.045,0,.94);
}
function aiPublicDiscardRisk(tile,pid,view=aiBuildDecisionView(pid)){
  if(!view)return 0;
  const known=aiKnownCountsFromView(view)[tile]||0; let combinedSafe=1;
  view.players.forEach(op=>{
    if(op.id===pid||op.done)return;
    if(mode().dingque&&op.missing===tileSuit(tile))return;
    let base=tile<27?([.20,.31,.45,.58,.64,.58,.45,.31,.20][tile%9]):.28;
    base*=Math.max(.10,1-known*.205);
    if(op.discards.includes(tile))base*=.08; // simplified furiten-style safety cue for this teaching game
    if(tile<27){
      const s=tileSuit(tile),same=op.discards.filter(x=>x<27&&tileSuit(x)===s).length;
      base*=clamp(1-same*.035,.64,1);
    }else{
      const publicCopies=view.players.reduce((n,q)=>n+q.discards.filter(x=>x===tile).length+q.melds.reduce((a,m)=>a+(m.type==='chi'?(m.tiles||[]).filter(x=>x===tile).length:(m.tile===tile?(m.type==='pong'?3:4):0)),0),0);
      base*=clamp(1-publicCopies*.24,.12,1);
    }
    /* What this opponent called and the order of what they discarded now changes
       the tile-specific risk, rather than merely counting the number of melds. */
    base*=aiPublicIntentForTile(op,tile).multiplier;
    const r=clamp(base*aiThreatFromPublicPlayer(op,view),0,.88); combinedSafe*=1-r;
  });
  return clamp((1-combinedSafe)*100,0,100);
}
advisorDiscardRisk=function(tile,pid=0){return aiPublicDiscardRisk(tile,pid,aiBuildDecisionView(pid));};

function aiPositionEval(hand,p,pool,openMelds=p.melds.length,view=aiBuildDecisionView(p.id)){
  const pr=advisorProgress(hand,p,openMelds),uk=advisorUkeire(hand,p,pool,openMelds),shape=handShapeScore(hand),potential=advisorPatternPotential(hand,p,openMelds);
  let value;
  if(pr.phase==='dingque') value=-240-pr.debt*115+shape*.45;
  else{
    const sh=pr.shanten;
    value=-(Math.max(-1,sh))*112 + uk.total*1.72 + shape*.82 + potential*.07;
    if(sh===0)value+=24; if(sh<0)value+=220;
  }
  return {value,progress:pr,ukeire:uk,shape,potential};
}

function aiDefenseWeight(progress,view,pid,useSafety=true){
  if(!useSafety||!view||progress.phase!=='normal')return 0;
  const startWall=mode().tileKinds*4-52,late=1-clamp(view.wallCount/Math.max(1,startWall),0,1);
  const maxThreat=Math.max(0,...view.players.filter(x=>x.id!==pid).map(x=>aiThreatFromPublicPlayer(x,view)));
  const sh=Math.max(0,progress.shanten);
  const base=sh<=1?.08:.025;
  return base+late*(sh<=1?.22:.10)+maxThreat*(sh<=1?.10:.045);
}

advisorBestDiscardFast=function(hand,p,pool,openMelds=p.melds.length){
  const view=aiBuildDecisionView(p.id); let cand=uniqueTiles(hand);
  if(mode().dingque){const miss=cand.filter(t=>tileSuit(t)===p.missing);if(miss.length)cand=miss;}
  let best=null;
  cand.forEach(t=>{
    const h=hand.slice();removeTile(h,t);const ev=aiPositionEval(h,p,pool,openMelds,view);const risk=aiPublicDiscardRisk(t,p.id,view);
    const raw=ev.value-risk*aiDefenseWeight(ev.progress,view,p.id,true);
    if(!best||raw>best.raw)best={tile:t,raw,progress:ev.progress,ukeire:ev.ukeire};
  });
  return best;
};

/* Bounded two-step search: exact first-order ukeire for every candidate, then at most 8 high-value draw types.
   This keeps deep analysis responsive on Android WebView without reverting to a shape-only shortcut. */
advisorTwoStep=function(hand,p,pool,openMelds=p.melds.length){
  const prog=advisorProgress(hand,p,openMelds);if(prog.phase==='dingque')return 0;
  const uk0=advisorUkeire(hand,p,pool,openMelds),baseShape=handShapeScore(hand),have=new Set(uk0.tiles.map(x=>x.tile));
  const primary=uk0.tiles.map(x=>({tile:x.tile,count:x.count,priority:(x.count||0)*4+(prog.shanten-(x.next??prog.shanten))*18})).sort((a,b)=>b.priority-a.priority).slice(0,8);
  const improves=[];
  for(let t=0;t<mode().tileKinds;t++){if(!pool[t]||have.has(t))continue;const gain=handShapeScore(hand.concat([t]))-baseShape;if(gain>1.3)improves.push({tile:t,count:pool[t],gain,priority:gain*(pool[t]||0)});}
  improves.sort((a,b)=>b.priority-a.priority);const candidates=primary.concat(improves.slice(0,2));
  let totalWeight=0,acc=0;
  for(const x of candidates){
    const t=x.tile,n=x.count||pool[t];if(!n)continue;const h=hand.concat([t]),np=advisorProgress(h,p,openMelds);let v;
    if(np.phase==='normal'&&np.shanten<0)v=100;
    else{const p2=pool.slice();p2[t]=Math.max(0,p2[t]-1);const b=advisorBestDiscardFast(h,p,p2,openMelds);if(!b)v=0;else{const h2=h.slice();removeTile(h2,b.tile);const pr=advisorProgress(h2,p,openMelds),uk=advisorUkeire(h2,p,p2,openMelds);v=clamp(78-Math.max(0,pr.shanten)*20+Math.min(30,uk.total*1.35),0,100);}}
    totalWeight+=n;acc+=n*v;
  }
  /* Unsampled improvement mass is represented by the exact one-step state instead of silently treated as zero. */
  const sampled=candidates.reduce((n,x)=>n+(x.count||0),0),all=Math.max(sampled,uk0.total);
  if(all>sampled){const fallback=clamp(70-Math.max(0,prog.shanten)*18+Math.min(28,uk0.total*1.1),0,100);acc+=(all-sampled)*fallback;totalWeight+=(all-sampled);}
  return totalWeight?acc/totalWeight:0;
};

function aiBuildDiscardRows(p,deep=false){
  const view=aiBuildDecisionView(p.id),pool=aiPoolFromView(view); let candidates=uniqueTiles(p.hand);
  if(mode().dingque){const miss=candidates.filter(t=>tileSuit(t)===p.missing);if(miss.length)candidates=miss;}
  let rows=candidates.map(t=>{
    const next=p.hand.slice();removeTile(next,t);const ev=aiPositionEval(next,p,pool,p.melds.length,view);const risk=aiPublicDiscardRisk(t,p.id,view);
    const reads=view.players.filter(op=>op.id!==p.id&&!op.done).map(op=>({player:op.id,...aiPublicIntentForTile(op,t)})).sort((a,b)=>b.multiplier-a.multiplier);
    return {type:'discard',tile:t,progress:ev.progress,ukeire:ev.ukeire,shape:clamp(45+ev.shape*1.8,0,100),potential:ev.potential,risk,publicRead:reads[0]||null,twoStep:0,mc:0,baseValue:ev.value};
  });
  if(deep){
    rows.forEach(r=>{const next=p.hand.slice();removeTile(next,r.tile);r.twoStep=advisorTwoStep(next,p,pool,p.melds.length);});
    /* Every candidate gets the same-size deterministic simulation budget. No "top-3 gets MC, everyone else gets a bad fallback" bias. */
    const iters=2;
    rows.forEach(r=>{const next=p.hand.slice();removeTile(next,r.tile);const seed=((r.tile+1)*2654435761 + view.wallCount*97 + p.discards.length*131 + p.hand.reduce((a,b)=>a*33+b+1,17))>>>0;r.mc=advisorMonteCarlo(next,p,pool,seed,p.melds.length,iters,2);});
    normalizeDeepMetric(rows,'twoStep');normalizeDeepMetric(rows,'mc');
  }else rows.forEach(r=>{r.twoStepNorm=50;r.mcNorm=50;});
  rows.forEach(r=>{
    const defense=aiDefenseWeight(r.progress,view,p.id,aiCfg().useSafety!==false);
    r.raw=r.baseValue-r.risk*defense+(deep?(r.twoStepNorm-50)*.16+(r.mcNorm-50)*.045:0);
  });
  rows.sort((a,b)=>b.raw-a.raw||a.risk-b.risk||b.ukeire.total-a.ukeire.total);
  const bestRaw=rows[0]?rows[0].raw:0;
  rows.forEach((r,i)=>{r.rank=i+1;r.score=Math.round(clamp(100-(bestRaw-r.raw)*1.55,35,100));});
  return {rows,pool,view};
}

analyzeDiscardDecision=function(deep=false){
  if(!state)return null;const p=state.players[0],built=aiBuildDiscardRows(p,deep),rows=built.rows,pool=built.pool;
  return {kind:'discard',deep,rows,pool,progress:advisorProgress(p.hand,p),currentUkeire:advisorUkeire(p.hand,p,pool),best:rows[0]||null,engine:PATCH_VERSION};
};

/* Deep snapshots contain no opponent concealed tiles and no real wall order. */
captureAdvisorSnapshot=function(){
  if(!state)return null;
  const players=state.players.map(p=>({
    id:p.id,hand:p.id===0?p.hand.slice():[],hiddenCount:p.id===0?0:p.hand.length,
    melds:p.melds.map(m=>({...m,tiles:m.tiles?m.tiles.slice():undefined})),discards:p.discards.slice(),missing:p.missing,done:p.done,
    huInfo:p.huInfo?{...p.huInfo,tags:(p.huInfo.tags||[]).slice()}:null,lastDraw:p.id===0?p.lastDraw:null
  }));
  return Object.freeze({modeKey,gen:state.gen,state:{wall:new Array(state.wall.length).fill(-1),players,turn:state.turn,huCount:state.huCount,lastDiscFrom:state.lastDiscFrom,awaitDiscard:null,gen:state.gen}});
};

function aiBestPostCall(hand,p,openMelds,pool,view){
  let cand=uniqueTiles(hand);if(mode().dingque){const miss=cand.filter(t=>tileSuit(t)===p.missing);if(miss.length)cand=miss;}
  let best=null;
  cand.forEach(t=>{const h=hand.slice();removeTile(h,t);const ev=aiPositionEval(h,p,pool,openMelds,view);const risk=aiPublicDiscardRisk(t,p.id,view);const raw=ev.value-risk*aiDefenseWeight(ev.progress,view,p.id,true);if(!best||raw>best.raw)best={tile:t,raw,...ev,risk};});
  return best;
}
bestPostCallValue=function(hand,p,openMelds,pool){const view=aiBuildDecisionView(p.id),best=aiBestPostCall(hand,p,openMelds,pool,view);return best?best.raw:-999;};

function aiClaimEvaluations(p,tile,chiOpts){
  const view=aiBuildDecisionView(p.id),pool=aiPoolFromView(view),base=aiPositionEval(p.hand,p,pool,p.melds.length,view);
  const closedFlex=(modeKey==='traditional'&&p.melds.length===0)?5:1.5;
  const pass={action:'pass',raw:base.value+closedFlex,reason:'保留门前结构；等待下一次摸牌，不为开口支付结构代价',progress:base.progress,ukeire:base.ukeire};
  const out={pass,chi:null,pong:null,gang:null,bestChiOption:null,bestChiDiscard:null};
  const c=p.hand.filter(x=>x===tile).length;
  if(c>=2){
    const h=p.hand.slice();removeTile(h,tile);removeTile(h,tile);const post=aiBestPostCall(h,p,p.melds.length+1,pool,view);
    if(post){
      let raw=post.raw-(modeKey==='traditional'?6.5:3.0);
      const bs=base.progress.phase==='normal'?base.progress.shanten:9,ps=post.progress.phase==='normal'?post.progress.shanten:9;
      if(ps<bs)raw+=(bs-ps)*22; else if(ps>bs)raw-=(ps-bs)*38;
      if(ps===bs&&post.ukeire.total<base.ukeire.total*.72)raw-=8;
      if(tile>=27)raw+=2.5;
      out.pong={action:'pong',raw,post,reason:'碰后先验：'+post.progress.label+'，最佳续打 '+tileName(post.tile)+'，进张 '+post.ukeire.total+'；已计开口与灵活性代价'};
    }
  }
  const opts=chiOpts||getChiOptions(p,tile);
  if(opts&&opts.length){
    opts.forEach(o=>{
      const h=p.hand.slice();o.need.forEach(x=>removeTile(h,x));const post=aiBestPostCall(h,p,p.melds.length+1,pool,view);if(!post)return;
      let raw=post.raw-(modeKey==='traditional'?8.0:4.0);
      const bs=base.progress.phase==='normal'?base.progress.shanten:9,ps=post.progress.phase==='normal'?post.progress.shanten:9;
      if(ps<bs)raw+=(bs-ps)*24; else if(ps>bs)raw-=(ps-bs)*42;
      if(ps===bs&&post.ukeire.total<base.ukeire.total*.78)raw-=7;
      const item={action:'chi',raw,post,option:o,reason:'吃 '+o.tiles.map(tileName).join('·')+' 后最佳续打 '+tileName(post.tile)+'；'+post.progress.label+'，进张 '+post.ukeire.total+'，已计开口代价'};
      if(!out.chi||item.raw>out.chi.raw){out.chi=item;out.bestChiOption=o;out.bestChiDiscard=post.tile;}
    });
  }
  if(c>=3&&state.wall.length>0){
    const h=p.hand.slice();for(let i=0;i<3;i++)removeTile(h,tile);const ev=aiPositionEval(h,p,pool,p.melds.length+1,view);
    let raw=ev.value+(state.wall.length>12?8:3)+(modeKey==='sichuan'?4:2)-3;
    if(base.progress.phase==='normal'&&ev.progress.phase==='normal'&&ev.progress.shanten>base.progress.shanten)raw-=32*(ev.progress.shanten-base.progress.shanten);
    out.gang={action:'gang',raw,reason:'明杠按公开牌池估算补牌收益与杠分；不读取下一张牌'};
  }
  return out;
}

analyzeActionDecision=function(ctx){
  if(!state||!ctx)return null;const p=state.players[0],rows=[],opts=ctx.opts||[],evals=aiClaimEvaluations(p,ctx.tile,ctx.chiOpts);
  opts.forEach(a=>{
    if(a==='hu')rows.push({type:'action',action:a,raw:999,reason:'已满足胡牌条件，规则允许时优先胡牌'});
    else if(a==='pass')rows.push({type:'action',...evals.pass});
    else if(a==='pong'&&evals.pong)rows.push({type:'action',...evals.pong});
    else if(a==='chi'&&evals.chi)rows.push({type:'action',...evals.chi});
    else if(a==='gang'){
      let g=evals.gang;
      if(!g&&ctx.type==='self'){
        const tile=(ctx.angangs&&ctx.angangs[0])??(ctx.bugangs&&ctx.bugangs[0]);
        const pool=aiPoolFromView(aiBuildDecisionView(0)),base=aiPositionEval(p.hand,p,pool,p.melds.length,aiBuildDecisionView(0));
        g={action:'gang',raw:base.value+(state.wall.length>10?10:3),reason:'自杠：按杠分与未知补牌的期望收益估算；不会读取补牌内容'};
        if(tile==null)g.raw=-999;
      }
      if(g)rows.push({type:'action',...g});
    }
  });
  rows.sort((a,b)=>b.raw-a.raw);const finite=rows.filter(r=>r.action!=='hu'&&Number.isFinite(r.raw)&&Math.abs(r.raw)<900),bestFinite=finite.length?finite[0].raw:0,secondFinite=finite.length>1?finite[1].raw:bestFinite-12;
  const actionConfidence=82+clamp((bestFinite-secondFinite)*.40,0,17);
  rows.forEach((r,i)=>{r.rank=i+1;r.score=r.action==='hu'?100:Math.round(clamp(actionConfidence-(bestFinite-r.raw)*1.05,35,99));});
  const view=aiBuildDecisionView(0),pool=aiPoolFromView(view);
  return {kind:'action',rows,best:rows[0]||null,context:ctx,progress:advisorProgress(p.hand,p),currentUkeire:advisorUkeire(p.hand,p,pool),engine:PATCH_VERSION};
};

advisorReason=function(r){
  if(r.type==='action')return r.reason;
  const parts=[];if(r.progress.phase==='dingque')parts.push('定缺剩'+r.progress.debt+'张');else parts.push(r.progress.label);
  parts.push('有效牌 '+r.ukeire.total+'枚');
  if(r.risk<12)parts.push('公开信息风险低');else if(r.risk>38)parts.push('公开信息风险偏高');
  if(r.publicRead&&r.publicRead.multiplier>1.28)parts.push('对手吃碰/舍牌轨迹显示对此牌偏好');
  else if(r.publicRead&&r.publicRead.multiplier<.76)parts.push('对手近期舍牌显示对此类牌偏弱');
  if(r.twoStepNorm>=67)parts.push('两巡改良优');if(r.progress.phase==='normal'&&r.progress.shanten>=2&&r.tile>=27)parts.push('优先清理孤立字牌');
  return parts.join(' · ');
};

function aiChooseFromRows(p,rows){
  if(!rows.length)return p.hand[0];const best=rows[0];
  if(aiLevelKey==='advanced')return best.tile;
  if(aiLevelKey==='standard'){
    const near=rows.filter(r=>r.progress.phase===best.progress.phase&&r.progress.shanten===best.progress.shanten&&best.raw-r.raw<=1.4);
    return (near.length>1&&Math.random()<.10)?near[Math.floor(Math.random()*near.length)].tile:best.tile;
  }
  /* Beginner may vary only among strategically close, same-shanten choices. It cannot randomly throw a whole shanten. */
  const near=rows.filter(r=>r.progress.phase===best.progress.phase&&r.progress.shanten===best.progress.shanten&&best.raw-r.raw<=5.0);
  if(near.length<=1)return best.tile;
  const weights=near.map(r=>Math.exp((r.raw-best.raw)/2.2)),sum=weights.reduce((a,b)=>a+b,0);let x=Math.random()*sum;
  for(let i=0;i<near.length;i++){x-=weights[i];if(x<=0)return near[i].tile;}return best.tile;
}

aiDiscard=function(p){
  const built=aiBuildDiscardRows(p,false);
  /* Advanced opponents get a bounded two-step tie-break only on the four best exact-efficiency candidates. */
  if(aiLevelKey==='advanced'&&built.rows.length>1){
    const finalists=built.rows.slice(0,Math.min(4,built.rows.length));
    finalists.forEach(r=>{const h=p.hand.slice();removeTile(h,r.tile);r.twoStep=advisorTwoStep(h,p,built.pool,p.melds.length);r.raw+=r.twoStep*.055;});
    built.rows.sort((a,b)=>b.raw-a.raw||a.risk-b.risk);const top=built.rows[0].raw;built.rows.forEach((r,i)=>{r.rank=i+1;r.score=Math.round(clamp(100-(top-r.raw)*1.55,35,100));});
  }
  const tile=aiChooseFromRows(p,built.rows);
  const publicView=aiBuildDecisionView(p.id);
  window.__lastComputerAiDecision={version:PATCH_VERSION,player:p.id,tile,rows:built.rows.slice(0,5).map(r=>({tile:r.tile,rank:r.rank,raw:+r.raw.toFixed(2),shanten:r.progress.shanten,ukeire:r.ukeire.total,risk:+r.risk.toFixed(1),publicRead:r.publicRead?{player:r.publicRead.player,multiplier:+r.publicRead.multiplier.toFixed(2),directClaim:r.publicRead.directClaim,nearClaim:r.publicRead.nearClaim}:null,twoStep:r.twoStep?+r.twoStep.toFixed(1):0})),opponentProfiles:publicView.players.filter(op=>op.id!==p.id).map(aiPublicOpponentProfile),publicView,ts:Date.now()};
  return tile;
};

bestChi=function(p,tile,opts){
  const ev=aiClaimEvaluations(p,tile,opts);return ev.bestChiOption||opts[0]||null;
};
function aiAcceptClaim(item,pass,kind){
  if(!item)return false;const delta=item.raw-pass.raw;
  if(aiLevelKey==='advanced')return delta>(kind==='chi'?1.8:1.0);
  if(aiLevelKey==='standard')return delta>(kind==='chi'?.8:.2);
  if(delta>3)return true;if(delta<-1.5)return false;return Math.random()<clamp(.42+delta*.10,.18,.72);
}
aiWantsPong=function(p,tile){const ev=aiClaimEvaluations(p,tile,null);return aiAcceptClaim(ev.pong,ev.pass,'pong');};
aiWantsChi=function(p,tile,opts){if(!opts||!opts.length)return false;const ev=aiClaimEvaluations(p,tile,opts);return aiAcceptClaim(ev.chi,ev.pass,'chi');};
aiWantsGang=function(p){
  if(!state||state.wall.length<5)return false;
  const lastFrom=state.lastDiscFrom,claimTile=(lastFrom>=0&&state.players[lastFrom]&&state.players[lastFrom].discards.length)?state.players[lastFrom].discards[state.players[lastFrom].discards.length-1]:null;
  if(Number.isInteger(claimTile)&&p.hand.filter(x=>x===claimTile).length>=3){const ev=aiClaimEvaluations(p,claimTile,null);if(ev.gang)return ev.gang.raw>ev.pass.raw+(aiLevelKey==='advanced'?0: -1);}
  const c=counts(p.hand),four=c.some(x=>x===4),bu=p.melds.some(m=>m.type==='pong'&&p.hand.includes(m.tile));
  if(!(four||bu))return false;
  const late=state.wall.length<10;if(late&&aiLevelKey==='advanced')return false;
  return true;
};

/* Strict anti-cheat audit: no opponent concealed tile values and no wall order can enter a decision snapshot/view. */
window.__auditAIInformationBoundary=function(pid=1){
  const view=aiBuildDecisionView(pid),snap=captureAdvisorSnapshot();
  const opponentHandsAbsent=!!view&&view.players.every(q=>!('hand' in q));
  const viewHasNoWallOrder=!!view&&!('wall' in view)&&Number.isInteger(view.wallCount);
  const snapshotOpponentHandsSanitized=!!snap&&snap.state.players.every(q=>q.id===0||Array.isArray(q.hand)&&q.hand.length===0);
  const snapshotWallSanitized=!!snap&&snap.state.wall.every(x=>x===-1);
  return {ok:opponentHandsAbsent&&viewHasNoWallOrder&&snapshotOpponentHandsSanitized&&snapshotWallSanitized,version:PATCH_VERSION,checks:{opponentHandsAbsent,viewHasNoWallOrder,snapshotOpponentHandsSanitized,snapshotWallSanitized},view,snapshotSummary:snap?{wallLength:snap.state.wall.length,opponentHiddenCounts:snap.state.players.filter(q=>q.id!==0).map(q=>q.hiddenCount)}:null};
};

/* Wrapper updates the explanatory footer without changing the visual system. */
try{
  const oldRenderAdvisor=renderAdvisor;
  renderAdvisor=function(){oldRenderAdvisor();const note=document.querySelector('#advisorPanel .advisor-note');if(note)note.textContent='AI Strategy 3.1：精确向听与有效牌为主轴；吃碰会搜索开口后的最佳舍牌。AI 现会根据每家已公开的吃/碰/杠具体牌、弃牌先后和近期舍牌转向建立花色/牌张偏好画像，并将它纳入舍牌风险。决策输入仍严格限定为：自己手牌 + 全部公开弃牌/副露/定缺/牌墙剩余张数；不读取对手暗手，也不读取真实牌墙顺序。';};
}catch(_){ }

window.__runAIStrategyDiagnostics=function(){
  const info=window.__auditAIInformationBoundary(1);
  let human=null,computer=null;
  try{if(state){human=state.players[0]?aiBuildDiscardRows(state.players[0],false).rows.slice(0,4).map(r=>({tile:tileName(r.tile),shanten:r.progress.shanten,ukeire:r.ukeire.total,score:r.score})):null;computer=state.players[1]?aiBuildDiscardRows(state.players[1],false).rows.slice(0,4).map(r=>({tile:tileName(r.tile),shanten:r.progress.shanten,ukeire:r.ukeire.total})):null;}}catch(e){return {ok:false,version:PATCH_VERSION,informationBoundary:info,error:String(e&&e.stack||e)};}
  return {ok:info.ok,version:PATCH_VERSION,informationBoundary:info,humanTop:human,computerTop:computer,advisorMode:advisor.mode};
};
})();
