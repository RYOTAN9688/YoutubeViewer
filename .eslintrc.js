module.exports = {
  extends: 'airbnb',
  rules: {
    // 関数の引数で使用されていないものについてのルール
    'no-unused-vars': [
      'error', {
        argsIgnorePattern: 'next',
      },
    ],
  },
};
