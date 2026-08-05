// Extracted from the original self-contained HTML.


const SUITC = ['万','条','筒'];
const NUMC  = ['一','二','三','四','五','六','七','八','九'];
const HONORC = ['东','南','西','北','中','发','白'];
const COLORS = ['#c0392b','#1e8449','#2471a3'];
const PORTRAITS = ["assets/images/embedded-027.png","assets/images/embedded-028.png","assets/images/embedded-029.png","assets/images/embedded-030.png"];
const TILE_THEMES = {
  ivory:{name:'宫廷象牙',ext:'png'},
  brocade:{name:'锦绣繁章',ext:'webp'},
  'radical-max':{name:'\u938f金万象',ext:'webp'},
  deconstruct:{name:'断界构成',ext:'webp'},
  'radical-deconstruct':{name:'碎界宣言',ext:'webp'},
  constructivist:{name:'红星构成',ext:'webp'},
  'radical-constructivist':{name:'赤潮先锋',ext:'webp'}
};
const EMBEDDED_TILE_ASSETS = {"ivory":["assets/images/embedded-031.png","assets/images/embedded-032.png","assets/images/embedded-033.png","assets/images/embedded-034.png","assets/images/embedded-035.png","assets/images/embedded-036.png","assets/images/embedded-037.png","assets/images/embedded-038.png","assets/images/embedded-039.png","assets/images/embedded-040.png","assets/images/embedded-041.png","assets/images/embedded-042.png","assets/images/embedded-043.png","assets/images/embedded-044.png","assets/images/embedded-045.png","assets/images/embedded-046.png","assets/images/embedded-047.png","assets/images/embedded-048.png","assets/images/embedded-049.png","assets/images/embedded-050.png","assets/images/embedded-051.png","assets/images/embedded-052.png","assets/images/embedded-053.png","assets/images/embedded-054.png","assets/images/embedded-055.png","assets/images/embedded-056.png","assets/images/embedded-057.png","assets/images/embedded-058.png","assets/images/embedded-059.png","assets/images/embedded-060.png","assets/images/embedded-061.png","assets/images/embedded-062.png","assets/images/embedded-063.png","assets/images/embedded-064.png"],"brocade":["assets/images/embedded-065.webp","assets/images/embedded-066.webp","assets/images/embedded-067.webp","assets/images/embedded-068.webp","assets/images/embedded-069.webp","assets/images/embedded-070.webp","assets/images/embedded-071.webp","assets/images/embedded-072.webp","assets/images/embedded-073.webp","assets/images/embedded-074.webp","assets/images/embedded-075.webp","assets/images/embedded-076.webp","assets/images/embedded-077.webp","assets/images/embedded-078.webp","assets/images/embedded-079.webp","assets/images/embedded-080.webp","assets/images/embedded-081.webp","assets/images/embedded-082.webp","assets/images/embedded-083.webp","assets/images/embedded-084.webp","assets/images/embedded-085.webp","assets/images/embedded-086.webp","assets/images/embedded-087.webp","assets/images/embedded-088.webp","assets/images/embedded-089.webp","assets/images/embedded-090.webp","assets/images/embedded-091.webp","assets/images/embedded-092.webp","assets/images/embedded-093.webp","assets/images/embedded-094.webp","assets/images/embedded-095.webp","assets/images/embedded-096.webp","assets/images/embedded-097.webp","assets/images/embedded-098.webp"],"radical-max":["assets/images/embedded-099.webp","assets/images/embedded-100.webp","assets/images/embedded-101.webp","assets/images/embedded-102.webp","assets/images/embedded-103.webp","assets/images/embedded-104.webp","assets/images/embedded-105.webp","assets/images/embedded-106.webp","assets/images/embedded-107.webp","assets/images/embedded-108.webp","assets/images/embedded-109.webp","assets/images/embedded-110.webp","assets/images/embedded-111.webp","assets/images/embedded-112.webp","assets/images/embedded-113.webp","assets/images/embedded-114.webp","assets/images/embedded-115.webp","assets/images/embedded-116.webp","assets/images/embedded-117.webp","assets/images/embedded-118.webp","assets/images/embedded-119.webp","assets/images/embedded-120.webp","assets/images/embedded-121.webp","assets/images/embedded-122.webp","assets/images/embedded-123.webp","assets/images/embedded-124.webp","assets/images/embedded-125.webp","assets/images/embedded-126.webp","assets/images/embedded-127.webp","assets/images/embedded-128.webp","assets/images/embedded-129.webp","assets/images/embedded-130.webp","assets/images/embedded-131.webp","assets/images/embedded-132.webp"],"deconstruct":["assets/images/embedded-133.webp","assets/images/embedded-134.webp","assets/images/embedded-135.webp","assets/images/embedded-136.webp","assets/images/embedded-137.webp","assets/images/embedded-138.webp","assets/images/embedded-139.webp","assets/images/embedded-140.webp","assets/images/embedded-141.webp","assets/images/embedded-142.webp","assets/images/embedded-143.webp","assets/images/embedded-144.webp","assets/images/embedded-145.webp","assets/images/embedded-146.webp","assets/images/embedded-147.webp","assets/images/embedded-148.webp","assets/images/embedded-149.webp","assets/images/embedded-150.webp","assets/images/embedded-151.webp","assets/images/embedded-152.webp","assets/images/embedded-153.webp","assets/images/embedded-154.webp","assets/images/embedded-155.webp","assets/images/embedded-156.webp","assets/images/embedded-157.webp","assets/images/embedded-158.webp","assets/images/embedded-159.webp","assets/images/embedded-160.webp","assets/images/embedded-161.webp","assets/images/embedded-162.webp","assets/images/embedded-163.webp","assets/images/embedded-164.webp","assets/images/embedded-165.webp","assets/images/embedded-166.webp"],"radical-deconstruct":["assets/images/embedded-167.webp","assets/images/embedded-168.webp","assets/images/embedded-169.webp","assets/images/embedded-170.webp","assets/images/embedded-171.webp","assets/images/embedded-172.webp","assets/images/embedded-173.webp","assets/images/embedded-174.webp","assets/images/embedded-175.webp","assets/images/embedded-176.webp","assets/images/embedded-177.webp","assets/images/embedded-178.webp","assets/images/embedded-179.webp","assets/images/embedded-180.webp","assets/images/embedded-181.webp","assets/images/embedded-182.webp","assets/images/embedded-183.webp","assets/images/embedded-184.webp","assets/images/embedded-185.webp","assets/images/embedded-186.webp","assets/images/embedded-187.webp","assets/images/embedded-188.webp","assets/images/embedded-189.webp","assets/images/embedded-190.webp","assets/images/embedded-191.webp","assets/images/embedded-192.webp","assets/images/embedded-193.webp","assets/images/embedded-194.webp","assets/images/embedded-195.webp","assets/images/embedded-196.webp","assets/images/embedded-197.webp","assets/images/embedded-198.webp","assets/images/embedded-199.webp","assets/images/embedded-200.webp"],"constructivist":["assets/images/embedded-201.webp","assets/images/embedded-202.webp","assets/images/embedded-203.webp","assets/images/embedded-204.webp","assets/images/embedded-205.webp","assets/images/embedded-206.webp","assets/images/embedded-207.webp","assets/images/embedded-208.webp","assets/images/embedded-209.webp","assets/images/embedded-210.webp","assets/images/embedded-211.webp","assets/images/embedded-212.webp","assets/images/embedded-213.webp","assets/images/embedded-214.webp","assets/images/embedded-215.webp","assets/images/embedded-216.webp","assets/images/embedded-217.webp","assets/images/embedded-218.webp","assets/images/embedded-219.webp","assets/images/embedded-220.webp","assets/images/embedded-221.webp","assets/images/embedded-222.webp","assets/images/embedded-223.webp","assets/images/embedded-224.webp","assets/images/embedded-225.webp","assets/images/embedded-226.webp","assets/images/embedded-227.webp","assets/images/embedded-228.webp","assets/images/embedded-229.webp","assets/images/embedded-230.webp","assets/images/embedded-231.webp","assets/images/embedded-232.webp","assets/images/embedded-233.webp","assets/images/embedded-234.webp"],"radical-constructivist":["assets/images/embedded-235.webp","assets/images/embedded-236.webp","assets/images/embedded-237.webp","assets/images/embedded-238.webp","assets/images/embedded-239.webp","assets/images/embedded-240.webp","assets/images/embedded-241.webp","assets/images/embedded-242.webp","assets/images/embedded-243.webp","assets/images/embedded-244.webp","assets/images/embedded-245.webp","assets/images/embedded-246.webp","assets/images/embedded-247.webp","assets/images/embedded-248.webp","assets/images/embedded-249.webp","assets/images/embedded-250.webp","assets/images/embedded-251.webp","assets/images/embedded-252.webp","assets/images/embedded-253.webp","assets/images/embedded-254.webp","assets/images/embedded-255.webp","assets/images/embedded-256.webp","assets/images/embedded-257.webp","assets/images/embedded-258.webp","assets/images/embedded-259.webp","assets/images/embedded-260.webp","assets/images/embedded-261.webp","assets/images/embedded-262.webp","assets/images/embedded-263.webp","assets/images/embedded-264.webp","assets/images/embedded-265.webp","assets/images/embedded-266.webp","assets/images/embedded-267.webp","assets/images/embedded-268.webp"]};
let tileThemeKey='ivory';
try { const saved=localStorage.getItem('redEdgeMahjongTileTheme'); if(TILE_THEMES[saved])tileThemeKey=saved; } catch(e) {}

const GAME_MODES = {
  sichuan: {
    id:'sichuan', title:'四川麻将 · 血战到底', short:'川麻血战', watermark:'血战到底',
    subtitle:'108张 · 定缺 · 不可吃 · 一炮多响 · 三家胡后结束', tileKinds:27,
    dingque:true, allowChi:false, multiHu:true, bloodBattle:true,
    rules:[
      '牌组：万、条、筒各1—9，共108张；不使用字牌和花牌。',
      '定缺：开局选择一种花色为缺门，胡牌前必须先把缺门牌打完。',
      '操作：允许碰、明杠、暗杠、补杠；不允许吃。',
      '胡牌：支持基本四组面子加一对将、七对；允许一炮多响。',
      '血战：玩家胡牌后退出后续摸打，其余玩家继续，三家胡牌或牌墙耗尽结束。',
      '计分：沿用当前教学版番型模型（平胡、碰碰胡、七对、清一色、根、自摸、杠上花）。'
    ]
  },
  traditional: {
    id:'traditional', title:'传统麻将 · 基础四人', short:'传统四人', watermark:'传统四人',
    subtitle:'136张 · 含字牌 · 可吃碰杠 · 一家胡即结束', tileKinds:34,
    dingque:false, allowChi:true, multiHu:false, bloodBattle:false,
    rules:[
      '牌组：万、条、筒各1—9，加东南西北中发白，共136张；本模板不加入花牌。',
      '无定缺：三种数牌与字牌都可以保留并参与组牌。',
      '操作：下家可以吃；任何一家可以碰或杠。响应优先级为胡 > 杠/碰 > 吃。',
      '胡牌：基本结构为四组面子加一对将，并支持七对。',
      '结束：第一位玩家胡牌后本局结束；流局则牌墙耗尽结束。',
      '计分：采用便于演示的基础番型计分，不代表某一地方麻将的完整番表。'
    ]
  }
};

const AI_LEVELS = {
  beginner:{ id:'beginner', name:'入门AI', desc:'规则正确，决策带较多随机性', randomness:2.6, useUkeire:false, useSafety:false },
  standard:{ id:'standard', name:'标准AI', desc:'按对子、搭子、牌型完整度决策', randomness:.75, useUkeire:false, useSafety:false },
  advanced:{ id:'advanced', name:'进阶AI', desc:'加入有效进张与可见牌安全度评估', randomness:.18, useUkeire:true, useSafety:true }
};

let modeKey = 'sichuan';
let aiLevelKey = 'standard';
let totalScores = [0,0,0,0];
let state = null;
const advisor = {
  mode:'off', panelOpen:false, analysis:null, pendingActionContext:null, history:[],
  cache:new Map(), token:0, computing:false
};
const review = {
  roundNo:0, startedAt:null, endedAt:null, modeKey:null, aiLevelKey:null,
  initialScores:[], finalScores:[], initialHands:[], finalHands:[], events:[], decisions:[], result:null
};
const shantenMemo = new Map();

const delay = ms => new Promise(r => setTimeout(r, ms));
const mode = () => GAME_MODES[modeKey];
const aiCfg = () => AI_LEVELS[aiLevelKey];
const tileSuit = t => t < 27 ? Math.floor(t/9) : 3;
const rankOf = t => t < 27 ? t%9+1 : 0;
const tileName = t => t < 27 ? NUMC[t%9] + SUITC[tileSuit(t)] : HONORC[t-27];
const playerName = i => modeKey==='traditional' ? ['你·东','电脑·南','电脑·西','电脑·北'][i] : ['你','电脑·东','电脑·北','电脑·西'][i];

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } }
function counts(hand, n=mode().tileKinds){ const c=new Array(n).fill(0); hand.forEach(t=>{ if(t<n) c[t]++; }); return c; }
function removeTile(hand, t){ const i=hand.indexOf(t); if(i>=0) hand.splice(i,1); }

/* ---------- 通用胡牌判定 ---------- */
function checkSets(c){
  let i = c.findIndex(x=>x>0);
  if(i<0) return true;
  if(c[i]>=3){ c[i]-=3; const ok=checkSets(c); c[i]+=3; if(ok) return true; }
  if(i<27 && i%9<7 && c[i+1]>0 && c[i+2]>0){
    c[i]--; c[i+1]--; c[i+2]--;
    const ok=checkSets(c);
    c[i]++; c[i+1]++; c[i+2]++;
    if(ok) return true;
  }
  return false;
}
function isHu(c){
  const total = c.reduce((a,b)=>a+b,0);
  if(total%3!==2) return false;
  if(total===14 && c.every(x=>x%2===0)) return true; // 七对（四张可视作两对）
  for(let i=0;i<c.length;i++){
    if(c[i]>=2){ c[i]-=2; const ok=checkSets(c); c[i]+=2; if(ok) return true; }
  }
  return false;
}
function canWin(p, extra){
  if(mode().dingque){
    if(extra!=null && tileSuit(extra)===p.missing) return false;
    if(p.hand.some(t=>tileSuit(t)===p.missing)) return false;
  }
  const h = extra!=null ? p.hand.concat([extra]) : p.hand.slice();
  return isHu(counts(h));
}

/* ---------- 番型与教学计分 ---------- */
function allMeldTiles(p){
  const out=[];
  p.melds.forEach(m=>{
    if(m.type==='chi') out.push(...m.tiles);
    else for(let i=0;i<(m.type==='pong'?3:4);i++) out.push(m.tile);
  });
  return out;
}
function isAllPungs(c){
  for(let i=0;i<c.length;i++){
    if(c[i]>=2){
      c[i]-=2;
      const ok=c.every(x=>x%3===0);
      c[i]+=2;
      if(ok) return true;
    }
  }
  return false;
}
function calcFan(p, winHand, zimo, gangHua){
  const c = counts(winHand);
  let fan=0; const tags=[];
  const total = c.reduce((a,b)=>a+b,0);
  const seven = p.melds.length===0 && total===14 && c.every(x=>x%2===0);
  const allTiles=winHand.concat(allMeldTiles(p));
  const suited=new Set(allTiles.filter(t=>t<27).map(tileSuit));
  const hasHonor=allTiles.some(t=>t>=27);

  if(modeKey==='sichuan'){
    if(seven){ fan+=2; tags.push('七对'); }
    if(!seven && isAllPungs(c.slice())){ fan+=1; tags.push('碰碰胡'); }
    if(suited.size===1 && !hasHonor){ fan+=2; tags.push('清一色'); }
    let gen = p.melds.filter(m=>m.type==='an'||m.type==='ming'||m.type==='bu').length;
    for(let i=0;i<c.length;i++) if(c[i]===4) gen++;
    if(gen>0){ fan+=gen; tags.push(gen+'根'); }
    if(zimo){ fan+=1; tags.push('自摸'); }
    if(gangHua){ fan+=1; tags.push('杠上开花'); }
    if(tags.length===0) tags.push('平胡');
  } else {
    // 传统模式采用“基础教学计分”，只用于本演示，不绑定地方番表。
    if(seven){ fan+=2; tags.push('七对'); }
    if(!seven && isAllPungs(c.slice())){ fan+=1; tags.push('碰碰胡'); }
    if(allTiles.every(t=>t>=27)){ fan+=4; tags.push('字一色'); }
    else if(suited.size===1 && !hasHonor){ fan+=3; tags.push('清一色'); }
    else if(suited.size===1 && hasHonor){ fan+=1; tags.push('混一色'); }
    if(zimo){ fan+=1; tags.push('自摸'); }
    if(gangHua){ fan+=1; tags.push('杠上开花'); }
    if(tags.length===0) tags.push('平胡');
  }
  return { fan, tags, score: Math.max(1,Math.pow(2, fan)) };
}

