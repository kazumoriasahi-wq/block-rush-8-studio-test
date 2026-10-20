/* Host adapter. No production mock switches and no browser persistence in Playables. */
(function(root){'use strict';
function create({sdk,storage=()=>root.localStorage,notify=()=>{}}={}){
 const hosted=!!sdk?.IN_PLAYABLES_ENV,key='br8_studio_preview1',timers=new Set(),listeners=new Set();
 let values={},loaded=false,dirty=false,revision=0,writing=null,hostPaused=false,audioEnabled=!hosted,frameSent=false,readySent=false,initialized=false;
 const emit=(type,detail)=>{notify(type,detail);listeners.forEach(fn=>fn(type,detail));};
 function warn(){if(hosted)try{sdk.health?.logWarning();}catch{}}
 function suspendTimers(){for(const t of timers){clearTimeout(t.id);t.remaining=Math.max(0,t.remaining-(Date.now()-t.started));}}
 function arm(t){t.started=Date.now();t.id=setTimeout(()=>{timers.delete(t);t.fn();},t.remaining);}
 function schedule(fn,ms){const t={fn,remaining:ms,started:Date.now(),id:null};timers.add(t);if(!hostPaused)arm(t);return t;}
 function bind(){if(initialized)return;initialized=true;if(!hosted)return;
  audioEnabled=sdk.system.isAudioEnabled();
  sdk.system.onAudioEnabledChange(enabled=>{audioEnabled=!!enabled;emit('audio',audioEnabled);});
  sdk.system.onPause(()=>{if(hostPaused)return;hostPaused=true;suspendTimers();emit('pause');void flush(true);});
  sdk.system.onResume(()=>{if(!hostPaused)return;hostPaused=false;emit('resume');for(const t of timers)arm(t);void flush();});
 }
 function decode(raw){if(!raw)return{};const doc=JSON.parse(raw);if(doc.schema!==1||!doc.values||Array.isArray(doc.values)||typeof doc.values!=='object')throw Error('Unsupported save schema');const result={};for(const [k,v]of Object.entries(doc.values)){if(!/^(sound|music|best_classic|best_daily_\d{4}-\d{2}-\d{2}|session_classic|session_daily)$/.test(k)||typeof v!=='string')throw Error('Invalid save data');result[k]=v;}return result;}
 async function init(reload=false){if(loaded&&!reload)return;loaded=false;bind();let raw;if(hosted){raw=await sdk.game.loadData();}else{try{raw=storage().getItem(key);}catch{raw=null;emit('storage-unavailable');}}values=decode(raw);loaded=true;emit('loaded');}
 function set(k,v){if(!loaded)return false;values[k]=String(v);if(k.startsWith('best_daily_')){const dates=Object.keys(values).filter(n=>n.startsWith('best_daily_')).sort().reverse();dates.slice(14).forEach(n=>delete values[n]);}revision++;dirty=true;return true;}
 async function flush(final=false){if(!loaded)return false;if(writing)return final?writing.then(()=>flush(true)):writing;if(!dirty||hostPaused&&!final)return !dirty;
  writing=(async()=>{let first=true;while(dirty&&(!hostPaused||final&&first)){first=false;const rev=revision,raw=JSON.stringify({schema:1,values});if(raw.length*2>60000){emit('save-error');warn();return false;}try{if(hosted)await sdk.game.saveData(raw);else storage().setItem(key,raw);}catch{emit('save-error');warn();return false;}if(revision===rev)dirty=false;emit('saved');if(hostPaused)break;}return !dirty;})().finally(()=>{writing=null;});return writing;
 }
 function firstFrame(){if(frameSent)return;frameSent=true;if(sdk?.game?.firstFrameReady)sdk.game.firstFrameReady();}
 function ready(){if(!loaded)throw Error('Save must load before gameReady');if(readySent||hostPaused)return;readySent=true;if(sdk?.game?.gameReady)sdk.game.gameReady();}
 function whenActive(){if(!hostPaused)return Promise.resolve();return new Promise(resolve=>{const fn=type=>{if(type==='resume'){listeners.delete(fn);resolve();}};listeners.add(fn);});}
 return{hosted,init,get:k=>values[k]??null,set,flush,firstFrame,ready,whenActive,schedule,on:fn=>listeners.add(fn),get paused(){return hostPaused;},get audioEnabled(){return audioEnabled;},get loaded(){return loaded;}};
}
root.BlockRushPlatform={create};if(typeof module!=='undefined')module.exports={create};
})(globalThis);
