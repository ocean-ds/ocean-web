import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Row from '../Row';
import Col from '../Col';
import {
  createStoryDecorator,
  createApiReferenceTable,
  SCREEN_SIZES,
} from './_shared';

// Constantes reutilizáveis
const ROW_COLUMN_OPTIONS = ['1', '2', '3', '4', '5', '6'];

const ROW_COLUMN_TYPE_SUMMARY = '"1" | "2" | "3" | "4" | "5" | "6"';

const ROW_BASE_DESCRIPTION =
  'The number of columns that will fit next to each other on';

const ROW_BREAKPOINT_CONFIGS = {
  xs: `${ROW_BASE_DESCRIPTION} ${SCREEN_SIZES.xs}`,
  sm: `${ROW_BASE_DESCRIPTION} ${SCREEN_SIZES.sm}`,
  md: `${ROW_BASE_DESCRIPTION} ${SCREEN_SIZES.md}`,
  lg: `${ROW_BASE_DESCRIPTION} ${SCREEN_SIZES.lg}`,
  xl: `${ROW_BASE_DESCRIPTION} ${SCREEN_SIZES.xl}`,
};

const createRowBreakpointArgType = (
  breakpoint: keyof typeof ROW_BREAKPOINT_CONFIGS
) => ({
  description: ROW_BREAKPOINT_CONFIGS[breakpoint],
  control: 'select',
  options: ROW_COLUMN_OPTIONS,
  table: {
    type: {
      summary: ROW_COLUMN_TYPE_SUMMARY,
    },
  },
});

