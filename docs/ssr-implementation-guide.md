# Implementação SSR para Storybook (Experimental)

> ⚠️ **Aviso**: Esta implementação usa APIs privadas do Storybook e pode quebrar em futuras versões.

## 📋 Baseado na Solução da goodhood

Referência: [goodhood SSR implementation](https://github.com/goodhood-eu/goodhood/tree/5f0342b36186f9eccf36930d4cde53626a579b8b/.storybook)

## 🛠️ Implementação

### 1. Instalar Dependências

```bash
npm install --save-dev puppeteer express
```

### 2. Criar Middleware SSR

```javascript
// .storybook/middleware.js
const express = require('express');
const puppeteer = require('puppeteer');

module.exports = (router) => {
  // Registrar middleware SSR
  router.use('/ssr-iframe', async (req, res) => {
    const storyPath = req.query.path;

    if (!storyPath) {
      return res.status(400).send('Missing story path');
    }

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox'],
      });

      const page = await browser.newPage();

      // Simular Googlebot
      await page.setUserAgent(
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      );

      // Carregar story original
      await page.goto(`http://localhost:6006/iframe.html${storyPath}`, {
        waitUntil: 'networkidle2',
        timeout: 10000,
      });

      // Aguardar renderização
      await page.waitForSelector('[data-story-rendered="true"], .docs-story', {
        timeout: 5000,
      });

      // Extrair HTML renderizado
      const html = await page.content();

      await browser.close();

      // Retornar HTML pré-renderizado
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      console.error('SSR Error:', error);
      res.status(500).send('SSR failed');
    }
  });
};
```

### 3. Configurar Preview URL

```javascript
// .storybook/main.js
module.exports = {
  // ... outras configurações

  // Configurar preview URL customizada
  managerWebpack: (config) => {
    // Injetar preview URL customizada
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.STORYBOOK_PREVIEW_URL': JSON.stringify('/ssr-iframe'),
      })
    );
    return config;
  },
};
```

### 4. Script de Inicialização

```bash
#!/bin/bash
# start-ssr-storybook.sh

echo "🚀 Iniciando Storybook com SSR..."

# Iniciar Storybook com preview URL customizada
start-storybook \
  --port 6006 \
  --preview-url="/ssr-iframe" \
  --quiet

echo "✅ Storybook SSR disponível em: http://localhost:6006"
echo "📱 URLs renderizadas no servidor: http://localhost:6006/ssr-iframe?path=..."
```

## 🧪 Teste da Implementação

### 1. Iniciar Storybook

```bash
chmod +x start-ssr-storybook.sh
./start-ssr-storybook.sh
```

### 2. Testar URLs SSR

```bash
# Story normal (SPA)
curl http://localhost:6006/?path=/docs/button--docs

# Story SSR (pré-renderizada)
curl http://localhost:6006/ssr-iframe?path=/docs/button--docs

# Simular Googlebot
curl -A "Googlebot" http://localhost:6006/ssr-iframe?path=/docs/button--docs
```

### 3. Verificar Conteúdo

```bash
# Verificar se o HTML contém conteúdo renderizado
curl -s http://localhost:6006/ssr-iframe?path=/docs/button--docs | grep -i "button"
```

## ⚠️ Limitações e Riscos

### Problemas Conhecidos:

1. **APIs Privadas**: Usa funções internas do Storybook
2. **Versioning**: Pode quebrar em atualizações
3. **Performance**: Puppeteer adiciona overhead
4. **Complexidade**: Requer manutenção constante

### Alternativas Recomendadas:

1. Aguardar suporte oficial do Storybook
2. Usar geração estática otimizada (implementada)
3. Implementar middleware de cache inteligente

## 🔮 Futuro do SSR no Storybook

### Requisitos para API Oficial:

- Configurar `previewUrl` em `main.js`
- Acesso público ao webpack config do preview
- API de middleware padronizada

### Acompanhar Progresso:

- [Issue #12542](https://github.com/storybookjs/storybook/issues/12542)
- [RFC: SSR Support](https://github.com/storybookjs/storybook/discussions)
- [Storybook Roadmap](https://github.com/storybookjs/storybook/projects)

## 💡 Recomendação Atual

Para **produção**, use a estratégia implementada neste projeto:

- ✅ Sitemap automático
- ✅ Metadados SEO otimizados
- ✅ HTML estático otimizado
- ✅ Configuração estável e maintível

Para **experimentação avançada**, implemente o SSR experimental acima com cuidado.
