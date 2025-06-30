import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Input from '../Input';

const TOOLTIP_LABELS = {
  senha: 'Senha',
  nomeUsuario: 'Nome de Usuário',
  email: 'Email',
  telefone: 'Telefone',
  cpfCnpj: 'CPF/CNPJ',
  dataNascimento: 'Data de Nascimento',
  valorMoeda: 'Valor em Moeda',
  observacoes: 'Observações',
};

const TOOLTIP_MESSAGES = {
  senhaRequisitos:
    'A senha deve ter pelo menos 8 caracteres e incluir números e caracteres especiais',
  usuarioRequisitos:
    'O nome de usuário deve ter entre 3 e 20 caracteres, contendo apenas letras, números e underscores',
  emailPrivacidade:
    'Usamos seu email para verificação de conta e notificações importantes. Nunca compartilhamos seu email com terceiros.',
  telefoneFormato:
    'Digite seu número de telefone com DDD. Formato: (XX) XXXXX-XXXX para celular ou (XX) XXXX-XXXX para fixo',
  cpfCnpjFormato:
    'Digite seu CPF (para pessoas físicas) ou CNPJ (para empresas). Use apenas números ou inclua pontos e traços',
  dataFormato: 'Digite a data no formato DD/MM/AAAA. Exemplo: 15/08/1990',
  valorExemplo:
    'Digite valores monetários usando vírgula como separador decimal. Exemplo: 1.234,56',
  observacoesLimite:
    'Máximo de 500 caracteres. Use para informações adicionais relevantes ao contexto',
};

const TOOLTIP_HELPER_TEXTS = {
  escolhaSenhaForte: 'Escolha uma senha forte',
  identificadorUnico: 'Este será seu identificador único',
  emailValido: 'Digite um email válido',
  incluaDDD: 'Inclua o DDD',
  identificacaoFiscal: 'Identificação fiscal pessoal ou empresarial',
  formatoCorreto: 'Use o formato correto',
  valorMonetario: 'Valor em reais (R$)',
  informacoesAdicionais: 'Informações adicionais opcionais',
};

const TOOLTIP_PLACEHOLDERS = {
  digiteSenha: 'Digite sua senha',
  nomeUsuario: 'Digite seu nome de usuário',
  seuEmail: 'seu@email.com',
  telefoneExemplo: '(11) 99999-9999',
  cpfExemplo: '000.000.000-00',
  dataExemplo: 'DD/MM/AAAA',
  valorExemplo: '1.234,56',
  observacoesExemplo: 'Digite suas observações...',
};

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Input com Tooltip',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description:
        'O tipo do elemento input. Define o comportamento e validação específica para cada tipo de entrada.',
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    label: {
      description:
        'O rótulo do campo de entrada. Essencial para acessibilidade e compreensão do usuário sobre o que inserir.',
      control: 'text',
    },
    tooltipMessage: {
      description:
        'Mensagem do tooltip exibida ao passar o mouse sobre o rótulo. Use para fornecer informações adicionais sem ocupar espaço permanente na interface.',
      control: 'text',
    },
    placeholder: {
      description:
        'Texto de exemplo mostrado quando o input está vazio. Deve demonstrar o formato esperado ou dar dicas sobre o conteúdo.',
      control: 'text',
    },
    helperText: {
      description:
        'Texto de ajuda exibido abaixo do input. Use para orientações adicionais ou mensagens de validação.',
      control: 'text',
    },
    error: {
      description:
        'Quando true, aplica estilos de estado de erro ao input. Use com validação de formulário para indicar problemas.',
      control: 'boolean',
    },
    disabled: {
      description:
        'Quando true, desabilita o campo de entrada. Use quando o campo não estiver disponível ou aplicável no contexto atual.',
      control: 'boolean',
    },
    defaultValue: {
      table: { disable: true },
    },
    position: {
      table: { disable: true },
    },
    adornment: {
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
          <h3>Tipos de Conteúdo em Tooltip</h3>
          <DocBlock.Canvas of={ContentTypes} />
          <h3>Exemplo de Formulário Completo</h3>
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

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente de entrada aprimorado com funcionalidade de tooltip para
      fornecer contexto adicional e orientações sem poluir a interface.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      Input com tooltip estende o componente de input padrão adicionando ajuda
      contextual através de mensagens em tooltip. Os tooltips aparecem ao passar
      o mouse sobre o rótulo e fornecem informações adicionais, regras de
      validação, requisitos de formatação ou dicas úteis sem ocupar espaço
      permanente na interface. Perfeito para formulários complexos ou quando o
      espaço é limitado.
    </DocBlock.Markdown>
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
      code={`// Regras de validação
<Input
  label="Nome de Usuário"
  name="username"
  type="text"
  placeholder="Digite seu nome de usuário"
  tooltipMessage="O nome de usuário deve ter entre 3 e 20 caracteres, contendo apenas letras, números e underscores"
  helperText="Este será seu identificador único"
/>

// Diretrizes de formatação
<Input
  label="Telefone"
  name="phone"
  type="tel"
  placeholder="(11) 99999-9999"
  tooltipMessage="Digite seu número de telefone com DDD. Formato: (XX) XXXXX-XXXX para celular ou (XX) XXXX-XXXX para fixo"
  helperText="Inclua o DDD"
/>

// Em formulários
<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    name="email"
    type="email"
    placeholder="seu@email.com"
    tooltipMessage="Usamos seu email para verificação de conta e notificações importantes"
    required
  />
  <Button type="submit">Enviar</Button>
</form>`}
    />
  </>
);

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Integração com Formulários</DocBlock.Heading>

    <h3>Uso em Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label="Nome Completo"
    name="fullName"
    type="text"
    placeholder="Digite seu nome completo"
    tooltipMessage="O nome de usuário deve ter entre 3 e 20 caracteres"
    required
  />
  <Button type="submit">Enviar</Button>
