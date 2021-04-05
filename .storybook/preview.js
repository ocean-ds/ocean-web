import '../packages/ocean-components/dist/ocean.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
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
  controls: { hideNoControlsWarning: true },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
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
