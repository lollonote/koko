/* pixel_m / enemies.js
 * 一度設定したら基本的に編集不要です。
 * enemies/enemy_001.js ～ enemy_999.js を自動で読み込みます。
 */
(function(){
  const B=window.PIXEL_BLOCKS;
  const ENEMIES=[],byTile=Object.create(null),byType=Object.create(null);

  function registerEnemy(def){
    if(!def || !def.name || !def.type) throw new Error("registerEnemy: name/type is required");
    if(def.tileId==null) throw new Error("registerEnemy: tileId is required");
    if(byTile[def.tileId] || byType[def.type]) throw new Error("Duplicate enemy: "+def.type);
    const item=Object.assign({},def);
    ENEMIES.push(item); byTile[item.tileId]=item; byType[item.type]=item;
    return item;
  }

  window.PIXEL_ENEMIES={ENEMIES,byTile,byType,registerEnemy,B};

  for(let i=1;i<=999;i++){
    const n=String(i).padStart(3,"0");
    document.write('<script src="./enemies/enemy_'+n+'.js"><\\/script>');
  }
})();
