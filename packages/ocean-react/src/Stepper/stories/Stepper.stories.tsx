import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Stepper from '../Stepper';

type Story = StoryObj<typeof Stepper>;

// Constantes do Stepper
const STEPPER_DATA = {
  LABELS: {
    basicLabel: 'Quantidade',
    quantityLabel: 'Quantidade de itens',
    ageLabel: 'Idade',
    priceLabel: 'Preço unitário',
    stockLabel: 'Estoque disponível',
    guestsLabel: 'Número de convidados',
    portionsLabel: 'Porções',
    requiredField: 'Campo Obrigatório',
    withLimits: 'Com limites (1-10)',
    minOnly: 'Apenas mínimo (min: 0)',
    maxOnly: 'Apenas máximo (max: 100)',
    noLimits: 'Sem limites',
  },
  HELPER_TEXTS: {
    basicHelp: 'Use os botões + e - para ajustar o valor',
    quantityHelp: 'Selecione a quantidade desejada do produto',
    ageHelp: 'Informe sua idade em anos completos',
    priceHelp: 'Defina o preço por unidade do produto',
    stockHelp: 'Quantidade disponível em estoque',
    guestsHelp: 'Quantas pessoas participarão do evento',
    portionsHelp: 'Número de porções da receita',
    validationError: 'Este campo é obrigatório',
    minValueHelp: 'Valor mínimo permitido',
    maxValueHelp: 'Valor máximo permitido',
    withLimitsHelp: 'Valor entre 1 e 10',
    minOnlyHelp: 'Valor mínimo de 0, sem máximo',
    maxOnlyHelp: 'Valor máximo de 100, sem mínimo',
    noLimitsHelp: 'Qualquer valor numérico',
  },
  PLACEHOLDERS: {
    basicPlaceholder: '0',
    quantityPlaceholder: 'Digite a quantidade',
    agePlaceholder: 'Ex: 25',
    pricePlaceholder: '0,00',
    stockPlaceholder: 'Quantidade em estoque',
    guestsPlaceholder: 'Número de pessoas',
    portionsPlaceholder: 'Porções',
  },
  SCENARIOS: {
    basic: { min: 0, max: 100, defaultValue: 1 },
    quantity: { min: 1, max: 50, defaultValue: 1 },
    age: { min: 0, max: 120, defaultValue: 18 },
    price: { min: 0, max: 9999, defaultValue: 10 },
    stock: { min: 0, max: 1000, defaultValue: 0 },
    guests: { min: 1, max: 200, defaultValue: 2 },
    portions: { min: 1, max: 20, defaultValue: 4 },
    noLimits: { min: undefined, max: undefined, defaultValue: 0 },
    withLimits: { min: 1, max: 10, defaultValue: 5 },
    minOnly: { min: 0, max: undefined, defaultValue: 0 },
    maxOnly: { min: undefined, max: 100, defaultValue: 50 },
  },
};

// Estilos de container
const containerStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    maxWidth: '400px',
  },
  showcase: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
};

// Componente de Introdução
const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente de entrada numérica com botões de incremento e decremento para
      ajuste preciso de valores.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Stepper oferece uma interface intuitiva para entrada de
      valores numéricos, especialmente útil quando o usuário precisa ajustar
      quantidades com precisão. Inclui botões visuais para incrementar e
      decrementar valores, além de suporte a limites mínimos e máximos.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Controles Visuais</strong>: Botões + e - para ajuste fácil de
        valores
      </li>
      <li>
        <strong>Limites Configuráveis</strong>: Suporte a valores mínimos e
        máximos
      </li>
      <li>
        <strong>Validação Integrada</strong>: Previne valores fora dos limites
        automaticamente
      </li>
      <li>
        <strong>Entrada Manual</strong>: Permite digitação direta além dos
        botões
      </li>
      <li>
        <strong>Acessibilidade</strong>: Navegação por teclado e leitores de
        tela
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Stepper } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico
<Stepper
  label="Quantidade"
  placeholder="0"
  helperText="Use os botões + e - para ajustar o valor"
  min={0}
  max={100}
