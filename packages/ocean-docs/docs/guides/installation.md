---
title: Instalação
sidebar_label: Instalação
sidebar_position: 2
---

# Instalação

Aprenda como instalar e configurar o Ocean Design System no seu projeto.

## Pré-requisitos

- Node.js 16.0 ou superior
- React 18.0 ou superior
- TypeScript (recomendado)

## Instalação dos pacotes

### Usando npm

```bash
npm install @useblu/ocean-react @useblu/ocean-core
```

### Usando yarn

```bash
yarn add @useblu/ocean-react @useblu/ocean-core
```

### Usando pnpm

```bash
pnpm add @useblu/ocean-react @useblu/ocean-core
```

## Configuração inicial

### 1. Provider do Ocean

Envolva sua aplicação com o `OceanProvider` para fornecer o tema e configurações globais:

```tsx
import React from 'react';
import { OceanProvider } from '@useblu/ocean-react';
import App from './App';

function Root() {
  return (
    <OceanProvider>
      <App />
    </OceanProvider>
  );
}

export default Root;
```

### 2. Importar estilos CSS

Importe os estilos base do Ocean Core no seu arquivo principal CSS ou no `index.css`:

```css
@import '@useblu/ocean-core/dist/ocean.css';
```

Ou se você estiver usando Sass/SCSS:

```scss
@import '@useblu/ocean-core/src/index.scss';
```

### 3. Configurar TypeScript (opcional)

Se você estiver usando TypeScript, adicione as tipagens ao seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@useblu/ocean-react"]
  }
}
```

## Configuração avançada

### Customização de tema

Você pode personalizar o tema passando propriedades customizadas para o `OceanProvider`:

```tsx
import React from 'react';
import { OceanProvider } from '@useblu/ocean-react';

const customTheme = {
  colors: {
    primary: '#0066cc',
    secondary: '#6b7280',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

function Root() {
  return (
    <OceanProvider theme={customTheme}>
      <App />
    </OceanProvider>
  );
}
```

### Configuração com Styled Components

Se você já usa styled-components no seu projeto, certifique-se de que a versão seja compatível:

```bash
# Para styled-components v6
npm install styled-components@^6.0.0

# Para styled-components v5
npm install styled-components@^5.3.0
```

### Bundle analyzer

Para otimizar o bundle size, você pode importar apenas os componentes que você usa:

```tsx
// ❌ Não recomendado - importa tudo
import { Button, Input, Modal } from '@useblu/ocean-react';

// ✅ Recomendado - tree shaking automático
import { Button } from '@useblu/ocean-react/Button';
import { Input } from '@useblu/ocean-react/Input';
import { Modal } from '@useblu/ocean-react/Modal';
```

## Troubleshooting

### Problemas comuns

**Erro: styled-components não encontrado**

```bash
npm install styled-components
```

**Erro: React não encontrado**

```bash
npm install react react-dom
```

**Estilos não carregados**
Verifique se você importou o CSS do Ocean Core corretamente.

### Suporte

Se você encontrar problemas durante a instalação:

- [Abra uma issue no GitHub](https://github.com/ocean-ds/ocean-web/issues)
- Confira nossas [discussões](https://github.com/ocean-ds/ocean-web/issues)
- Consulte nosso [Storybook](https://ocean-ds.github.io/ocean-web) para exemplos
