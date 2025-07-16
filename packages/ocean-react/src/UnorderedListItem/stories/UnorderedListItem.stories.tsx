import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import { Cash, CashOutline } from '@useblu/ocean-icons-react';
import UnorderedListItem from '../UnorderedListItem';

const meta: Meta<typeof UnorderedListItem> = {
  title: 'Components/List/UnorderedListItem',
  component: UnorderedListItem,
  tags: ['autodocs'],
  argTypes: {
    description: {
      description: 'Texto descritivo do item da lista.',
      control: 'text',
    },
    iconVariant: {
      description: 'A variante do ícone a ser exibido.',
      control: 'select',
      options: ['chevron', 'outline', 'solid'],
    },
    icon: {
      description:
        'Ícone personalizado a ser exibido (quando iconVariant não é chevron).',
      control: false,
    },
    title: {
      description: 'Título opcional do item da lista.',
      control: 'text',
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
          <h3 id="variantes">Variantes de Ícone</h3>
          <IconVariantsList />
          <DocBlock.Canvas of={IconVariants} />
          <h3 id="com-titulo">Com Título</h3>
          <DocBlock.Canvas of={WithTitle} />
          <h3 id="sem-titulo">Sem Título</h3>
          <DocBlock.Canvas of={WithoutTitle} />
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

type Story = StoryObj<typeof UnorderedListItem>;

const containerStyle = {
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap' as const,
};

const usageContainerStyle = {
  ...containerStyle,
  minWidth: '300px',
  alignItems: 'flex-start' as const,
  justifyContent: 'center' as const,
};

export const Usage: Story = {
  args: {
    description:
      'Lorem ipsum dolor sit amet consectetur porta feugiat faucibus scelerisque.',
    iconVariant: 'outline',
    title: 'Lorem ipsum',
    icon: CashOutline,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={usageContainerStyle}>
        <StoryComponent />
      </div>
    ),
  ],
};

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente para exibir itens de lista não ordenada com ícones e
      descrições.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O UnorderedListItem é usado para criar itens de lista com ícones e textos
      descritivos. Suporta diferentes variantes de ícones (chevron, outline,
      solid) e pode incluir um título opcional. Ideal para listas de recursos,
      benefícios ou itens de navegação.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { UnorderedListItem } from '@useblu/ocean-react';`}
    />
  </>
);

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Exemplo básico com chevron
<UnorderedListItem 
  description="Descrição do item"
  iconVariant="chevron"
/>

// Exemplo com ícone outline
<UnorderedListItem 
  description="Descrição do item"
  iconVariant="outline"
  icon={CashOutline}
/>

// Exemplo com título e ícone solid
<UnorderedListItem 
  title="Título do item"
  description="Descrição detalhada"
  iconVariant="solid"
  icon={Cash}
/>`}
    />
  </>
);

const IconVariantsList = (): JSX.Element => (
  <ul>
    <li>
      <code>chevron</code>: Ícone de seta para direita (padrão)
    </li>
    <li>
      <code>outline</code>: Ícone outline personalizado (24px)
    </li>
    <li>
      <code>solid</code>: Ícone solid personalizado (20px)
    </li>
  </ul>
);

export const IconVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={containerStyle}>
      <UnorderedListItem
        title="Item com chevron padrão"
        description="Item com chevron padrão"
        iconVariant="chevron"
      />
      <UnorderedListItem
        title="Item com ícone outline"
        description="Item com ícone outline"
        iconVariant="outline"
        icon={CashOutline}
      />
      <UnorderedListItem
        title="Item com ícone solid"
        description="Item com ícone solid"
        iconVariant="solid"
        icon={Cash}
      />
    </div>
  ),
};

export const WithTitle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={containerStyle}>
      <UnorderedListItem
        title="Título do item"
        description="Descrição detalhada do item com título"
        iconVariant="outline"
        icon={CashOutline}
      />
      <UnorderedListItem
        title="Item com chevron"
        description="Descrição com chevron padrão"
        iconVariant="chevron"
      />
    </div>
  ),
};

