import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  LockClosedOutline,
  MailOutline,
  PhoneOutline,
  SearchOutline,
  CreditCardOutline,
} from '@useblu/ocean-icons-react';
import Input from '../Input';

const LABELS = {
  nome: 'Nome Completo',
  email: 'Email',
  senha: 'Senha',
  telefone: 'Telefone',
  endereco: 'Endereço',
  cidade: 'Cidade',
  cep: 'CEP',
  valor: 'Valor',
  buscar: 'Buscar',
  usuario: 'Usuário',
};

const HELPER_TEXTS = {
  primeiroUltimoNome: 'Primeiro e último nome',
  emailObrigatorio: 'Email é obrigatório',
  senhaSegura: 'Mínimo 8 caracteres',
  telefoneComDDD: 'Inclua o DDD',
  enderecoCompleto: 'Inclua número e complemento',
  cidadeEstado: 'Cidade onde você reside',
  cepCompleto: 'CEP com 8 dígitos',
  valorMonetario: 'Valor em reais',
  buscaRapida: 'Digite para buscar',
  nomeUsuario: 'Nome para login',
};

const PLACEHOLDERS = {
  joaoSilva: 'João Silva',
  seuEmail: 'seu@email.com',
  senhaSegura: 'Digite sua senha',
  telefoneExemplo: '(11) 99999-9999',
  enderecoExemplo: 'Rua das Flores, 123',
  cidadeExemplo: 'São Paulo',
  cepExemplo: '01234-567',
  valorExemplo: '0,00',
  buscaExemplo: 'Digite sua busca...',
  usuarioExemplo: 'usuario123',
};

const STORY_STYLES = {
  centeredContainer: {
    minWidth: '300px',
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '300px',
  } as React.CSSProperties,
  rowContainer: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
  } as React.CSSProperties,
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '350px',
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
  } as React.CSSProperties,
};

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'O tipo do elemento input que define seu comportamento.',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
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
    tooltipMessage: {
      description: 'Mensagem de tooltip para informações contextuais.',
      control: 'text',
    },
    position: {
      description: 'Posição do adorno (ícone) no campo.',
      control: 'select',
      options: ['left', 'right'],
    },
    adornment: {
      control: { type: null },
    },
    defaultValue: {
      table: { disable: true },
    },
    htmlFor: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: LABELS.nome,
    name: 'fullName',
    type: 'text',
    placeholder: PLACEHOLDERS.joaoSilva,
    helperText: HELPER_TEXTS.primeiroUltimoNome,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={STORY_STYLES.centeredContainer}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Estados básicos
export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label={LABELS.nome}
        name="normal"
        type="text"
        placeholder={PLACEHOLDERS.joaoSilva}
        helperText={HELPER_TEXTS.primeiroUltimoNome}
      />
      <Input
        label={LABELS.nome}
        name="error"
        type="text"
        placeholder={PLACEHOLDERS.joaoSilva}
        helperText="Campo obrigatório"
        error
      />
      <Input
        label={LABELS.nome}
        name="disabled"
        type="text"
        placeholder={PLACEHOLDERS.joaoSilva}
        helperText="Campo desabilitado"
        disabled
      />
    </div>
  ),
};

// Tipos de input
export const Types: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label={LABELS.nome}
        name="text"
        type="text"
        placeholder={PLACEHOLDERS.joaoSilva}
        helperText="Tipo text para textos gerais"
      />
      <Input
        label={LABELS.email}
        name="email"
        type="email"
        placeholder={PLACEHOLDERS.seuEmail}
        helperText="Tipo email com validação automática"
      />
      <Input
        label={LABELS.senha}
        name="password"
        type="password"
        placeholder={PLACEHOLDERS.senhaSegura}
        helperText="Tipo password oculta caracteres"
      />
      <Input
        label={LABELS.telefone}
        name="tel"
        type="tel"
        placeholder={PLACEHOLDERS.telefoneExemplo}
        helperText="Tipo tel para números de telefone"
      />
      <Input
        label="Idade"
        name="number"
        type="number"
        placeholder="25"
        helperText="Tipo number para valores numéricos"
      />
      <Input
        label={LABELS.buscar}
        name="search"
        type="search"
        placeholder={PLACEHOLDERS.buscaExemplo}
        helperText="Tipo search para campos de busca"
      />
    </div>
  ),
};

