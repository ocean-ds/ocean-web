# Ocean Docs - Resumo do Deploy

## 🎯 **Estratégia de Deploy Atual**

### **Duas documentações coexistindo no GitHub Pages:**

| Site           | URL                                         | Workflow          | Conteúdo                |
| -------------- | ------------------------------------------- | ----------------- | ----------------------- |
| **Storybook**  | `https://ocean-ds.github.io/ocean-web`      | `site.yml`        | Componentes interativos |
| **Docusaurus** | `https://ocean-ds.github.io/ocean-web/docs` | `deploy-docs.yml` | Documentação textual    |

## ✅ **Configurações Implementadas**

### **Docusaurus (`deploy-docs.yml`)**

```yaml
destination_dir: docs
publish_dir: ./packages/ocean-docs/build
```

### **Docusaurus Config**

```typescript
url: 'https://ocean-ds.github.io';
baseUrl: '/ocean-web/docs/';
```

### **Storybook (`site.yml`)**

```yaml
# Deploy para raiz da gh-pages
run: yarn deploy:storybook -- --ci
```

## 🚀 **Deploy Automático**

**Trigger**: Push para `master` → Ambos os workflows executam

**Resultado**:

1. **Storybook** → Atualiza raiz do GitHub Pages
2. **Docusaurus** → Atualiza subpasta `/docs/`
3. **Sem conflitos** - paths separados

## 📁 **Estrutura Final**

```
https://ocean-ds.github.io/ocean-web/
├── /                    # Storybook (componentes)
└── /docs/              # Docusaurus (documentação)
    ├── /components/    # Páginas de componentes
    ├── /foundations/   # Design foundations
    └── /installation   # Guias de instalação
```

---

**Status**: ✅ **Configurado e funcionando**  
**Última atualização**: Configuração de paths separados para evitar conflitos
