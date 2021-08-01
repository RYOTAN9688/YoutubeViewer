import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import VideoListTemplate from "~/components/templates/VideoListTemplate";
import Header from "~/components/organisms/Header";
import SearchForm from "~/components/organisms/SearchForm";
import VideoList from "~/components/organisms/VideoList";
import { param } from "../../../../api";



//見た目を実装するコンポーネント
export const TopPagePresenter = ({
    search,//検索
    searchNext,//検索結果の続きを取得
    defaultKeyword,
    videos,
    loading,
}) => (
    //ヘッダー、検索フォーム、動画リストを表示
    <VideoListTemplate
        headerContents={<Header />}
        searchFormContents={(
            <SearchForm onSubmit={search} defaultValue={defaultKeyword} />
        )}
        videosListContents={<VideoList videos={videos} loading={loading} />}
        onScrollEnd={searchNext}//一番下までスクロール
    />
);

TopPagePresenter.propTypes = {
    search: PropTypes.func.isRequired,
    searchNext: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string,
    videos: VideoList.propTypes.videos,
    loading: PropTypes.bool,
};

TopPagePresenter.defaultProps = {
    videos: null,
    loading: false,
    defaultKeyword: "",
};


//検索キーワードが変わったタイミングと、画面が一番下までスクロールしたタイミングで
//ビデオリストを取得するよう実装

const TopPageContainer = ({
    api,
    presenter,
    defaultKeyword,
}) => {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [keyword, setKeyword] = useState(defaultKeyword);
    const [loading, setLoading] = useState(false);
    const cleanedUp = useRef(false);//書き変え可能な値を保持する

    /**
   * ビデオの取得
   * @param pageToken 続きを取得する場合は前回取得時のレスポンスに含まれるnextPageTokenを指定する
   * @returns {Promise<void>}
   */

    //asyncを関数宣言の先頭に置き、非同期関数を作成している。
    const getVideos = async (pageToken) => {
        //getVideosが呼ばれたらローディング状態にするよう
        //setLoading(true)を呼ぶ。
        setLoading(true);

        const {
            data: {
                item,
                nextPageToken: newNextPageToken,
            },
            //api.searchはコンテナーコンポーネントのdefaultPropsとして設定している関数が入る
            //パラメータにpageTokenを渡しているため、pagetokenがあれば続きからの取得となる
        } = await api.search(keyword, { pageToken });
        //このコンポーネントがすでにアンマウントされた場合、以降何もしないようにする。
        //アンマウントされたコンポーネントのstate操作をするとメモリリークなどの不具合が起こる可能性があるため。
        if (cleanedUp.current) {
            return;
        }
        //描画する動画一覧を決定する。
        let nextVideos;
        if (pageToken) {
            //重複を取り除く
            //続きのロードがあれば既存のビデオ一覧に取得したリストを追加したものを設定。
            //検索結果の続きを取得したとき、すでに取得したものと重複する可能性を考慮し、重複を
            //取り除く処理を入れている
            const itemWithoutDuplicated = item.filter(
                ({ id: itemId }) => !videos.find(({ id }) => id === itemId),
            );
            nextVideos = videos.concat(itemWithoutDuplicated);

        } else {
            nextVideos = items;
        }
        setVideos(nextVideos);
        setNextPageToken(newNextPageToken);
        setLoading(false);
    };
    //keywordが変更されたらビデオ取得
    useEffect(() => {
        setNextPageToken(undefined);
        setVideos([]);
        getVideos();
    }, [keyword]);

    //コンポーネントがunmountされたらそれ覚えておく
    //コンポーネントのクリーンアップ時にtrueを設定
    //非同期通信が完了した時にすでにアンマウントされてしまっている場合は
    //trueになる
    useEffect(() => (() => {
        cleanedUp.current = true;
    }), []);

    return presenter({
        search: setKeyword,
        searchNext: () => {
            if (loading || !nextPageToken) {
                //現在ロード中、または次のページがない場合は何もしない
                return;
            }
            getVideos(nextPageToken);
        },
        defaultKeyword,
        videos,
        loading,
    });
};

TopPageContainer.propTypes = {
    api: PropTypes.shape({
        search: PropTypes.func,
    }),
    defaultKeyword: PropTypes.string,
    presenter: PropTypes.func.isRequired,
};

TopPageContainer.defaultProps = {
    api: {
        //axios.getはpromiseを返す
        search: (keyword, params) => axios.get(`/api/videos/search/${keyword}`, { params }),
    },
    defaultKeyword: "ねこ",
};

export default (props) => (
    <TopPageContainer
        presenter={TopPagePresenter}
        {...props}
    />
)