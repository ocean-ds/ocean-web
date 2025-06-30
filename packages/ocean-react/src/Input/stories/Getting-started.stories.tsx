import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import {
  SearchOutline,
  MailOutline,
  LockClosedOutline,
} from '@useblu/ocean-icons-react';
import Input from '../Input';

const INPUT_GETTING_STARTED_LABELS = {
  emailAddress: 'Email',
  fullName: 'Nome Completo',
  username: 'Nome de Usuário',
  secureField: 'Senha',
  age: 'Idade',
  phoneNumber: 'Telefone',
  searchProducts: 'Buscar Produtos',
  complexSecureField: 'Senha Complexa',
  taxId: 'CPF/CNPJ',
  normalField: 'Campo Normal',
  errorField: 'Campo com Erro',
  disabledField: 'Campo Desabilitado',
  registrationTitle: 'Formulário de Registro',
  ecommerceTitle: 'Formulário de E-commerce',
  productName: 'Nome do Produto',
  price: 'Preço',
  quantityStock: 'Quantidade em Estoque',
  sku: 'SKU',
};

const INPUT_GETTING_STARTED_HELPER_TEXTS = {
  emailVerification: 'Usado para verificação da conta',
  fullNameFormat: 'Nome e sobrenome',
  usernameRules: '3-20 caracteres, letras e números apenas',
  securityRequirement: 'Mínimo 8 caracteres',
  ageRequirement: 'Deve ser maior de 18 anos',
  phoneFormat: 'Inclua o DDD',
  searchKeywords: 'Use palavras-chave para encontrar produtos',
  securityAdvice: 'Escolha uma senha segura',
  taxIdInfo: 'CPF para pessoas físicas ou CNPJ para empresas',
  normalState: 'Estado normal do campo',
  validationError: 'Por favor, insira um email válido',
  autoFilled: 'Este campo é preenchido automaticamente',
  productTitle: 'Título descritivo do produto',
  sellingPrice: 'Preço de venda do produto',
  availableInventory: 'Inventário disponível',
  uniqueIdentifier: 'Identificador único do produto',
};

const INPUT_GETTING_STARTED_PLACEHOLDERS = {
  emailExample: 'seu@email.com',
  fullNameExample: 'Digite seu nome completo',
  usernameExample: 'Escolha um nome de usuário',
  secureFieldExample: 'Digite sua senha',
  ageExample: 'Digite sua idade',
  phoneExample: '(11) 99999-9999',
  searchExample: 'Digite sua busca...',
  strongSecureFieldExample: 'Digite uma senha forte',
  invalidEmail: 'email-inválido',
  cannotEdit: 'Não pode editar',
  productNameExample: 'Digite o nome do produto',
  priceExample: '0,00',
  quantityExample: '0',
  skuExample: 'PROD-001',
  typeHere: 'Digite algo...',
};

