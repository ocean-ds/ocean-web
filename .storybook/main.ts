import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../packages/*/src/**/*.stories.mdx',
    '../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: false,
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      });
    }

    if (config.resolve) {
      config.resolve.extensions = config.resolve.extensions || [];
      config.resolve.extensions.push('.ts', '.tsx');
    }

    return config;
  },
};

export default config;