/>

// Com limites específicos
<Stepper
  label="Quantidade de itens"
  min={1}
  max={50}
  defaultValue={1}
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <Stepper
    label="Campo Obrigatório"
    error={hasError}
    helperText={hasError ? "Este campo é obrigatório" : "Selecione a quantidade"}
    min={1}
    max={200}
    required
  />
</form>`}
    />
  </>
);

// Lista de Cenários de Uso
const UsageScenariosList = (): JSX.Element => (
  <ul>
    <li>
      <code>Quantidades</code>: Para produtos, itens em carrinho, estoque
    </li>
    <li>
      <code>Idades/Anos</code>: Para formulários de cadastro e filtros
    </li>
    <li>
      <code>Capacidades</code>: Número de pessoas, porções, vagas
    </li>
    <li>
      <code>Valores Pequenos</code>: Até 100 unidades para melhor UX
    </li>
  </ul>
);

// Demonstração de Cenários
const UsageScenarios = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <Stepper
      label={STEPPER_DATA.LABELS.quantityLabel}
      placeholder={STEPPER_DATA.PLACEHOLDERS.quantityPlaceholder}
      helperText={STEPPER_DATA.HELPER_TEXTS.quantityHelp}
      min={STEPPER_DATA.SCENARIOS.quantity.min}
      max={STEPPER_DATA.SCENARIOS.quantity.max}
    />
    <Stepper
      label={STEPPER_DATA.LABELS.ageLabel}
      placeholder={STEPPER_DATA.PLACEHOLDERS.agePlaceholder}
      helperText={STEPPER_DATA.HELPER_TEXTS.ageHelp}
      min={STEPPER_DATA.SCENARIOS.age.min}
      max={STEPPER_DATA.SCENARIOS.age.max}
    />
    <Stepper
      label={STEPPER_DATA.LABELS.guestsLabel}
      placeholder={STEPPER_DATA.PLACEHOLDERS.guestsPlaceholder}
      helperText={STEPPER_DATA.HELPER_TEXTS.guestsHelp}
      min={STEPPER_DATA.SCENARIOS.guests.min}
      max={STEPPER_DATA.SCENARIOS.guests.max}
    />
  </div>
);

// Descrição dos Estados
const StatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use as props de estado para diferentes contextos:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>error</code>: Quando há problemas de validação ou valores
        inválidos
      </li>
      <li>
        <code>disabled</code>: Quando a entrada não está disponível
      </li>
      <li>
        <code>helperText</code>: Para fornecer instruções sobre limites e uso
      </li>
    </ul>
  </>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <Stepper
      label={STEPPER_DATA.LABELS.requiredField}
      placeholder={STEPPER_DATA.PLACEHOLDERS.stockPlaceholder}
      helperText={STEPPER_DATA.HELPER_TEXTS.validationError}
      error
      min={STEPPER_DATA.SCENARIOS.stock.min}
      max={STEPPER_DATA.SCENARIOS.stock.max}
    />
    <Stepper
      label={STEPPER_DATA.LABELS.stockLabel}
      placeholder={STEPPER_DATA.PLACEHOLDERS.stockPlaceholder}
      helperText={STEPPER_DATA.HELPER_TEXTS.stockHelp}
      error={false}
      min={STEPPER_DATA.SCENARIOS.stock.min}
      max={STEPPER_DATA.SCENARIOS.stock.max}
    />
    <Stepper
      label={STEPPER_DATA.LABELS.priceLabel}
      placeholder={STEPPER_DATA.PLACEHOLDERS.pricePlaceholder}
      helperText={STEPPER_DATA.HELPER_TEXTS.priceHelp}
      disabled
      min={STEPPER_DATA.SCENARIOS.price.min}
      max={STEPPER_DATA.SCENARIOS.price.max}
    />
  </div>
);

// Demonstração de Limites
const LimitsDemo = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <Stepper
      label={STEPPER_DATA.LABELS.withLimits}
      helperText={STEPPER_DATA.HELPER_TEXTS.withLimitsHelp}
      min={STEPPER_DATA.SCENARIOS.withLimits.min}
      max={STEPPER_DATA.SCENARIOS.withLimits.max}
      defaultValue={STEPPER_DATA.SCENARIOS.withLimits.defaultValue}
    />
    <Stepper
      label={STEPPER_DATA.LABELS.minOnly}
      helperText={STEPPER_DATA.HELPER_TEXTS.minOnlyHelp}
      min={STEPPER_DATA.SCENARIOS.minOnly.min}
      defaultValue={STEPPER_DATA.SCENARIOS.minOnly.defaultValue}
    />
    <Stepper
      label={STEPPER_DATA.LABELS.maxOnly}
      helperText={STEPPER_DATA.HELPER_TEXTS.maxOnlyHelp}
      max={STEPPER_DATA.SCENARIOS.maxOnly.max}
      defaultValue={STEPPER_DATA.SCENARIOS.maxOnly.defaultValue}
    />
    <Stepper
      label={STEPPER_DATA.LABELS.noLimits}
      helperText={STEPPER_DATA.HELPER_TEXTS.noLimitsHelp}
      defaultValue={STEPPER_DATA.SCENARIOS.noLimits.defaultValue}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Stepper é ideal para entrada de valores numéricos com
      controle preciso. Aqui estão alguns exemplos práticos de implementação:
    </DocBlock.Markdown>

    <h3>Integração com Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Stepper
    label="Quantidade de itens"
    placeholder="Digite a quantidade"
    name="quantity"
    min={1}
    max={50}
  />
  <Button type="submit">Adicionar ao Carrinho</Button>
</form>`}
    />

    <h3>Controle de Estado</h3>
    <DocBlock.Source
      dark
      code={`function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const [price] = useState(29.99);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div>
      <Stepper
        label="Quantidade"
        value={quantity}
        onChange={handleQuantityChange}
        min={1}
        max={10}
      />
      <p>Total: R$ {(quantity * price).toFixed(2)}</p>
    </div>
  );
}`}
    />

    <h3>Validação em Tempo Real</h3>
    <DocBlock.Source
      dark
      code={`const [guests, setGuests] = useState(0);
const [error, setError] = useState(false);

const handleGuestsChange = (e) => {
  const value = Number(e.target.value);
  setGuests(value);
  setError(value < 1);
};

<Stepper
  label="Número de convidados"
  value={guests}
  onChange={handleGuestsChange}
  error={error}
  helperText={error ? "Mínimo de 1 convidado" : "Quantas pessoas participarão"}
  min={1}
  max={200}
/>`}
    />
  </>
);

