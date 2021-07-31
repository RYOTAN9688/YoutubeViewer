import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

//sizeとスタイルのマップ

const sizeMap = {
    xs: css`
        font-size:12px;
        line-height:1.66;
    `,
    s: css`
        font-size:14px;
        line-height:1.66;
    `,
    m: css`
        font-size:16px;
        line-height:1.66;
    `,
    subtitle: css`
        font-size:18px;
        line-height:1.66;
    `,
    title: css`
        font-size:20px;
        line-height:1.66;
    `,

};

//colorとスタイルのマップ

const colorsMap = {
    inherit: "inherit",
    black: "#000000",
    red: "#ff3300",
    gray: "8c8c8c",
};


export const sizes = Object.keys(sizeMap);
export const colors = Object.keys(colorsMap);
export const displays = ["intial", "block", "inline", "inline-block"];
export const aligns = ["left", "right", "center"];


const Root = styled.p`
    margin:0;
    color:${({ color }) => colorsMap[color]};
    ${({ size }) => sizeMap[size]};
    display:${({ display }) => display};
    text-align:${({ align }) => align};
    font-weignt:${({ bold }) => (bold ? "bold" : "normal")};
`;

