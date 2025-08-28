---
title: Shadows
---

import BordersPalette from '@site/src/components/BordersPalette';

# Shadows

Os níveis de sombra criam profundidade e elevação visual, definindo a hierarquia dos elementos na interface.

<BordersPalette section="shadowLevels" />

## Especificações

### Level 1

- **Token:** `shadowLevel1`
- **Nome:** Level 1
- **Propriedades:**
  - **Blur (B):** 8px
  - **X-offset (X):** 0px
  - **Y-offset (Y):** 4px
- **Uso:** Elementos elevados levemente, cartões pequenos

### Level 2 Bottom

- **Token:** `shadowLevel2Bottom`
- **Nome:** Level 2 Bottom
- **Propriedades:**
  - **Blur (B):** 16px
  - **X-offset (X):** 0px
  - **Y-offset (Y):** 8px
- **Uso:** Elementos com elevação média, botões, inputs

### Level 2 Top

- **Token:** `shadowLevel2Top`
- **Nome:** Level 2 Top
- **Propriedades:**
  - **Blur (B):** 16px
  - **X-offset (X):** 0px
  - **Y-offset (Y):** -8px
- **Uso:** Elementos elevados para cima, tooltips, dropdowns

### Level 3

- **Token:** `shadowLevel3`
- **Nome:** Level 3
- **Propriedades:**
  - **Blur (B):** 32px
  - **X-offset (X):** 0px
  - **Y-offset (Y):** 16px
- **Uso:** Elementos com alta elevação, modais, drawers

### Level 4

- **Token:** `shadowLevel4`
- **Nome:** Level 4
- **Propriedades:**
  - **Blur (B):** 48px
  - **X-offset (X):** 0px
  - **Y-offset (Y):** 16px
- **Uso:** Elementos com máxima elevação, popups, overlays

## Uso e Aplicação

### Exemplos de Aplicação

#### Cartão Pequeno

```css
box-shadow: ${shadowLevel1};
```

#### Botão Elevado

```css
box-shadow: ${shadowLevel2Bottom};
```

#### Tooltip

```css
box-shadow: ${shadowLevel2Top};
```

#### Modal

```css
box-shadow: ${shadowLevel4};
```

#### Drawer

```css
box-shadow: ${shadowLevel3};
```

#### Card Elevado

```css
box-shadow: ${shadowLevel2Bottom};
```

#### Overlay

```css
box-shadow: ${shadowLevel4};
```

### Combinações Recomendadas

| Elemento         | Shadow Level         | Uso Recomendado           |
| ---------------- | -------------------- | ------------------------- |
| Cartões Pequenos | `shadowLevel1`       | Cards de conteúdo, badges |
| Botões           | `shadowLevel2Bottom` | Botões principais, CTAs   |
| Inputs           | `shadowLevel1`       | Campos de formulário      |
| Tooltips         | `shadowLevel2Top`    | Tooltips, dropdowns       |
| Modais           | `shadowLevel4`       | Modais, popups            |
| Drawers          | `shadowLevel3`       | Drawers, sidebars         |
| Cards Elevados   | `shadowLevel2Bottom` | Cards de destaque         |
| Overlays         | `shadowLevel4`       | Overlays, backdrops       |
| Estados Hover    | `shadowLevel2Bottom` | Efeitos de hover          |
| Estados Focus    | `shadowLevel1`       | Elementos em foco         |
