---
title: Espaçamentos
---

import SpacingPalette from '@site/src/components/SpacingPalette';

# Espaçamentos

Os espaçamentos do Ocean Design System definem as distâncias e margens entre elementos, garantindo consistência visual e hierarquia adequada em toda a interface.

## Paleta de Espaçamentos Interativa

<SpacingPalette />

## Spacing Stack

Os espaçamentos stack definem as distâncias verticais entre elementos empilhados, criando hierarquia e respiração visual.

### XXXS

- **Token:** `spacingStackXxxs`
- **Nome:** XXXS
- **Valor:** 4px
- **Uso:** Espaçamento mínimo entre elementos muito próximos

### XXS

- **Token:** `spacingStackXxs`
- **Nome:** XXS
- **Valor:** 8px
- **Uso:** Espaçamento pequeno entre elementos compactos

### XXS Extra

- **Token:** `spacingStackXxsExtra`
- **Nome:** XXS Extra
- **Valor:** 12px
- **Uso:** Espaçamento intermediário entre elementos pequenos

### XS

- **Token:** `spacingStackXs`
- **Nome:** XS
- **Valor:** 16px
- **Uso:** Espaçamento padrão entre elementos de conteúdo

### SM

- **Token:** `spacingStackSm`
- **Nome:** SM
- **Valor:** 24px
- **Uso:** Espaçamento entre seções pequenas

### MD

- **Token:** `spacingStackMd`
- **Nome:** MD
- **Valor:** 32px
- **Uso:** Espaçamento padrão entre seções principais

### LG

- **Token:** `spacingStackLg`
- **Nome:** LG
- **Valor:** 40px
- **Uso:** Espaçamento entre seções grandes

### XL

- **Token:** `spacingStackXl`
- **Nome:** XL
- **Valor:** 48px
- **Uso:** Espaçamento entre componentes principais

### XXL

- **Token:** `spacingStackXxl`
- **Nome:** XXL
- **Valor:** 64px
- **Uso:** Espaçamento entre seções muito grandes

### XXXL

- **Token:** `spacingStackXxxl`
- **Nome:** XXXL
- **Valor:** 80px
- **Uso:** Espaçamento máximo entre seções principais

## Spacing Inset

Os espaçamentos inset definem o preenchimento interno dos elementos, criando espaço de respiração dentro dos containers.

### XXS

- **Token:** `spacingInsetXxs`
- **Nome:** XXS
- **Valor:** 4px
- **Uso:** Preenchimento mínimo para elementos muito compactos

### XS

- **Token:** `spacingInsetXs`
- **Nome:** XS
- **Valor:** 8px
- **Uso:** Preenchimento pequeno para elementos compactos

### SM

- **Token:** `spacingInsetSm`
- **Nome:** SM
- **Valor:** 16px
- **Uso:** Preenchimento padrão para elementos de conteúdo

### MD

- **Token:** `spacingInsetMd`
- **Nome:** MD
- **Valor:** 24px
- **Uso:** Preenchimento confortável para cartões e containers

### LG

- **Token:** `spacingInsetLg`
- **Nome:** LG
- **Valor:** 32px
- **Uso:** Preenchimento generoso para seções importantes

### XL

- **Token:** `spacingInsetXl`
- **Nome:** XL
- **Valor:** 40px
- **Uso:** Preenchimento máximo para containers principais

## Spacing Squish

Os espaçamentos squish definem preenchimentos assimétricos, com mais espaço horizontal que vertical, ideal para elementos que precisam de mais largura.

### XS

- **Token:** `spacingSquishXs`
- **Nome:** XS
- **Valor:** 4px 8px
- **Uso:** Preenchimento compacto para botões pequenos

### SM

- **Token:** `spacingSquishSm`
- **Nome:** SM
- **Valor:** 8px 16px
- **Uso:** Preenchimento padrão para botões e inputs

### MD

- **Token:** `spacingSquishMd`
- **Nome:** MD
- **Valor:** 16px 24px
- **Uso:** Preenchimento confortável para elementos interativos

### LG

- **Token:** `spacingSquishLg`
- **Nome:** LG
- **Valor:** 16px 32px
- **Uso:** Preenchimento generoso para CTAs e botões grandes

## Uso e Aplicação

### Princípios de Espaçamento

1. **Consistência:** Use os tokens de forma consistente em toda a aplicação
2. **Hierarquia:** Use espaçamentos maiores para elementos mais importantes
3. **Respiração:** Permita espaço adequado para os elementos "respirarem"
4. **Escalabilidade:** Use a escala de forma progressiva

### Exemplos de Aplicação

#### Layout de Seção

```css
margin-bottom: ${spacingStackMd};
padding: ${spacingInsetMd};
```

#### Botão Primário

```css
padding: ${spacingSquishMd};
margin-right: ${spacingStackSm};
```

#### Card de Conteúdo

```css
padding: ${spacingInsetLg};
margin-bottom: ${spacingStackLg};
```

#### Lista de Itens

```css
gap: ${spacingStackSm};
padding: ${spacingInsetSm};
```

#### Container Principal

```css
padding: ${spacingInsetXl};
margin: ${spacingStackXxl} auto;
```

#### Formulário

```css
gap: ${spacingStackMd};
padding: ${spacingInsetLg};
```

### Combinações Recomendadas

| Elemento          | Stack             | Inset            | Squish            |
| ----------------- | ----------------- | ---------------- | ----------------- |
| Seções Principais | `spacingStackXxl` | `spacingInsetLg` | -                 |
| Cartões           | `spacingStackLg`  | `spacingInsetMd` | -                 |
| Botões            | `spacingStackSm`  | -                | `spacingSquishMd` |
| Inputs            | `spacingStackSm`  | `spacingInsetSm` | -                 |
| Listas            | `spacingStackSm`  | `spacingInsetSm` | -                 |
| Modais            | `spacingStackXxl` | `spacingInsetXl` | -                 |
| Headers           | `spacingStackMd`  | `spacingInsetMd` | -                 |
| Footers           | `spacingStackLg`  | `spacingInsetLg` | -                 |
