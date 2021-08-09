module.exports = (api) => {
  const isProduction = api.env('production');
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '79',
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !isProduction,
      },
    ],
  ];

  const plugins = [
    [
      'babel-plugin-styled-components',
      isProduction
        ? {
          filesize: false, // クラス名にファイル名を含めるかどうか
          displayName: false, // クラス名にReactのコンポーネント名を
          pure: true, // 到着不能コードがある時にそれを除去するかどうか
        }
        : {
          minify: false, // Styles componentsによって生成されるcssのファイルサイズを小さくするかどうか
        },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
