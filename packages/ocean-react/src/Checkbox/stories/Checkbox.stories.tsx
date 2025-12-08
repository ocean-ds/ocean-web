import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Checkbox from '../Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'O conteúdo do rótulo do checkbox.',
      control: 'text',
    },
    checked: {
      description: 'Se verdadeiro, o checkbox aparece selecionado.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o checkbox.',
      control: 'boolean',
    },
    indeterminate: {
      description: 'Se verdadeiro, o checkbox aparece em estado indeterminado.',
      control: 'boolean',
    },
    error: {
      description: 'Se verdadeiro, o checkbox será exibido em estado de erro.',
      control: 'boolean',
    },
    errorMessage: {
      description: 'A mensagem de erro a ser exibida.',
      control: 'text',
    },
    id: {
      description: 'O ID do elemento input.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Usage: Story = {
  args: {
    id: 'checkbox-usage',
    label: 'Aceito os termos e condições',
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
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox id="checkbox-unchecked" label="Não selecionado" />
      <Checkbox id="checkbox-checked" label="Selecionado" checked />
      <Checkbox
        id="checkbox-indeterminate"
        label="Indeterminado"
        indeterminate
      />
      <Checkbox id="checkbox-disabled" label="Desabilitado" disabled />
      <Checkbox
        id="checkbox-disabled-checked"
        label="Desabilitado selecionado"
        disabled
        checked
      />
    </div>
  ),
};

export const WithError: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        id="checkbox-error"
        label="Campo obrigatório"
        error
        errorMessage="Este campo é obrigatório"
      />
      <Checkbox
        id="checkbox-error-checked"
        label="Campo com erro mas selecionado"
        error
        errorMessage="Erro mesmo selecionado"
        checked
      />
    </div>
  ),
};

export const WithoutLabel: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Checkbox id="checkbox-no-label-1" />
      <Checkbox id="checkbox-no-label-2" checked />
      <Checkbox id="checkbox-no-label-3" indeterminate />
      <Checkbox id="checkbox-no-label-4" disabled />
    </div>
  ),
};
