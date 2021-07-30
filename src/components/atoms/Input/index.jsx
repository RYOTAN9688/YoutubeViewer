import React, { useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const Root = styled.input`
    width:100%;
    padding:10px 15px;
    font-size:16px;
    border-radius:4px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    :focus{
        border-color:rgba(100, 100, 255, .5);
    }
::placeholder{
    color:"ddd;
}
`;

//プレゼンテーショナル・コンポ―ネント 見た目の責務を持つ。
//見た目を変更する際はこのコンポーネントを修正する
export const InputPresenter = ({
    className,
    onChange,
    defaultValue,
    placeholder,
}) => (
    <Root
        className={className}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
    />
);

InputPresenter.PropTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,//関数であること
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
};

InputPresenter.defaultProps = {
    className: "",
    onChange: null,
    defaultValue: "",
    placeholder: "",
};

//コンテナ―・コンポーネント
//このコンポーネントは、inputの値をstateで管理、値変更時にpropsで受けとった
//onChangeに変更の値を渡して呼ぶ実装を行っている
//見た目についてはpresenterという名前で受けとった関数を呼び出しその結果を返す
//値が変更された時の挙動を変更したい場合はこのコンポーネントを修正
export const InputContainer = ({
    className,
    onChange,
    defaultValue,
    placeholder,
    presenter,
}) => {
    const [value, setValue] = useState(defaultValue);
    return presenter({
        className,
        onChange: (e) => {
            //入力値が変更された時のハンドラ（処理が発生したときに起動されるもの）
            const { value: newValue } = e.target;
            if (newValue === value) {
                //値が変更されていなければ何もしない
                return;
            };
            //新しい値をセットする
            setValue(newValue);
            //親コンポーネントから渡されたonChangeを呼ぶ
            onChange(newValue);
        },
        defaultValue,
        placeholder,
    });
};

InputContainer.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    defaultStatus: PropTypes.string,
    placeholder: PropTypes.string,
    presenter: PropTypes.func.isRequired,
};

InputContainer.defaultProps = {
    className: "",
    onChange: null,
    defaultStatus: "",
    placeholder: "",
};

//プレゼンテーショナル・コンポーネントとコンテナーコンポーネントっを組み合わせたものが
//inputコンポーネント
//定義として、propsを受けとり、inputContainerを使う関数がinputコンポーネントとなる
//見た目を制御するコンポーネントとして、presenterを受けとり、presenterが指定されない場合は
//inputPresenterをpresenterに設定する
export default ((props) => (
    <InputContainer
        presenter={InputPresenter}
        {...props}
    />
));