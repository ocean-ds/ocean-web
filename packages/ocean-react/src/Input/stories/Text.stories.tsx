import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Input from '../Input';
import {
  commonArgTypes,
  SharedBestPractices,
  SharedCssClasses,
  SharedUsageExamples,
  createApiReference,
  createIntroduction,
  createCommonPatterns,
  defaultUsageDecorator,
  containerStyles,
} from './_shared';

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

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Text Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    type: {
      name: 'type',
      description:
        'O tipo do elemento input. Sempre &quot;text&quot; para inputs de texto, fornecendo comportamento padrão de entrada de texto.',
      table: {
        type: { summary: '"text"' },
        defaultValue: { summary: '"text"' },
      },
      control: { type: null },
    },
    adornment: {
      control: { type: null },
    },
    position: {
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
          <h3>Estados</h3>
          <DocBlock.Canvas of={States} />
          <h3>Informações Pessoais</h3>
          <DocBlock.Canvas of={PersonalInfo} />
          <h3>Informações de Endereço</h3>
          <DocBlock.Canvas of={AddressInfo} />
          <h3>Formulário Completo</h3>
          <DocBlock.Canvas of={FormExample} />
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
const Introduction = (): JSX.Element =>
  createIntroduction(
    'Componente especializado de entrada de texto para coletar dados textuais gerais com recursos de validação e acessibilidade.',
    'Text inputs são o controle de formulário mais comum para coletar dados de texto inseridos pelo usuário. Eles suportam vários estados de validação, texto de ajuda e recursos de acessibilidade. Use text inputs para nomes, endereços, descrições e outros conteúdos de texto livre.'
  );

// Padrões Comuns
const CommonPatterns = (): JSX.Element =>
  createCommonPatterns(`// Informações pessoais básicas
<Input
  label="Nome Completo"
  name="fullName"
  type="text"
  placeholder="João Silva"
  required
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <Input
    label="Endereço"
    name="address"
    type="text"
    placeholder="Rua das Flores, 123"
    helperText="Inclua número do apartamento se aplicável"
  />
  <Button type="submit">Enviar</Button>
</form>

// Com estado de erro
<Input
  label="Email"
  name="email"
  type="text"
  placeholder="seu@email.com"
  helperText="Email é obrigatório"
  error
/>`);

// Exemplos de Uso
const UsageExamples = SharedUsageExamples;

// Melhores Práticas
const BestPractices = SharedBestPractices;

// Classes CSS
const CssClasses = SharedCssClasses;

// Referência da API
const ApiReference = (): JSX.Element =>
  createApiReference(
    <tr>
      <td>type</td>
      <td>
        <code>&quot;text&quot;</code>
      </td>
      <td>
        <code>&quot;text&quot;</code>
      </td>
      <td>
        Sempre &quot;text&quot; para inputs de texto. Fornece comportamento
        padrão de entrada de texto.
      </td>
    </tr>
  );

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: TEXT_LABELS.nomeCompleto,
    name: 'fullName',
    type: 'text',
    placeholder: TEXT_PLACEHOLDERS.joaoSilva,
    helperText: TEXT_HELPER_TEXTS.primeiroUltimoNome,
  },
  decorators: defaultUsageDecorator,
};

// Stories visuais com controles desabilitados
export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={containerStyles.form}>
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
        helperText={TEXT_HELPER_TEXTS.emailObrigatorio}
        error
      />
      <Input
        label={TEXT_LABELS.nome}
        name="disabled"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.joaoSilva}
        helperText={TEXT_HELPER_TEXTS.comentariosOpcionais}
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
    <div style={containerStyles.form}>
      <Input
        label={TEXT_LABELS.nome}
        name="firstName"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.joaoSilva}
        helperText={TEXT_HELPER_TEXTS.nomeUsuario}
        required
      />
      <Input
        label={TEXT_LABELS.sobrenome}
        name="lastName"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.joaoSilva}
        helperText={TEXT_HELPER_TEXTS.sobrenomeCompleto}
        required
      />
      <Input
        label={TEXT_LABELS.empresa}
        name="company"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.observacoesExemplo}
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
    <div style={containerStyles.form}>
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
        placeholder={TEXT_PLACEHOLDERS.observacoesExemplo}
        helperText={TEXT_HELPER_TEXTS.cidadeOndeVive}
      />
      <Input
        label={TEXT_LABELS.cep}
        name="neighborhood"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.observacoesExemplo}
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
    <form
      style={{
        ...containerStyles.form,
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
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
        placeholder={TEXT_PLACEHOLDERS.observacoesExemplo}
        helperText={TEXT_HELPER_TEXTS.cargoAtual}
      />
      <Input
        label={TEXT_LABELS.empresa}
        name="company"
        type="text"
        placeholder={TEXT_PLACEHOLDERS.observacoesExemplo}
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
