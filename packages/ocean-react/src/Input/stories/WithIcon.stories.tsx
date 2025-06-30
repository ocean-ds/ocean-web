import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import {
  EyeOutline,
  SearchOutline,
  LockClosedOutline,
  MailOutline,
  PhoneOutline,
} from '@useblu/ocean-icons-react';
import Input from '../Input';

const ICON_LABELS = {
  buscar: 'Buscar',
  email: 'Email',
  senha: 'Senha',
  telefone: 'Telefone',
  usuario: 'Usuário',
  confirmarSenha: 'Confirmar Senha',
  codigoSeguranca: 'Código de Segurança',
  buscarProdutos: 'Buscar Produtos',
  pesquisar: 'Pesquisar',
};

const ICON_HELPER_TEXTS = {
  usePalavrasChave: 'Use palavras-chave para encontrar produtos',
  clqueOlhoVisibilidade: 'Clique no olho para alternar visibilidade',
  pressioneEnterBuscar: 'Pressione Enter para buscar',
  emailValido: 'Digite um email válido',
  senhaSegura: 'Use uma senha segura',
  telefoneComDDD: 'Inclua o DDD',
  usuarioUnico: 'Nome de usuário único',
  senhasDevemCoincidir: 'Senhas devem coincidir',
  codigoTresDigitos: 'Código de 3 dígitos',
  digite3Caracteres: 'Digite pelo menos 3 caracteres para buscar',
};

const ICON_PLACEHOLDERS = {
  buscarProdutos: 'Buscar produtos...',
  seuEmail: 'seu@email.com',
  digiteSenha: 'Digite sua senha',
  telefoneExemplo: '(11) 99999-9999',
  digitePesquisar: 'Digite para buscar...',
  nomeUsuario: 'nome_usuario',
  confirmarSenha: 'Confirme sua senha',
  cvv: 'CVV',
  buscarAqui: 'Buscar aqui...',
};

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Input com Ícones',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      name: 'type',
      description:
        'O tipo do elemento input. Define o comportamento e validação específica para cada tipo de entrada.',
      table: {
        type: { summary: '"text" | "email" | "password" | "search" | "tel"' },
        defaultValue: { summary: '"text"' },
      },
      control: {
        type: 'select',
        options: ['text', 'email', 'password', 'search', 'tel'],
      },
    },
    label: {
      name: 'label',
      description:
        'O rótulo do campo de entrada. Essencial para acessibilidade e compreensão do usuário sobre o que inserir.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    placeholder: {
      name: 'placeholder',
      description:
        'Texto de exemplo mostrado quando o input está vazio. Deve demonstrar o formato esperado ou dar dicas sobre o conteúdo.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    helperText: {
      name: 'helperText',
      description:
        'Texto de ajuda exibido abaixo do input. Use para orientações adicionais ou mensagens de validação.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    error: {
      name: 'error',
      description:
        'Quando true, aplica estilos de estado de erro ao input. Use com validação de formulário para indicar problemas.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    disabled: {
      name: 'disabled',
      description:
        'Quando true, desabilita o campo de entrada. Use quando o campo não estiver disponível ou aplicável no contexto atual.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    htmlFor: {
      control: { type: null },
    },
    adornment: {
      control: { type: null },
    },
    defaultValue: {
      control: { type: null },
    },
    position: {
      name: 'position',
      description:
        'Posição do ícone no input. &quot;left&quot; para ícones no início, &quot;right&quot; para ícones no final do campo.',
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"right"' },
      },
      control: { type: 'select', options: ['left', 'right'] },
    },
    tooltipMessage: {
      name: 'tooltipMessage',
      description:
        'Mensagem de tooltip exibida ao passar o mouse sobre o ícone de ajuda.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
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
          <h3>Tipos de Ícones por Contexto</h3>
          <DocBlock.Canvas of={Contexts} />
          <h3>Posições de Ícones</h3>
          <DocBlock.Canvas of={Positions} />
          <h3>Ícones Interativos</h3>
          <DocBlock.Canvas of={Interactive} />
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

type Story = StoryObj<typeof Input>;

// Componente de Introdução
const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente de entrada aprimorado com ícones para melhorar a experiência do
      usuário e fornecer contexto visual.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      Inputs com ícones fornecem contexto visual e usabilidade aprimorada
      através da adição de ícones relevantes aos campos de entrada. Os ícones
      podem indicar o propósito do input, fornecer funcionalidade interativa ou
      melhorar a hierarquia visual. Casos comuns incluem campos de busca,
      alternância de senha, informações de contato e gatilhos de ação.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Input } from '@useblu/ocean-react';
