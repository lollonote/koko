/* ⭐ スター
 * 取得してから実時間で10秒間、敵・トゲ・溶岩などのダメージを無効化します。
 */
(function(){
    const I = window.PIXEL_ITEMS;

    I.registerItem({
        key: 'STAR',
        name: 'スター',
        type: 'item_star',
        tileId: 1004,
        width: 14,
        height: 14,

        tile: {
            key: 'STAR',
            name: 'スター',
            cat: 'items',
            solid: false,

            sprite(ctx, x, y, size) {
                ctx.save();
                ctx.translate(x, y);

                const cx = size / 2;
                const cy = size / 2;
                const outer = size * 0.43;
                const inner = size * 0.19;

                ctx.fillStyle = '#facc15';
                ctx.strokeStyle = '#92400e';
                ctx.lineWidth = Math.max(1, size * 0.06);

                ctx.beginPath();
                for (let i = 0; i < 10; i++) {
                    const angle = -Math.PI / 2 + i * Math.PI / 5;
                    const radius = i % 2 === 0 ? outer : inner;
                    const px = cx + Math.cos(angle) * radius;
                    const py = cy + Math.sin(angle) * radius;

                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.restore();
            }
        },

        create(c, r) {
            return {
                type: this.type,
                x: c * 16 + 1,
                y: r * 16 + 1,
                vx: 0,
                vy: 0,
                width: this.width,
                height: this.height,
                alive: true,
                anim: 0
            };
        },

        update(e) {
            e.anim = (e.anim || 0) + 0.08;
            e.y += Math.sin(e.anim) * 0.15;
            return true;
        },

        onPlayerTouch(e, api) {
            if (!e.alive) return;

            e.alive = false;
            api.addScore(2000);

            // 600フレームではなく「取得した瞬間から10秒」を実時間で指定。
            // これによりFPSが変動しても無敵時間が伸びたり縮んだりしません。
            api.player.starInvincibleUntil = performance.now() + 10000;

            api.playSound('powerup');
        }
    });
})();