export const WithoutTitle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={containerStyle}>
      <UnorderedListItem
        description="Item sem título, apenas descrição"
        iconVariant="outline"
        icon={CashOutline}
      />
      <UnorderedListItem
        description="Item simples com chevron"
        iconVariant="chevron"
      />
    </div>
  ),
};

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Lista de Benefícios</h3>
    <DocBlock.Source
      dark
      code={`<div>
  <UnorderedListItem 
    title="Segurança"
    description="Seus dados estão protegidos com criptografia de ponta a ponta"
    iconVariant="solid"
    icon={Shield}
  />
  <UnorderedListItem 
    title="Velocidade"
    description="Transações processadas em segundos"
    iconVariant="solid"
    icon={Lightning}
  />
  <UnorderedListItem 
    title="Suporte 24/7"
    description="Atendimento disponível a qualquer momento"
    iconVariant="solid"
    icon={Support}
  />
</div>`}
    />

    <h3>Navegação Simples</h3>
    <DocBlock.Source
      dark
      code={`<div>
  <UnorderedListItem 
    description="Configurações da conta"
    iconVariant="chevron"
  />
  <UnorderedListItem 
    description="Histórico de transações"
    iconVariant="chevron"
  />
  <UnorderedListItem 
    description="Preferências de notificação"
    iconVariant="chevron"
  />
</div>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Escolha de Ícones</h3>
    <ul>
      <li>
        Use <code>chevron</code> para navegação e listas simples
      </li>
      <li>
        Use <code>outline</code> para ícones informativos e descritivos
      </li>
      <li>
        Use <code>solid</code> para ícones de destaque e call-to-actions
      </li>
      <li>Mantenha consistência visual em toda a lista</li>
    </ul>

    <h3>2. Conteúdo</h3>
    <ul>
      <li>Mantenha descrições concisas e claras</li>
      <li>Use títulos quando o item precisar de destaque</li>
      <li>Evite textos muito longos que quebrem o layout</li>
      <li>Escolha ícones que representem claramente o conteúdo</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Forneça descrições significativas para leitores de tela</li>
      <li>Use ícones como complemento visual, não como única informação</li>
      <li>Mantenha contraste adequado entre texto e fundo</li>
      <li>Teste a navegação por teclado quando usado em listas clicáveis</li>
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
            <code>.ods-unordered-list-item</code>
          </td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-unordered-list-item__icon</code>
          </td>
          <td>Estilos aplicados ao ícone.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-unordered-list-item__icon--solid</code>
          </td>
          <td>Estilos específicos para ícones solid.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-unordered-list-item__icon-container</code>
          </td>
          <td>Estilos aplicados ao container do ícone chevron.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-unordered-list-item__title</code>
          </td>
          <td>Estilos aplicados ao título.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-unordered-list-item__title--with-solid-icon</code>
          </td>
          <td>Estilos específicos para título com ícone solid.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-unordered-list-item__description</code>
          </td>
          <td>Estilos aplicados à descrição quando não há título.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente é baseado no elemento div e suporta todos os atributos padrão
      relevantes.
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
          <td>description</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>-</code>
          </td>
          <td>Texto descritivo obrigatório do item da lista.</td>
        </tr>
        <tr>
          <td>iconVariant</td>
          <td>
            <code>
              &quot;chevron&quot; | &quot;outline&quot; | &quot;solid&quot;
            </code>
          </td>
          <td>
            <code>-</code>
          </td>
          <td>
            Define a variante do ícone. Chevron para navegação, outline/solid
            para ícones personalizados.
          </td>
        </tr>
        <tr>
          <td>icon</td>
          <td>
            <code>IconType</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Ícone personalizado a ser exibido quando iconVariant não é chevron.
          </td>
        </tr>
        <tr>
          <td>title</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Título opcional do item da lista.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento div raiz. Qualquer outra prop
      fornecida será passada para o elemento apropriado.
    </DocBlock.Markdown>
  </>
);
