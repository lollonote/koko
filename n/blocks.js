/* pixel_m / content/blocks.js
 * 全ブロック・タイル定義をここにまとめます。
 * 新しいブロックは CUSTOM TILE AREA に registerTile({...}) を追加してください。
 */
(function(){
    // Tile Identifiers
        const TILE_EMPTY = 0;
        const TILE_GROUND = 1;
        const TILE_BRICK = 2;
        const TILE_QUESTION = 3;
        const TILE_HARD = 4;
        const TILE_NOTE = 5;
        const TILE_DONUT = 6;
        const TILE_COIN = 7;
        const TILE_PIPE = 8;
        const TILE_VINE = 9;
        const TILE_PSWITCH = 10;
        const TILE_TRAMPOLINE = 11;
        const TILE_SPIKE = 12;
        const TILE_LAVA = 13;
        const TILE_GOOMBA = 14;
        const TILE_KOOPA = 15;
        const TILE_THWOMP = 16;
        const TILE_BOWSER = 17;
        const TILE_START = 18;
        const TILE_GOAL = 19;
        const TILE_MUSHROOM_ITEM = 20;
        const TILE_FIREFLOWER_ITEM = 21;
        const TILE_QUESTION_MUSHROOM = 22;
        const TILE_QUESTION_FIRE = 23;
        const TILE_EMPTY_BLOCK = 24;

        /* ================================================================
         * TILE REGISTRY
         * ----------------------------------------------------------------
         * 新しいブロック/アイテムを追加するときは、基本的にこの下の
         * CUSTOM TILE AREA に1個登録するだけでOKです。
         *
         * id は自動採番されます。
         * solid      : true なら通常ブロックとして当たり判定あり
         * sprite     : エディタ/ゲーム画面の見た目
         * onTouch    : プレイヤーが触れたとき
         * onStep     : 上に乗ったとき
         * onHeadHit  : 下から叩いたとき
         *
         * 既存のタイルは従来の処理をそのまま使用するため、
         * 今までのコース・ゲーム挙動をできるだけ維持しています。
         * ================================================================ */
        const TILE_DEFS = Object.create(null);
        let NEXT_CUSTOM_TILE_ID = 25;

        function registerTile(def) {
            if (!def || !def.name) throw new Error('registerTile: name is required');
            const id = def.id ?? NEXT_CUSTOM_TILE_ID++;
            if (TILE_DEFS[id]) throw new Error(`Tile ID ${id} is already registered.`);
            TILE_DEFS[id] = {
                id,
                key: def.key || `CUSTOM_${id}`,
                name: def.name,
                cat: def.cat || 'terrain',
                solid: !!def.solid,
                sprite: typeof def.sprite === 'function' ? def.sprite : null,
                onTouch: typeof def.onTouch === 'function' ? def.onTouch : null,
                onStep: typeof def.onStep === 'function' ? def.onStep : null,
                onHeadHit: typeof def.onHeadHit === 'function' ? def.onHeadHit : null
            };
            return id;
        }

        // 既存タイルの定義。IDは従来のまま固定なので旧コースと互換性があります。
        [
            [TILE_EMPTY, '消しゴム', 'terrain', false],
            [TILE_GROUND, '地面', 'terrain', true],
            [TILE_BRICK, 'レンガ', 'terrain', true],
            [TILE_QUESTION, '❓(コイン)', 'terrain', true],
            [TILE_HARD, '石ブロック', 'terrain', true],
            [TILE_NOTE, '音符ブロック', 'terrain', true],
            [TILE_DONUT, 'ドナツ', 'terrain', true],
            [TILE_COIN, 'コイン', 'items', false],
            [TILE_PIPE, '土管', 'terrain', true],
            [TILE_VINE, 'ツタ', 'terrain', false],
            [TILE_PSWITCH, 'Pスイッチ', 'items', false],
            [TILE_TRAMPOLINE, 'ジャンプ台', 'items', true],
            [TILE_SPIKE, 'トゲ', 'enemies', false],
            [TILE_LAVA, '溶岩', 'enemies', false],
            [TILE_GOOMBA, 'マシュボー', 'enemies', false],
            [TILE_KOOPA, 'カメカメ', 'enemies', false],
            [TILE_THWOMP, 'ドスドス', 'enemies', false],
            [TILE_BOWSER, 'カメツヨ', 'enemies', false],
            [TILE_START, 'スタート', 'items', false],
            [TILE_GOAL, 'ゴール', 'items', false],
            [TILE_MUSHROOM_ITEM, 'キノコ', 'items', false],
            [TILE_FIREFLOWER_ITEM, 'フラワー', 'items', false],
            [TILE_QUESTION_MUSHROOM, '❓(キノコ)', 'terrain', true],
            [TILE_QUESTION_FIRE, '❓(フラワー)', 'terrain', true],
            [TILE_EMPTY_BLOCK, '空ブロック', 'terrain', true]
        ].forEach(([id, name, cat, solid]) => registerTile({ id, key: `LEGACY_${id}`, name, cat, solid }));

        /* ================================================================
         * CUSTOM TILE AREA ★ここだけ編集すれば新しいタイルを追加できます
         * ================================================================
         * 例（現在は実際には登録していません）：
         *
        registerTile({
            key: 'SUPER_SPRING',
            name: '超ジャンプ台',
            cat: 'items',
            solid: true,
            sprite(ctx, x, y, size) {
                ctx.fillStyle = '#a855f7';
                ctx.fillRect(0, 8, size, 8);
                ctx.fillStyle = '#f5d0fe';
                ctx.fillRect(3, 4, size - 6, 4);
            },
            onStep(player) {
                player.vy = -12;
                playSound('jump');
            }
        });
         *
         * ※ custom の sprite は (ctx, x, y, size) を受け取ります。
         *   x/y は描画開始位置なので、ctx.translate(x, y) を使ってもOKです。
         * ================================================================ */
registerTile({
    key: 'ICE_BLOCK',
    name: '氷ブロック',
    cat: 'terrain',
    solid: true,

    sprite(ctx, x, y, size) {
        ctx.fillStyle = '#72d9ff';
        ctx.fillRect(x, y, size, size);
    }
});

        // 外部ブロックを同期ロード。ベルトもメインHTMLより先に登録されます。
        window.PIXEL_BLOCKS = {
            TILE_EMPTY, TILE_GROUND, TILE_BRICK, TILE_QUESTION, TILE_HARD, TILE_NOTE, TILE_DONUT,
            TILE_COIN, TILE_PIPE, TILE_VINE, TILE_PSWITCH, TILE_TRAMPOLINE, TILE_SPIKE, TILE_LAVA,
            TILE_GOOMBA, TILE_KOOPA, TILE_THWOMP, TILE_BOWSER, TILE_START, TILE_GOAL,
            TILE_MUSHROOM_ITEM, TILE_FIREFLOWER_ITEM, TILE_QUESTION_MUSHROOM, TILE_QUESTION_FIRE, TILE_EMPTY_BLOCK,
            TILE_DEFS, registerTile, PALETTE_ITEMS: []
        };
        document.write('<script src="./blocks/block_004.js"><\/script>');
        document.write('<script src="./blocks/block_005.js"><\/script>');

        const PALETTE_ITEMS = Object.values(TILE_DEFS).map(def => ({
            id: def.id, name: def.name, cat: def.cat
        }));



    window.PIXEL_BLOCKS = {
        TILE_EMPTY, TILE_GROUND, TILE_BRICK, TILE_QUESTION, TILE_HARD, TILE_NOTE, TILE_DONUT,
        TILE_COIN, TILE_PIPE, TILE_VINE, TILE_PSWITCH, TILE_TRAMPOLINE, TILE_SPIKE, TILE_LAVA,
        TILE_GOOMBA, TILE_KOOPA, TILE_THWOMP, TILE_BOWSER, TILE_START, TILE_GOAL,
        TILE_MUSHROOM_ITEM, TILE_FIREFLOWER_ITEM, TILE_QUESTION_MUSHROOM, TILE_QUESTION_FIRE, TILE_EMPTY_BLOCK,
        TILE_DEFS, registerTile, PALETTE_ITEMS
    };
})();
