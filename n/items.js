/* pixel_m / items.js
 * 一度設定したら基本的に編集不要です。
 * items/item_001.js ～ item_999.js を自動で読み込みます。
 */
(function(){
  const B=window.PIXEL_BLOCKS;
  const ITEMS=[],byTile=Object.create(null),byType=Object.create(null);

  function registerItem(def){
    if(!def || !def.name || !def.type) throw new Error("registerItem: name/type is required");
    if(def.tileId==null) throw new Error("registerItem: tileId is required");
    if(byTile[def.tileId] || byType[def.type]) throw new Error("Duplicate item: "+def.type);
    const item=Object.assign({},def);
    ITEMS.push(item); byTile[item.tileId]=item; byType[item.type]=item;
    return item;
  }

  window.PIXEL_ITEMS={ITEMS,byTile,byType,registerItem,B};

  for(let i=1;i<=999;i++){
    const n=String(i).padStart(3,"0");
    document.write('<script src="./items/item_'+n+'.js"><\\/script>');
  }
})();
