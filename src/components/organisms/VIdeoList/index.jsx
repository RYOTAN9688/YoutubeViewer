import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import VideoListItem from "../VideoListItem";
import Spinner from "~/components/atoms/Spinner";
import Typography from "~/components/atoms/Typography";

//各videoItemListのスタイルを設定
//marginは親側から設定するほうがよい
//VideoListItemにマージンを含めると、再利用の際にマージンが固定される。

const StyledVideoListItem = styled(VideoListItem)`
    margin-top: 10px;
`;

const Loading = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
`;

//videoを受けとって、それをvideoItemListを使って表示
//propsにloadingを受けとって、データ取得中の表示をしたり、検索結果が１件もない時メッセージを表示する
const VideoList = ({
    videos,
    loading,
}) => (
    <>
        {!loading && !videos.lenght && <Typography>ビデオがありません</Typography>}
        {/*videosの中身の数だけVideoListItemを表示*/}
        {videos.map((video) => (
            <StyledVideoListItem key={videos.id} video={video} />
        ))};
        {/*ロード中はSpinnerを表示*/}
        {loading && <Loading><Spinner /></Loading>}
    </>
);

VideoList.propTypes = {
    videos: PropTypes.arrayOf(PropTypes.shape({})),//Propは特定のarrayでなければならない。
    loading: PropTypes.bool,
};

Video.defaultProps = {
    videos: [],
    loading: false,
};

export default VideoList;

