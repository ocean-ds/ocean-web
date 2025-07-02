import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import TokenInput from '../TokenInput';
import {
  createIntroduction,
  createCommonPatterns,
  createBestPractices,
  createCssClasses,
  createApiReference,
  createCodeList,
  createStatesDescription,
  createDefaultDecorator,
  sharedContainerStyles,
  type IntroductionConfig,
  type CommonPatternsConfig,
  type BestPracticesConfig,
  type CssClass,
  type ApiReferenceConfig,
} from '../../_stories/shared-components';

type Story = StoryObj<typeof TokenInput>;

// Configurações para componentes de documentação
const introductionConfig: IntroductionConfig = {
  description:
    'Componente especializado para entrada de códigos de verificação e tokens numéricos com campos individuais para cada dígito.',
  overview:
    'O componente TokenInput oferece uma interface otimizada para entrada de códigos de verificação, como tokens SMS, códigos de email, ou códigos de autenticação. Cada dígito é exibido em um campo separado, proporcionando melhor experiência visual e de usabilidade. Suporta navegação automática entre campos e validação de formato.',
  characteristics: [
    {
      title: 'Campos Individuais',
      description: 'Cada dígito em campo separado para melhor UX',
    },
    {
      title: 'Navegação Automática',
      description: 'Avança automaticamente entre campos',
    },
    {
      title: 'Suporte a Colagem',
      description: 'Permite colar códigos completos',
    },
    {
      title: 'Validação Integrada',
      description: 'Estados de erro e validação em tempo real',
    },
    {
      title: 'Configurável',
      description: 'Número de dígitos flexível conforme necessidade',
    },
  ],
  importPath: `import { TokenInput } from '@useblu/ocean-react';`,
};

const commonPatternsConfig: CommonPatternsConfig = {
  patterns: [
    {
      code: `// Uso básico
<TokenInput
  label="Código de Verificação"
  digitsQuantity={4}
  errorMessage="Digite o código recebido"
/>

// Com validação
<TokenInput
  label="Código SMS"
  digitsQuantity={6}
  error={hasError}
  errorMessage={hasError ? "Código incorreto" : "Verifique o código enviado por SMS"}
/>

// Controlado
<TokenInput
  label="Código de Confirmação"
  digitsQuantity={6}
  value={token}
  onChangeToken={setToken}
  errorMessage="Código para confirmar a operação"
/>`,
    },
  ],
};

const bestPracticesConfig: BestPracticesConfig = {
  sections: [
    {
      title: '1. Uso Geral',
      items: [
        'Use para códigos de verificação e tokens de autenticação',
        'Escolha a quantidade de dígitos apropriada para o contexto',
        'Forneça labels claros indicando de onde vem o código',
        'Use errorMessage para orientar sobre onde encontrar o código',
      ],
    },
    {
      title: '2. Quantidades Recomendadas',
      items: [
        '3 dígitos: Para códigos rápidos e simples',
        '4 dígitos: Códigos de acesso e verificação básica',
        '6 dígitos: SMS, email e autenticação 2FA (mais comum)',
        '8 dígitos: Códigos estendidos e alta segurança',
      ],
    },
    {
      title: '3. Experiência do Usuário',
      items: [
        'Permita colagem de códigos completos',
        'Implemente navegação automática entre campos',
        'Forneça feedback visual claro para estados de erro',
        'Considere auto-submit quando código for preenchido',
      ],
    },
    {
      title: '4. Acessibilidade',
      items: [
        'Use labels descritivos para cada campo',
        'Forneça instruções claras no errorMessage',
        'Mantenha navegação por teclado fluida',
        'Use estados visuais distintos para erro e sucesso',
      ],
    },
  ],
};

