import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ocean Design System',
  tagline: 'A comprehensive design system for modern web applications',
  favicon: 'img/ocean-ds.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ocean-ds.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ocean-web/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ocean-ds', // Usually your GitHub org/user name.
  projectName: 'ocean-web', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/ocean-ds/ocean-web/tree/master/packages/ocean-docs/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/ocean-ds.png',
    navbar: {
      logo: {
        alt: 'Ocean Design System Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/ocean-ds/ocean-web',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: 'Componentes',
              to: '/components',
            },
            {
              label: 'Fundamentos',
              to: '/foundations',
            },
            {
              label: 'Guia de Instalação',
              to: '/intro',
            },
          ],
        },
        {
          title: 'Comunidade',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/ocean-ds/ocean-web/issues',
            },
            {
              label: 'Storybook',
              href: 'https://ocean-ds.github.io/ocean-web',
            },
          ],
        },
        {
          title: 'Mais',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ocean-ds/ocean-web',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/@useblu/ocean-react',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Blu by BS2. Construído com Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
};

export default config;
