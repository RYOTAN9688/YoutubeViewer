import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

export const sizes = ["s", "m", "l"];
//fullWidth=trueで幅100% `
const Root = styled.button`
${({ fullWidth }) => fullWidth && css`width: 100%`};
appearance: none; 
border: 0;
border-radius: 4px;
background: #ddd;
color: #000;
font-weight: bold;
cursor: pointer;
:hover {
    background: #eee;
}
:focus {
    outline: none;
    box-shadow: 0 0 0 4px #cbd6ee;
}
transition: background-color .ls linear;
 ${({ size }) => {
        switch (size) {
            case 's':
                return css`
           font-size: 12px;
           padding: 6px 12px;
        `;
            case 'l':
                return css`
           font-size: 18px;
           padding: 10px 18px;
        `;
            default:
                return css`
           font-size: 16px;
           padding: 6px 16px;
        `;
        }
    }};
`;
//StyledComponentsを使ってスタイルを定義したbuttonタグを作成

const Button = ({
    className,
    children,
    type,
    size,
    fullWidth,
    onclick,
}) => (
    <Root
        className={className}
        type={type}
        size={size}
        fullWidth={fullWidth}
        onclick={onclick}
    >
        {children}
    </Root>
);

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    size: PropTypes.oneOf(sizes),
    fullWidth: PropTypes.bool,
    onclick: PropTypes.func,
};

Button.defaultProps = {
    className: "",
    type: "button",
    size: "m",
    fullWidth: false,
    onclick: null,
}

export default Button;