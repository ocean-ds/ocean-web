---
slug: /
title: Ocean Design System
sidebar_label: Visão Geral
sidebar_position: 1
---

# Componentes Ocean

O Ocean Design System fornece uma biblioteca abrangente de componentes React reutilizáveis, totalmente tipados e acessíveis.

## Filosofia dos componentes

Nossos componentes são construídos seguindo os princípios:

- **TypeScript nativo** - Tipagem completa para melhor experiência de desenvolvimento
- **Composição sobre configuração** - Componentes flexíveis que se combinam bem
- **Design consistente** - Todos os componentes seguem o mesmo sistema de design
- **Performance** - Otimizados para renderização eficiente

## Categorias de componentes

### 🔤 Inputs

Componentes para entrada de dados do usuário:

- [Input](/components/input) - Campo de texto básico
- [TextArea](/components/textarea) - Campo de texto multilinha
- [Checkbox](/components/checkbox) - Seleção múltipla
- [Radio](/components/radio) - Seleção única
- [Select](/components/select) - Lista de opções
- [Switch](/components/switch) - Alternar estado
- [Search](/components/search) - Campo de busca
- [TokenInput](/components/token-input) - Input com tokens

### 🧭 Navigation

Componentes para navegação:

- [Button](/components/button) - Botões de ação
- [Link](/components/link) - Links e navegação
- [Breadcrumb](/components/breadcrumb) - Navegação hierárquica
- [Pagination](/components/pagination) - Paginação de conteúdo
- [Steps](/components/steps) - Passos de processo
- [TopBar](/components/top-bar) - Barra superior

### 📊 Data Display

Componentes para exibição de dados:

- [Badge](/components/badge) - Indicadores pequenos
- [Tag](/components/tag) - Etiquetas e categorias
- [List](/components/list) - Listas estruturadas
- [CardGroup](/components/card-group) - Agrupamento de cards
- [CardListItem](/components/card-list-item) - Item de lista em card
- [Carousel](/components/carousel) - Carrossel de conteúdo
- [Chart](/components/chart) - Gráficos e visualizações
- [Progress](/components/progress) - Barras de progresso

### 💬 Feedback

Componentes para feedback do usuário:

- [Alert](/components/alert) - Mensagens de alerta
- [Snackbar](/components/snackbar) - Notificações temporárias
- [Tooltip](/components/tooltip) - Dicas contextuais
- [Modal](/components/modal) - Diálogos modais
- [Drawer](/components/drawer) - Painéis laterais

### 📐 Layout

Componentes para estruturação:

- [Container](/components/container) - Container responsivo
- [Grid](/components/grid) - Sistema de grid flexível
- [Divider](/components/divider) - Separadores visuais
- [Accordion](/components/accordion) - Conteúdo expansível
- [SubHeader](/components/sub-header) - Cabeçalhos de seção

### ✏️ Typography

Componentes tipográficos:

- [Typography](/components/typography) - Texto estilizado
- [FormLabel](/components/form-label) - Rótulos de formulário

### 🛠️ Utilities

Componentes utilitários:

- [Shortcut](/components/shortcut) - Atalhos de teclado
- [Chips](/components/chips) - Chips selecionáveis
- [IconButton](/components/icon-button) - Botões com ícone
- [WebNotification](/components/web-notification) - Notificações do navegador

## Padrões de uso

### Importação

```tsx
// Importação individual (recomendado)
import { Button } from '@useblu/ocean-react';

// Ou importação específica para melhor tree-shaking
import { Button } from '@useblu/ocean-react/Button';
```

### Props padrão

Todos os componentes Ocean compartilham algumas props comuns:

```tsx
interface CommonProps {
  className?: string;
  'data-testid'?: string;
  id?: string;
}
```

## Contribuindo

Encontrou um bug ou tem uma sugestão de melhoria?

- [Abra uma issue](https://github.com/ocean-ds/ocean-web/issues)
- [Veja o guia de contribuição](/development/contributing)
- [Consulte nosso Storybook](https://ocean-ds.github.io/ocean-web) para exemplos interativos

## Próximos passos

- Explore um componente específico na sidebar
- Consulte os [fundamentos](/foundations/intro) para entender o sistema de design
- Veja o [guia de desenvolvimento](/guides/installation) para contribuir
