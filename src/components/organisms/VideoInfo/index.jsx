import React, { useState } from "react";
import Proptypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import Typography from "../../atoms/Typography";
import PaperButton from "../../atoms/Button/PaperButton";

const Root = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const Title = styled(Typography)`
    margin: 4px 0 10px;
`;


const Description = styled(Typography)`
    margin-top: 10px;
    height: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    display: --webkit-box;
    ${({ showAllDescription }) => !showAllDescription && "-webkit-line-clamp: 3"};
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
`;

//もっと見るボタンを押したときの見た目の制御
export const VideoInfoPresenter = ({
    title,
    description,
    publishedAt,
    viewCount,
}) => {
    const [showAllDescription, setShowAllDescription] = useState(false);
    return (
        <Root>
            <Title size="subtitle" bold>{title}</Title>
            <Typography size="xs" color="gray">
                {viewCount}
                回視聴・
                {publishedAt}
            </Typography>
            <Description showAllDescription={showAllDescription}>
                {description}
            </Description>
            <PaperButton
                //もっと見るボタンをクリックしたとき、表示を変更
                onClick={() => setShowAllDescription(!showAllDescription)}
            >
                {showAllDescription ? "一部を表示" : "もっと見る"}
            </PaperButton>
        </Root >
    );
};

VideoInfoPresenter.propTypes = {
    title: Proptypes.string.isRequired,
    viewCount: Proptypes.string.isRequired,
    publishedAt: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
};

const VideoInfoContainer = ({
    item: {
        snippet: {
            publishedAt,
            title,
            description,
        },
        statistics: {
            viewCount,
        },
    },
    presenter,
}) => (presenter({
    title,
    viewCount,
    publishedAt: moment(publishedAt).format("YYYY/MM/DD"),
    description,//説明
}));

VideoInfoContainer.propTypes = {
    item: PropTypes.shape({
        snippet: Proptypes.shape({
            publishedAt: propTypes.string,
            title: Proptypes.string,
            description: PropTypes.string,
        }),
        statistics: PropTypes.shape({
            viewCount: PropTypes.string,
        }),
    }),
    presenter: PropTypes.func.isRequired,
};

export default (props) => (
    <VideoInfoContainer
        presenter={VideoInfoPresenter}
        {...props}
    />
);

