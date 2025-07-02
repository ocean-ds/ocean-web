import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Select from '../Select';
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

type Story = StoryObj<typeof Select>;

// Configurações para componentes de documentação
const introductionConfig: IntroductionConfig = {
  description:
    'Componente de seleção que permite escolher uma opção de uma lista predefinida.',
  overview:
    'O componente Select oferece uma interface intuitiva para seleção de opções, com suporte a busca, navegação por teclado e estados visuais claros. Ideal para formulários que requerem escolha entre opções específicas.',
  characteristics: [
    {
      title: 'Lista Expansível',
      description: 'Interface dropdown com opções organizadas',
    },
    {
      title: 'Busca Integrada',
      description: 'Filtragem de opções por digitação',
    },
    {
      title: 'Navegação por Teclado',
      description: 'Suporte completo a acessibilidade',
    },
    {
      title: 'Estados Visuais',
      description: 'Feedback claro para seleção e validação',
    },
    {
      title: 'Configurável',
      description: 'Suporte a diferentes tipos de dados e formatos',
    },
  ],
  importPath: `import { Select } from '@useblu/ocean-react';`,
};

const commonPatternsConfig: CommonPatternsConfig = {
  patterns: [
    {
      code: `// Uso básico
<Select
  label="Selecione uma opção"
  placeholder="Selecione..."
  helperText="Escolha uma das opções disponíveis"
  options={[
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' }
  ]}
/>

// Com valor controlado
<Select
  label="País"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={countries}
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <Select
    label="Campo Obrigatório"
    error={hasError}
    helperText={hasError ? "Este campo é obrigatório" : "Escolha uma categoria"}
    options={categories}
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
        'Use labels descritivos que expliquem claramente o propósito da seleção',
        'Forneça helper text quando necessário para orientar o usuário',
        'Mantenha as opções organizadas em ordem lógica (alfabética, por importância)',
        'Use placeholders que indiquem a ação esperada ("Selecione um país")',
      ],
    },
    {
      title: '2. Organização das Opções',
      items: [
        'Use Select para listas de até 20 itens (use SelectAutocomplete para mais)',
        'Ordene opções alfabeticamente ou por importância/frequência de uso',
        'Evite opções com textos muito similares que possam confundir',
        'Considere agrupar categorias quando aplicável',
      ],
    },
    {
      title: '3. Acessibilidade',
      items: [
        'Sempre forneça labels descritivos para leitores de tela',
        'Use helper text para orientações importantes',
        'Mantenha estados visuais claros (erro, desabilitado)',
        'Garanta que a navegação por teclado funcione corretamente',
      ],
    },
    {
      title: '4. Design e UX',
      items: [
        'Evite labels genéricos como "Selecione" ou "Escolha"',
        'Use placeholders informativos que demonstrem o conteúdo esperado',
        'Forneça feedback visual claro para estados de validação',
        'Mantenha consistência visual em toda a aplicação',
      ],
    },
  ],
};

const cssClasses: CssClass[] = [
  {
    name: '.ods-select',
    description: 'Estilos aplicados ao elemento raiz.',
  },
  {
    name: '.ods-select__label',
    description: 'Estilos aplicados ao label do campo.',
  },
  {
    name: '.ods-select__input',
    description: 'Estilos aplicados ao campo de input do select.',
  },
  {
    name: '.ods-select__dropdown',
    description: 'Estilos aplicados ao container do dropdown.',
  },
  {
    name: '.ods-select__option',
    description: 'Estilos aplicados a cada opção individual.',
  },
  {
    name: '.ods-select__option--selected',
    description: 'Estilos aplicados à opção atualmente selecionada.',
  },
  {
    name: '.ods-select__option--disabled',
    description: 'Estilos aplicados a opções desabilitadas.',
  },
  {
    name: '.ods-select__helper-text',
    description: 'Estilos aplicados ao texto de ajuda.',
  },
  {
    name: '.ods-select--error',
    description:
      'Estilos aplicados quando o componente está em estado de erro.',
  },
  {
    name: '.ods-select--disabled',
    description: 'Estilos aplicados quando o componente está desabilitado.',
  },
];

const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente Select é baseado no elemento HTML select e suporta todos os atributos padrão relevantes.',
  props: [
    {
      name: 'options',
      type: 'Option[]',
      defaultValue: '[]',
      description:
        'Array de opções para seleção. Cada opção deve ter value e label.',
    },
    {
      name: 'value',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Valor atualmente selecionado no select.',
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      defaultValue: 'undefined',
      description: 'Callback chamado quando o valor selecionado muda.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Rótulo descritivo do campo de seleção.',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Texto exibido quando nenhuma opção está selecionada.',
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
      description: 'Quando true, desabilita o campo select.',
    },
  ],
  additionalTypes: [
    {
      name: 'Tipo Option',
      code: `interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}`,
    },
  ],
  footer:
    'A ref é encaminhada para o elemento select. Qualquer outra prop fornecida será passada para o elemento select.',
};

// Criação dos componentes usando os factories
const Introduction = createIntroduction(introductionConfig);
const CommonPatterns = createCommonPatterns(commonPatternsConfig);
const BestPractices = createBestPractices(bestPracticesConfig);
const CssClasses = createCssClasses(cssClasses);
const ApiReference = createApiReference(apiReferenceConfig);

// Lista de Tipos de Opções
const OptionTypesList = createCodeList([
  { code: 'Países/Localizações', description: 'Para formulários geográficos' },
  {
    code: 'Categorias',
    description: 'Para classificação de produtos ou conteúdo',
  },
  { code: 'Status/Estados', description: 'Para workflows e processos' },
  { code: 'Prioridades', description: 'Para sistemas de tarefas e tickets' },
]);

// Descrição dos Estados
const StatesDescription = createStatesDescription([
  {
    state: 'error',
    description: 'Quando há problemas de validação ou seleção obrigatória',
  },
  { state: 'disabled', description: 'Quando a seleção não está disponível' },
  {
    state: 'helperText',
    description: 'Para fornecer orientações sobre as opções',
  },
]);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Uso Básico</h3>
    <DocBlock.Source
      dark
      code={`<Select
  label="País"
  placeholder="Escolha um país"
  helperText="Selecione o país de origem"
  options={[
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' }
  ]}
/>`}
    />

    <h3>Em Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Select
    name="category"
    label="Categoria"
    placeholder="Selecione uma categoria"
    helperText="Escolha a categoria do produto"
    options={categories}
    required
  />
  <Button type="submit">Enviar</Button>
</form>`}
    />

    <h3>Com Estado Controlado</h3>
    <DocBlock.Source
      dark
      code={`const [selectedValue, setSelectedValue] = useState('');

<Select
  label="Status"
  value={selectedValue}
  onChange={setSelectedValue}
  options={[
    { value: 'pending', label: 'Pendente' },
    { value: 'completed', label: 'Concluído' }
  ]}
/>`}
    />
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: 'Selecione uma opção',
    placeholder: 'Selecione...',
    helperText: 'Escolha uma das opções disponíveis',
    error: false,
    disabled: false,
    options: [
      { value: 'br', label: 'Brasil' },
      { value: 'us', label: 'Estados Unidos' },
      { value: 'ca', label: 'Canadá' },
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' },
    ],
  },
  decorators: createDefaultDecorator(),
};