const meta: Meta<typeof Row> = {
  title: 'Components/Grid/Row',
  component: Row,
  tags: ['autodocs'],
  argTypes: {
    noGutters: {
      description:
        'Removes the gutter spacing between Cols as well as any added negative margins.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    xs: createRowBreakpointArgType('xs'),
    sm: createRowBreakpointArgType('sm'),
    md: createRowBreakpointArgType('md'),
    lg: createRowBreakpointArgType('lg'),
    xl: createRowBreakpointArgType('xl'),
    children: {
      description: 'Colunas da linha (componentes Col).',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Introduction />
          <DocBlock.Heading>Uso</DocBlock.Heading>
          <DocBlock.Canvas of={Usage} />
          <DocBlock.Controls of={Usage} />
          <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
          <CommonPatterns />
          <DocBlock.Heading>Exemplos</DocBlock.Heading>
          <h3 id="basico">Row Básico</h3>
          <BasicRow />
          <h3 id="sem-gutters">Row sem Gutters</h3>
          <NoGuttersRow />
          <h3 id="row-columns">Row Columns</h3>
          <RowColumns />
          <UsageExamples />
          <BestPractices />
          <CssClasses />
          <ApiReference />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Row>;

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente Row que define uma linha no sistema de grid. Contém colunas
      (Col) e pode ser configurado para diferentes comportamentos responsivos.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O Row é o componente que define uma linha horizontal no sistema de grid.
      Ele contém colunas (Col) e pode ser configurado para ter diferentes
      números de colunas por linha em diferentes breakpoints. Também suporta a
      remoção de gutters.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Flexbox</strong>: Baseado em flexbox para layout flexível
      </li>
      <li>
        <strong>Row Columns</strong>: Define quantas colunas cabem por linha
      </li>
      <li>
        <strong>No Gutters</strong>: Remove espaçamento entre colunas
      </li>
      <li>
        <strong>Responsivo</strong>: Comportamento diferente por breakpoint
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Row } from '@useblu/ocean-react/Grid';`}
    />
  </>
);

const CommonPatterns = (): JSX.Element => (
  <DocBlock.Source
    dark
    code={`// Row básico
<Row>
  <Col>Coluna 1</Col>
  <Col>Coluna 2</Col>
</Row>

// Row sem gutters
<Row noGutters>
  <Col>Coluna sem espaçamento</Col>
  <Col>Coluna sem espaçamento</Col>
</Row>

// Row com colunas definidas
<Row xs="2" md="4">
  <Col>Coluna 1</Col>
  <Col>Coluna 2</Col>
  <Col>Coluna 3</Col>
  <Col>Coluna 4</Col>
</Row>`}
  />
);

export const Usage: Story = {
  args: {
    noGutters: false,
    children: (
      <>
        <Col>Coluna 1</Col>
        <Col>Coluna 2</Col>
        <Col>Coluna 3</Col>
      </>
    ),
  },
  decorators: createStoryDecorator(),
};

const BasicRow = (): JSX.Element => (
  <div className="show-grid">
    <Row>
      <Col>Coluna 1</Col>
      <Col>Coluna 2</Col>
      <Col>Coluna 3</Col>
    </Row>
  </div>
);

const NoGuttersRow = (): JSX.Element => (
  <div className="show-grid">
    <Row noGutters>
      <Col>Coluna sem gutters</Col>
      <Col>Coluna sem gutters</Col>
      <Col>Coluna sem gutters</Col>
    </Row>
  </div>
);

const RowColumns = (): JSX.Element => (
  <div className="show-grid">
    <Row xs="1" sm="2" md="4">
      <Col>Coluna 1</Col>
      <Col>Coluna 2</Col>
      <Col>Coluna 3</Col>
      <Col>Coluna 4</Col>
    </Row>
  </div>
);

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Layout de Cards</h3>
    <DocBlock.Source
      dark
      code={`<Row xs="1" sm="2" md="3" lg="4">
  <Col>
    <Card>Card 1</Card>
  </Col>
  <Col>
    <Card>Card 2</Card>
  </Col>
  <Col>
    <Card>Card 3</Card>
  </Col>
  <Col>
    <Card>Card 4</Card>
  </Col>
</Row>`}
    />

    <h3>Formulário em Colunas</h3>
    <DocBlock.Source
      dark
      code={`<Row>
  <Col xs="12" md="6">
    <Input label="Nome" />
  </Col>
  <Col xs="12" md="6">
    <Input label="Sobrenome" />
  </Col>
</Row>
<Row>
  <Col xs="12">
    <Input label="Email" />
  </Col>
</Row>`}
    />

    <h3>Row sem Espaçamento</h3>
    <DocBlock.Source
      dark
      code={`<Row noGutters>
  <Col>
    <Button variant="primary" blocked>Botão 1</Button>
  </Col>
  <Col>
    <Button variant="secondary" blocked>Botão 2</Button>
  </Col>
</Row>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use Row para organizar colunas horizontalmente</li>
      <li>Row columns define quantas colunas cabem por linha</li>
      <li>Use noGutters quando precisar de colunas sem espaçamento</li>
    </ul>

    <h3>2. Responsividade</h3>
    <ul>
      <li>Defina row columns para diferentes breakpoints</li>
      <li>xs=1 para mobile, md=3 para desktop</li>
      <li>Considere o conteúdo ao definir o número de colunas</li>
    </ul>

    <h3>3. Performance</h3>
    <ul>
      <li>Row é um wrapper leve baseado em flexbox</li>
      <li>Evite aninhar Rows desnecessariamente</li>
    </ul>
  </>
);

const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-row</code>
          </td>
          <td>Estilos aplicados ao elemento raiz da linha.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-no-gutters</code>
          </td>
          <td>
            Remove margens negativas da linha e padding das colunas filhas.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-row-cols-[1..6]</code>
          </td>
          <td>
            Define o número de colunas que cabem por linha para xs ou todos os
            breakpoints.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-row-cols-[sm,md,lg,xl]-[1..6]</code>
          </td>
          <td>Define colunas por linha até o breakpoint especificado.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = createApiReferenceTable(
  'Row',
  ROW_BREAKPOINT_CONFIGS,
  ROW_COLUMN_TYPE_SUMMARY,
  [
    {
      prop: 'noGutters',
      type: 'boolean',
      default: 'false',
      description:
        'Removes the gutter spacing between Cols as well as any added negative margins.',
    },
    {
      prop: 'children',
      type: 'ReactNode',
      default: 'undefined',
      description: 'Colunas da linha (componentes Col).',
    },
  ]
);
