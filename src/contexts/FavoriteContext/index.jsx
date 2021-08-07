import React, { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import reducer from "./reducer";

const FavoriteContext = createContext();

const initialState = {
    favoriteIds: [],
};

//コンテキストプロバイダーコンポーネント
export const FavoriteProvider = ({ api, children }) => {
    //useReducerでreducer関数と初期値をセット
    //React.useReducerを使って、リデューサーを使うことを定義し、stateとdispatchを受けとる
    //React.useReducerは第1引数にリデューサー関数、第2引数にstateの初期値を設定
    //React.useReducerの返り値は、stateとdispatchが返ってくる。stateは第一引数に指定したリデューサーによって
    //計算されたstate、dispatchはアクションを起こすための関数。
    const [state, dispatch] = useReducer(reducer, { ids: [] });
    const value = { state, dispatch };
    //useEffectを使ってコンポーネント描画時にお気に入りリストを取得
    //取得後にdispatchを使って初期化するアクションに取得したお気に入りリストを設定し初期化。
    useEffect(() => {
        api.get().then(({ data }) => {
            //dispatchはリデューサーを使ったデータ更新をアクションを使って行う
            dispatch({ type: "init", ids: data })
        });
    }, []);

    return (
        //コンテキストプロバイダーとしてuseReducerのstateとdispatchをコンテキストに設定
        //コンテキストはFavoriteContext.Providerを使って、childrenで描画されるコンポーネントに
        //valueにリデューサーのstateと、リデューサーを使ってデータ更新を行うdispatchを
        //valueに渡すように実装
        //<FavoriteContext.Provider value={{state,dispatch}}
        //{children}
        //</FavoriteContext.Provider>
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    );
};

FavoriteProvider.propTypes = {
    children: PropTypes.node.isRequired,
    apo: PropTypes.shape({
        get: PropTypes.func,
    }),
};
FavoriteProvider.defaultProps = {
    api: {
        get: () => axios.get("/api/favorites"),
    },
};

export default FavoriteProvider;