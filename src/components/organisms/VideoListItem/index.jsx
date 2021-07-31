import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router";
import Image from "~/components/atoms/Image";
import Typography from "~/components/atoms/Typography";

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

const Descfription = styled(Typography)`
    margin-top: 5px;
    height: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient: vertical;
`;

const ViewCount = styled(Typography)`
    margin-top: 5px;
`;

const VideoListItemPresenter = ({
    className,
    onclick,
    ThumbnailUrl,
    title,
    description,
    ViewCount,
})