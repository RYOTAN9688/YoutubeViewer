import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useOnScrollEnd from "../../../utils/useOnScrollEnd";

const pcSize = "(min-width: 1000px)";

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

const HeadrerWrapper = styled.div`
    max-width: 1200px;
    margin: auto;
    border-bottom: 1px solid #ccc;
`;

const FlexWrapper = styled.div`
    display: flex;
    max-width: 1200px;
    margin: auto;
    flex-direction: column;
    @media ${pcSize}{
        flex-direction: row;
    }
`;

const PlayerWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 56.25%;
        height: 0px;
        position: relatives;
        width: 100%;
`;

const VideoInfoWrapper = styled.div`
    width: 100%;
`;

const MainContents = styled.div`
    flex-grow: 1;
`;

const SideContents = styled.div`
    width: 100%;
    @media ${pcSize} {
        max-width: 400px;
    }
`;

const VideosListTemplate = ({
    headerContents,
    playerContents,
    videoInfoContents,
    relatedVideosListContents,
    onScrollEnd,
}) => {
    useOnScrollEnd(onScrollEnd);
    return (
        <Root>
            <HeadrerWrapper>
                {headerContents}
            </HeadrerWrapper>
            <FlexWrapper>
                <MainContents>
                    <PlayerWrapper>
                        {playerContents}
                    </PlayerWrapper>
                    <VideoInfoWrapper>
                        {videoInfoContents}
                    </VideoInfoWrapper>
                </MainContents>
                <SideContents>
                    {relatedVideosListContents}
                </SideContents>
            </FlexWrapper>
        </Root>
    );
};

VideosListTemplate.proptypes = {
    headerContents: PropTypes.node,
    playerContents: PropTypes.node.isRequired,
    videoInfoContents: PropTypes.node,
    relatedVideosListContents: PropTypes.node,
    onScrollEnd: PropTypes.func,
};

VideosListTemplate.defaultProps = {
    headerContents: null,
    videoInfoContents: null,
    relatedVideosListContents: null,
    onScrollEnd: null,
};

export default VideosListTemplate;