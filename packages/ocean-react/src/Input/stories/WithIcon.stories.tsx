import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import {
  EyeOutline,
  EyeOffOutline,
  LockClosedOutline,
  MailOutline,
  PhoneOutline,
  CreditCardOutline,
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
  email: 'Email',
  senha: 'Senha',
  telefone: 'Telefone',
  usuario: 'Usuário',
  confirmarSenha: 'Confirmar Senha',
  codigoSeguranca: 'Código de Segurança',
};

const ICON_HELPER_TEXTS = {
  clqueOlhoMostrar: 'Clique no olho para mostrar a senha',
  clqueOlhoVisibilidade: 'Clique no olho para alternar visibilidade',
  emailValido: 'Digite um email válido',
  senhaSegura: 'Use uma senha segura',
  telefoneComDDD: 'Inclua o DDD',
  usuarioUnico: 'Nome de usuário único',
  senhasDevemCoincidir: 'Senhas devem coincidir',
  codigoTresDigitos: 'Código de 3 dígitos',
};

const ICON_PLACEHOLDERS = {
  seuEmail: 'seu@email.com',
  digiteSenha: 'Digite sua senha',
  telefoneExemplo: '(11) 99999-9999',
  nomeUsuario: 'nome_usuario',
  confirmarSenha: 'Confirme sua senha',
  cvv: 'CVV',
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
        type: { summary: '"text" | "email" | "password" | "tel"' },
        defaultValue: { summary: '"text"' },
      },
      control: {
        type: 'select',
        options: ['text', 'email', 'password', 'tel'],
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
          <DocBlock.Markdown>
            Demonstração de ícones funcionais que respondem a cliques do
            usuário. O ícone indica a ação que será executada quando clicado:
          </DocBlock.Markdown>
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
  'Inputs com ícones fornecem contexto visual e usabilidade aprimorada através da adição de ícones relevantes aos campos de entrada. Os ícones podem indicar o propósito do input, fornecer funcionalidade interativa ou melhorar a hierarquia visual. Casos comuns incluem alternância de senha, informações de contato, códigos de segurança e gatilhos de ação.'
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
  `// Ícones interativos - alternância de senha
const [showPassword, setShowPassword] = useState(false);

<Input
  label="Senha"
  name="password"
  type={showPassword ? 'text' : 'password'}
  placeholder="Digite sua senha"
  adornment={
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
    >
      {showPassword ? <EyeOffOutline size={20} /> : <EyeOutline size={20} />}
    </button>
  }
  helperText={showPassword ? 'Clique para ocultar' : 'Clique para mostrar'}
/>

// CVV com ícone de cartão
<Input
  label="CVV"
  name="cvv"
  type="text"
  placeholder="123"
  adornment={<CreditCardOutline size={20} />}
  helperText="Código de 3 dígitos"
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
      <li>
        Para ícones interativos, use elementos clicáveis com handlers
        apropriados
      </li>
      <li>Evite ícones decorativos sem significado funcional</li>
    </ul>

    <h3>2. Posicionamento e Comportamento</h3>
    <ul>
      <li>
        Use ícones à direita para ações interativas (ex: alternar visibilidade
        da senha)
      </li>
      <li>
        Use ícones à esquerda para indicar o tipo de conteúdo esperado (ex:
        email, telefone)
      </li>
      <li>
        Para ícones interativos, mostre a ação que será executada, não o estado
        atual
      </li>
      <li>Mantenha consistência no posicionamento de ícones similares</li>
      <li>Considere o layout em dispositivos móveis ao posicionar ícones</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Forneça texto alternativo para ícones interativos</li>
      <li>
        Use <code>aria-label</code> para descrever a função do ícone
      </li>
      <li>
        Para ícones interativos, use elementos <code>button</code> apropriados
      </li>
      <li>Mantenha contraste adequado entre ícones e fundo</li>
      <li>
        Garanta que ícones interativos sejam facilmente clicáveis (mínimo 44px)
      </li>
      <li>Forneça feedback visual claro para estados de hover e focus</li>
    </ul>

    <h3>4. Design e UX</h3>
    <ul>
      <li>Mantenha o tamanho dos ícones consistente (recomendado: 24px)</li>
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
    label: ICON_LABELS.email,
    name: 'email',
    type: 'email',
    placeholder: ICON_PLACEHOLDERS.seuEmail,
    adornment: <MailOutline size={20} />,
    position: 'right',
    helperText: ICON_HELPER_TEXTS.emailValido,
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
        label={ICON_LABELS.codigoSeguranca}
        name="cvv"
        type="text"
        placeholder={ICON_PLACEHOLDERS.cvv}
        adornment={<CreditCardOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.codigoTresDigitos}
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
        label={ICON_LABELS.email}
        name="emailRight"
        type="email"
        placeholder={ICON_PLACEHOLDERS.seuEmail}
        adornment={<MailOutline size={20} />}
        position="right"
        helperText={ICON_HELPER_TEXTS.emailValido}
      />
      <Input
        label={ICON_LABELS.email}
        name="emailLeft"
        type="email"
        placeholder={ICON_PLACEHOLDERS.seuEmail}
        adornment={<MailOutline size={20} />}
        position="left"
        helperText={ICON_HELPER_TEXTS.emailValido}
      />
    </div>
  ),
};

const InteractivePasswordInput = (): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Input
      label={ICON_LABELS.senha}
      name="password"
      type={showPassword ? 'text' : 'password'}
      placeholder={ICON_PLACEHOLDERS.digiteSenha}
      adornment={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showPassword ? (
            <EyeOffOutline size={20} />
          ) : (
            <EyeOutline size={20} />
          )}
        </button>
      }
      helperText={
        showPassword
          ? 'Clique no olho para ocultar a senha'
          : 'Clique no olho para mostrar a senha'
      }
    />
  );
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={containerStyles.form}>
      <InteractivePasswordInput />
      <Input
        label={ICON_LABELS.confirmarSenha}
        name="confirmPassword"
        type="password"
        placeholder={ICON_PLACEHOLDERS.confirmarSenha}
        adornment={<LockClosedOutline size={20} />}
        helperText={ICON_HELPER_TEXTS.senhasDevemCoincidir}
      />
    </div>
  ),
};
