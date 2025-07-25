---
title: Início Rápido
sidebar_label: Início Rápido
sidebar_position: 3
---

# Início Rápido

Este guia vai te ajudar a começar a usar o Ocean Design System em poucos minutos.

## 1. Instalação

Primeiro, instale os pacotes necessários:

```bash
npm install @useblu/ocean-react @useblu/ocean-core
# ou
yarn add @useblu/ocean-react @useblu/ocean-core
```

## 2. Configuração básica

### Configure o Provider

Envolva sua aplicação com o `OceanProvider`:

```tsx
// src/App.tsx
import React from 'react';
import { OceanProvider } from '@useblu/ocean-react';
import { MyComponent } from './MyComponent';

function App() {
  return (
    <OceanProvider>
      <MyComponent />
    </OceanProvider>
  );
}

export default App;
```

### Importe os estilos

Adicione os estilos CSS do Ocean no seu arquivo principal:

```css
/* src/index.css */
@import '@useblu/ocean-core/dist/ocean.css';
```

## 3. Primeiro componente

Agora você pode usar qualquer componente do Ocean:

```tsx
// src/MyComponent.tsx
import React from 'react';
import { Button, Input, Card } from '@useblu/ocean-react';

export function MyComponent() {
  return (
    <Card>
      <h2>Meu primeiro componente Ocean</h2>
      <Input label="Nome" placeholder="Digite seu nome" />
      <Button variant="primary" style={{ marginTop: '16px' }}>
        Salvar
      </Button>
    </Card>
  );
}
```

## 4. Exemplo completo

Aqui está um exemplo de formulário de login usando vários componentes:

```tsx
import React, { useState } from 'react';
import {
  OceanProvider,
  Container,
  Card,
  Input,
  Button,
  Alert,
  Typography,
} from '@useblu/ocean-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular login
    setTimeout(() => {
      setLoading(false);
      alert('Login realizado!');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Card style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
          Entrar
        </Typography>

        <Alert type="info" style={{ marginBottom: '1.5rem' }}>
          Use qualquer email e senha para testar
        </Alert>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@exemplo.com"
            style={{ marginBottom: '1rem' }}
            required
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            style={{ marginBottom: '1.5rem' }}
            required
          />

          <Button type="submit" variant="primary" loading={loading} fullWidth>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </Container>
  );
}

function App() {
  return (
    <OceanProvider>
      <LoginForm />
    </OceanProvider>
  );
}

export default App;
```

## 5. Customização de tema

Você pode personalizar o tema passando propriedades para o `OceanProvider`:

```tsx
import { OceanProvider } from '@useblu/ocean-react';

const customTheme = {
  colors: {
    primary: {
      main: '#ff6b35',
      light: '#ff8f65',
      dark: '#e55a2b',
      contrast: '#ffffff',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

function App() {
  return (
    <OceanProvider theme={customTheme}>{/* Sua aplicação */}</OceanProvider>
  );
}
```

## 6. TypeScript

O Ocean tem suporte completo ao TypeScript. As tipagens são incluídas automaticamente:

```tsx
import { ButtonProps, InputProps } from '@useblu/ocean-react';

// As props são totalmente tipadas
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 7. Styled Components

Você pode usar styled-components com os tokens do Ocean:

```tsx
import styled from 'styled-components';
import { getTokens } from '@useblu/ocean-react';

const CustomCard = styled.div`
  background: ${getTokens().colors.surface};
  padding: ${getTokens().spacing.lg};
  border-radius: ${getTokens().borderRadius.md};
  box-shadow: ${getTokens().shadows.md};
`;
```

## 8. Dicas importantes

### ✅ Boas práticas

- Sempre use o `OceanProvider` na raiz da aplicação
- Importe os estilos CSS uma única vez
- Use os componentes Ocean ao invés de HTML nativo quando possível
- Aproveite o sistema de design tokens para consistência

### ⚠️ Cuidados

- Não esqueça de importar os estilos CSS
- Certifique-se de que as versões do React são compatíveis (18+)
- Use styled-components v5 ou v6 para compatibilidade

### 🔧 Troubleshooting

**Estilos não carregaram?**

- Verifique se importou `@useblu/ocean-core/dist/ocean.css`

**Componentes não encontrados?**

- Verifique se instalou `@useblu/ocean-react`

**Erro de TypeScript?**

- Certifique-se de que está usando TypeScript 4.0+

## 9. Recursos adicionais

- [GitHub Repository](https://github.com/ocean-ds/ocean-web)
- [Storybook Interativo](https://ocean-ds.github.io/ocean-web)
- [NPM Package](https://www.npmjs.com/package/@useblu/ocean-react)
- [Issues e Suporte](https://github.com/ocean-ds/ocean-web/issues)

---

🎉 **Parabéns!** Você já está pronto para criar interfaces incríveis com o Ocean Design System.
