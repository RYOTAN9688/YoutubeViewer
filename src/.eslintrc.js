module.exports = {
  // コードが想定している環境を設定
  // window.documentのようにwindowオブジェクトがあることを前提とする
  // この設定を書かない場合、windowは未定義の変数と扱われ、eslintがエラーを出力
  env: {
    browser: true,
  },
  extends: 'airbnb',
  // babelを使うことを前提としたESの新しい記法の書き方でリンターエラーが出ないように
  // 出力
  parser: 'babel-eslint',
  // import/resolverの設定は、依存モジュールの解決方法をwebpackの設定に従うことを設定
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.babel.js',
      },
    },
    react: {
      pragma: 'React',
      version: '16.13',
    },
  },
  // airbnbのルール設定から変更したいルールの設定
  rules: {
    // importするパッケージに関するルール
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/',
          '**/*.stories.jsx',
          '**/*.test.js',
          '**/storyutils/*',
        ],
      },
    ],
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'ignore',
      exceptions: [],
    }],
  },
};
