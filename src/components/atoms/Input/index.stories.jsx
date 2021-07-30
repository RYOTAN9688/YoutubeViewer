import React from "react";
//inputのonChangeのように何かアクションを起こすものを動作確認するのにしようする
import { actions } from "@storybook/addon-actions";
import Input from ".";

export default { title: "atoms/Input" };

const props = {
    placeholer: "入力してください",
    //propsのonChangeに動作確認のためのアクションを設定
    //inputの入力欄から値を変更すると、ここで設定したアクションが呼ばれ、
    //actionタブにログが出力される
    ...actions("onChange")
}

export const input = () => <Input  {...props} />;

export const defaultValue = () => <Input {...props} defaultValue="ねこ" />;
defaultValue.story = {
    name: "デフォルト値",
};