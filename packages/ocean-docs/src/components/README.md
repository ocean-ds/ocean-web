# Componentes Customizados da Documentação

Este diretório contém componentes React customizados para uso específico na documentação do Ocean Design System.

## StorybookEmbed

Componente para embeber stories do Storybook como iframes interativos na documentação.

### Uso rápido

```tsx
import StorybookEmbed from '@site/src/components/StorybookEmbed';

<StorybookEmbed storyId="components-button--usage" />;
```

### Props

- `storyId`: ID da story (obrigatório)
- `height`: Altura em pixels (padrão: 400)
- `showToolbar`: Mostrar toolbar do Storybook (padrão: true)
- `viewMode`: 'story' ou 'docs' (padrão: 'story')
- `title`: Título para acessibilidade

### Exemplos

```tsx
// Playground completo
<StorybookEmbed
  storyId="components-button--usage"
  height={500}
/>

// Canvas limpo
<StorybookEmbed
  storyId="components-button--usage"
  showToolbar={false}
  height={300}
/>
```

## Adicionando novos componentes

1. Crie o arquivo `.tsx` neste diretório
2. Adicione estilos CSS correspondentes (se necessário)
3. Documente o uso no arquivo apropriado em `/docs/`
4. Exporte o componente se for para uso em múltiplas páginas