const cssClasses: CssClass[] = [
  {
    name: '.ods-token-input',
    description: 'Estilos aplicados ao elemento raiz do token input.',
  },
  {
    name: '.ods-token-input__field',
    description: 'Estilos aplicados a cada campo individual de dígito.',
  },
  {
    name: '.ods-token-input__field--filled',
    description: 'Estilos aplicados aos campos que contêm dígitos.',
  },
  {
    name: '.ods-token-input__field--focused',
    description: 'Estilos aplicados ao campo atualmente focado.',
  },
  {
    name: '.ods-token-input--error',
    description:
      'Estilos aplicados quando o componente está em estado de erro.',
  },
  {
    name: '.ods-token-input--disabled',
    description: 'Estilos aplicados quando o componente está desabilitado.',
  },
];

const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente TokenInput é baseado em múltiplos elementos input[type="text"] para entrada de códigos numéricos.',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'O rótulo do campo token input. Exibido acima dos campos.',
    },
    {
      name: 'digitsQuantity',
      type: 'number',
      defaultValue: '6',
      description: 'Número de dígitos/campos a serem exibidos.',
    },
    {
      name: 'errorMessage',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Mensagem de instrução ou erro exibida abaixo dos campos.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Quando true, aplica o estilo de erro ao componente.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Quando true, desabilita todos os campos.',
    },
    {
      name: 'value',
      type: 'string',
      defaultValue: 'undefined',
      description: 'O valor atual do token (modo controlado).',
    },
    {
      name: 'onChangeToken',
      type: '(value: string) => void',
      defaultValue: 'undefined',
      description: 'Callback chamado quando o valor do token muda.',
    },
    {
      name: 'onComplete',
      type: '(value: string) => void',
      defaultValue: 'undefined',
      description: 'Callback chamado quando todos os dígitos são preenchidos.',
    },
  ],
  footer:
    'O componente gerencia automaticamente o foco e a navegação entre os campos individuais.',
};

// Criação dos componentes usando os factories
const Introduction = createIntroduction(introductionConfig);
const CommonPatterns = createCommonPatterns(commonPatternsConfig);
const BestPractices = createBestPractices(bestPracticesConfig);
const CssClasses = createCssClasses(cssClasses);
const ApiReference = createApiReference(apiReferenceConfig);

// Lista de Quantidades de Dígitos
const DigitsQuantityList = createCodeList([
  { code: '3 dígitos', description: 'Para códigos rápidos e simples' },
  { code: '4 dígitos', description: 'Códigos de acesso e verificação básica' },
  {
    code: '6 dígitos',
    description: 'SMS, email e autenticação 2FA (mais comum)',
  },
  { code: '8 dígitos', description: 'Códigos estendidos e alta segurança' },
]);

// Descrição dos Estados
const StatesDescription = createStatesDescription([
  {
    state: 'error',
    description: 'Quando o código inserido é inválido ou expirado',
  },
  { state: 'disabled', description: 'Quando a entrada não está disponível' },
  {
    state: 'errorMessage',
    description: 'Para fornecer feedback específico ao usuário',
  },
]);

// Demonstração de Diferentes Quantidades de Dígitos
const DigitsQuantity = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <TokenInput
      label="Código Curto (3 dígitos)"
      digitsQuantity={3}
      errorMessage="Para códigos rápidos"
      onChangeToken={(value) => console.log('Token 3 dígitos:', value)}
    />
    <TokenInput
      label="Código de Verificação"
      digitsQuantity={4}
      errorMessage="Digite o código recebido"
      onChangeToken={(value) => console.log('Token básico:', value)}
    />
    <TokenInput
      label="Código SMS"
      digitsQuantity={6}
      errorMessage="Verifique o código enviado por SMS"
      onChangeToken={(value) => console.log('Token SMS:', value)}
    />
    <TokenInput
      label="Código Longo (8 dígitos)"
      digitsQuantity={8}
      errorMessage="Para códigos estendidos"
      onChangeToken={(value) => console.log('Token 8 dígitos:', value)}
    />
  </div>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <TokenInput
      label="Código Incorreto"
      digitsQuantity={6}
      error
      errorMessage="Código incorreto ou expirado"
      onChangeToken={(value) => console.log('Token com erro:', value)}
    />
    <TokenInput
      label="Código de Verificação"
      digitsQuantity={6}
      errorMessage="Digite o código recebido"
      onChangeToken={(value) => console.log('Token normal:', value)}
    />
    <TokenInput
      label="Campo Desabilitado"
      digitsQuantity={6}
      disabled
      errorMessage="Campo desabilitado"
      onChangeToken={(value) => console.log('Token desabilitado:', value)}
    />
  </div>
);