import {
  SearchOutline,
  EyeOutline,
  MailOutline,
} from '@useblu/ocean-icons-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Campos de formulário com ícones
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Input
    label="Email"
    name="email"
    type="email"
    placeholder="seu@email.com"
    adornment={<MailOutline size={20} />}
    helperText="Digite um email válido"
  />
  <Input
    label="Senha"
    name="password"
    type="password"
    placeholder="Digite sua senha"
    adornment={<LockClosedOutline size={20} />}
    helperText="Use uma senha segura"
  />
  <Input
    label="Telefone"
    name="phone"
    type="tel"
    placeholder="(11) 99999-9999"
    adornment={<PhoneOutline size={20} />}
    helperText="Inclua o DDD"
  />
</div>

// Ícones interativos
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Input
    label="Senha"
    name="password"
    type="password"
    placeholder="Digite sua senha"
    adornment={<EyeOutline size={20} />}
    helperText="Clique no olho para alternar visibilidade"
  />
  <Input
    label="Buscar Produtos"
    name="search"
    type="search"
    placeholder="Digite para buscar..."
    adornment={<SearchOutline size={20} />}
    helperText="Pressione Enter para buscar"
  />
</div>`}
    />
  </>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Integração com Formulários</DocBlock.Heading>

    <h3>Uso em Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    name="email"
    type="email"
    placeholder="seu@email.com"
    adornment={<MailOutline size={20} />}
    required
  />
  <Input
    label="Senha"
    name="password"
    type="password"
    placeholder="Digite sua senha"
    adornment={<LockClosedOutline size={20} />}
    required
  />
  <Button type="submit">Enviar</Button>
</form>`}
    />

    <h3>Validação</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    name="email"
    type="email"
    placeholder="seu@email.com"
    adornment={<MailOutline size={20} />}
    error={errors.email}
    helperText={errors.email || 'Digite um email válido'}
    required
  />
  <Button type="submit" disabled={!isFormValid}>
    {isSubmitting ? 'Enviando...' : 'Enviar'}
  </Button>
