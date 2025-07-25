# Ocean Design System - Deploy Guide

O Ocean Design System é deployado automaticamente via GitHub Actions para GitHub Pages com duas documentações coexistindo:

## 🌊 **URLs de Produção**

### **Storybook (Componentes Interativos)**

- **URL**: `https://ocean-ds.github.io/ocean-web`
- **Workflow**: `.github/workflows/site.yml`
- **Trigger**: Push para `master`
- **Conteúdo**: Storybook com todos os componentes interativos

### **Docusaurus (Documentação Principal)**

- **URL**: `https://ocean-ds.github.io/ocean-web/docs`
- **Workflow**: `.github/workflows/deploy-docs.yml`
- **Trigger**: Push para `master` ou `main`
- **Conteúdo**: Guias, tutoriais, e documentação textual

## 🔄 **Deploy Automático**

### **Quando acontece:**

```yaml
# Ambos os workflows são executados em:
on:
  push:
    branches: [master, main]
```

### **Como funciona:**

1. **Storybook** → Deploy para **raiz** da `gh-pages`
2. **Docusaurus** → Deploy para **subpasta `/docs`** da `gh-pages`
3. **Sem conflitos** - paths diferentes

## 🛠️ **Deploy Manual**

### **Build local do Docusaurus:**

```bash
cd packages/ocean-docs
yarn build
yarn serve  # Preview local
```

### **Deploy manual (se necessário):**

```bash
# Root do projeto
yarn build:docs
yarn deploy:docs  # Deploy via Docusaurus CLI
```

## 📁 **Estrutura GitHub Pages**

```
gh-pages branch:
├── index.html              # Storybook (raiz)
├── static/                 # Assets do Storybook
├── docs/                   # Docusaurus
│   ├── index.html         # Homepage da documentação
│   ├── components/        # Páginas de componentes
│   └── assets/           # Assets do Docusaurus
└── .nojekyll             # Necessário para SPAs
```

## 🔗 **Navegação Entre Sites**

- **Do Storybook → Docusaurus**: Link "Docs" no header
- **Do Docusaurus → Storybook**: Link "Storybook" no footer
- **Cross-reference**: Ambos linkam entre si automaticamente

## 🚨 **Troubleshooting**

### **Deploy falhou:**

1. Verificar se ambos workflows não executaram simultaneamente
2. Verificar logs em Actions tab do GitHub
3. Confirmar permissões do GITHUB_TOKEN

### **URLs não funcionam:**

1. Verificar `baseUrl` no `docusaurus.config.ts`
2. Confirmar `destination_dir` no workflow
3. Aguardar propagação DNS (até 10 minutos)

### **Conflitos de cache:**

```bash
# Limpar cache local
rm -rf packages/ocean-docs/build
rm -rf packages/ocean-docs/.docusaurus
yarn build:docs
```

---

## 📝 **Configuração Atual**

**Docusaurus Config:**

```typescript
url: 'https://ocean-ds.github.io',
baseUrl: '/ocean-web/docs',
organizationName: 'ocean-ds',
projectName: 'ocean-web',
```

**Deploy Workflow:**

```yaml
destination_dir: docs # Subpasta no gh-pages
```

Esta configuração garante que ambas as documentações coexistam sem conflitos! 🎉
