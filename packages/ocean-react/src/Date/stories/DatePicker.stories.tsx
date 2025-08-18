import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ptBR, enUS } from 'date-fns/locale';
import DatePicker from '../DatePicker';
import {
  createDateDecorator,
  createStatesContainer,
  createLocalizationContainer,
  createRestrictionsContainer,
  commonArgTypes,
  commonArgs,
  noControlsParameters,
} from './shared';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label do campo de data.',
      control: 'text',
    },
    value: {
      description: 'Valor da data selecionada.',
      control: false,
    },
    onSelect: {
      description: 'Função chamada quando uma data é selecionada.',
      control: false,
    },
    ...commonArgTypes,
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

// Componente wrapper para gerenciar estado
interface DatePickerWrapperProps {
  [key: string]: unknown;
  value?: string;
}

const DatePickerWrapper: React.FC<DatePickerWrapperProps> = (props) => {
  const [date, setDate] = useState<string>('');
  const { value, ...rest } = props;

  return (
    <div style={{ width: '300px' }}>
      <DatePicker
        label="Data"
        {...rest}
        value={date || value || ''}
        onSelect={(selectedDate: string) => setDate(selectedDate)}
      />
    </div>
  );
};

export const Usage: Story = {
  args: {
    label: 'Selecione uma data',
    ...commonArgs,
  },
  render: (args) => <DatePickerWrapper {...args} />,
  decorators: createDateDecorator('300px'),
};

export const States: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createStatesContainer('300px')}>
      <div>
        <h4>Normal</h4>
        <DatePickerWrapper label="Data normal" />
      </div>

      <div>
        <h4>Com valor preenchido</h4>
        <DatePickerWrapper label="Data preenchida" value="12/08/2025" />
      </div>

      <div>
        <h4>Editável</h4>
        <DatePickerWrapper
          label="Data editável"
          editable
          helperText="Você pode digitar a data"
        />
      </div>

      <div>
        <h4>Com erro</h4>
        <DatePickerWrapper
          label="Data com erro"
          error
          helperText="Data obrigatória"
        />
      </div>

      <div>
        <h4>Desabilitado</h4>
        <DatePickerWrapper label="Data desabilitada" disabled />
      </div>
    </div>
  ),
};

export const WithRestrictions: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createRestrictionsContainer('300px')}>
      <div>
        <h4>A partir de hoje</h4>
        <DatePickerWrapper
          label="Data do agendamento"
          startsToday
          helperText="Selecione uma data a partir de hoje"
        />
      </div>
    </div>
  ),
};

export const Localization: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createLocalizationContainer('300px', '500px')}>
      <div>
        <h4>Português (padrão)</h4>
        <DatePickerWrapper label="Data em português" locale={ptBR} />
      </div>

      <div>
        <h4>English</h4>
        <DatePickerWrapper label="Date in English" locale={enUS} />
      </div>
    </div>
  ),
};
