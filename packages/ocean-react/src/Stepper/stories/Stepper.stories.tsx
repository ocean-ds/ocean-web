import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Stepper from '../Stepper';
import {
  createIntroduction,
  createCommonPatterns,
  createBestPractices,
  createCssClasses,
  createApiReference,
  createCodeList,
  createStatesDescription,
  createDefaultDecorator,
  commonFormArgTypes,
  sharedContainerStyles,
  type IntroductionConfig,
  type CommonPatternsConfig,
  type BestPracticesConfig,
  type CssClass,
  type ApiReferenceConfig,
} from '../../_stories/shared-components';

type Story = StoryObj<typeof Stepper>;

// Configurações para componentes de documentação
const introductionConfig: IntroductionConfig = {
  description:
    'Componente de entrada numérica com botões de incremento e decremento para ajuste preciso de valores.',
  overview:
    'O componente Stepper oferece uma interface intuitiva para entrada de valores numéricos, especialmente útil quando o usuário precisa ajustar quantidades com precisão. Inclui botões visuais para incrementar e decrementar valores, além de suporte a limites mínimos e máximos.',
  characteristics: [
    {
      title: 'Controles Visuais',
      description: 'Botões + e - para ajuste fácil de valores',
    },
    {
      title: 'Limites Configuráveis',
      description: 'Suporte a valores mínimos e máximos',
    },
    {
      title: 'Validação Integrada',
      description: 'Previne valores fora dos limites automaticamente',
    },
    {
      title: 'Entrada Manual',
      description: 'Permite digitação direta além dos botões',
    },
    {
      title: 'Acessibilidade',
      description: 'Navegação por teclado e leitores de tela',
    },
  ],
  importPath: `import { Stepper } from '@useblu/ocean-react';`,
};

const commonPatternsConfig: CommonPatternsConfig = {
  patterns: [
    {
      code: `// Uso básico
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
</form>`,
    },
  ],
};

const bestPracticesConfig: BestPracticesConfig = {
  sections: [
    {
      title: '1. Uso Geral',
      items: [
        'Use para valores numéricos que precisam de ajuste fino',
        'Defina limites apropriados (min/max) para prevenir valores inválidos',
        'Forneça labels claros indicando o que o valor representa',
        'Use placeholders que mostrem valores de exemplo',
      ],
    },
    {
      title: '2. Limites e Validação',
      items: [
        'Sempre defina limites lógicos para o contexto de uso',
        'Use validação para campos obrigatórios',
        'Forneça feedback sobre limites quando necessário',
        'Considere valores padrão apropriados',
      ],
    },
    {
      title: '3. Cenários de Uso',
      items: [
        'Ideal para quantidades, idades, preços em valores pequenos',
        'Use para valores até 100 para melhor experiência',
        'Para valores grandes, considere usar Input numérico',
        'Adequado para ajustes de configuração e preferências',
      ],
    },
    {
      title: '4. Acessibilidade',
      items: [
        'Garanta que os botões sejam acessíveis por teclado',
        'Use labels descritivos para leitores de tela',
        'Forneça feedback sobre limites alcançados',
        'Mantenha estados visuais claros (desabilitado, erro)',
      ],
    },
  ],
};

const cssClasses: CssClass[] = [
  {
    name: '.ods-stepper',
    description: 'Estilos aplicados ao elemento raiz do stepper.',
  },
  {
    name: '.ods-stepper__input',
    description: 'Estilos aplicados ao campo de input numérico.',
  },
  {
    name: '.ods-stepper__button',
    description: 'Estilos aplicados aos botões de incremento e decremento.',
  },
  {
    name: '.ods-stepper__button--increment',
    description:
      'Estilos aplicados especificamente ao botão de incremento (+).',
  },
  {
    name: '.ods-stepper__button--decrement',
    description:
      'Estilos aplicados especificamente ao botão de decremento (-).',
  },
  {
    name: '.ods-stepper--error',
    description:
      'Estilos aplicados quando o componente está em estado de erro.',
  },
  {
    name: '.ods-stepper--disabled',
    description: 'Estilos aplicados quando o componente está desabilitado.',
  },
];

const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente Stepper é baseado no elemento HTML input[type="number"] e suporta todos os atributos numéricos relevantes.',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description:
        'O rótulo do campo stepper. Exibido acima do campo para identificação.',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Texto exibido quando o campo está vazio.',
    },
    {
      name: 'helperText',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Texto de ajuda exibido abaixo do campo.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Quando true, aplica o estilo de erro ao campo.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Quando true, desabilita o campo e os botões.',
    },
    {
      name: 'min',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Valor mínimo permitido.',
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Valor máximo permitido.',
    },
    {
      name: 'value',
      type: 'number',
      defaultValue: 'undefined',
      description: 'O valor atual do stepper (modo controlado).',
    },
    {
      name: 'defaultValue',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Valor inicial do stepper (modo não controlado).',
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      defaultValue: 'undefined',
      description: 'Callback chamado quando o valor do stepper muda.',
    },
  ],
  footer:
    'A ref é encaminhada para o elemento input. Qualquer outra prop fornecida será passada para o elemento input.',
};

