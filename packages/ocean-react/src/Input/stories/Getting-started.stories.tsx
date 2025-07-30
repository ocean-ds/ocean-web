import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MailOutline, LockClosedOutline } from '@useblu/ocean-icons-react';
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
    label: {
      description: 'Rótulo do campo de entrada.',
      control: 'text',
    },
    type: {
      description: 'Tipo do input.',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: {
      description: 'Texto de placeholder.',
      control: 'text',
    },
    helperText: {
      description: 'Texto de ajuda exibido abaixo do campo.',
      control: 'text',
    },
    error: {
      description: 'Define se o campo está em estado de erro.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o campo.',
      control: 'boolean',
    },
    required: {
      description: 'Indica se o campo é obrigatório.',
      control: 'boolean',
    },
    tooltipMessage: {
      description: 'Mensagem do tooltip.',
      control: 'text',
    },
    // Props ocultas das actions e controles
    adornment: {
      table: { disable: true },
    },
    position: {
      table: { disable: true },
    },
    htmlFor: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

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
        label={INPUT_GETTING_STARTED_LABELS.emailAddress}
        name="email"
        type="email"
        placeholder={INPUT_GETTING_STARTED_PLACEHOLDERS.emailExample}
        helperText={INPUT_GETTING_STARTED_HELPER_TEXTS.emailVerification}
        adornment={<MailOutline size={20} />}
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