const INPUT_GETTING_STARTED_TOOLTIPS = {
  securityRequirementsTooltip:
    'A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais',
  taxIdPurpose:
    'Digite seu CPF (pessoas físicas) ou CNPJ (empresas). Esta informação é criptografada e usada apenas para fins fiscais.',
  skuExplanation:
    'Stock Keeping Unit - usado para controle de estoque e deve ser único em todos os produtos',
  registrationSecurityTooltip:
    'A senha deve ter pelo menos 8 caracteres e incluir números e caracteres especiais',
};

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Getting Started',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
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
    adornment: {
      table: { disable: true },
    },
    position: {
      table: { disable: true },
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
    tooltipMessage: {
      description: 'Mensagem de tooltip para informações contextuais.',
      control: 'text',
    },
    defaultValue: {
      table: { disable: true },
    },
    htmlFor: {
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
          <h3>Tipos de Input</h3>
          <TypesDescription />
          <DocBlock.Canvas of={InputTypes} />
          <h3>Adornments</h3>
          <AdornmentsDescription />
          <DocBlock.Canvas of={Adornments} />
          <h3>Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={States} />
          <h3>Tooltip</h3>
          <TooltipDescription />
          <DocBlock.Canvas of={Tooltip} />
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

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Guia completo para usar o componente Input e suas variações no Ocean
      Design System.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Input é um elemento versátil para coleta de dados em
      formulários, oferecendo suporte a diversos tipos de entrada, ícones,
      tooltips e estados. Foi projetado para manter consistência e
      acessibilidade em toda a aplicação.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Múltiplos Tipos</strong>: Suporte para text, email, password,
        number, tel, url e search
      </li>
      <li>
        <strong>Adornments Flexíveis</strong>: Ícones, símbolos de moeda e
        elementos customizados
      </li>
      <li>
        <strong>Gerenciamento de Estados</strong>: Estados normal, erro,
        desabilitado e foco
      </li>
      <li>
        <strong>Acessibilidade</strong>: Suporte ARIA integrado e navegação por
        teclado
      </li>
      <li>
        <strong>Integração com Formulários</strong>: Funciona perfeitamente com
        bibliotecas de formulários
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Input } from '@useblu/ocean-react';`}
    />
  </>
);

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico
<Input
  label="Nome Completo"
  name="fullName"
  type="text"
  placeholder="Digite seu nome completo"
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    name="email"
    type="email"
    required
    error={!!errors.email}
    helperText={errors.email?.message || "Usado para verificação da conta"}
  />
  <Button type="submit">Enviar</Button>
</form>

// Com ícones e adornments
<Input
  label="Buscar Produtos"
  name="search"
  type="search"
  placeholder="Digite sua busca..."
  adornment={<SearchOutline size={20} />}
  position="right"
/>`}
    />
  </>
);

const TypesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use a prop `type` para definir o comportamento e validação:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>text</code>: Para dados de texto geral
      </li>
      <li>
        <code>email</code>: Para endereços de email com validação automática
      </li>
      <li>
        <code>password</code>: Para campos de senha com ocultação
      </li>
      <li>
        <code>number</code>: Para valores numéricos
      </li>
      <li>
        <code>tel</code>: Para números de telefone
      </li>
      <li>
        <code>url</code>: Para endereços web
      </li>
      <li>
        <code>search</code>: Para funcionalidade de busca
      </li>
    </ul>
  </>
);

const AdornmentsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use a prop `adornment` com `position` para adicionar ícones ou símbolos:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>position=&quot;left&quot;</code>: Para símbolos de moeda, prefixos
      </li>
      <li>
        <code>position=&quot;right&quot;</code>: Para ícones de ação, sufixos
      </li>
    </ul>
  </>
);

const StatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      O componente suporta diferentes estados visuais:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>normal</code>: Estado padrão do campo
      </li>
      <li>
        <code>error</code>: Indica validação falhada
      </li>
      <li>
        <code>disabled</code>: Campo não editável
      </li>
    </ul>
  </>
);

const TooltipDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use `tooltipMessage` para informações contextuais adicionais:
    </DocBlock.Markdown>
  </>
);

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Integração com Formulários</DocBlock.Heading>

    <h3>Formulário de Registro</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label="Nome Completo"
    name="fullName"
    type="text"
    placeholder="Digite seu nome completo"
    helperText="Nome e sobrenome"
    required
  />
  <Input
    label="Email"
    name="email"
    type="email"
    placeholder="seu@email.com"
    helperText="Usado para verificação da conta"
    adornment={<MailOutline size={20} />}
    required
  />
  <Input
    label="Senha"
    name="password"
    type="password"
    placeholder="Digite uma senha forte"
    tooltipMessage="A senha deve ter pelo menos 8 caracteres"
    helperText="Mínimo 8 caracteres"
    adornment={<LockClosedOutline size={20} />}
    required
  />
  <Button type="submit">Registrar</Button>
