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
`