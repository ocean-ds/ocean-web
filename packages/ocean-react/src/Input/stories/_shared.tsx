import * as DocBlock from '@storybook/blocks';
import React from 'react';

// Configurações comuns de ArgTypes
export const commonArgTypes = {
  type: {
    description: 'O tipo do input que define comportamento e validação.',
    control: 'select',
    options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
  },
  label: {
    description: 'O rótulo do campo que identifica seu propósito.',
    control: 'text',
  },
  placeholder: {
    description: 'Texto de exemplo que aparece quando o campo está vazio.',
    control: 'text',
  },
  helperText: {
    description: 'Texto auxiliar que fornece contexto ou instruções.',
    control: 'text',
  },
  error: {
    description: 'Define se o campo está em estado de erro.',
    control: 'boolean',
  },
  disabled: {
    description: 'Desabilita a interação com o campo.',
    control: 'boolean',
  },
  required: {
    description: 'Marca o campo como obrigatório.',
    control: 'boolean',
  },
  defaultValue: {
    table: { disable: true },
  },
  htmlFor: {
    table: { disable: true },
  },
};

// ArgTypes específicos para adornments
export const adornmentSpecificProps = {
  adornment: {
    table: { disable: true },
  },
  position: {
    table: { disable: true },
  },
};

// ArgTypes específicos para tooltip
export const tooltipSpecificProps = {
  tooltipMessage: {
    description: 'Mensagem de tooltip para informações contextuais.',
    control: 'text',
  },
};

// ArgTypes específicos para currency
export const currencySpecificProps = {
  type: {
    description:
      'O tipo do elemento input. Sempre "text" para inputs de moeda para melhor controle de formatação.',
    control: { type: null },
  },
  adornment: {
    description:
      'Símbolo ou código da moeda exibido dentro do input. Use símbolos ($, €, £) para posição esquerda, códigos (USD, EUR) para direita.',
    control: { type: null },
  },
  position: {
    description:
      'Posição do adorno da moeda. Esquerda é comum para símbolos, direita para códigos de moeda.',
    control: { type: 'select' },
    options: ['left', 'right'],
  },
  placeholder: {
    description:
      'Texto de exemplo para o input. Deve corresponder às casas decimais esperadas (ex: "0,00").',
    control: { type: 'text' },
  },
  helperText: {
    description:
      'Texto de ajuda exibido abaixo do input. Contexto adicional sobre moeda, formatação ou regras de cálculo.',
    control: { type: 'text' },
  },
  error: {
    description:
      'Define os estilos do input para estado de erro. Use com validação para valores monetários inválidos.',
    control: { type: 'boolean' },
  },
  disabled: {
    description:
      'Desabilita o campo de entrada. Use para valores monetários calculados ou somente leitura.',
    control: { type: 'boolean' },
  },
  defaultValue: {
    description: 'Valor padrão do campo de entrada.',
    control: { type: null },
  },
  tooltipMessage: {
    description: 'Mensagem exibida no tooltip do label.',
    control: { type: 'text' },
  },
};

// Decorator padrão para stories
export const defaultUsageDecorator = [
  (Story: React.ComponentType): JSX.Element => (
    <div style={{ minWidth: '300px' }}>
      <Story />
    </div>
  ),
];

// Componente de introdução customizável
export const createIntroduction =
  (description: string, overview: string, features?: string[]) =>
  // eslint-disable-next-line react/display-name
  (): JSX.Element => {
    const IntroductionComponent = (): JSX.Element => (
      <>
        <DocBlock.Title />
        <DocBlock.Markdown>{description}</DocBlock.Markdown>
        <DocBlock.Heading>Visão Geral</DocBlock.Heading>
        <DocBlock.Markdown>{overview}</DocBlock.Markdown>
        {features && (
          <>
            <h3>Principais Características</h3>
            <ul>
              {features.map((feature) => (
                <li
                  key={feature.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30)}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: feature }}
                />
              ))}
            </ul>
          </>
        )}
        <DocBlock.Heading>Importação</DocBlock.Heading>
        <DocBlock.Source
          dark
          code={`import { Input } from '@useblu/ocean-react';`}
        />
      </>
    );
    IntroductionComponent.displayName = 'IntroductionComponent';
    return <IntroductionComponent />;
  };

// Common patterns customizáveis
export const createCommonPatterns =
  (codeExamples: string[]) =>
  // eslint-disable-next-line react/display-name
  (): JSX.Element => {
    const CommonPatternsComponent = (): JSX.Element => (
      <>
        <DocBlock.Source dark code={codeExamples.join('\n\n')} />
      </>
    );
    CommonPatternsComponent.displayName = 'CommonPatternsComponent';
    return <CommonPatternsComponent />;
  };

