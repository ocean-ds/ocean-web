import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import CardListSelectable from '../CardListSelectable';
import List from '../../List';
import Tag from '../../Tag';

const meta: Meta<typeof CardListSelectable> = {
  title: 'Components/CardList/CardListSelectable',
  component: CardListSelectable,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal do card.',
      control: 'text',
    },
    description: {
      description: 'Descrição ou texto secundário do card.',
      control: 'text',
    },
    caption: {
      description: 'Legenda ou texto terciário do card.',
      control: 'text',
    },
    controlType: {
      description: 'Tipo de controle de seleção.',
      control: 'select',
      options: ['checkbox', 'radio'],
    },
    indicator: {
      description: 'Indicador/badge exibido ao lado do conteúdo.',
      control: false,
    },
    disabled: {
      description: 'Desabilita o card.',
      control: 'boolean',
    },
    loading: {
      description: 'Mostra o estado de carregamento com skeleton.',
      control: 'boolean',
    },
    error: {
      description: 'Mostra o estado de erro (borda vermelha).',
      control: 'boolean',
    },
    indeterminate: {
      description: 'Estado indeterminado (somente para checkbox).',
      control: 'boolean',
    },
    checked: {
      description: 'Define se o card está selecionado.',
      control: 'boolean',
    },
    onChange: {
      description: 'Função chamada quando o estado de seleção muda.',
      action: 'changed',
    },
    className: {
      description: 'Classe CSS adicional para o card.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardListSelectable>;

// Story Usage (Principal com Controles)
export const Usage: Story = {
  args: {
    title: 'Título do Card',
    description: 'Descrição do card com informações importantes',
    controlType: 'checkbox',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          <StoryComponent />
        </List>
      </div>
    ),
  ],
};