// Melhores Práticas
const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use para valores numéricos que precisam de ajuste preciso</li>
      <li>Sempre defina limites mínimos e máximos quando apropriado</li>
      <li>Forneça labels descritivos que indiquem a unidade de medida</li>
      <li>Use placeholders que mostrem o formato esperado</li>
    </ul>

    <h3>2. Limites e Validação</h3>
    <ul>
      <li>Defina min e max para prevenir valores inválidos</li>
      <li>Use validação para valores obrigatórios</li>
      <li>Forneça feedback claro sobre limites atingidos</li>
      <li>Considere valores padrão sensatos</li>
    </ul>

    <h3>3. Ranges Recomendados</h3>
    <ul>
      <li>Use para quantidades pequenas a médias (até 100)</li>
      <li>Para valores grandes, considere input numérico simples</li>
      <li>Mantenha botões de fácil acesso em dispositivos móveis</li>
      <li>Forneça feedback visual para limites atingidos</li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>Sempre use labels apropriados</li>
      <li>Forneça helperText descritivo sobre os limites</li>
      <li>Mantenha navegação por teclado funcional</li>
      <li>Use aria-labels para botões de incremento/decremento</li>
    </ul>

    <h3>5. Performance</h3>
    <ul>
      <li>Use debounce para onChange em casos de cálculos complexos</li>
      <li>Evite re-renderizações desnecessárias</li>
      <li>Considere usar defaultValue em vez de value quando possível</li>
      <li>Implemente throttling para mudanças rápidas</li>
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
          <td>Estilos aplicados ao elemento input principal.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--filled</code>
          </td>
          <td>Estilos aplicados ao input quando está preenchido.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--error</code>
          </td>
          <td>Estilos aplicados ao input quando error=true.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--left</code>
          </td>
          <td>Estilos aplicados ao input quando position=&quot;left&quot;.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--disabled--text</code>
          </td>
          <td>Estilos aplicados quando não há texto e não há ícone padrão.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// Referência da API
