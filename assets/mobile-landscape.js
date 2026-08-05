(function(){
  'use strict';
  const gate=document.getElementById('orientationGate');
  const enter=document.getElementById('enterLandscapeBtn');
  const continueButton=document.getElementById('continuePortraitBtn');
  const status=document.getElementById('orientationStatus');
  if(!gate||!enter||!continueButton)return;

  let dismissed=false;
  const coarse=()=>window.matchMedia?.('(pointer:coarse)').matches||navigator.maxTouchPoints>0;
  const phone=()=>coarse()&&Math.min(innerWidth,innerHeight)<=760;
  const portrait=()=>innerHeight>innerWidth;

  function refresh(){
    const show=phone()&&portrait()&&!dismissed;
    gate.hidden=!show;
    document.documentElement.dataset.orientationGate=show?'open':'closed';
    if(!portrait())dismissed=false;
  }

  async function requestLandscape(){
    enter.disabled=true;
    status.textContent='正在请求全屏与横屏…';
    let fullscreen=false,locked=false;
    try{
      if(!document.fullscreenElement&&document.documentElement.requestFullscreen){
        await document.documentElement.requestFullscreen({navigationUI:'hide'});
      }
      fullscreen=!!document.fullscreenElement;
    }catch(_){fullscreen=false;}
    try{
      if(screen.orientation?.lock){await screen.orientation.lock('landscape');locked=true;}
    }catch(_){locked=false;}
    if(locked){status.textContent='已切换横屏。';}
    else if(fullscreen){status.textContent='已进入全屏，请横向旋转手机。';}
    else{status.textContent='浏览器不允许自动旋转，请关闭方向锁定后手动横放。';}
    enter.disabled=false;
    setTimeout(refresh,120);
  }

  function continuePortrait(){dismissed=true;refresh();}
  enter.addEventListener('click',requestLandscape);
  continueButton.addEventListener('click',continuePortrait);
  window.addEventListener('resize',refresh,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(refresh,100),{passive:true});
  screen.orientation?.addEventListener?.('change',refresh);
  refresh();
  window.__redEdgeLandscapeExperience={refresh,request:requestLandscape,dismiss:continuePortrait,get state(){return{phone:phone(),portrait:portrait(),gateOpen:!gate.hidden,dismissed};}};
})();