/* ---------- UI ---------- */
function log(msg){
  const el=document.getElementById('log');
  el.innerHTML += '<div>· '+msg+'</div>';
  el.scrollTop=el.scrollHeight;
}
function reviewStartRound(){
  review.roundNo++; review.startedAt=new Date(); review.endedAt=null; review.modeKey=modeKey; review.aiLevelKey=aiLevelKey;
  review.initialScores=totalScores.slice(); review.finalScores=[]; review.events=[]; review.decisions=[]; review.result=null;
  review.initialHands=state.players.map(p=>p.hand.slice()); review.finalHands=[];
  advisor.history=[];
}
function reviewEvent(type,data={}){
  if(!review.startedAt)return;
  review.events.push({seq:review.events.length+1,ms:Date.now()-review.startedAt.getTime(),type,...data});
}
function fmtTiles(arr){ return arr&&arr.length?arr.map(tileName).join(' '):'—'; }
function fmtMeld(m){ return m.type==='chi'?'吃['+m.tiles.map(tileName).join('·')+']':({pong:'碰',ming:'明杠',an:'暗杠',bu:'补杠'}[m.type]||m.type)+'['+tileName(m.tile)+']'; }
function publicSnapshotForReview(){
  return state.players.map(p=>({
    player:p.id, missing:p.missing, done:p.done, discards:p.discards.slice(),
    melds:p.melds.map(m=>({type:m.type,tile:m.tile,tiles:m.tiles?m.tiles.slice():null}))
  }));
}
function serializeAdvisorCandidate(r){
  if(r.type==='action') return {type:'action',action:r.action,label:actionLabel(r.action),rank:r.rank,score:r.score,reason:r.reason||advisorReason(r)};
  return {
    type:'discard',tile:r.tile,label:'打 '+tileName(r.tile),rank:r.rank,score:r.score,
    progress:r.progress?{phase:r.progress.phase,debt:r.progress.debt,shanten:r.progress.shanten,label:r.progress.label}:null,
    ukeire:r.ukeire?r.ukeire.total:0, effectiveTiles:r.ukeire?r.ukeire.tiles.map(x=>({tile:x.tile,count:x.count,next:x.next})):[],
    risk:Math.round((r.risk||0)*10)/10, shape:Math.round((r.shape||0)*10)/10, potential:Math.round((r.potential||0)*10)/10,
    twoStep:Math.round((r.twoStep||0)*10)/10, monteCarlo:Math.round((r.mc||0)*10)/10, reason:advisorReason(r)
  };
}
function recordReviewDecision(kind,value,a,row,best){
  if(!review.startedAt||!a||!row||!best)return;
  const choiceLabel=kind==='discard'?'打 '+tileName(value):actionLabel(value);
  const bestLabel=best.type==='discard'?'打 '+tileName(best.tile):actionLabel(best.action);
  review.decisions.push({
    id:review.decisions.length+1, eventSeq:review.events.length, ms:Date.now()-review.startedAt.getTime(),
    nodeKey:a.nodeKey||null,
    kind, choiceValue:value, choiceLabel, choiceRank:row.rank, choiceScore:row.score,
    bestLabel, bestScore:best.score, valueGap:Math.max(0,best.score-row.score), analysisDepth:a.deep?'深度':'实时',
    wallCount:state.wall.length, hand:state.players[0].hand.slice().sort((x,y)=>x-y), publicState:publicSnapshotForReview(),
    candidates:a.rows.map(serializeAdvisorCandidate)
  });
}
function upgradeReviewDecisionFromDeep(nodeKey,deep){
  if(!nodeKey||!deep||!deep.rows)return;
  const d=[...review.decisions].reverse().find(x=>x.nodeKey===nodeKey); if(!d)return;
  const row=d.kind==='discard'?deep.rows.find(r=>r.tile===d.choiceValue):deep.rows.find(r=>r.action===d.choiceValue);
  const best=deep.best; if(!row||!best)return;
  d.choiceRank=row.rank; d.choiceScore=row.score;
  d.bestLabel=best.type==='discard'?'打 '+tileName(best.tile):actionLabel(best.action);
  d.bestScore=best.score; d.valueGap=Math.max(0,best.score-row.score); d.analysisDepth='深度';
  d.candidates=deep.rows.map(serializeAdvisorCandidate);
  if(document.getElementById('reviewTabBody')) renderReviewTab(reviewUiTab);
}
function finalizeReview(){
  if(!review.startedAt)return;
  review.endedAt=new Date(); review.finalScores=totalScores.slice(); review.finalHands=state.players.map(p=>p.hand.slice());
  const winners=state.players.filter(p=>p.done).map(p=>({player:p.id,tags:p.huInfo?p.huInfo.tags.slice():[],fan:p.huInfo?p.huInfo.fan:0}));
  review.result={winners,humanHu:!!state.players[0].done,humanTags:state.players[0].huInfo?state.players[0].huInfo.tags.slice():[],scoreDelta:totalScores[0]-review.initialScores[0],wallLeft:state.wall.length};
}
function reviewFutureHumanDraws(decision,limit=3){
  return review.events.filter(e=>e.seq>decision.eventSeq&&e.type==='draw'&&e.player===0).slice(0,limit).map(e=>e.tile);
}
function reviewPosteriorLine(decision){
  const future=reviewFutureHumanDraws(decision,3);
  const best=decision.candidates.find(c=>c.rank===1);
  const effective=new Set((best&&best.effectiveTiles||[]).map(x=>x.tile));
  const hits=future.filter(t=>effective.has(t));
  let x='后续本人摸牌：'+fmtTiles(future)+'。';
  if(best&&best.type==='discard'&&effective.size) x+=' AI首选路径的有效牌在这几次实际摸牌中'+(hits.length?'出现 '+fmtTiles(hits):'未出现')+'。';
  return x+' 该项仅作实际轨迹观察，不等同于反事实证明。';
}
function reviewDiscardTracks(){
  return [0,1,2,3].map(pid=>({player:pid,tiles:review.events.filter(e=>e.type==='discard'&&e.player===pid).map(e=>e.tile)}));
}
function buildSimpleReviewText(){
  const r=review.result||{}; const lines=[];
  lines.push('麻将 AI 决策复盘｜简单版');
  lines.push('规则：'+GAME_MODES[review.modeKey].title+'｜电脑：'+AI_LEVELS[review.aiLevelKey].name);
  lines.push('时间：'+(review.startedAt?review.startedAt.toLocaleString():'—')+'｜本人结果：'+(r.humanHu?'胡牌':'未胡')+'｜本局分差：'+((r.scoreDelta||0)>=0?'+':'')+(r.scoreDelta||0));
  const agree=review.decisions.filter(d=>d.choiceRank===1).length;
  const avgGap=review.decisions.length?(review.decisions.reduce((a,d)=>a+d.valueGap,0)/review.decisions.length).toFixed(1):'0.0';
  lines.push('');
  lines.push('【先验摘要】AI首选一致 '+agree+'/'+review.decisions.length+'；平均相对价值差 '+avgGap+' 分。');
  lines.push('【本人关键决策】');
  if(!review.decisions.length) lines.push('无可记录的人工决策。');
  review.decisions.forEach(d=>{
    lines.push(d.id+'. '+d.choiceLabel+'｜AI首选 '+d.bestLabel+' '+d.bestScore+'分｜本人 '+d.choiceScore+'分｜价值差 -'+d.valueGap+'｜'+(d.choiceRank===1?'与推荐一致':'AI排名 #'+d.choiceRank));
  });
  lines.push(''); lines.push('【出牌记录】');
  reviewDiscardTracks().forEach(x=>lines.push(playerName(x.player)+'：'+fmtTiles(x.tiles)));
  lines.push(''); lines.push('【后验摘要】');
  lines.push('胡牌者：'+(r.winners&&r.winners.length?r.winners.map(w=>playerName(w.player)+(w.tags.length?'['+w.tags.join('·')+']':'')).join('；'):'流局/无人胡'));
  lines.push('本人最终：'+(r.humanHu?'胡牌 '+(r.humanTags||[]).join('·'):'未胡')+'；剩余牌墙 '+(r.wallLeft??'—')+' 张。');
  lines.push(''); lines.push('说明：AI分数是当时可见信息下的相对价值，不是胡牌概率；简单版省略候选明细、暗手真值与逐步后验信息。');
  return lines.join('\n');
}
function buildDetailedReviewText(){
  const r=review.result||{}; const lines=[];
  lines.push('麻将 AI 决策复盘｜详细版');
  lines.push('版本：Formal Review 1.1 · AI Strategy 3.0');
  lines.push('规则：'+GAME_MODES[review.modeKey].title+'｜电脑：'+AI_LEVELS[review.aiLevelKey].name+'｜AI分析：后台 '+advisor.mode);
  lines.push('开始：'+(review.startedAt?review.startedAt.toLocaleString():'—')+'｜结束：'+(review.endedAt?review.endedAt.toLocaleString():'—'));
  lines.push('');
  lines.push('【方法说明】');
  lines.push('先验：每个本人决策节点只使用当时可见信息计算推荐；决策快照不包含电脑暗手，牌墙仅保留剩余张数而不保留真实顺序。');
  lines.push('后验：局末结合实际事件轨迹与最终真值复盘。后验只描述“实际发生了什么”，不把另一种出牌当作已验证的反事实。');
  lines.push('');
  lines.push('【初始信息】');
  lines.push('本人初始手牌：'+fmtTiles(review.initialHands[0]||[]));
  if(mode().dingque) lines.push('定缺：'+state.players.map(p=>playerName(p.id)+'='+SUITC[p.missing]).join('；'));
  lines.push('');
  lines.push('【逐决策：先验 → 实际选择 → 后验】');
  if(!review.decisions.length) lines.push('无可记录的人工决策。');
  review.decisions.forEach(d=>{
    lines.push(''); lines.push('#'+d.id+' '+d.choiceLabel+'｜分析层级：'+d.analysisDepth+'｜牌墙 '+d.wallCount+' 张');
    lines.push('当时手牌：'+fmtTiles(d.hand));
    lines.push('先验首选：'+d.bestLabel+' '+d.bestScore+'分；本人选择：'+d.choiceLabel+' '+d.choiceScore+'分（#'+d.choiceRank+'，价值差 -'+d.valueGap+'）');
    const pub=d.publicState.map(ps=>playerName(ps.player)+'{弃:'+fmtTiles(ps.discards)+'；副露:'+(ps.melds.length?ps.melds.map(fmtMeld).join(' '):'—')+'}').join('｜');
    lines.push('当时公开信息：'+pub);
    lines.push('候选：');
    d.candidates.forEach(c=>{
      if(c.type==='action') lines.push('  #'+c.rank+' '+c.label+' '+c.score+'分｜'+c.reason);
      else {
        const pr=c.progress?(c.progress.phase==='dingque'?'定缺剩'+c.progress.debt+'张':c.progress.label):'—';
        const eff=(c.effectiveTiles||[]).slice(0,10).map(x=>tileName(x.tile)+'×'+x.count).join(' ');
        lines.push('  #'+c.rank+' '+c.label+' '+c.score+'分｜'+pr+'｜进张 '+c.ukeire+'｜风险 '+c.risk+'%｜二阶 '+c.twoStep+'｜MC '+c.monteCarlo+'｜'+c.reason+(eff?'｜有效 '+eff:''));
      }
    });
    lines.push('后验观察：'+reviewPosteriorLine(d));
  });
  lines.push(''); lines.push('【完整出牌轨迹】');
  reviewDiscardTracks().forEach(x=>lines.push(playerName(x.player)+'：'+fmtTiles(x.tiles)));
  lines.push(''); lines.push('【公开事件时间线】');
  review.events.filter(e=>['discard','meld','hu'].includes(e.type)||(e.type==='draw'&&e.player===0)).forEach(e=>{
    if(e.type==='draw') lines.push('E'+e.seq+' '+playerName(e.player)+' 摸 '+tileName(e.tile)+'｜牌墙 '+e.wall);
    if(e.type==='discard') lines.push('E'+e.seq+' '+playerName(e.player)+' 打 '+tileName(e.tile)+'｜牌墙 '+e.wall);
    if(e.type==='meld') lines.push('E'+e.seq+' '+playerName(e.player)+' '+e.label);
    if(e.type==='hu') lines.push('E'+e.seq+' '+playerName(e.player)+' 胡牌 '+(e.tags||[]).join('·'));
  });
  lines.push(''); lines.push('【局后真值｜牌局中不可见】');
  review.initialHands.forEach((h,pid)=>{ if(pid!==0) lines.push(playerName(pid)+' 初始暗手：'+fmtTiles(h)); });
  review.finalHands.forEach((h,pid)=>lines.push(playerName(pid)+' 最终手牌：'+fmtTiles(h)));
  lines.push('最终总分：'+review.finalScores.map((v,i)=>playerName(i)+'='+v).join('；'));
  lines.push('胡牌者：'+(r.winners&&r.winners.length?r.winners.map(w=>playerName(w.player)+'['+w.tags.join('·')+']').join('；'):'流局/无人胡'));
  lines.push(''); lines.push('【解释边界】');
  lines.push('详细版用于复盘和算法研究；“局后真值”与在线决策输入隔离。AI 在线只读取自己的手牌、公开弃牌/副露/定缺与牌墙剩余张数，不读取其他玩家暗手或牌墙真实顺序。');
  return lines.join('\n');
}
function downloadReview(kind){
  if(!review.endedAt) finalizeReview();
  const detailed=kind==='detail'; const text=detailed?buildDetailedReviewText():buildSimpleReviewText();
  const blob=new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='麻将AI复盘_'+(detailed?'详细版':'简单版')+'_'+new Date().toISOString().slice(0,10)+'.txt';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function tileColor(t){
  if(t<27) return COLORS[tileSuit(t)];
  if(t===31) return '#b8342d';
  if(t===32) return '#187347';
  if(t===33) return '#356b9a';
  return '#232d29';
}
const TILE_CANONICAL_CODES = Object.freeze([
  '1m','2m','3m','4m','5m','6m','7m','8m','9m',
  '1s','2s','3s','4s','5s','6s','7s','8s','9s',
  '1p','2p','3p','4p','5p','6p','7p','8p','9p',
  'east','south','west','north','red','green','white'
]);
const TILE_INDEX_BY_CODE = Object.freeze(Object.fromEntries(TILE_CANONICAL_CODES.map((code,index)=>[code,index])));
/* Manual face audit: radical-max 9m was painted as “六万”. Use the verified
   brocade face for that one code on every device; the logical index never changes. */
const TILE_ASSET_CORRECTIONS = Object.freeze({'radical-max':Object.freeze({8:'brocade'})});
function tileCode(t){ return Number.isInteger(t) && t>=0 && t<TILE_CANONICAL_CODES.length ? TILE_CANONICAL_CODES[t] : null; }
function tileAssetPath(t){
  const code=tileCode(t); const idx=code==null ? -1 : TILE_INDEX_BY_CODE[code];
  const correction=TILE_ASSET_CORRECTIONS[tileThemeKey]&&TILE_ASSET_CORRECTIONS[tileThemeKey][idx];
  const themed=EMBEDDED_TILE_ASSETS[correction||tileThemeKey]; const fallback=EMBEDDED_TILE_ASSETS.ivory;
  if(idx<0) return '';
  return (themed && themed[idx]) || fallback[idx] || '';
}
function setTileTheme(key){
  if(!TILE_THEMES[key])return;
  tileThemeKey=key;
  try { localStorage.setItem('redEdgeMahjongTileTheme',key); } catch(e) {}
  ['tileThemeSelect','mobileTileThemeSelect'].forEach(id=>{const sel=document.getElementById(id);if(sel)sel.value=key;});
  if(state)renderAll();
  renderAdvisor();
}
function tileEl(t, small, cls){
  const d=document.createElement('div');
  d.className='tile'+(small?' small':'')+(cls?' '+cls:'')+(t>=27?' honor':'');
  if(tileThemeKey!=='ivory')d.classList.add('has-canonical-guard');
  d.dataset.tileId=String(t); d.dataset.tileCode=tileCode(t)||''; d.dataset.tileRank=String(t<27?(t%9+1):0); d.dataset.tileSuit=t<27?['m','s','p'][tileSuit(t)]:'z';
  d.title=tileName(t); d.setAttribute('aria-label',tileName(t));
  const art='<img class="tile-art" src="'+tileAssetPath(t)+'" alt="" draggable="false" onerror="this.remove()">';
  const guard=tileThemeKey==='ivory'?'':'<span class="tile-canonical-label" aria-hidden="true">'+tileName(t)+'</span>';
  if(t<27){
    d.innerHTML='<div class="tile-glyph"><div class="num" style="color:'+tileColor(t)+'">'+NUMC[t%9]+'</div>'+
                '<div class="suit" style="color:'+tileColor(t)+'">'+SUITC[tileSuit(t)]+'</div></div>'+art+guard;
  } else {
    d.innerHTML='<div class="tile-glyph"><div class="honor-char" style="color:'+tileColor(t)+'">'+HONORC[t-27]+'</div></div>'+art+guard;
  }
  return d;
}
function meldEl(m, small){
  const w=document.createElement('div'); w.className='meld';
  const labels={chi:'吃',pong:'碰',an:'暗杠',ming:'明杠',bu:'补杠'};
  w.dataset.meldType=m.type;
  w.dataset.meldLabel=labels[m.type]||'副露';
  if(m.type==='chi') m.tiles.forEach(t=>w.appendChild(tileEl(t,small!==false)));
  else {
    const n=m.type==='pong'?3:4;
    for(let i=0;i<n;i++) w.appendChild(tileEl(m.tile,small!==false));
  }
  return w;
}
function updateModeChrome(){
  const m=mode();
  document.title='赤锋牌局 · '+m.title;
  document.getElementById('modeTitle').textContent='四川麻将';
  document.getElementById('modeSub').textContent=m.short;
  document.getElementById('aiChip').textContent='电脑：'+AI_LEVELS[aiLevelKey].name;
  document.getElementById('discboard').dataset.watermark=m.watermark;
}
function renderAll(){
  if(!state) return;
  updateModeChrome();
  document.getElementById('wallCnt').textContent=state.wall.length;
  const ordered=[0,1,2,3].sort((a,b)=>totalScores[b]-totalScores[a]||a-b);
  const scoreRanks=new Map(ordered.map((pid,idx)=>[pid,idx]));
  const rankGlyph=['壹','贰','叁','肆'];
  const meta=[
    ['牌桌','本地对局'],
    ['局数',mode().short],
    ['剩余牌',state.wall.length],
    ['状态',state.awaitDiscard?'可出牌':(state.turn===0?'你的回合':'对局中')]
  ];
  document.getElementById('scoreBar').innerHTML=meta.map((x,i)=>
    '<div class="score-seat '+(i===2?'leader':'')+'"><span class="score-name">'+x[0]+'</span><b class="score-value">'+x[1]+'</b></div>'
  ).join('');
  for(let i=0;i<4;i++){
    const p=state.players[i], el=document.getElementById('opp'+i); el.innerHTML='';
    el.classList.toggle('is-turn',state.turn===i&&!p.done);
    el.classList.toggle('is-hu',!!p.done);
    el.classList.toggle('is-self',i===0);
    const nm=document.createElement('div'); nm.className='pname';
    el.dataset.player=i;
    const seatGlyph=modeKey==='traditional'?['东','南','西','北'][i]:['南','东','北','西'][i];
    nm.dataset.seat=seatGlyph;
    const displayScore=25000+totalScores[i];
    nm.innerHTML='<img class="seat-avatar" src="'+PORTRAITS[i]+'" alt="" draggable="false"><span class="seat-name">'+playerName(i)+'</span><span class="seat-score">◉ '+displayScore.toLocaleString()+'</span>'
      +(mode().dingque&&p.missing>=0?'<span class="badge">缺'+SUITC[p.missing]+'</span>':'')
      +(p.done?'<span class="badge hu">已胡 '+p.huInfo.tags.join('·')+'</span>':'')
      +(state.turn===i&&!p.done?'<span class="badge turn">出牌</span>':'');
    el.appendChild(nm);
    const md=document.createElement('div'); md.className='melds'; p.melds.forEach(m=>md.appendChild(meldEl(m))); el.appendChild(md);
    if(i!==0){
      const hd=document.createElement('div'); hd.className='melds';
      if(p.done) p.hand.forEach(t=>hd.appendChild(tileEl(t,true)));
      else for(let k=0;k<p.hand.length;k++){ const b=document.createElement('div'); b.className='tback'; hd.appendChild(b); }
      el.appendChild(hd);
    }
  }
  const db=document.getElementById('discboard'); db.innerHTML=''; db.dataset.watermark=mode().watermark;
  const wallRail=document.createElement('div'); wallRail.className='wall-rail'; wallRail.setAttribute('aria-hidden','true'); db.appendChild(wallRail);
  const core=document.createElement('div'); core.className='table-core'; core.setAttribute('aria-hidden','true');
  core.innerHTML='<div class="core-inner"><div><div class="core-dir">北 · 东 · 南 · 西</div><div class="core-mode">'+mode().short+'</div><div class="core-wall">'+state.wall.length+'</div><div class="core-rest">剩余牌</div></div></div>';
  db.appendChild(core);
  [2,3,1,0].forEach(i=>{
    const p=state.players[i], z=document.createElement('div'); z.className='dzone'; z.dataset.player=String(i);
    z.innerHTML='<div class="dz-title">'+playerName(i)+' 弃牌</div>';
    const dt=document.createElement('div'); dt.className='dtiles'; dt.dataset.player=String(i);
    p.discards.forEach((t,idx)=>{
      const isLast=(i===state.lastDiscFrom&&idx===p.discards.length-1);
      const isPending=motionState&&motionState.pendingDiscard&&motionState.pendingDiscard.pid===i&&motionState.pendingDiscard.tile===t&&idx===p.discards.length-1;
      dt.appendChild(tileEl(t,true,(isLast?'last ':'')+(isPending?'motion-pending-dest':'')));
    });
    z.appendChild(dt); db.appendChild(z);
  });
  const mm=document.getElementById('mymelds');
  const selfMelds=state.players[0].melds;
  mm.innerHTML='';
  mm.dataset.meldCount=String(selfMelds.length);
  selfMelds.forEach(m=>mm.appendChild(meldEl(m,true)));
  renderHand();
  motionNotifyRender();
  if(advisor.mode!=='off'&&!state.awaitDiscard&&!advisor.pendingActionContext){ advisor.analysis=null; renderAdvisor(); }
}
function renderHand(){
  if(!state) return;
  const p=state.players[0], el=document.getElementById('hand'); el.innerHTML='';
  const sorted=p.hand.slice().sort((a,b)=>a-b);
  const showDrawn=p.hand.length%3===2&&state.turn===0;
  let arr=sorted;
  if(showDrawn&&p.lastDraw!=null){ const idx=sorted.indexOf(p.lastDraw); if(idx>=0) arr=sorted.slice(0,idx).concat(sorted.slice(idx+1),[p.lastDraw]); }
  arr.forEach((t,i)=>{
    const missing=mode().dingque&&tileSuit(t)===p.missing;
    const cls=(missing?'missing ':'')+(showDrawn&&i===arr.length-1&&p.lastDraw===t?'drawn':'');
    const e=tileEl(t,false,cls.trim());
    if(state.awaitDiscard&&!p.done){
      const mustMissing=mode().dingque&&p.hand.some(x=>tileSuit(x)===p.missing);
      const legal=!mustMissing||tileSuit(t)===p.missing;
      if(legal){
        e.classList.add('clickable');
        e.onclick=()=>{
          const res=state.awaitDiscard; if(!res)return;
          state.awaitDiscard=null;
          motionRememberHumanDiscard(e,t);
          motionPressTile(e).then(()=>res(t));
        };
      } else {
        e.style.opacity='.48'; e.title+='（定缺未打完，当前不可打）'; e.classList.add('motion-locked');
        e.onclick=()=>motionRejectTile(e);
      }
      if(advisor.panelOpen&&advisor.mode!=='off'&&advisor.analysis&&advisor.analysis.kind==='discard'){
        const ar=advisor.analysis.rows.find(r=>r.tile===t);
        if(ar){ const badge=document.createElement('span'); badge.className='tile-score-badge'; badge.textContent=ar.score; e.appendChild(badge); if(ar.rank===1)e.classList.add('advisor-best'); }
      }
    }
    el.appendChild(e);
  });
}
function showRules(){
  const m=mode(), box=document.getElementById('modalBox');
  box.className='box';
  box.innerHTML='<h2>'+m.title+' · 规则</h2><div class="rule-list">'+m.rules.map(x=>'<div class="rline">'+x+'</div>').join('')+'</div>'+
    '<div class="rline"><b>当前电脑：</b>'+AI_LEVELS[aiLevelKey].name+' — '+AI_LEVELS[aiLevelKey].desc+'</div>'+
    '<button onclick="closeModal()">返回牌桌</button>';
  document.getElementById('modal').style.display='flex';
}
function closeModal(){ document.getElementById('modal').style.display='none'; }
let lobbyChoice={mode:modeKey,ai:aiLevelKey};
function lobbyCompareHtml(){
  const mk=lobbyChoice.mode, m=GAME_MODES[mk], other=GAME_MODES[mk==='sichuan'?'traditional':'sichuan'];
  const rows=mk==='sichuan'
    ?[['需要定缺','定缺'],['可吃牌','不可吃'],['结束方式','血战到底'],['字牌','无字牌'],['胡牌后','其余玩家继续']]
    :[['需要定缺','无定缺'],['可吃牌','可吃'],['结束方式','一家胡结束'],['字牌','含字牌'],['胡牌后','本局结束']];
  return '<div class="compare-mode-title"><b>'+m.short+'</b><span>VS</span><em>'+other.short+'</em></div>'+
    rows.map(r=>'<div class="compare-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>').join('');
}
function refreshLobbyChoice(){
  const lobby=document.getElementById('lobby'); if(!lobby)return;
  lobby.querySelectorAll('.mode-card').forEach(c=>c.classList.toggle('selected',c.dataset.mode===lobbyChoice.mode));
  lobby.querySelectorAll('.difficulty-btn,.entry-btn').forEach(b=>b.classList.toggle('selected',b.dataset.ai===lobbyChoice.ai&&(b.classList.contains('difficulty-btn')||b.dataset.mode===lobbyChoice.mode)));
  const cmp=document.getElementById('lobbyCompareBody'); if(cmp)cmp.innerHTML=lobbyCompareHtml();
}
function selectLobbyMode(mk){ if(!GAME_MODES[mk])return; lobbyChoice.mode=mk; refreshLobbyChoice(); }
function selectLobbyAi(ak){ if(!AI_LEVELS[ak])return; lobbyChoice.ai=ak; refreshLobbyChoice(); }
function startSelectedMode(){ startMode(lobbyChoice.mode,lobbyChoice.ai); }
function showLobby(){
  document.getElementById('gameStage')?.classList.remove('has-action-window');
  lobbyChoice={mode:modeKey,ai:aiLevelKey};
  const lobby=document.getElementById('lobby');
  lobby.style.display='flex';
  refreshLobbyChoice();
  motionEnterLobby();
}
function hideLobby(){ document.getElementById('lobby').style.display='none'; }
async function startMode(mk, ak){
  if(motionState.transitioning)return; motionState.transitioning=true;
  await motionExitLobby();
  modeKey=mk; aiLevelKey=ak; lobbyChoice={mode:mk,ai:ak}; totalScores=[0,0,0,0]; advisor.panelOpen=false;
  hideLobby(); updateModeChrome(); startRound(); renderAdvisor(); motionState.transitioning=false;
}


/* ---------- 高级可解释 AI 辅助：向听 / 进张 / 二阶搜索 / 风险 / 蒙特卡洛 ---------- */
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
function uniqueTiles(hand){ return [...new Set(hand)]; }
function advisorSnapshotKey(extra=''){
  if(!state) return 'none';
  const p=state.players[0];
  const publicSig=state.players.map(q=>q.discards.join('.')+'|'+q.melds.map(m=>m.type+':'+(m.tiles?m.tiles.join('-'):m.tile)).join(',')+'|'+q.missing+'|'+q.done).join('/');
  return [modeKey,'g'+state.gen,p.hand.slice().sort((a,b)=>a-b).join('.'),p.melds.map(m=>m.type+':'+(m.tiles?m.tiles.join('-'):m.tile)).join(','),p.missing,state.wall.length,state.turn,publicSig,extra].join('#');
}
function calcStandardShanten(hand, openMelds=0){
  const c=counts(hand); const key=c.join('')+'|'+openMelds;
  if(shantenMemo.has(key)) return shantenMemo.get(key);
  let best=8;
  function dfs(idx,melds,taatsu,pair){
    while(idx<c.length&&c[idx]===0) idx++;
    if(idx>=c.length){
      const m=melds+openMelds;
      const t=Math.min(taatsu,Math.max(0,4-m));
      best=Math.min(best,8-2*m-t-pair);
      return;
    }
    // Complete triplet.
    if(c[idx]>=3){ c[idx]-=3; dfs(idx,melds+1,taatsu,pair); c[idx]+=3; }
    // Complete sequence (honors cannot sequence).
    if(idx<27&&idx%9<=6&&c[idx+1]>0&&c[idx+2]>0){ c[idx]--;c[idx+1]--;c[idx+2]--;dfs(idx,melds+1,taatsu,pair);c[idx]++;c[idx+1]++;c[idx+2]++; }
    // Pair as the head.
    if(pair===0&&c[idx]>=2){ c[idx]-=2; dfs(idx,melds,taatsu,1); c[idx]+=2; }
    // Pair can also be a taatsu when another pair is the head.
    if(c[idx]>=2){ c[idx]-=2; dfs(idx,melds,taatsu+1,pair); c[idx]+=2; }
    // Ryanmen/penchan and kanchan taatsu.
    if(idx<27&&idx%9<=7&&c[idx+1]>0){ c[idx]--;c[idx+1]--;dfs(idx,melds,taatsu+1,pair);c[idx]++;c[idx+1]++; }
    if(idx<27&&idx%9<=6&&c[idx+2]>0){ c[idx]--;c[idx+2]--;dfs(idx,melds,taatsu+1,pair);c[idx]++;c[idx+2]++; }
    // Treat one tile as isolated and continue.
    c[idx]--; dfs(idx,melds,taatsu,pair); c[idx]++;
  }
  dfs(0,0,0,0);
  if(openMelds===0){
    const cc=counts(hand); const pairs=cc.filter(x=>x>=2).length, kinds=cc.filter(x=>x>0).length;
    best=Math.min(best,6-pairs+Math.max(0,7-kinds));
  }
  shantenMemo.set(key,best);
  if(shantenMemo.size>25000){ const first=shantenMemo.keys().next().value; shantenMemo.delete(first); }
  return best;
}
function advisorProgress(hand,p,openMelds=p.melds.length){
  const miss=mode().dingque?hand.filter(t=>tileSuit(t)===p.missing).length:0;
  if(miss>0) return {phase:'dingque',debt:miss,shanten:null,label:'定缺 '+miss};
  const sh=calcStandardShanten(hand,openMelds);
  return {phase:'normal',debt:0,shanten:sh,label:sh<0?'已和':sh===0?'听牌':sh+'向听'};
}
function advisorKnownCounts(viewer){
  const k=new Array(mode().tileKinds).fill(0);
  viewer.hand.forEach(t=>k[t]++);
  state.players.forEach(p=>{
    p.discards.forEach(t=>k[t]++);
    p.melds.forEach(m=>{
      if(m.type==='chi') m.tiles.forEach(t=>k[t]++);
      else k[m.tile]+=m.type==='pong'?3:4;
    });
  });
  return k.map(x=>Math.min(4,x));
}
function advisorRemainingCounts(viewer){ return advisorKnownCounts(viewer).map(x=>Math.max(0,4-x)); }
function advisorUkeire(hand,p,pool,openMelds=p.melds.length){
  const prog=advisorProgress(hand,p,openMelds);
  if(prog.phase==='dingque') return {total:0,tiles:[],weighted:0};
  const tiles=[]; let total=0;
  for(let t=0;t<mode().tileKinds;t++){
    const n=pool[t]||0; if(!n) continue;
    const h=hand.concat([t]);
    const np=advisorProgress(h,p,openMelds);
    if(np.phase==='normal'&&np.shanten<prog.shanten){ tiles.push({tile:t,count:n,next:np.shanten}); total+=n; }
  }
  return {total,tiles,weighted:total};
}
function advisorPatternPotential(hand,p,openMelds=p.melds.length){
  const all=hand.concat(allMeldTiles({...p,hand, melds:p.melds.slice(0,openMelds)}));
  const c=counts(hand), suited=[0,1,2].map(s=>all.filter(t=>t<27&&tileSuit(t)===s).length), honors=all.filter(t=>t>=27).length;
  const pairs=c.filter(x=>x>=2).length, trips=c.filter(x=>x>=3).length;
  let score=35;
  const maxSuit=Math.max(...suited), totalSuited=suited.reduce((a,b)=>a+b,0);
  if(totalSuited>0){ const concentration=maxSuit/totalSuited; score+=Math.max(0,concentration-.45)*42; }
  score+=Math.min(18,pairs*3.2+trips*4.0);
  if(openMelds===0&&pairs>=4) score+=8; // 七对潜力
  if(modeKey==='traditional'&&honors){ score+=Math.min(9,honors*1.3); }
  if(modeKey==='sichuan'&&honors===0&&maxSuit>=8) score+=7;
  return clamp(score,0,100);
}
function advisorOpponentThreat(op){
  if(op.done) return 0;
  const startWall=mode().tileKinds*4-52;
  const late=1-clamp(state.wall.length/Math.max(1,startWall),0,1);
  const meldFactor=op.melds.length*.18;
  const discardFactor=Math.min(.22,op.discards.length*.012);
  return clamp(.18+late*.38+meldFactor+discardFactor,0,1);
}
function advisorDiscardRisk(tile,pid=0){
  let combinedSafe=1;
  state.players.forEach(op=>{
    if(op.id===pid||op.done) return;
    if(mode().dingque&&op.missing===tileSuit(tile)){ return; } // 川麻对该玩家绝对不构成合法和牌张。
    let base=tile<27 ? ([.28,.42,.55,.70,.78,.70,.55,.42,.28][tile%9]) : .34;
    const known=advisorKnownCounts(state.players[pid])[tile];
    base*=Math.max(.12,1-known*.19);
    if(tile<27){
      const s=tileSuit(tile);
      const sameDiscard=op.discards.filter(x=>x<27&&tileSuit(x)===s).length;
      base*=clamp(1-sameDiscard*.035,.62,1);
      const meldSame=op.melds.filter(m=>m.type==='chi'?m.tiles.some(x=>x<27&&tileSuit(x)===s):(m.tile<27&&tileSuit(m.tile)===s)).length;
      base*=1+meldSame*.12;
    } else {
      const publicCopies=state.players.reduce((n,q)=>n+q.discards.filter(x=>x===tile).length+q.melds.reduce((a,m)=>a+(m.type==='chi'?m.tiles.filter(x=>x===tile).length:(m.tile===tile?(m.type==='pong'?3:4):0)),0),0);
      base*=clamp(1-publicCopies*.21,.18,1);
    }
    const r=clamp(base*advisorOpponentThreat(op),0,.92);
    combinedSafe*=1-r;
  });
  return clamp((1-combinedSafe)*100,0,100);
}
function advisorBestDiscardFast(hand,p,pool,openMelds=p.melds.length){
  let cand=uniqueTiles(hand);
  if(mode().dingque){ const miss=cand.filter(t=>tileSuit(t)===p.missing); if(miss.length)cand=miss; }
  let best=null;
  cand.forEach(t=>{
    const next=hand.slice(); removeTile(next,t);
    const prog=advisorProgress(next,p,openMelds), uk=advisorUkeire(next,p,pool,openMelds);
    const shape=handShapeScore(next), pot=advisorPatternPotential(next,p,openMelds);
    const raw=(prog.phase==='dingque'?-prog.debt*22:-Math.max(-1,prog.shanten)*17)+uk.total*1.35+shape*.46+pot*.13-advisorDiscardRisk(t,p.id)*.10;
    if(!best||raw>best.raw) best={tile:t,raw};
  });
  return best;
}
function advisorTwoStep(hand,p,pool,openMelds=p.melds.length){
  const prog=advisorProgress(hand,p,openMelds); if(prog.phase==='dingque') return 0;
  const uk0=advisorUkeire(hand,p,pool,openMelds);
  const candidates=uk0.tiles.slice();
  // 再补少量“不降向听但改善形状”的牌，近似 mahjong-helper 所展示的改良进张。
  const have=new Set(candidates.map(x=>x.tile)), baseShape=handShapeScore(hand), improves=[];
  for(let t=0;t<mode().tileKinds;t++){
    if(!pool[t]||have.has(t)) continue;
    const gain=handShapeScore(hand.concat([t]))-baseShape;
    if(gain>.9) improves.push({tile:t,count:pool[t],gain});
  }
  improves.sort((a,b)=>b.gain-a.gain); candidates.push(...improves.slice(0,4));
  let totalWeight=0, acc=0;
  for(const x of candidates){
    const t=x.tile,n=x.count||pool[t]; if(!n)continue;
    const h=hand.concat([t]); const np=advisorProgress(h,p,openMelds); let v;
    if(np.phase==='normal'&&np.shanten<0) v=100;
    else {
      const p2=pool.slice(); p2[t]=Math.max(0,p2[t]-1);
      const b=advisorBestDiscardFast(h,p,p2,openMelds);
      if(!b) v=0;
      else {
        const h2=h.slice(); removeTile(h2,b.tile);
        const pr=advisorProgress(h2,p,openMelds), uk=advisorUkeire(h2,p,p2,openMelds);
        v=clamp(78-Math.max(0,pr.shanten)*20+Math.min(30,uk.total*1.4),0,100);
      }
    }
    totalWeight+=n; acc+=n*v;
  }
  return totalWeight?acc/totalWeight:0;
}
function seededRandFactory(seed){ let x=(seed>>>0)||123456789; return ()=>{ x^=x<<13; x^=x>>>17; x^=x<<5; return ((x>>>0)%1000000)/1000000; }; }
function weightedSample(pool,rnd){
  const total=pool.reduce((a,b)=>a+b,0); if(total<=0)return -1;
  let r=rnd()*total; for(let i=0;i<pool.length;i++){ r-=pool[i]; if(r<0)return i; } return pool.length-1;
}
function advisorMonteCarlo(hand,p,pool,seed,openMelds=p.melds.length,iterations=42,depth=3){
  const base=advisorProgress(hand,p,openMelds); if(base.phase==='dingque') return 0;
  const rnd=seededRandFactory(seed); let total=0;
  for(let it=0;it<iterations;it++){
    let h=hand.slice(), pl=pool.slice(), reward=0;
    for(let d=0;d<depth;d++){
      const t=weightedSample(pl,rnd); if(t<0)break; pl[t]--; h.push(t);
      const pr=advisorProgress(h,p,openMelds);
      if(pr.phase==='normal'&&pr.shanten<0){ reward=1; break; }
      const b=advisorBestDiscardFast(h,p,pl,openMelds); if(!b)break; removeTile(h,b.tile);
      const now=advisorProgress(h,p,openMelds), uk=advisorUkeire(h,p,pl,openMelds);
      reward=Math.max(reward,clamp((3-Math.max(0,now.shanten))*.17+uk.total*.004,0,.86));
    }
    total+=reward;
  }
  return iterations?total/iterations*100:0;
}
function advisorEffectiveText(uk){
  return uk.tiles.slice().sort((a,b)=>b.count-a.count).slice(0,8).map(x=>tileName(x.tile)+'×'+x.count);
}
function normalizeDeepMetric(rows,key){
  const vals=rows.map(r=>r[key]||0), lo=Math.min(...vals), hi=Math.max(...vals);
  rows.forEach(r=>r[key+'Norm']=hi-lo<1e-6?50:20+80*(r[key]-lo)/(hi-lo));
}
function captureAdvisorSnapshot(){
  if(!state)return null;
  const players=state.players.map(p=>({
    id:p.id, hand:p.hand.slice(), melds:p.melds.map(m=>({...m,tiles:m.tiles?m.tiles.slice():undefined})),
    discards:p.discards.slice(), missing:p.missing, done:p.done, huInfo:p.huInfo?{...p.huInfo,tags:(p.huInfo.tags||[]).slice()}:null, lastDraw:p.lastDraw
  }));
  return Object.freeze({
    modeKey, gen:state.gen,
    state:{wall:new Array(state.wall.length).fill(-1),players,turn:state.turn,huCount:state.huCount,lastDiscFrom:state.lastDiscFrom,awaitDiscard:null,gen:state.gen}
  });
}
function analyzeDiscardSnapshot(snapshot,deep){
  if(!snapshot)return null;
  const liveState=state, liveMode=modeKey;
  try { state=snapshot.state; modeKey=snapshot.modeKey; return analyzeDiscardDecision(deep); }
  finally { state=liveState; modeKey=liveMode; }
}
function analyzeDiscardDecision(deep=false){
  if(!state)return null; const p=state.players[0];
  const pool=advisorRemainingCounts(p); let candidates=uniqueTiles(p.hand);
  if(mode().dingque){ const miss=candidates.filter(t=>tileSuit(t)===p.missing); if(miss.length)candidates=miss; }
  let rows=candidates.map(t=>{
    const next=p.hand.slice(); removeTile(next,t);
    const prog=advisorProgress(next,p), uk=advisorUkeire(next,p,pool), shape=clamp(38+handShapeScore(next)*2.3,0,100), potential=advisorPatternPotential(next,p), risk=advisorDiscardRisk(t,0);
    return {type:'discard',tile:t,progress:prog,ukeire:uk,shape,potential,risk,twoStep:0,mc:0};
  });
  if(deep){
    // 二阶搜索对全部候选运行；Monte Carlo 只对实时层最有希望的前四候选运行，避免阻塞浏览器。
    rows.forEach(r=>{ const next=p.hand.slice(); removeTile(next,r.tile); r.twoStep=advisorTwoStep(next,p,pool); });
    rows.forEach(r=>{
      const progScore=r.progress.phase==='dingque'?clamp(100-r.progress.debt*19,12,88):clamp(94-Math.max(-1,r.progress.shanten)*23,10,100);
      const speed=clamp(r.ukeire.total*3.15+(r.progress.shanten===0?16:0),0,100);
      r.prelim=progScore*.43+speed*.30+r.shape*.12+r.potential*.08+(100-r.risk)*.07;
    });
    const mcTargets=rows.slice().sort((a,b)=>b.prelim-a.prelim).slice(0,3);
    mcTargets.forEach(r=>{
      const next=p.hand.slice(); removeTile(next,r.tile);
      const seed=(r.tile+1)*2654435761 + state.wall.length*97 + p.discards.length*131 + p.hand.reduce((a,b)=>a*33+b+1,17);
      r.mc=advisorMonteCarlo(next,p,pool,seed>>>0,p.melds.length,6,2);
    });
    const mcFallback=rows.reduce((a,r)=>a+r.twoStep,0)/Math.max(1,rows.length);
    rows.forEach(r=>{ if(!r.mc)r.mc=mcFallback; });
    normalizeDeepMetric(rows,'twoStep'); normalizeDeepMetric(rows,'mc');
  } else { rows.forEach(r=>{r.twoStepNorm=50;r.mcNorm=50;}); }
  const startWall=mode().tileKinds*4-52, late=1-clamp(state.wall.length/Math.max(1,startWall),0,1);
  rows.forEach(r=>{
    const progScore=r.progress.phase==='dingque'?clamp(100-r.progress.debt*19,12,88):clamp(94-Math.max(-1,r.progress.shanten)*23,10,100);
    const speed=clamp(r.ukeire.total*3.15+(r.progress.shanten===0?16:0),0,100);
    const safety=100-r.risk;
    const safetyWeight=.10+late*.13;
    const futureWeight=deep?.20:.09;
    const attackWeight=1-safetyWeight-futureWeight-.12-.10;
    r.raw=attackWeight*(progScore*.56+speed*.44)+futureWeight*(r.twoStepNorm*.55+r.mcNorm*.45)+.12*r.shape+.10*r.potential+safetyWeight*safety;
  });
  rows.sort((a,b)=>b.raw-a.raw);
  const lo=Math.min(...rows.map(r=>r.raw)), hi=Math.max(...rows.map(r=>r.raw));
  rows.forEach((r,i)=>{ r.rank=i+1; r.score=Math.round(clamp(hi-lo<.001?82:58+42*(r.raw-lo)/(hi-lo),0,100)); });
  return {kind:'discard',deep,rows,pool,progress:advisorProgress(p.hand,p),currentUkeire:advisorUkeire(p.hand,p,pool),best:rows[0]||null};
}
function bestPostCallValue(hand,p,openMelds,pool){
  if(!hand.length) return 0;
  let best=-Infinity;
  uniqueTiles(hand).forEach(t=>{
    const h=hand.slice(); removeTile(h,t); const pr=advisorProgress(h,p,openMelds), uk=advisorUkeire(h,p,pool,openMelds);
    const v=(pr.phase==='dingque'?-pr.debt*18:-Math.max(-1,pr.shanten)*19)+uk.total*1.35+handShapeScore(h)*.35+advisorPatternPotential(h,p,openMelds)*.10;
    best=Math.max(best,v);
  });
  return best;
}
function analyzeActionDecision(ctx){
  if(!state||!ctx)return null; const p=state.players[0], pool=advisorRemainingCounts(p);
  const rows=[]; const opts=ctx.opts||[];
  const baseline=bestPostCallValue(p.hand,p,p.melds.length,pool);
  opts.forEach(a=>{
    let raw=baseline, reason='保持当前手牌';
    if(a==='hu'){ raw=999; reason='已经满足胡牌条件，规则允许时应优先胡牌'; }
    else if(a==='pass'){ raw=baseline; reason='保留门前结构与后续选择空间'; }
    else if(a==='pong'){
      const h=p.hand.slice(); removeTile(h,ctx.tile); removeTile(h,ctx.tile);
      raw=bestPostCallValue(h,p,p.melds.length+1,pool)+4.5-(modeKey==='traditional'?2.0:0);
      reason='比较碰后最佳舍牌的向听/进张与不开口的灵活性';
    } else if(a==='chi'){
      const choice=bestChi(p,ctx.tile,ctx.chiOpts||getChiOptions(p,ctx.tile));
      if(choice){ const h=p.hand.slice(); choice.need.forEach(x=>removeTile(h,x)); raw=bestPostCallValue(h,p,p.melds.length+1,pool)+2.4-(modeKey==='traditional'?1.4:0); reason='推荐吃 '+choice.tiles.map(tileName).join('·')+'，并继续搜索吃后的最佳舍牌'; }
      else raw=-999;
    } else if(a==='gang'){
      raw=baseline+7+(state.wall.length>12?2:-2); reason='计入杠分、补牌机会与手牌结构变化';
    }
    rows.push({type:'action',action:a,raw,reason});
  });
  rows.sort((a,b)=>b.raw-a.raw); const finite=rows.filter(r=>Number.isFinite(r.raw)&&Math.abs(r.raw)<900); const lo=finite.length?Math.min(...finite.map(r=>r.raw)):0, hi=finite.length?Math.max(...finite.map(r=>r.raw)):1;
  rows.forEach((r,i)=>{ r.rank=i+1; r.score=r.action==='hu'?100:Math.round(clamp(hi-lo<.001?82:58+40*(r.raw-lo)/(hi-lo),0,99)); });
  return {kind:'action',rows,best:rows[0]||null,context:ctx,progress:advisorProgress(p.hand,p),currentUkeire:advisorUkeire(p.hand,p,pool)};
}
function advisorReason(r){
  if(r.type==='action') return r.reason;
  const parts=[];
  if(r.progress.phase==='dingque') parts.push('定缺剩'+r.progress.debt+'张'); else parts.push(r.progress.label);
  parts.push('进张'+r.ukeire.total+'枚');
  if(r.risk<12) parts.push('风险低'); else if(r.risk>35) parts.push('风险偏高');
  if(r.potential>=68) parts.push('牌型潜力高');
  if(r.twoStepNorm>=68) parts.push('后续改良好');
  return parts.join(' · ');
}
function renderAdvisor(){
  const panel=document.getElementById('advisorPanel'), content=document.getElementById('advisorContent'), btn=document.getElementById('advisorToggleBtn');
  if(!panel||!content)return; panel.classList.toggle('open',advisor.panelOpen); btn&&btn.classList.toggle('active',advisor.panelOpen); document.body.classList.toggle('advisor-open',advisor.panelOpen);
  const sel=document.getElementById('advisorModeSelect'); if(sel)sel.value=advisor.mode;
  if(advisor.mode==='off'){ content.innerHTML='<div class="advisor-off-state"><b>AI 辅助：关闭</b><span>默认不计算出牌推荐、响应评分与牌面高亮。</span><em>如需辅助，请在上方选择“实时”或“深度”。</em></div>'; return; }
  if(!state){ content.innerHTML='<div class="advisor-empty">选择规则并开局后开始分析。</div>'; return; }
  const a=advisor.analysis, p=state.players[0];
  if(!a){
    const pool=advisorRemainingCounts(p), pr=advisorProgress(p.hand,p), uk=advisorUkeire(p.hand,p,pool);
    content.innerHTML='<div class="advisor-status"><b>'+pr.label+'</b><span>等待可操作节点</span></div><div class="advisor-metrics"><div class="advisor-metric"><b>'+ (pr.shanten==null?'—':pr.shanten) +'</b><small>向听</small></div><div class="advisor-metric"><b>'+uk.total+'</b><small>有效进张</small></div><div class="advisor-metric"><b>'+state.wall.length+'</b><small>牌墙</small></div><div class="advisor-metric"><b>'+advisor.history.length+'</b><small>已复盘</small></div></div><div class="advisor-empty">当前不是你的决策节点。分析器在后台保持工作；到你出牌或响应吃碰杠胡时会生成并缓存逐项评分。关闭本窗口不会停止计算。</div>'+advisorHistoryHtml();
    return;
  }
  const deepLabel=a.deep?'深度搜索完成':(advisor.computing?'先给实时结果，正在补充深度搜索…':'实时分析');
  const pr=a.progress||advisorProgress(p.hand,p), uk=a.currentUkeire||{total:0};
  let html='<div class="advisor-status"><b>'+(a.kind==='discard'?'推荐：打 '+tileName(a.best.tile):'推荐：'+actionLabel(a.best.action))+'</b><span>'+deepLabel+'</span></div>';
  html+='<div class="advisor-metrics"><div class="advisor-metric"><b>'+(pr.shanten==null?'—':pr.shanten)+'</b><small>当前向听</small></div><div class="advisor-metric"><b>'+uk.total+'</b><small>当前进张</small></div><div class="advisor-metric"><b>'+(a.best?a.best.score:'—')+'</b><small>最佳价值</small></div><div class="advisor-metric"><b>'+state.wall.length+'</b><small>牌墙</small></div></div>';
  html+='<div class="advisor-section-title">候选决策排名</div><div class="advisor-list">';
  a.rows.forEach((r,i)=>{
    const name=r.type==='discard'?'打 '+tileName(r.tile):actionLabel(r.action);
    const eff=r.type==='discard'?advisorEffectiveText(r.ukeire):[];
    const medal=['壹','贰','叁','肆','伍','陆','柒','捌','玖'][i]||String(i+1);
    const visual=r.type==='discard'?'<img class="advisor-tile-thumb" src="'+tileAssetPath(r.tile)+'" alt="'+tileName(r.tile)+'">':'<span class="advisor-action-glyph">'+actionLabel(r.action)+'</span>';
    html+='<div class="advisor-row '+(i===0?'best':'')+'"><span class="rank-medal" title="第 '+(i+1)+' 名">'+medal+'</span>'+visual+'<div><div class="advisor-rank">'+name+'<em>'+(r.type==='discard'?'风险 '+Math.round(r.risk)+'%':'动作评估')+'</em></div><div class="advisor-bar"><i style="width:'+r.score+'%"></i></div><div class="advisor-reason">'+advisorReason(r)+'</div>'+(eff.length?'<div class="advisor-effective">'+eff.map(x=>'<span>'+x+'</span>').join('')+'</div>':'')+'</div><div class="advisor-score">'+r.score+'<small>/100</small></div></div>';
  });
  html+='</div>'+advisorHistoryHtml();
  html+='<div class="advisor-note">评分为同一决策节点内的相对价值，不代表真实胜率。每次本人决策会冻结一份先验记录供局末复盘。算法层：精确四面子一将/七对向听搜索、可见牌剩余计数、有效进张、二阶摸打搜索、牌型潜力、公开信息风险模型；深度档再加入固定随机种子的多轮 Monte Carlo。辅助器不会读取电脑暗手或牌墙顺序，因此不会“作弊”。</div>';
  content.innerHTML=html;
}
function advisorHistoryHtml(){
  let html='<div class="advisor-section-title">你的决策复盘</div>';
  if(!advisor.history.length)return html+'<div class="advisor-empty">尚无决策记录。</div>';
  html+='<div class="advisor-history">'+advisor.history.map(h=>'<div><b>'+h.choice+'</b> · '+h.summary+'</div>').join('')+'</div>';
  return html;
}
function actionLabel(a){ return ({hu:'胡',gang:'杠',pong:'碰',chi:'吃',pass:'过'})[a]||a; }
function refreshAdvisor(forceDeep=false){
  if(advisor.mode==='off'){advisor.analysis=null;renderAdvisor();return;}
  advisor.token++; const token=advisor.token;
  if(!state){advisor.analysis=null;renderAdvisor();return;}
  if(advisor.pendingActionContext){ advisor.analysis=analyzeActionDecision(advisor.pendingActionContext); advisor.computing=false; renderAdvisor(); updateActionButtonScores(); return; }
  if(state.awaitDiscard){
    const key=advisorSnapshotKey('discard|'+advisor.mode);
    const cached=advisor.cache.get(key);
    if(cached&&!forceDeep){advisor.analysis=cached;advisor.computing=false;renderAdvisor();renderHand();return;}
    const snapshot=captureAdvisorSnapshot();
    advisor.analysis=analyzeDiscardDecision(false); advisor.analysis.nodeKey=key; advisor.computing=advisor.mode==='deep'; renderAdvisor(); renderHand();
    if(advisor.mode==='deep') setTimeout(()=>{
      const deep=analyzeDiscardSnapshot(snapshot,true); if(!deep)return; deep.nodeKey=key;
      advisor.cache.set(key,deep); if(advisor.cache.size>50)advisor.cache.delete(advisor.cache.keys().next().value);
      upgradeReviewDecisionFromDeep(key,deep);
      const stillCurrent=!!(state&&state.gen===snapshot.gen&&state.awaitDiscard&&advisor.analysis&&advisor.analysis.nodeKey===key);
      if(stillCurrent){ advisor.analysis=deep; advisor.computing=false; renderAdvisor(); renderHand(); }
      else if(advisor.analysis&&advisor.analysis.nodeKey===key) advisor.computing=false;
    },20);
    return;
  }
  advisor.analysis=null; advisor.computing=false; renderAdvisor();
}
function setAdvisorMode(v){ advisor.mode=v; advisor.cache.clear(); advisor.analysis=null; advisor.computing=false; updateAdvisorToggleChrome(); refreshAdvisor(v==='deep'); renderAdvisor(); renderHand(); }
function updateAdvisorToggleChrome(){
  const btn=document.getElementById('advisorToggleBtn'); if(!btn)return;
  const label=advisor.mode==='off'?'关':advisor.mode==='deep'?'深度':'实时';
  btn.textContent='AI 辅助 · '+label;
  btn.classList.toggle('advisor-enabled',advisor.mode!=='off');
  btn.title=advisor.mode==='off'?'AI 辅助当前关闭；点击打开设置':'AI 辅助已开启（'+label+'）；点击查看或调整';
}
function toggleAdvisorPanel(){
  advisor.panelOpen=!advisor.panelOpen;
  updateAdvisorToggleChrome(); renderAdvisor(); renderHand();
  if(advisor.panelOpen) updateActionButtonScores();
  else document.querySelectorAll('#actions .action-advisor-score').forEach(x=>x.remove());
}
function recordAdvisorChoice(kind,value){
  const a=advisor.analysis; if(!a)return;
  let row=null,choice='';
  if(kind==='discard'){ row=a.rows.find(r=>r.tile===value); choice='打 '+tileName(value); }
  else { row=a.rows.find(r=>r.action===value); choice=actionLabel(value); }
  if(!row)return; const best=a.best;
  let summary;
  if(row.rank===1) summary='与 AI 推荐一致，价值 '+row.score+' 分。';
  else { const bestName=best.type==='discard'?'打 '+tileName(best.tile):actionLabel(best.action); summary='AI 排名 #'+row.rank+'，价值 '+row.score+'；推荐 '+bestName+'（'+best.score+' 分），差 '+(best.score-row.score)+' 分。'; }
  advisor.history.unshift({choice,summary,ts:Date.now()}); if(advisor.history.length>80)advisor.history.pop();
  recordReviewDecision(kind,value,a,row,best);
}
function updateActionButtonScores(){
  if(!advisor.panelOpen||!advisor.analysis||advisor.analysis.kind!=='action')return;
  document.querySelectorAll('#actions .abtn').forEach(b=>{
    const action=[...b.classList].find(x=>['hu','gang','pong','chi','pass'].includes(x)); const r=advisor.analysis.rows.find(x=>x.action===action); if(r&&!b.querySelector('.action-advisor-score')){ const sp=document.createElement('span');sp.className='action-advisor-score';sp.textContent='AI '+r.score+'分';b.appendChild(sp); }
  });
}

/* ---------- 人机交互 ---------- */
function actionTargetText(action,context){
  if(!context)return '';
  if(action==='pass')return '不响应';
  if(context.type==='claim'&&Number.isInteger(context.tile)){
    if(action==='chi'&&context.chiOpts&&context.chiOpts.length){
      const chosen=state&&state.players[0]?bestChi(state.players[0],context.tile,context.chiOpts):context.chiOpts[0];
      return '采用 '+chosen.tiles.map(tileName).join('·');
    }
    return tileName(context.tile);
  }
  if(context.type==='self'){
    if(action==='hu')return '自摸手牌';
    if(action==='gang')return [...(context.angangs||[]),...(context.bugangs||[])].map(tileName).join(' / ');
  }
  return '';
}
function askHuman(opts,context=null){
  return new Promise(res=>{
    const bar=document.getElementById('actions'); bar.innerHTML='';
    const stage=document.getElementById('gameStage'); if(stage)stage.classList.add('has-action-window');
    const meta={
      hu:{glyph:'胡',caption:'天命终局',en:'WIN'},
      gang:{glyph:'杠',caption:'四象雷鸣',en:'KONG'},
      pong:{glyph:'碰',caption:'震岳破阵',en:'PONG'},
      chi:{glyph:'吃',caption:'连契吞风',en:'CHOW'},
      pass:{glyph:'过',caption:'放弃响应',en:'PASS'}
    };
    advisor.pendingActionContext=context?{...context,opts:opts.slice()}:null;
    const callout=document.createElement('div'); callout.className='action-context';
    if(context&&context.type==='claim'&&Number.isInteger(context.tile)){
      const chiLine=context.chiOpts&&context.chiOpts.length?'<span class="action-targets">可吃 '+context.chiOpts.map(o=>o.tiles.map(tileName).join('·')).join(' / ')+'</span>':'';
      callout.innerHTML='<span class="action-context-kicker">响应 '+playerName(context.fromId)+' 的弃牌</span><span class="action-context-copy">'+playerName(context.fromId)+' 打出</span><img src="'+tileAssetPath(context.tile)+'" alt="'+tileName(context.tile)+'"><b>目标：'+tileName(context.tile)+chiLine+'</b>';
    }else{
      const gangTiles=[...(context&&context.angangs||[]),...(context&&context.bugangs||[])];
      const focus=gangTiles[0];
      callout.innerHTML='<span class="action-context-kicker">你的回合 · 自己操作</span><span class="action-context-copy">可执行特殊操作</span>'+(Number.isInteger(focus)?'<img src="'+tileAssetPath(focus)+'" alt="'+tileName(focus)+'">':'')+'<b>'+(gangTiles.length?'可杠：'+gangTiles.map(tileName).join(' / '):'可自摸胡牌')+'</b>';
    }
    bar.appendChild(callout);
    const choices=document.createElement('div'); choices.className='action-choices'; bar.appendChild(choices);
    opts.forEach((o,idx)=>{
      const m=meta[o], b=document.createElement('button');
      const target=actionTargetText(o,context);
      b.className='abtn '+o+' motion-action-in'; b.dataset.action=o; b.setAttribute('aria-label',m.glyph+'：'+m.caption+(target?'，目标 '+target:''));
      b.innerHTML='<span class="action-glyph">'+m.glyph+'</span><span class="action-caption">'+m.caption+' <i>/ '+m.en+'</i></span>'+(target?'<span class="action-button-target">'+target+'</span>':'');
      b.style.setProperty('--motion-delay',(idx*48)+'ms');
      b.onclick=()=>{
        if(bar.dataset.resolving)return; bar.dataset.resolving='1';
        window.__lastHumanActionIntent={action:o,context:context?{...context}:null,ts:Date.now()};
        motionCommitAction(b,o).then(()=>{ recordAdvisorChoice('action',o); advisor.pendingActionContext=null; advisor.analysis=null; bar.innerHTML=''; if(stage)stage.classList.remove('has-action-window'); delete bar.dataset.resolving; renderAdvisor(); res(o); });
      };
      choices.appendChild(b);
    });
    refreshAdvisor(false); updateActionButtonScores();
  });
}
function humanDiscard(){
  return new Promise(res=>{
    state.awaitDiscard=(t)=>{ recordAdvisorChoice('discard',t); advisor.analysis=null; renderAdvisor(); res(t); };
    log(mode().dingque?'请点击一张手牌打出（红框为缺门牌，必须优先打缺）':'请点击一张手牌打出');
    renderHand(); refreshAdvisor(false);
  });
}

/* ---------- 模式化 AI ---------- */
function handShapeScore(hand){
  const c=counts(hand), n=c.length; let score=0;
  for(let t=0;t<n;t++){
    if(!c[t]) continue;
    if(c[t]>=2) score += 4.4*(c[t]-1);
    if(c[t]>=3) score += 3.2;
    if(t<27){
      const r=t%9;
      if(r<8&&c[t+1]) score += 2.25*Math.min(c[t],c[t+1]);
      if(r<7&&c[t+2]) score += 1.15*Math.min(c[t],c[t+2]);
      if(r>0&&r<8&&c[t-1]&&c[t+1]) score += 1.1;
    } else if(c[t]===1) score -= .55; // 单张字牌连接性低
  }
  return score;
}
function visibleCount(t, viewer){
  let n=viewer.hand.filter(x=>x===t).length;
  state.players.forEach(p=>{
    n+=p.discards.filter(x=>x===t).length;
    p.melds.forEach(m=>{
      if(m.type==='chi') n+=m.tiles.filter(x=>x===t).length;
      else if(m.tile===t) n+=(m.type==='pong'?3:4);
    });
  });
  return Math.min(4,n);
}
function effectiveTileScore(hand, viewer){
  const base=handShapeScore(hand); let total=0;
  for(let t=0;t<mode().tileKinds;t++){
    if(mode().dingque&&tileSuit(t)===viewer.missing) continue;
    const improve=handShapeScore(hand.concat([t]))-base;
    if(improve>1.2) total += Math.max(0,4-visibleCount(t,viewer))*Math.min(3.5,improve);
  }
  return total;
}
function discardDanger(t, pid){
  if(!aiCfg().useSafety) return 0;
  let risk=0;
  state.players.forEach(op=>{
    if(op.id===pid||op.done) return;
    if(op.discards.includes(t)) risk -= 1.8; // 该玩家自己打过，通常更安全
    if(t<27){
      const s=tileSuit(t), r=t%9;
      const sameSuitRecent=op.discards.slice(-7).filter(x=>x<27&&tileSuit(x)===s).length;
      risk -= sameSuitRecent*.12;
      if(r>=3&&r<=7) risk += .35; // 中张通常更容易形成搭子
    } else risk -= .18; // 字牌在可见信息下通常更容易逐渐变安全
  });
  return Math.max(-2.5,risk);
}
function aiDiscard(p){
  let candidates=p.hand.slice();
  if(mode().dingque){
    const miss=candidates.filter(t=>tileSuit(t)===p.missing);
    if(miss.length) candidates=miss;
  }
  const cfg=aiCfg(); let best=candidates[0], bestScore=-Infinity;
  candidates.forEach(t=>{
    const next=p.hand.slice(); removeTile(next,t);
    let score=handShapeScore(next);
    if(cfg.useUkeire) score += effectiveTileScore(next,p)*.12;
    if(cfg.useSafety) score -= discardDanger(t,p.id)*1.15;
    // 入门AI保留明显随机性；进阶AI几乎不随机。
    score += (Math.random()-.5)*cfg.randomness;
    if(score>bestScore){ bestScore=score; best=t; }
  });
  return best;
}
function aiWantsGang(p){
  if(aiLevelKey==='beginner') return Math.random()<.82;
  if(aiLevelKey==='standard') return state.wall.length>10 || Math.random()<.76;
  return state.wall.length>7;
}
function aiWantsPong(p,tile){
  if(aiLevelKey==='beginner') return Math.random()<.58;
  const before=handShapeScore(p.hand);
  const next=p.hand.slice(); removeTile(next,tile); removeTile(next,tile);
  const after=handShapeScore(next)+4.2;
  const bonus=(tile>=27?1.0:0)+(mode().dingque?.55:0);
  const threshold=aiLevelKey==='advanced'?1.0:.35;
  return after+bonus-before>threshold;
}
function getChiOptions(p,tile){
  if(!mode().allowChi||tile>=27) return [];
  const r=tile%9, opts=[];
  const patterns=[[-2,-1],[-1,1],[1,2]];
  patterns.forEach(ds=>{
    const rs=ds.map(d=>r+d);
    if(rs.some(x=>x<0||x>8)) return;
    const need=ds.map(d=>tile+d);
    const temp=p.hand.slice(); let ok=true;
    need.forEach(x=>{ const i=temp.indexOf(x); if(i<0) ok=false; else temp.splice(i,1); });
    if(ok) opts.push({need,tiles:[need[0],tile,need[1]].sort((a,b)=>a-b)});
  });
  return opts;
}
function bestChi(p,tile,opts){
  let best=null,bestScore=-Infinity;
  opts.forEach(o=>{
    const next=p.hand.slice(); o.need.forEach(x=>removeTile(next,x));
    const s=handShapeScore(next)+3.3;
    if(s>bestScore){bestScore=s;best=o;}
  });
  return best;
}
function aiWantsChi(p,tile,opts){
  if(!opts.length) return false;
  if(aiLevelKey==='beginner') return Math.random()<.50;
  const before=handShapeScore(p.hand), o=bestChi(p,tile,opts), next=p.hand.slice(); o.need.forEach(x=>removeTile(next,x));
  const gain=handShapeScore(next)+3.3-before;
  return gain>(aiLevelKey==='advanced'?1.1:.35);
}
async function getDiscard(p){ if(p.id===0) return await humanDiscard(); await delay(aiLevelKey==='advanced'?420:500); return aiDiscard(p); }

/* ---------- 胡 / 杠 / 碰 / 吃 ---------- */
function doHu(p,tile,zimo,fromId,gangHua,consumeDiscard=true){
  const winHand=tile!=null?p.hand.concat([tile]):p.hand.slice();
  if(tile!=null){ if(consumeDiscard) state.players[fromId].discards.pop(); p.hand.push(tile); }
  const info=calcFan(p,winHand,zimo,gangHua); p.done=true; p.huInfo=info; state.huCount++;
  if(zimo){
    let gain=0; state.players.forEach(q=>{ if(q!==p&&!q.done){ totalScores[q.id]-=info.score; gain+=info.score; } }); totalScores[p.id]+=gain;
    log('🎉 '+playerName(p.id)+' 自摸！['+info.tags.join('·')+'] '+info.fan+'番，每家付 '+info.score+' 分');
  } else {
    totalScores[fromId]-=info.score; totalScores[p.id]+=info.score;
    log('🎉 '+playerName(p.id)+' 胡了 '+playerName(fromId)+' 的 '+tileName(tile)+'！['+info.tags.join('·')+'] '+info.fan+'番，得 '+info.score+' 分');
  }
  reviewEvent('hu',{player:p.id,tile:tile,zimo,fromId,tags:info.tags.slice(),fan:info.fan});
  renderAll(); motionImpactPlayer(p.id,'hu');
}
function gangPay(p,type,fromId){
  if(type==='an'){
    state.players.forEach(q=>{if(q!==p&&!q.done){totalScores[q.id]-=2;totalScores[p.id]+=2;}}); log(playerName(p.id)+' 暗杠！每家付 2 分');
  } else if(type==='ming'){
    totalScores[fromId]-=2; totalScores[p.id]+=2; log(playerName(p.id)+' 明杠 '+playerName(fromId)+'！放杠者付 2 分');
  } else {
    state.players.forEach(q=>{if(q!==p&&!q.done){totalScores[q.id]-=1;totalScores[p.id]+=1;}}); log(playerName(p.id)+' 补杠！每家付 1 分');
  }
}
async function selfPhase(p,gangHua){
  while(true){
    const canZimo=canWin(p,null), c=counts(p.hand), angangs=[],bugangs=[];
    for(let t=0;t<c.length;t++) if(c[t]===4&&(!mode().dingque||tileSuit(t)!==p.missing)) angangs.push(t);
    p.melds.forEach(m=>{if(m.type==='pong'&&p.hand.includes(m.tile)) bugangs.push(m.tile);});
    if(p.id===0){
      const opts=[]; if(canZimo)opts.push('hu'); if((angangs.length||bugangs.length)&&state.wall.length>0)opts.push('gang'); if(!opts.length)return null; opts.push('pass');
      const a=await askHuman(opts,{type:'self',gangHua,angangs:angangs.slice(),bugangs:bugangs.slice()}); if(a==='pass')return null; if(a==='hu'){doHu(p,null,true,-1,gangHua);return 'hu';}
      if(angangs.length){ const t=angangs[0]; for(let k=0;k<4;k++)removeTile(p.hand,t); p.melds.push({type:'an',tile:t}); reviewEvent('meld',{player:p.id,label:'暗杠 '+tileName(t),typeName:'an',tile:t}); gangPay(p,'an'); motionImpactPlayer(p.id,'gang'); }
      else { const t=bugangs[0]; removeTile(p.hand,t); p.melds.find(m=>m.type==='pong'&&m.tile===t).type='bu'; reviewEvent('meld',{player:p.id,label:'补杠 '+tileName(t),typeName:'bu',tile:t}); gangPay(p,'bu'); motionImpactPlayer(p.id,'gang'); }
    } else {
      if(canZimo){doHu(p,null,true,-1,gangHua);return 'hu';}
      if(!(angangs.length||bugangs.length)||!state.wall.length||!aiWantsGang(p)) return null;
      if(angangs.length){ const t=angangs[0]; for(let k=0;k<4;k++)removeTile(p.hand,t); p.melds.push({type:'an',tile:t}); reviewEvent('meld',{player:p.id,label:'暗杠 '+tileName(t),typeName:'an',tile:t}); gangPay(p,'an'); motionImpactPlayer(p.id,'gang'); }
      else { const t=bugangs[0]; removeTile(p.hand,t); p.melds.find(m=>m.type==='pong'&&m.tile===t).type='bu'; reviewEvent('meld',{player:p.id,label:'补杠 '+tileName(t),typeName:'bu',tile:t}); gangPay(p,'bu'); motionImpactPlayer(p.id,'gang'); }
    }
    if(!state.wall.length)return null;
    const nt=state.wall.pop(); p.hand.push(nt); p.lastDraw=nt; reviewEvent('draw',{player:p.id,tile:nt,source:'gang',wall:state.wall.length}); renderAll(); motionDrawForPlayer(p.id,nt,'gang'); if(p.id!==0)await delay(760); gangHua=true;
  }
}

async function resolveClaims(tile,fromId){
  // 1. 胡牌优先。川麻允许一炮多响；传统基础模式按座次最近者单响。
  const huers=[];
  for(let k=1;k<4;k++){
    const pid=(fromId+k)%4,p=state.players[pid]; if(p.done||!canWin(p,tile))continue;
    let accept=true;
    if(pid===0){log('你可以胡 '+tileName(tile)+'！');accept=(await askHuman(['hu','pass'],{type:'claim',tile,fromId})==='hu');}
    if(accept){huers.push(pid);if(!mode().multiHu)break;}
  }
  if(huers.length){
    huers.forEach((pid,idx)=>doHu(state.players[pid],tile,false,fromId,false,idx===0));
    return {type:'hu'};
  }

  // 2. 杠 / 碰：任何一家都可以响应。
  for(let k=1;k<4;k++){
    const pid=(fromId+k)%4,p=state.players[pid];
    if(p.done||(mode().dingque&&tileSuit(tile)===p.missing))continue;
    const cnt=p.hand.filter(x=>x===tile).length;
    if(cnt>=3){
      let want='pass';
      if(pid===0){log('你可以杠或碰 '+tileName(tile));want=await askHuman(['gang','pong','pass'],{type:'claim',tile,fromId});}
      else if(state.wall.length>0&&aiWantsGang(p)) want='gang'; else if(aiWantsPong(p,tile)) want='pong';
      if(want==='gang'&&state.wall.length>0){
        for(let j=0;j<3;j++)removeTile(p.hand,tile); state.players[fromId].discards.pop(); p.melds.push({type:'ming',tile}); reviewEvent('meld',{player:pid,label:'明杠 '+tileName(tile),typeName:'ming',tile}); gangPay(p,'ming',fromId); renderAll(); motionImpactPlayer(pid,'gang'); return {type:'gang',player:pid};
      }
      if(want==='pong'){
        for(let j=0;j<2;j++)removeTile(p.hand,tile); state.players[fromId].discards.pop(); p.melds.push({type:'pong',tile}); reviewEvent('meld',{player:pid,label:'碰 '+tileName(tile),typeName:'pong',tile}); log(playerName(pid)+' 碰 '+tileName(tile)); renderAll(); motionImpactPlayer(pid,'pong'); return {type:'pong',player:pid};
      }
    } else if(cnt===2){
      let want='pass';
      if(pid===0){log('你可以碰 '+tileName(tile));want=await askHuman(['pong','pass'],{type:'claim',tile,fromId});}
      else want=aiWantsPong(p,tile)?'pong':'pass';
      if(want==='pong'){
        for(let j=0;j<2;j++)removeTile(p.hand,tile); state.players[fromId].discards.pop(); p.melds.push({type:'pong',tile}); reviewEvent('meld',{player:pid,label:'碰 '+tileName(tile),typeName:'pong',tile}); log(playerName(pid)+' 碰 '+tileName(tile)); renderAll(); motionImpactPlayer(pid,'pong'); return {type:'pong',player:pid};
      }
    }
  }

  // 3. 吃：仅传统模式，且只有出牌者的下家可吃。
  if(mode().allowChi){
    const pid=(fromId+1)%4,p=state.players[pid];
    if(!p.done){
      const opts=getChiOptions(p,tile);
      if(opts.length){
        let want=false;
        if(pid===0){log('你可以吃 '+tileName(tile));want=(await askHuman(['chi','pass'],{type:'claim',tile,fromId,chiOpts:opts})==='chi');}
        else want=aiWantsChi(p,tile,opts);
        if(want){
          const choice=bestChi(p,tile,opts); choice.need.forEach(x=>removeTile(p.hand,x)); state.players[fromId].discards.pop();
          p.melds.push({type:'chi',tile,tiles:choice.tiles}); reviewEvent('meld',{player:pid,label:'吃 '+choice.tiles.map(tileName).join('·'),typeName:'chi',tiles:choice.tiles.slice()}); log(playerName(pid)+' 吃 '+choice.tiles.map(tileName).join('·')); renderAll(); motionImpactPlayer(pid,'chi'); return {type:'chi',player:pid};
        }
      }
    }
  }
  return null;
}

/* ---------- 主流程 ---------- */
function roundOver(){ return state.wall.length===0 || (mode().bloodBattle?state.huCount>=3:state.huCount>=1); }
async function gameLoop(){
  const myGen=state.gen;
  while(!roundOver()){
    if(state.gen!==myGen)return;
    const p=state.players[state.turn]; if(p.done){state.turn=(state.turn+1)%4;continue;}
    if(!state.wall.length)break;
    const t=state.wall.pop(); p.hand.push(t); p.lastDraw=t; reviewEvent('draw',{player:p.id,tile:t,source:'wall',wall:state.wall.length}); renderAll(); motionDrawForPlayer(p.id,t,'wall'); if(p.id===0)log('你摸到 '+tileName(t)); await delay(p.id===0?650:680);
    if(state.gen!==myGen)return;
    const r=await selfPhase(p,false); if(state.gen!==myGen)return;
    if(r==='hu'){ if(roundOver())break; state.turn=(state.turn+1)%4; continue; }
    if(roundOver())break;
    let discarder=p, dt=await getDiscard(p); if(state.gen!==myGen)return;
    while(true){
      motionPrepareDiscard(discarder.id,dt);
      removeTile(discarder.hand,dt); discarder.discards.push(dt); state.lastDiscFrom=discarder.id; reviewEvent('discard',{player:discarder.id,tile:dt,wall:state.wall.length}); log(playerName(discarder.id)+' 打出 '+tileName(dt)); renderAll(); await motionCommitDiscard(discarder.id,dt); await delay(110);
      if(state.gen!==myGen)return;
      const claim=await resolveClaims(dt,discarder.id); if(state.gen!==myGen)return;
      if(!claim){state.turn=(discarder.id+1)%4;break;}
      if(claim.type==='hu'){state.turn=(discarder.id+1)%4;break;}
      const cp=state.players[claim.player];
      if(claim.type==='gang'&&state.wall.length){
        const nt=state.wall.pop();cp.hand.push(nt);cp.lastDraw=nt;reviewEvent('draw',{player:cp.id,tile:nt,source:'gang',wall:state.wall.length});renderAll();motionDrawForPlayer(cp.id,nt,'gang');await delay(760);
        const r2=await selfPhase(cp,true);if(state.gen!==myGen)return;if(r2==='hu'){state.turn=(claim.player+1)%4;break;}
      }
      if(roundOver()||!state.wall.length)break;
      state.turn=claim.player;renderAll();discarder=cp;dt=await getDiscard(cp);if(state.gen!==myGen)return;
    }
  }
  if(state.gen===myGen)endRound();
}
let reviewUiTab='simple';
function escapeHtml(x){ return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function reviewGrade(){
  if(!review.decisions.length)return '—';
  const avg=review.decisions.reduce((a,d)=>a+d.valueGap,0)/review.decisions.length;
  const severe=review.decisions.filter(d=>d.valueGap>=15).length;
  const score=clamp(100-avg*2.2-severe*4,0,100);
  return score>=94?'A+':score>=86?'A':score>=78?'B+':score>=68?'B':score>=58?'C':'D';
}
function reviewDecisionHtml(d,detailed){
  const good=d.choiceRank===1, reason=detailed&&d.candidates&&d.candidates.length
    ?'<div class="review-candidates">'+d.candidates.slice(0,6).map(c=>'<span>#'+c.rank+' '+escapeHtml(c.label)+' '+c.score+'分'+(c.type==='discard'?' 进张'+c.ukeire+' 风险'+c.risk+'%':'')+'</span>').join('')+'</div>':'';
  const posterior=detailed?'<p>'+escapeHtml(reviewPosteriorLine(d))+'</p>':'';
  return '<div class="review-decision '+(good?'good':'bad')+'"><span class="node">N'+d.id+'</span><div><b>'+escapeHtml(d.choiceLabel)+' <small>→ AI '+escapeHtml(d.bestLabel)+'</small></b><p>'+(good?'与当时 AI 首选一致。':'当时排名 #'+d.choiceRank+'，价值 '+d.choiceScore+'；最佳价值 '+d.bestScore+'。')+' · '+d.analysisDepth+'分析</p>'+reason+posterior+'</div><span class="gap">'+(d.valueGap?'-'+d.valueGap:'最优')+'</span></div>';
}
function buildReviewTabHtml(kind){
  const detailed=kind==='detail'; let html='';
  html+='<section class="review-section"><h3>本人决策 // HUMAN DECISIONS</h3>';
  html+=review.decisions.length?review.decisions.map(d=>reviewDecisionHtml(d,detailed)).join(''):'<div class="advisor-empty">本局没有可记录的人工决策。</div>';
  html+='</section>';
  const tracks=reviewDiscardTracks();
  html+='<section class="review-section"><h3>公开轨迹 // TABLE TRACKS</h3><div class="review-tracks">'+tracks.map(x=>'<div class="review-track"><b>'+escapeHtml(playerName(x.player))+'</b><br>'+escapeHtml(fmtTiles(x.tiles))+'</div>').join('')+'</div></section>';
  if(detailed){
    const r=review.result||{};
    html+='<section class="review-section"><h3>先验 / 后验边界</h3><div class="review-track">在线 AI 只使用决策当时的本人手牌与公开信息；局末的对手暗手、最终手牌与实际摸牌轨迹仅用于后验描述，不反向污染当时评分。<br><br>胡牌者：'+escapeHtml(r.winners&&r.winners.length?r.winners.map(w=>playerName(w.player)+'['+w.tags.join('·')+']').join('；'):'流局/无人胡')+'<br>最终总分：'+escapeHtml(review.finalScores.map((v,i)=>playerName(i)+'='+v).join('；'))+'</div></section>';
  }
  return html;
}
function renderReviewTab(kind){
  reviewUiTab=kind==='detail'?'detail':'simple';
  document.querySelectorAll('.review-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===reviewUiTab));
  const body=document.getElementById('reviewTabBody'); if(body)body.innerHTML=buildReviewTabHtml(reviewUiTab);
}
function reviewRadarSvg(agreeRate,avgGap,severeRate,deepRate,delta){
  const vals=[
    Math.round(agreeRate*100),
    Math.max(10,Math.round(100-Number(avgGap)*5)),
    Math.round(deepRate*100),
    Math.max(10,Math.round(100-severeRate*100)),
    Math.max(10,Math.min(100,50+Number(delta)*2))
  ];
  const labels=['一致率','稳定性','复盘覆盖','失误控制','结果收益'];
  const cx=120,cy=112,R=78,pts=[];
  for(let i=0;i<5;i++){ const a=-Math.PI/2+i*2*Math.PI/5; const r=R*vals[i]/100; pts.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]); }
  function ring(fr){ const p=[]; for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5;p.push((cx+Math.cos(a)*R*fr).toFixed(1)+','+(cy+Math.sin(a)*R*fr).toFixed(1));} return p.join(' '); }
  const axes=labels.map((l,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;const x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R;const tx=cx+Math.cos(a)*(R+24),ty=cy+Math.sin(a)*(R+21);return '<line class="axis" x1="'+cx+'" y1="'+cy+'" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'"/><text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" text-anchor="middle">'+l+'</text>';}).join('');
  return '<svg class="review-radar" viewBox="0 0 240 225" role="img" aria-label="本局复盘表现雷达">'+
    '<polygon class="grid" points="'+ring(1)+'"/><polygon class="grid" points="'+ring(.66)+'"/><polygon class="grid" points="'+ring(.33)+'"/>'+axes+
    '<polygon class="area" points="'+pts.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')+'"/></svg>';
}
function endRound(){
  finalizeReview();
  const decisions=review.decisions, agree=decisions.filter(d=>d.choiceRank===1).length;
  const avgGap=decisions.length?(decisions.reduce((a,d)=>a+d.valueGap,0)/decisions.length).toFixed(1):'0.0';
  const severe=decisions.filter(d=>d.valueGap>=15).length, deep=decisions.filter(d=>d.analysisDepth==='深度').length;
  const delta=(review.result&&review.result.scoreDelta)||0, humanWin=!!(review.result&&review.result.humanHu);
  const box=document.getElementById('modalBox'); box.className='box review-box';
  const agreeRate=decisions.length?agree/decisions.length:0, severeRate=decisions.length?severe/decisions.length:0, deepRate=decisions.length?deep/decisions.length:0;
  const radar=reviewRadarSvg(agreeRate,avgGap,severeRate,deepRate,delta);
  const sideSummary=decisions.length
    ?(severe?'<strong>关键问题：</strong> 本局出现 '+severe+' 次价值差 ≥15 的关键偏差，优先复看红色节点。':'<strong>关键问题：</strong> 未出现价值差 ≥15 的严重偏差。')
    :'<strong>关键问题：</strong> 本局没有人工决策节点。';
  box.innerHTML='<div class="review-headline"><div class="review-grade">'+reviewGrade()+'</div><div class="review-title"><h2>'+mode().short+'</h2><p>PRIOR → DECISION → POSTERIOR · '+AI_LEVELS[aiLevelKey].name+'</p></div><div class="review-result"><b>'+(humanWin?'胡牌':'未胡')+' '+(delta>=0?'+':'')+delta+'</b><small>本局分差</small></div></div>'+
    '<div class="review-metrics"><div class="review-metric gold"><b>'+agree+'/'+decisions.length+'</b><small>AI 首选一致</small></div><div class="review-metric"><b>'+avgGap+'</b><small>平均价值差</small></div><div class="review-metric hot"><b>'+severe+'</b><small>关键偏差 ≥15</small></div><div class="review-metric"><b>'+deep+'/'+decisions.length+'</b><small>深度任务回写</small></div></div>'+
    '<div class="review-main-grid"><div class="review-left"><div class="review-tabs"><button class="review-tab active" data-tab="simple" onclick="renderReviewTab(\'simple\')">简单版导出</button><button class="review-tab" data-tab="detail" onclick="renderReviewTab(\'detail\')">详细版导出</button></div><div class="review-body" id="reviewTabBody"></div></div>'+
    '<aside class="review-side"><h3>先验分析 // PERFORMANCE</h3><div class="review-radar-wrap">'+radar+'</div><div class="review-side-card">'+sideSummary+'</div><div class="review-side-card"><strong>亮点回顾：</strong> AI 首选一致率 '+Math.round(agreeRate*100)+'%，深度回写覆盖 '+Math.round(deepRate*100)+'%。雷达仅表达本局复盘指标，不把后验真值伪装成在线胜率。</div></aside></div>'+
    '<div class="review-actions"><button class="export-btn" onclick="downloadReview(\'simple\')">导出 TXT</button><button class="export-btn detail" onclick="downloadReview(\'detail\')">导出详单</button><button onclick="startRound()">再来一局</button><button onclick="showLobby()">切换模式</button></div>';
  document.getElementById('modal').style.display='flex'; renderReviewTab('simple');
}

/* ---------- 开局 ---------- */
function startRound(){
  document.getElementById('modal').style.display='none';document.getElementById('modalBox').className='box';document.getElementById('actions').innerHTML='';document.getElementById('log').innerHTML='';
  document.getElementById('gameStage')?.classList.remove('has-action-window');
  advisor.analysis=null; advisor.pendingActionContext=null; advisor.cache.clear(); advisor.token++;
  const wall=[];for(let t=0;t<mode().tileKinds;t++)for(let k=0;k<4;k++)wall.push(t);shuffle(wall);
  const nextGen=state?state.gen+1:1;
  state={wall,players:[],turn:0,huCount:0,lastDiscFrom:-1,awaitDiscard:null,gen:nextGen};
  for(let i=0;i<4;i++){state.players.push({id:i,hand:[],melds:[],discards:[],missing:-1,done:false,huInfo:null,lastDraw:null});for(let k=0;k<13;k++)state.players[i].hand.push(wall.pop());}
  reviewStartRound();
  updateModeChrome();
  if(mode().dingque){
    // AI 定缺：不只看数量，进阶AI会轻微保留对子/搭子更好的花色。
    for(let i=1;i<4;i++){
      const p=state.players[i],cnt=[0,0,0];p.hand.forEach(t=>cnt[tileSuit(t)]++);
      if(aiLevelKey==='advanced'){
        const quality=[0,1,2].map(s=>handShapeScore(p.hand.filter(t=>tileSuit(t)===s)));
        p.missing=[0,1,2].sort((a,b)=>(cnt[a]+quality[a]*.18)-(cnt[b]+quality[b]*.18))[0];
      } else p.missing=cnt.indexOf(Math.min(...cnt));
    }
    renderAll();
    const cnt=[0,0,0];state.players[0].hand.forEach(t=>cnt[tileSuit(t)]++);const rec=cnt.indexOf(Math.min(...cnt));
    const box=document.getElementById('modalBox'); box.className='box';
    box.innerHTML='<h2>川麻定缺</h2><div class="rline">你的手牌：万 '+cnt[0]+' 张 / 条 '+cnt[1]+' 张 / 筒 '+cnt[2]+' 张<br>基础建议：缺 <b style="color:#ffd870">'+SUITC[rec]+'</b></div>'+
      [0,1,2].map(s=>'<button style="background:'+COLORS[s]+'" onclick="setMissing('+s+')">缺'+SUITC[s]+'</button>').join('');
    document.getElementById('modal').style.display='flex';
  } else {
    renderAll();
    log('传统四人基础局开始：含字牌，可吃碰杠；第一家胡牌后结束。');
    gameLoop();
  }
}
function setMissing(s){
  state.players[0].missing=s;reviewEvent('setting',{player:0,label:'定缺 '+SUITC[s],missing:s});document.getElementById('modal').style.display='none';log('你定缺：'+SUITC[s]+'。胡牌前必须打完缺门牌。');
  state.players.forEach(p=>{if(p.id!==0)log(playerName(p.id)+' 定缺：'+SUITC[p.missing]);});renderAll();gameLoop();
}


/* ===== 2D nonlinear motion runtime ===== */
const motionState={pendingDiscard:null,humanDiscard:null,lastTurn:null,lastGen:null,transitioning:false,modalVisible:false};
const motionReduce=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionStageScale=()=>{const v=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stage-scale'));return Number.isFinite(v)&&v>0?v:1;};
function motionAnim(el,frames,options={}){
  if(!el||motionReduce()||typeof el.animate!=='function')return Promise.resolve();
  const anim=el.animate(frames,{fill:'both',...options});
  return anim.finished.catch(()=>{}).finally(()=>{ try{anim.cancel();}catch(_){} });
}
function motionRect(el){ if(!el)return null; const r=el.getBoundingClientRect(); return {left:r.left,top:r.top,width:r.width,height:r.height,right:r.right,bottom:r.bottom,cx:r.left+r.width/2,cy:r.top+r.height/2}; }
function motionSeatSource(pid,tile){
  if(pid===0){
    if(motionState.humanDiscard&&motionState.humanDiscard.tile===tile&&performance.now()-motionState.humanDiscard.ts<1600)return motionState.humanDiscard.rect;
    const hand=document.getElementById('hand'); if(hand){ const matches=[...hand.querySelectorAll('.tile[data-tile-id="'+tile+'"]')]; const el=matches.find(x=>x.classList.contains('drawn'))||matches[matches.length-1]; if(el)return motionRect(el); }
  }
  const seat=document.getElementById('opp'+pid); if(!seat)return null;
  const back=seat.querySelector('.tback:last-child'); return motionRect(back||seat.querySelector('.pname')||seat);
}
function motionRememberHumanDiscard(el,tile){ motionState.humanDiscard={tile,rect:motionRect(el),ts:performance.now()}; el&&el.classList.add('motion-launch'); }
function motionPressTile(el){
  return motionAnim(el,[
    {offset:0,transform:'translateY(-16px) rotate(-.7deg) scale(1.04)',easing:'cubic-bezier(.18,1.42,.34,1)'},
    {offset:.28,transform:'translate(5px,-29px) rotate(3.4deg) scale(.94)',easing:'cubic-bezier(.34,1.56,.64,1)'},
    {offset:.58,transform:'translate(-3px,-23px) rotate(-1.8deg) scale(1.075)',easing:'cubic-bezier(.16,1,.3,1)'},
    {offset:.82,transform:'translate(1px,-18px) rotate(.55deg) scale(.988)',easing:'cubic-bezier(.34,1.56,.64,1)'},
    {offset:1,transform:'translate(0,-14px) rotate(0) scale(1)'}
  ],{duration:245,easing:'cubic-bezier(.16,1,.3,1)'});
}
function motionRejectTile(el){
  if(!el)return; el.classList.remove('motion-reject'); void el.offsetWidth; el.classList.add('motion-reject');
  setTimeout(()=>el.classList.remove('motion-reject'),470);
  const hand=document.getElementById('hand'); motionAnim(hand,[
    {transform:'translateX(0)'},{offset:.3,transform:'translateX(-3px)',easing:'cubic-bezier(.34,1.56,.64,1)'},{offset:.62,transform:'translateX(2px)',easing:'cubic-bezier(.16,1,.3,1)'},{transform:'translateX(0)'}
  ],{duration:330,easing:'cubic-bezier(.45,.05,.18,1)'});
}
function motionPrepareDiscard(pid,tile){
  const source=motionSeatSource(pid,tile);
  const layer=motionFxLayer();
  let ghost=null;
  if(source&&layer){
    ghost=tileEl(tile,false,'motion-flight-tile');
    ghost.classList.remove('small','last','clickable','drawn','missing','motion-launch');
    ghost.style.left=source.left+'px'; ghost.style.top=source.top+'px';
    ghost.style.width=source.width+'px'; ghost.style.height=source.height+'px';
    ghost.style.setProperty('--tile-w',source.width+'px'); ghost.style.setProperty('--tile-h',source.height+'px');
    layer.appendChild(ghost);
  }
  motionState.pendingDiscard={pid,tile,source,ghost,ts:performance.now()};
}
function motionCommitDiscard(pid,tile){
  const pending=motionState.pendingDiscard; motionState.pendingDiscard=null; motionState.humanDiscard=null;
  if(!pending||pending.pid!==pid||pending.tile!==tile||!pending.source){ if(pending&&pending.ghost)pending.ghost.remove(); return Promise.resolve(); }
  return new Promise(resolve=>requestAnimationFrame(()=>{
    const zone=document.querySelector('.dzone[data-player="'+pid+'"] .dtiles');
    if(!zone){ if(pending.ghost)pending.ghost.remove(); resolve(); return; }
    const matches=[...zone.querySelectorAll('.tile[data-tile-id="'+tile+'"]')]; const dest=matches[matches.length-1];
    if(!dest){ if(pending.ghost)pending.ghost.remove(); resolve(); return; }
    const a=pending.source,b=motionRect(dest); if(!b){ if(pending.ghost)pending.ghost.remove(); resolve(); return; }
    const layer=motionFxLayer(), ghost=pending.ghost||tileEl(tile,false,'motion-flight-tile');
    if(!ghost.isConnected){
      ghost.style.left=a.left+'px';ghost.style.top=a.top+'px';ghost.style.width=a.width+'px';ghost.style.height=a.height+'px';
      layer.appendChild(ghost);
    }
    // CSS already hides the just-rendered destination via motion-pending-dest; keep that invariant until landing.
    dest.style.visibility='hidden';
    const dx=b.cx-a.cx,dy=b.cy-a.cy;
    const distance=Math.hypot(dx,dy);
    const reduced=motionReduce();
    const duration=reduced?420:Math.round(Math.max(840,Math.min(1060,760+distance*.18)));
    const lift=reduced?Math.min(42,Math.max(26,distance*.08)):Math.min(186,Math.max(94,distance*.22));
    const lateral=(pid===0?-1:pid===2?1:pid===1?-1:1)*Math.min(40,Math.max(17,distance*.05));
    const sx=Math.max(.42,Math.min(1.25,b.width/Math.max(1,a.width))), sy=Math.max(.42,Math.min(1.25,b.height/Math.max(1,a.height)));
    const spin=pid===0?-7.5:(pid===2?7.2:(pid===1?-9:9));

    const streak=document.createElement('div');streak.className='motion-flight-streak';layer.appendChild(streak);
    const angle=Math.atan2(dy,dx)*180/Math.PI;
    const streakLen=Math.min(190,Math.max(88,distance*.27));
    streak.style.left=a.cx+'px';streak.style.top=a.cy+'px';streak.style.width=streakLen+'px';
    streak.style.transform='rotate('+angle+'deg) scaleX(.15)';streak.style.opacity='0';
    if(typeof streak.animate==='function')streak.animate([
      {offset:0,opacity:0,transform:'rotate('+angle+'deg) scaleX(.08)'},
      {offset:.34,opacity:.88,transform:'rotate('+angle+'deg) scaleX(1)',easing:'cubic-bezier(.32,.05,.46,.96)'},
      {offset:.76,opacity:.45,transform:'rotate('+angle+'deg) scaleX(.72)',easing:'cubic-bezier(.36,.05,.54,.96)'},
      {offset:1,opacity:0,transform:'rotate('+angle+'deg) scaleX(.22)'}
    ],{duration:Math.round(duration*.78),easing:'cubic-bezier(.38,.05,.58,.96)',fill:'both'}).finished.catch(()=>{}).finally(()=>streak.remove()); else streak.remove();

    window.__lastDiscardMotion={pid,tile,start:a,dest:b,distance,duration,lift,startedAt:performance.now(),completed:false};
    // Deliberately keep the first quarter of the timeline near the source: this makes the lift readable,
    // then accelerates through the middle and uses a nonlinear overshoot only at impact.
    const frames=[
      {offset:0,opacity:1,transform:'translate(0px,0px) rotate(0deg) scale(1)',filter:'brightness(1.18) drop-shadow(0 16px 9px rgba(0,0,0,.54))'},
      {offset:.24,transform:`translate(${dx*.14+lateral*.22}px,${dy*.08-lift*.72}px) rotate(${spin*.48}deg) scale(1.10)`,filter:'brightness(1.22) drop-shadow(0 23px 12px rgba(0,0,0,.56))',easing:'cubic-bezier(.42,.02,.58,.98)'},
      {offset:.54,transform:`translate(${dx*.54+lateral}px,${dy*.39-lift}px) rotate(${-spin*.74}deg) scale(1.16)`,filter:'brightness(1.14) drop-shadow(0 28px 14px rgba(0,0,0,.52))',easing:'cubic-bezier(.34,.03,.48,.98)'},
      {offset:.80,transform:`translate(${dx*.88-lateral*.16}px,${dy*.80-lift*.22}px) rotate(${spin*.28}deg) scale(${Math.max(.82,sx*1.10)},${Math.max(.82,sy*1.10)})`,filter:'brightness(1.06) drop-shadow(0 13px 7px rgba(0,0,0,.46))',easing:'cubic-bezier(.28,.08,.42,1)'},
      {offset:.93,transform:`translate(${dx+2}px,${dy+9}px) rotate(${-spin*.14}deg) scale(${sx*.94},${sy*.92})`,filter:'brightness(.99) drop-shadow(0 5px 3px rgba(0,0,0,.38))',easing:'cubic-bezier(.34,1.56,.64,1)'},
      {offset:1,opacity:1,transform:`translate(${dx}px,${dy}px) rotate(0deg) scale(${sx},${sy})`,filter:'brightness(1) drop-shadow(0 3px 2px rgba(0,0,0,.34))'}
    ];
    const anim=(typeof ghost.animate==='function')?ghost.animate(frames,{duration,easing:'cubic-bezier(.38,.04,.58,.98)',fill:'both'}):null;
    const done=anim?anim.finished.catch(()=>{}):Promise.resolve();
    done.finally(()=>{
      ghost.remove(); dest.classList.remove('motion-pending-dest'); dest.style.visibility='';
      const ring=document.createElement('div');ring.className='motion-land-ring';ring.style.left=b.cx+'px';ring.style.top=b.cy+'px';layer.appendChild(ring);
      if(typeof ring.animate==='function')ring.animate([
        {offset:0,opacity:.95,transform:'translate(-50%,-50%) scale(.32)'},
        {offset:.52,opacity:.68,transform:'translate(-50%,-50%) scale(2.35)',easing:'cubic-bezier(.18,1.42,.34,1)'},
        {offset:1,opacity:0,transform:'translate(-50%,-50%) scale(3.25)'}
      ],{duration:420,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}).finished.catch(()=>{}).finally(()=>ring.remove()); else ring.remove();
      motionAnim(dest,[
        {offset:0,transform:'translateY(8px) rotate(1.6deg) scale(.90)',filter:'brightness(1.28)'},
        {offset:.46,transform:'translateY(-6px) rotate(-1deg) scale(1.075)',filter:'brightness(1.12)',easing:'cubic-bezier(.34,1.56,.64,1)'},
        {offset:.76,transform:'translateY(2px) rotate(.35deg) scale(.985)',easing:'cubic-bezier(.16,1,.3,1)'},
        {offset:1,transform:'translateY(0) rotate(0) scale(1)',filter:'brightness(1)'}
      ],{duration:360,easing:'cubic-bezier(.16,1,.3,1)'});
      if(window.__lastDiscardMotion)window.__lastDiscardMotion.completed=true;
      resolve();
    });
    const zoneEl=zone.closest('.dzone');
    if(!reduced)motionAnim(zoneEl,[
      {transform:'translate(0,0)'},{offset:.36,transform:`translate(${pid===1?-5:pid===3?5:0}px,${pid===2?4:-4}px) rotate(${pid%2?.34:-.26}deg)`,easing:'cubic-bezier(.34,1.56,.64,1)'},{offset:.68,transform:`translate(${pid===1?2:pid===3?-2:0}px,${pid===2?-1:1}px) rotate(0deg)`,easing:'cubic-bezier(.16,1,.3,1)'},{transform:'translate(0,0)'}
    ],{duration:470,easing:'cubic-bezier(.16,1,.3,1)'});
  }));
}
function motionDrawForPlayer(pid,tile,source){
  if(motionReduce())return;
  requestAnimationFrame(()=>{
    const el=pid===0?document.querySelector('#hand .tile.drawn'):(document.querySelector('#opp'+pid+' .tback:last-child'));
    if(el&&pid!==0){
      const vectors={1:[76,-8,-9],2:[-7,-62,6],3:[-76,-8,9]},v=vectors[pid]||[0,-46,5];
      motionAnim(el,[
        {offset:0,opacity:.05,transform:`translate(${v[0]}px,${v[1]}px) rotate(${v[2]}deg) scale(.78)`,easing:'cubic-bezier(.42,.02,.22,1)'},
        {offset:.53,opacity:1,transform:`translate(${-v[0]*.12}px,${-v[1]*.10}px) rotate(${-v[2]*.36}deg) scale(1.055)`,easing:'cubic-bezier(.18,1.42,.34,1)'},
        {offset:.78,transform:'translate(2px,-1px) rotate(.45deg) scale(.985)',easing:'cubic-bezier(.34,1.56,.64,1)'},
        {offset:1,transform:'translate(0,0) rotate(0) scale(1)',opacity:1}
      ],{duration:source==='gang'?720:620,easing:'cubic-bezier(.16,1,.3,1)'});
    }
    const core=document.querySelector('#discboard>.table-core'); motionAnim(core,[
      {transform:'translate(-50%,-50%) scale(1)'},{offset:.48,transform:'translate(-50%,-50%) scale(1.035) rotate(.4deg)',easing:'cubic-bezier(.34,1.56,.64,1)'},{transform:'translate(-50%,-50%) scale(1)'}
    ],{duration:360,easing:'cubic-bezier(.16,1,.3,1)'});
  });
}
function motionTurnNudge(pid){
  if(motionReduce()||pid==null||motionState.lastTurn===pid)return; motionState.lastTurn=pid;
  requestAnimationFrame(()=>{
    const el=document.querySelector('#opp'+pid+' .pname'); if(!el)return;
    const dir=pid===1?-1:pid===3?1:0;
    motionAnim(el,[
      {offset:0,transform:'translate(0,0) rotate(0)',filter:'brightness(1)'},
      {offset:.34,transform:`translate(${dir*7}px,-5px) rotate(${dir*.9-1.2}deg) scale(1.035)`,filter:'brightness(1.15)',easing:'cubic-bezier(.18,1.42,.34,1)'},
      {offset:.66,transform:`translate(${dir*-2}px,2px) rotate(${dir*-.35+.45}deg) scale(.99)`,easing:'cubic-bezier(.34,1.56,.64,1)'},
      {offset:1,transform:'translate(0,0) rotate(0) scale(1)',filter:'brightness(1)'}
    ],{duration:410,easing:'cubic-bezier(.16,1,.3,1)'});
  });
}
function motionNotifyRender(){
  if(!state)return;
  const newRound=motionState.lastGen!==state.gen; if(newRound){motionState.lastGen=state.gen;motionState.lastTurn=null;requestAnimationFrame(motionTableEnter);}
  motionTurnNudge(state.turn);
}
function motionTableEnter(){
  if(motionReduce())return;
  const targets=[document.getElementById('topbar'),document.getElementById('table'),document.getElementById('bottom')].filter(Boolean);
  targets.forEach((el,i)=>motionAnim(el,[
    {offset:0,opacity:0,transform:`translate(${i===0?-92:i===1?0:78}px,${i===1?64:28}px) rotate(${i===1?-1.2:(i===0?-2.4:1.6)}deg) scale(${i===1?.94:.975})`,easing:'cubic-bezier(.12,.82,.24,1)'},
    {offset:.68,opacity:1,transform:`translate(${i===0?4:i===2?-3:0}px,${i===1?-4:0}px) rotate(${i===1?.18:0}deg) scale(1.008)`,easing:'cubic-bezier(.18,1.42,.34,1)'},
    {offset:1,opacity:1,transform:'translate(0,0) rotate(0) scale(1)'}
  ],{duration:680+i*95,delay:i*85,easing:'cubic-bezier(.16,1,.3,1)'}));
}
const actionFxState={enabled:true,seq:0,history:[],last:null};
function actionFxEnabled(){return actionFxState.enabled!==false;}
window.__setActionFxEnabled=function(enabled=true){actionFxState.enabled=!!enabled;return actionFxState.enabled;};
function actionFxRemember(entry){
  actionFxState.last=entry; actionFxState.history.unshift(entry); if(actionFxState.history.length>40)actionFxState.history.length=40;
  window.__lastActionFx=entry; return entry;
}
function motionImpactPlayer(pid,kind,source='game'){
  requestAnimationFrame(()=>{
    const seat=document.getElementById('opp'+pid);
    const anchor=(seat&&seat.querySelector('.pname'))||seat||document.getElementById('discboard')||document.getElementById('table')||document.body;
    const reduced=motionReduce();
    if(!reduced && anchor){
      const dir=pid===1?-1:pid===3?1:0;
      motionAnim(anchor,[
        {offset:0,transform:'translate(0,0) rotate(0) scale(1)'},
        {offset:.2,transform:`translate(${dir*16}px,-12px) rotate(${dir*1.8-1.4}deg) scale(1.09)`,easing:'cubic-bezier(.18,1.42,.34,1)'},
        {offset:.46,transform:`translate(${dir*-9}px,6px) rotate(${dir*-1.1+.8}deg) scale(.96)`,easing:'cubic-bezier(.34,1.56,.64,1)'},
        {offset:.7,transform:`translate(${dir*2}px,-2px) rotate(${dir*.4-.25}deg) scale(1.025)`,easing:'cubic-bezier(.16,1,.3,1)'},
        {offset:1,transform:'translate(0,0) rotate(0) scale(1)'}
      ],{duration:kind==='hu'?860:620,easing:'cubic-bezier(.16,1,.3,1)'});
      const table=document.getElementById('table'); motionAnim(table,[
        {transform:'translate(0,0)'},{offset:.22,transform:'translate(-3px,2px) rotate(-.08deg)',easing:'cubic-bezier(.34,1.56,.64,1)'},{offset:.48,transform:'translate(2px,-1px) rotate(.05deg)',easing:'cubic-bezier(.16,1,.3,1)'},{transform:'translate(0,0)'}
      ],{duration:kind==='hu'?380:260,easing:'cubic-bezier(.16,1,.3,1)'});
      if((kind==='gang'||kind==='pong'||kind==='chi')&&seat){
        const meld=seat.querySelector('.meld:last-child');
        if(meld){ [...meld.querySelectorAll('.tile')].forEach((tileEl,i)=>motionAnim(tileEl,[
          {offset:0,opacity:.08,transform:`translate(${(i-1.5)*11}px,${18+Math.abs(i-1.5)*3}px) rotate(${(i-1.5)*5}deg) scale(.68)`,easing:'cubic-bezier(.12,.82,.24,1)'},
          {offset:.56,opacity:1,transform:`translate(${(1.5-i)*2}px,-3px) rotate(${(1.5-i)*.8}deg) scale(1.07)`,easing:'cubic-bezier(.18,1.42,.34,1)'},
          {offset:.8,transform:'translate(1px,1px) rotate(.3deg) scale(.985)',easing:'cubic-bezier(.34,1.56,.64,1)'},
          {offset:1,opacity:1,transform:'translate(0,0) rotate(0) scale(1)'}
        ],{duration:350+i*34,delay:i*36,easing:'cubic-bezier(.16,1,.3,1)'})); }
      }
    }
    motionBurst(anchor,kind,source);
  });
}
function motionFxLayer(){
  let layer=document.getElementById('motionFxLayer');
  if(!layer){layer=document.createElement('div');layer.id='motionFxLayer';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer);}
  return layer;
}
function motionBurst(anchor,kind,source='game'){
  if(!actionFxEnabled()){
    actionFxRemember({seq:++actionFxState.seq,kind,pid:null,source,created:false,reason:'fx-disabled',ts:Date.now()});
    return null;
  }
  const cfg={
    pong:{glyph:'碰',title:'震岳·破阵',sub:'双势相撞 / IMPACT SYNC',tone:'cyan',duration:1900,particles:24},
    chi:{glyph:'吃',title:'连契·吞风',sub:'三线贯穿 / CHAIN CUT',tone:'green',duration:2000,particles:22},
    gang:{glyph:'杠',title:'四象·雷鸣',sub:'四门齐震 / QUAD THUNDER',tone:'gold',duration:2350,particles:30},
    hu:{glyph:'胡',title:'天命·终局',sub:'此局已定 / FINAL DECREE',tone:'red',duration:3200,particles:44}
  }[kind];
  if(!cfg){actionFxRemember({seq:++actionFxState.seq,kind,source,created:false,reason:'unknown-kind',ts:Date.now()});return null;}
  const layer=motionFxLayer();
  const ar=motionRect(anchor);
  const r=(ar&&Number.isFinite(ar.cx)&&Number.isFinite(ar.cy))?ar:{cx:window.innerWidth/2,cy:window.innerHeight/2,width:0,height:0,left:window.innerWidth/2,top:window.innerHeight/2};
  const reduced=motionReduce();
  /* Reduced motion means fewer/shorter secondary movements, NOT a 0.01ms invisible cinematic. */
  const duration=reduced?Math.max(1450,Math.round(cfg.duration*.78)):cfg.duration;
  const seq=++actionFxState.seq;
  const fx=document.createElement('div');
  fx.className='action-cinematic '+kind+' tone-'+cfg.tone+(reduced?' fx-reduced':'');
  fx.dataset.fxSeq=String(seq);fx.dataset.fxKind=kind;fx.dataset.fxSource=source;fx.dataset.fxDuration=String(duration);
  fx.style.setProperty('--fx-x',r.cx+'px'); fx.style.setProperty('--fx-y',r.cy+'px'); fx.style.setProperty('--fx-duration',duration+'ms');
  fx.innerHTML='<div class="fx-screen-flash"></div><div class="fx-speedlines"></div><div class="fx-ring fx-ring-a"></div><div class="fx-ring fx-ring-b"></div><div class="fx-cross fx-cross-a"></div><div class="fx-cross fx-cross-b"></div><div class="fx-triad"><i></i><i></i><i></i><i></i></div><div class="fx-seals"><i>壹</i><i>贰</i><i>叁</i><i>肆</i></div><div class="fx-title"><span class="fx-kicker">'+cfg.title+'</span><strong>'+cfg.glyph+'</strong><em>'+cfg.sub+'</em></div><div class="fx-stamp">RED EDGE</div>';
  const ps=document.createElement('div'); ps.className='fx-particles';
  const particleCount=reduced?Math.min(10,cfg.particles):cfg.particles;
  for(let i=0;i<particleCount;i++){
    const p=document.createElement('i'), a=(i/particleCount)*Math.PI*2+(i%3)*.17, dist=72+(i%7)*23+(kind==='hu'?46:0);
    p.style.setProperty('--px',Math.cos(a)*dist+'px'); p.style.setProperty('--py',Math.sin(a)*dist+'px');
    p.style.setProperty('--pr',(i%2?1:-1)*(18+(i%5)*13)+'deg'); p.style.setProperty('--pd',(i%6)*22+'ms'); p.style.setProperty('--ps',(4+(i%4)*2)+'px'); ps.appendChild(p);
  }
  fx.appendChild(ps);

  /* Inline !important durations beat the page-wide reduced-motion !important rule.
     This is deliberately explicit: several Android WebViews expose prefers-reduced-motion
     while still being expected to show game feedback. */
  const forceDuration=(el,ms)=>{if(el)el.style.setProperty('animation-duration',Math.max(1,Math.round(ms))+'ms','important');};
  forceDuration(fx,duration);
  forceDuration(fx.querySelector('.fx-screen-flash'),duration);
  forceDuration(fx.querySelector('.fx-speedlines'),reduced?900:1150);
  fx.querySelectorAll('.fx-ring').forEach(el=>forceDuration(el,reduced?850:1150));
  fx.querySelectorAll('.fx-cross').forEach(el=>forceDuration(el,reduced?780:1050));
  fx.querySelectorAll('.fx-triad i').forEach(el=>forceDuration(el,reduced?820:1050));
  fx.querySelectorAll('.fx-seals i').forEach(el=>forceDuration(el,reduced?900:(kind==='hu'?1400:1150)));
  forceDuration(fx.querySelector('.fx-title strong'),reduced?950:1250);
  forceDuration(fx.querySelector('.fx-kicker'),reduced?850:1150);
  forceDuration(fx.querySelector('.fx-title em'),reduced?900:1250);
  fx.querySelectorAll('.fx-particles i').forEach(el=>forceDuration(el,reduced?900:1300));

  layer.appendChild(fx);
  const born=performance.now();
  const entry=actionFxRemember({seq,kind,source,created:true,reduced,duration,anchor:{x:Math.round(r.cx),y:Math.round(r.cy)},ts:Date.now(),visible:null,cleanup:null,ignoredEarlyEnd:0});
  const snapshotEntry=()=>{
    if(!fx.isConnected)return;
    const cs=getComputedStyle(fx),fr=fx.getBoundingClientRect(),glyph=fx.querySelector('.fx-title strong'),gcs=glyph?getComputedStyle(glyph):null,gr=glyph?glyph.getBoundingClientRect():null;
    const isVisible=cs.display!=='none'&&cs.visibility!=='hidden'&&fr.width>0&&fr.height>0&&parseFloat(cs.opacity||'0')>.02;
    entry.visible=isVisible?true:(entry.visible===true?true:null);
    entry.computed={display:cs.display,visibility:cs.visibility,opacity:cs.opacity,animationName:cs.animationName,animationDuration:cs.animationDuration,width:Math.round(fr.width),height:Math.round(fr.height),layerZ:getComputedStyle(layer).zIndex,glyphOpacity:gcs&&gcs.opacity,glyphWidth:gr&&Math.round(gr.width),glyphHeight:gr&&Math.round(gr.height)};
  };
  requestAnimationFrame(()=>requestAnimationFrame(snapshotEntry));
  setTimeout(()=>{if(entry.visible!==true)snapshotEntry();},Math.min(280,Math.max(150,duration*.18)));
  const cleanup=(reason)=>{ if(!fx.isConnected)return; entry.cleanup=reason; entry.cleanedAt=Date.now(); entry.lifetimeMs=Math.round(performance.now()-born); fx.remove(); };
  /* Never trust an animationend that fires before the intended lifecycle. A page-level accessibility
     rule or WebView quirk can synthesize a nearly-instant end event. */
  fx.addEventListener('animationend',e=>{
    if(e.target!==fx||e.animationName!=='fxLife')return;
    const elapsed=performance.now()-born;
    if(elapsed>=duration*.72)cleanup('root-animationend-validated');
    else{entry.ignoredEarlyEnd=(entry.ignoredEarlyEnd||0)+1;entry.lastEarlyEndMs=Math.round(elapsed);}
  });
  setTimeout(()=>cleanup('lifecycle-timeout'),duration+140);
  return fx;
}
window.__showActionFx=function(kind='hu',pid=0){
  const a=document.querySelector('#opp'+pid+' .pname')||document.getElementById('opp'+pid)||document.getElementById('discboard')||document.getElementById('table')||document.body;
  const fx=motionBurst(a,kind,'manual-preview'); return !!fx;
};
function actionFxParseMs(value){
  if(!value)return 0;
  return String(value).split(',').map(x=>x.trim()).reduce((max,x)=>{
    const n=parseFloat(x)||0,ms=x.endsWith('ms')?n:x.endsWith('s')?n*1000:0;return Math.max(max,ms);
  },0);
}
function actionFxSample(fx){
  if(!fx||!fx.isConnected)return {connected:false,display:'',visibility:'',opacity:'',opacityValue:0,animationName:'',animationDuration:'',animationDurationMs:0,width:0,height:0,glyphConnected:false,glyphOpacity:'',glyphOpacityValue:0,glyphWidth:0,glyphHeight:0};
  const cs=getComputedStyle(fx),r=fx.getBoundingClientRect(),glyph=fx.querySelector('.fx-title strong'),gcs=glyph?getComputedStyle(glyph):null,gr=glyph?glyph.getBoundingClientRect():null;
  return {connected:true,display:cs.display,visibility:cs.visibility,opacity:cs.opacity,opacityValue:parseFloat(cs.opacity||'0')||0,animationName:cs.animationName,animationDuration:cs.animationDuration,animationDurationMs:actionFxParseMs(cs.animationDuration),width:Math.round(r.width),height:Math.round(r.height),glyphConnected:!!(glyph&&glyph.isConnected),glyphOpacity:gcs?gcs.opacity:'',glyphOpacityValue:gcs?(parseFloat(gcs.opacity||'0')||0):0,glyphWidth:gr?Math.round(gr.width):0,glyphHeight:gr?Math.round(gr.height):0};
}
async function actionFxWait(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
async function actionFxNextPaint(){return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));}
function actionFxVisualPass(sample){
  return !!sample&&sample.connected&&sample.display!=='none'&&sample.visibility!=='hidden'&&sample.width>0&&sample.height>0&&sample.glyphConnected&&sample.glyphWidth>0&&sample.glyphHeight>0&&sample.opacityValue>.05&&sample.glyphOpacityValue>.05;
}
async function actionFxAwaitVisual(fx,timeoutMs=520){
  const started=performance.now(); let best=actionFxSample(fx),seen=actionFxVisualPass(best),seenAt=seen?0:null;
  while(fx&&fx.isConnected&&!seen&&performance.now()-started<timeoutMs){
    await actionFxNextPaint();
    await actionFxWait(18);
    const sample=actionFxSample(fx);
    if(sample.opacityValue>best.opacityValue||sample.glyphOpacityValue>best.glyphOpacityValue)best=sample;
    if(actionFxVisualPass(sample)){best=sample;seen=true;seenAt=Math.round(performance.now()-started);break;}
  }
  return {seen,seenAtMs:seenAt,sample:best};
}
window.__probeActionFx=async function(kind='hu',pid=0){
  const a=document.querySelector('#opp'+pid+' .pname')||document.getElementById('opp'+pid)||document.getElementById('discboard')||document.getElementById('table')||document.body;
  const fx=motionBurst(a,kind,'diagnostic-probe');
  if(!fx)return {kind,ok:false,reason:'not-created',enabled:actionFxEnabled(),reduced:motionReduce()};
  const expected=parseInt(fx.dataset.fxDuration||'0',10)||800;
  const visual=await actionFxAwaitVisual(fx,Math.min(560,Math.max(380,expected*.45)));
  const first=visual.sample;
  await actionFxWait(Math.min(150,Math.max(90,expected*.1)));
  const mid=actionFxSample(fx);
  const layer=motionFxLayer();
  const durationOk=first.animationDurationMs>=Math.min(700,expected*.7);
  const visualOk=visual.seen;
  const survivalOk=mid.connected;
  const result={kind,ok:visualOk&&durationOk&&survivalOk,expectedDurationMs:expected,visibleAfterMs:visual.seenAtMs,connected:first.connected,display:first.display,visibility:first.visibility,opacity:first.opacity,animationName:first.animationName,animationDuration:first.animationDuration,animationDurationMs:first.animationDurationMs,width:first.width,height:first.height,glyphOpacity:first.glyphOpacity,glyphWidth:first.glyphWidth,glyphHeight:first.glyphHeight,midConnected:mid.connected,midOpacity:mid.opacity,midGlyphOpacity:mid.glyphOpacity,layerZ:getComputedStyle(layer).zIndex,reduced:motionReduce(),enabled:actionFxEnabled(),checks:{durationOk,visualOk,survivalOk}};
  if(fx.isConnected)fx.remove(); return result;
};
window.__probeActionFxPath=async function(kind='hu',pid=0){
  const before=actionFxState.seq;
  motionImpactPlayer(pid,kind,'diagnostic-impact');
  let fx=null; const lookupStart=performance.now();
  while(!fx&&performance.now()-lookupStart<300){
    await actionFxNextPaint();
    fx=[...motionFxLayer().querySelectorAll('.action-cinematic')].reverse().find(el=>Number(el.dataset.fxSeq)>before&&el.dataset.fxKind===kind&&el.dataset.fxSource==='diagnostic-impact')||null;
    if(!fx)await actionFxWait(12);
  }
  const expected=fx?(parseInt(fx.dataset.fxDuration||'0',10)||800):0;
  const visual=fx?await actionFxAwaitVisual(fx,Math.min(560,Math.max(380,expected*.45))):{seen:false,seenAtMs:null,sample:actionFxSample(null)};
  const sample=visual.sample;
  const durationOk=!!fx&&sample.animationDurationMs>=Math.min(700,expected*.7);
  const visualOk=!!fx&&visual.seen;
  const result={kind,ok:visualOk&&durationOk,createdByImpact:!!fx,visibleAfterMs:visual.seenAtMs,expectedDurationMs:expected,animationDuration:sample.animationDuration,animationDurationMs:sample.animationDurationMs,opacity:sample.opacity,glyphOpacity:sample.glyphOpacity,width:sample.width,height:sample.height,reduced:motionReduce(),checks:{durationOk,visualOk}};
  if(fx&&fx.isConnected)fx.remove(); return result;
};
window.__runActionFxDiagnostics=async function(pid=0){
  const results=[]; for(const kind of ['pong','chi','gang','hu'])results.push(await window.__probeActionFx(kind,pid));
  const integration=[]; for(const kind of ['pong','chi','gang','hu'])integration.push(await window.__probeActionFxPath(kind,pid));
  const badDurations=results.filter(x=>x.animationDurationMs>0&&x.animationDurationMs<200).map(x=>x.kind);
  return {ok:results.every(x=>x.ok)&&integration.every(x=>x.ok),results,integration,assertions:{noCollapsedCssAnimation:badDurations.length===0,badDurations,allDirectVisible:results.every(x=>x.checks&&x.checks.visualOk),allDirectSurviveSampling:results.every(x=>x.checks&&x.checks.survivalOk),allImpactPathsCreateFx:integration.every(x=>x.createdByImpact),allImpactPathsVisible:integration.every(x=>x.checks&&x.checks.visualOk)},history:actionFxState.history.slice(0,12),environment:{reducedMotion:motionReduce(),animate:typeof Element!=='undefined'&&typeof Element.prototype.animate==='function',colorMix:typeof CSS!=='undefined'&&CSS.supports&&CSS.supports('background','color-mix(in srgb, #fff 50%, #000)'),viewport:[window.innerWidth,window.innerHeight]}};
};

function motionCommitAction(btn,kind){
  const base=btn&&btn.matches(':nth-child(even)')?'translateY(3px) rotate(1.5deg) scale(1)':'translate(0,0) rotate(-2deg) scale(1)';
  return motionAnim(btn,[
    {offset:0,transform:base,easing:'cubic-bezier(.18,1.42,.34,1)'},
    {offset:.42,transform:'translate(3px,5px) rotate(2deg) scale(.90)',filter:'brightness(.9)',easing:'cubic-bezier(.34,1.56,.64,1)'},
    {offset:.72,transform:'translate(-2px,-7px) rotate(-2.6deg) scale(1.12)',filter:'brightness(1.15)',easing:'cubic-bezier(.16,1,.3,1)'},
    {offset:1,transform:'translate(0,-2px) rotate(0) scale(1)',filter:'brightness(1)'}
  ],{duration:280,easing:'cubic-bezier(.16,1,.3,1)'});
}
function motionEnterLobby(){
  const lobby=document.getElementById('lobby'); if(!lobby||motionReduce())return;
  lobby.classList.remove('motion-enter'); void lobby.offsetWidth; lobby.classList.add('motion-enter');
  [...lobby.querySelectorAll('.mode-card')].forEach((el,i)=>motionAnim(el,[
    {offset:0,opacity:0,transform:`translate(${i%2?-38:38}px,${24+i*6}px) rotate(${i%2?-4.5:4.5}deg) scale(.82)`,easing:'cubic-bezier(.12,.82,.24,1)'},
    {offset:.57,opacity:1,transform:`translate(${i%2?5:-5}px,-5px) rotate(${i%2?1.2:-1.2}deg) scale(1.045)`,easing:'cubic-bezier(.18,1.42,.34,1)'},
    {offset:.8,transform:`translate(${i%2?-2:2}px,2px) rotate(${i%2?-.4:.4}deg) scale(.987)`,easing:'cubic-bezier(.34,1.56,.64,1)'},
    {offset:1,opacity:1,transform:'none'}
  ],{duration:470+i*38,delay:70+i*58,easing:'cubic-bezier(.16,1,.3,1)'}));
}
function motionExitLobby(){
  const lobby=document.getElementById('lobby'); if(!lobby||lobby.style.display==='none'||motionReduce())return Promise.resolve();
  const cards=[...lobby.querySelectorAll('.mode-card')];
  const jobs=cards.map((el,i)=>motionAnim(el,[
    {offset:0,opacity:1,transform:'none',easing:'cubic-bezier(.55,.06,.68,.19)'},
    {offset:.45,opacity:1,transform:`translate(${i%2?7:-7}px,-3px) rotate(${i%2?1:-1}deg) scale(1.02)`,easing:'cubic-bezier(.7,0,.84,0)'},
    {offset:1,opacity:0,transform:`translate(${i%2?70:-70}px,26px) rotate(${i%2?7:-7}deg) scale(.82)`}
  ],{duration:265+i*28,delay:i*20,easing:'cubic-bezier(.7,0,.84,0)'}));
  const shell=lobby.querySelector('.lobby-shell');jobs.push(motionAnim(shell,[{opacity:1,transform:'translate(0,0)'},{offset:.42,opacity:1,transform:'translate(0,-3px)',easing:'cubic-bezier(.7,0,.84,0)'},{opacity:0,transform:'translate(0,18px)'}],{duration:315,easing:'cubic-bezier(.7,0,.84,0)'}));
  return Promise.all(jobs);
}
function motionModalPop(){
  const modal=document.getElementById('modal'); if(!modal||modal.style.display==='none')return;
  modal.classList.remove('motion-pop'); void modal.offsetWidth; modal.classList.add('motion-pop');
}
const motionModal=document.getElementById('modal');
if(motionModal){
  new MutationObserver(()=>{const visible=motionModal.style.display!=='none'&&getComputedStyle(motionModal).display!=='none';if(visible&&!motionState.modalVisible)motionModalPop();motionState.modalVisible=visible;}).observe(motionModal,{attributes:true,attributeFilter:['style']});
}
window.__redEdgeMotionProfile=Object.freeze({engine:'2D nonlinear / WAAPI + CSS',version:'1.0',curves:{enter:'cubic-bezier(.16,1,.30,1)',snap:'cubic-bezier(.18,1.42,.34,1)',impact:'cubic-bezier(.34,1.56,.64,1)',exit:'cubic-bezier(.7,0,.84,0)'},reducedMotion:motionReduce()});

updateModeChrome();
['tileThemeSelect','mobileTileThemeSelect'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=tileThemeKey;});
updateAdvisorToggleChrome();
renderAdvisor();
showLobby();


