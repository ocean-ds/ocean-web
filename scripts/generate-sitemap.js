const fs = require('fs');
const path = require('path');

function generateSitemap() {
  const baseUrl = 'https://ocean-ds.github.io/ocean-web';

  // Lista de rotas/stories do Storybook
  const stories = [
    { id: 'welcome--docs', path: '/?path=/docs/welcome--docs' },
    {
      id: 'first-steps--docs',
      path: '/?path=/docs/first-steps--docs',
    },
    { id: 'button--docs', path: '/?path=/docs/components-button--docs' },
    {
      id: 'input--docs',
      path: '/?path=/docs/components-inputs-text-input--docs',
    },
    {
      id: 'input-com-ícones--docs',
      path: '/?path=/docs/components-inputs-input-com-ícones--docs',
    },
    {
      id: 'input-com-tooltip--docs',
      path: '/?path=/docs/components-inputs-input-com-tooltip--docs',
    },
    { id: 'select--docs', path: '/?path=/docs/components-inputs-select--docs' },
    {
      id: 'selectautocomplete--docs',
      path: '/?path=/docs/components-inputs-selectautocomplete--docs',
    },
    {
      id: 'daterange--docs',
      path: '/?path=/docs/components-date-daterange--docs',
    },
    {
      id: 'datepicker--docs',
      path: '/?path=/docs/components-date-datepicker--docs',
    },
    { id: 'checkbox--docs', path: '/?path=/docs/components-checkbox--docs' },
    { id: 'radio--docs', path: '/?path=/docs/components-radio--docs' },
    { id: 'alert--docs', path: '/?path=/docs/components-alert--docs' },
    { id: 'modal--docs', path: '/?path=/docs/components-modal--docs' },
    { id: 'badge--docs', path: '/?path=/docs/components-badge--docs' },
    {
      id: 'breadcrumb--docs',
      path: '/?path=/docs/components-breadcrumb--docs',
    },
    { id: 'accordion--docs', path: '/?path=/docs/components-accordion--docs' },
    { id: 'carousel--docs', path: '/?path=/docs/components-carousel--docs' },
    { id: 'cardgroup--docs', path: '/?path=/docs/components-cardgroup--docs' },
    {
      id: 'cardlistitem--docs',
      path: '/?path=/docs/components-cardlistitem--docs',
    },
    { id: 'chart--docs', path: '/?path=/docs/components-chart--docs' },
    { id: 'chips--docs', path: '/?path=/docs/components-chips--docs' },
    {
      id: 'crosssellcard--docs',
      path: '/?path=/docs/components-crosssellcard--docs',
    },
    {
      id: 'currency-input--docs',
      path: '/?path=/docs/components-inputs-currency-input--docs',
    },
    {
      id: 'getting-started--docs',
      path: '/?path=/docs/components-inputs-getting-started--docs',
    },
    {
      id: 'date-introducion--docs',
      path: '/?path=/docs/components-date-introducion--docs',
    },
    {
      id: 'dotpagination--docs',
      path: '/?path=/docs/components-dotpagination--docs',
    },
    { id: 'divider--docs', path: '/?path=/docs/components-divider--docs' },
    { id: 'drawer--docs', path: '/?path=/docs/components-drawer--docs' },
    {
      id: 'fileuploader--docs',
      path: '/?path=/docs/components-fileuploader--docs',
    },
    {
      id: 'formcontrol--docs',
      path: '/?path=/docs/components-forms-formcontrol--docs',
    },
    {
      id: 'examples-form--docs',
      path: '/?path=/docs/examples-form--docs',
    },

    { id: 'formlabel--docs', path: '/?path=/docs/components-formlabel--docs' },
    { id: 'grid--docs', path: '/?path=/docs/components-grid--docs' },
    {
      id: 'col--docs',
      path: '/?path=/docs/components-grid-col--docs',
    },
    {
      id: 'container--docs',
      path: '/?path=/docs/components-grid-container--docs',
    },
    {
      id: 'row--docs',
      path: '/?path=/docs/components-grid-row--docs',
    },
    {
      id: 'iconbutton--docs',
      path: '/?path=/docs/components-iconbutton--docs',
    },
    { id: 'link--docs', path: '/?path=/docs/components-link--docs' },
    { id: 'list--docs', path: '/?path=/docs/components-list--docs' },
    {
      id: 'examples-list--docs',
      path: '/?path=/docs/examples-list--docs',
    },
    { id: 'progress--docs', path: '/?path=/docs/components-progress--docs' },
    { id: 'search--docs', path: '/?path=/docs/components-search--docs' },
    { id: 'shortcut--docs', path: '/?path=/docs/components-shortcut--docs' },
    { id: 'snackbar--docs', path: '/?path=/docs/components-snackbar--docs' },
    {
      id: 'stepper--docs',
      path: '/?path=/docs/components-inputs-stepper--docs',
    },
    { id: 'steps--docs', path: '/?path=/docs/components-steps--docs' },
    { id: 'subheader--docs', path: '/?path=/docs/components-subheader--docs' },
    { id: 'switch--docs', path: '/?path=/docs/components-switch--docs' },
    { id: 'tag--docs', path: '/?path=/docs/components-tag--docs' },
    {
      id: 'textarea--docs',
      path: '/?path=/docs/components-inputs-textarea--docs',
    },
    {
      id: 'textlistitem--docs',
      path: '/?path=/docs/components-list-textlistitem--docs',
    },
    {
      id: 'tokeninput--docs',
      path: '/?path=/docs/components-inputs-tokeninput--docs',
    },
    { id: 'topbar--docs', path: '/?path=/docs/components-topbar--docs' },
    {
      id: 'transactionlistitem--docs',
      path: '/?path=/docs/components-list-transactionlistitem--docs',
    },
    {
      id: 'typography--docs',
      path: '/?path=/docs/components-typography--docs',
    },
    {
      id: 'unorderedlistitem--docs',
      path: '/?path=/docs/components-list-unorderedlistitem--docs',
    },
    {
      id: 'tooltip--docs',
      path: '/?path=/docs/components-tooltip--docs',
    },
    {
      id: 'webnotification--docs',
      path: '/?path=/docs/components-webnotification--docs',
    },
  ];

  const urls = stories.map(
    (story) => `  <url>
    <loc>${baseUrl}${story.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  );

  // Adicionar página principal
  urls.unshift(`  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '../storybook-static/sitemap.xml');

  // Verificar se o diretório existe
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    console.log(
      `Diretório ${outputDir} não existe. Execute 'yarn build:storybook' primeiro.`
    );
    return;
  }

  fs.writeFileSync(outputPath, sitemapContent, 'utf8');
  console.log(`✅ Sitemap gerado com sucesso em: ${outputPath}`);
  console.log(`📊 Total de URLs: ${stories.length + 1}`);
}

// Executar se chamado diretamente
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
