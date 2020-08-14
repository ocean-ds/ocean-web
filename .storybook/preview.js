import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

export const parameters = {
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  controls: { hideNoControlsWarning: true },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#f7f9ff',
      },
      {
        name: 'dark',
        value: '#393b47',
      },
      {
        name: 'brand',
        value: '#0025e0',
      },
    ],
  },
};
