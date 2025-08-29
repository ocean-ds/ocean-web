---
title: Grid
sidebar_label: Grid
sidebar_position: 7
---

import GridPalette from '@site/src/components/GridPalette';

# Grid

O sistema de Grid do Ocean Design System fornece uma estrutura flexível e responsiva para organizar o conteúdo em layouts consistentes e acessíveis.

## Visão Geral

O grid system utiliza CSS Grid para criar layouts responsivos que se adaptam automaticamente aos diferentes breakpoints. O sistema é baseado em 4, 8 e 12 colunas, dependendo do tamanho da tela, proporcionando máxima flexibilidade para diferentes tipos de conteúdo.

<GridPalette />

## Especificações

### Breakpoints e Colunas

| Breakpoint         | Colunas | Tamanho da Coluna | Container | Gap  |
| ------------------ | ------- | ----------------- | --------- | ---- |
| X-Small (320px+)   | 4       | Auto              | 100%      | 16px |
| Small (576px+)     | 4       | Auto              | 100%      | 16px |
| Medium (768px+)    | 8       | Auto              | 100%      | 16px |
| Large (992px+)     | 8       | Auto              | 100%      | 16px |
| X-Large (1200px+)  | 12      | 75px              | 1076px    | 16px |
| XX-Large (1400px+) | 12      | 75px              | 1076px    | 16px |

### Propriedades do Grid

- **Container:** Define a largura máxima do container
- **Colunas:** Número de colunas disponíveis no grid
- **Tamanho da Coluna:** Largura fixa ou automática das colunas
- **Gap:** Espaçamento entre colunas e linhas
- **Margem:** Espaçamento externo do container

## Uso e Aplicação

### Grid Básico

```javascript
.grid-container {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);
}

${breakpointTo('bpMedium')} {
  .grid-container {
    grid-template-columns: repeat(8, 1fr);
  }
}

${breakpointTo('bpXLarge')} {
  .grid-container {
    grid-template-columns: repeat(12, 75px);
    justify-content: center;
  }
}
```

### Grid com Span

```javascript
.grid-item {
  background: #007bff;
  padding: 1rem;
  border-radius: 8px;
  color: white;
}

.grid-item-wide {
  grid-column: span 2;
}

.grid-item-extra-wide {
  grid-column: span 6;
}

${breakpointTo('bpXLarge')} {
  .grid-item-wide {
    grid-column: span 3;
  }

  .grid-item-extra-wide {
    grid-column: span 8;
  }
}
```

### Grid Responsivo com Classes Utilitárias

```javascript
.grid-responsive {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-fixed {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, 1fr);
}

.grid-auto-fit {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

### Layout de Página Completo

```javascript
.page-layout {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "sidebar"
    "main"
    "footer";
}

${breakpointTo('bpMedium')} {
  .page-layout {
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
  }
}

${breakpointTo('bpXLarge')} {
  .page-layout {
    grid-template-columns: 300px 1fr 300px;
    grid-template-areas:
      "header header header"
      "sidebar main aside"
      "footer footer footer";
  }
}
```

## Combinações Recomendadas

### Layouts Comuns

| Tipo de Layout     | Colunas    | Uso Recomendado                  |
| ------------------ | ---------- | -------------------------------- |
| **Card Grid**      | 4 → 8 → 12 | Galerias de produtos, portfólios |
| **Sidebar Layout** | 1 → 2 → 3  | Páginas com navegação lateral    |
| **Form Layout**    | 1 → 2      | Formulários responsivos          |
| **Dashboard**      | 4 → 8 → 12 | Painéis de controle, métricas    |
| **Hero Section**   | 1 → 2      | Seções de destaque               |
| **Footer**         | 4 → 6 → 12 | Rodapés com múltiplas colunas    |

### Padrões de Span

| Span        | Uso                     | Exemplo                      |
| ----------- | ----------------------- | ---------------------------- |
| **span 1**  | Elementos pequenos      | Ícones, badges               |
| **span 2**  | Elementos médios        | Cards, botões                |
| **span 3**  | Elementos grandes       | Imagens, vídeos              |
| **span 4**  | Elementos extra grandes | Hero sections                |
| **span 6**  | Metade da largura       | Sidebars, conteúdo principal |
| **span 12** | Largura total           | Headers, footers             |

## Boas Práticas

### 1. **Use Gap Consistente**

Mantenha o gap de 16px em todos os grids para consistência visual.

```javascript
.grid {
  gap: 16px; /* ✅ Consistente */
}

.grid-alternative {
  gap: 8px; /* ❌ Inconsistente */
}
```

### 2. **Evite Grids Aninhados Complexos**

Mantenha a estrutura do grid simples e legível.

```javascript
/* ❌ Evite */
.grid-complex {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.grid-complex > div {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.grid-complex > div > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

/* ✅ Prefira */
.grid-simple {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

### 3. **Use Grid Areas para Layouts Complexos**

Para layouts com múltiplas seções, use grid-template-areas.

```javascript
.layout {
  display: grid;
  grid-template-areas:
    "header"
    "nav"
    "main"
    "sidebar"
    "footer";
}

${breakpointTo('bpMedium')} {
  .layout {
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "header header"
      "nav main"
      "sidebar main"
      "footer footer";
  }
}
```

### 4. **Teste em Diferentes Dispositivos**

Sempre teste o grid em dispositivos reais para garantir que funcione corretamente.

## Exemplos Práticos

### Card Grid Responsivo

```javascript
.card-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding: 16px;
}

.card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Form Layout

```javascript
.form-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

${breakpointTo('bpMedium')} {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-field-full {
    grid-column: span 2;
  }
}
```

### Dashboard Layout

```javascript
.dashboard {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "stats stats"
    "chart chart"
    "table table";
}

${breakpointTo('bpMedium')} {
  .dashboard {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "stats stats stats stats"
      "chart chart chart chart"
      "table table table table";
  }
}

${breakpointTo('bpXLarge')} {
  .dashboard {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "stats stats stats stats stats stats stats stats stats stats stats stats"
      "chart chart chart chart chart chart chart chart chart chart chart chart"
      "table table table table table table table table table table table table";
  }
}
```

## Considerações de Acessibilidade

1. **Ordem de Tabulação:** O grid não afeta a ordem de tabulação natural dos elementos
2. **Zoom:** O grid se adapta bem ao zoom do usuário
3. **Screen Readers:** Use landmarks e headings apropriados dentro do grid
4. **Contraste:** Mantenha contraste adequado entre elementos do grid

## Performance

1. **Evite Grids Muito Grandes:** Limite o número de elementos em um grid
2. **Use CSS Grid Nativo:** Evite bibliotecas JavaScript desnecessárias
3. **Otimize Imagens:** Use imagens responsivas dentro do grid
4. **Lazy Loading:** Considere lazy loading para grids com muitos elementos
