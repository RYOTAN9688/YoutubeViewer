import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from '../style/GlobalStyle';
import App from '~/routings/App';
import { FavoriteProvider } from "../contexts/FavoriteContext";


const rootEl = document.getElementById('root');

ReactDOM.render(
    <>
        <GlobalStyle />
        {/* FavoriteProviderでラップ*/}
        <FavoriteProvider>
            <App />,
        </FavoriteProvider>
    </>,
    rootEl,
);

//お気に入り機能のコンテクストは、特定のページではなく複数のページにまたがって使用するため
//アプリ全体のコンポーネントをラップして使用。
