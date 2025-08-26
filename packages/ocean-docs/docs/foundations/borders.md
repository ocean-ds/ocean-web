---
title: Bordas
sidebar_label: Bordas
sidebar_position: 4
---

import BordersPalette from '@site/src/components/BordersPalette';

# Bordas

As bordas do Ocean Design System definem os raios de borda, larguras, opacidades e sombras que garantem consistência visual em toda a interface.

## Paleta de Bordas Interativa

<BordersPalette />

## Border Radius

Os raios de borda definem o arredondamento dos cantos dos elementos, criando uma hierarquia visual e melhorando a estética da interface.

### Tiny

- **Token:** `borderRadiusTiny`
- **Nome:** Tiny
- **Valor:** 4px
- **Uso:** Elementos pequenos, ícones, badges

### SM

- **Token:** `borderRadiusSm`
- **Nome:** SM
- **Valor:** 8px
- **Uso:** Botões pequenos, inputs, elementos compactos

### MD

- **Token:** `borderRadiusMd`
- **Nome:** MD
- **Valor:** 12px
- **Uso:** Botões padrão, cartões pequenos

### LG

- **Token:** `borderRadiusLg`
- **Nome:** LG
- **Valor:** 16px
- **Uso:** Cartões grandes, modais, containers

### Pill

- **Token:** `borderRadiusPill`
- **Nome:** Pill
- **Valor:** 56px
- **Uso:** Botões de ação, chips, elementos de navegação

### Circular

- **Token:** `borderRadiusCircular`
- **Nome:** Circular
- **Valor:** 50%
- **Uso:** Avatars, botões de ação circular, ícones

## Border Widths

As larguras de borda definem a espessura das bordas dos elementos, criando diferentes níveis de destaque visual.

### None

- **Token:** `borderWidthNone`
- **Nome:** None
- **Valor:** 0px
- **Uso:** Elementos sem borda, estados padrão

### Hairline

- **Token:** `borderWidthHairline`
- **Nome:** Hairline
- **Valor:** 1px
- **Uso:** Bordas sutis, divisores, estados hover

### Thin

- **Token:** `borderWidthThin`
- **Nome:** Thin
- **Valor:** 2px
- **Uso:** Bordas de destaque, elementos selecionados

## Opacity Levels

Os níveis de opacidade definem a transparência dos elementos, criando profundidade e hierarquia visual.

### Semi Opaque

- **Token:** `opacityLevelSemiopaque`
- **Nome:** Semi Opaque
- **Valor:** 80%
- **Uso:** Overlays, elementos de destaque

### Intense

- **Token:** `opacityLevelIntense`
- **Nome:** Intense
- **Valor:** 64%
- **Uso:** Elementos semi-transparentes, backgrounds

### Medium

- **Token:** `opacityLevelMedium`
- **Nome:** Medium
- **Valor:** 40%
- **Uso:** Estados desabilitados, elementos secundários

### Light

- **Token:** `opacityLevelLight`
- **Nome:** Light
- **Valor:** 16%
- **Uso:** Fundos sutis, elementos de fundo

### Semi Transparent

- **Token:** `opacityLevelSemitransparent`
- **Nome:** Semi Transparent
- **Valor:** 8%
- **Uso:** Elementos muito sutis, overlays leves

## Shadow Levels

Os níveis de sombra criam profundidade e elevação visual, definindo a hierarquia dos elementos na interface.

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

### Princípios de Bordas

1. **Hierarquia Visual:** Use diferentes raios para criar hierarquia
2. **Consistência:** Mantenha o uso consistente dos tokens
3. **Acessibilidade:** Considere o contraste adequado
4. **Performance:** Use sombras com moderação

### Exemplos de Aplicação

#### Botão Primário

```css
border-radius: ${borderRadiusMd};
border: ${borderWidthNone};
box-shadow: ${shadowLevel1};
```

#### Cartão de Conteúdo

```css
border-radius: ${borderRadiusLg};
border: ${borderWidthHairline} solid ${colorInterfaceLightDown};
box-shadow: ${shadowLevel2Bottom};
```

#### Input de Formulário

```css
border-radius: ${borderRadiusSm};
border: ${borderWidthHairline} solid ${colorInterfaceLightDown};
box-shadow: ${shadowLevel1};
```

#### Modal

```css
border-radius: ${borderRadiusLg};
border: ${borderWidthNone};
box-shadow: ${shadowLevel4};
```

#### Avatar Circular

```css
border-radius: ${borderRadiusCircular};
border: ${borderWidthThin} solid ${colorBrandPrimaryPure};
```

### Combinações Recomendadas

| Elemento        | Border Radius          | Border Width          | Shadow Level         |
| --------------- | ---------------------- | --------------------- | -------------------- |
| Botões Pequenos | `borderRadiusSm`       | `borderWidthNone`     | `shadowLevel1`       |
| Botões Padrão   | `borderRadiusMd`       | `borderWidthNone`     | `shadowLevel1`       |
| Botões Pill     | `borderRadiusPill`     | `borderWidthNone`     | `shadowLevel2Bottom` |
| Inputs          | `borderRadiusSm`       | `borderWidthHairline` | `shadowLevel1`       |
| Cartões         | `borderRadiusLg`       | `borderWidthHairline` | `shadowLevel2Bottom` |
| Modais          | `borderRadiusLg`       | `borderWidthNone`     | `shadowLevel4`       |
| Avatars         | `borderRadiusCircular` | `borderWidthThin`     | `shadowLevel1`       |
| Tooltips        | `borderRadiusMd`       | `borderWidthNone`     | `shadowLevel2Top`    |