// Componentes de documentação compartilhados
const SharedBestPracticesComponent = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Formulários</h3>
    <ul>
      <li>
        Use labels descritivos que indiquem claramente o conteúdo esperado
      </li>
      <li>Forneça placeholders informativos que demonstrem o formato</li>
      <li>Implemente validação clara com mensagens úteis</li>
      <li>Agrupe campos relacionados logicamente</li>
    </ul>

    <h3>2. Acessibilidade</h3>
    <ul>
      <li>Mantenha contraste adequado entre texto e fundo</li>
      <li>Use textos de ajuda para orientar o usuário</li>
      <li>Implemente navegação por teclado consistente</li>
      <li>Forneça feedback claro para estados de erro</li>
    </ul>

    <h3>3. Performance</h3>
    <ul>
      <li>Use debouncing para validação em tempo real quando apropriado</li>
      <li>Evite re-renderizações desnecessárias</li>
      <li>Implemente lazy loading para listas grandes</li>
    </ul>

    <h3>4. Experiência do Usuário</h3>
    <ul>
      <li>Mantenha consistência visual em toda a aplicação</li>
      <li>Forneça feedback imediato para ações do usuário</li>
      <li>Use animações suaves para transições de estado</li>
      <li>Teste em diferentes dispositivos e tamanhos de tela</li>
    </ul>
  </>
);
SharedBestPracticesComponent.displayName = 'SharedBestPractices';
export const SharedBestPractices = SharedBestPracticesComponent;

// Melhores práticas específicas para tooltip
const TooltipBestPracticesComponent = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso de Tooltips</h3>
    <ul>
      <li>Use tooltips para informações complementares, não essenciais</li>
      <li>Mantenha as mensagens concisas e diretas</li>
      <li>Evite duplicar informações já presentes no helperText</li>
      <li>Use para explicar regras de validação complexas</li>
    </ul>

    <h3>2. Conteúdo</h3>
    <ul>
      <li>Foque em informações práticas e acionáveis</li>
      <li>Use linguagem clara e direta</li>
      <li>Evite jargões técnicos desnecessários</li>
      <li>Mantenha consistência no tom e estilo</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Garanta que informações críticas não dependam apenas do tooltip</li>
      <li>Mantenha contraste adequado no texto do tooltip</li>
      <li>Considere usuários que não podem usar mouse</li>
      <li>Forneça alternativas para informações importantes</li>
    </ul>

    <h3>4. Design e UX</h3>
    <ul>
      <li>Posicione tooltips de forma consistente</li>
      <li>Use animações suaves para aparecer/desaparecer</li>
      <li>Evite tooltips muito longos</li>
      <li>Considere o contexto mobile</li>
    </ul>
  </>
);
TooltipBestPracticesComponent.displayName = 'TooltipBestPractices';
export const TooltipBestPractices = TooltipBestPracticesComponent;

// Melhores práticas específicas para currency
const CurrencyBestPracticesComponent = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Formatação</h3>
    <ul>
      <li>
        Use o tipo &quot;text&quot; ao invés de &quot;number&quot; para melhor
        controle
      </li>
      <li>Implemente formatação automática durante a digitação</li>
      <li>Mantenha consistência no número de casas decimais</li>
      <li>
        Use separadores apropriados para cada localização (vírgula vs ponto)
      </li>
    </ul>

    <h3>2. Símbolos de Moeda</h3>
    <ul>
      <li>Posicione símbolos (R$, $, €) à esquerda do valor</li>
      <li>Use códigos de moeda (BRL, USD, EUR) à direita quando necessário</li>
      <li>Mantenha consistência na escolha entre símbolos e códigos</li>
      <li>Considere o contexto internacional da aplicação</li>
    </ul>

    <h3>3. Validação</h3>
    <ul>
      <li>Implemente validação de valores mínimos e máximos</li>
      <li>Forneça feedback claro para valores inválidos</li>
      <li>
        Considere regras específicas do negócio (ex: não permitir valores
        negativos)
      </li>
      <li>Valide casas decimais de acordo com a moeda</li>
    </ul>

    <h3>4. Experiência do Usuário</h3>
    <ul>
      <li>Use placeholders que demonstrem o formato esperado</li>
      <li>Forneça textos de ajuda com contexto sobre cálculos</li>
      <li>Considere calculadoras automáticas para campos relacionados</li>
      <li>Teste com diferentes valores e cenários extremos</li>
    </ul>
  </>
);
CurrencyBestPracticesComponent.displayName = 'CurrencyBestPractices';
export const CurrencyBestPractices = CurrencyBestPracticesComponent;

