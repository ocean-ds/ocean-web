import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import {
  ArrowLeftOutline,
  DotsVertical,
  SearchOutline,
  CogOutline,
  ShareOutline,
  HeartOutline,
  BellOutline,
} from '@useblu/ocean-icons-react';
import TopBar from '../TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'O título principal da barra superior.',
      control: 'text',
    },
    description: {
      description: 'Descrição opcional exibida abaixo do título.',
      control: 'text',
    },
    variants: {
      description: 'A variante de layout da barra superior.',
      control: 'select',
      options: ['default', 'extended'],
    },
    color: {
      description: 'A variante de cor da barra superior.',
      control: 'select',
      options: ['off', 'on'],
    },
    scrollBar: {
      description: 'Adiciona uma barra de rolagem visual.',
      control: 'boolean',
    },
    leftIcon: {
      description: 'Ícone da ação esquerda.',
      control: false,
    },
    rightIcon: {
      description: 'Ícone da ação direita.',
      control: false,
    },
    onLeftAction: {
      description: 'Função chamada quando a ação esquerda é clicada.',
      control: false,
    },
    onRightAction: {
      description: 'Função chamada quando a ação direita é clicada.',
      control: false,
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
          <h3 id="variantes">Variantes</h3>
          <VariantsList />
          <DocBlock.Canvas of={Variants} />
          <h3 id="cores">Cores</h3>
          <DocBlock.Canvas of={Colors} />
          <h3 id="acoes">Ações</h3>
          <DocBlock.Canvas of={Actions} />
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

type Story = StoryObj<typeof TopBar>;

export const Usage: Story = {
  args: {
    title: 'Título da Página',
    description: 'Descrição opcional',
    leftIcon: <ArrowLeftOutline />,
    rightIcon: <DotsVertical />,
    variants: 'default',
    color: 'off',
    scrollBar: true,
    onLeftAction: () => console.log('Ação esquerda'),
    onRightAction: () => console.log('Ação direita'),
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '400px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Default</h4>
        <TopBar
          title="Layout Padrão"
          description="Título centralizado"
          leftIcon={<ArrowLeftOutline />}
          rightIcon={<DotsVertical />}
          onRightAction={() => console.log('Menu clicado')}
          onLeftAction={() => console.log('Voltar clicado')}
          scrollBar
        />
      </div>
      <div>
        <h4>Extended</h4>
        <TopBar
          variants="extended"
          title="Layout Estendido"
          description="Ações agrupadas"
          leftIcon={<ArrowLeftOutline />}
          rightIcon={<DotsVertical />}
          onRightAction={() => console.log('Menu clicado')}
          onLeftAction={() => console.log('Voltar clicado')}
          scrollBar
        />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Cor Padrão (off)</h4>
        <TopBar
          title="Cor Padrão"
          description="Fundo branco"
          leftIcon={<ArrowLeftOutline />}
          rightIcon={<DotsVertical />}
          onRightAction={() => console.log('Menu clicado')}
          onLeftAction={() => console.log('Voltar clicado')}
          color="off"
          scrollBar
        />
      </div>
      <div>
        <h4>Cor Clara (on)</h4>
        <TopBar
          title="Cor Clara"
          description="Fundo colorido"
          leftIcon={<ArrowLeftOutline />}
          rightIcon={<DotsVertical />}
          onRightAction={() => console.log('Menu clicado')}
          onLeftAction={() => console.log('Voltar clicado')}
          color="on"
          scrollBar
        />
      </div>
    </div>
  ),
};

export const Actions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Apenas Ação Direita</h4>
        <TopBar
          title="Sem Voltar"
          description="Apenas menu"
          rightIcon={<DotsVertical />}
          onRightAction={() => console.log('Menu clicado')}
          scrollBar
        />
      </div>
      <div>
        <h4>Apenas Ação Esquerda</h4>
        <TopBar
          title="Apenas Voltar"
          description="Navegação simples"
          leftIcon={<ArrowLeftOutline />}
          onLeftAction={() => console.log('Voltar clicado')}
          scrollBar
        />
      </div>
      <div>
        <h4>Ambas as Ações</h4>
        <TopBar
          title="Navegação Completa"
          description="Voltar e menu"
          leftIcon={<ArrowLeftOutline />}
          rightIcon={<DotsVertical />}
          onLeftAction={() => console.log('Voltar clicado')}
          onRightAction={() => console.log('Menu clicado')}
          scrollBar
        />
      </div>
    </div>
  ),
};

