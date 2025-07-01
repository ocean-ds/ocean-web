import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Input from '../Input';
import {
  currencySpecificProps,
  defaultUsageDecorator,
  createIntroduction,
  createCommonPatterns,
  createApiReference,
  CurrencyBestPractices,
  SharedCssClasses,
  SharedUsageExamples,
  commonCodeExamples,
} from './_shared';

const CURRENCY_LABELS = {
  price: 'Preço',
  productPrice: 'Preço do Produto',
  realBrasileiro: 'Real Brasileiro',
  dolarAmericano: 'Dólar Americano',
  euro: 'Euro',
  libraEsterlina: 'Libra Esterlina',
  simboloEsquerda: 'Símbolo à Esquerda',
  codigoDireita: 'Código à Direita',
  precoNormal: 'Preço Normal',
  precoInvalido: 'Preço Inválido',
  precoDesabilitado: 'Preço Desabilitado',
  valorValido: 'Valor Válido',
  valorMuitoAlto: 'Valor Muito Alto',
  valorObrigatorio: 'Valor Obrigatório',
  precoCusto: 'Preço de Custo',
  frete: 'Frete',
  desconto: 'Desconto',
};

const CURRENCY_HELPER_TEXTS = {
  digitePrecoBrasileiro: 'Digite o preço em Real brasileiro',
  moedaBrasileira: 'Moeda brasileira',
  moedaAmericana: 'Moeda americana',
  moedaEuropeia: 'Moeda europeia',
  moedaBritanica: 'Moeda britânica',
  comumMaioriaMoedas: 'Comum para a maioria das moedas',
  utilCodigosMoeda: 'Útil para códigos de moeda',
  digitePrecoProduto: 'Digite o preço do produto',
  precoMaiorZero: 'O preço deve ser maior que 0',
  precoCalculadoAuto: 'Preço calculado automaticamente',
  valorDentroLimite: 'Valor dentro do limite permitido',
  valorExcedeLimite: 'Valor excede o limite máximo de R$ 5.000,00',
  campoObrigatorio: 'Este campo é obrigatório',
  precoFinalImpostos: 'Preço final incluindo impostos',
  custoProduto: 'Seu custo para este produto',
  custosEnvio: 'Custos adicionais de envio',
  valorDesconto: 'Valor do desconto (se aplicável)',
};

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Currency Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    ...currencySpecificProps,
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
          <h3>Símbolos de Moeda</h3>
          <CurrencySymbolsDescription />
          <DocBlock.Canvas of={Currencies} />
          <h3>Posições do Adorno</h3>
          <AdornmentPositionsDescription />
          <DocBlock.Canvas of={Positions} />
          <h3>Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={States} />
          <h3>Estados de Validação</h3>
          <ValidationStatesDescription />
          <DocBlock.Canvas of={ValidationStates} />
          <h3>Integração com Formulários</h3>
          <FormExampleDescription />
          <DocBlock.Canvas of={EcommerceExample} />
          <SharedUsageExamples />
          <CurrencyBestPractices />
          <SharedCssClasses />
          <ApiReference />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

const Introduction = createIntroduction(
  'Componente de entrada especializado para coletar valores monetários com símbolos de moeda e orientação de formatação adequada.',
  'Os inputs de moeda são projetados para coletar valores monetários com indicadores visuais claros da moeda. Eles usam o tipo de input text para melhor controle de formatação e suportam símbolos de moeda posicionados à esquerda e à direita. Essencial para e-commerce, formulários financeiros e qualquer aplicação que lide com transações monetárias.'
);

const CommonPatterns = createCommonPatterns([
  commonCodeExamples.currency,
  `// Em formulários de e-commerce
<form onSubmit={handleSubmit}>
  <Input
    label="Preço do Produto"
    name="productPrice"
    type="text"
    placeholder="0,00"
    adornment={<span>R$</span>}
    position="left"
    required
  />
  <Button type="submit">Salvar Produto</Button>
</form>`,
  `// Diferentes moedas
<div>
  <Input label="Preço (BRL)" adornment={<span>R$</span>} position="left" />
  <Input label="Preço (USD)" adornment={<span>$</span>} position="left" />
  <Input label="Preço (EUR)" adornment={<span>€</span>} position="left" />
</div>`,
]);

const CurrencySymbolsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use a prop adornment com diferentes símbolos de moeda:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>R$</code>: Para Real brasileiro (posição esquerda)
      </li>
      <li>
        <code>$</code>: Para Dólar americano (posição esquerda)
      </li>
      <li>
        <code>€</code>: Para Euro (posição esquerda)
      </li>
      <li>
        <code>£</code>: Para Libra esterlina (posição esquerda)
      </li>
    </ul>
  </>
);

const AdornmentPositionsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use a prop position para controlar onde o símbolo aparece:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>left</code>: Para símbolos de moeda (R$, $, €)
      </li>
      <li>
        <code>right</code>: Para códigos de moeda (BRL, USD, EUR)
      </li>
    </ul>
  </>
);

const StatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Os inputs de moeda suportam vários estados para validação e feedback:
    </DocBlock.Markdown>
  </>
);

const ValidationStatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Exemplos de diferentes estados para validação:
    </DocBlock.Markdown>
  </>
);

const FormExampleDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Exemplo prático em um formulário de precificação de produto:
    </DocBlock.Markdown>
  </>
);

const ApiReference = createApiReference([
  {
    prop: 'adornment',
    type: 'React.ReactElement | string',
    default: 'undefined',
    description:
      'Símbolo ou código da moeda. Use símbolos ($, €, £) para posição esquerda, códigos (USD, EUR) para direita.',
  },
  {
    prop: 'position',
    type: '"left" | "right"',
    default: '"right"',
    description:
      'Posição do adorno da moeda. Esquerda é comum para símbolos, direita para códigos de moeda.',
  },
  {
    prop: 'tooltipMessage',
    type: 'string',
    default: 'undefined',
    description:
      'Mensagem exibida no tooltip do label para informações adicionais.',
  },
]);

export const Usage: Story = {
  args: {
    label: CURRENCY_LABELS.price,
    name: 'price',
    type: 'text',
    placeholder: '0,00',
    adornment: <span>R$</span>,
    position: 'left',
    helperText: CURRENCY_HELPER_TEXTS.digitePrecoBrasileiro,
  },
  decorators: defaultUsageDecorator,
};

export const Currencies: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label={CURRENCY_LABELS.realBrasileiro}
        name="brl"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.moedaBrasileira}
      />
      <Input
        label={CURRENCY_LABELS.dolarAmericano}
        name="usd"
        type="text"
        placeholder="0.00"
        adornment={<span>$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.moedaAmericana}
      />
      <Input
        label={CURRENCY_LABELS.euro}
        name="eur"
        type="text"
        placeholder="0,00"
        adornment={<span>€</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.moedaEuropeia}
      />
      <Input
        label={CURRENCY_LABELS.libraEsterlina}
        name="gbp"
        type="text"
        placeholder="0.00"
        adornment={<span>£</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.moedaBritanica}
      />
    </div>
  ),
};

export const Positions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label={CURRENCY_LABELS.simboloEsquerda}
        name="leftSymbol"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.comumMaioriaMoedas}
      />
      <Input
        label={CURRENCY_LABELS.codigoDireita}
        name="rightCode"
        type="text"
        placeholder="0,00"
        adornment={<span>BRL</span>}
        position="right"
        helperText={CURRENCY_HELPER_TEXTS.utilCodigosMoeda}
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
        label={CURRENCY_LABELS.precoNormal}
        name="normal"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.digitePrecoProduto}
      />
      <Input
        label={CURRENCY_LABELS.precoInvalido}
        name="error"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.precoMaiorZero}
        error
      />
      <Input
        label={CURRENCY_LABELS.precoDesabilitado}
        name="disabled"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.precoCalculadoAuto}
        disabled
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label={CURRENCY_LABELS.valorValido}
        name="valid"
        type="text"
        value="150,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.valorDentroLimite}
      />
      <Input
        label={CURRENCY_LABELS.valorMuitoAlto}
        name="tooHigh"
        type="text"
        value="10.000,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.valorExcedeLimite}
        error
      />
      <Input
        label={CURRENCY_LABELS.valorObrigatorio}
        name="required"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.campoObrigatorio}
        error
      />
    </div>
  ),
};

export const EcommerceExample: Story = {
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
        label={CURRENCY_LABELS.productPrice}
        name="productPrice"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.precoFinalImpostos}
        required
      />
      <Input
        label={CURRENCY_LABELS.precoCusto}
        name="costPrice"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.custoProduto}
      />
      <Input
        label={CURRENCY_LABELS.frete}
        name="shipping"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.custosEnvio}
      />
      <Input
        label={CURRENCY_LABELS.desconto}
        name="discount"
        type="text"
        placeholder="0,00"
        adornment={<span>R$</span>}
        position="left"
        helperText={CURRENCY_HELPER_TEXTS.valorDesconto}
      />
    </form>
  ),
};
