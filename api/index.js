const express = require("express");
const { google } = require("googleapis");
const { async } = require("regenerator-runtime");
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

//動画詳細情報取得
router.get("/videos/videoId", (req, res, next) => {
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
            pageTokens,
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

module.exports = router;