export const ContextualActions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Menu de Opções</h4>
        <TopBar
          title="Detalhes do Produto"
          description="Gerencie informações"
          rightIcon={<DotsVertical />}
          onRightAction={() => console.log('Menu de opções')}
          scrollBar
        />
      </div>
      <div>
        <h4>Busca</h4>
        <TopBar
          title="Lista de Contatos"
          description="Encontre pessoas"
          rightIcon={<SearchOutline />}
          onRightAction={() => console.log('Busca ativada')}
          scrollBar
        />
      </div>
      <div>
        <h4>Configurações</h4>
        <TopBar
          title="Perfil do Usuário"
          description="Personalize sua conta"
          rightIcon={<CogOutline />}
          onRightAction={() => console.log('Configurações')}
          scrollBar
        />
      </div>
      <div>
        <h4>Compartilhar</h4>
        <TopBar
          title="Artigo Interessante"
          description="Compartilhe conhecimento"
          rightIcon={<ShareOutline />}
          onRightAction={() => console.log('Compartilhar')}
          scrollBar
        />
      </div>
      <div>
        <h4>Favoritos</h4>
        <TopBar
          title="Receita Deliciosa"
          description="Salve para depois"
          rightIcon={<HeartOutline />}
          onRightAction={() => console.log('Favoritar')}
          scrollBar
        />
      </div>
      <div>
        <h4>Notificações</h4>
        <TopBar
          title="Dashboard"
          description="Acompanhe atualizações"
          rightIcon={<BellOutline />}
          onRightAction={() => console.log('Notificações')}
          scrollBar
        />
      </div>
    </div>
  ),
};

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      O TopBar é um componente de navegação superior que fornece uma interface
      consistente para títulos de página, ações de navegação e controles de
      interface.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O TopBar é projetado para ser usado como cabeçalho principal de páginas,
      oferecendo suporte a títulos, descrições, ícones de ação e diferentes
      variantes de layout. É ideal para aplicações móveis e web que precisam de
      uma barra de navegação superior consistente.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { TopBar } from '@useblu/ocean-react';`}
    />
  </>
);

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Exemplo básico com título
<TopBar title="Minha Página" />

// Com ações de navegação
<TopBar
  title="Detalhes"
  leftIcon={<ArrowLeftOutline />}
  rightIcon={<DotsVertical />}
  onLeftAction={() => navigate(-1)}
  onRightAction={() => setShowMenu(true)}
/>

// Com descrição
<TopBar
  title="Perfil"
  description="Gerencie suas informações"
  rightIcon={<DotsVertical />}
  onRightAction={() => setShowMenu(true)}
/>

// Variante estendida
<TopBar
  variants="extended"
  title="Configurações"
  description="Personalize sua experiência"
  leftIcon={<ArrowLeftOutline />}
  rightIcon={<DotsVertical />}
  onLeftAction={() => navigate(-1)}
  onRightAction={() => setShowOptions(true)}
/>`}
    />
  </>
);