</form>`}
    />

    <h3>Validação</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    name="email"
    type="email"
    placeholder="seu@email.com"
    tooltipMessage="Usamos seu email para verificação de conta e notificações importantes"
    error={errors.email}
    helperText={errors.email || "Digite um email válido"}
    required
  />
  <Button type="submit" disabled={!isFormValid}>
    {isSubmitting ? 'Enviando...' : 'Enviar'}
  </Button>
</form>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
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
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Input com Tooltip suporta todas as props do Input padrão,
      além de props específicas para tooltip.
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
          <td>tooltipMessage</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Mensagem exibida no tooltip ao passar o mouse sobre o rótulo. Use
            para informações adicionais ou regras de validação.
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td>
            <code>
              &quot;text&quot; | &quot;email&quot; | &quot;password&quot; |
              &quot;number&quot;
            </code>
          </td>
          <td>
            <code>&quot;text&quot;</code>
          </td>
          <td>
            O tipo do elemento input. Define o comportamento e validação
            específica para cada tipo de entrada.
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
            O rótulo do campo de entrada. Essencial para acessibilidade e
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
            Texto de exemplo mostrado quando o input está vazio. Deve demonstrar
            o formato esperado.
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
            Texto de ajuda exibido abaixo do input. Use para orientações
            adicionais ou mensagens de validação.
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
            Quando true, aplica estilos de estado de erro ao input. Use com
            validação para indicar problemas.
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
            Quando true, desabilita o campo de entrada. Use quando o campo não
            estiver disponível no contexto atual.
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

export const Usage: Story = {
  args: {
    label: TOOLTIP_LABELS.senha,
    name: 'password',
    type: 'password',
    placeholder: TOOLTIP_PLACEHOLDERS.digiteSenha,
    tooltipMessage: TOOLTIP_MESSAGES.senhaRequisitos,
    helperText: TOOLTIP_HELPER_TEXTS.escolhaSenhaForte,
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

export const ContentTypes: Story = {
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
        label={TOOLTIP_LABELS.senha}
        name="strongPassword"
        type="password"
        placeholder={TOOLTIP_PLACEHOLDERS.digiteSenha}
        tooltipMessage={TOOLTIP_MESSAGES.senhaRequisitos}
        helperText={TOOLTIP_HELPER_TEXTS.escolhaSenhaForte}
      />
      <Input
        label={TOOLTIP_LABELS.valorMoeda}
        name="creditCard"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.valorExemplo}
        tooltipMessage={TOOLTIP_MESSAGES.valorExemplo}
        helperText={TOOLTIP_HELPER_TEXTS.valorMonetario}
      />
      <Input
        label={TOOLTIP_LABELS.observacoes}
        name="projectName"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.observacoesExemplo}
        tooltipMessage={TOOLTIP_MESSAGES.observacoesLimite}
        helperText={TOOLTIP_HELPER_TEXTS.informacoesAdicionais}
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
        label={TOOLTIP_LABELS.nomeUsuario}
        name="companyName"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.nomeUsuario}
        tooltipMessage={TOOLTIP_MESSAGES.usuarioRequisitos}
        helperText={TOOLTIP_HELPER_TEXTS.identificadorUnico}
        required
      />
      <Input
        label={TOOLTIP_LABELS.valorMoeda}
        name="revenue"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.valorExemplo}
        tooltipMessage={TOOLTIP_MESSAGES.valorExemplo}
        helperText={TOOLTIP_HELPER_TEXTS.valorMonetario}
      />
      <Input
        label={TOOLTIP_LABELS.cpfCnpj}
        name="businessId"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.cpfExemplo}
        tooltipMessage={TOOLTIP_MESSAGES.cpfCnpjFormato}
        helperText={TOOLTIP_HELPER_TEXTS.identificacaoFiscal}
        required
      />
      <Input
        label={TOOLTIP_LABELS.email}
        name="contactEmail"
        type="email"
        placeholder={TOOLTIP_PLACEHOLDERS.seuEmail}
        tooltipMessage={TOOLTIP_MESSAGES.emailPrivacidade}
        helperText={TOOLTIP_HELPER_TEXTS.emailValido}
        required
      />
    </form>
  ),
};
