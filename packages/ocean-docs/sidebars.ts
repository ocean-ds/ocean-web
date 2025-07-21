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
  // Tutorial sidebar for getting started guides
  tutorialSidebar: [
    'intro',
    'installation',
    'quick-start',
    // Categorias serão adicionadas conforme novos documentos forem criados
  ],

  // Components sidebar for all React components
  componentsSidebar: [
    'components/intro',
    'components/button',
    // Mais componentes serão adicionados conforme documentados
  ],

  // Foundations sidebar for design foundations
  foundationsSidebar: [
    'foundations/intro',
    // Fundamentos serão adicionados conforme documentados
  ],
};

export default sidebars;
