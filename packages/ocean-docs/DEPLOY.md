# Guia de Deploy - Ocean Documentation

Este guia explica como fazer deploy da documentação Ocean em diferentes plataformas.

## 🚀 Opções de Deploy

### 1. GitHub Pages (Recomendado)

#### Deploy Automático (CI/CD)

O deploy automático está configurado via GitHub Actions:

- **Trigger**: Push para branch `master` ou `main`
- **Arquivo**: `.github/workflows/deploy-docs.yml`
- **URL**: `https://useblu.github.io/ocean-web/`

#### Deploy Manual

```bash
# No diretório raiz
yarn deploy:docs

# Ou diretamente no ocean-docs
cd packages/ocean-docs
yarn deploy:gh-pages
```

#### Configuração

1. **Habilitar GitHub Pages** no repositório:

   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`

2. **Configurar domínio customizado** (opcional):
   - Edite `.github/workflows/deploy-docs.yml`
   - Altere a linha `cname: ocean-docs.useblu.com.br`

### 2. Vercel

#### Deploy Automático

1. **Conectar repositório**:

   - Vá em [vercel.com](https://vercel.com)
   - Import project from GitHub
   - Selecione o repositório `ocean-web`

2. **Configurar projeto**:
   - Root Directory: `packages/ocean-docs`
   - Framework Preset: `Docusaurus 2`
   - Build Command: `yarn build`
   - Output Directory: `build`

#### Deploy Manual

```bash
cd packages/ocean-docs
yarn deploy:vercel
```

#### Configuração

O arquivo `vercel.json` já está configurado com:

- Build otimizado
- Cache headers
- SPA routing

### 3. Netlify

#### Deploy Automático

1. **Conectar repositório**:

   - Vá em [netlify.com](https://netlify.com)
   - New site from Git
   - Conecte com GitHub

2. **Configurar build**:
   - Base directory: `packages/ocean-docs`
   - Build command: `yarn build`
   - Publish directory: `packages/ocean-docs/build`

#### Deploy Manual

```bash
cd packages/ocean-docs
yarn deploy:netlify
```

#### Configuração

O arquivo `netlify.toml` já está configurado com:

- Build settings
- Redirects para SPA
- Cache headers
- Environment variables

### 4. Outros Serviços

#### AWS S3 + CloudFront

```bash
# Build
yarn build

# Upload para S3 (configure AWS CLI primeiro)
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

#### Docker

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
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

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

# Deploy para diferentes plataformas
yarn deploy:gh-pages    # GitHub Pages
yarn deploy:vercel      # Vercel
yarn deploy:netlify     # Netlify

# Servir build localmente
yarn serve

# Limpar cache
yarn clear
```

## 🌐 URLs de Acesso

### Produção

- **GitHub Pages**: `https://useblu.github.io/ocean-web/`
- **Domínio customizado**: `https://ocean-docs.useblu.com.br` (se configurado)

### Preview/Staging

- **Vercel**: URLs automáticas para cada PR
- **Netlify**: Deploy previews automáticos
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

Para diferentes ambientes, edite `docusaurus.config.ts`:

```ts
const config: Config = {
  url: process.env.DEPLOY_URL || 'https://useblu.github.io',
  baseUrl: process.env.BASE_URL || '/ocean-web/',
  // ...
};
```

### CDN e Performance

Para melhor performance:

1. **Ativar Brotli/Gzip** no servidor
2. **Configurar cache headers** (já incluído nas configs)
3. **Usar CDN** para assets estáticos
4. **Minificação** automática pelo Docusaurus

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
# Deve corresponder ao caminho do deploy
```

**Assets não carregam**

```bash
# Verificar se trailingSlash está correto
# GitHub Pages: trailingSlash: false
# Netlify/Vercel: trailingSlash: true (opcional)
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

Já configurados para:

- **CSP** (Content Security Policy)
- **HSTS** (HTTP Strict Transport Security)
- **X-Frame-Options**
- **X-Content-Type-Options**

### Domínio Customizado

Para configurar HTTPS customizado:

1. **GitHub Pages**: Adicionar CNAME no workflow
2. **Vercel**: Domínio automático com SSL
3. **Netlify**: SSL automático Let's Encrypt

## 📈 Próximos Passos

1. **Configurar domínio customizado**
2. **Ativar analytics**
3. **Configurar monitoramento**
4. **Automatizar atualizações de componentes**
5. **Integrar com Storybook**

---

Para dúvidas ou problemas, abra uma [issue no GitHub](https://github.com/useblu/ocean-web/issues) com a tag `documentation`.