// Tabela de classes CSS compartilhada
const SharedCssClassesComponent = (): JSX.Element => (
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
            <code>.ods-input__label</code>
          </td>
          <td>Estilos aplicados ao rótulo do input.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__input</code>
          </td>
          <td>Estilos aplicados ao elemento input.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__helper-text</code>
          </td>
          <td>Estilos aplicados ao texto de ajuda.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--error</code>
          </td>
          <td>Estilos aplicados quando o input está em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--disabled</code>
          </td>
          <td>Estilos aplicados quando o input está desabilitado.</td>
        </tr>
      </tbody>
    </table>
  </>
);
SharedCssClassesComponent.displayName = 'SharedCssClasses';
export const SharedCssClasses = SharedCssClassesComponent;

// Classes CSS específicas para tooltip
const TooltipCssClassesComponent = (): JSX.Element => (
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
            <code>.ods-input__label</code>
          </td>
          <td>Container do rótulo com ícone de tooltip.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__tooltip</code>
          </td>
          <td>Estilos do tooltip.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__input</code>
          </td>
          <td>Estilos aplicados ao elemento input.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__helper-text</code>
          </td>
          <td>Estilos aplicados ao texto de ajuda.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--error</code>
          </td>
          <td>Estilos aplicados quando o input está em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--disabled</code>
          </td>
          <td>Estilos aplicados quando o input está desabilitado.</td>
        </tr>
      </tbody>
    </table>
  </>
);
TooltipCssClassesComponent.displayName = 'TooltipCssClasses';
export const TooltipCssClasses = TooltipCssClassesComponent;

