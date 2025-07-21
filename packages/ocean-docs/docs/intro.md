---
slug: /
title: Ocean Design System
sidebar_label: Introdução
sidebar_position: 1
---

# Ocean Design System

Bem-vindo ao **Ocean Design System** - um sistema de design abrangente para aplicações web modernas.

## O que é o Ocean?

O Ocean é um sistema de design que fornece componentes reutilizáveis, diretrizes de design e ferramentas para criar interfaces de usuário consistentes e acessíveis. Ele é construído com React, TypeScript e styled-components.

## Principais características

- 🎨 **Componentes prontos** - Mais de 40 componentes React totalmente customizáveis
- 🎯 **TypeScript** - Totalmente tipado para melhor experiência de desenvolvimento
- 🎪 **Styled Components** - Estilização dinâmica e temas personalizáveis
- ♿ **Acessibilidade** - Componentes seguem as diretrizes WCAG 2.1
- 📱 **Responsivo** - Design mobile-first com breakpoints consistentes
- 🧪 **Testado** - Cobertura de testes abrangente

## Começando rapidamente

### Instalação

```bash
# Usando npm
npm install @useblu/ocean-react @useblu/ocean-core

# Usando yarn
yarn add @useblu/ocean-react @useblu/ocean-core
```

### Uso básico

```tsx
import React from 'react';
import { Button, OceanProvider } from '@useblu/ocean-react';

function App() {
  return (
    <OceanProvider>
      <Button variant="primary">Meu primeiro botão Ocean</Button>
    </OceanProvider>
  );
}
```

## Estrutura da documentação

- **[Componentes](/components)** - Documentação completa de todos os componentes
- **[Fundamentos](/foundations)** - Design tokens, cores, tipografia e princípios
- **[Guias](/installation)** - Guias de instalação e desenvolvimento

## Contribuindo

O Ocean é um projeto open source. Contribuições são sempre bem-vindas!

- [GitHub Repository](https://github.com/useblu/ocean-web)
- [Issues](https://github.com/useblu/ocean-web/issues)
- [Storybook](https://ocean.useblu.com.br)

---

Pronto para começar? Confira nosso [guia de instalação](/installation) ou explore nossos [componentes](/components).