</form>`}
    />
  </>
);

// Melhores Práticas
const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso de Ícones</h3>
    <ul>
      <li>Use ícones que sejam intuitivos e amplamente reconhecidos</li>
      <li>Mantenha consistência no uso de ícones em toda a aplicação</li>
      <li>Escolha ícones que complementem o propósito do campo</li>
      <li>Evite ícones decorativos sem significado funcional</li>
    </ul>

    <h3>2. Posicionamento</h3>
    <ul>
      <li>
        Use ícones à direita para ações interativas (ex: mostrar/ocultar senha)
      </li>
      <li>Use ícones à esquerda para indicar o tipo de conteúdo esperado</li>
      <li>Mantenha consistência no posicionamento de ícones similares</li>
      <li>Considere o layout em dispositivos móveis ao posicionar ícones</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Forneça texto alternativo para ícones interativos</li>
      <li>
        Use <code>aria-label</code> para descrever a função do ícone
      </li>
      <li>Mantenha contraste adequado entre ícones e fundo</li>
      <li>Garanta que ícones interativos sejam facilmente clicáveis</li>
    </ul>

    <h3>4. Design e UX</h3>
    <ul>
      <li>Mantenha o tamanho dos ícones consistente (recomendado: 20px)</li>
      <li>Use cores que se integrem com o tema da aplicação</li>
      <li>Evite sobrecarregar o input com múltiplos ícones</li>
      <li>Considere estados de hover e focus para ícones interativos</li>
    </ul>
  </>
);

// Classes CSS
const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table>
      <thead>
        <tr>
          <th>Classe Global</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-input</code>
          </td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__adornment</code>
          </td>
          <td>Container do ícone de adorno.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__adornment--left</code>
          </td>
          <td>Estilos aplicados quando o ícone está à esquerda.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__adornment--right</code>
          </td>
          <td>Estilos aplicados quando o ícone está à direita.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// Referência da API
const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Input com Ícones suporta todas as props do Input padrão, além
      de props específicas para ícones.
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
          <td>adornment</td>
          <td>
            <code>ReactNode</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Elemento React (geralmente um ícone) a ser exibido como adorno do
            input.
          </td>
        </tr>
        <tr>
          <td>position</td>
          <td>
            <code>&quot;left&quot; | &quot;right&quot;</code>
          </td>
          <td>
            <code>&quot;right&quot;</code>
          </td>
          <td>
            Posição do ícone no input. &quot;left&quot; para início,
            &quot;right&quot; para final.
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td>
            <code>
              &quot;text&quot; | &quot;email&quot; | &quot;password&quot; |
              &quot;search&quot; | &quot;tel&quot;
            </code>
          </td>
          <td>
            <code>&quot;text&quot;</code>
          </td>
          <td>
            Define o comportamento e validação específica para cada tipo de
            entrada.
          </td>
        </tr>
        <tr>
          <td>label</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>O rótulo do campo de entrada. Essencial para acessibilidade.</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto de exemplo mostrado quando o input está vazio.</td>
        </tr>
        <tr>
          <td>helperText</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto de ajuda exibido abaixo do input.</td>
        </tr>
        <tr>
          <td>error</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, aplica estilos de estado de erro ao input.</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, desabilita o campo de entrada.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento input. Qualquer outra prop fornecida
      será passada para o elemento input.
    </DocBlock.Markdown>
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: ICON_LABELS.buscar,
    name: 'search',
    type: 'search',
    placeholder: ICON_PLACEHOLDERS.buscarProdutos,
    adornment: <SearchOutline size={20} />,
    position: 'right',
    helperText: ICON_HELPER_TEXTS.usePalavrasChave,
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

// Stories visuais com controles desabilitados
export const Contexts: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <Input
        label={ICON_LABELS.email}
        name="email"
        type="email"
        placeholder={ICON_PLACEHOLDERS.seuEmail}
        adornment={<MailOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.emailValido}
      />
      <Input
        label={ICON_LABELS.senha}
        name="password"
        type="password"
        placeholder={ICON_PLACEHOLDERS.digiteSenha}
        adornment={<LockClosedOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.senhaSegura}
      />
      <Input
        label={ICON_LABELS.telefone}
        name="phone"
        type="tel"
        placeholder={ICON_PLACEHOLDERS.telefoneExemplo}
        adornment={<PhoneOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.telefoneComDDD}
      />
      <Input
        label={ICON_LABELS.buscar}
        name="search"
        type="search"
        placeholder={ICON_PLACEHOLDERS.buscarAqui}
        adornment={<SearchOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.usePalavrasChave}
      />
    </div>
  ),
};

export const Positions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <Input
        label={ICON_LABELS.buscar}
        name="searchRight"
        type="search"
        placeholder={ICON_PLACEHOLDERS.buscarProdutos}
        adornment={<SearchOutline size={20} />}
        position="right"
        helperText={ICON_HELPER_TEXTS.digite3Caracteres}
      />
      <Input
        label={ICON_LABELS.buscar}
        name="searchLeft"
        type="search"
        placeholder={ICON_PLACEHOLDERS.buscarProdutos}
        adornment={<SearchOutline size={20} />}
        position="left"
        helperText={ICON_HELPER_TEXTS.digite3Caracteres}
      />
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <Input
        label={ICON_LABELS.senha}
        name="password"
        type="password"
        placeholder={ICON_PLACEHOLDERS.digiteSenha}
        adornment={<EyeOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.clqueOlhoVisibilidade}
      />
      <Input
        label={ICON_LABELS.buscar}
        name="search"
        type="search"
        placeholder={ICON_PLACEHOLDERS.digitePesquisar}
        adornment={<SearchOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.pressioneEnterBuscar}
      />
    </div>
  ),
};
