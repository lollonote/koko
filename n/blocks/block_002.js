/* ➡️ ベルト（右） */
(function(){
 const B=window.PIXEL_BLOCKS;
 if(!B)return;
 B.registerTile({
  id:1004,key:'BELT_RIGHT',name:'➡️ ベルト（右）',cat:'terrain',solid:true,
  sprite(ctx,x,y,size){
   ctx.fillStyle='#26364a';ctx.fillRect(x,y,size,size);
   ctx.fillStyle='#38bdf8';ctx.fillRect(x+1,y+size*.3,size-2,size*.4);
   ctx.fillStyle='#e0f2fe';
   const s=Math.floor(performance.now()/180)%2,cy=y+size*.5;
   for(let i=-1;i<2;i++){const ax=x+size*(.25+i*.34)+s*size*.1;ctx.beginPath();ctx.moveTo(ax-size*.1,cy-size*.14);ctx.lineTo(ax+size*.1,cy);ctx.lineTo(ax-size*.1,cy+size*.14);ctx.closePath();ctx.fill();}
   ctx.strokeStyle='#0ea5e9';ctx.strokeRect(x+.5,y+.5,size-1,size-1);
  },
  onStep(player){player.x+=1.2;}
 });
})();
