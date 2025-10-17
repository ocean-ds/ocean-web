---
title: Bordas
---

import BordersPalette from '@site/src/components/BordersPalette';

# Bordas

As bordas do Ocean Design System definem os raios de borda, larguras, opacidades e sombras que garantem consistência visual em toda a interface.

## Paleta de Bordas Interativa

<BordersPalette section="border" />

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
