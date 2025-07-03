import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Button from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'A variante visual do botão.',
      control: 'select',
      options: [
        'primary',
        'primaryCritical',
        'secondary',
        'secondaryCritical',
        'tertiary',
        'tertiaryCritical',
        'textTertiary',
        'textTertiaryCritical',
        'inverse',
      ],
    },
    size: {
      description: 'O tamanho do botão.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    blocked: {
      description: 'Faz o botão ocupar toda a largura do container pai.',
      control: 'boolean',
    },
    loading: {
      description: 'Exibe um estado de carregamento alterando o conteúdo.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o botão.',
      control: 'boolean',
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
          <h3>Variantes</h3>
          <VariantsList />
          <DocBlock.Canvas of={Variants} />
          <h3>Tamanhos</h3>
          <DocBlock.Canvas of={Size} />
          <h3>Botão Bloco</h3>
          <BlockedDescription />
          <DocBlock.Canvas of={Blocked} />
          <h3>Estado Desabilitado</h3>
          <DisabledDescription />
          <DocBlock.Canvas of={Disabled} />
          <h3>Estado Carregando</h3>
          <LoadingDescription />
          <DocBlock.Canvas of={Loading} />
          <h3>Tamanho do Botão Carregando</h3>
          <DocBlock.Canvas of={LoadingSize} />
          <h3>Tipo de Botão</h3>
          <ButtonTypeDescription />
          <ButtonType />
          <UsageExample />
          <FormIntegration />
          <BestPractices />
          <CssClasses />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Aciona uma ação ou evento, como enviar um formulário ou exibir um diálogo.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Button é um elemento fundamental da interface do usuário
      usado para acionar ações ou eventos. Ele suporta vários estilos, tamanhos
      e estados para acomodar diferentes casos de uso e requisitos de design.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Button } from '@useblu/ocean-react';`}
    />
  </>
);

export const Usage: Story = {
  args: {
    children: 'Clique Aqui!',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Botão de ação principal
<Button variant="primary">Salvar</Button>

// Botão secundário para ações alternativas
<Button variant="secondary">Cancelar</Button>

// Botão de texto para ações sutis
<Button variant="tertiary">Editar</Button>

// Botão em formulários
<form onSubmit={handleSubmit}>
  <Button type="submit">Enviar Formulário</Button>
</form>`}
    />
  </>
);

const VariantsList = () => (
  <ul>
    <li>
      <code>primary</code>: Para ações principais e call-to-actions
    </li>
    <li>
      <code>primaryCritical</code>: Para ações principais destrutivas
    </li>
    <li>
      <code>secondary</code>: Para ações secundárias e alternativas
    </li>
    <li>
      <code>secondaryCritical</code>: Para ações secundárias destrutivas
    </li>
    <li>
      <code>tertiary</code>: Para ações terciárias discretas
    </li>
    <li>
      <code>tertiaryCritical</code>: Para ações terciárias destrutivas
    </li>
    <li>
      <code>textTertiary</code>: Para ações terciárias discretas
    </li>
    <li>
      <code>textTertiaryCritical</code>: Para ações terciárias destrutivas
    </li>
    <li>
      <code>inverse</code>: Para ações inversas em fundos escuros
    </li>
  </ul>
);

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">primary</Button>
      <Button variant="primaryCritical">primaryCritical</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="secondaryCritical">secondaryCritical</Button>
      <Button variant="tertiary">tertiary</Button>
      <Button variant="tertiaryCritical">tertiaryCritical</Button>
      <Button variant="textTertiary">textTertiary</Button>
      <Button variant="textTertiaryCritical">textTertiaryCritical</Button>
      <Button variant="inverse">inverse</Button>
    </div>
  ),
};

export const Size: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

export const Blocked: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
        minWidth: '300px',
      }}
    >
      <Button blocked>Botão Bloco</Button>
    </div>
  ),
};

const BlockedDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use a prop `blocked` para fazer o botão ocupar toda a largura do container
      pai:
    </DocBlock.Markdown>
    <ul>
      <li>Botões de envio de formulário</li>
      <li>Interfaces mobile</li>
      <li>Rodapés de cards ou modais</li>
    </ul>
  </>
);

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button variant="primary" disabled>
        Primary Desabilitado
      </Button>
      <Button variant="primaryCritical" disabled>
        Primary Critical Desabilitado
      </Button>
      <Button variant="secondary" disabled>
        Secondary Desabilitado
      </Button>
      <Button variant="secondaryCritical" disabled>
        Secondary Critical Desabilitado
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary Desabilitado
      </Button>
      <Button variant="tertiaryCritical" disabled>
        Tertiary Critical Desabilitado
      </Button>
      <Button variant="textTertiary" disabled>
        Text Tertiary Desabilitado
      </Button>
      <Button variant="textTertiaryCritical" disabled>
        Text Tertiary Critical Desabilitado
      </Button>
      <Button variant="inverse" disabled>
        Inverse Desabilitado
      </Button>
    </div>
  ),
};

const DisabledDescription = (): JSX.Element => (
  <>
    <ul>
      <li>Quando a ação não está disponível</li>
      <li>Quando campos obrigatórios não foram preenchidos</li>
      <li>Durante processamento</li>
    </ul>
    <DocBlock.Markdown>
      Use a prop `disabled` para impedir a interação do usuário:
    </DocBlock.Markdown>
  </>
);

export const Loading: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button variant="primary" loading>
        Primary Carregando
      </Button>
      <Button variant="primaryCritical" loading>
        Primary Critical Carregando
      </Button>
      <Button variant="secondary" loading>
        Secondary Carregando
      </Button>
      <Button variant="secondaryCritical" loading>
        Secondary Critical Carregando
      </Button>
      <Button variant="tertiary" loading>
        Tertiary Carregando
      </Button>
      <Button variant="tertiaryCritical" loading>
        Tertiary Critical Carregando
      </Button>
      <Button variant="textTertiary" loading>
        Text Tertiary Carregando
      </Button>
      <Button variant="textTertiaryCritical" loading>
        Text Tertiary Critical Carregando
      </Button>
      <Button variant="inverse" loading>
        Inverse Carregando
      </Button>
    </div>
  ),
};

const LoadingDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use a prop `loading` para exibir um estado de carregamento:
    </DocBlock.Markdown>
    <ul>
      <li>Durante envios de formulário</li>
      <li>Durante operações assíncronas</li>
      <li>Para prevenir cliques duplos</li>
    </ul>
  </>
);

export const LoadingSize: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button size="sm" loading>
        Pequeno
      </Button>
      <Button size="md" loading>
        Médio
      </Button>
      <Button size="lg" loading>
        Grande
      </Button>
    </div>
  ),
};

const ButtonTypeDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      O componente Button suporta todos os tipos padrão de botão HTML. O
      atributo `type` determina o comportamento do botão em formulários e
      interações.
    </DocBlock.Markdown>
  </>
);

const ButtonType = (): JSX.Element => (
  <table style={{ width: '100%' }}>
    <thead>
      <tr>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Caso de Uso</th>
        <th>Exemplo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>button</td>
        <td>Tipo padrão de botão</td>
        <td>Ações gerais, interações JavaScript</td>
        <td>
          <DocBlock.Source code={`<Button type="button">Clique</Button>`} />
        </td>
      </tr>
      <tr>
        <td>submit</td>
        <td>Envia dados do formulário</td>
        <td>Envios de formulário, salvamento de dados</td>
        <td>
          <DocBlock.Source code={`<Button type="submit">Salvar</Button>`} />
        </td>
      </tr>
      <tr>
        <td>reset</td>
        <td>Reseta campos do formulário</td>
        <td>Funcionalidade de reset de formulário</td>
        <td>
          <DocBlock.Source code={`<Button type="reset">Limpar</Button>`} />
        </td>
      </tr>
    </tbody>
  </table>
);

const UsageExample = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <h3>Envio de Formulário</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Nome" />
  <input type="email" placeholder="Email" />
  <Button type="submit">Enviar Formulário</Button>
  <Button type="button" variant="secondary">
    Cancelar
  </Button>
</form>`}
    />

    <h3>Reset de Formulário</h3>
    <DocBlock.Source
      dark
      code={`<form>
  <input type="text" placeholder="Nome" />
  <input type="email" placeholder="Email" />
  <Button type="submit">Salvar</Button>
  <Button type="reset" variant="secondary">
    Limpar Formulário
  </Button>
