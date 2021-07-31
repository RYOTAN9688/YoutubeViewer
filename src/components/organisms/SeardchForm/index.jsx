import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "~/components/atoms/Input";

const Root = styled.div`
    width: 100%;
    display: flex;
    align-itens: center;
    > *:first-child{
        flex-grow: 1;
        margin-right: 20px;
        width: auto;
    }
`;
//見た目を管理するコンポーネント(プレゼン手―ショナル・コンポーネント)
const SearchFormPresenter = ({
    className,
    onChange,
    defaultValue,
    onsubmit,
}) => (
    <Root className={className}>
        <Input onChange={onChange} defaultValue={defaultValue} />
        <Button onClick={onsubmit} size="l"> 検索</Button>
    </Root>
);

SearchFormPresenter.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
    onsubmit: PropTypes.func.isRequired,
};

SearchFormPresenter.defaultProps = {
    className: "",
    defaultValue: "",
}

//入力された値を管理するコンポーネント（コンテナーコンポーネント）
//seachformコンポーネント」ではonsubmitに検索キーワードを渡して、呼び出すまでを
//責務として設計
//seachformは検索を行うコンポーネントとして再利用できる
const SearchFormContainer = ({
    className,
    defaultValue,
    onsubmit,
    presenter,
}) => {
    //入力された値をstateで管理する
    const [keyword, setKeyword] = useState(defaultValue);
    return presenter({
        className,
        defaultValue,
        //入力値が変更されたらstateのkeywordが更新される
        onChange: setKeyword,
        //検索ボタンが押された時のキーワードを引数に渡して、onsubmitを呼ぶ
        onsubmit: () => onsubmit(keyword),
    });
};

SearchFormContainer.proptypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    onsubmit: PropTypes.func.isRequired,
    presenter: PropTypes.func.isRequired,
};

SearchFormContainer.defaultProps = {
    className: "",
    defaultValue: "",
};


export default (props) => (
    <SearchFormContainer
        presenter={SearchFormPresenter}
        {...props}
    />
);