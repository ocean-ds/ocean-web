---
title: Opacity
---

import BordersPalette from '@site/src/components/BordersPalette';

# Opacity

Os níveis de opacidade definem a transparência dos elementos, criando profundidade e hierarquia visual.

<BordersPalette section="opacityLevels" />

## Especificações

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

## Uso e Aplicação

### Exemplos de Aplicação

#### Overlay de Modal

```css
background-color: rgba(0, 0, 0, ${opacityLevelSemiopaque});
```

#### Elemento Desabilitado

```css
opacity: ${opacityLevelMedium};
```

#### Background Sutil

```css
background-color: rgba(0, 123, 255, ${opacityLevelLight});
```

#### Overlay Leve

```css
background-color: rgba(0, 0, 0, ${opacityLevelSemitransparent});
```

#### Elemento Semi-transparente

```css
opacity: ${opacityLevelIntense};
```

#### Estado Hover

```css
opacity: ${opacityLevelSemiopaque};
```

### Combinações Recomendadas

| Elemento              | Opacity Level                 | Uso Recomendado            |
| --------------------- | ----------------------------- | -------------------------- |
| Overlays              | `opacityLevelSemiopaque`      | Modais, popups             |
| Estados Desabilitados | `opacityLevelMedium`          | Botões, inputs inativos    |
| Backgrounds Sutis     | `opacityLevelLight`           | Fundos de seção            |
| Overlays Leves        | `opacityLevelSemitransparent` | Tooltips, dropdowns        |
| Elementos Secundários | `opacityLevelIntense`         | Ícones, textos secundários |
| Estados Hover         | `opacityLevelSemiopaque`      | Efeitos de hover           |
| Estados Focus         | `opacityLevelMedium`          | Elementos em foco          |
