import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router';
import Image from '~/components/atoms/Image';

import FavoriteButton from '../../../components/molecules/FavoriteButton';
import Typography from '~/components/atoms/Typography';

const Root = styled.div`
    cursor: pointer;
    display: flex;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    align-items: center;
    position: relative;
    overflow-x: hidden;
`;

const Thumbnail = styled.div`
    flex-shrink: 1;
    min-width: 160px;
    max-width: 160px;
    >*{
        width: 100%;
    }
`;

const InfoWrapper = styled.div`
    margin-left: 10px;
    word-break: break-all;
`;

const Description = styled(Typography)`
    margin-top: 5px;
    height: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient: vertical;
    ${({ requireMarginForButton }) => requireMarginForButton && (
    css`margin-bottom :16px`
  )};
`;

const ViewCount = styled(Typography)`
    margin-top: 5px;
`;

const StyleFavoriteButton = styled(FavoriteButton)`
    position: absolute;
    right: 2px;
    bottom: 2px;
`;

const VideoListItemPresenter = ({
  className,
  onClick,
  ThumbnailUrl,
  title,
  description,
  viewCount,
  withFavoriteButton, // お気に入りボタンを表示するかどうか設定するもの
  videoId, // お気に入りボタンに渡す動画Idを設定
}) => (
  <Root className={className} onClick={onClick}>
    <Thumbnail>
      <Image src={ThumbnailUrl} alt={title} />
    </Thumbnail>
    <InfoWrapper>
      <Typography size="subtitle" bold display="inline-block">{title}</Typography>
      <Description requireMarginForButton={withFavoriteButton}>{description}</Description>
      <ViewCount size="xs" color="gray">
        {viewCount}
        回視聴
      </ViewCount>
      {withFavoriteButton && (
        <StyleFavoriteButton videoId={videoId} />
      )}
    </InfoWrapper>
  </Root>
);

VideoListItemPresenter.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  ThumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  withFavoriteButton: PropTypes.bool,
  videoId: PropTypes.string,
};

VideoListItemPresenter.defaultProps = {
  className: '',
  onClick: null,
  withFavoriteButton: false,
  videoId: '',
};

// 動画データをvideoで受けとって、適切に変換してからプレゼンテーショナル・コンポーネントにデータを渡す
// 動画データはYouTubeAPIから取得したデータを想定
// クリックしたときの動作を設定する役割
const VideoListItemContainer = ({
  className,
  video: {
    id,
    // スニペット（リンクされているWebページの内容を抜粋あるいは要約した短い文字情報のこと）
    snippet: {
      title,
      description, // 説明
      thumbnails: { // サムネイル
        medium: {
          url: ThumbnailUrl,
        },
      },
    },
    statistics: { // 統計
      viewCount,
    },
  },
  withFavoriteButton,
  presenter,
}) => {
  // ページ遷移させるため、useHistoryを使い、historyオブジェクトを取得
  const history = useHistory();
  return presenter({
    className,
    // クリックされたときにページを遷移（ページを移り変わる）する
    onClick: () => {
      history.push(`/play/${id}`);
    },
    title,
    ThumbnailUrl,
    description,
    viewCount,
    withFavoriteButton,
    videoId: id,
  });
};

VideoListItemContainer.propTypes = {
  className: PropTypes.string,
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        medium: PropTypes.shape({
          url: PropTypes.string,
        }),
      }).isRequired,
    }).isRequired,
    statistics: PropTypes.shape({
      viewCount: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  withFavoriteButton: PropTypes.bool,
};

VideoListItemContainer.defaultProps = {
  className: '',
  withFavoriteButton: false,
};

export default (props) => (
  <VideoListItemContainer
    presenter={VideoListItemPresenter}
    {...props}
  />
);
