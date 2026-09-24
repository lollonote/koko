/*
 * PIXEL M - Enemy registry / plugin loader
 * 新しい敵は enemies/enemy_XXX.js を追加するだけ。
 */
(function(){
    const B = window.PIXEL_BLOCKS;
    const ENEMIES = [];
    const byTile = Object.create(null);
    const byType = Object.create(null);

    function registerEnemy(def) {
        if (!def || !def.name || !def.type) throw new Error('registerEnemy: name/type is required');
        if (byType[def.type]) throw new Error(`Enemy type ${def.type} is already registered.`);
        const normalized = Object.assign({ width:14, height:14 }, def);
        ENEMIES.push(normalized);
        if (normalized.tileId != null) byTile[normalized.tileId] = normalized;
        byType[normalized.type] = normalized;
        return normalized;
    }

    window.PIXEL_ENEMIES = { ENEMIES, byTile, byType, registerEnemy, B };

    for (let i = 1; i <= 64; i++) {
        const n = String(i).padStart(3, '0');
        document.write(`<script src="./enemies/enemy_${n}.js"><\/script>`);
    }
})();