</form>`}
    />

    <h3>Ação Personalizada</h3>
    <DocBlock.Source
      dark
      code={`<Button type="button" onClick={handleClick}>
  Ação Personalizada
</Button>`}
    />
  </>
);

const FormIntegration = (): JSX.Element => (
  <>
    <DocBlock.Heading>Integração com Formulários</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Button pode ser usado em formulários HTML para acionar ações
      específicas.
    </DocBlock.Markdown>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="name">Nome:</label>
    <input id="name" name="name" type="text" required />
  </div>
  <div>
    <label htmlFor="email">Email:</label>
    <input id="email" name="email" type="email" required />
  </div>
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button type="submit" loading={isSubmitting}>
      {isSubmitting ? 'Enviando...' : 'Enviar'}
    </Button>
    <Button type="button" variant="secondary" onClick={handleCancel}>
      Cancelar
    </Button>
  </div>
</form>`}
    />
    <h3>Validação</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <input type="email" required />
  <Button type="submit" disabled={!isFormValid} loading={isSubmitting}>
    {isSubmitting ? 'Validando...' : 'Criar Conta'}
  </Button>
</form>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>
    <h3>1. Envios de Formulário</h3>
    <ul>
      <li>
        Use <code>type=&quot;submit&quot;</code> para o botão principal de envio
        do formulário
      </li>
      <li>
        Use <code>type=&quot;button&quot;</code> para ações secundárias em
        formulários
      </li>
      <li>
        Use <code>type=&quot;reset&quot;</code> com parcimônia e apenas quando o
        reset do formulário for necessário
      </li>
    </ul>
    <h3>2. Interações JavaScript</h3>
    <ul>
      <li>
        Use <code>type=&quot;button&quot;</code> para botões que acionam funções
        JavaScript
      </li>
      <li>Isso previne envios acidentais de formulário</li>
    </ul>
    <h3>3. Acessibilidade</h3>
    <ul>
      <li>
        Sempre especifique o atributo <code>type</code>
      </li>
      <li>Use tipos apropriados para melhor suporte a leitores de tela</li>
      <li>Mantenha comportamento consistente em toda a aplicação</li>
      <li>Forneça feedback visual claro para estados (loading, disabled)</li>
      <li>Use textos descritivos que indiquem claramente a ação</li>
    </ul>
    <h3>4. Design e UX</h3>
    <ul>
      <li>
        Use <code>primary</code> para ações principais (máximo 1 por tela)
      </li>
      <li>
        Use <code>secondary</code> para ações alternativas
      </li>
      <li>
        Use <code>tertiary</code> para ações sutis ou links
      </li>
    </ul>
  </>
);

const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>CSS Classes</DocBlock.Heading>
    <table>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>.ods-btn</td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>.ods-btn--primary</td>
          <td>Define cor de fundo e texto primária do botão.</td>
        </tr>
        <tr>
          <td>.ods-btn--primary-critical</td>
          <td>Define estilos do botão primary critical.</td>
        </tr>
        <tr>
          <td>.ods-btn--secondary</td>
          <td>Define cor de fundo e texto secundária do botão.</td>
        </tr>
        <tr>
          <td>.ods-btn--secondary-critical</td>
          <td>Define estilos do botão secondary critical.</td>
        </tr>
        <tr>
          <td>.ods-btn--tertiary</td>
          <td>Define estilos do botão tertiary.</td>
        </tr>
        <tr>
          <td>.ods-btn--tertiary-critical</td>
          <td>Define estilos do botão tertiary critical.</td>
        </tr>
        <tr>
          <td>.ods-btn--text-tertiary</td>
          <td>Define estilos do botão text tertiary.</td>
        </tr>
        <tr>
          <td>.ods-btn--text-tertiary-critical</td>
          <td>Define estilos do botão text tertiary critical.</td>
        </tr>
        <tr>
          <td>.ods-btn--inverse</td>
          <td>Use o botão inverse em fundos escuros.</td>
        </tr>
        <tr>
          <td>.ods-btn--blocked</td>
          <td>Faz o botão ocupar toda a largura do container pai.</td>
        </tr>
      </tbody>
    </table>
  </>
);
