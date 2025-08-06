---
title: Início Rápido
sidebar_label: Início Rápido
sidebar_position: 3
---

# Início Rápido

Comece a usar o Ocean Design System em 5 minutos.

## 1. Instalação

```bash
npm install @useblu/ocean-react
```

## 2. Importar estilos

No seu arquivo principal CSS (ex: `src/index.css`):

```css
@import '@useblu/ocean-react/dist/ocean.css';
```

## 3. Usar componentes

```tsx
import React from 'react';
import { Button, Input, Badge } from '@useblu/ocean-react';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Minha primeira página Ocean</h1>

      <Input label="Nome" placeholder="Digite seu nome" />

      <Button variant="primary" style={{ marginTop: '16px' }}>
        Salvar
      </Button>

      <Badge count={3} color="brand" />
    </div>
  );
}

export default App;
```

## Exemplos práticos

### Formulário de contato

```tsx
import React, { useState } from 'react';
import { Input, Button, Alert } from '@useblu/ocean-react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Alert type="success">
        Obrigado, {name}! Mensagem enviada com sucesso.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <Input
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Seu nome completo"
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        style={{ marginTop: '16px' }}
        required
      />

      <Button type="submit" variant="primary" style={{ marginTop: '16px' }}>
        Enviar mensagem
      </Button>
    </form>
  );
}
```

### Lista com badges

```tsx
import React from 'react';
import { Badge } from '@useblu/ocean-react';

const tasks = [
  { id: 1, title: 'Tarefa 1', status: 'pending', count: 3 },
  { id: 2, title: 'Tarefa 2', status: 'completed', count: 1 },
  { id: 3, title: 'Tarefa 3', status: 'urgent', count: 5 },
];

function TaskList() {
  return (
    <div>
      <h2>Minhas Tarefas</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
          }}
        >
          <span>{task.title}</span>
          <Badge
            count={task.count}
            color={task.status === 'urgent' ? 'alert' : 'brand'}
          />
        </div>
      ))}
    </div>
  );
}
```

### Navegação com breadcrumb

```tsx
import React from 'react';
import { Breadcrumb } from '@useblu/ocean-react';

function ProductPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          <a href="/" rel="noopener noreferrer">
            Home
          </a>,
          <a href="/produtos" rel="noopener noreferrer">
            Produtos
          </a>,
          <a href="/produtos/eletronicos" rel="noopener noreferrer">
            Eletrônicos
          </a>,
          'Smartphone',
        ]}
      />

      <h1 style={{ marginTop: '16px' }}>Smartphone XYZ</h1>

      <p>Detalhes do produto...</p>
    </div>
  );
}
```

## Ícones

Instale os ícones separadamente:

```bash
npm install @useblu/ocean-icons-react
```

Use os ícones:

```tsx
import React from 'react';
import { Star, Heart, ShoppingCart } from '@useblu/ocean-icons-react';
import { Button } from '@useblu/ocean-react';

function ProductCard() {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
      }}
    >
      <h3>Produto Incrível</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Star size={16} />
        <Star size={16} />
        <Star size={16} />
        <Star size={16} />
        <Star size={16} />
        <span style={{ marginLeft: '8px' }}>5.0</span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px',
        }}
      >
        <Button variant="primary">
          <ShoppingCart size={16} style={{ marginRight: '8px' }} />
          Comprar
        </Button>

        <Button variant="secondary">
          <Heart size={16} />
        </Button>
      </div>
    </div>
  );
}
```

## Design Tokens

Para usar tokens de design diretamente:

```bash
npm install @useblu/ocean-tokens
```

```tsx
import styled from 'styled-components';
import {
  colorInterfaceLightPure,
  fontSizeLg,
  spacingMd,
  borderRadiusMd,
} from '@useblu/ocean-tokens';

const CustomCard = styled.div`
  background: ${colorInterfaceLightPure};
  font-size: ${fontSizeLg};
  padding: ${spacingMd};
  border-radius: ${borderRadiusMd};
`;
```

## Próximos passos

### Explore os componentes

- 📖 [Navegue pelos componentes](/components)
- 🎨 [Experimente no Storybook](https://ocean-ds.github.io/ocean-web)

### Recursos avançados

- [Design Tokens](https://github.com/ocean-ds/ocean-tokens) - Sistema de tokens de design
- [Ícones](https://github.com/ocean-ds/ocean-icons) - Biblioteca de ícones SVG
- [CSS Framework](https://github.com/ocean-ds/ocean-web/tree/master/packages/ocean-core) - Estilos CSS puros

### Comunidade

- 🐛 [Reportar bug](https://github.com/ocean-ds/ocean-web/issues)
- 💡 [Sugerir melhoria](https://github.com/ocean-ds/ocean-web/issues)
- 📦 [Pacotes no NPM](https://www.npmjs.com/search?q=%40useblu%2Focean)

---

🎉 **Pronto!** Você já pode criar interfaces incríveis com o Ocean Design System.
