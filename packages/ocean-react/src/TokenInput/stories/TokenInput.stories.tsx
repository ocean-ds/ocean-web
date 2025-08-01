import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TokenInput from '../TokenInput';

const meta: Meta<typeof TokenInput> = {
  title: 'Components/Inputs/TokenInput',
  component: TokenInput,
  tags: ['autodocs'],
  argTypes: {
    digitsQuantity: {
      description: 'Quantidade de dígitos do token.',
      control: 'number',
    },
    label: {
      description: 'Rótulo descritivo do campo.',
      control: 'text',
    },
    error: {
      description: 'Quando true, exibe o estilo de erro.',
      control: 'boolean',
    },
    errorMessage: {
      description: 'Mensagem de erro exibida quando error é true.',
      control: 'text',
    },
    disabled: {
      description: 'Desabilita o campo e impede edição.',
      control: 'boolean',
    },
    autoFocus: {
      description: 'Foca automaticamente no primeiro campo.',
      control: 'boolean',
    },
    className: {
      table: { disable: true },
    },
    tooltipMessage: {
      table: { disable: true },
    },
    htmlFor: {
      table: { disable: true },
    },
    onChangeToken: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TokenInput>;

export const Usage: Story = {
  args: {
    label: 'Código de Verificação',
    digitsQuantity: 4,
    error: false,
    errorMessage: 'Código incorreto.',
    disabled: false,
    autoFocus: true,
  },
  render: (args) => (
    <TokenInput
      {...args}
      onChangeToken={() => {
        // Handler vazio para demo
      }}
    />
  ),
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const DigitsQuantity: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <TokenInput
        label="4 dígitos"
        digitsQuantity={4}
        onChangeToken={() => {
          // Handler vazio para demo
        }}
      />
      <TokenInput
        label="6 dígitos"
        digitsQuantity={6}
        onChangeToken={() => {
          // Handler vazio para demo
        }}
      />
      <TokenInput
        label="8 dígitos"
        digitsQuantity={8}
        onChangeToken={() => {
          // Handler vazio para demo
        }}
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <TokenInput
        label="Normal"
        digitsQuantity={4}
        onChangeToken={() => {
          // Handler vazio para demo
        }}
      />
      <TokenInput
        label="Desabilitado"
        digitsQuantity={4}
        disabled
        onChangeToken={() => {
          // Handler vazio para demo
        }}
      />
      <TokenInput
        label="Erro"
        digitsQuantity={4}
        error
        errorMessage="Código incorreto"
        onChangeToken={() => {
          // Handler vazio para demo
        }}
      />
    </div>
  ),
};

const ValidationExample = (): JSX.Element => {
  const [token, setToken] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const correctToken = '1234';

  const handleTokenChange = (value: string) => {
    setToken(value);
    if (value.length === 4) {
      setIsValid(value === correctToken);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div style={{ minWidth: '300px', textAlign: 'center' }}>
      <TokenInput
        label="Digite o código correto (1234)"
        digitsQuantity={4}
        error={!isValid}
        errorMessage={!isValid ? 'Código incorreto. Tente novamente.' : ''}
        onChangeToken={handleTokenChange}
      />
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <p>Token atual: {token}</p>
        <p>Status: {isValid ? 'Válido' : 'Inválido'}</p>
        <p>Dica: Digite &quot;1234&quot; para ver a validação</p>
      </div>
    </div>
  );
};

export const Validation: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <ValidationExample />,
};
