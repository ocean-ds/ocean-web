import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Input from '../Input';

const TEXT_LABELS = {
  nomeCompleto: 'Nome Completo',
  endereco: 'Endereço',
  email: 'Email',
  telefone: 'Telefone',
  descricao: 'Descrição',
  titulo: 'Título',
  mensagem: 'Mensagem',
  observacoes: 'Observações',
  nome: 'Nome',
  sobrenome: 'Sobrenome',
  empresa: 'Empresa',
  cargo: 'Cargo',
  cidade: 'Cidade',
  cep: 'CEP',
  comentarios: 'Comentários',
};

const TEXT_HELPER_TEXTS = {
  primeiroUltimoNome: 'Primeiro e último nome',
  incluaNumeroApartamento: 'Inclua número do apartamento se aplicável',
  emailObrigatorio: 'Email é obrigatório',
  telefoneComDDD: 'Inclua o DDD',
  descricaoDetalhada: 'Descrição detalhada do item',
  tituloDescritivo: 'Título descritivo e claro',
  mensagemDetalhada: 'Escreva sua mensagem detalhada',
  observacoesAdicionais: 'Observações adicionais opcionais',
  nomeUsuario: 'Nome que aparecerá no perfil',
  sobrenomeCompleto: 'Sobrenome completo',
  nomeEmpresa: 'Nome da empresa onde trabalha',
  cargoAtual: 'Seu cargo atual',
  cidadeOndeVive: 'Cidade onde você vive',
  cepCompleto: 'CEP com 8 dígitos',
  comentariosOpcionais: 'Comentários opcionais',
};

const TEXT_PLACEHOLDERS = {
  joaoSilva: 'João Silva',
  ruaFlores123: 'Rua das Flores, 123',
  seuEmail: 'seu@email.com',
  telefoneExemplo: '(11) 99999-9999',
  descricaoExemplo: 'Descreva o item...',
  tituloExemplo: 'Digite o título...',
  mensagemExemplo: 'Escreva sua mensagem...',
  observacoesExemplo: 'Observações adicionais...',
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
  title: 'Components/Inputs/Text Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
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
    type: {
      description:
        'O tipo do elemento input. Sempre "text" para inputs de texto, fornecendo comportamento padrão de entrada de texto.',
      table: {
        type: { summary: '"text"' },
        defaultValue: { summary: '"text"' },
      },
      control: { type: null },
    },
    name: {
      description: 'Nome do campo para identificação no formulário.',
      control: 'text',
    },
    adornment: {
      control: { type: null },
    },
    position: {
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
    label: TEXT_LABELS.nomeCompleto,
    name: 'fullName',
    type: 'text',
    placeholder: TEXT_PLACEHOLDERS.joaoSilva,
    helperText: TEXT_HELPER_TEXTS.primeiroUltimoNome,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={STORY_STYLES.centeredContainer}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Stories visuais com controles desabilitados
export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label={TEXT_LABELS.nome}
        name="normal"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.joaoSilva}
        helperText={TEXT_HELPER_TEXTS.nomeUsuario}
      />
      <Input
        label={TEXT_LABELS.nome}
        name="error"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.joaoSilva}
        helperText="Campo obrigatório"
        error
      />
      <Input
        label={TEXT_LABELS.nome}
        name="disabled"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.joaoSilva}
        helperText="Campo desabilitado"
        disabled
      />
    </div>
  ),
};

export const PersonalInfo: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label={TEXT_LABELS.nome}
        name="firstName"
        type="text"
        placeholder="João"
        helperText={TEXT_HELPER_TEXTS.nomeUsuario}
        required
      />
      <Input
        label={TEXT_LABELS.sobrenome}
        name="lastName"
        type="text"
        placeholder="Silva"
        helperText={TEXT_HELPER_TEXTS.sobrenomeCompleto}
        required
      />
      <Input
        label={TEXT_LABELS.empresa}
        name="company"
        type="text"
        placeholder="Nome da empresa"
        helperText={TEXT_HELPER_TEXTS.nomeEmpresa}
      />
    </div>
  ),
};

export const AddressInfo: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <Input
        label={TEXT_LABELS.endereco}
        name="address"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.ruaFlores123}
        helperText={TEXT_HELPER_TEXTS.incluaNumeroApartamento}
      />
      <Input
        label={TEXT_LABELS.cidade}
        name="city"
        type="text"
        placeholder="São Paulo"
        helperText={TEXT_HELPER_TEXTS.cidadeOndeVive}
      />
      <Input
        label={TEXT_LABELS.cep}
        name="zipCode"
        type="text"
        placeholder="01234-567"
        helperText={TEXT_HELPER_TEXTS.cepCompleto}
      />
    </div>
  ),
};

export const FormExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <form style={STORY_STYLES.formContainer}>
      <Input
        label={TEXT_LABELS.nomeCompleto}
        name="fullName"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.joaoSilva}
        helperText={TEXT_HELPER_TEXTS.primeiroUltimoNome}
        required
      />
      <Input
        label={TEXT_LABELS.cargo}
        name="jobTitle"
        type="text"
        placeholder="Desenvolvedor"
        helperText={TEXT_HELPER_TEXTS.cargoAtual}
      />
      <Input
        label={TEXT_LABELS.empresa}
        name="company"
        type="text"
        placeholder="Nome da empresa"
        helperText={TEXT_HELPER_TEXTS.nomeEmpresa}
      />
      <Input
        label={TEXT_LABELS.endereco}
        name="address"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.ruaFlores123}
        helperText={TEXT_HELPER_TEXTS.incluaNumeroApartamento}
      />
    </form>
  ),
};
