(function(){
  'use strict';
  const VERSION='UI Accessibility 1.0';
  if(window.__redEdgeUiAccessibilityVersion===VERSION)return;
  let previousFocus=null;

  function visible(el){
    if(!el)return false;
    const style=getComputedStyle(el),rect=el.getBoundingClientRect();
    return style.display!=='none'&&style.visibility!=='hidden'&&rect.width>0&&rect.height>0;
  }
  function updateLobbySemantics(){
    document.querySelectorAll('#lobby .mode-card').forEach(card=>{
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.setAttribute('aria-pressed',String(card.classList.contains('selected')));
      if(!card.dataset.keyboardReady){
        card.dataset.keyboardReady='1';
        card.addEventListener('keydown',event=>{
          if(event.target!==card||!(event.key==='Enter'||event.key===' '))return;
          event.preventDefault();card.click();
        });
      }
    });
    document.querySelectorAll('#lobby .difficulty-btn,#lobby .entry-btn').forEach(button=>{
      button.setAttribute('aria-pressed',String(button.classList.contains('selected')));
    });
  }
  function updateAdvisorSemantics(){
    const toggle=document.getElementById('advisorToggleBtn');
    const panel=document.getElementById('advisorPanel');
    if(!toggle||!panel)return;
    panel.id=panel.id||'advisorPanel';
    toggle.setAttribute('aria-controls',panel.id);
    toggle.setAttribute('aria-expanded',String(panel.classList.contains('open')));
  }
  function prepareModal(){
    const modal=document.getElementById('modal'),box=document.getElementById('modalBox');
    if(!modal||!box)return;
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    box.tabIndex=-1;
    const heading=box.querySelector('h1,h2,h3');
    if(heading){heading.id=heading.id||'modalTitle';modal.setAttribute('aria-labelledby',heading.id);}
    else modal.removeAttribute('aria-labelledby');
  }
  function onModalChange(){
    const modal=document.getElementById('modal'),box=document.getElementById('modalBox');
    if(!modal||!box)return;
    if(visible(modal)){
      if(!modal.dataset.a11yOpen){
        modal.dataset.a11yOpen='1';
        previousFocus=document.activeElement;
        prepareModal();
        requestAnimationFrame(()=>{
          const target=box.querySelector('button:not([disabled]),select:not([disabled]),[href],input:not([disabled])')||box;
          target.focus({preventScroll:true});
        });
      }else prepareModal();
    }else if(modal.dataset.a11yOpen){
      delete modal.dataset.a11yOpen;
      if(previousFocus&&document.contains(previousFocus))previousFocus.focus({preventScroll:true});
      previousFocus=null;
    }
  }
  function closeTransientUi(){
    const modal=document.getElementById('modal');
    if(visible(modal)&&typeof closeModal==='function'){closeModal();onModalChange();return true;}
    const panel=document.getElementById('advisorPanel');
    if(panel?.classList.contains('open')&&typeof toggleAdvisorPanel==='function'){toggleAdvisorPanel();updateAdvisorSemantics();return true;}
    return false;
  }

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&closeTransientUi()){event.preventDefault();event.stopPropagation();}
  },true);

  const lobby=document.getElementById('lobby'),panel=document.getElementById('advisorPanel'),modal=document.getElementById('modal'),modalBox=document.getElementById('modalBox');
  if(lobby)new MutationObserver(updateLobbySemantics).observe(lobby,{subtree:true,attributes:true,attributeFilter:['class']});
  if(panel)new MutationObserver(updateAdvisorSemantics).observe(panel,{attributes:true,attributeFilter:['class']});
  if(modal)new MutationObserver(onModalChange).observe(modal,{attributes:true,attributeFilter:['style','class']});
  if(modalBox)new MutationObserver(onModalChange).observe(modalBox,{childList:true,subtree:true});
  updateLobbySemantics();updateAdvisorSemantics();onModalChange();
  window.__redEdgeUiAccessibilityVersion=VERSION;
  window.__refreshRedEdgeUiSemantics=function(){updateLobbySemantics();updateAdvisorSemantics();onModalChange();};
})();
