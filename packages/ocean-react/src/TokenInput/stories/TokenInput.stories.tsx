import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import TokenInput from '../TokenInput';

type Story = StoryObj<typeof TokenInput>;

// Constantes do TokenInput
const TOKEN_INPUT_DATA = {
  LABELS: {
    codigoVerificacao: 'Código de Verificação',
    codigoSMS: 'Código SMS',
    codigoEmail: 'Código do Email',
    codigoAutenticacao: 'Código de Autenticação',
    codigoSeguranca: 'Código de Segurança',
    codigoAcesso: 'Código de Acesso',
    codigoConfirmacao: 'Código de Confirmação',
    campoObrigatorio: 'Campo Obrigatório',
    codigoCurto: 'Código Curto (3 dígitos)',
    codigoLongo: 'Código Longo (8 dígitos)',
  },
  HELPER_TEXTS: {
    digiteCodigo: 'Digite o código recebido',
    verificarSMS: 'Verifique o código enviado por SMS',
    conferirEmail: 'Confira o código em seu email',
    usarAutenticador: 'Use o código do seu aplicativo autenticador',
    codigoSeguranca6: 'Código de segurança de 6 dígitos',
    acessoTemporario: 'Código de acesso temporário',
    confirmarOperacao: 'Código para confirmar a operação',
    codigoIncorreto: 'Código incorreto ou expirado',
    campoObrigatorio: 'Este campo é obrigatório',
    formatoInvalido: 'Formato do código inválido',
    codigosRapidos: 'Para códigos rápidos',
    codigosEstendidos: 'Para códigos estendidos',
    campoDesabilitado: 'Campo desabilitado',
  },
  SCENARIOS: {
    basic: { digitsQuantity: 4 },
    sms: { digitsQuantity: 6 },
    email: { digitsQuantity: 6 },
    auth: { digitsQuantity: 6 },
    security: { digitsQuantity: 6 },
    access: { digitsQuantity: 4 },
    confirmation: { digitsQuantity: 6 },
    short: { digitsQuantity: 3 },
    long: { digitsQuantity: 8 },
  },
};

// Estilos de container
const containerStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    maxWidth: '400px',
  },
};