/* ===== Display profile: multi-aspect authored stages, single transform per stage ===== */
const UI_LAYOUTS=Object.freeze({
  desktop:Object.freeze({width:1672,height:941}),
  'tablet-landscape':Object.freeze({width:1366,height:900}),
  'phone-landscape':Object.freeze({width:844,height:390,device:'REDMI Turbo 5 Max',cssSpace:true}),
  'tablet-portrait':Object.freeze({width:1100,height:1450}),
  'phone-portrait':Object.freeze({width:390,height:844,device:'REDMI Turbo 5 Max',cssSpace:true}),
  square:Object.freeze({width:1200,height:1200})
});
let __displayProfileRAF=0;
function __pxVar(name){const n=parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));return Number.isFinite(n)?n:0;}
function chooseUILayout(w,h){
  const a=w/Math.max(1,h), short=Math.min(w,h), coarse=matchMedia&&matchMedia('(pointer:coarse)').matches;
  if(a<.64) return 'phone-portrait';
  if(a<.90) return 'tablet-portrait';
  if(a<1.16) return 'square';
  if(a<1.56) return 'tablet-landscape';
  if((a>=1.88 && h<=700) || (coarse && a>=1.72 && h<=760) || (short<=500 && a>=1.65)) return 'phone-landscape';
  return 'desktop';
}
function auditStageLayout(){
  const ids=['gameStage','topbar','table','opp2','opp3','discboard','opp1','bottom','opp0','hand','actions','log'];
  const bounds={}; let ok=true;
  const vv=window.visualViewport;
  const vx=vv?vv.offsetLeft:0,vy=vv?vv.offsetTop:0,vw=vv?vv.width:window.innerWidth,vh=vv?vv.height:window.innerHeight;
  const viewport={left:vx,top:vy,right:vx+vw,bottom:vy+vh,width:vw,height:vh};
  for(const id of ids){
    const el=document.getElementById(id); if(!el)continue;
    const r=el.getBoundingClientRect();
    bounds[id]={left:+r.left.toFixed(1),top:+r.top.toFixed(1),right:+r.right.toFixed(1),bottom:+r.bottom.toFixed(1),width:+r.width.toFixed(1),height:+r.height.toFixed(1)};
    if(['gameStage','topbar','table','bottom','hand','log'].includes(id) && (r.left<viewport.left-1||r.right>viewport.right+1||r.top<viewport.top-1||r.bottom>viewport.bottom+1))ok=false;
  }
  const firstTile=document.querySelector('#hand .tile');
  const tileRect=firstTile?firstTile.getBoundingClientRect():null;
  const physicalTap=tileRect?{width:+tileRect.width.toFixed(1),height:+tileRect.height.toFixed(1)}:null;
  if(tileRect && (tileRect.width<20||tileRect.height<31)) ok=false;
  const noPageScroll=document.documentElement.scrollHeight<=Math.ceil(window.innerHeight+1)&&document.body.scrollHeight<=Math.ceil(window.innerHeight+1);
  ok=ok&&noPageScroll;
  return {ok,noPageScroll,layout:document.documentElement.dataset.uiLayout||'desktop',viewport,bounds,physicalTap};
}
function applyDisplayProfile(){
  const vv=window.visualViewport;
  const vx=vv?vv.offsetLeft:0,vy=vv?vv.offsetTop:0;
  const vw=Math.max(1,vv?vv.width:window.innerWidth),vh=Math.max(1,vv?vv.height:window.innerHeight);
  const dpr=Math.max(1,window.devicePixelRatio||1),root=document.documentElement,stage=document.getElementById('gameStage');
  const safeL=__pxVar('--safe-left'),safeR=__pxVar('--safe-right'),safeT=__pxVar('--safe-top'),safeB=__pxVar('--safe-bottom');
  const availW=Math.max(1,vw-safeL-safeR),availH=Math.max(1,vh-safeT-safeB);
  const layout=chooseUILayout(availW,availH),ref=UI_LAYOUTS[layout];
  const s=Math.min(availW/ref.width,availH/ref.height);
  const left=vx+safeL+(availW-ref.width*s)/2,top=vy+safeT+(availH-ref.height*s)/2;
  root.dataset.uiLayout=layout;
  root.dataset.dpr=dpr>=2.5?'3x':(dpr>=1.5?'2x':'1x');
  root.dataset.viewportClass=vw>=2200?'xl':(vw>=1450?'lg':(vw>=900?'md':'sm'));
  root.style.setProperty('--device-pixel-ratio',String(dpr));
  root.style.setProperty('--stage-design-w',ref.width+'px');
  root.style.setProperty('--stage-design-h',ref.height+'px');
  root.style.setProperty('--stage-scale',String(s));
  root.style.setProperty('--stage-left',left.toFixed(3)+'px');
  root.style.setProperty('--stage-top',top.toFixed(3)+'px');
  root.style.setProperty('--viewport-fit-scale','1');
  if(stage){stage.style.width=ref.width+'px';stage.style.height=ref.height+'px';stage.style.minWidth=ref.width+'px';stage.style.minHeight=ref.height+'px';stage.style.left=left.toFixed(3)+'px';stage.style.top=top.toFixed(3)+'px';stage.style.transform='scale('+s+')';}
  requestAnimationFrame(()=>{
    const audit=auditStageLayout();
    window.__redEdgeDisplayProfile={
      cssWidth:Math.round(vw),cssHeight:Math.round(vh),dpr,layout,
      aspect:+(vw/vh).toFixed(4),safeArea:{left:safeL,right:safeR,top:safeT,bottom:safeB},
      physicalWidth:Math.round(vw*dpr),physicalHeight:Math.round(vh*dpr),
      stageScale:+s.toFixed(5),stageLeft:+left.toFixed(2),stageTop:+top.toFixed(2),
      renderedStageWidth:+(ref.width*s).toFixed(1),renderedStageHeight:+(ref.height*s).toFixed(1),
      reference:ref,referenceDevice:(layout==='phone-portrait'||layout==='phone-landscape')?'REDMI Turbo 5 Max ratio / CSS viewport stage (panel 2772×1280)':null,audit
    };
  });
}
function __rectOverlap(a,b,pad=0){return !(a.right<=b.left-pad||a.left>=b.right+pad||a.bottom<=b.top-pad||a.top>=b.bottom+pad);}
window.__auditRedEdgeOcclusion=function(){
  const core=document.querySelector('#discboard>.table-core');
  const out={ok:true,layout:document.documentElement.dataset.uiLayout||'desktop',core:null,discardOverlaps:[],viewportOverflows:[],motion:window.__lastDiscardMotion||null};
  if(core){out.core=motionRect(core);document.querySelectorAll('#discboard .dtiles .tile').forEach((el,i)=>{const r=motionRect(el);if(r&&__rectOverlap(r,out.core,6)){out.ok=false;out.discardOverlaps.push({i,player:el.closest('.dzone')?.dataset.player,tile:el.dataset.tileCode,rect:r});}});}
  const vv=visualViewport,vx=vv?vv.offsetLeft:0,vy=vv?vv.offsetTop:0,vw=vv?vv.width:innerWidth,vh=vv?vv.height:innerHeight;
  ['topbar','table','bottom','hand','log'].forEach(id=>{const el=document.getElementById(id);if(!el)return;const r=motionRect(el);if(r&&(r.left<vx-1||r.top<vy-1||r.right>vx+vw+1||r.bottom>vy+vh+1)){out.viewportOverflows.push({id,rect:r});}});
  if(out.viewportOverflows.length)out.ok=false;
  return out;
};

