/* 新しいブロックの例：超ジャンプ台 */
(function(){
const B=window.PIXEL_BLOCKS;
B.registerTile({
    id:1001,
    key:'SUPER_SPRING',
    name:'超ジャンプ台',
    cat:'items',
    solid:true,
    sprite(ctx,x,y,size){
        ctx.fillStyle='#7c3aed'; ctx.fillRect(x,y+8,size,8);
        ctx.fillStyle='#e9d5ff'; ctx.fillRect(x+2,y+5,size-4,3);
        ctx.fillStyle='#c4b5fd'; ctx.fillRect(x+5,y+1,size-10,4);
    },
    onStep(player){
        player.vy=-12;
        if(typeof playSound==='function') playSound('jump');
    }
});
})();
