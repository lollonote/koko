/* pixel_m / blocks.js
 * 一度設定したら基本的に編集不要です。
 * blocks/block_001.js ～ block_999.js を自動で読み込みます。
 */
(function(){
  const TILE_EMPTY=0,TILE_GROUND=1,TILE_BRICK=2,TILE_QUESTION=3,TILE_HARD=4,TILE_NOTE=5,
        TILE_DONUT=6,TILE_COIN=7,TILE_PIPE=8,TILE_VINE=9,TILE_PSWITCH=10,TILE_TRAMPOLINE=11,
        TILE_SPIKE=12,TILE_LAVA=13,TILE_GOOMBA=14,TILE_KOOPA=15,TILE_THWOMP=16,TILE_BOWSER=17,
        TILE_START=18,TILE_GOAL=19,TILE_MUSHROOM_ITEM=20,TILE_FIREFLOWER_ITEM=21,
        TILE_QUESTION_MUSHROOM=22,TILE_QUESTION_FIRE=23,TILE_EMPTY_BLOCK=24;

  const TILE_DEFS=Object.create(null);
  let NEXT_CUSTOM_TILE_ID=25;

  function registerTile(def){
    if(!def || !def.name) throw new Error("registerTile: name is required");
    const id=def.id ?? NEXT_CUSTOM_TILE_ID++;
    if(TILE_DEFS[id]) throw new Error("Tile ID "+id+" is already registered.");
    TILE_DEFS[id]={
      id,key:def.key||("CUSTOM_"+id),name:def.name,cat:def.cat||"terrain",
      solid:!!def.solid,
      sprite:typeof def.sprite==="function"?def.sprite:null,
      onTouch:typeof def.onTouch==="function"?def.onTouch:null,
      onStep:typeof def.onStep==="function"?def.onStep:null,
      onHeadHit:typeof def.onHeadHit==="function"?def.onHeadHit:null
    };
    return id;
  }

  [
    [TILE_EMPTY,"消しゴム","terrain",false],[TILE_GROUND,"地面","terrain",true],
    [TILE_BRICK,"レンガ","terrain",true],[TILE_QUESTION,"❓(コイン)","terrain",true],
    [TILE_HARD,"石ブロック","terrain",true],[TILE_NOTE,"音符ブロック","terrain",true],
    [TILE_DONUT,"ドナツ","terrain",true],[TILE_COIN,"コイン","items",false],
    [TILE_PIPE,"土管","terrain",true],[TILE_VINE,"ツタ","terrain",false],
    [TILE_PSWITCH,"Pスイッチ","items",false],[TILE_TRAMPOLINE,"ジャンプ台","items",true],
    [TILE_SPIKE,"トゲ","enemies",false],[TILE_LAVA,"溶岩","enemies",false],
    [TILE_GOOMBA,"マシュボー","enemies",false],[TILE_KOOPA,"カメカメ","enemies",false],
    [TILE_THWOMP,"ドスドス","enemies",false],[TILE_BOWSER,"カメツヨ","enemies",false],
    [TILE_START,"スタート","items",false],[TILE_GOAL,"ゴール","items",false],
    [TILE_MUSHROOM_ITEM,"キノコ","items",false],[TILE_FIREFLOWER_ITEM,"フラワー","items",false],
    [TILE_QUESTION_MUSHROOM,"❓(キノコ)","terrain",true],
    [TILE_QUESTION_FIRE,"❓(フラワー)","terrain",true],[TILE_EMPTY_BLOCK,"空ブロック","terrain",true]
  ].forEach(([id,name,cat,solid])=>registerTile({id,key:"LEGACY_"+id,name,cat,solid}));

  window.PIXEL_BLOCKS={
    TILE_EMPTY,TILE_GROUND,TILE_BRICK,TILE_QUESTION,TILE_HARD,TILE_NOTE,TILE_DONUT,TILE_COIN,
    TILE_PIPE,TILE_VINE,TILE_PSWITCH,TILE_TRAMPOLINE,TILE_SPIKE,TILE_LAVA,TILE_GOOMBA,TILE_KOOPA,
    TILE_THWOMP,TILE_BOWSER,TILE_START,TILE_GOAL,TILE_MUSHROOM_ITEM,TILE_FIREFLOWER_ITEM,
    TILE_QUESTION_MUSHROOM,TILE_QUESTION_FIRE,TILE_EMPTY_BLOCK,TILE_DEFS,registerTile,PALETTE_ITEMS:[]
  };

  // Classic-script loading is intentional: it also works when pixel_m.html is opened with file://.
  for(let i=1;i<=999;i++){
    const n=String(i).padStart(3,"0");
    document.write('<script src="./blocks/block_'+n+'.js"><\\/script>');
  }

  window.PIXEL_BLOCKS.PALETTE_ITEMS=Object.values(TILE_DEFS).map(def=>({
    id:def.id,name:def.name,cat:def.cat
  }));
})();