const VariantsList = (): JSX.Element => (
  <ul>
    <li>
      <code>default</code>: Layout padrão com título centralizado e ações nas
      laterais
    </li>
    <li>
      <code>extended</code>: Layout estendido com ações agrupadas e título em
      destaque
    </li>
  </ul>
);

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Navegação Básica</h3>
    <DocBlock.Source
      dark
      code={`import { TopBar } from '@useblu/ocean-react';
import { ArrowLeftOutline, DotsVertical } from '@useblu/ocean-icons-react';

function MyPage() {
  const handleBack = () => {
    window.history.back();
  };

  const handleMenu = () => {
    setShowMenu(true);
  };

  return (
    <TopBar
      title="Minha Página"
      leftIcon={<ArrowLeftOutline />}
      rightIcon={<DotsVertical />}
      onLeftAction={handleBack}
      onRightAction={handleMenu}
      scrollBar
    />
  );
}`}
    />

    <h3>Com Descrição</h3>
    <DocBlock.Source
      dark
      code={`<TopBar
  title="Perfil do Usuário"
  description="Gerencie suas informações pessoais"
  leftIcon={<ArrowLeftOutline />}
  rightIcon={<DotsVertical />}
  onLeftAction={() => navigate(-1)}
  onRightAction={() => setShowMenu(true)}
  scrollBar
/>`}
    />

    <h3>Variante Estendida</h3>
    <DocBlock.Source
      dark
      code={`<TopBar
  variants="extended"
  title="Configurações Avançadas"
  description="Personalize sua experiência de uso"
  leftIcon={<ArrowLeftOutline />}
  rightIcon={<DotsVertical />}
  onLeftAction={() => navigate(-1)}
  onRightAction={() => setShowOptions(true)}
  color="on"
  scrollBar
/>`}
    />

    <h3>Ações Contextuais Específicas</h3>
    <DocBlock.Source
      dark
      code={`// Menu de opções
<TopBar
  title="Detalhes do Produto"
  rightIcon={<DotsVertical />}
  onRightAction={() => setShowProductMenu(true)}
/>

// Busca
<TopBar
  title="Lista de Contatos"
  rightIcon={<SearchOutline />}
  onRightAction={() => setShowSearch(true)}
/>

// Configurações
<TopBar
  title="Perfil do Usuário"
  rightIcon={<CogOutline />}
  onRightAction={() => setShowSettings(true)}
/>

// Compartilhar
<TopBar
  title="Artigo"
  rightIcon={<ShareOutline />}
  onRightAction={() => shareContent()}
/>

// Favoritos
<TopBar
  title="Receita"
  rightIcon={<HeartOutline />}
  onRightAction={() => toggleFavorite()}
/>

// Notificações
<TopBar
  title="Dashboard"
  rightIcon={<BellOutline />}
  onRightAction={() => setShowNotifications(true)}
/>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Navegação</h3>
    <ul>
      <li>
        Use <code>leftIcon</code> com <code>ArrowLeftOutline</code> para
        navegação de volta
      </li>
      <li>
        Use <code>rightIcon</code> para ações contextuais como menu, busca ou
        configurações
      </li>
      <li>
        Sempre forneça <code>onLeftAction</code> e <code>onRightAction</code>{' '}
        quando usar ícones
      </li>
    </ul>

    <h3>2. Ações Contextuais do RightIcon</h3>
    <ul>
      <li>
        <strong>Menu (DotsVertical)</strong>: Para abrir menus de opções,
        configurações ou ações
      </li>
      <li>
        <strong>Busca (SearchOutline)</strong>: Para ativar funcionalidade de
        busca ou filtros
      </li>
      <li>
        <strong>Configurações (CogOutline)</strong>: Para acessar configurações
        da página
      </li>
      <li>
        <strong>Compartilhar (ShareOutline)</strong>: Para compartilhar conteúdo
      </li>
      <li>
        <strong>Favoritos (HeartOutline)</strong>: Para marcar/desmarcar
        favoritos
      </li>
      <li>
        <strong>Notificações (BellOutline)</strong>: Para acessar notificações
      </li>
    </ul>

    <h3>2. Títulos e Descrições</h3>
    <ul>
      <li>Mantenha títulos concisos e descritivos</li>
      <li>Use descrições para fornecer contexto adicional quando necessário</li>
      <li>Evite títulos muito longos que possam quebrar o layout</li>
    </ul>

    <h3>3. Variantes</h3>
    <ul>
      <li>
        Use <code>default</code> para a maioria dos casos de uso
      </li>
      <li>
        Use <code>extended</code> quando precisar de mais destaque para o título
      </li>
      <li>
        Considere <code>color=&quot;on&quot;</code> para páginas especiais ou
        destacadas
      </li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>Sempre forneça funções de callback para ações de ícones</li>
      <li>Use ícones semanticamente apropriados para suas ações</li>
      <li>Mantenha consistência na navegação em toda a aplicação</li>
      <li>
        Considere adicionar <code>aria-label</code> para ícones quando
        necessário
      </li>
    </ul>
  </>
);

const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-topbar</code>
          </td>
          <td>Estilos aplicados ao elemento raiz da barra superior.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-extend</code>
          </td>
          <td>Estilos aplicados quando a variante é &quot;extended&quot;.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-title</code>
          </td>
          <td>Estilos aplicados ao container do título e descrição.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-left</code>
          </td>
          <td>Estilos aplicados ao container da ação esquerda.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-right</code>
          </td>
          <td>Estilos aplicados ao container da ação direita.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-actions</code>
          </td>
          <td>Estilos aplicados ao container de ações na variante extended.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-light</code>
          </td>
          <td>Estilos aplicados quando a cor é &quot;on&quot;.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-default</code>
          </td>
          <td>Estilos aplicados quando a cor é &quot;off&quot;.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-topbar-scroll-bar</code>
          </td>
          <td>Estilos aplicados quando scrollBar é true.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O TopBar é baseado em um elemento div e suporta todas as props padrão de
      div.
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
          <td>title</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>-</code>
          </td>
          <td>Título principal exibido na barra superior. Obrigatório.</td>
        </tr>
        <tr>
          <td>description</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Descrição opcional exibida abaixo do título.</td>
        </tr>
        <tr>
          <td>variants</td>
          <td>
            <code>&quot;default&quot; | &quot;extended&quot;</code>
          </td>
          <td>
            <code>&quot;default&quot;</code>
          </td>
          <td>
            Define o layout da barra superior. Default para layout padrão,
            extended para layout com ações agrupadas.
          </td>
        </tr>
        <tr>
          <td>color</td>
          <td>
            <code>&quot;off&quot; | &quot;on&quot;</code>
          </td>
          <td>
            <code>&quot;off&quot;</code>
          </td>
          <td>
            Define a variante de cor. Off para fundo branco, on para fundo
            colorido.
          </td>
        </tr>
        <tr>
          <td>scrollBar</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Quando true, adiciona uma barra de rolagem visual na parte inferior.
          </td>
        </tr>
        <tr>
          <td>leftIcon</td>
          <td>
            <code>ReactElement</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Ícone da ação esquerda. Geralmente usado para navegação de volta.
          </td>
        </tr>
        <tr>
          <td>rightIcon</td>
          <td>
            <code>ReactElement</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Ícone da ação direita. Geralmente usado para menu, busca ou
            configurações.
          </td>
        </tr>
        <tr>
          <td>onLeftAction</td>
          <td>
            <code>() =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Função chamada quando a ação esquerda é clicada.</td>
        </tr>
        <tr>
          <td>onRightAction</td>
          <td>
            <code>() =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Função chamada quando a ação direita é clicada.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento div raiz. Qualquer outra prop
      fornecida será passada para o elemento div.
    </DocBlock.Markdown>
  </>
);
