import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ptBR, enUS } from 'date-fns/locale';
import DateRange from '../DateRange';
import type { DatePickerFields } from '../types/DateRange.types';
import {
  createDateDecorator,
  createStatesContainer,
  createLocalizationContainer,
  createRestrictionsContainer,
  commonArgTypes,
  commonArgs,
  noControlsParameters,
} from './shared';

const meta: Meta<typeof DateRange> = {
  title: 'Components/DateRange',
  component: DateRange,
  tags: ['autodocs'],
  argTypes: {
    labels: {
      description: 'Labels dos campos inicial e final.',
      control: 'object',
    },
    values: {
      description: 'Valores das datas selecionadas.',
      control: false,
    },
    onSelect: {
      description: 'Função chamada quando datas são selecionadas.',
      control: false,
    },
    ...commonArgTypes,
  },
};

export default meta;

type Story = StoryObj<typeof DateRange>;

// Componente wrapper para gerenciar estado
interface DateRangeWrapperProps {
  [key: string]: unknown;
  values?: DatePickerFields;
}

const DateRangeWrapper: React.FC<DateRangeWrapperProps> = (props) => {
  const [dates, setDates] = useState<DatePickerFields>({ from: '', to: '' });
  const { values, ...rest } = props;

  const handleSelect = React.useCallback((selectedDates: DatePickerFields) => {
    setDates(selectedDates);
  }, []);

  return (
    <div style={{ width: '400px' }}>
      <DateRange
        labels={{ from: 'Data inicial', to: 'Data final' }}
        {...rest}
        values={dates.from || dates.to ? dates : values || { from: '', to: '' }}
        // @ts-expect-error - Conflito de tipagem entre props e eventos do DOM
        onSelect={handleSelect}
      />
    </div>
  );
};

export const Usage: Story = {
  args: {
    labels: { from: 'Data inicial', to: 'Data final' },
    ...commonArgs,
  },
  render: (args) => <DateRangeWrapper {...args} />,
  decorators: createDateDecorator('400px'),
};

export const States: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createStatesContainer('400px')}>
      <div>
        <h4>Normal</h4>
        <DateRangeWrapper labels={{ from: 'Data inicial', to: 'Data final' }} />
      </div>

      <div>
        <h4>Com valores preenchidos</h4>
        <DateRangeWrapper
          labels={{ from: 'Check-in', to: 'Check-out' }}
          values={{ from: '15/08/2025', to: '22/08/2025' }}
          helperText="Período selecionado"
        />
      </div>

      <div>
        <h4>Editável</h4>
        <DateRangeWrapper
          labels={{ from: 'Data inicial', to: 'Data final' }}
          editable
          helperText="Você pode digitar as datas"
        />
      </div>

      <div>
        <h4>Com erro</h4>
        <DateRangeWrapper
          labels={{ from: 'Data inicial', to: 'Data final' }}
          error
          helperText="Período inválido ou obrigatório"
        />
      </div>

      <div>
        <h4>Desabilitado</h4>
        <DateRangeWrapper
          labels={{ from: 'Data inicial', to: 'Data final' }}
          disabled
        />
      </div>
    </div>
  ),
};

export const WithRestrictions: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createRestrictionsContainer('400px')}>
      <div>
        <h4>A partir de hoje</h4>
        <DateRangeWrapper
          labels={{ from: 'Check-in', to: 'Check-out' }}
          startsToday
          helperText="Selecione datas a partir de hoje"
        />
      </div>
    </div>
  ),
};

export const VacationPlanning: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createRestrictionsContainer('400px')}>
      <div>
        <h4>Agenda de férias</h4>
        <DateRangeWrapper
          labels={{ from: 'Check-in', to: 'Check-out' }}
          helperText="Escolha um período fora das temporadas de alto movimento"
          disabledDays={[
            { dayOfWeek: [0, 6] }, // Weekends
            {
              from: new Date(new Date().setDate(new Date().getDate() + 7)),
              to: new Date(new Date().setDate(new Date().getDate() + 12)),
            },
            { before: new Date() },
          ]}
        />
      </div>
    </div>
  ),
};

export const WithDisabledDaysMessage: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createRestrictionsContainer('400px')}>
      <div>
        <h4>Período com dias bloqueados</h4>
        <DateRangeWrapper
          labels={{ from: 'Data inicial', to: 'Data final' }}
          helperText="Tente clicar em um dia bloqueado para ver o tooltip"
          disabledDays={[
            { dayOfWeek: [0, 6] }, // Weekends
            { before: new Date() },
          ]}
          disabledDaysMessage="Boletos pagos em finais de semana, feriados ou após às 16:00 são quitados no próximo dia útil."
        />
      </div>
    </div>
  ),
};

// Datas relativas ao dia atual para garantir visibilidade no calendário
const addDays = (n: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

const perDateMessages = [
  { date: addDays(3), message: 'Manutenção programada neste dia' },
  { date: addDays(7), message: 'Feriado municipal' },
  { date: addDays(10), message: 'Bloqueio operacional' },
];

export const WithDisabledDaysMessages: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createRestrictionsContainer('400px')}>
      <div>
        <h4>Mensagens por data</h4>
        <DateRangeWrapper
          labels={{ from: 'Data inicial', to: 'Data final' }}
          helperText="Clique nos dias bloqueados para ver a mensagem específica"
          disabledDays={perDateMessages.map((e) => e.date)}
          disabledDaysMessage={perDateMessages}
        />
      </div>
    </div>
  ),
};

export const Localization: Story = {
  parameters: noControlsParameters,
  render: () => (
    <div style={createLocalizationContainer('400px')}>
      <div>
        <h4>Português (padrão)</h4>
        <DateRangeWrapper
          labels={{ from: 'Data inicial', to: 'Data final' }}
          locale={ptBR}
        />
      </div>

      <div>
        <h4>English</h4>
        <DateRangeWrapper
          labels={{ from: 'Start date', to: 'End date' }}
          locale={enUS}
        />
      </div>
    </div>
  ),
};
