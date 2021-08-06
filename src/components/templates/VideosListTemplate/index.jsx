import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useOnScrollEnd from "../../../utils/useOnScrollEnd";


const Root = styled.div`
    width: 100%;
    height: 100%;
`;

const HeaderWrapper = styled.div`
    max-width: 100%;
    margin: auto;
    border-bottom: 1px solid #ccc;
`;

const SearchFormWrapper = styled.div`
    max-width: 720px;
    margin: auto;
`;

const VideosListWrapper = styled.div`
    max-width: 720px;
    margin: auto;
`;

const VideosListTemplate = ({
    headerContents,
    searchFormContents,
    videosListContents,
    onScrollEnd,
}) => {
    useOnScrollEnd(onScrollEnd);
    return (
        <Root>
            <HeaderWrapper>
                {headerContents}
            </HeaderWrapper>
            <SearchFormWrapper>
                {searchFormContents}
            </SearchFormWrapper>
            <VideosListWrapper>
                {videosListContents}
            </VideosListWrapper>
        </Root>
    );
};

VideosListTemplate.propTypes = {
    headerContents: PropTypes.node,//renderできるものかチェック
    SearchFormContents: PropTypes.node,
    videosListContents: PropTypes.node.isRequired,//renderできるものかをチェック（必須）
    onScrollEnd: PropTypes.func,//関数であるかチェック
};

VideosListTemplate.defaultProps = {
    headerContents: null,
    SearchFormContents: null,
    onScrollEnd: null,
}

export default VideosListTemplate;