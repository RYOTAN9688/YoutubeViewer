import React from "react";
import TopPage from ".";

export default { title: "pages/TopPage" };

//storyで描画したい要素を返す関数
export const topPage = () => <TopPage />;
topPage.story = { name: "トップページ" };