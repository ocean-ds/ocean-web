import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

export const parameters = {
  viewport: {
    viewports: {
      galaxys5: {
        name: 'Galaxy S5',
        styles: {
          height: '640px',
          width: '360px',
        },
        type: 'mobile',
      },
      ipad: {
        name: 'iPad',
        styles: {
          height: '1024px',
          width: '768px',
        },
        type: 'tablet',
      },
    },
  },
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