// Criação dos componentes usando os factories
const Introduction = createIntroduction(introductionConfig);
const CommonPatterns = createCommonPatterns(commonPatternsConfig);
const BestPractices = createBestPractices(bestPracticesConfig);
const CssClasses = createCssClasses(cssClasses);
const ApiReference = createApiReference(apiReferenceConfig);

// Lista de Cenários de Uso
const UsageScenariosList = createCodeList([
  {
    code: 'Quantidades',
    description: 'Para produtos, itens em carrinho, estoque',
  },
  {
    code: 'Idades/Anos',
    description: 'Para formulários de cadastro e filtros',
  },
  { code: 'Capacidades', description: 'Número de pessoas, porções, vagas' },
  { code: 'Valores Pequenos', description: 'Até 100 unidades para melhor UX' },
]);

// Descrição dos Estados
const StatesDescription = createStatesDescription([
  {
    state: 'error',
    description: 'Quando há problemas de validação ou valores inválidos',
  },
  { state: 'disabled', description: 'Quando a entrada não está disponível' },
  {
    state: 'helperText',
    description: 'Para fornecer orientações sobre limites e uso',
  },
]);

// Demonstração de Cenários
const UsageScenarios = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <Stepper
      label="Quantidade de itens"
      placeholder="Digite a quantidade"
      helperText="Selecione a quantidade desejada do produto"
      min={1}
      max={50}
    />
    <Stepper
      label="Idade"
      placeholder="Ex: 25"
      helperText="Informe sua idade em anos completos"
      min={0}
      max={120}
    />
    <Stepper
      label="Número de convidados"
      placeholder="Número de pessoas"
      helperText="Quantas pessoas participarão do evento"
      min={1}
      max={200}
    />
  </div>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <Stepper
      label="Campo Obrigatório"
      placeholder="0"
      helperText="Este campo é obrigatório"
      error
      min={1}
      max={10}
    />
    <Stepper
      label="Quantidade"
      placeholder="0"
      helperText="Use os botões + e - para ajustar o valor"
      min={0}
      max={100}
    />
    <Stepper
      label="Campo Desabilitado"
      placeholder="0"
      helperText="Campo desabilitado"
      disabled
      min={0}
      max={100}
      defaultValue={5}
    />
  </div>
);

// Demonstração de Limites
const LimitsDemo = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <Stepper
      label="Com limites (1-10)"
      placeholder="0"
      helperText="Valor entre 1 e 10"
      min={1}
      max={10}
      defaultValue={5}
    />
    <Stepper
      label="Apenas mínimo (min: 0)"
      placeholder="0"
      helperText="Valor mínimo de 0, sem máximo"
      min={0}
    />
    <Stepper
      label="Apenas máximo (max: 100)"
      placeholder="0"
      helperText="Valor máximo de 100, sem mínimo"
      max={100}
      defaultValue={50}
    />
    <Stepper
      label="Sem limites"
      placeholder="0"
      helperText="Qualquer valor numérico"
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Quantidades em E-commerce</h3>
    <DocBlock.Source
      dark
      code={`<Stepper
  label="Quantidade"
  min={1}
  max={50}
  defaultValue={1}
  helperText="Quantidade disponível em estoque: 50"
/>`}
    />

    <h3>Configurações de Usuário</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Stepper
    name="age"
    label="Idade"
    min={0}
    max={120}
    helperText="Sua idade em anos completos"
    required
  />
  <Button type="submit">Salvar</Button>
</form>`}
    />

    <h3>Com Validação</h3>
    <DocBlock.Source
      dark
      code={`const [guests, setGuests] = useState(1);
const [error, setError] = useState(false);

const handleChange = (value) => {
  setGuests(value);
  setError(value < 1 || value > 200);
};

<Stepper
  label="Número de Convidados"
  value={guests}
  onChange={handleChange}
  error={error}
  helperText={error ? "Número deve estar entre 1 e 200" : "Quantas pessoas participarão?"}
  min={1}
  max={200}
/>`}
    />
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: 'Quantidade',
    placeholder: '0',
    helperText: 'Use os botões + e - para ajustar o valor',
    error: false,
    disabled: false,
    min: 0,
    max: 100,
  },
  decorators: createDefaultDecorator(),
};

// Stories visuais com controles desabilitados
export const UsageScenariosStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <UsageScenarios />,
};

export const StatesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const LimitsDemoStory: Story = {
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
    ...commonFormArgTypes,
    min: {
      description: 'Valor mínimo permitido.',
      control: 'number',
    },
    max: {
      description: 'Valor máximo permitido.',
      control: 'number',
    },
    value: {
      description: 'Valor atual do stepper.',
      control: 'number',
    },
    defaultValue: {
      description: 'Valor inicial do stepper.',
      control: 'number',
    },
    onChange: {
      description: 'Callback chamado quando valor muda.',
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
          <h3 id="cenarios-uso">Cenários de Uso</h3>
          <UsageScenariosList />
          <DocBlock.Canvas of={UsageScenariosStory} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={StatesStory} />
          <h3 id="limites">Limites</h3>
          <DocBlock.Canvas of={LimitsDemoStory} />
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