</form>`}
    />

    <h3>Formulário de E-commerce</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label="Nome do Produto"
    name="productName"
    type="text"
    placeholder="Digite o nome do produto"
    helperText="Título descritivo do produto"
    required
  />
  <Input
    label="Preço"
    name="price"
    type="text"
    placeholder="0,00"
    helperText="Preço de venda do produto"
    adornment={<span>R$</span>}
    position="left"
    required
  />
  <Input
    label="SKU"
    name="sku"
    type="text"
    placeholder="PROD-001"
    helperText="Identificador único do produto"
    tooltipMessage="Stock Keeping Unit - usado para controle de estoque"
  />
  <Button type="submit">Salvar Produto</Button>
</form>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use tipos apropriados para melhor validação e teclados móveis</li>
      <li>Sempre forneça labels descritivos para acessibilidade</li>
      <li>Use placeholders para mostrar formato ou exemplos</li>
      <li>Combine helperText e tooltips para orientação clara</li>
    </ul>

    <h3>2. Tipos de Input</h3>
    <ul>
      <li>
        <code>email</code>: Para endereços de email com validação automática
      </li>
      <li>
        <code>password</code>: Para campos seguros com ocultação de texto
      </li>
      <li>
        <code>number</code>: Para valores numéricos com validação
      </li>
      <li>
        <code>tel</code>: Para números de telefone com teclado numérico no
        mobile
      </li>
      <li>
        <code>search</code>: Para funcionalidade de busca com comportamento
        específico
      </li>
    </ul>

    <h3>3. Adornments</h3>
    <ul>
      <li>
        Use <code>position=&quot;left&quot;</code> para símbolos de moeda e
        prefixos
      </li>
      <li>
        Use <code>position=&quot;right&quot;</code> para ícones de ação e
        funcionalidades
      </li>
      <li>Mantenha ícones simples e reconhecíveis</li>
      <li>Use tamanho 20px para ícones Ocean Icons</li>
    </ul>

    <h3>4. Estados e Validação</h3>
    <ul>
      <li>
        Use <code>error</code> para campos com validação falhada
      </li>
      <li>Combine com helperText para mensagens de erro específicas</li>
      <li>
        Use <code>disabled</code> apenas quando necessário e explique o motivo
      </li>
      <li>
        Marque campos obrigatórios com <code>required</code>
      </li>
    </ul>

    <h3>5. Acessibilidade</h3>
    <ul>
      <li>Sempre forneça labels claros e descritivos</li>
      <li>Use helperText para instruções importantes</li>
      <li>Mantenha ordem de tabulação lógica</li>
      <li>Forneça feedback claro para estados de erro</li>
      <li>Use tooltips para informações adicionais, não essenciais</li>
    </ul>
  </>
);

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
            <code>.ods-input__field</code>
          </td>
          <td>Estilos aplicados ao campo de entrada.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__label</code>
          </td>
          <td>Estilos aplicados ao rótulo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__helper-text</code>
          </td>
          <td>Estilos aplicados ao texto de ajuda.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__adornment</code>
          </td>
          <td>Estilos aplicados aos adornments.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--error</code>
          </td>
          <td>Estilos aplicados quando em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--disabled</code>
          </td>
          <td>Estilos aplicados quando desabilitado.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Input é baseado no elemento `input` e suporta todos os
      atributos padrão HTML.
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
          <td>type</td>
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
          <td>
            Define o tipo do input e comportamento de validação. Use email para
            validação automática, password para campos seguros, number para
            valores numéricos.
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
          <td>
            Rótulo que identifica o propósito do campo. Sempre forneça labels
            descritivos para acessibilidade.
          </td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto de exemplo que aparece quando vazio. Use para mostrar formato
            ou exemplo de conteúdo.
          </td>
        </tr>
        <tr>
          <td>helperText</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto auxiliar que fornece contexto ou instruções. Útil para
            explicar requisitos ou formato esperado.
          </td>
        </tr>
        <tr>
          <td>adornment</td>
          <td>
            <code>ReactNode</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Elemento adicional (ícone, símbolo) exibido junto ao input. Use para
            contexto visual ou funcionalidade extra.
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
            Posição do adornment. Use left para símbolos de moeda, right para
            ícones de ação.
          </td>
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
            Define se o campo está em estado de erro. Ativa estilos visuais de
            erro e modifica a cor do helperText.
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Desabilita a interação com o campo. Use para campos calculados
            automaticamente ou indisponíveis.
          </td>
        </tr>
        <tr>
          <td>required</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Marca o campo como obrigatório. Adiciona indicação visual e atributo
            HTML para validação.
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
          <td>
            Mensagem de tooltip para informações contextuais. Use para
            explicações que não cabem no helperText.
          </td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento input. Qualquer outra prop fornecida
      será passada para o elemento raiz.
    </DocBlock.Markdown>
  </>
);

export const Usage: Story = {
  args: {
    label: INPUT_GETTING_STARTED_LABELS.emailAddress,
    name: 'email',
    type: 'email',
    placeholder: INPUT_GETTING_STARTED_PLACEHOLDERS.emailExample,
    helperText: INPUT_GETTING_STARTED_HELPER_TEXTS.emailVerification,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const InputTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label={INPUT_GETTING_STARTED_LABELS.fullName}
        name="fullName"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.fullNameExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.fullNameFormat}
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.emailAddress}
        name="email"
        type="email"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.emailExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.emailVerification}
        adornment={<MailOutline size={20} />}
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.secureField}
        name="password"
        type="password"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.secureFieldExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.securityRequirement}
        adornment={<LockClosedOutline size={20} />}
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.age}
        name="age"
        type="number"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.ageExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.ageRequirement}
      />
    </div>
  ),
};

export const Adornments: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label={INPUT_GETTING_STARTED_LABELS.price}
        name="price"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.priceExample}
        helperText="Valor em reais"
        adornment={<span>R$</span>}
        position="left"
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.searchProducts}
        name="search"
        type="search"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.searchExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.searchKeywords}
        adornment={<SearchOutline size={20} />}
        position="right"
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label={INPUT_GETTING_STARTED_LABELS.normalField}
        name="normal"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.typeHere}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.normalState}
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.errorField}
        name="error"
        type="email"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.invalidEmail}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.validationError}
        error
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.disabledField}
        name="disabled"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.cannotEdit}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.autoFilled}
        disabled
      />
    </div>
  ),
};

export const Tooltip: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label={INPUT_GETTING_STARTED_LABELS.complexSecureField}
        name="complexPassword"
        type="password"
        placeholder={
          INPUT_GETTING_STARTED_PLACEHOLDERS.strongSecureFieldExample
        }
        tooltipMessage={
          INPUT_GETTING_STARTED_TOOLTIPS.securityRequirementsTooltip
        }
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.securityAdvice}
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.taxId}
        name="taxId"
        type="text"
        placeholder="000.000.000-00"
        tooltipMessage={INPUT_GETTING_STARTED_TOOLTIPS.taxIdPurpose}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.taxIdInfo}
      />
    </div>
  ),
};

export const RegistrationForm: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <Input
        label={INPUT_GETTING_STARTED_LABELS.fullName}
        name="fullName"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.fullNameExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.fullNameFormat}
        required
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.emailAddress}
        name="email"
        type="email"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.emailExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.emailVerification}
        adornment={<MailOutline size={20} />}
        required
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.secureField}
        name="password"
        type="password"
        placeholder={
          INPUT_GETTING_STARTED_PLACEHOLDERS.strongSecureFieldExample
        }
        tooltipMessage={
          INPUT_GETTING_STARTED_TOOLTIPS.registrationSecurityTooltip
        }
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.securityRequirement}
        adornment={<LockClosedOutline size={20} />}
        required
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.phoneNumber}
        name="phone"
        type="tel"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.phoneExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.phoneFormat}
      />
    </form>
  ),
};

export const EcommerceForm: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <Input
        label={INPUT_GETTING_STARTED_LABELS.productName}
        name="productName"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.productNameExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.productTitle}
        required
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.price}
        name="price"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.priceExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.sellingPrice}
        adornment={<span>R$</span>}
        position="left"
        required
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.quantityStock}
        name="quantity"
        type="number"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.quantityExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.availableInventory}
        required
      />
      <Input
        label={INPUT_GETTING_STARTED_LABELS.sku}
        name="sku"
        type="text"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.skuExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.uniqueIdentifier}
        tooltipMessage={INPUT_GETTING_STARTED_TOOLTIPS.skuExplanation}
      />
    </form>
  ),
};
