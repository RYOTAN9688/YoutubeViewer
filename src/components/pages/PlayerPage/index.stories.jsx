import React from "react";
import { actions } from "@storybook/addon-actions";

import { PlayerPagePresenter as PlayerPage } from '.';
import sampleData from "../PlayerPage/sampleData.json";


export default { title: "page/PlayerPage" };

const props = {
    ...sampleData,
    loadingRelatedVideos: false,
    ...actions("onScrollEnd"),
};

export const playerPage = () => <PlayerPage {...props} />;
playerPage.story = { name: "デフォルト" };

export const loading = () => (
    <PlayerPage
        {...props}
        relatedVideos={[]}
        videoData={null}
        loadingRelatedVideos
    />
);
loading.story = { name: "ロード中" }

