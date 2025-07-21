---
title: Fundamentos
sidebar_label: Visão Geral
sidebar_position: 1
---

# Fundamentos do Design

Os fundamentos do Ocean Design System definem os elementos visuais e comportamentais básicos que garantem consistência e coesão em toda a experiência do usuário.

## Design Tokens

Design tokens são os valores fundamentais do sistema de design. Eles incluem cores, tipografia, espaçamento, sombras e outros elementos visuais que podem ser reutilizados em todos os componentes.

### [Cores](/foundations/colors)

Sistema de cores completo incluindo paleta primária, secundária, neutros e cores semânticas para diferentes estados e contextos.

### [Tipografia](/foundations/typography)

Hierarquia tipográfica com famílias de fontes, tamanhos, pesos e alturas de linha otimizadas para legibilidade e hierarquia visual.

### [Espaçamento](/foundations/spacing)

Sistema de espaçamento baseado em uma escala consistente para margens, paddings e layouts responsivos.

### [Breakpoints](/foundations/breakpoints)

Pontos de quebra para design responsivo que garantem experiências consistentes em diferentes tamanhos de tela.

### [Sombras](/foundations/shadows)

Sistema de elevação usando sombras para criar hierarquia visual e profundidade.

## Princípios de Design

### [Acessibilidade](/foundations/accessibility)

Diretrizes e práticas para criar interfaces inclusivas que funcionam para todos os usuários.

### [Usabilidade](/foundations/usability)

Princípios de usabilidade que orientam a criação de interfaces intuitivas e eficientes.

### [Princípios de Design](/foundations/design-principles)

Os princípios fundamentais que guiam todas as decisões de design no Ocean.

## Padrões de Interface

### [Padrões de Layout](/foundations/layout-patterns)

Estruturas de layout comuns e melhores práticas para organização de conteúdo.

### [Padrões de Interação](/foundations/interaction-patterns)

Comportamentos de interface consistentes para ações comuns do usuário.

### [Diretrizes de Conteúdo](/foundations/content-guidelines)

Melhores práticas para escrita de interface, tom de voz e estruturação de conteúdo.

## Uso dos Design Tokens

### Em componentes React

```tsx
import styled from 'styled-components';
import { getTokens } from '@useblu/ocean-react';

const StyledButton = styled.button`
  background-color: ${getTokens().colors.primary.main};
  color: ${getTokens().colors.primary.contrast};
  padding: ${getTokens().spacing.md};
  border-radius: ${getTokens().borderRadius.md};
  font-size: ${getTokens().typography.body.fontSize};
`;
```

### Em CSS customizado

```css
:root {
  --ocean-color-primary: #0066cc;
  --ocean-spacing-md: 16px;
  --ocean-border-radius-md: 8px;
}

.custom-element {
  background-color: var(--ocean-color-primary);
  padding: var(--ocean-spacing-md);
  border-radius: var(--ocean-border-radius-md);
}
```

### Com Sass/SCSS

```scss
@import '@useblu/ocean-core/src/utils/functions';

.custom-element {
  background-color: ocean-color('primary', 'main');
  padding: ocean-spacing('md');
  border-radius: ocean-border-radius('md');
}
```

## Personalização

O Ocean permite personalização através de temas customizados:

```tsx
import { OceanProvider } from '@useblu/ocean-react';

const customTheme = {
  colors: {
    primary: {
      main: '#ff6b35',
      light: '#ff8f65',
      dark: '#e55a2b',
      contrast: '#ffffff',
    },
  },
  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
};

function App() {
  return (
    <OceanProvider theme={customTheme}>{/* sua aplicação */}</OceanProvider>
  );
}
```

## Ferramentas e Recursos

### Figma

- [Ocean Design System - Figma Library](https://figma.com/ocean-design-system)
- Componentes sincronizados com o código
- Design tokens atualizados automaticamente

### Storybook

- [Ocean Storybook](https://ocean.useblu.com.br)
- Componentes interativos
- Documentação visual completa

### NPM Packages

- `@useblu/ocean-react` - Componentes React
- `@useblu/ocean-core` - Estilos base e tokens CSS

## Próximos passos

1. Explore os [design tokens específicos](/foundations/colors)
2. Entenda nossos [princípios de acessibilidade](/foundations/accessibility)
3. Veja os [padrões de layout](/foundations/layout-patterns) recomendados
4. Consulte as [diretrizes de conteúdo](/foundations/content-guidelines)

## Contribuindo

Os fundamentos do design evoluem com feedback da comunidade:

- [Discussões sobre design](https://github.com/useblu/ocean-web/discussions)
- [Issues de design](https://github.com/useblu/ocean-web/issues?label=design)
- [RFCs de mudanças](https://github.com/useblu/ocean-web/pulls?label=rfc)
