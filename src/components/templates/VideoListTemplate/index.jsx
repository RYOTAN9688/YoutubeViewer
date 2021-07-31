import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Root = styled.div`
    width: 100%;
    height: 100%;
`;

const HeaderWrapper = styled.div`
    max-width: 720px;
    margin: auto;
    border-bottom: ipx solid #ccc;
`;

const SearchFormWrapper = styled.div`
    max-width: 720px;
    margin: auto;
`;

const VideoListWrapper = styled.div`
    max-width: 720px;
    margin: auto;
`;

const VideoListTemplate = ({
    headerContents,
    SearchFormContents,
    videoListContents,
    onScrollEnd,
}) => {
    //scrollハンドラをDOMに設定したので副作用ある処理が走る。
    //そのためUseEffectを使用する
    //無限スクロールと呼ばれるUIで、一番したまでスクロールされたら動画一覧の
    //続きを読み込めるようにするための設計。
    //親コンポーネントが続きをロードする関数をonScrollに渡して使用。
    useEffect(() => {
        if (!onScrollEnd) {
            return;
        }
        //スクロール時のイベントハンドラ
        const scrollHandler = ({ target: { scrollingElement } }) => {
            //一番下までスクロールされたかどうか判断し、一番下までスクロールされたらonScrollEndを呼び出す
            const { scrollTop, scrollHeight, clientheight } = scrollingElement;
            if (scrollTop < scrollHeight - clientheight) {
                //スクロールした位置が一番下でない場合は何もしない
                return;
            }
            //onscrollEndを呼び出す
            onScrollEnd();
        };
        //イベントハンドラの設定
        window.document.addEventListener("scroll", sclollHandler);
        //useEffectの第一引数の関数では、関数を返している
        return () => {
            //コンポーネントのアンマウント時に設定したイベントハンドラを削除する
            window.document.removeEventListener("scroll", scrollHandler);
        };
        //第二引数にonScrollEndを指定。onScrollEndの値が変わるとuseEffectの第一引数の処理が実行される
        //onScrollEndが変更されると、変更後のonScrollEndを使って再度イベントハンドラの設定処理が実行
    }, [onScrollEnd]);
};