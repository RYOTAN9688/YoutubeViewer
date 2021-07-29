//storybookの各種設定を書くファイル
const path = require("path");

module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => {
    config.resolve.alias["~"] = path.join(__dirname, "../src/");
    return config;
  },
};
