import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
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

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Text Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
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
    label: {
      name: 'label',
      description:
        'O rótulo do campo de entrada. Essencial para acessibilidade e compreensão do usuário sobre o que inserir.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    placeholder: {
      name: 'placeholder',
      description:
        'Texto de exemplo mostrado quando o input está vazio. Deve demonstrar o formato esperado ou dar dicas sobre o conteúdo.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    helperText: {
      name: 'helperText',
      description:
        'Texto de ajuda exibido abaixo do input. Use para orientações adicionais ou mensagens de validação.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    error: {
      name: 'error',
      description:
        'Quando true, aplica estilos de estado de erro ao input. Use com validação de formulário para indicar problemas.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    disabled: {
      name: 'disabled',
      description:
        'Quando true, desabilita o campo de entrada. Use quando o campo não estiver disponível ou aplicável no contexto atual.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    htmlFor: {
      control: { type: null },
    },
    adornment: {
      control: { type: null },
    },
    defaultValue: {
      control: { type: null },
    },
    position: {
      control: { type: null },
    },
    tooltipMessage: {
      name: 'tooltipMessage',
      description:
        'Mensagem de tooltip exibida ao passar o mouse sobre o ícone de ajuda.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
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
const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente especializado de entrada de texto para coletar dados textuais
      gerais com recursos de validação e acessibilidade.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      Text inputs são o controle de formulário mais comum para coletar dados de
      texto inseridos pelo usuário. Eles suportam vários estados de validação,
      texto de ajuda e recursos de acessibilidade. Use text inputs para nomes,
      endereços, descrições e outros conteúdos de texto livre.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Input } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Informações pessoais básicas
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
/>`}
    />
  </>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Integração com Formulários</DocBlock.Heading>

    <h3>Uso em Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input label="Nome" name="name" type="text" required />
  <Button type="submit">Enviar</Button>
</form>`}
    />

    <h3>Validação</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label="Nome Completo"
    name="fullName"
    type="text"
    error={errors.fullName}
    helperText={errors.fullName || 'Digite seu nome completo'}
    required
  />
  <Button type="submit" disabled={!isFormValid}>
    {isSubmitting ? 'Enviando...' : 'Enviar'}
  </Button>
</form>`}
    />
  </>
);

// Melhores Práticas
const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>
        Use labels descritivos que indiquem claramente o que deve ser inserido
      </li>
      <li>Forneça placeholders que demonstrem o formato esperado</li>
      <li>
        Use helperText para orientações adicionais ou requisitos específicos
      </li>
      <li>Mantenha consistência no uso de campos obrigatórios</li>
    </ul>

    <h3>2. Validação</h3>
    <ul>
      <li>
        Use o estado <code>error</code> junto com <code>helperText</code> para
        mensagens de erro claras
      </li>
      <li>Forneça feedback em tempo real quando apropriado</li>
      <li>Mantenha mensagens de erro específicas e acionáveis</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Sempre forneça labels para todos os inputs</li>
      <li>
        Use <code>helperText</code> para informações importantes sobre o campo
      </li>
      <li>Mantenha contraste adequado em todos os estados</li>
      <li>Garanta que campos desabilitados sejam claramente identificáveis</li>
    </ul>

    <h3>4. Design e UX</h3>
    <ul>
      <li>Agrupe campos relacionados logicamente</li>
      <li>Use larguras apropriadas para o tipo de conteúdo esperado</li>
      <li>Considere o contexto mobile para tamanhos de toque adequados</li>
      <li>Mantenha hierarquia visual clara em formulários</li>
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
            <code>.ods-input</code>
          </td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--filled</code>
          </td>
          <td>Estilos aplicados quando input tem conteúdo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--disabled</code>
          </td>
          <td>Estilos aplicados quando input está desabilitado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--error</code>
          </td>
          <td>Estilos aplicados quando input está em estado de erro.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// Referência da API
const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Text Input é baseado no elemento input e suporta todos os
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
        <tr>
          <td>label</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto do rótulo para o input. Essencial para acessibilidade e
            compreensão do usuário.
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
            Texto de exemplo mostrado quando input está vazio. Deve demonstrar
            formato esperado.
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
            Orientações adicionais ou mensagens de validação para o usuário.
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
            Quando true, exibe estilo de erro. Use com validação de formulário.
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
            Quando true, impede interação do usuário. Use quando campo não
            estiver disponível.
          </td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento input. Qualquer outra prop fornecida
      será passada para o elemento input.
    </DocBlock.Markdown>
  </>
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

// Stories visuais com controles desabilitados
export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
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
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
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
