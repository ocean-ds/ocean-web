import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FormLabel from '../FormLabel';

const meta: Meta<typeof FormLabel> = {
  title: 'Components/Forms/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Conteúdo do label.',
      control: 'text',
    },
    component: {
      description:
        'Elemento HTML ou componente usado como root. Padrão: label.',
      control: 'select',
      options: ['label', 'span', 'div'],
    },
    disabled: {
      description: 'Exibe o label em estado desabilitado.',
      control: 'boolean',
    },
    htmlFor: {
      description: 'ID do elemento associado ao label.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormLabel>;

export const Usage: Story = {
  args: {
    children: 'Nome completo',
    htmlFor: 'name-input',
  },
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
          padding: '16px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FormLabel htmlFor="normal-input">Label normal</FormLabel>
      <FormLabel htmlFor="disabled-input" disabled>
        Label desabilitado
      </FormLabel>
    </div>
  ),
};

export const WithFormControl: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <FormLabel htmlFor="email-input">Email</FormLabel>
        <div className="ods-input" style={{ marginTop: '4px' }}>
          <input id="email-input" type="email" placeholder="Digite seu email" />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="password-input" disabled>
          Senha (desabilitado)
        </FormLabel>
        <div
          className="ods-input ods-input--disabled"
          style={{ marginTop: '4px' }}
        >
          <input
            id="password-input"
            type="password"
            placeholder="Digite sua senha"
            disabled
          />
        </div>
      </div>
    </div>
  ),
};
