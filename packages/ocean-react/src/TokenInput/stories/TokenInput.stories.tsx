import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import TokenInput from '../TokenInput';

const meta: Meta<typeof TokenInput> = {
  title: 'Components/Inputs/TokenInput',
  component: TokenInput,
  tags: ['autodocs'],
  argTypes: {
    digitsQuantity: {
      description: 'Quantidade de dígitos do token.',
      control: 'number',
    },
    label: {
      description: 'Rótulo descritivo do campo.',
      control: 'text',
    },
    error: {
      description: 'Quando true, exibe o estilo de erro.',
      control: 'boolean',
    },
    errorMessage: {
      description: 'Mensagem de erro exibida quando error é true.',
      control: 'text',
    },
    disabled: {
      description: 'Desabilita o campo e impede edição.',
      control: 'boolean',
    },
    autoFocus: {
      description: 'Foca automaticamente no primeiro campo.',
      control: 'boolean',
    },
    className: {
      table: { disable: true },
    },
    tooltipMessage: {
      table: { disable: true },
    },
    htmlFor: {
      table: { disable: true },
    },
    onChangeToken: {
      table: { disable: true },
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
          <h3>Quantidades de Dígitos</h3>
          <DigitsQuantityDescription />
          <DocBlock.Canvas of={DigitsQuantity} />
          <h3>Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={States} />
          <h3>Validação</h3>
          <ValidationDescription />
          <DocBlock.Canvas of={Validation} />
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

type Story = StoryObj<typeof TokenInput>;

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Campo de entrada especializado para códigos de verificação, tokens e PINs.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente TokenInput é um campo de entrada especializado que divide a
      entrada de um código em múltiplos campos individuais. É comumente usado
      para códigos de verificação, tokens de autenticação, PINs e outros tipos
      de entrada de código sequencial. O componente suporta navegação automática
      entre campos, validação, estados de erro e diferentes quantidades de
      dígitos.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { TokenInput } from '@useblu/ocean-react';`}
    />
  </>
);

export const Usage: Story = {
  args: {
    label: 'Código de Verificação',
    digitsQuantity: 4,
    error: false,
    errorMessage: 'Código incorreto.',
    disabled: false,
    autoFocus: true,
  },
  render: (args) => (
    <TokenInput
      {...args}
      onChangeToken={(value: string) => console.log('Token:', value)}
    />
  ),
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
      code={`// Código de verificação básico
<TokenInput
  label="Código de Verificação"
  digitsQuantity={4}
  onChangeToken={(value) => setToken(value)}
/>

// Código de verificação com validação
<TokenInput
  label="Código de Verificação"
  digitsQuantity={6}
  error={isInvalid}
  errorMessage="Código incorreto. Tente novamente."
  onChangeToken={(value) => validateToken(value)}
/>`}
    />
  </>
);

const DigitsQuantityDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      O componente TokenInput suporta diferentes quantidades de dígitos para
      diferentes tipos de código:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>4 dígitos</code>: PINs e códigos curtos
      </li>
      <li>
        <code>6 dígitos</code>: Códigos de verificação TOKEN/Email
      </li>
      <li>
        <code>8 dígitos</code>: Códigos de autenticação estendidos
      </li>
    </ul>
  </>
);

export const DigitsQuantity: Story = {
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
        justifyContent: 'center',
      }}
    >
      <TokenInput
        label="4 dígitos"
        digitsQuantity={4}
        onChangeToken={(value) => console.log('4 digits:', value)}
      />
      <TokenInput
        label="6 dígitos"
        digitsQuantity={6}
        onChangeToken={(value) => console.log('6 digits:', value)}
      />
      <TokenInput
        label="8 dígitos"
        digitsQuantity={8}
        onChangeToken={(value) => console.log('8 digits:', value)}
      />
    </div>
  ),
};

const StatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      O componente TokenInput suporta diferentes estados visuais:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>disabled</code>: Quando o campo não está disponível para edição
      </li>
      <li>
        <code>error</code>: Quando há erro de validação ou código inválido
      </li>
    </ul>
  </>
);

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
      }}
    >
      <TokenInput
        label="Normal"
        digitsQuantity={4}
        onChangeToken={(value) => console.log('Normal:', value)}
      />
      <TokenInput
        label="Desabilitado"
        digitsQuantity={4}
        disabled
        onChangeToken={(value) => console.log('Disabled:', value)}
      />
      <TokenInput
        label="Erro"
        digitsQuantity={4}
        error
        errorMessage="Código incorreto"
        onChangeToken={(value) => console.log('Error:', value)}
      />
    </div>
  ),
};

const ValidationDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Exemplo de validação com mensagens de erro dinâmicas:
    </DocBlock.Markdown>
  </>
);

const ValidationExample = (): JSX.Element => {
  const [token, setToken] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const correctToken = '1234';

  const handleTokenChange = (value: string) => {
    setToken(value);
    if (value.length === 4) {
      setIsValid(value === correctToken);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div style={{ minWidth: '300px' }}>
      <TokenInput
        label="Digite o código correto (1234)"
        digitsQuantity={4}
        error={!isValid}
        errorMessage={!isValid ? 'Código incorreto. Tente novamente.' : ''}
        onChangeToken={handleTokenChange}
      />
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <p>Token atual: {token}</p>
        <p>Status: {isValid ? 'Válido' : 'Inválido'}</p>
        <p>Dica: Digite &quot;1234&quot; para ver a validação</p>
      </div>
    </div>
  );
};

export const Validation: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <ValidationExample />,
};

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Verificação de Código TOKEN</h3>
    <DocBlock.Source
      dark
      code={`const [TokenCode, setTokenCode] = useState('');
const [isValidating, setIsValidating] = useState(false);
const [error, setError] = useState('');

const handleTokenVerification = async (code: string) => {
  if (code.length === 6) {
    setIsValidating(true);
    try {
      await verifyTokenCode(code);
      setError('');
    } catch (err) {
      setError('Código inválido. Tente novamente.');
    } finally {
      setIsValidating(false);
    }
  }
};

return (
  <TokenInput
    label="Código de Verificação TOKEN"
    digitsQuantity={6}
    error={!!error}
    errorMessage={error}
    disabled={isValidating}
    onChangeToken={handleTokenVerification}
  />
);`}
    />

    <h3>Código de Autenticação</h3>
    <DocBlock.Source
      dark
      code={`const [authCode, setAuthCode] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);

const handleAuthCodeSubmit = async (code: string) => {
  if (code.length === 8) {
    setIsSubmitting(true);
    try {
      await authenticateWithCode(code);
      onAuthSuccess();
    } catch (error) {
      onAuthError('Código de autenticação inválido.');
    } finally {
      setIsSubmitting(false);
    }
  }
};

return (
  <form onSubmit={handleSubmit}>
    <TokenInput
      label="Código de Autenticação"
      digitsQuantity={8}
      disabled={isSubmitting}
      onChangeToken={handleAuthCodeSubmit}
    />
    <Button type="submit" disabled={authCode.length !== 8 || isSubmitting}>
      {isSubmitting ? 'Verificando...' : 'Autenticar'}
    </Button>
  </form>
);`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Quantidade de Dígitos</h3>
    <ul>
      <li>Use 4 dígitos para PINs e códigos curtos</li>
      <li>Use 6 dígitos para códigos de verificação TOKEN/Email padrão</li>
      <li>Use 8 dígitos para códigos de autenticação estendidos</li>
    </ul>

    <h3>2. Labels e Mensagens</h3>
    <ul>
      <li>Sempre forneça um label descritivo</li>
      <li>Use mensagens de erro claras e específicas</li>
      <li>Indique quantos dígitos são esperados</li>
    </ul>

    <h3>3. Validação</h3>
    <ul>
      <li>Valide o código apenas quando todos os dígitos forem preenchidos</li>
      <li>Forneça feedback imediato para códigos inválidos</li>
      <li>Considere implementar tentativas limitadas para segurança</li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>Use autoFocus para melhor experiência do usuário</li>
      <li>Forneça labels apropriados para leitores de tela</li>
      <li>Mantenha feedback visual claro para todos os estados</li>
    </ul>

    <h3>5. Experiência do Usuário</h3>
    <ul>
      <li>Permita colagem de códigos completos</li>
      <li>Implemente navegação automática entre campos</li>
      <li>Suporte backspace para navegação reversa</li>
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
            <code>.ods-token-input</code>
          </td>
          <td>Estilos aplicados ao container principal do componente.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-token-input__input</code>
          </td>
          <td>Estilos aplicados a cada campo de entrada individual.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-token-input--error</code>
          </td>
          <td>Estilos aplicados quando o componente está em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-token-input--disabled</code>
          </td>
          <td>Estilos aplicados quando o componente está desabilitado.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente TokenInput é baseado em campos de entrada HTML e suporta
      eventos de teclado, foco e colagem. Ele herda props do FormControl para
      labels, tooltips e mensagens de erro.
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
          <td>digitsQuantity</td>
          <td>
            <code>number</code>
          </td>
          <td>-</td>
          <td>Quantidade de dígitos do token. Obrigatório.</td>
        </tr>
        <tr>
          <td>onChangeToken</td>
          <td>
            <code>(value: string) =&gt; void</code>
          </td>
          <td>-</td>
          <td>
            Função callback chamada quando o token é alterado. Obrigatório.
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
          <td>Rótulo descritivo do campo de entrada.</td>
        </tr>
        <tr>
          <td>error</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Quando true, exibe o estilo de erro para indicar validação falhou.
          </td>
        </tr>
        <tr>
          <td>errorMessage</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Mensagem de erro exibida quando error é true.</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, desabilita o campo e impede edição.</td>
        </tr>
        <tr>
          <td>autoFocus</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>true</code>
          </td>
          <td>
            Quando true, foca automaticamente no primeiro campo ao carregar.
          </td>
        </tr>
        <tr>
          <td>tooltipMessage</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Mensagem de ajuda exibida em tooltip no label.</td>
        </tr>
        <tr>
          <td>htmlFor</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>ID do elemento para associação com label.</td>
        </tr>
        <tr>
          <td>className</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Classes CSS adicionais aplicadas ao componente.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      O componente também suporta todas as propriedades padrão de input HTML.
      Qualquer outra prop fornecida será passada para os elementos de input
      individuais.
    </DocBlock.Markdown>
  </>
);