// API Reference customizável
export const createApiReference = (
  specificProps?: Array<{
    prop: string;
    type: string;
    default: string;
    description: string;
  }>
): (() => JSX.Element) => {
  const ApiReference = (): JSX.Element => (
    <>
      <DocBlock.Heading>API Reference</DocBlock.Heading>
      <table>
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
              <code>type</code>
            </td>
            <td>
              <code>
                &quot;text&quot; | &quot;email&quot; | &quot;password&quot; |
                &quot;number&quot; | &quot;tel&quot; | &quot;url&quot; |
                &quot;search&quot;
              </code>
            </td>
            <td>
              <code>&quot;text&quot;</code>
            </td>
            <td>O tipo do input que define comportamento e validação.</td>
          </tr>
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
            <td>O rótulo do campo que identifica seu propósito.</td>
          </tr>
          <tr>
            <td>
              <code>placeholder</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>undefined</code>
            </td>
            <td>Texto de exemplo que aparece quando o campo está vazio.</td>
          </tr>
          <tr>
            <td>
              <code>helperText</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>undefined</code>
            </td>
            <td>Texto auxiliar que fornece contexto ou instruções.</td>
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
            <td>Define se o campo está em estado de erro.</td>
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
            <td>Desabilita a interação com o campo.</td>
          </tr>
          <tr>
            <td>
              <code>required</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Marca o campo como obrigatório.</td>
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
            <td>Valor controlado do input.</td>
          </tr>
          <tr>
            <td>
              <code>defaultValue</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>undefined</code>
            </td>
            <td>Valor padrão do input não controlado.</td>
          </tr>
          <tr>
            <td>
              <code>onChange</code>
            </td>
            <td>
              <code>
                (event: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void
              </code>
            </td>
            <td>
              <code>undefined</code>
            </td>
            <td>Callback executado quando o valor do input muda.</td>
          </tr>
          <tr>
            <td>
              <code>onBlur</code>
            </td>
            <td>
              <code>
                (event: FocusEvent&lt;HTMLInputElement&gt;) =&gt; void
              </code>
            </td>
            <td>
              <code>undefined</code>
            </td>
            <td>Callback executado quando o input perde o foco.</td>
          </tr>
          <tr>
            <td>
              <code>onFocus</code>
            </td>
            <td>
              <code>
                (event: FocusEvent&lt;HTMLInputElement&gt;) =&gt; void
              </code>
            </td>
            <td>
              <code>undefined</code>
            </td>
            <td>Callback executado quando o input recebe o foco.</td>
          </tr>
          {specificProps &&
            specificProps.map((prop) => (
              <tr key={prop.prop}>
                <td>
                  <code>{prop.prop}</code>
                </td>
                <td>
                  <code>{prop.type}</code>
                </td>
                <td>
                  <code>{prop.default}</code>
                </td>
                <td>{prop.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
  ApiReference.displayName = 'ApiReference';
  return ApiReference;
};

// Exemplos de uso compartilhados
const SharedUsageExamplesComponent = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <p>
      O componente Input é extremamente versátil e pode ser usado em diversas
      situações. Aqui estão alguns exemplos práticos de implementação:
    </p>

    <h3>Formulário de Contato</h3>
    <DocBlock.Source
      dark
      code={`<Input
  type="text"
  label="Nome completo"
  placeholder="Digite seu nome completo"
  required
/>

<Input
  type="email"
  label="E-mail"
  placeholder="seu@email.com"
  helperText="Utilizaremos para enviar confirmações"
  required
/>

<Input
  type="tel"
  label="Telefone"
  placeholder="(11) 99999-9999"
  helperText="Formato: (XX) XXXXX-XXXX"
/>`}
    />

    <h3>Validação em Tempo Real</h3>
    <DocBlock.Source
      dark
      code={`const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState(false);

const validateEmail = (value: string) => {
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
  setEmailError(!isValid && value.length > 0);
};

<Input
  type="email"
  label="E-mail"
  value={email}
  error={emailError}
  helperText={emailError ? "Formato de e-mail inválido" : "Digite seu e-mail"}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
/>`}
    />

    <h3>Estados de Input</h3>
    <DocBlock.Source
      dark
      code={`// Input normal
<Input label="Nome" placeholder="Digite seu nome" />

// Input com erro
<Input 
  label="E-mail"
  value="email-inválido"
  error
  helperText="Formato de e-mail inválido"
/>

// Input desabilitado
<Input 
  label="Código"
  value="ABC123"
  disabled
  helperText="Código gerado automaticamente"
/>`}
    />
  </>
);
SharedUsageExamplesComponent.displayName = 'SharedUsageExamples';
export const SharedUsageExamples = SharedUsageExamplesComponent;

// Biblioteca de exemplos de código
export const commonCodeExamples = {
  basicUsage: `<Input
  type="text"
  label="Nome"
  placeholder="Digite seu nome"
/>`,

  withValidation: `<Input
  type="email"
  label="E-mail"
  placeholder="seu@email.com"
  error={emailError}
  helperText={emailError ? "E-mail inválido" : "Digite seu e-mail"}
/>`,

  disabled: `<Input
  label="Código"
  value="ABC123"
  disabled
  helperText="Gerado automaticamente"
/>`,

  withIcon: `<Input
  type="search"
  label="Buscar"
  placeholder="Digite para buscar..."
  adornment={<SearchIcon />}
  position="left"
/>`,

  currency: `<Input
  type="text"
  label="Valor"
  placeholder="0,00"
  adornment="R$"
  position="left"
  helperText="Valor em reais"
/>`,

  tooltip: `<Input
  label="Campo com Tooltip"
  placeholder="Digite algo..."
  helperText="Texto de ajuda"
  tooltipMessage="Informação adicional sobre este campo"
/>`,
};

// Estilos de container compartilhados
export const containerStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    maxWidth: '400px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    maxWidth: '800px',
  },
  inline: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-end',
    flexWrap: 'wrap' as const,
  },
};

// Constantes comuns de texto
export const COMMON_LABELS = {
  email: 'Email',
  senha: 'Senha',
  telefone: 'Telefone',
  nomeCompleto: 'Nome Completo',
  cpfCnpj: 'CPF/CNPJ',
};

export const COMMON_PLACEHOLDERS = {
  seuEmail: 'seu@email.com',
  digiteSenha: 'Digite sua senha',
  telefoneExemplo: '(11) 99999-9999',
  nomeCompleto: 'João Silva',
  cpfExemplo: '000.000.000-00',
};

export const COMMON_HELPER_TEXTS = {
  emailVerificacao: 'Usado para verificação da conta',
  senhaForte: 'Escolha uma senha forte',
  incluaDDD: 'Inclua o DDD',
  primeiroUltimoNome: 'Primeiro e último nome',
  identificacaoFiscal: 'Identificação fiscal pessoal ou empresarial',
};

export const COMMON_TOOLTIPS = {
  senhaRequisitos:
    'A senha deve ter pelo menos 8 caracteres e incluir números e caracteres especiais',
  emailPrivacidade:
    'Usamos seu email para verificação de conta e notificações importantes.',
  telefoneFormato:
    'Digite seu número de telefone com DDD. Formato: (XX) XXXXX-XXXX para celular ou (XX) XXXX-XXXX para fixo',
  cpfCnpjFormato:
    'Digite seu CPF (para pessoas físicas) ou CNPJ (para empresas). Use apenas números ou inclua pontos e traços',
};

// Parâmetros de controle padrão para Usage story
export const defaultUsageControls = {
  include: [
    'type',
    'label',
    'placeholder',
    'helperText',
    'error',
    'disabled',
    'required',
    'tooltipMessage',
  ],
};

// API Reference padrão para tooltip
export const tooltipApiReference = [
  {
    prop: 'tooltipMessage',
    type: 'string',
    default: 'undefined',
    description: 'Mensagem de tooltip para informações contextuais.',
  },
];
