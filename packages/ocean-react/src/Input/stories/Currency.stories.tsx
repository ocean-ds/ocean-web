import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Input from '../Input';

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
    type: {
      description:
        'O tipo do elemento input. Sempre "text" para inputs de moeda para melhor controle de formatação.',
      control: { type: null },
    },
    label: {
      description:
        'O rótulo do campo de entrada. Inclua contexto de moeda quando útil.',
      control: { type: 'text' },
    },
    placeholder: {
      description:
        'Texto de exemplo para o input. Deve corresponder às casas decimais esperadas (ex: "0,00").',
      control: { type: 'text' },
    },
    adornment: {
      description:
        'Símbolo ou código da moeda exibido dentro do input. Use símbolos ($, €, £) para posição esquerda, códigos (USD, EUR) para direita.',
      control: { type: null },
    },
    position: {
      description:
        'Posição do adorno da moeda. Esquerda é comum para símbolos, direita para códigos de moeda.',
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    helperText: {
      description:
        'Texto de ajuda exibido abaixo do input. Contexto adicional sobre moeda, formatação ou regras de cálculo.',
      control: { type: 'text' },
    },
    error: {
      description:
        'Define os estilos do input para estado de erro. Use com validação para valores monetários inválidos.',
      control: { type: 'boolean' },
    },
    disabled: {
      description:
        'Desabilita o campo de entrada. Use para valores monetários calculados ou somente leitura.',
      control: { type: 'boolean' },
    },
    defaultValue: {
      description: 'Valor padrão do campo de entrada.',
      control: { type: null },
    },
    htmlFor: {
      description: 'ID do elemento input associado ao label.',
      control: { type: null },
    },
    tooltipMessage: {
      description: 'Mensagem exibida no tooltip do label.',
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
      Componente de entrada especializado para coletar valores monetários com
      símbolos de moeda e orientação de formatação adequada.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      Os inputs de moeda são projetados para coletar valores monetários com
      indicadores visuais claros da moeda. Eles usam o tipo de input text para
      melhor controle de formatação e suportam símbolos de moeda posicionados à
      esquerda e à direita. Essencial para e-commerce, formulários financeiros e
      qualquer aplicação que lide com transações monetárias.
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
      code={`// Input de moeda básico
<Input
  label="Preço"
  type="text"
  placeholder="0,00"
  adornment={<span>R$</span>}
  position="left"
/>

// Em formulários de e-commerce
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
</form>

// Diferentes moedas
<div>
  <Input label="Preço (BRL)" adornment={<span>R$</span>} position="left" />
  <Input label="Preço (USD)" adornment={<span>$</span>} position="left" />
  <Input label="Preço (EUR)" adornment={<span>€</span>} position="left" />
</div>`}
    />
  </>
);

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

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Integração com Formulários</DocBlock.Heading>

    <h3>Uso em Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <div>
    <Input
      label={CURRENCY_LABELS.price}
      name="purchaseAmount"
      type="text"
      placeholder="0,00"
      adornment={<span>R$</span>}
      position="left"
      required
    />
  </div>
  <Button type="submit" loading={isSubmitting}>
    {isSubmitting ? 'Processando...' : 'Finalizar Compra'}
  </Button>
</form>`}
    />

    <h3>Validação</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Input
    label={CURRENCY_LABELS.price}
    name="price"
    type="text"
    placeholder="0,00"
    adornment={<span>R$</span>}
    position="left"
    error={priceError}
    helperText={
      priceError
        ? CURRENCY_HELPER_TEXTS.precoMaiorZero
        : CURRENCY_HELPER_TEXTS.digitePrecoBrasileiro
    }
  />
  <Button type="submit" disabled={!isFormValid} loading={isSubmitting}>
    {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
  </Button>
</form>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Formatação de Moeda</h3>
    <ul>
      <li>
        Use sempre <code>type=&quot;text&quot;</code> para melhor controle de
        formatação
      </li>
      <li>
        Configure placeholder com o formato esperado (ex: &quot;0,00&quot; para
        BRL)
      </li>
      <li>Use símbolos apropriados para cada moeda</li>
    </ul>

    <h3>2. Posicionamento de Símbolos</h3>
    <ul>
      <li>
        Use <code>position=&quot;left&quot;</code> para símbolos de moeda (R$,
        $, €, £)
      </li>
      <li>
        Use <code>position=&quot;right&quot;</code> para códigos de moeda (BRL,
        USD, EUR)
      </li>
      <li>Mantenha consistência em toda a aplicação</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Sempre forneça labels descritivos</li>
      <li>Use helperText para explicar formatação esperada</li>
      <li>Forneça feedback claro para estados de erro</li>
      <li>Inclua contexto da moeda quando necessário</li>
    </ul>

    <h3>4. Validação e UX</h3>
    <ul>
      <li>Valide valores mínimos e máximos apropriados</li>
      <li>Forneça mensagens de erro claras e específicas</li>
      <li>Use estados disabled para valores calculados</li>
      <li>Considere formatação automática durante a digitação</li>
    </ul>
  </>
);

const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table style={{ width: '100%' }}>
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
          <td>Estilos aplicados quando o input tem conteúdo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--disabled</code>
          </td>
          <td>Estilos aplicados quando o input está desabilitado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--error</code>
          </td>
          <td>Estilos aplicados quando o input está em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--left</code>
          </td>
          <td>
            Estilos aplicados quando o adorno está posicionado à esquerda.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__adornment</code>
          </td>
          <td>Estilos aplicados ao elemento de adorno da moeda.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Currency Input é baseado no elemento input e suporta todos os
      atributos padrão de input.
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
            Sempre &quot;text&quot; para inputs de moeda. Fornece melhor
            controle de formatação que &quot;number&quot;.
          </td>
        </tr>
        <tr>
          <td>adornment</td>
          <td>
            <code>React.ReactElement | string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Símbolo ou código da moeda. Use símbolos ($, €, £) para posição
            esquerda, códigos (USD, EUR) para direita.
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
            Posição do adorno da moeda. Esquerda é comum para símbolos, direita
            para códigos de moeda.
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
            Rótulo descrevendo o campo monetário. Inclua contexto de moeda
            quando útil.
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
            Formato de exemplo (ex: &quot;0,00&quot;). Deve corresponder às
            casas decimais esperadas.
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
            Contexto adicional sobre moeda, formatação ou regras de cálculo.
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
            Quando true, exibe estilo de erro. Use com validação para valores
            inválidos.
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
            Quando true, impede edição. Use para valores calculados ou somente
            leitura.
          </td>
        </tr>
        <tr>
          <td>defaultValue</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Valor padrão inicial do campo de entrada.</td>
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
            Mensagem exibida no tooltip do label para informações adicionais.
          </td>
        </tr>
        <tr>
          <td>htmlFor</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>ID do elemento input associado ao label para acessibilidade.</td>
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
    label: CURRENCY_LABELS.price,
    name: 'price',
    type: 'text',
    placeholder: '0,00',
    adornment: <span>R$</span>,
    position: 'left',
    helperText: CURRENCY_HELPER_TEXTS.digitePrecoBrasileiro,
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
