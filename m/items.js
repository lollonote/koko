/* pixel_m / content/items.js
 * 全アイテムの定義をここにまとめます。
 * プレイ中に生成されるアイテムもここで初期状態を管理します。
 */
(function(){
    const B = window.PIXEL_BLOCKS;

    const ITEMS = [
        {
            key:'MUSHROOM', name:'キノコ', type:'item_mushroom', tileId:B.TILE_MUSHROOM_ITEM,
            width:14, height:14,
            create(c,r) { return { type:this.type, x:c*16, y:r*16, vx:1, vy:0, width:this.width, height:this.height, alive:true }; }
        },
        {
            key:'FLOWER', name:'フラワー', type:'item_fireflower', tileId:B.TILE_FIREFLOWER_ITEM,
            width:14, height:14,
            create(c,r) { return { type:this.type, x:c*16, y:r*16, vx:0, vy:0, width:this.width, height:this.height, alive:true }; }
        }
    ];

    const byTile = Object.create(null);
    const byType = Object.create(null);
    for (const def of ITEMS) { byTile[def.tileId] = def; byType[def.type] = def; }

    window.PIXEL_ITEMS = { ITEMS, byTile, byType };
})();
