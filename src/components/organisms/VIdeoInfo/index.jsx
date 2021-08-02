import React, { useState } from "react";
import Proptypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import Typography from "../../atoms/Typography"
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
                onClick={() => setShowAllDescription(!showAllDescription)}
            >
                {showAllDescription ? !"一部を表示" : "もっと見る"}
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


