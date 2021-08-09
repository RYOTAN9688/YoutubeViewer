import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import VideosListTemplate from '../../templates/VideoPlayerTemplate';
import Header from '../../organisms/Header';
import VideoInfo from '../../organisms/VideoInfo';
import VideoList from '../../organisms/VideoList';
import YouTubeInlineFrame from '../../atoms/YouTubeInlineFrame';
import Typography from '../../atoms/Typography';

const RecommendVideosWrapper = styled.div`
    padding: 10px;
    box-sizing: border-box;
`;

export const PlayerPagePresenter = ({
  videoId,
  videoData,
  relatedVideos,
  loadingRelatedVideos,
  onScrollEnd,
}) => (
  <VideosListTemplate
    headerContents={<Header />}
    playerContents={<YouTubeInlineFrame videoId={videoId} />}
    videoInfoContents={videoData && <VideoInfo item={videoData} />}
    relatedVideosListContents={(
      <RecommendVideosWrapper>
        <Typography variant="subtitle" bold>関連動画</Typography>
        <VideoList videos={relatedVideos} loading={loadingRelatedVideos} />
      </RecommendVideosWrapper>
        )}
    onScrollEnd={onScrollEnd}
  />
);

PlayerPagePresenter.propTypes = {
  videoId: PropTypes.string.isRequired,
  videoData: PropTypes.shape({}),
  relatedVideos: PropTypes.arrayOf(PropTypes.shape({})),
  loadingRelatedVideos: PropTypes.bool,
  onScrollEnd: PropTypes.func,
};

PlayerPagePresenter.defaultProps = {
  relatedVideos: [],
  loadingRelatedVideos: null,
  videoData: null,
  onScrollEnd: null,
};

export const PlayerPageContainer = ({
  api,
  presenter,
}) => {
  // urlのパスの中で動的に変化する部分の値を取得する。videoIDの値を取得する
  // 動画IDをURLパスから取得する
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);// videoデータ
  console.log(videoData);
  // 関連動画を覚えておく設定。初期値は空配列
  const [relatedVideos, setRelatedVideos] = useState([]);// 関連動画
  // 関連動画を取得中かどうか覚えておく設定。
  // 関連動画取得中であれば、新たな関連動画取得を実行しない制御をする。
  // またvideoListコンポーネントをローディング状態で表示をする制御をする。
  const [loadingRelatedVideos, setLoadingRelatedVideos] = useState(false);// 関連動画読み込み中
  // 関連動画取得中の続きをロードする場合のトークンを設定する設定。
  // 一番下までスクロールされたときに関連動画の続きから取得できるよう、関連動画を取得するたびにstate変数に覚えさせる
  const [nextPageToken, setNextPageToken] = useState('');

  // 動画の詳細情報取得
  // 取得したデータをsetVideoDataに渡して、動画詳細情報を設定。
  // api.getVideoDataはdefaultPropsを使い、VideoIdを受けとりaxiosを使い
  // apiからデータを取得する関数
  const getVideoData = async () => {
    const { data } = await api.getVideoData(videoId);
    setVideoData(data);
  };

  // 関連動画の取得
  const getRelateVideos = async () => {
    if (loadingRelatedVideos) {
      // 関連動画読み込み中であれば何もしない
      return;
    }
    // 関連動画読み込み中のフラグをtrueにする
    setLoadingRelatedVideos(true);
    // APIから関連動画を取得
    const {
      data: {
        items: videos,
        // 前回関連動画を読み込んだ時に、nextPageTokenがかえってきていればそれを設定
        nextPageToken: newNextPageToken,
      },
    } = await api.getRelatedVideos(videoId, nextPageToken);
    // 関連動画読み込み中のフラグをfalseにする
    setLoadingRelatedVideos(false);
    // 重複を削除して既に取得済みのものと結合してセット
    setRelatedVideos(relatedVideos.concat(videos.filter(
      ({ id: itemId }) => !relatedVideos.find(({ id }) => id === itemId),
    )));
    // 続きを取得するためのnextPageTokenを覚えておく
    setNextPageToken(newNextPageToken);
  };
    // 動画詳細取得と関連動画取得はコンポーネントのマウント時に行うため、
    // useEffectを使い、videoIdが変更されるたびに画詳細と関連動画情報の再取得をする
  useEffect(() => {
    getVideoData();
    getRelateVideos();
  }, [videoId]);
  return presenter({
    videoId,
    videoData,
    relatedVideos,
    loadingRelatedVideos,
    // 一番下までスクロールされたときに関連動画の続きをロードしてほしいので、getRelatevideos関数を設定
    onScrollEnd: getRelateVideos,
  });
};

PlayerPageContainer.propTypes = {
  api: PropTypes.shape({
    getRelatedVideos: PropTypes.func,
    getVideoData: PropTypes.func,
  }),
};

PlayerPageContainer.defaultProps = {
  api: {
    getVideoData: (videoId) => axios.get(`/api/videos/${videoId}`),
    getRelatedVideos: (videoId, pageToken = '') => axios.get(`/api/videos/${videoId}/related?pageToken=${pageToken}`),
  },
};

export default (props) => (
  <PlayerPageContainer
    presenter={PlayerPagePresenter}
    {...props}
  />
);
