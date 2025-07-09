import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Container from '../Container';
import Row from '../Row';
import Col from '../Col';

const meta: Meta<typeof Container> = {
  title: 'Components/Grid',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Markdown>
            O sistema de Grid do Ocean é baseado em flexbox e fornece uma
            maneira flexível e responsiva de criar layouts. É composto por três
            componentes principais: **Container**, **Row** e **Col**.
          </DocBlock.Markdown>

          <DocBlock.Heading>Visão Geral</DocBlock.Heading>
          <DocBlock.Markdown>
            O sistema de grid utiliza um layout de 12 colunas que se adapta
            automaticamente aos diferentes breakpoints. Os componentes trabalham
            em conjunto para criar layouts responsivos e flexíveis.
          </DocBlock.Markdown>

          <h3>Principais Características</h3>
          <ul>
            <li>
              <strong>Grid de 12 Colunas</strong>: Sistema baseado em 12 colunas
              para máxima flexibilidade
            </li>
            <li>
              <strong>Responsivo</strong>: Adapta-se automaticamente aos
              breakpoints (xs, sm, md, lg, xl)
            </li>
            <li>
              <strong>Flexbox</strong>: Baseado em flexbox para layouts
              flexíveis
            </li>
            <li>
              <strong>Breakpoints</strong>: xs (0px+), sm (576px+), md (768px+),
              lg (992px+), xl (1200px+)
            </li>
          </ul>

          <DocBlock.Heading>Importação</DocBlock.Heading>
          <DocBlock.Source
            dark
            code={`import { Container, Row, Col } from '@useblu/ocean-react/Grid';`}
          />

          <DocBlock.Heading>Componentes</DocBlock.Heading>

          <h3>Container</h3>
          <DocBlock.Markdown>
            O Container é o wrapper principal do sistema de grid. Fornece
            largura máxima responsiva e pode ser configurado para ser fluido.
          </DocBlock.Markdown>
          <DocBlock.Source
            dark
            code={`// Container padrão (com max-width)
<Container>
  <Row>
    <Col>Conteúdo</Col>
  </Row>
</Container>

// Container fluido (100% largura)
<Container fluid>
  <Row>
    <Col>Conteúdo com largura total</Col>
  </Row>
</Container>`}
          />

          <h3>Row</h3>
          <DocBlock.Markdown>
            O Row define uma linha horizontal no grid. Contém colunas (Col) e
            pode ser configurado para diferentes comportamentos responsivos.
          </DocBlock.Markdown>
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
</Row>`}
          />

          <h3>Col</h3>
          <DocBlock.Markdown>
            O Col define uma coluna no sistema de grid. Pode ser configurado
            para diferentes larguras e offsets em diferentes breakpoints.
          </DocBlock.Markdown>
          <DocBlock.Source
            dark
            code={`// Col básico (largura automática)
<Col>Conteúdo</Col>

// Col com largura específica
<Col xs="12" md="6">Meia largura em desktop</Col>

// Col com offset
<Col md={{ span: '6', offset: '3' }}>Centralizado</Col>

// Col responsivo
<Col xs="12" sm="6" md="4" lg="3">Responsivo</Col>`}
          />

          <DocBlock.Heading>Exemplos Práticos</DocBlock.Heading>

          <h3>Layout Básico</h3>
          <BasicLayout />

          <h3>Layout Responsivo</h3>
          <ResponsiveLayout />

          <h3>Layout de Cards</h3>
          <CardsLayout />

          <h3>Layout de Formulário</h3>
          <FormLayout />

          <h3>Layout de Dashboard</h3>
          <DashboardLayout />

          <DocBlock.Heading>Padrões Comuns</DocBlock.Heading>
          <DocBlock.Source
            dark
            code={`// Layout de página completa
<Container>
  <Row>
    <Col xs="12">
      <header>Header</header>
    </Col>
  </Row>
  <Row>
    <Col xs="12" lg="8">
      <main>Conteúdo principal</main>
    </Col>
    <Col xs="12" lg="4">
      <aside>Sidebar</aside>
    </Col>
  </Row>
  <Row>
    <Col xs="12">
      <footer>Footer</footer>
    </Col>
  </Row>
</Container>

// Grid de cards responsivo
<Container>
  <Row xs="1" sm="2" md="3" lg="4">
    <Col>
      <div className="card">Card 1</div>
    </Col>
    <Col>
      <div className="card">Card 2</div>
    </Col>
    <Col>
      <div className="card">Card 3</div>
    </Col>
    <Col>
      <div className="card">Card 4</div>
    </Col>
  </Row>
</Container>

// Formulário responsivo
<Container>
  <Row>
    <Col xs="12" sm="6">
      <label>Nome</label>
      <input type="text" />
    </Col>
    <Col xs="12" sm="6">
      <label>Sobrenome</label>
      <input type="text" />
    </Col>
  </Row>
  <Row>
    <Col xs="12">
      <label>Email</label>
      <input type="email" />
    </Col>
  </Row>
</Container>`}
          />

          <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

          <h3>Estrutura</h3>
          <ul>
            <li>Sempre use Container como wrapper principal</li>
            <li>Use Row para criar linhas horizontais</li>
            <li>Use Col para definir colunas dentro das linhas</li>
            <li>Nunca use Col fora de um Row</li>
          </ul>

          <h3>Responsividade</h3>
          <ul>
            <li>
              Defina breakpoints do menor para o maior (xs → sm → md → lg → xl)
            </li>
            <li>
              Use valores responsivos para adaptar o layout aos diferentes
              tamanhos de tela
            </li>
            <li>Teste sempre em diferentes dispositivos e orientações</li>
          </ul>

          <h3>Performance</h3>
          <ul>
            <li>Evite aninhar muitos Rows desnecessariamente</li>
            <li>Use Row Columns quando possível para simplificar o código</li>
            <li>Considere usar noGutters apenas quando realmente necessário</li>
          </ul>

          <h3>Acessibilidade</h3>
          <ul>
            <li>
              Mantenha a ordem lógica do conteúdo independente do layout visual
            </li>
            <li>
              Use landmarks HTML apropriados (header, main, aside, footer)
            </li>
            <li>Teste a navegação por teclado em diferentes breakpoints</li>
          </ul>

          <DocBlock.Heading>Breakpoints</DocBlock.Heading>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Breakpoint</th>
                <th>Largura Mínima</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>xs</code>
                </td>
                <td>0px</td>
                <td>Extra pequeno (mobile)</td>
              </tr>
              <tr>
                <td>
                  <code>sm</code>
                </td>
                <td>576px</td>
                <td>Pequeno (tablet pequeno)</td>
              </tr>
              <tr>
                <td>
                  <code>md</code>
                </td>
                <td>768px</td>
                <td>Médio (tablet)</td>
              </tr>
              <tr>
                <td>
                  <code>lg</code>
                </td>
                <td>992px</td>
                <td>Grande (desktop)</td>
              </tr>
              <tr>
                <td>
                  <code>xl</code>
                </td>
                <td>1200px</td>
                <td>Extra grande (desktop grande)</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

// Componentes de demonstração
const DemoContent = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      padding: '1.5rem',
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 2px 8px 0 rgba(60,60,60,0.07)',
      textAlign: 'center',
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#222',
      marginBottom: '1rem',
      transition: 'box-shadow 0.2s',
      ...style,
    }}
  >
    {children}
  </div>
);

const DemoWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '1rem', backgroundColor: '#ffffff' }}>{children}</div>
);

// Exemplos de layouts
const BasicLayout = () => (
  <DemoWrapper>
    <Container>
      <Row>
        <Col xs="12" md="6">
          <DemoContent>Coluna 1</DemoContent>
        </Col>
        <Col xs="12" md="6">
          <DemoContent>Coluna 2</DemoContent>
        </Col>
      </Row>
    </Container>
  </DemoWrapper>
);

const ResponsiveLayout = () => (
  <DemoWrapper>
    <Container>
      <Row>
        <Col xs="12" sm="6" md="4" lg="3">
          <DemoContent>Responsivo 1</DemoContent>
        </Col>
        <Col xs="12" sm="6" md="4" lg="3">
          <DemoContent>Responsivo 2</DemoContent>
        </Col>
        <Col xs="12" sm="6" md="4" lg="3">
          <DemoContent>Responsivo 3</DemoContent>
        </Col>
        <Col xs="12" sm="6" md="4" lg="3">
          <DemoContent>Responsivo 4</DemoContent>
        </Col>
      </Row>
    </Container>
  </DemoWrapper>
);

const CardsLayout = () => (
  <DemoWrapper>
    <Container>
      <Row xs="1" sm="2" md="3" lg="4">
        <Col>
          <DemoContent>Card 1</DemoContent>
        </Col>
        <Col>
          <DemoContent>Card 2</DemoContent>
        </Col>
        <Col>
          <DemoContent>Card 3</DemoContent>
        </Col>
        <Col>
          <DemoContent>Card 4</DemoContent>
        </Col>
      </Row>
    </Container>
  </DemoWrapper>
);

const FormLayout = () => (
  <DemoWrapper>
    <Container>
      <Row>
        <Col xs="12" md="6">
          <DemoContent>Nome</DemoContent>
        </Col>
        <Col xs="12" md="6">
          <DemoContent>Sobrenome</DemoContent>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <DemoContent>Email</DemoContent>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="8">
          <DemoContent>Endereço</DemoContent>
        </Col>
        <Col xs="12" md="4">
          <DemoContent>CEP</DemoContent>
        </Col>
      </Row>
    </Container>
  </DemoWrapper>
);

const DashboardLayout = () => (
  <DemoWrapper>
    <Container fluid>
      <Row>
        <Col xs="12" lg="3">
          <DemoContent
            style={{ background: '#f0f4fa', color: '#2a4365', fontWeight: 600 }}
          >
            Menu lateral
          </DemoContent>
        </Col>
        <Col xs="12" lg="9">
          <Row>
            <Col xs="12" md="6" lg="3">
              <DemoContent style={{ background: '#e6f7ff', color: '#005073' }}>
                Métrica 1
              </DemoContent>
            </Col>
            <Col xs="12" md="6" lg="3">
              <DemoContent style={{ background: '#e6f7ff', color: '#005073' }}>
                Métrica 2
              </DemoContent>
            </Col>
            <Col xs="12" md="6" lg="3">
              <DemoContent style={{ background: '#e6f7ff', color: '#005073' }}>
                Métrica 3
              </DemoContent>
            </Col>
            <Col xs="12" md="6" lg="3">
              <DemoContent style={{ background: '#e6f7ff', color: '#005073' }}>
                Métrica 4
              </DemoContent>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="8">
              <DemoContent
                style={{
                  background: '#f9fafb',
                  color: '#1a202c',
                  fontWeight: 600,
                }}
              >
                Gráfico principal
              </DemoContent>
            </Col>
            <Col xs="12" lg="4">
              <DemoContent
                style={{
                  background: '#fef6e4',
                  color: '#b7791f',
                  fontWeight: 600,
                }}
              >
                Informações adicionais
              </DemoContent>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </DemoWrapper>
);

export const BasicUsage: Story = {
  args: {
    fluid: false,
    children: (
      <Row>
        <Col xs="12" md="6">
          <DemoContent>Coluna 1</DemoContent>
        </Col>
        <Col xs="12" md="6">
          <DemoContent>Coluna 2</DemoContent>
        </Col>
      </Row>
    ),
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ padding: '1rem', backgroundColor: '#ffffff' }}>
        <StoryComponent />
      </div>
    ),
  ],
};