window.__auditRedEdgeMobile=function(){
  const vv=window.visualViewport,vx=vv?vv.offsetLeft:0,vy=vv?vv.offsetTop:0,vw=vv?vv.width:innerWidth,vh=vv?vv.height:innerHeight;
  const view={left:vx,top:vy,right:vx+vw,bottom:vy+vh};
  const out={ok:true,layout:document.documentElement.dataset.uiLayout||'desktop',viewport:view,overflow:[],sideIntoBoard:[],handDiscardOverlaps:[],discardOutsideBoard:[],touch:[],counts:{}};
  const inside=(r,b,p=1)=>r.left>=b.left-p&&r.top>=b.top-p&&r.right<=b.right+p&&r.bottom<=b.bottom+p;
  const addOverflow=(el,label)=>{const r=motionRect(el);if(r&&!inside(r,view,1)){out.ok=false;out.overflow.push({label,rect:r});}};
  document.querySelectorAll('#hand .tile,#topbar button,#opp0 .seat-avatar,#opp1 .tback,#opp2 .tback,#opp3 .tback,#opp1 .pname,#opp3 .pname').forEach((el,i)=>addOverflow(el,(el.closest('#opp2')?'top-':'')+(el.id||el.className||el.tagName+'#'+i)));
  const board=document.getElementById('discboard'),br=board?motionRect(board):null;
  ['opp1','opp3'].forEach(id=>{const seat=document.getElementById(id);if(!seat)return;const backs=[...seat.querySelectorAll('.tback')];out.counts[id]=backs.length;backs.forEach((el,i)=>{const r=motionRect(el);if(br&&r&&__rectOverlap(r,br,0)){out.ok=false;out.sideIntoBoard.push({id,i,rect:r,board:br});}});});
  const handEl=document.getElementById('hand'),handRect=handEl?motionRect(handEl):null;
  document.querySelectorAll('#discboard .dtiles .tile').forEach((el,i)=>{const r=motionRect(el);if(!r)return;if(handRect&&__rectOverlap(r,handRect,2)){out.ok=false;out.handDiscardOverlaps.push({i,player:el.closest('.dzone')?.dataset.player,tile:el.dataset.tileCode,rect:r,hand:handRect});}if(br&&!inside(r,br,1)){out.ok=false;out.discardOutsideBoard.push({i,player:el.closest('.dzone')?.dataset.player,tile:el.dataset.tileCode,rect:r,board:br});}});
  const btn=document.querySelector('#topbar button'),tile=document.querySelector('#hand .tile');
  const isPhone=out.layout==='phone-portrait'||out.layout==='phone-landscape';
  if(btn){const r=motionRect(btn),pass=!isPhone||(r.width>=42&&r.height>=42);out.touch.push({kind:'topButton',width:r.width,height:r.height,ok:pass});if(!pass)out.ok=false;}
  if(tile){const r=motionRect(tile),pass=!isPhone||(r.width>=27&&r.height>=44);out.touch.push({kind:'handTile',width:r.width,height:r.height,ok:pass});if(!pass)out.ok=false;}
  if((out.counts.opp1||0)!==(state?.players?.[1]?.hand?.length||0)||(out.counts.opp3||0)!==(state?.players?.[3]?.hand?.length||0)){out.ok=false;out.countMismatch=true;}
  return out;
};

