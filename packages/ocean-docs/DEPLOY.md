# Guia de Deploy - Ocean Documentation

Este guia explica como fazer deploy da documentação Ocean no GitHub Pages.

## 🚀 GitHub Pages (Configuração Principal)

### Deploy Automático (CI/CD)

O deploy automático está configurado via GitHub Actions:

- **Trigger**: Push para branch `master` ou `main`
- **Arquivo**: `.github/workflows/deploy-docs.yml`
- **URL**: `https://useblu.github.io/ocean-web/`

### Deploy Manual

```bash
# No diretório raiz
yarn deploy:docs

# Ou diretamente no ocean-docs
cd packages/ocean-docs
yarn deploy:gh-pages
```

### Configuração

1. **Habilitar GitHub Pages** no repositório:

   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`

2. **Workflow automático** (já configurado):
   - O arquivo `.github/workflows/deploy-docs.yml` faz deploy automático
   - Executa quando há push para `master`/`main`
   - Testa build em Pull Requests

## 🔧 Scripts Disponíveis

### Projeto Raiz

```bash
# Iniciar documentação em desenvolvimento
yarn start:docs

# Build da documentação
yarn build:docs

# Deploy para GitHub Pages
yarn deploy:docs
```

### Ocean Docs

```bash
# Desenvolvimento
yarn start

# Build
yarn build

# Deploy para GitHub Pages
yarn deploy:gh-pages

# Servir build localmente
yarn serve

# Limpar cache
yarn clear
```

## 🌐 URL de Acesso

### Produção

- **GitHub Pages**: `https://useblu.github.io/ocean-web/`

### Preview/Staging

- **GitHub Actions**: Validação de build em PRs

## ⚙️ Configurações Avançadas

### Variáveis de Ambiente

```bash
# .env (desenvolvimento)
BROWSER=none
PORT=3000

# .env.production (produção)
NODE_ENV=production
BABEL_ENV=production
```

### Customização de Base URL

Configuração atual em `docusaurus.config.ts`:

```ts
const config: Config = {
  url: 'https://useblu.github.io',
  baseUrl: '/ocean-web/',
  organizationName: 'useblu',
  projectName: 'ocean-web',
  deploymentBranch: 'gh-pages',
};
```

## 🐛 Troubleshooting

### Problemas Comuns

**Build falha por falta de memória**

```bash
# Aumentar limite de memória do Node.js
NODE_OPTIONS="--max_old_space_size=4096" yarn build
```

**Base URL incorreta**

```bash
# Verificar configuração no docusaurus.config.ts
# GitHub Pages: baseUrl: '/ocean-web/'
```

**Assets não carregam**

```bash
# Verificar se trailingSlash está correto
# GitHub Pages: trailingSlash: false
```

**Deploy GitHub Pages falha**

```bash
# Verificar permissões do GITHUB_TOKEN
# Settings > Actions > General > Workflow permissions
```

### Logs e Debug

```bash
# Build com logs verbosos
yarn build --verbose

# Debug do Docusaurus
DEBUG=docusaurus:* yarn start

# Analisar bundle size
yarn build --analyze
```

## 📊 Monitoramento

### Analytics

Adicionar Google Analytics no `docusaurus.config.ts`:

```ts
themeConfig: {
  gtag: {
    trackingID: 'G-XXXXXXXXXX',
    anonymizeIP: true,
  },
}
```

### Performance

- **Lighthouse CI** automático nos PRs
- **Bundle analyzer** para otimização
- **Core Web Vitals** monitoring

## 🔒 Segurança

### Headers de Segurança

GitHub Pages fornece:

- **HTTPS** automático
- **Basic security headers**
- **DDoS protection**

## 💡 Alternativas (Para Referência)

### AWS S3 + CloudFront

```bash
# Build
yarn build

# Upload para S3 (configure AWS CLI primeiro)
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📈 Próximos Passos

1. **Configurar analytics**
2. **Configurar monitoramento**
3. **Automatizar atualizações de componentes**
4. **Integrar com Storybook**

---

Para dúvidas ou problemas, abra uma [issue no GitHub](https://github.com/useblu/ocean-web/issues) com a tag `documentation`.
