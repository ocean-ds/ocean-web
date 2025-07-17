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
  features: {
    // V6 é mais compatível com static generation
    storyStoreV7: false,
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

    // Otimizações para geração estática
    if (config.optimization) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          default: false,
          vendors: false,
          // Criar chunk específico para stories
          stories: {
            name: 'stories',
            chunks: 'all',
            test: /\.stories\.(js|jsx|ts|tsx|mdx)$/,
            priority: 20,
          },
          // Chunk para componentes
          components: {
            name: 'components',
            chunks: 'all',
            test: /packages\/ocean-react\/src\/(?!.*\.stories\.).*\.(js|jsx|ts|tsx)$/,
            priority: 15,
          },
        },
      };
    }

    return config;
  },
};

export default config;
