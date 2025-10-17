---
title: Tipografia
sidebar_label: Tipografia
sidebar_position: 3
---

import TypographyPalette from '@site/src/components/TypographyPalette';

# Tipografia

A tipografia do Ocean Design System define como o texto é apresentado, garantindo legibilidade, hierarquia visual e consistência em toda a experiência do usuário.

## Paleta de Tipografia Interativa

<TypographyPalette />

## Família de Fonte

### Fonte Base

- **Token:** `fontFamilyBase`
- **Nome:** Aa - Base
- **Fonte:** Nunito Sans
- **Uso:** Fonte principal para todo o conteúdo textual da aplicação

## Tamanhos de Fonte

### Tamanhos Grandes (Display e Títulos)

#### Giant

- **Token:** `fontSizeGiant`
- **Nome:** Giant
- **Tamanho:** 96px
- **Uso:** Títulos principais, hero sections

#### Display

- **Token:** `fontSizeDisplay`
- **Nome:** Display
- **Tamanho:** 80px
- **Uso:** Títulos de destaque, landing pages

#### XXXL

- **Token:** `fontSizeXxxl`
- **Nome:** XXXL
- **Tamanho:** 64px
- **Uso:** Títulos de seção grandes

#### XXL

- **Token:** `fontSizeXx1`
- **Nome:** XXL
- **Tamanho:** 48px
- **Uso:** Títulos de seção

#### XL

- **Token:** `fontSizeXl`
- **Nome:** XL
- **Tamanho:** 40px
- **Uso:** Subtítulos grandes

### Tamanhos Médios (Conteúdo Principal)

#### LG

- **Token:** `fontSizeLg`
- **Nome:** LG
- **Tamanho:** 32px
- **Uso:** Títulos de conteúdo, headings

#### MD

- **Token:** `fontSizeMd`
- **Nome:** MD
- **Tamanho:** 24px
- **Uso:** Texto de destaque, subtítulos

#### SM

- **Token:** `fontSizeSm`
- **Nome:** SM
- **Tamanho:** 20px
- **Uso:** Texto de corpo principal

### Tamanhos Pequenos (Detalhes e Auxiliares)

#### XS

- **Token:** `fontSizeXs`
- **Nome:** XS
- **Tamanho:** 16px
- **Uso:** Texto de corpo secundário

#### XXS

- **Token:** `fontSizeXxs`
- **Nome:** XXS
- **Tamanho:** 14px
- **Uso:** Texto pequeno, captions

#### XXXS

- **Token:** `fontSizeXxxs`
- **Nome:** XXXS
- **Tamanho:** 12px
- **Uso:** Texto muito pequeno, labels

## Pesos de Fonte

### Extra Bold

- **Token:** `fontWeightExtraBold`
- **Nome:** Extra Bold
- **Valor:** 800
- **Uso:** Títulos principais, elementos de destaque máximo

### Bold

- **Token:** `fontWeightBold`
- **Nome:** Bold
- **Valor:** 700
- **Uso:** Títulos, elementos de destaque

### Medium

- **Token:** `fontWeightMedium`
- **Nome:** Medium
- **Valor:** 600
- **Uso:** Subtítulos, elementos semi-destacados

### Regular

- **Token:** `fontWeightRegular`
- **Nome:** Regular
- **Valor:** 400
- **Uso:** Texto de corpo, conteúdo principal

### Light

- **Token:** `fontWeightLight`
- **Nome:** Light
- **Valor:** 300
- **Uso:** Texto secundário, elementos sutis

## Alturas de Linha

### Tight (Apertado)

- **Token:** `lineHeightTight`
- **Nome:** Tight
- **Valor:** 100%
- **Uso:** Títulos, elementos compactos

### Medium (Médio)

- **Token:** `lineHeightMedium`
- **Nome:** Medium
- **Valor:** 124%
- **Uso:** Texto de corpo padrão

### Loose (Solto)

- **Token:** `lineHeightLoose`
- **Nome:** Loose
- **Valor:** 132%
- **Uso:** Texto de leitura confortável

### Comfy (Confortável)

- **Token:** `lineHeightComfy`
- **Nome:** Comfy
- **Valor:** 150%
- **Uso:** Texto longo, parágrafos

## Uso e Aplicação

### Princípios de Tipografia

1. **Hierarquia Visual:** Use tamanhos e pesos para criar hierarquia clara
2. **Legibilidade:** Sempre priorize a legibilidade sobre o design
3. **Consistência:** Mantenha o uso consistente dos tokens em toda a aplicação
4. **Acessibilidade:** Considere o contraste e tamanhos mínimos para leitura

### Exemplos de Aplicação

#### Títulos Principais

```css
font-family: ${fontFamilyBase};
font-size: ${fontSizeGiant};
font-weight: ${fontWeightExtraBold};
line-height: ${lineHeightTight};
```

#### Texto de Corpo

```css
font-family: ${fontFamilyBase};
font-size: ${fontSizeSm};
font-weight: ${fontWeightRegular};
line-height: ${lineHeightMedium};
```

#### Texto de Destaque

```css
font-family: ${fontFamilyBase};
font-size: ${fontSizeMd};
font-weight: ${fontWeightBold};
line-height: ${lineHeightLoose};
```

### Combinações Recomendadas

| Uso              | Tamanho | Peso       | Altura de Linha |
| ---------------- | ------- | ---------- | --------------- |
| Títulos Hero     | Giant   | Extra Bold | Tight           |
| Títulos de Seção | XXL     | Bold       | Tight           |
| Subtítulos       | XL      | Medium     | Medium          |
| Texto Principal  | SM      | Regular    | Medium          |
| Texto Secundário | XS      | Light      | Loose           |
| Captions         | XXS     | Regular    | Comfy           |
| Labels           | XXXS    | Medium     | Tight           |