window.__auditRedEdgeVia=function(){
  const vv=window.visualViewport,vx=vv?vv.offsetLeft:0,vy=vv?vv.offsetTop:0,vw=vv?vv.width:innerWidth,vh=vv?vv.height:innerHeight;
  const view={left:vx,top:vy,right:vx+vw,bottom:vy+vh,width:vw,height:vh};
  const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
  const inside=(r,b,p=1)=>!!r&&r.left>=b.left-p&&r.top>=b.top-p&&r.right<=b.right+p&&r.bottom<=b.bottom+p;
  const visible=e=>!!e&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&rect(e)?.width>0;
  const out={ok:true,layout:document.documentElement.dataset.uiLayout||'desktop',viewport:view,overflows:[],tooSmallText:[],collisions:[],metrics:{}};
  const isPhone=/^phone-/.test(out.layout);
  if(document.getElementById('lobby')?.style.display!=='none' && visible(document.getElementById('lobby'))){
    ['.lobby-head','.mode-grid','.lobby-control-deck','.lobby-compare','.start-match-btn','.lobby-difficulty'].forEach(sel=>{const e=document.querySelector('#lobby '+sel);if(!visible(e))return;const r=rect(e);if(r.left<view.left-2||r.right>view.right+2){out.ok=false;out.overflows.push({scope:'lobby',sel,rect:r});}});
    const compare=document.querySelector('#lobby .lobby-compare'),start=document.querySelector('#lobby .start-match-btn');
    if(visible(compare)&&visible(start)){const a=rect(compare),b=rect(start);if(__rectOverlap(a,b,0)){out.ok=false;out.collisions.push({a:'compare',b:'start',ra:a,rb:b});}}
  }
  if(isPhone && visible(document.getElementById('gameStage'))){
    ['#topbar','#table','#bottom','#hand','#log'].forEach(sel=>{const e=document.querySelector(sel);if(!visible(e))return;const r=rect(e);if(!inside(r,view,2)){out.ok=false;out.overflows.push({scope:'game',sel,rect:r});}});
    const hand=rect(document.querySelector('#hand')),board=rect(document.querySelector('#discboard'));
    if(hand&&board&&__rectOverlap(hand,board,1)){out.ok=false;out.collisions.push({a:'hand',b:'board',ra:hand,rb:board});}
    const panel=document.getElementById('advisorPanel');
    if(panel?.classList.contains('open')){
      if(!inside(rect(panel),view,2)){out.ok=false;out.overflows.push({scope:'advisor',sel:'#advisorPanel',rect:rect(panel)});}
      ['.advisor-title','.advisor-sub','.advisor-status b','.advisor-metric b','.advisor-metric small','.advisor-section-title','.advisor-reason','.advisor-note'].forEach(sel=>{
        document.querySelectorAll('#advisorPanel '+sel).forEach((e,idx)=>{if(!visible(e))return;const fs=parseFloat(getComputedStyle(e).fontSize)||0;const threshold=sel.includes('small')?7:8;if(fs<threshold){out.ok=false;out.tooSmallText.push({sel,idx,fontSize:fs,text:(e.textContent||'').trim().slice(0,28)});}})
      });
    }
    const tile=document.querySelector('#hand .tile');const btn=document.querySelector('#topbar button');
    if(tile){const r=rect(tile);out.metrics.handTile={w:+r.width.toFixed(1),h:+r.height.toFixed(1)};if(r.width<25||r.height<42)out.ok=false;}
    if(btn){const r=rect(btn);out.metrics.topButton={w:+r.width.toFixed(1),h:+r.height.toFixed(1)};if(r.width<42||r.height<42)out.ok=false;}
    out.metrics.board=board;out.metrics.hand=hand;
  }
  out.metrics.scroll={docW:document.documentElement.scrollWidth,docH:document.documentElement.scrollHeight,bodyW:document.body.scrollWidth,bodyH:document.body.scrollHeight};
  return out;
};

