/*
 * PIXEL M - Item registry / plugin loader
 * 新しいアイテムは items/item_XXX.js を追加するだけ。
 */
(function(){
    const B = window.PIXEL_BLOCKS;
    const ITEMS = [];
    const byTile = Object.create(null);
    const byType = Object.create(null);

    function registerItem(def) {
        if (!def || !def.name || !def.type) throw new Error('registerItem: name/type is required');
        if (byType[def.type]) throw new Error(`Item type ${def.type} is already registered.`);

        let tileId = def.tileId;
        if (def.tile) {
            tileId = B.registerTile(Object.assign({
                id: tileId,
                cat: 'items',
                solid: false
            }, def.tile));
        }
        if (tileId == null) throw new Error(`Item ${def.type} needs tileId or tile definition.`);

        const normalized = Object.assign({ width:14, height:14, tileId }, def, { tileId });
        ITEMS.push(normalized);
        byTile[tileId] = normalized;
        byType[normalized.type] = normalized;
        return normalized;
    }

    window.PIXEL_ITEMS = { ITEMS, byTile, byType, registerItem, B };

    for (let i = 1; i <= 64; i++) {
        const n = String(i).padStart(3, '0');
        document.write(`<script src="./items/item_${n}.js"><\/script>`);
    }
})();
