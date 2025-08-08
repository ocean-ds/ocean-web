import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DoughnutChart from '../DoughnutChart';
import mockedDoughnutData from '../mocks/doughnutChart';

const meta: Meta<typeof DoughnutChart> = {
  title: 'Components/DoughnutChart',
  component: DoughnutChart,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Determina o título do gráfico.',
      control: 'text',
    },
    subtitle: {
      description: 'Determina o subtítulo do gráfico.',
      control: 'text',
    },
    centerChartValue: {
      description: 'Determina o valor central do gráfico.',
      control: 'text',
    },
    centerChartLabel: {
      description: 'Determina o rótulo central do gráfico.',
      control: 'text',
    },
    data: {
      description: 'Dados para o gráfico de rosca.',
      control: false,
    },
    className: {
      description: 'Classes CSS adicionais.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DoughnutChart>;

export const Usage: Story = {
  args: {
    title: 'Faturas do Mês',
    subtitle: 'Dezembro 2024',
    centerChartValue: '100',
    centerChartLabel: 'Total de Faturas',
    data: mockedDoughnutData,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

export const BasicChart: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <DoughnutChart
        title="Vendas por Categoria"
        subtitle="Janeiro 2024"
        centerChartValue="245"
        centerChartLabel="Total de Vendas"
        data={[
          {
            id: 1,
            count: 60,
            percentage: 60,
            color: '#0025E0',
            descriptionLevel1: 'Eletrônicos',
            descriptionLevel2: '60 unidades',
          },
          {
            id: 2,
            count: 40,
            percentage: 40,
            color: '#13BDBD',
            descriptionLevel1: 'Roupas',
            descriptionLevel2: '40 unidades',
          },
        ]}
      />
    </div>
  ),
};

export const WithoutCenterLabels: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <DoughnutChart
        title="Distribuição de Recursos"
        subtitle="Orçamento 2024"
        data={[
          {
            id: 1,
            count: 50,
            percentage: 50,
            color: '#3DCC64',
            descriptionLevel1: 'Desenvolvimento',
          },
          {
            id: 2,
            count: 30,
            percentage: 30,
            color: '#FFA347',
            descriptionLevel1: 'Marketing',
          },
          {
            id: 3,
            count: 20,
            percentage: 20,
            color: '#F5456E',
            descriptionLevel1: 'Suporte',
          },
        ]}
      />
    </div>
  ),
};

export const MultipleDataSets: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ maxWidth: '400px' }}>
        <h4
          style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}
        >
          Status de Projetos
        </h4>
        <DoughnutChart
          title="Projetos Q1"
          subtitle="Status Atual"
          centerChartValue="12"
          centerChartLabel="Projetos Ativos"
          data={[
            {
              id: 1,
              count: 7,
              percentage: 58,
              color: '#3DCC64',
              descriptionLevel1: 'Concluídos',
              descriptionLevel2: '7 projetos',
            },
            {
              id: 2,
              count: 3,
              percentage: 25,
              color: '#FFA347',
              descriptionLevel1: 'Em Andamento',
              descriptionLevel2: '3 projetos',
            },
            {
              id: 3,
              count: 2,
              percentage: 17,
              color: '#F5456E',
              descriptionLevel1: 'Atrasados',
              descriptionLevel2: '2 projetos',
            },
          ]}
        />
      </div>
      <div style={{ maxWidth: '400px' }}>
        <h4
          style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}
        >
          Performance de Vendas
        </h4>
        <DoughnutChart
          title="Vendas do Trimestre"
          subtitle="Meta vs Realizado"
          centerChartValue="85%"
          centerChartLabel="da Meta Alcançada"
          data={[
            {
              id: 1,
              count: 85,
              percentage: 85,
              color: '#0025E0',
              descriptionLevel1: 'Meta Atingida',
              descriptionLevel2: 'R$ 850k',
            },
            {
              id: 2,
              count: 15,
              percentage: 15,
              color: '#E5E7EB',
              descriptionLevel1: 'Restante',
              descriptionLevel2: 'R$ 150k',
            },
          ]}
        />
      </div>
    </div>
  ),
};
