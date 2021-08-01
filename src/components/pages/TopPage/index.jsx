import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import VideoListTemplate from "~/components/templates/VideoListTemplate";
import Header from "~/components/organisms/Header";
import SearchForm from "~components/organisms/SearchForm";
import VideoList from "~/components/organisms/VideoList";

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
            <SearchForm onsubmit={search} defaultValue={defaultKeyword} />
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

export default TopPagePresenter;