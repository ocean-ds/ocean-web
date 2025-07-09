import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Col from '../Col';
import {
  DemoWrapper,
  DemoContent,
  createStoryDecorator,
  createApiReferenceTable,
  SCREEN_SIZES,
} from './_shared';

// Constantes reutilizáveis
const COL_BREAKPOINT_OPTIONS = [
  true,
  false,
  'auto',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

const COL_BREAKPOINT_TYPE_SUMMARY =
  'boolean | "auto" | "1".."12" | {span?: boolean | "auto" | "1".."12", offset?: "1".."12"}';

const COL_BREAKPOINT_BASE_DESCRIPTION = 'The number of columns to span on';

const COL_BREAKPOINT_CONFIGS = {
  xs: `${COL_BREAKPOINT_BASE_DESCRIPTION} ${SCREEN_SIZES.xs}`,
  sm: `${COL_BREAKPOINT_BASE_DESCRIPTION} ${SCREEN_SIZES.sm}`,
  md: `${COL_BREAKPOINT_BASE_DESCRIPTION} ${SCREEN_SIZES.md}`,
  lg: `${COL_BREAKPOINT_BASE_DESCRIPTION} ${SCREEN_SIZES.lg}`,
  xl: `${COL_BREAKPOINT_BASE_DESCRIPTION} ${SCREEN_SIZES.xl}`,
};

const createBreakpointArgType = (
  breakpoint: keyof typeof COL_BREAKPOINT_CONFIGS
) => ({
  description: COL_BREAKPOINT_CONFIGS[breakpoint],
  control: 'select',
  options: COL_BREAKPOINT_OPTIONS,
  table: {
    type: {
      summary: COL_BREAKPOINT_TYPE_SUMMARY,
    },
  },
});

const meta: Meta<typeof Col> = {
  title: 'Components/Grid/Col',
  component: Col,
  tags: ['autodocs'],
  argTypes: {
    xs: createBreakpointArgType('xs'),
    sm: createBreakpointArgType('sm'),
    md: createBreakpointArgType('md'),
    lg: createBreakpointArgType('lg'),
    xl: createBreakpointArgType('xl'),
    children: {
      description: 'Conteúdo da coluna.',
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
          <ColIntroduction />
          <DocBlock.Heading>Uso</DocBlock.Heading>
          <DocBlock.Canvas of={Usage} />
          <DocBlock.Controls of={Usage} />
          <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
          <ColCommonPatterns />
          <DocBlock.Heading>Exemplos</DocBlock.Heading>
          <h3 id="basico">Col Básico</h3>
          <BasicCol />
          <h3 id="responsivo">Col Responsivo</h3>
          <ResponsiveCol />
          <h3 id="offset">Col com Offset</h3>
          <OffsetCol />
          <h3 id="auto">Col Auto</h3>
          <AutoCol />
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

type Story = StoryObj<typeof Col>;

const ColIntroduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente Col que define uma coluna no sistema de grid. Pode ser
      configurado para diferentes larguras e offsets em diferentes breakpoints.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O Col é o componente que define uma coluna no sistema de grid. Pode ser
      configurado para ocupar diferentes números de colunas (1-12) em diferentes
      breakpoints, além de suportar offsets e largura automática.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Grid de 12 Colunas</strong>: Pode ocupar de 1 a 12 colunas
      </li>
      <li>
        <strong>Responsivo</strong>: Largura diferente por breakpoint
      </li>
      <li>
        <strong>Offset</strong>: Pode ter margem esquerda (offset)
      </li>
      <li>
        <strong>Auto</strong>: Largura baseada no conteúdo
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Col } from '@useblu/ocean-react/Grid';`}
    />
  </>
);

const ColCommonPatterns = (): JSX.Element => (
  <DocBlock.Source
    dark
    code={`// Col básico (largura automática)
<Col>Conteúdo</Col>

// Col com largura específica
<Col xs="12" md="6">Meia largura em desktop</Col>

// Col com offset
<Col md={{ span: '6', offset: '3' }}>Centralizado</Col>

// Col responsivo
<Col xs="12" sm="6" md="4" lg="3">Responsivo`}
  />
);

export const Usage: Story = {
  args: {
    xs: '12',
    md: '6',
    children: <DemoContent>Col responsivo</DemoContent>,
  },
  decorators: createStoryDecorator(),
};

const BasicCol = (): JSX.Element => (
  <DemoWrapper>
    <Col>
      <DemoContent>Col básico</DemoContent>
    </Col>
  </DemoWrapper>
);

const ResponsiveCol = (): JSX.Element => (
  <DemoWrapper>
    <Col xs="12" sm="6" md="4" lg="3">
      <DemoContent>Responsivo</DemoContent>
    </Col>
  </DemoWrapper>
);

const OffsetCol = (): JSX.Element => (
  <DemoWrapper>
    <Col md={{ span: '6', offset: '3' }}>
      <DemoContent>Com offset</DemoContent>
    </Col>
  </DemoWrapper>
);

const AutoCol = (): JSX.Element => (
  <DemoWrapper>
    <Col xs="auto">
      <DemoContent>Auto width</DemoContent>
    </Col>
  </DemoWrapper>
);

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Layout Responsivo</h3>
    <DocBlock.Source
      dark
      code={`<Col xs="12" sm="6" md="4" lg="3">
  <Card>
    <h3>Título</h3>
    <p>Conteúdo do card</p>
  </Card>
</Col>`}
    />

    <h3>Coluna Centralizada</h3>
    <DocBlock.Source
      dark
      code={`<Col md={{ span: '8', offset: '2' }}>
  <form>
    <h2>Login</h2>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Senha" />
    <button type="submit">Entrar</button>
  </form>
</Col>`}
    />

    <h3>Coluna com Largura Automática</h3>
    <DocBlock.Source
      dark
      code={`<Col xs="auto">
  <Button>Botão com largura automática</Button>
</Col>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Larguras Responsivas</h3>
    <ul>
      <li>Use xs=12 para mobile (largura total)</li>
      <li>Use md=6 para desktop (meia largura)</li>
      <li>Considere o conteúdo ao definir larguras</li>
    </ul>

    <h3>2. Offsets</h3>
    <ul>
      <li>Use offset para centralizar colunas</li>
      <li>Offset + span não deve exceder 12</li>
      <li>Use offset apenas quando necessário</li>
    </ul>

    <h3>3. Auto Width</h3>
    <ul>
      <li>Use &apos;auto&apos; para conteúdo com largura natural</li>
      <li>Ideal para botões, labels, etc.</li>
      <li>Evite &apos;auto&apos; para conteúdo que deve se expandir</li>
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
            <code>.ods-col</code>
          </td>
          <td>Estilos aplicados quando nenhum breakpoint é especificado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-col-[auto,1..12]</code>
          </td>
          <td>Define largura do conteúdo para xs ou todos os breakpoints.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-col-[sm,md,lg,xl]-[auto,1..12]</code>
          </td>
          <td>Define largura do conteúdo até o breakpoint especificado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-offset-[1..12]</code>
          </td>
          <td>Aumenta margem esquerda para xs ou todos os breakpoints.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-offset-[sm,md,lg,xl]-[1..12]</code>
          </td>
          <td>Aumenta margem esquerda até o breakpoint especificado.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = createApiReferenceTable(
  'Col',
  COL_BREAKPOINT_CONFIGS,
  COL_BREAKPOINT_TYPE_SUMMARY,
  [
    {
      prop: 'children',
      type: 'ReactNode',
      default: 'undefined',
      description: 'Conteúdo da coluna.',
    },
  ]
);
