//リデューサーは今のデータ状態とactionを受けとり、状態を更新する役割を持つ
export default (state, action) => {
    switch (action.type) {
        //初期化のアクション
        case "init": {
            //お気に入りリストの初期化
            const { ids } = action;
            //actionに渡されたidsで初期化する
            //また、initialized:trueを設定して初期化されたことを設定
            return { ids, initialized: true };
        }
        //追加のアクション
        case "add": {
            //お気に入りリストへの追加
            //actionに渡された動画IDを追加

            //現在のstateからお気に入り動画IDの配列を格納しているidsを取得
            const { ids } = state;
            const [id] = action;
            const index = ids.indexOf(id);
            //action.idに指定された動画IDが既に存在するか？
            if (index !== -1) {
                //既に存在するidならstateを変更しない
                return state;
            }
            ids.push(id);
            return { ...state.ids };
        }
        case "remove": {
            //お気に入りリストから削除
            //actionに渡された動画idを削除
            const { ids } = state;
            const [id] = action;
            const index = ids.indexOf(id);
            if (index === -1) {
                //存在しないidならstateを変更しない
                return state;
            }
            ids.splice(index, 1);
            return { ...state, ids };
        }
        //想定外のacion.typeが渡されたらエラーを返す
        default:
            throw new Error(`${action.type} is not defined.`)
    }
}