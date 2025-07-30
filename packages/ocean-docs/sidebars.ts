import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main sidebar with all sections
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Componentes',
      link: {
        type: 'generated-index',
        title: 'Componentes',
        slug: '/components',
        description:
          'Documentação de todos os componentes do Ocean Design System.',
      },
      items: [
        'components/button',
        'components/list',
        'components/transactionlistitem',
        'components/settingslistitem',
      ],
    },
    {
      type: 'category',
      label: 'Fundamentos',
      link: {
        type: 'generated-index',
        title: 'Fundamentos',
        slug: '/foundations',
        description:
          'Documentação de todos os fundamentos do Ocean Design System.',
      },
      items: ['foundations/intro'],
    },
    {
      type: 'category',
      label: 'Guias',
      link: {
        type: 'generated-index',
        title: 'Guias',
        slug: '/guides',
        description: 'Tutoriais e guias para usar o Ocean Design System.',
      },
      items: ['guides/installation', 'guides/quick-start'],
    },
  ],
};

export default sidebars;
