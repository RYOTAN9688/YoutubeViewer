import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


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
            const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
            if (scrollTop < scrollHeight - clientHeight) {
                //スクロールした位置が一番下でない場合は何もしない
                return;
            }
            //onscrollEndを呼び出す
            onScrollEnd();
        };
        //イベントハンドラの設定
        window.document.addEventListener("scroll", scrollHandler);
        //useEffectの第一引数の関数では、関数を返している
        return () => {
            //コンポーネントのアンマウント時に設定したイベントハンドラを削除する
            //useEffctのクリーンアップのためのオプションの仕組み。
            //返した関数は、コンポーネントをアマウントしたとき、また第二引数が変更されたときに実行
            //この仕組みによりuseEffectの副作用（DOMにハンドラを追加した処理）に対して、
            //不要になったときに元に戻すことができる
            window.document.removeEventListener("scroll", scrollHandler);
        };
        //第二引数にonScrollEndを指定。onScrollEndの値が変わるとuseEffectの第一引数の処理が実行される
        //onScrollEndが変更されると、変更後のonScrollEndを使って再度イベントハンドラの設定処理が実行
    }, [onScrollEnd]);

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