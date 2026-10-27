(()=>{'use strict';
const stage=document.getElementById('stage'),board=document.getElementById('board');if(!stage||!board)return;
let queued=false;
function align(){queued=false;if(window.visualViewport&&Math.abs(window.visualViewport.scale-1)>.01)return;
 stage.style.removeProperty('width');stage.style.removeProperty('margin-left');stage.style.removeProperty('margin-right');
 const rect=stage.getBoundingClientRect(),style=getComputedStyle(board),stageStyle=getComputedStyle(stage),num=n=>parseFloat(n)||0;
 const overhead=num(style.paddingLeft)+num(style.paddingRight)+num(style.borderLeftWidth)+num(style.borderRightWidth)+num(style.columnGap)*7;
 if(rect.width<overhead+160)return;
 // Integral CSS-pixel cells avoid repeatedly resampling an 8-column grid.
 const cell=Math.floor((rect.width-overhead)/8),width=cell*8+overhead,shift=(rect.width-width)/2,dpr=window.devicePixelRatio||1;
 const desiredLeft=rect.left+shift,snappedLeft=Math.round(desiredLeft*dpr)/dpr;
 const margin=Math.max(0,num(stageStyle.marginLeft)+shift+snappedLeft-desiredLeft);
 stage.style.width=width+'px';board.style.height=width+'px';stage.style.marginLeft=margin+'px';stage.style.marginRight='auto';
 stage.dataset.clarity='1';
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(align);}
window.addEventListener('resize',schedule,{passive:true});window.addEventListener('pageshow',schedule);window.visualViewport?.addEventListener('resize',schedule,{passive:true});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
const dialog=document.getElementById('dialog');dialog?.addEventListener('close',schedule);
if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(schedule);observer.observe(document.getElementById('game')||document.body);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();
