const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  // Add any Storybook addons you want here: https://storybook.js.org/addons/
  addons: [],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        { loader: require.resolve('ts-loader') },
        { loader: require.resolve('react-docgen-typescript-loader') },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
