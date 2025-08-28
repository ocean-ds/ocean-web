---
title: Breakpoints
sidebar_label: Breakpoints
sidebar_position: 6
---

import BreakpointsPalette from '@site/src/components/BreakpointsPalette';

# Breakpoints

Os breakpoints definem os pontos de quebra responsivos do Ocean Design System, permitindo que os componentes se adaptem a diferentes tamanhos de tela.

## Visão Geral

O sistema de breakpoints utiliza uma abordagem mobile-first, definindo breakpoints mínimos para diferentes tamanhos de dispositivos. Cada breakpoint possui configurações específicas para container, colunas, margens e gutters.

<BreakpointsPalette />

## Especificações

### X-Small (320px+)

- **Container:** 100%
- **Colunas:** 4
- **Tamanho da Coluna:** Auto
- **Margem:** 16px
- **Gutter:** 16px

### Small (576px+)

- **Container:** 100%
- **Colunas:** 4
- **Tamanho da Coluna:** Auto
- **Margem:** 16px
- **Gutter:** 16px

### Medium (768px+)

- **Container:** 100%
- **Colunas:** 8
- **Tamanho da Coluna:** Auto
- **Margem:** 16px
- **Gutter:** 16px

### Large (992px+)

- **Container:** 100%
- **Colunas:** 8
- **Tamanho da Coluna:** Auto
- **Margem:** 16px
- **Gutter:** 16px

### X-Large (1200px+)

- **Container:** 1076px
- **Colunas:** 12
- **Tamanho da Coluna:** 75px
- **Margem:** Auto
- **Gutter:** 16px

### XX-Large (1400px+)

- **Container:** 1076px
- **Colunas:** 12
- **Tamanho da Coluna:** 75px
- **Margem:** Auto
- **Gutter:** 16px

## Uso e Aplicação

### CSS Custom Properties

```javascript
/* Breakpoints */
${breakpointTo('bpXSmall')} {
  /* X-Small styles */
}

${breakpointTo('bpSmall')} {
  /* Small styles */
}

${breakpointTo('bpMedium')} {
  /* Medium styles */
}

${breakpointTo('bpLarge')} {
  /* Large styles */
}

${breakpointTo('bpXLarge')} {
  /* X-Large styles */
}

${breakpointTo('bpXxLarge')} {
  /* XX-Large styles */
}
```

### Grid System

```javascript
.container {
  width: 100%;
  margin: 0 16px;
  padding: 0 16px;
}

${breakpointTo('bpXLarge')} {
  .container {
    max-width: 1076px;
    margin: 0 auto;
  }
}

.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);
}

${breakpointTo('bpMedium')} {
  .grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

${breakpointTo('bpXLarge')} {
  .grid {
    grid-template-columns: repeat(12, 75px);
    justify-content: center;
  }
}
```

## Combinações Recomendadas

| Breakpoint | Uso Recomendado              | Exemplo de Aplicação          |
| ---------- | ---------------------------- | ----------------------------- |
| X-Small    | Dispositivos móveis pequenos | Smartphones antigos           |
| Small      | Dispositivos móveis modernos | Smartphones atuais            |
| Medium     | Tablets pequenos             | Tablets em modo retrato       |
| Large      | Tablets grandes              | Tablets em modo paisagem      |
| X-Large    | Desktops pequenos            | Laptops e monitores pequenos  |
| XX-Large   | Desktops grandes             | Monitores grandes e ultrawide |

## Boas Práticas

1. **Mobile-First:** Sempre comece desenvolvendo para dispositivos móveis e depois adicione breakpoints para telas maiores.

2. **Conteúdo Responsivo:** Garanta que o conteúdo seja legível e acessível em todos os breakpoints.

3. **Performance:** Evite carregar recursos desnecessários em dispositivos móveis.

4. **Teste:** Sempre teste em dispositivos reais, não apenas no navegador.

5. **Consistência:** Mantenha a consistência visual entre os diferentes breakpoints.
