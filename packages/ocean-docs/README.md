# Ocean Design System Documentation

> Updated to Node.js 18

Documentação oficial do Ocean Design System construída com [Docusaurus](https://docusaurus.io/).

## 🚀 Início rápido

### Pré-requisitos

- Node.js 16+
- Yarn (recomendado)

### Instalação

```bash
# No diretório raiz do projeto
cd packages/ocean-docs
yarn install
```

### Executar localmente

```bash
yarn start
```

O site será aberto automaticamente em `http://localhost:3000`.

### Build para produção

```bash
yarn build
```

Os arquivos de build serão gerados na pasta `build/`.

## 📁 Estrutura do projeto

```
ocean-docs/
├── docs/                    # Documentação em Markdown/MDX
│   ├── components/         # Documentação dos componentes
│   ├── foundations/        # Design tokens e fundamentos
│   └── development/        # Guias de desenvolvimento
├── src/
│   ├── components/         # Componentes React customizados
│   ├── css/               # Estilos customizados
│   └── pages/             # Páginas customizadas
├── static/                 # Assets estáticos
├── docusaurus.config.ts   # Configuração do Docusaurus
├── sidebars.ts            # Configuração das sidebars
└── package.json
```

## ✏️ Contribuindo com a documentação

### Adicionando nova documentação

1. **Para componentes**: Crie um arquivo `.mdx` em `docs/components/`
2. **Para fundamentos**: Crie um arquivo `.md` em `docs/foundations/`
3. **Para guias**: Crie um arquivo `.md` em `docs/development/`

### Exemplo de documentação de componente

````mdx
---
title: NomeDoComponente
sidebar_label: NomeDoComponente
sidebar_position: 2
---

import { NomeDoComponente } from '@useblu/ocean-react';

# NomeDoComponente

Descrição do componente e seu propósito.

## Uso básico

```tsx live
<NomeDoComponente variant="primary">Exemplo</NomeDoComponente>
```
````

## API

### Props

| Prop      | Tipo     | Padrão      | Descrição              |
| --------- | -------- | ----------- | ---------------------- |
| `variant` | `string` | `'primary'` | Variante do componente |

## Acessibilidade

Lista de considerações de acessibilidade...

## Melhores práticas

### ✅ Faça

- Guideline 1
- Guideline 2

### ❌ Não faça

- Anti-pattern 1
- Anti-pattern 2

````

### Configuração das sidebars

Edite `sidebars.ts` para adicionar novos itens na navegação:

```ts
const sidebars: SidebarsConfig = {
  componentsSidebar: [
    'components/intro',
    {
      type: 'category',
      label: 'Categoria',
      items: [
        'components/novo-componente',
        // ...
      ],
    },
  ],
};
````

### Live code blocks

Use blocos de código interativos para demonstrar componentes:

````mdx
```tsx live
<Button variant="primary">Clique aqui</Button>
```
````

### Importando componentes

Para usar componentes Ocean na documentação:

```mdx
import { Button, Input } from '@useblu/ocean-react';

<Button variant="primary">Exemplo interativo</Button>
```

## 🎨 Customização de estilos

Os estilos customizados estão em `src/css/custom.css` e seguem as variáveis CSS do Ocean Design System.

### Variáveis principais

```css
:root {
  --ifm-color-primary: #0066cc;
  --ifm-font-family-base: 'Inter', sans-serif;
  --ifm-border-radius: 8px;
}
```

### Componentes customizados

Crie componentes React customizados em `src/components/` para funcionalidades específicas da documentação.

## 📱 Design responsivo

A documentação é automaticamente responsiva graças ao Docusaurus e aos estilos customizados do Ocean.

## 🌐 Deploy

### GitHub Pages

```bash
yarn deploy
```

### Build manual

```bash
yarn build
yarn serve  # Para testar localmente
```

## 📋 Scripts disponíveis

- `yarn start` - Servidor de desenvolvimento
- `yarn build` - Build para produção
- `yarn serve` - Servir build local
- `yarn clear` - Limpar cache
- `yarn typecheck` - Verificação de tipos TypeScript

## 🔧 Configuração avançada

### Plugins do Docusaurus

O projeto usa os seguintes plugins:

- `@docusaurus/preset-classic` - Preset padrão
- Styled Components - Para uso dos componentes Ocean
- MDX - Para documentação interativa

### Configuração personalizada

Edite `docusaurus.config.ts` para:

- Alterar metadados do site
- Configurar plugins adicionais
- Personalizar navbar e footer
- Configurar internacionalização

### Adicionando novos idiomas

1. Configure em `docusaurus.config.ts`:

```ts
i18n: {
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en'],
}
```

2. Execute:

```bash
yarn write-translations --locale en
```

## 🐛 Troubleshooting

### Problemas comuns

**Erro de styled-components**

```bash
yarn add styled-components
```

**Componentes Ocean não encontrados**

```bash
yarn add @useblu/ocean-react @useblu/ocean-core
```

**Cache corrupto**

```bash
yarn clear
```

### Logs de desenvolvimento

Use `yarn start --verbose` para logs detalhados.

## 📚 Recursos úteis

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Ocean Storybook](https://ocean.useblu.com.br)
- [Ocean GitHub](https://github.com/useblu/ocean-web)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-documentacao`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona documentação do componente X'`)
4. Faça push para a branch (`git push origin feature/nova-documentacao`)
5. Abra um Pull Request

## 📄 Licença

Este projeto segue a mesma licença do Ocean Design System.

---

Construído com ❤️ usando [Docusaurus](https://docusaurus.io/) e [Ocean Design System](https://github.com/useblu/ocean-web).
