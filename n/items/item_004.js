(function(){
    const I = window.PIXEL_ITEMS;

    I.registerItem({
        key: 'STAR',
        name: 'スター',
        type: 'item_star',
        tileId: 1004,

        tile: {
            key: 'STAR',
            name: '⭐ スター',
            cat: 'items',
            solid: false,

            sprite(ctx, x, y, size) {
                ctx.fillStyle = '#facc15';

                ctx.beginPath();

                for (let i = 0; i < 10; i++) {
                    const angle = -Math.PI / 2 + i * Math.PI / 5;
                    const radius = i % 2 === 0
                        ? size * 0.45
                        : size * 0.20;

                    const px = x + size / 2 + Math.cos(angle) * radius;
                    const py = y + size / 2 + Math.sin(angle) * radius;

                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }

                ctx.closePath();
                ctx.fill();

                // ハイライト
                ctx.fillStyle = '#fff7ae';
                ctx.fillRect(
                    x + size * 0.35,
                    y + size * 0.25,
                    3,
                    3
                );
            }
        },

        create(c, r) {
            return {
                type: this.type,

                x: c * 16 + 1,
                y: r * 16 + 1,

                vx: 0,
                vy: 0,

                width: 14,
                height: 14,

                alive: true,
                anim: Math.random() * Math.PI * 2
            };
        },

        update(e) {
            e.anim += 0.08;

            // 少し上下に浮遊
            e.y += Math.sin(e.anim) * 0.15;

            return true;
        },

        onPlayerTouch(e, api) {
            e.alive = false;

            api.addScore(2000);

            // 無敵状態
            if (api.player) {
                api.player.invulnerableTimer = 600;
            }

            api.playSound('powerup');
        }
    });
})();