// Componente de Introdução
const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente especializado para entrada de códigos de verificação e tokens
      numéricos com campos individuais para cada dígito.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente TokenInput oferece uma interface otimizada para entrada de
      códigos de verificação, como tokens SMS, códigos de email, ou códigos de
      autenticação. Cada dígito é exibido em um campo separado, proporcionando
      melhor experiência visual e de usabilidade. Suporta navegação automática
      entre campos e validação de formato.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Campos Individuais</strong>: Cada dígito em campo separado para
        melhor UX
      </li>
      <li>
        <strong>Navegação Automática</strong>: Avança automaticamente entre
        campos
      </li>
      <li>
        <strong>Suporte a Colagem</strong>: Permite colar códigos completos
      </li>
      <li>
        <strong>Validação Integrada</strong>: Estados de erro e validação em
        tempo real
      </li>
      <li>
        <strong>Configurável</strong>: Número de dígitos flexível conforme
        necessidade
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { TokenInput } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico
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
/>`}
    />
  </>
);

// Lista de Quantidades de Dígitos
const DigitsQuantityList = (): JSX.Element => (
  <ul>
    <li>
      <code>3 dígitos</code>: Para códigos rápidos e simples
    </li>
    <li>
      <code>4 dígitos</code>: Códigos de acesso e verificação básica
    </li>
    <li>
      <code>6 dígitos</code>: SMS, email e autenticação 2FA (mais comum)
    </li>
    <li>
      <code>8 dígitos</code>: Códigos estendidos e alta segurança
    </li>
  </ul>
);

// Demonstração de Diferentes Quantidades de Dígitos
const DigitsQuantity = (): JSX.Element => (
  <div style={containerStyles.form}>
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoCurto}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.short.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.codigosRapidos}
      onChangeToken={(value) => console.log('Token 3 dígitos:', value)}
    />
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoVerificacao}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.basic.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.digiteCodigo}
      onChangeToken={(value) => console.log('Token básico:', value)}
    />
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoSMS}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.sms.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.verificarSMS}
      onChangeToken={(value) => console.log('Token SMS:', value)}
    />
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoLongo}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.long.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.codigosEstendidos}
      onChangeToken={(value) => console.log('Token 8 dígitos:', value)}
    />
  </div>
);

// Descrição dos Estados
const StatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use as props de estado para diferentes contextos:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>error</code>: Quando o código inserido é inválido ou expirado
      </li>
      <li>
        <code>disabled</code>: Quando a entrada não está disponível
      </li>
      <li>
        <code>errorMessage</code>: Para fornecer feedback específico ao usuário
      </li>
    </ul>
  </>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={containerStyles.form}>
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.campoObrigatorio}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.auth.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.codigoIncorreto}
      error
      onChangeToken={(value) => console.log('Token com erro:', value)}
    />
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoAutenticacao}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.auth.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.usarAutenticador}
      error={false}
      onChangeToken={(value) => console.log('Token normal:', value)}
    />
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoSeguranca}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.security.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.campoDesabilitado}
      disabled
      onChangeToken={(value) => console.log('Token desabilitado:', value)}
    />
  </div>
);

// Cenários Comuns de Uso
const CommonScenarios = (): JSX.Element => (
  <div style={containerStyles.form}>
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoSMS}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.sms.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.verificarSMS}
      onChangeToken={(value) => console.log('Token SMS:', value)}
    />
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoEmail}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.email.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.conferirEmail}
      onChangeToken={(value) => console.log('Token Email:', value)}
    />
    <TokenInput
      label={TOKEN_INPUT_DATA.LABELS.codigoConfirmacao}
      digitsQuantity={TOKEN_INPUT_DATA.SCENARIOS.confirmation.digitsQuantity}
      errorMessage={TOKEN_INPUT_DATA.HELPER_TEXTS.confirmarOperacao}
      onChangeToken={(value) => console.log('Token Confirmação:', value)}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente TokenInput é ideal para códigos de verificação e
      autenticação. Aqui estão alguns exemplos práticos de implementação:
    </DocBlock.Markdown>

    <h3>Integração com Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <TokenInput
    label="Código SMS"
    digitsQuantity={6}
    name="verificationCode"
    onChangeToken={handleTokenChange}
  />
  <Button type="submit">Verificar</Button>
</form>`}
    />

    <h3>Validação em Tempo Real</h3>
    <DocBlock.Source
      dark
      code={`const [token, setToken] = useState('');
const [error, setError] = useState(false);

const handleTokenChange = (value) => {
  setToken(value);
  setError(false);
};

<TokenInput
  label="Código de Autenticação"
  digitsQuantity={6}
  value={token}
  onChangeToken={handleTokenChange}
  error={error}
  errorMessage={error ? "Código incorreto" : "Digite o código recebido"}
/>`}
    />
  </>
);

// Melhores Práticas
const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use para códigos de verificação e tokens numéricos</li>
      <li>Defina o número correto de dígitos conforme o tipo de código</li>
      <li>Forneça labels claros que indiquem o tipo de verificação</li>
      <li>Use mensagens de erro específicas para cada cenário</li>
    </ul>

    <h3>2. Quantidade de Dígitos</h3>
    <ul>
      <li>SMS: geralmente 6 dígitos</li>
      <li>Email: 4-6 dígitos</li>
      <li>Autenticação 2FA: 6 dígitos</li>
      <li>Códigos de acesso: 4-8 dígitos</li>
      <li>Considere o padrão do seu sistema</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Sempre use labels apropriados</li>
      <li>Mantenha navegação por teclado funcional</li>
      <li>Use aria-labels para contexto adicional</li>
      <li>Forneça instruções claras sobre o código esperado</li>
    </ul>

    <h3>4. Segurança</h3>
    <ul>
      <li>Não armazene tokens em localStorage</li>
      <li>Implemente timeout adequado</li>
      <li>Use HTTPS para transmissão</li>
      <li>Considere rate limiting para tentativas</li>
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
            <code>.ods-token-input</code>
          </td>
          <td>Estilos aplicados ao container principal do componente.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-token-input__input</code>
          </td>
          <td>Estilos aplicados a cada campo individual de dígito.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-token-input--error</code>
          </td>
          <td>Estilos aplicados ao componente quando error=true.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-token-input--disabled</code>
          </td>
          <td>Estilos aplicados ao componente quando disabled=true.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// Referência da API
