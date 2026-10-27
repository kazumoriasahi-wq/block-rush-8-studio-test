/* Portal-only presentation. Game state, rules, saves and SDK packages stay independent. */
(()=>{'use strict';
 const id=document.body.dataset.game;
 if(id==='block'){
  const pause=document.getElementById('pause'),sound=document.getElementById('sound');
  if(pause&&sound){sound.before(pause);const label=()=>{pause.setAttribute('aria-label',pause.textContent.trim());pause.dataset.glyph=pause.textContent.includes('▶')?'▶':'Ⅱ';};label();new MutationObserver(label).observe(pause,{childList:true,subtree:true,characterData:true});}
 }
 const legacy=['pip','sky','hop','twins','shadow','tower','rain','bite','squish'];
 if(legacy.includes(id)){
  const back=document.createElement('a');back.href='../../#collection';back.className='portal-back';
  const label=()=>{const en=document.documentElement.lang==='en';back.textContent=en?'← PIP & PLAY · Games':'← PIP & PLAY ゲーム一覧';back.href='../../?lang='+(en?'en':'ja')+'#collection';};label();
  if(id==='sky')document.querySelector('footer')?.append(back);else document.body.append(back);
  new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 }
 const intro=document.getElementById(id==='rain'?'intro':id==='twins'?'overlay':'welcome');
 if(['twins','bite','squish','rain','tower'].includes(id)&&intro){
  let activeBefore=false;
  const update=()=>{const active=intro.hidden;document.body.classList.toggle('play-active',active);
   // Collapsing the introduction must not leave the camera at the old scroll offset.
   if(active&&!activeBefore)requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo(0,0)));
   activeBefore=active;
  };
  new MutationObserver(update).observe(intro,{attributes:true,attributeFilter:['hidden']});update();
 }
})();
