/* Optional Fever rules layered over the unchanged 16/28-shape engine. */
(function(root){'use strict';const core=root.BlockRush,MAX=20000;
function normalize(s){if(!s)return null;for(const [k,max]of [['feverMs',MAX],['fevers',100000000],['feverBonus',Number.MAX_SAFE_INTEGER]]){if(s[k]===undefined)s[k]=0;if(!Number.isSafeInteger(s[k])||s[k]<0||s[k]>max)return null;}return s;}
function create(...args){return normalize(core.create(...args));}
function restore(raw){return normalize(core.restore(raw));}
function multiplier(s,clears=false){return s.feverMs>0||clears&&(s.combo+1)%5===0?2:1;}
function tick(s,ms){if(!Number.isFinite(ms)||ms<0||s.over)return false;const before=s.feverMs;s.feverMs=Math.max(0,s.feverMs-Math.floor(ms));return before>0&&s.feverMs===0;}
function place(s,i,x,y){const result=core.place(s,i,x,y);if(!result)return null;const activated=result.cleared.length>0&&s.combo%5===0;if(activated){s.feverMs=MAX;s.fevers++;}const baseGain=result.gain,m=s.feverMs>0?2:1;result.baseGain=baseGain;result.multiplier=m;result.feverActivated=activated;result.gain=baseGain*m;if(m===2){s.score+=baseGain;s.feverBonus+=baseGain;}if(s.over)s.feverMs=0;return result;}
const api={...core,create,restore,place,tick,multiplier,FEVER_MS:MAX};root.BlockRush=api;root.BlockRushFever=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