const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>API Reference</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente TokenInput é baseado em múltiplos elementos input e suporta
      atributos customizados.
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
          <td>
            <code>label</code>
          </td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            O rótulo do campo token input. Exibido acima dos campos para
            identificação.
          </td>
        </tr>
        <tr>
          <td>
            <code>errorMessage</code>
          </td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Mensagem de erro exibida quando error é true. Substitui o helperText
            em caso de erro.
          </td>
        </tr>
        <tr>
          <td>
            <code>error</code>
          </td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Quando true, aplica o estilo de erro aos campos. Use para indicar
            problemas de validação.
          </td>
        </tr>
        <tr>
          <td>
            <code>disabled</code>
          </td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Quando true, desabilita todos os campos do token input. Use quando a
            entrada não é permitida.
          </td>
        </tr>
        <tr>
          <td>
            <code>digitsQuantity</code>
          </td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>4</code>
          </td>
          <td>
            Número de dígitos do token. Define quantos campos individuais serão
            exibidos.
          </td>
        </tr>
        <tr>
          <td>
            <code>value</code>
          </td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            O valor atual do token input. Use para controlar o estado do
            componente.
          </td>
        </tr>
        <tr>
          <td>
            <code>onChangeToken</code>
          </td>
          <td>
            <code>function</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Função chamada quando o valor muda. Recebe o valor completo do token
            como parâmetro.
          </td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento raiz. Qualquer outra prop fornecida
      será passada para o elemento raiz.
    </DocBlock.Markdown>
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: TOKEN_INPUT_DATA.LABELS.codigoVerificacao,
    digitsQuantity: TOKEN_INPUT_DATA.SCENARIOS.basic.digitsQuantity,
    errorMessage: TOKEN_INPUT_DATA.HELPER_TEXTS.digiteCodigo,
    error: false,
    disabled: false,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '300px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Stories visuais sem controles
export const DigitsQuantityVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DigitsQuantity />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const UsageScenarios: Story = {
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
    value: {
      description: 'O valor atual do token input.',
      control: 'text',
    },
    label: {
      description: 'O rótulo do campo token input.',
      control: 'text',
    },
    errorMessage: {
      description: 'Mensagem de erro exibida quando error é true.',
      control: 'text',
    },
    error: {
      description: 'Quando true, aplica o estilo de erro ao campo.',
      control: 'boolean',
    },
    disabled: {
      description: 'Quando true, desabilita o campo token input.',
      control: 'boolean',
    },
    digitsQuantity: {
      description: 'Número de dígitos do token.',
      control: 'number',
    },
    onChangeToken: {
      description: 'Função chamada quando o valor muda.',
      control: { type: null },
    },
    tooltipMessage: {
      description: 'Mensagem exibida no tooltip.',
      control: 'text',
    },
    htmlFor: {
      control: { type: null },
    },
    className: {
      control: { type: null },
    },
    autoFocus: {
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
          <h3 id="digitos">Quantidade de Dígitos</h3>
          <DigitsQuantityList />
          <DocBlock.Canvas of={DigitsQuantityVariations} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={ErrorStates} />
          <h3 id="cenarios">Cenários de Uso</h3>
          <DocBlock.Canvas of={UsageScenarios} />
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
