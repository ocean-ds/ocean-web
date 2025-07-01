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
  INPUT_COMMON_DATA,
} from './_shared';

// Constantes específicas do tooltip (não disponíveis no compartilhado)
const TOOLTIP_MESSAGES = {
  usuarioRequisitos:
    'O nome de usuário deve ter entre 3 e 20 caracteres, contendo apenas letras, números e underscores',
  dataFormato: 'Digite a data no formato DD/MM/AAAA. Exemplo: 15/08/1990',
  valorExemplo:
    'Digite valores monetários usando vírgula como separador decimal. Exemplo: 1.234,56',
  observacoesLimite:
    'Máximo de 500 caracteres. Use para informações adicionais relevantes ao contexto',
};

const TOOLTIP_PLACEHOLDERS = {
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
    label: INPUT_COMMON_DATA.LABELS.senha,
    name: 'password',
    type: 'password',
    placeholder: INPUT_COMMON_DATA.PLACEHOLDERS.digiteSenha,
    tooltipMessage: INPUT_COMMON_DATA.TOOLTIPS.senhaRequisitos,
    helperText: INPUT_COMMON_DATA.HELPER_TEXTS.senhaForte,
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
        label={INPUT_COMMON_DATA.LABELS.senha}
        name="strongPassword"
        type="password"
        placeholder={INPUT_COMMON_DATA.PLACEHOLDERS.digiteSenha}
        tooltipMessage={INPUT_COMMON_DATA.TOOLTIPS.senhaRequisitos}
        helperText={INPUT_COMMON_DATA.HELPER_TEXTS.senhaForte}
      />
      <Input
        label="Valor em Moeda"
        name="creditCard"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.valorExemplo}
        tooltipMessage={TOOLTIP_MESSAGES.valorExemplo}
        helperText={INPUT_COMMON_DATA.HELPER_TEXTS.valorEmReais}
      />
      <Input
        label="Observações"
        name="projectName"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.observacoesExemplo}
        tooltipMessage={TOOLTIP_MESSAGES.observacoesLimite}
        helperText="Informações adicionais opcionais"
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
        label={INPUT_COMMON_DATA.LABELS.usuario}
        name="companyName"
        type="text"
        placeholder={INPUT_COMMON_DATA.PLACEHOLDERS.nomeUsuario}
        tooltipMessage={TOOLTIP_MESSAGES.usuarioRequisitos}
        helperText={INPUT_COMMON_DATA.HELPER_TEXTS.identificadorUnico}
        required
      />
      <Input
        label="Valor em Moeda"
        name="revenue"
        type="text"
        placeholder={TOOLTIP_PLACEHOLDERS.valorExemplo}
        tooltipMessage={TOOLTIP_MESSAGES.valorExemplo}
        helperText={INPUT_COMMON_DATA.HELPER_TEXTS.valorEmReais}
      />
      <Input
        label={INPUT_COMMON_DATA.LABELS.cpfCnpj}
        name="businessId"
        type="text"
        placeholder={INPUT_COMMON_DATA.PLACEHOLDERS.cpfExemplo}
        tooltipMessage={INPUT_COMMON_DATA.TOOLTIPS.cpfCnpjFormato}
        helperText={INPUT_COMMON_DATA.HELPER_TEXTS.identificacaoFiscal}
        required
      />
      <Input
        label={INPUT_COMMON_DATA.LABELS.email}
        name="contactEmail"
        type="email"
        placeholder={INPUT_COMMON_DATA.PLACEHOLDERS.seuEmail}
        tooltipMessage={INPUT_COMMON_DATA.TOOLTIPS.emailPrivacidade}
        helperText="Digite um email válido"
        required
      />
    </form>
  ),
};
