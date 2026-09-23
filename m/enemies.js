/* pixel_m / content/enemies.js
 * 全敵の定義をここにまとめます。
 * AI/物理エンジンは main の共通処理を使い、ここでは敵の種類・初期値を管理します。
 */
(function(){
    const B = window.PIXEL_BLOCKS;

    const ENEMIES = [
        {
            key: 'GOOMBA', name: 'マシュボー', type: 'goomba', tileId: B.TILE_GOOMBA,
            width: 14, height: 14,
            create(c, r) { return { type:this.type, x:c*16, y:r*16, vx:-0.5, vy:0, width:this.width, height:this.height, alive:true }; }
        },
        {
            key: 'KOOPA', name: 'カメカメ', type: 'koopa', tileId: B.TILE_KOOPA,
            width: 14, height: 14,
            create(c, r) { return { type:this.type, x:c*16, y:r*16, vx:-0.6, vy:0, width:this.width, height:this.height, isShell:false, alive:true }; }
        },
        {
            key: 'THWOMP', name: 'ドスドス', type: 'thwomp', tileId: B.TILE_THWOMP,
            width: 16, height: 16,
            create(c, r) { return { type:this.type, x:c*16, y:r*16, homeY:r*16, vy:0, width:this.width, height:this.height, state:'idle', warningTimer:0, alive:true }; }
        },
        {
            key: 'BOWSER', name: 'カメツヨ', type: 'bowser', tileId: B.TILE_BOWSER,
            width: 16, height: 16,
            create(c, r) { return { type:this.type, x:c*16, y:r*16, vx:-0.3, vy:0, width:this.width, height:this.height, hp:5, jumpTimer:0, alive:true }; }
        }
    ];

    const byTile = Object.create(null);
    const byType = Object.create(null);
    for (const def of ENEMIES) { byTile[def.tileId] = def; byType[def.type] = def; }

    window.PIXEL_ENEMIES = { ENEMIES, byTile, byType };
})();