// Story: Checkbox - Todos os estados
export const CheckboxStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(true);
    const [checked4, setChecked4] = useState(false);

    return (
      <List style={{ minWidth: '300px' }}>
        <CardListSelectable
          id="checkbox-default"
          title="Default"
          description="Estado padrão não selecionado"
          controlType="checkbox"
          checked={checked1}
          onChange={(e) => setChecked1(e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-selected"
          title="Selected"
          description="Estado selecionado"
          controlType="checkbox"
          checked={checked3}
          onChange={(e) => setChecked3(e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-indeterminate"
          title="Indeterminate"
          description="Estado indeterminado"
          controlType="checkbox"
          indeterminate
          checked={checked2}
          onChange={(e) => setChecked2(e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-disabled"
          title="Disabled"
          description="Estado desabilitado"
          controlType="checkbox"
          disabled
          checked={false}
        />
        <CardListSelectable
          id="checkbox-disabled-selected"
          title="Disabled Selected"
          description="Estado desabilitado e selecionado"
          controlType="checkbox"
          disabled
          checked
        />
        <CardListSelectable
          id="checkbox-error"
          title="Error"
          description="Estado de erro"
          controlType="checkbox"
          error
          checked={checked4}
          onChange={(e) => setChecked4(e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-loading"
          title="Loading"
          description="Estado de carregamento"
          controlType="checkbox"
          loading
        />
      </List>
    );
  },
};

// Story: Radio - Todos os estados
export const RadioStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <List style={{ minWidth: '300px' }}>
        <CardListSelectable
          id="radio-default"
          name="radio-group-1"
          value="option1"
          title="Default (Selected)"
          description="Estado padrão selecionado"
          controlType="radio"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <CardListSelectable
          id="radio-unselected"
          name="radio-group-1"
          value="option2"
          title="Default (Unselected)"
          description="Estado padrão não selecionado"
          controlType="radio"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <CardListSelectable
          id="radio-disabled"
          name="radio-group-disabled"
          value="option3"
          title="Disabled"
          description="Estado desabilitado"
          controlType="radio"
          disabled
          checked={false}
        />
        <CardListSelectable
          id="radio-disabled-selected"
          name="radio-group-disabled"
          value="option4"
          title="Disabled Selected"
          description="Estado desabilitado e selecionado"
          controlType="radio"
          disabled
          checked
        />
        <CardListSelectable
          id="radio-error"
          name="radio-group-2"
          value="option5"
          title="Error"
          description="Estado de erro"
          controlType="radio"
          error
        />
        <CardListSelectable
          id="radio-loading"
          title="Loading"
          description="Estado de carregamento"
          controlType="radio"
          loading
        />
      </List>
    );
  },
};

// Story: Com Indicadores
export const WithIndicators: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [selected, setSelected] = useState('option1');

    return (
      <List style={{ minWidth: '300px' }}>
        <CardListSelectable
          id="checkbox-with-tag"
          title="Checkbox com Tag Highlight"
          description="Card com tag de destaque"
          controlType="checkbox"
          indicator={
            <Tag variant="highlight" type="important" size="small">
              Label
            </Tag>
          }
          checked={checked1}
          onChange={(e) => setChecked1(e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-with-tag-neutral"
          title="Checkbox com Tag Neutral"
          description="Card com tag neutra"
          controlType="checkbox"
          indicator={
            <Tag variant="highlight" type="neutral" size="small">
              Info
            </Tag>
          }
          checked={checked2}
          onChange={(e) => setChecked2(e.target.checked)}
        />
        <CardListSelectable
          id="radio-with-tag"
          name="radio-group-with-indicator"
          value="option1"
          title="Radio com Tag"
          description="Card com tag de destaque"
          controlType="radio"
          indicator={
            <Tag variant="highlight" type="important" size="small">
              Label
            </Tag>
          }
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <CardListSelectable
          id="radio-with-tag-2"
          name="radio-group-with-indicator"
          value="option2"
          title="Radio sem Tag"
          description="Card sem indicador"
          controlType="radio"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <CardListSelectable
          id="checkbox-disabled-with-tag"
          title="Disabled com Tag"
          description="Card desabilitado com tag"
          controlType="checkbox"
          disabled
          indicator={
            <Tag variant="highlight" type="important" size="small">
              Label
            </Tag>
          }
          checked={checked3}
          onChange={(e) => setChecked3(e.target.checked)}
        />
      </List>
    );
  },
};

// Story: Grupo de Checkboxes
export const CheckboxGroup: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>(['option1']);

    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter((v) => v !== value));
      }
    };

    return (
      <List style={{ minWidth: '300px' }}>
        <CardListSelectable
          id="checkbox-option-1"
          name="checkbox-group"
          value="option1"
          title="Opção 1"
          description="Primeira opção do grupo"
          controlType="checkbox"
          checked={selected.includes('option1')}
          onChange={(e) => handleChange('option1', e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-option-2"
          name="checkbox-group"
          value="option2"
          title="Opção 2"
          description="Segunda opção do grupo"
          controlType="checkbox"
          checked={selected.includes('option2')}
          onChange={(e) => handleChange('option2', e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-option-3"
          name="checkbox-group"
          value="option3"
          title="Opção 3"
          description="Terceira opção do grupo"
          controlType="checkbox"
          checked={selected.includes('option3')}
          onChange={(e) => handleChange('option3', e.target.checked)}
        />
        <CardListSelectable
          id="checkbox-option-4"
          name="checkbox-group"
          value="option4"
          title="Opção 4"
          description="Quarta opção do grupo"
          controlType="checkbox"
          checked={selected.includes('option4')}
          onChange={(e) => handleChange('option4', e.target.checked)}
        />
      </List>
    );
  },
};

// Story: Grupo de Radios
export const RadioGroup: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <List style={{ minWidth: '300px' }}>
        <CardListSelectable
          id="radio-option-1"
          name="radio-group"
          value="option1"
          title="Opção 1"
          description="Primeira opção do grupo"
          controlType="radio"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <CardListSelectable
          id="radio-option-2"
          name="radio-group"
          value="option2"
          title="Opção 2"
          description="Segunda opção do grupo"
          controlType="radio"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <CardListSelectable
          id="radio-option-3"
          name="radio-group"
          value="option3"
          title="Opção 3"
          description="Terceira opção do grupo"
          controlType="radio"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <CardListSelectable
          id="radio-option-4"
          name="radio-group"
          value="option4"
          title="Opção 4"
          description="Quarta opção do grupo"
          controlType="radio"
          checked={selected === 'option4'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </List>
    );
  },
};

// Story: Com Caption
export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    return (
      <List style={{ minWidth: '300px' }}>
        <CardListSelectable
          id="checkbox-with-caption"
          title="Título do Card"
          description="Descrição do card"
          caption="Caption adicional"
          controlType="checkbox"
          checked={checked1}
          onChange={(e) => setChecked1(e.target.checked)}
        />
        <CardListSelectable
          id="radio-with-caption"
          name="radio-with-caption"
          value="option1"
          title="Título do Card"
          description="Descrição do card"
          caption="Caption adicional"
          controlType="radio"
          checked={checked2}
          onChange={(e) => setChecked2(e.target.value === 'option1')}
        />
      </List>
    );
  },
};

