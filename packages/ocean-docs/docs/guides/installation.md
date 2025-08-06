---
title: Instalação
sidebar_label: Instalação
sidebar_position: 2
---

# Instalação

Aprenda como instalar e configurar o Ocean Design System no seu projeto React.

## Pré-requisitos

- Node.js 16.0 ou superior
- React 18.0 ou superior
- TypeScript (recomendado)

## Instalação

### Pacote principal

```bash
npm install @useblu/ocean-react
```

```bash
yarn add @useblu/ocean-react
```

Este pacote inclui todos os componentes React do Ocean Design System.

### Pacotes complementares (opcionais)

#### Design Tokens

```bash
npm install @useblu/ocean-tokens
```

Para usar os design tokens diretamente (cores, espaçamentos, tipografia):

```tsx
import {
  colorInterfaceLightPure,
  fontSizeLg,
  spacingMd,
} from '@useblu/ocean-tokens';
```

#### Ícones

```bash
npm install @useblu/ocean-icons-react
```

Para usar os ícones SVG do Ocean:

```tsx
import { Star, Heart, Search } from '@useblu/ocean-icons-react';

function MyComponent() {
  return (
    <div>
      <Star size={24} />
      <Heart size={32} />
      <Search size={16} />
    </div>
  );
}
```

#### CSS Base

```bash
npm install @useblu/ocean-core
```

Para usar apenas os estilos CSS do Ocean (sem componentes React):

```css
@import '@useblu/ocean-core';
```

## Configuração

### Importar estilos

Importe os estilos CSS no seu arquivo principal (ex: `src/index.css`):

```css
@import '@useblu/ocean-react/dist/ocean.css';
```

### Uso básico

```tsx
import React from 'react';
import { Button, Input, Badge } from '@useblu/ocean-react';

function App() {
  return (
    <div>
      <Button variant="primary">Clique aqui</Button>
      <Input label="Nome" placeholder="Digite seu nome" />
      <Badge count={5} color="brand" />
    </div>
  );
}

export default App;
```

## Tree Shaking (otimização)

Para reduzir o tamanho do bundle, importe apenas os componentes que você usa:

```tsx
// ✅ Recomendado - importação específica
import { Button } from '@useblu/ocean-react/Button';
import { Input } from '@useblu/ocean-react/Input';

// ❌ Evite - importa toda a biblioteca
import { Button, Input } from '@useblu/ocean-react';
```

## Verificar instalação

Para verificar se tudo está funcionando, crie um componente simples:

```tsx
import React from 'react';
import { Button } from '@useblu/ocean-react';

function TestComponent() {
  return (
    <Button variant="primary" onClick={() => alert('Ocean funcionando!')}>
      Testar Ocean
    </Button>
  );
}

export default TestComponent;
```

## Problemas comuns

### Estilos não aparecem

Verifique se você importou o CSS:

```css
@import '@useblu/ocean-react/dist/ocean.css';
```

### Erro de módulo não encontrado

Certifique-se de que instalou o pacote:

```bash
npm install @useblu/ocean-react
```

### Problemas de tipagem TypeScript

As tipagens estão incluídas no pacote. Se houver problemas, reinicie o TypeScript server no seu editor.

## Suporte

- 📚 [Documentação dos componentes](/)
- 🎨 [Storybook interativo](https://ocean-ds.github.io/ocean-web)
- 🐛 [Reportar problemas](https://github.com/ocean-ds/ocean-web/issues)
- 📦 [NPM Package](https://www.npmjs.com/package/@useblu/ocean-react)
