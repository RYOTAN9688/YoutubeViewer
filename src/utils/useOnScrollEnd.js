import { useEffect } from 'react';

export default (onScrollEnd) => {
  // scrollハンドラをDOMに設定したので副作用ある処理が走る。
  // そのためUseEffectを使用する
  // 無限スクロールと呼ばれるUIで、一番したまでスクロールされたら動画一覧の
  // 続きを読み込めるようにするための設計。
  // 親コンポーネントが続きをロードする関数をonScrollに渡して使用。
  useEffect(() => {
    let cleanup;
    if (!onScrollEnd) {
      return cleanup;
    }
    // スクロール時のイベントハンドラ
    const scrollHandler = ({ target: { scrollingElement } }) => {
      // 一番下までスクロールされたかどうか判断し、一番下までスクロールされたらonScrollEndを呼び出す
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      if (scrollTop < scrollHeight - clientHeight) {
        // スクロールした位置が一番下でない場合は何もしない
        return;
      }
      // onscrollEndを呼び出す
      onScrollEnd();
    };
    // イベントハンドラの設定
    window.document.addEventListener('scroll', scrollHandler);
    // useEffectの第一引数の関数では、関数を返している
    cleanup = () => {
      // コンポーネントのアンマウント時に設定したイベントハンドラを削除する
      // useEffctのクリーンアップのためのオプションの仕組み。
      // 返した関数は、コンポーネントをアマウントしたとき、また第二引数が変更されたときに実行
      // この仕組みによりuseEffectの副作用（DOMにハンドラを追加した処理）に対して、
      // 不要になったときに元に戻すことができる
      window.document.removeEventListener('scroll', scrollHandler);
    };
    return cleanup;
    // 第二引数にonScrollEndを指定。onScrollEndの値が変わるとuseEffectの第一引数の処理が実行される
    // onScrollEndが変更されると、変更後のonScrollEndを使って再度イベントハンドラの設定処理が実行
  }, [onScrollEnd]);
};
