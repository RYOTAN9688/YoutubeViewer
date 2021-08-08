const express = require("express");
const { google } = require("googleapis");
const { readFavoriteIds, writeFavoriteIds } = require("../utils/favorite")
require("dotenv").config();

//取得したAPIキーを設定
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
console.log(YOUTUBE_API_KEY);

const youtube = google.youtube({
    //バージョン
    version: "v3",
    //認証
    auth: YOUTUBE_API_KEY
});

const router = express.Router();

router.get("/videos/search/:keyword", (req, res, next) => {
    const { keyword } = req.params;//req（httpリクエストを送るときに送る値が入っている箱のようなモノ)
    const { pageToken } = req.query;//問い合わせや要求などを一定の文字で表したもの
    (async () => {
        //検索結果を動画IDで取得
        const { data: { items: idItems, nextPageToken } } = await youtube.search.list({
            part: "id",
            q: keyword,//検索クエリ
            type: "video",
            maxResults: 20,//最大結果
            pageToken,
        });
        //動画の情報を取得
        const ids = idItems.map(({ id: { videoId } }) => videoId);
        const { data: { items } } = await youtube.videos.list({
            part: "statistics,snippet",
            id: ids.join(","),
        });
        res.json({ items, nextPageToken });
    })().catch(next);
});

//お気に入り動画の取得
router.get('/videos/favorites', (req, res, next) => {
    (async () => {
        // お気に入り動画IDを取得
        const favoriteIds = await readFavoriteIds();
        if (!favoriteIds.length) {
            // お気に入りが1つもなければ空配列を返す
            res.json({ items: [] });
            return;
        }
        // お気に入りのIDから動画の取得
        const { data: { items } } = await youtube.videos.list({
            part: 'statistics,snippet',
            id: favoriteIds.join(','),
        });
        res.json({ items });
    })().catch(next);
});

//動画詳細情報取得
router.get("/videos/:videoId", (req, res, next) => {
    const { videoId } = req.params;
    (async () => {
        //動画の情報を取得
        const { data: { items } } = await youtube.videos.list({
            part: "statistics,snippet",
            id: videoId,
        });
        res.json(items[0]);
    })().catch(next);
});

//関連動画取得
router.get("/videos/:videoId/related", (req, res, next) => {
    const { videoId: relatedToVideoId } = req.params;
    const { pageToken } = req.query;
    (async () => {
        //関連動画のIDを取得
        const { data: { items: idItems, nextPageToken } } = await youtube.search.list({
            part: "id",
            relatedToVideoId,
            type: "video",
            maxResults: 20,
            pageToken,
        });
        //動画の情報を取得
        const ids = idItems.map(({ id: { videoId } }) => videoId);
        const { data: { items } } = await youtube.videos.list({
            part: "statistics,snippet",
            id: ids.join(","),
        });
        res.json({ items, nextPageToken });
    })().catch(next);
});

//お気に入り動画ID一覧取得
//favoritesにgetでアクセスしたら、readFavoriteIdsを使ってお気に入りリストを返す
router.get("/favorites", (req, res, next) => {
    readFavoriteIds().then((data) => {
        res.json(data);
    }).catch(next);
});

//お気に入り登録・解除
router.route("/favorites/:id")
    //お気に入り登録
    .post((req, res, next) => {
        (async () => {
            const { id } = req.params;
            //現時点のお気に入りリストを読み込み
            const favoriteIds = await readFavoriteIds();
            if ((favoriteIds.indexOf(id) === -1)) {
                //パラメータに指定されたIDが現時点のお気に入りになかった場合
                //お気に入りに追加
                favoriteIds.unshift(id);
                //お気に入りリストに書き込む
                writeFavoriteIds(favoriteIds);
            }
            res.end();
        })().catch(next);
    })
    .delete((req, res, next) => {
        (async () => {
            const { id } = req.params;
            //現時点のお気に入りリストを読み込み
            const favoriteIds = await readFavoriteIds();
            const indexOfId = favoriteIds.indexOf(id);
            if (indexOfId !== -1) {
                //パラメータに指定されたIDが現時点のお気に入りにあった場合
                //指定されたIDを解除したものをお気に入りリストに書き込む
                writeFavoriteIds(favoriteIds.filter((favoriteIds) => (favoriteIds !== id)));
            }
            res.end();
        })().catch(next);
    });

module.exports = router;