// Input com ícones (adornos)
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label={LABELS.email}
        name="emailIcon"
        type="email"
        placeholder={PLACEHOLDERS.seuEmail}
        helperText={HELPER_TEXTS.emailObrigatorio}
        adornment={<MailOutline />}
        position="left"
      />
      <Input
        label={LABELS.senha}
        name="passwordIcon"
        type="password"
        placeholder={PLACEHOLDERS.senhaSegura}
        helperText={HELPER_TEXTS.senhaSegura}
        adornment={<LockClosedOutline />}
        position="left"
      />
      <Input
        label={LABELS.telefone}
        name="phoneIcon"
        type="tel"
        placeholder={PLACEHOLDERS.telefoneExemplo}
        helperText={HELPER_TEXTS.telefoneComDDD}
        adornment={<PhoneOutline />}
        position="left"
      />
      <Input
        label={LABELS.buscar}
        name="searchIcon"
        type="search"
        placeholder={PLACEHOLDERS.buscaExemplo}
        helperText={HELPER_TEXTS.buscaRapida}
        adornment={<SearchOutline />}
        position="left"
      />
    </div>
  ),
};

// Input de moeda
export const Currency: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label="Preço"
        name="priceReal"
        type="text"
        placeholder="0,00"
        helperText="Valor em reais"
        adornment={<span>R$</span>}
        position="left"
      />
      <Input
        label="Valor em Dólar"
        name="priceDollar"
        type="text"
        placeholder="0.00"
        helperText="Valor em dólares americanos"
        adornment={<span>$</span>}
        position="left"
      />
      <Input
        label="Preço"
        name="priceWithCode"
        type="text"
        placeholder="0,00"
        helperText="Valor em reais brasileiros"
        adornment={<span>BRL</span>}
        position="right"
      />
      <Input
        label="Valor"
        name="priceWithIcon"
        type="text"
        placeholder="0,00"
        helperText="Valor monetário"
        adornment={<CreditCardOutline />}
        position="left"
      />
    </div>
  ),
};

// Input com tooltip
export const WithTooltip: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label={LABELS.senha}
        name="passwordTooltip"
        type="password"
        placeholder={PLACEHOLDERS.senhaSegura}
        helperText={HELPER_TEXTS.senhaSegura}
        tooltipMessage="A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos"
      />
      <Input
        label={LABELS.cep}
        name="cepTooltip"
        type="text"
        placeholder={PLACEHOLDERS.cepExemplo}
        helperText={HELPER_TEXTS.cepCompleto}
        tooltipMessage="Digite apenas números. O formato será aplicado automaticamente"
      />
      <Input
        label="CPF"
        name="cpfTooltip"
        type="text"
        placeholder="000.000.000-00"
        helperText="Documento de identificação"
        tooltipMessage="Seu CPF será usado apenas para identificação e não será compartilhado"
      />
    </div>
  ),
};

// Formulário de exemplo
export const FormExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <form style={STORY_STYLES.formContainer}>
      <Input
        label={LABELS.nome}
        name="fullName"
        type="text"
        placeholder={PLACEHOLDERS.joaoSilva}
        helperText={HELPER_TEXTS.primeiroUltimoNome}
        required
      />
      <Input
        label={LABELS.email}
        name="email"
        type="email"
        placeholder={PLACEHOLDERS.seuEmail}
        helperText={HELPER_TEXTS.emailObrigatorio}
        adornment={<MailOutline />}
        position="left"
        required
      />
      <Input
        label={LABELS.telefone}
        name="phone"
        type="tel"
        placeholder={PLACEHOLDERS.telefoneExemplo}
        helperText={HELPER_TEXTS.telefoneComDDD}
        adornment={<PhoneOutline />}
        position="left"
      />
      <Input
        label={LABELS.endereco}
        name="address"
        type="text"
        placeholder={PLACEHOLDERS.enderecoExemplo}
        helperText={HELPER_TEXTS.enderecoCompleto}
      />
    </form>
  ),
};

// Casos especiais e interações
export const SpecialCases: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label="Campo preenchido"
        name="filled"
        type="text"
        defaultValue="Valor preenchido"
        helperText="Campo com valor inicial"
      />
      <Input
        label="Campo obrigatório com erro"
        name="requiredError"
        type="email"
        placeholder={PLACEHOLDERS.seuEmail}
        helperText="Este campo é obrigatório"
        required
        error
      />
      <Input
        label="Campo com ícone desabilitado"
        name="disabledWithIcon"
        type="text"
        placeholder="Não editável"
        helperText="Campo desabilitado com ícone"
        adornment={<LockClosedOutline />}
        position="left"
        disabled
      />
      <Input
        label="Campo longo"
        name="longField"
        type="text"
        placeholder="Digite um texto muito longo aqui para testar o comportamento do campo"
        helperText="Teste com textos longos para verificar responsividade"
      />
    </div>
  ),
};
