PIXEL M プラグイン式構成

■ 基本
pixel_m.html を開いて遊びます。

■ 新しいアイテム
items/item_005.js のように新しいファイルを追加するだけです。
item_001～item_064 が使用できます。
HTML / items.js は変更不要です。

■ 新しい敵
enemies/enemy_005.js のように追加。
enemy_001～enemy_064 が使用できます。

■ 新しいブロック/仕掛け
blocks/block_001.js のように追加。
block_001～block_064 が使用できます。

■ 重要
ブラウザのセキュリティ上、HTMLだけではフォルダ内のJSファイルを完全自動列挙できません。
そのため、この版では64個の番号付きスロットを本体側で先に用意しています。
利用者は「空いている番号のファイルを新規追加」するだけで済みます。

■ 新しいアイテム例
item_003.js が「超ジャンプ台」の実例です。
これをコピーして item_004.js にし、key/name/type/tileId と処理を変更できます。

■ ID
既存タイルは0～24を維持します。
追加タイルは1000以上など、明示的なIDを付けることを推奨します。
これによりコースコードとの互換性を保ちやすくなります。

■ 外部ファイルで使える主なAPI
window.PIXEL_BLOCKS.registerTile(def)
window.PIXEL_ITEMS.registerItem(def)
window.PIXEL_ENEMIES.registerEnemy(def)
