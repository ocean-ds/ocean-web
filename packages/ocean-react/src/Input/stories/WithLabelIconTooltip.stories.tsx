import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Input from '../Input';
import {
  commonArgTypes,
  adornmentSpecificProps,
  tooltipSpecificProps,
  defaultUsageDecorator,
  createIntroduction,
  createCommonPatterns,
  createApiReference,
  TooltipBestPractices,
  TooltipCssClasses,
  SharedUsageExamples,
  commonCodeExamples,
  defaultUsageControls,
  tooltipApiReference,
} from './_shared';

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
    ...commonArgTypes,
    ...adornmentSpecificProps,
    ...tooltipSpecificProps,
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
          <SharedUsageExamples />
          <TooltipBestPractices />
          <TooltipCssClasses />
          <ApiReference />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

const Introduction = createIntroduction(
  'Componente de entrada aprimorado com funcionalidade de tooltip para fornecer contexto adicional e orientações sem poluir a interface.',
  'Input com tooltip estende o componente de input padrão adicionando ajuda contextual através de mensagens em tooltip. Os tooltips aparecem ao passar o mouse sobre o rótulo e fornecem informações adicionais, regras de validação, requisitos de formatação ou dicas úteis sem ocupar espaço permanente na interface. Perfeito para formulários complexos ou quando o espaço é limitado.'
);

const CommonPatterns = createCommonPatterns([
  commonCodeExamples.tooltip,
  `// Diretrizes de formatação
<Input
  label="Telefone"
  name="phone"
  type="tel"
  placeholder="(11) 99999-9999"
  tooltipMessage="Digite seu número de telefone com DDD. Formato: (XX) XXXXX-XXXX para celular ou (XX) XXXX-XXXX para fixo"
  helperText="Inclua o DDD"
/>`,
]);

const ApiReference = createApiReference(tooltipApiReference);

export const Usage: Story = {
  args: {
    label: TOOLTIP_LABELS.senha,
    name: 'password',
    type: 'password',
    placeholder: TOOLTIP_PLACEHOLDERS.digiteSenha,
    tooltipMessage: TOOLTIP_MESSAGES.senhaRequisitos,
    helperText: TOOLTIP_HELPER_TEXTS.escolhaSenhaForte,
  },
  decorators: defaultUsageDecorator,
  parameters: {
    controls: defaultUsageControls,
  },
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
