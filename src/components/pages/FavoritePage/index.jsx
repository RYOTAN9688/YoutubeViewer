import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";
import FavoriteContext from "../../../contexts/FavoriteContext";
import VideoListTemplate from "../../../components/templates/VideosListTemplate";
import Header from "../../organisms/Header";
import VideoList from "../../organisms/VideoList";
import Typography from "../../atoms/Typography";


//タイトルだけ
const SubTitle = styled(Typography).attrs({ size: "title" })`
    margin-top: 10px;
`;

export const FavoritePagePresenter = ({
    videos,
    loading,
}) => (
    <VideoListTemplate
        headerContents={<Header />}
        titleContents={(
            <SubTitle size="tit">お気に入り動画</SubTitle>
        )}
        videosListContents={<VideoList videos={videos} loading={loading} />}
    />
);

FavoritePagePresenter.propTypes = {
    videos: VideoList.propTypes.videos,
    loading: PropTypes.bool,
};

FavoritePagePresenter.defaultProps = {
    videos: [],
    loading: false,
};

const FavoritePageContainer = ({
    api,
    presenter,
}) => {
    const { state: { ids, initialized } } = useContext(FavoriteContext);
    //お気に入り動画はstateで管理する
    const [videos, setVideos] = useState();
    const [loading, setLoading] = useState(false);

    //実際に動画取得している場所
    const getVideos = async () => {
        //お気に入り動画の取得
        setLoading(true);
        const {
            data: {
                items,
            },
        } = await api.getFavoriteVideos();
        setVideos(items);
        setLoading(false);
    };

    //お気に入りが変わったらお気に入り動画を取得
    useEffect(() => {
        if (!initialized) {
            //お気に入りがまだ設定されていなければ何もしない
            return;
        }
        getVideos()
    }, [ids]);

    return presenter({
        videos,
        loading,
    });
};

FavoritePageContainer.propTypes = {
    api: PropTypes.shape({
        getFavoriteVideos: PropTypes.func,
    }),
    presenter: PropTypes.func.isRequired,
};

FavoritePageContainer.defaultProps = {
    api: {
        getFavoriteVideos: () => axios.get("/api/videos/favorites"),
    },
};

export default (props) => (
    <FavoritePageContainer
        presenter={FavoritePagePresenter}
        {...props}
    />
);