// Demonstração de Cenários Comuns
const CommonScenarios = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <TokenInput
      label="Código SMS"
      digitsQuantity={6}
      errorMessage="Verifique o código enviado por SMS"
      onChangeToken={(value) => console.log('SMS:', value)}
    />
    <TokenInput
      label="Código do Email"
      digitsQuantity={6}
      errorMessage="Confira o código em seu email"
      onChangeToken={(value) => console.log('Email:', value)}
    />
    <TokenInput
      label="Código de Autenticação"
      digitsQuantity={6}
      errorMessage="Use o código do seu aplicativo autenticador"
      onChangeToken={(value) => console.log('2FA:', value)}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Verificação por SMS</h3>
    <DocBlock.Source
      dark
      code={`<TokenInput
  label="Código SMS"
  digitsQuantity={6}
  errorMessage="Digite o código enviado para seu celular"
  onChangeToken={handleSMSCode}
  onComplete={handleCodeComplete}
/>`}
    />

    <h3>Autenticação 2FA</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <TokenInput
    label="Código do Autenticador"
    digitsQuantity={6}
    error={hasError}
    errorMessage={hasError ? "Código inválido" : "Use o código do seu app autenticador"}
    onChangeToken={setAuthCode}
  />
  <Button type="submit">Verificar</Button>
</form>`}
    />

    <h3>Com Validação</h3>
    <DocBlock.Source
      dark
      code={`const [code, setCode] = useState('');
const [error, setError] = useState(false);

const handleCodeChange = (value) => {
  setCode(value);
  if (value.length === 6) {
    // Validar código
    const isValid = validateCode(value);
    setError(!isValid);
  }
};

<TokenInput
  label="Código de Verificação"
  digitsQuantity={6}
  value={code}
  onChangeToken={handleCodeChange}
  error={error}
  errorMessage={error ? "Código inválido" : "Digite o código recebido"}
/>`}
    />
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: 'Código de Verificação',
    digitsQuantity: 6,
    errorMessage: 'Digite o código recebido',
    error: false,
    disabled: false,
  },
  decorators: createDefaultDecorator(),
};

// Stories visuais com controles desabilitados
export const DigitsQuantityStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DigitsQuantity />,
};

export const StatesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const CommonScenariosStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <CommonScenarios />,
};

// Meta configuration
const meta: Meta<typeof TokenInput> = {
  title: 'Components/Inputs/TokenInput',
  component: TokenInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'O rótulo do token input.',
      control: 'text',
    },
    digitsQuantity: {
      description: 'Número de dígitos a serem exibidos.',
      control: 'number',
    },
    errorMessage: {
      description: 'Mensagem de instrução ou erro.',
      control: 'text',
    },
    error: {
      description: 'Quando true, aplica o estilo de erro.',
      control: 'boolean',
    },
    disabled: {
      description: 'Quando true, desabilita o componente.',
      control: 'boolean',
    },
    value: {
      description: 'Valor atual do token.',
      control: 'text',
    },
    onChangeToken: {
      description: 'Callback chamado quando valor muda.',
      control: { type: null },
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
          <h3 id="quantidades-digitos">Quantidades de Dígitos</h3>
          <DigitsQuantityList />
          <DocBlock.Canvas of={DigitsQuantityStory} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={StatesStory} />
          <h3 id="cenarios-comuns">Cenários Comuns</h3>
          <DocBlock.Canvas of={CommonScenariosStory} />
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
