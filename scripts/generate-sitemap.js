import fs from 'fs';
import path from 'path';

function generateSitemap() {
  const baseUrl = 'https://ocean-ds.github.io/ocean-web';

  // Lista de rotas/stories do Storybook
  const stories = [
    { id: 'welcome--docs', path: '/?path=/docs/welcome--docs' },
    { id: 'button--docs', path: '/?path=/docs/button--docs' },
    { id: 'input--docs', path: '/?path=/docs/input--docs' },
    { id: 'select--docs', path: '/?path=/docs/select--docs' },
    { id: 'checkbox--docs', path: '/?path=/docs/checkbox--docs' },
    { id: 'radio--docs', path: '/?path=/docs/radio--docs' },
    { id: 'alert--docs', path: '/?path=/docs/alert--docs' },
    { id: 'modal--docs', path: '/?path=/docs/modal--docs' },
    { id: 'badge--docs', path: '/?path=/docs/badge--docs' },
    { id: 'breadcrumb--docs', path: '/?path=/docs/breadcrumb--docs' },
    { id: 'accordion--docs', path: '/?path=/docs/accordion--docs' },
    { id: 'carousel--docs', path: '/?path=/docs/carousel--docs' },
    { id: 'chart--docs', path: '/?path=/docs/chart--docs' },
    { id: 'chips--docs', path: '/?path=/docs/chips--docs' },
    { id: 'divider--docs', path: '/?path=/docs/divider--docs' },
    { id: 'drawer--docs', path: '/?path=/docs/drawer--docs' },
    { id: 'fileuploader--docs', path: '/?path=/docs/fileuploader--docs' },
    { id: 'formcontrol--docs', path: '/?path=/docs/formcontrol--docs' },
    { id: 'formlabel--docs', path: '/?path=/docs/formlabel--docs' },
    { id: 'grid--docs', path: '/?path=/docs/grid--docs' },
    { id: 'iconbutton--docs', path: '/?path=/docs/iconbutton--docs' },
    { id: 'link--docs', path: '/?path=/docs/link--docs' },
    { id: 'list--docs', path: '/?path=/docs/list--docs' },
    { id: 'progress--docs', path: '/?path=/docs/progress--docs' },
    { id: 'search--docs', path: '/?path=/docs/search--docs' },
    { id: 'shortcut--docs', path: '/?path=/docs/shortcut--docs' },
    { id: 'snackbar--docs', path: '/?path=/docs/snackbar--docs' },
    { id: 'stepper--docs', path: '/?path=/docs/stepper--docs' },
    { id: 'steps--docs', path: '/?path=/docs/steps--docs' },
    { id: 'subheader--docs', path: '/?path=/docs/subheader--docs' },
    { id: 'switch--docs', path: '/?path=/docs/switch--docs' },
    { id: 'tag--docs', path: '/?path=/docs/tag--docs' },
    { id: 'textarea--docs', path: '/?path=/docs/textarea--docs' },
    { id: 'textlistitem--docs', path: '/?path=/docs/textlistitem--docs' },
    { id: 'tokeninput--docs', path: '/?path=/docs/tokeninput--docs' },
    { id: 'topbar--docs', path: '/?path=/docs/topbar--docs' },
    {
      id: 'transactionlistitem--docs',
      path: '/?path=/docs/transactionlistitem--docs',
    },
    { id: 'typography--docs', path: '/?path=/docs/typography--docs' },
    {
      id: 'unorderedlistitem--docs',
      path: '/?path=/docs/unorderedlistitem--docs',
    },
    { id: 'webnotification--docs', path: '/?path=/docs/webnotification--docs' },
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

export default generateSitemap;
