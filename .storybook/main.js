const path = require('path');

module.exports = {
  stories: ['../packages/*/src/**/*.stories.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
