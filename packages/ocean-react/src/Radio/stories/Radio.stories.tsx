import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Radio from '../Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Texto do label do radio.',
      control: 'text',
    },
    checked: {
      description: 'Define se o radio está selecionado.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o radio.',
      control: 'boolean',
    },
    name: {
      description: 'Nome do grupo de radios.',
      control: 'text',
    },
    value: {
      description: 'Valor do radio.',
      control: 'text',
    },
    onChange: {
      description: 'Função chamada quando o valor muda.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Usage: Story = {
  args: {
    label: 'Opção selecionada',
    checked: true,
    name: 'example',
    value: 'option1',
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

export const RadioGroup: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const RadioGroupComponent = () => {
      const [selectedValue, setSelectedValue] = React.useState('option1');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            label="Opção 1"
            name="radio-group"
            value="option1"
            checked={selectedValue === 'option1'}
            onChange={(e) => setSelectedValue(e.target.value)}
          />
          <Radio
            label="Opção 2"
            name="radio-group"
            value="option2"
            checked={selectedValue === 'option2'}
            onChange={(e) => setSelectedValue(e.target.value)}
          />
          <Radio
            label="Opção 3"
            name="radio-group"
            value="option3"
            checked={selectedValue === 'option3'}
            onChange={(e) => setSelectedValue(e.target.value)}
          />
        </div>
      );
    };

    return <RadioGroupComponent />;
  },
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio label="Radio normal" name="states" value="normal" />
      <Radio label="Radio selecionado" name="states" value="checked" checked />
      <Radio
        label="Radio desabilitado"
        name="states"
        value="disabled"
        disabled
      />
      <Radio
        label="Radio desabilitado selecionado"
        name="states"
        value="disabled-checked"
        checked
        disabled
      />
    </div>
  ),
};

export const WithoutLabel: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Radio name="no-label" value="option1" />
      <Radio name="no-label" value="option2" checked />
      <Radio name="no-label" value="option3" disabled />
    </div>
  ),
};

export const FormExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const FormExampleComponent = () => {
      const [gender, setGender] = React.useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
            Selecione seu gênero:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Radio
              label="Feminino"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />
            <Radio
              label="Masculino"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />
            <Radio
              label="Não binário"
              name="gender"
              value="non-binary"
              checked={gender === 'non-binary'}
              onChange={(e) => setGender(e.target.value)}
            />
            <Radio
              label="Prefiro não informar"
              name="gender"
              value="not-informed"
              checked={gender === 'not-informed'}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          {gender && (
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Gênero selecionado: {gender}
            </p>
          )}
        </div>
      );
    };

    return <FormExampleComponent />;
  },
};
