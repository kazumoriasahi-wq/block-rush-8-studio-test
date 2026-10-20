/* Geometry shared by pointer input and regression tests. */
(function(root){'use strict';
function locate({px,py,left,top,step,cell,w,h,touch=false,previous=null}){
 const width=(w-1)*step+cell,height=(h-1)*step+cell;
 const gx=px-width/2,gy=py-height/2-(touch?44+height/2:0);
 const rawX=(gx-left)/step,rawY=(gy-top)/step;
 const snap=(raw,last)=>last!==undefined&&Math.abs(raw-last)<.64?last:Math.round(raw);
 let x=snap(rawX,previous?.x),y=snap(rawY,previous?.y);
 const near=rawX>=-.55&&rawY>=-.55&&rawX<=8-w+.55&&rawY<=8-h+.55;
 if(near){x=Math.max(0,Math.min(8-w,x));y=Math.max(0,Math.min(8-h,y));}
 return{gx,gy,width,height,x,y,near};
}
root.BlockRushDrag={locate};if(typeof module!=='undefined')module.exports={locate};
})(globalThis);