// Stories visuais com controles desabilitados
export const OptionTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={sharedContainerStyles.showcase}>
      <Select
        label="País"
        placeholder="Escolha um país"
        helperText="Selecione o país de origem"
        options={[
          { value: 'br', label: 'Brasil' },
          { value: 'us', label: 'Estados Unidos' },
          { value: 'ca', label: 'Canadá' },
          { value: 'mx', label: 'México' },
          { value: 'ar', label: 'Argentina' },
        ]}
      />
      <Select
        label="Categoria"
        placeholder="Selecione uma categoria"
        helperText="Escolha a categoria do produto"
        options={[
          { value: 'electronics', label: 'Eletrônicos' },
          { value: 'clothing', label: 'Vestuário' },
          { value: 'books', label: 'Livros' },
          { value: 'home', label: 'Casa e Jardim' },
          { value: 'sports', label: 'Esportes' },
        ]}
      />
      <Select
        label="Prioridade"
        placeholder="Defina a prioridade"
        helperText="Defina a prioridade da tarefa"
        options={[
          { value: 'low', label: 'Baixa' },
          { value: 'medium', label: 'Média' },
          { value: 'high', label: 'Alta' },
          { value: 'urgent', label: 'Urgente' },
        ]}
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={sharedContainerStyles.showcase}>
      <Select
        label="Campo Obrigatório"
        placeholder="Selecione uma opção"
        helperText="Este campo é obrigatório"
        error
        options={[
          { value: 'option1', label: 'Opção 1' },
          { value: 'option2', label: 'Opção 2' },
        ]}
      />
      <Select
        label="Campo Normal"
        placeholder="Selecione uma opção"
        helperText="Campo em estado normal"
        options={[
          { value: 'option1', label: 'Opção 1' },
          { value: 'option2', label: 'Opção 2' },
        ]}
      />
      <Select
        label="Campo Desabilitado"
        placeholder="Não disponível"
        helperText="Este campo está desabilitado"
        disabled
        options={[
          { value: 'option1', label: 'Opção 1' },
          { value: 'option2', label: 'Opção 2' },
        ]}
      />
    </div>
  ),
};

// Meta configuration
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    ...commonFormArgTypes,
    options: {
      description: 'Array de opções para seleção.',
      control: { type: null },
    },
    onChange: {
      description: 'Callback chamado quando valor muda.',
      control: { type: null },
    },
    value: {
      description: 'Valor selecionado.',
      control: 'text',
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
          <h3 id="tipos-de-opcoes">Tipos de Opções</h3>
          <OptionTypesList />
          <DocBlock.Canvas of={OptionTypes} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={States} />
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
