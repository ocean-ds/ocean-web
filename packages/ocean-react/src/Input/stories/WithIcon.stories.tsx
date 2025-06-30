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
import {
  commonArgTypes,
  SharedCssClasses,
  SharedUsageExamples,
  createApiReference,
  createIntroduction,
  createCommonPatterns,
  defaultUsageDecorator,
  containerStyles,
  commonCodeExamples,
} from './_shared';

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
    ...commonArgTypes,
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
    adornment: {
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
const Introduction = createIntroduction(
  'Componente de entrada aprimorado com ícones para melhorar a experiência do usuário e fornecer contexto visual.',
  'Inputs com ícones fornecem contexto visual e usabilidade aprimorada através da adição de ícones relevantes aos campos de entrada. Os ícones podem indicar o propósito do input, fornecer funcionalidade interativa ou melhorar a hierarquia visual. Casos comuns incluem campos de busca, alternância de senha, informações de contato e gatilhos de ação.'
);

// Padrões Comuns
const CommonPatterns = createCommonPatterns([
  commonCodeExamples.withIcon,
  `// Campos de formulário com ícones
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
</div>`,
  `// Ícones interativos
<Input
  label="Senha"
  name="password"
  type="password"
  placeholder="Digite sua senha"
  adornment={<EyeOutline size={20} />}
  helperText="Clique no olho para alternar visibilidade"
/>`,
]);

// Exemplos de Uso
const UsageExamples = SharedUsageExamples;

// Melhores Práticas específicas para ícones
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
const CssClasses = SharedCssClasses;

// Referência da API
const ApiReference = createApiReference([
  {
    prop: 'adornment',
    type: 'React.ReactElement',
    default: 'undefined',
    description:
      'Ícone ou elemento adicional exibido junto ao input. Use para contexto visual ou funcionalidade extra.',
  },
  {
    prop: 'position',
    type: '"left" | "right"',
    default: '"right"',
    description:
      'Posição do adorno. Use left para símbolos de contexto, right para ícones de ação.',
  },
]);

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
  decorators: defaultUsageDecorator,
};

// Stories visuais com controles desabilitados
export const Contexts: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={containerStyles.form}>
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
    <div style={containerStyles.form}>
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
    <div style={containerStyles.form}>
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