const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>API Reference</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Stepper é baseado no elemento input com controles adicionais
      e suporta todos os atributos padrão de input.
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
          <td>
            <code>label</code>
          </td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            O rótulo do campo stepper. Exibido acima do campo para
            identificação.
          </td>
        </tr>
        <tr>
          <td>
            <code>placeholder</code>
          </td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto exibido quando o campo está vazio. Fornece orientação sobre o
            valor esperado.
          </td>
        </tr>
        <tr>
          <td>
            <code>helperText</code>
          </td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto de ajuda exibido abaixo do campo. Use para instruções ou
            validação.
          </td>
        </tr>
        <tr>
          <td>
            <code>error</code>
          </td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Quando true, aplica o estilo de erro ao campo. Use para indicar
            problemas de validação.
          </td>
        </tr>
        <tr>
          <td>
            <code>disabled</code>
          </td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Quando true, desabilita o campo stepper. Use quando a entrada não é
            permitida.
          </td>
        </tr>
        <tr>
          <td>
            <code>min</code>
          </td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Valor mínimo permitido. Os botões de decremento respeitam este
            limite.
          </td>
        </tr>
        <tr>
          <td>
            <code>max</code>
          </td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Valor máximo permitido. Os botões de incremento respeitam este
            limite.
          </td>
        </tr>
        <tr>
          <td>
            <code>value</code>
          </td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            O valor atual do stepper. Use para controlar o estado do componente.
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
    label: STEPPER_DATA.LABELS.basicLabel,
    placeholder: STEPPER_DATA.PLACEHOLDERS.basicPlaceholder,
    helperText: STEPPER_DATA.HELPER_TEXTS.basicHelp,
    min: STEPPER_DATA.SCENARIOS.basic.min,
    max: STEPPER_DATA.SCENARIOS.basic.max,
    error: false,
    disabled: false,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '300px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Stories visuais sem controles
export const DifferentScenarios: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <UsageScenarios />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const LimitsConfiguration: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <LimitsDemo />,
};

// Meta configuration
const meta: Meta<typeof Stepper> = {
  title: 'Components/Inputs/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'O valor atual do stepper.',
      control: 'number',
    },
    label: {
      description: 'O rótulo do campo stepper.',
      control: 'text',
    },
    placeholder: {
      description: 'Texto exibido quando o campo está vazio.',
      control: 'text',
    },
    helperText: {
      description: 'Texto de ajuda exibido abaixo do campo.',
      control: 'text',
    },
    error: {
      description: 'Quando true, aplica o estilo de erro ao campo.',
      control: 'boolean',
    },
    disabled: {
      description: 'Quando true, desabilita o campo stepper.',
      control: 'boolean',
    },
    min: {
      description: 'Valor mínimo permitido.',
      control: 'number',
    },
    max: {
      description: 'Valor máximo permitido.',
      control: 'number',
    },
    tooltipMessage: {
      control: { type: null },
      table: { disable: true },
    },
    htmlFor: {
      control: { type: null },
    },
    className: {
      control: { type: null },
    },
    autoFocus: {
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
          <h3 id="cenarios">Cenários de Uso</h3>
          <UsageScenariosList />
          <DocBlock.Canvas of={DifferentScenarios} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={ErrorStates} />
          <h3 id="limites">Configuração de Limites</h3>
          <DocBlock.Canvas of={LimitsConfiguration} />
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
