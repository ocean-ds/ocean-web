import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Container from '../Container';

const meta: Meta<typeof Container> = {
  title: 'Components/Grid/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    fluid: {
      description:
        'Allow the Container to fill all of its available horizontal space.',
      control: 'select',
      options: [false, true, 'sm', 'md', 'lg', 'xl'],
      table: {
        type: { summary: 'boolean | "sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      description: 'Conteúdo do container.',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      description: 'CSS classes adicionais para o container.',
      control: 'text',
      table: {
        type: { summary: 'string' },
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
          <h3 id="padrao">Container Padrão</h3>
          <DefaultContainer />
          <h3 id="fluido">Container Fluido</h3>
          <FluidContainer />
          <h3 id="breakpoint">Container com Breakpoint</h3>
          <BreakpointContainer />
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

type Story = StoryObj<typeof Container>;

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente Container que fornece um wrapper responsivo para o conteúdo.
      Pode ser configurado para ser fluido ou ter largura máxima em diferentes
      breakpoints.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O Container é o componente base do sistema de grid. Ele fornece um wrapper
      responsivo que pode ser configurado para ter largura máxima (padrão) ou
      largura fluida (100%). Suporta diferentes breakpoints para controle
      preciso do comportamento responsivo.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Largura Responsiva</strong>: Adapta-se automaticamente aos
        breakpoints
      </li>
      <li>
        <strong>Fluido Configurável</strong>: Pode ser fluido globalmente ou até
        breakpoints específicos
      </li>
      <li>
        <strong>Centrado</strong>: Container padrão é centralizado na tela
      </li>
      <li>
        <strong>Flexível</strong>: Aceita qualquer conteúdo como children
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Container } from '@useblu/ocean-react/Grid';`}
    />
  </>
);

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Container padrão (com max-width)
<Container>
  <div>Conteúdo centralizado</div>
</Container>

// Container fluido (100% largura)
<Container fluid>
  <div>Conteúdo com largura total</div>
</Container>

// Container fluido até breakpoint específico
<Container fluid="md">
  <div>Fluido até md, depois com max-width</div>
</Container>`}
    />
  </>
);

export const Usage: Story = {
  args: {
    fluid: false,
    children: (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      >
        Container com largura máxima (padrão)
      </div>
    ),
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '500px',
          backgroundColor: '#e0e0e0',
          padding: '10px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

const DefaultContainer = (): JSX.Element => (
  <div style={{ backgroundColor: '#e0e0e0', padding: '10px' }}>
    <Container>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      >
        Container padrão com max-width
      </div>
    </Container>
  </div>
);

const FluidContainer = (): JSX.Element => (
  <div style={{ backgroundColor: '#e0e0e0', padding: '10px' }}>
    <Container fluid>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      >
        Container fluido (100% largura)
      </div>
    </Container>
  </div>
);

const BreakpointContainer = (): JSX.Element => (
  <div style={{ backgroundColor: '#e0e0e0', padding: '10px' }}>
    <Container fluid="md">
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      >
        Container fluido até breakpoint md
      </div>
    </Container>
  </div>
);

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Layout de Página</h3>
    <DocBlock.Source
      dark
      code={`<Container>
  <header>Header da página</header>
  <main>Conteúdo principal</main>
  <footer>Footer da página</footer>
</Container>`}
    />

    <h3>Formulário Centralizado</h3>
    <DocBlock.Source
      dark
      code={`<Container>
  <form>
    <h2>Login</h2>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Senha" />
    <button type="submit">Entrar</button>
  </form>
</Container>`}
    />

    <h3>Container Fluido para Dashboard</h3>
    <DocBlock.Source
      dark
      code={`<Container fluid>
  <div className="dashboard">
    <div className="sidebar">Sidebar</div>
    <div className="content">Conteúdo principal</div>
  </div>
</Container>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use Container padrão para conteúdo que deve ser centralizado</li>
      <li>Use Container fluido para layouts que ocupam toda a largura</li>
      <li>Use breakpoints específicos para controle fino do comportamento</li>
    </ul>

    <h3>2. Responsividade</h3>
    <ul>
      <li>Container padrão tem max-width em cada breakpoint</li>
      <li>Container fluido ocupa 100% da largura disponível</li>
      <li>Breakpoints específicos permitem comportamento híbrido</li>
    </ul>

    <h3>3. Performance</h3>
    <ul>
      <li>Container é um wrapper leve, não afeta performance</li>
      <li>Use apenas quando necessário para layout</li>
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
            <code>.ods-container</code>
          </td>
          <td>Container padrão com max-width em cada breakpoint.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-container-fluid</code>
          </td>
          <td>Container fluido com width: 100% em todos os breakpoints.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-container-sm</code>
          </td>
          <td>Container fluido até breakpoint sm, depois com max-width.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-container-md</code>
          </td>
          <td>Container fluido até breakpoint md, depois com max-width.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-container-lg</code>
          </td>
          <td>Container fluido até breakpoint lg, depois com max-width.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-container-xl</code>
          </td>
          <td>Container fluido até breakpoint xl, depois com max-width.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O Container é baseado no elemento div e suporta todos os atributos HTML
      padrão.
    </DocBlock.Markdown>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Tipo</th>
          <th>Padrão</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>fluid</td>
          <td>
            <code>
              boolean | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; |
              &quot;xl&quot;
            </code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Allow the Container to fill all of its available horizontal space.
          </td>
        </tr>
        <tr>
          <td>children</td>
          <td>
            <code>ReactNode</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Conteúdo do container.</td>
        </tr>
        <tr>
          <td>className</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>CSS classes adicionais para o container.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento div. Qualquer outra prop fornecida
      será passada para o elemento div.
    </DocBlock.Markdown>
  </>
);
