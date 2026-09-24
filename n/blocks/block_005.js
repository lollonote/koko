(function(){
    const I = window.PIXEL_ITEMS;

    I.registerItem({
        key: 'BELT_LEFT',
        name: 'ベルト左',
        type: 'item_belt_left',
        tileId: 1006,

        tile: {
            key: 'BELT_LEFT',
            name: '⬅ ベルト左',
            cat: 'items',
            solid: true,

            sprite(ctx, x, y, size) {
                // ベース
                ctx.fillStyle = '#334155';
                ctx.fillRect(x, y, size, size);

                // ベルト部分
                ctx.fillStyle = '#64748b';
                ctx.fillRect(
                    x + 1,
                    y + 3,
                    size - 2,
                    size - 6
                );

                // 矢印
                ctx.fillStyle = '#a78bfa';

                ctx.beginPath();
                ctx.moveTo(x + 13, y + 8);
                ctx.lineTo(x + 6, y + 8);
                ctx.lineTo(x + 6, y + 5);
                ctx.lineTo(x + 2, y + 8);
                ctx.lineTo(x + 6, y + 11);
                ctx.lineTo(x + 6, y + 9);
                ctx.lineTo(x + 13, y + 9);
                ctx.closePath();
                ctx.fill();

                // ローラー
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(x + 1, y + 12, 3, 3);
                ctx.fillRect(x + 12, y + 12, 3, 3);
            },

            onStep(player) {
                // 左へ移動
                player.x -= 1.2;
            }
        },

        create(c, r) {
            return {
                type: this.type,
                x: c * 16,
                y: r * 16,

                vx: 0,
                vy: 0,

                width: 16,
                height: 16,

                alive: true
            };
        }
    });
})();
