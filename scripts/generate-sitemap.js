const fs = require('fs');
const path = require('path');

function generateSitemap() {
  const baseUrl = 'https://ocean-ds.github.io/ocean-web';
  const componentsPath = '/?path=/docs/components-';
  const docsPath = '/?path=/docs/';

  // Lista de rotas/stories do Storybook
  const stories = [
    { id: 'welcome--docs', path: `${docsPath}welcome--docs` },
    {
      id: 'first-steps--docs',
      path: `${docsPath}first-steps--docs`,
    },
    { id: 'button--docs', path: `${componentsPath}button--docs` },
    {
      id: 'input--docs',
      path: `${componentsPath}inputs-text-input--docs`,
    },
    {
      id: 'input-com-ícones--docs',
      path: `${componentsPath}inputs-input-com-ícones--docs`,
    },
    {
      id: 'input-com-tooltip--docs',
      path: `${componentsPath}inputs-input-com-tooltip--docs`,
    },
    { id: 'select--docs', path: `${componentsPath}inputs-select--docs` },
    {
      id: 'selectautocomplete--docs',
      path: `${componentsPath}inputs-selectautocomplete--docs`,
    },
    {
      id: 'daterange--docs',
      path: `${componentsPath}date-daterange--docs`,
    },
    {
      id: 'datepicker--docs',
      path: `${componentsPath}date-datepicker--docs`,
    },
    { id: 'checkbox--docs', path: `${componentsPath}checkbox--docs` },
    { id: 'radio--docs', path: `${componentsPath}radio--docs` },
    { id: 'alert--docs', path: `${componentsPath}alert--docs` },
    { id: 'modal--docs', path: `${componentsPath}modal--docs` },
    { id: 'badge--docs', path: `${componentsPath}badge--docs` },
    {
      id: 'breadcrumb--docs',
      path: `${componentsPath}breadcrumb--docs`,
    },
    { id: 'accordion--docs', path: `${componentsPath}accordion--docs` },
    { id: 'carousel--docs', path: `${componentsPath}carousel--docs` },
    { id: 'cardgroup--docs', path: `${componentsPath}cardgroup--docs` },
    {
      id: 'cardlistitem--docs',
      path: `${componentsPath}cardlistitem--docs`,
    },
    { id: 'chart--docs', path: `${componentsPath}chart--docs` },
    { id: 'chips--docs', path: `${componentsPath}chips--docs` },
    {
      id: 'crosssellcard--docs',
      path: `${componentsPath}crosssellcard--docs`,
    },
    {
      id: 'currency-input--docs',
      path: `${componentsPath}inputs-currency-input--docs`,
    },
    {
      id: 'getting-started--docs',
      path: `${componentsPath}inputs-getting-started--docs`,
    },
    {
      id: 'date-introducion--docs',
      path: `${componentsPath}date-introducion--docs`,
    },
    {
      id: 'dotpagination--docs',
      path: `${componentsPath}dotpagination--docs`,
    },
    { id: 'divider--docs', path: `${componentsPath}divider--docs` },
    { id: 'drawer--docs', path: `${componentsPath}drawer--docs` },
    {
      id: 'fileuploader--docs',
      path: `${componentsPath}fileuploader--docs`,
    },
    {
      id: 'formcontrol--docs',
      path: `${componentsPath}forms-formcontrol--docs`,
    },
    {
      id: 'examples-form--docs',
      path: `${docsPath}examples-form--docs`,
    },

    { id: 'formlabel--docs', path: `${componentsPath}formlabel--docs` },
    { id: 'grid--docs', path: `${componentsPath}grid--docs` },
    {
      id: 'col--docs',
      path: `${componentsPath}grid-col--docs`,
    },
    {
      id: 'container--docs',
      path: `${componentsPath}grid-container--docs`,
    },
    {
      id: 'row--docs',
      path: `${componentsPath}grid-row--docs`,
    },
    {
      id: 'iconbutton--docs',
      path: `${componentsPath}iconbutton--docs`,
    },
    { id: 'link--docs', path: `${componentsPath}link--docs` },
    { id: 'list--docs', path: `${componentsPath}list--docs` },
    {
      id: 'examples-list--docs',
      path: `${docsPath}examples-list--docs`,
    },
    { id: 'progress--docs', path: `${componentsPath}progress--docs` },
    { id: 'search--docs', path: `${componentsPath}search--docs` },
    { id: 'shortcut--docs', path: `${componentsPath}shortcut--docs` },
    { id: 'snackbar--docs', path: `${componentsPath}snackbar--docs` },
    {
      id: 'stepper--docs',
      path: `${componentsPath}inputs-stepper--docs`,
    },
    { id: 'steps--docs', path: `${componentsPath}steps--docs` },
    { id: 'subheader--docs', path: `${componentsPath}subheader--docs` },
    { id: 'switch--docs', path: `${componentsPath}switch--docs` },
    { id: 'tag--docs', path: `${componentsPath}tag--docs` },
    {
      id: 'textarea--docs',
      path: `${componentsPath}inputs-textarea--docs`,
    },
    {
      id: 'textlistitem--docs',
      path: `${componentsPath}list-textlistitem--docs`,
    },
    {
      id: 'tokeninput--docs',
      path: `${componentsPath}inputs-tokeninput--docs`,
    },
    { id: 'topbar--docs', path: `${componentsPath}topbar--docs` },
    {
      id: 'transactionlistitem--docs',
      path: `${componentsPath}list-transactionlistitem--docs`,
    },
    {
      id: 'typography--docs',
      path: `${componentsPath}typography--docs`,
    },
    {
      id: 'unorderedlistitem--docs',
      path: `${componentsPath}list-unorderedlistitem--docs`,
    },
    {
      id: 'tooltip--docs',
      path: `${componentsPath}tooltip--docs`,
    },
    {
      id: 'webnotification--docs',
      path: `${componentsPath}webnotification--docs`,
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