window.__auditRedEdgeVia=function(){
  const vv=window.visualViewport,vx=vv?vv.offsetLeft:0,vy=vv?vv.offsetTop:0,vw=vv?vv.width:innerWidth,vh=vv?vv.height:innerHeight;
  const view={left:vx,top:vy,right:vx+vw,bottom:vy+vh,width:vw,height:vh};
  const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
  const visible=e=>!!e&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&R(e)?.width>0;
  const inside=(r,b,p=1)=>!!r&&r.left>=b.left-p&&r.top>=b.top-p&&r.right<=b.right+p&&r.bottom<=b.bottom+p;
  const out={ok:true,layout:document.documentElement.dataset.uiLayout||'desktop',viewport:view,overflows:[],tooSmallText:[],collisions:[],metrics:{}};
  const lobby=document.getElementById('lobby'), lobbyVisible=visible(lobby);
  if(lobbyVisible){
    ['.lobby-head','.mode-grid','.lobby-control-deck','.lobby-compare','.start-match-btn','.lobby-difficulty'].forEach(sel=>{const e=document.querySelector('#lobby '+sel);if(!visible(e))return;const r=R(e);if(r.left<view.left-2||r.right>view.right+2){out.ok=false;out.overflows.push({scope:'lobby',sel,rect:r});}});
    const compare=document.querySelector('#lobby .lobby-compare'),start=document.querySelector('#lobby .start-match-btn');
    if(visible(compare)&&visible(start)&&__rectOverlap(R(compare),R(start),0)){out.ok=false;out.collisions.push({a:'compare',b:'start',ra:R(compare),rb:R(start)});}
  } else if(/^phone-/.test(out.layout)){
    ['#topbar','#table','#bottom','#hand','#log'].forEach(sel=>{const e=document.querySelector(sel);if(!visible(e))return;const r=R(e);if(!inside(r,view,2)){out.ok=false;out.overflows.push({scope:'game',sel,rect:r});}});
    const hand=R(document.querySelector('#hand')),board=R(document.querySelector('#discboard'));
    if(hand&&board&&__rectOverlap(hand,board,1)){out.ok=false;out.collisions.push({a:'hand',b:'board',ra:hand,rb:board});}
    const panel=document.getElementById('advisorPanel');
    if(panel?.classList.contains('open')){
      if(!inside(R(panel),view,2)){out.ok=false;out.overflows.push({scope:'advisor',sel:'#advisorPanel',rect:R(panel)});}
      ['.advisor-title','.advisor-sub','.advisor-status b','.advisor-metric b','.advisor-metric small','.advisor-section-title','.advisor-reason','.advisor-note'].forEach(sel=>document.querySelectorAll('#advisorPanel '+sel).forEach((e,idx)=>{if(!visible(e))return;const fs=parseFloat(getComputedStyle(e).fontSize)||0,threshold=sel.includes('small')?7:8;if(fs<threshold){out.ok=false;out.tooSmallText.push({sel,idx,fontSize:fs,text:(e.textContent||'').trim().slice(0,28)});}}));
    }
    const tile=document.querySelector('#hand .tile'),btn=document.querySelector('#topbar button');
    if(tile){const r=R(tile);out.metrics.handTile={w:+r.width.toFixed(1),h:+r.height.toFixed(1)};if(r.width<25||r.height<42)out.ok=false;}
    if(btn){const r=R(btn);out.metrics.topButton={w:+r.width.toFixed(1),h:+r.height.toFixed(1)};if(r.width<42||r.height<42)out.ok=false;}
    out.metrics.board=board;out.metrics.hand=hand;
  }
  out.metrics.scroll={docW:document.documentElement.scrollWidth,docH:document.documentElement.scrollHeight,bodyW:document.body.scrollWidth,bodyH:document.body.scrollHeight};
  return out;
};
function queueDisplayProfile(){if(__displayProfileRAF)cancelAnimationFrame(__displayProfileRAF);__displayProfileRAF=requestAnimationFrame(()=>{__displayProfileRAF=0;applyDisplayProfile();});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyDisplayProfile,{once:true});else applyDisplayProfile();
window.addEventListener('resize',queueDisplayProfile,{passive:true});
window.addEventListener('orientationchange',()=>setTimeout(queueDisplayProfile,80),{passive:true});
if(window.visualViewport){window.visualViewport.addEventListener('resize',queueDisplayProfile,{passive:true});window.visualViewport.addEventListener('scroll',queueDisplayProfile,{passive:true});}
window.__auditRedEdgeLayout=auditStageLayout;
