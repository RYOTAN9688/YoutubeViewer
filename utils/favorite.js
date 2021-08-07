const fs = require("fs");

const FAVORITE_IDS_FILE = "./favoriteIds.json";

//お気に入りリストの読み込み
module.exports.readFavoriteIds = () => new Promise((resolve, reject) => {
    //コールバックを受けとる非同期関数
    fs.readFile(FAVORITE_IDS_FILE, "utf-8,", (err, data) => {
        //ファイルの読み込みが終わったら以下の処理が実行
        //errにはファイル読み込み時のエラーオブジェクト（エラーがなければ値なし）
        //dataにはファイル読み込み結果（文字列）
        if (err) {
            reject(err);//失敗したときにエラーオブジェクトを返す
            return;
        }
        //ファイルを読み込んだら、JSON.parseでjavaScriptで配列にして返す
        resolve(data ? JSON.parse(data) : []);;
    });
});

//お気に入りリストへの書き込み
module.exports.writeFavoriteIds = (favoriteIds) => new Promise((resolve, reject) => {
    fs.writeFile(FAVORITE_IDS_FILE, JSON.stringify(favoriteIds), (err) => {
        if (err) {
            reject(err);
            return;
        }
        resolve();
    });
});