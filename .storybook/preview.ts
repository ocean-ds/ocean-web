import '../packages/ocean-core/dist/ocean.css';
import './main.css';

/** Documentation language (docs text only; components and data stay the same). */
export const globalTypes = {
  locale: {
    name: 'Language',
    description: 'Language of the documentation',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      title: 'Language',
      dynamicTitle: true,
      items: [
        { value: 'en', title: 'English' },
        { value: 'pt', title: 'Português' },
      ],
    },
  },
};

export const parameters = {
  layout: 'centered',
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
  options: {
    storySort: {
      order: [
        'Usage',
        'Welcome',
        'First Steps',
        'Components',
        [
          'Lists',
          [
            'Content List',
            [
              'Content List Default',
              ['Overview', 'Default', 'Strikethrough'],
              'Content List Amount',
              [
                'Overview',
                'Default',
                'Positive',
                'Negative',
                'Strikethrough',
                'Strikethrough neutral',
                'With tag',
              ],
            ],
            'List',
            'Transaction List',
            [
              'Overview',
              'Transaction List Read Only',
              ['Overview', 'Default'],
              'Transaction List Action',
              ['Overview', 'Chevron', 'Menu', 'Swipe'],
              'Transaction List Selectable',
              ['Overview', 'Checkbox', 'Radio'],
              'Transaction List Expandable',
              ['Overview', 'Collapsed', 'Expanded'],
              'Transaction List Child Read Only',
              ['Overview', 'Timeline'],
              'Transaction List Child Action',
              ['Overview', 'Timeline'],
            ],
          ],
          '*',
        ],
        'Examples',
        'Visual tests',
        '*',
      ],
      method: 'alphabetical',
      locales: 'en-US',
    },
    sidebar: {
      showRoots: true,
    },
  },
};
