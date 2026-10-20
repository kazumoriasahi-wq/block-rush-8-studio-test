/* SFX gate: schedule only after iOS has resumed the context, never after mute/pause. */
(function(root){'use strict';
function create({allowed,createContext,onBlocked=()=>{}}){let context=null,ticket=0;
 async function play(kind='test'){
  if(!allowed())return false;const request=++ticket;
  try{
   if(!context||context.state==='closed')context=createContext();
   const c=context;if(c.state!=='running')await c.resume();
   if(request!==ticket||!allowed()||c!==context||c.state!=='running')return false;
   const notes=kind==='clear'?[523,659,784,1047,1319,1568,2093]:kind==='bad'?[170]:kind==='select'?[523,784]:kind==='test'?[440,554,659]:[523,784,1047];
   notes.forEach((frequency,i)=>{const oscillator=c.createOscillator(),gain=c.createGain(),time=c.currentTime+.01+i*.055;oscillator.type='triangle';oscillator.frequency.setValueAtTime(frequency,time);gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(.045,time+.01);gain.gain.exponentialRampToValueAtTime(.001,time+.2);oscillator.connect(gain);gain.connect(c.destination);oscillator.start(time);oscillator.stop(time+.22);});return true;
  }catch{if(request===ticket)onBlocked();return false;}
 }
 function stop(){ticket++;const c=context;context=null;if(c&&c.state!=='closed')void c.close().catch(()=>{});}
 return{play,stop};
}
root.BlockRushSound={create};if(typeof module!=='undefined')module.exports={create};
})(globalThis);
