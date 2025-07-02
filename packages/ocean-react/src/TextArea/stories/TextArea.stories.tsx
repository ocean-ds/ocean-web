import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import TextArea from '../TextArea';
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

type Story = StoryObj<typeof TextArea>;

// Configurações para componentes de documentação
const introductionConfig: IntroductionConfig = {
  description:
    'Componente de entrada de texto multilinha para captura de conteúdo extenso como comentários, descrições e mensagens.',
  overview:
    'O componente TextArea oferece uma área de texto expansível para entrada de conteúdo longo. É ideal para formulários que requerem descrições detalhadas, comentários, feedback ou qualquer texto que ultrapasse uma linha simples. Suporta validação, limites de caracteres e redimensionamento automático.',
  characteristics: [
    {
      title: 'Texto Multilinha',
      description: 'Suporte nativo para conteúdo em múltiplas linhas',
    },
    {
      title: 'Redimensionamento',
      description: 'Altura ajustável conforme o conteúdo',
    },
    {
      title: 'Limites de Caracteres',
      description: 'Controle de maxLength integrado',
    },
    {
      title: 'Validação',
      description: 'Estados de erro e validação em tempo real',
    },
    {
      title: 'Configurável',
      description: 'Número de linhas e comportamentos customizáveis',
    },
  ],
  importPath: `import { TextArea } from '@useblu/ocean-react';`,
};

const commonPatternsConfig: CommonPatternsConfig = {
  patterns: [
    {
      code: `// Uso básico
<TextArea
  label="Comentário"
  placeholder="Digite aqui..."
  helperText="Digite seu texto aqui"
  rows={3}
/>

// Com limite de caracteres
<TextArea
  label="Descrição"
  placeholder="Descreva o produto, serviço ou situação"
  maxLength={250}
  rows={4}
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <TextArea
    label="Campo Obrigatório"
    error={hasError}
    helperText={hasError ? "Este campo é obrigatório" : "Escreva sua mensagem completa"}
    rows={4}
    maxLength={500}
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
        'Use para conteúdo que requer múltiplas linhas',
        'Defina um número apropriado de linhas iniciais (rows)',
        'Forneça placeholders descritivos sobre o conteúdo esperado',
        'Use labels claros que indiquem o propósito do campo',
      ],
    },
    {
      title: '2. Limites e Validação',
      items: [
        'Defina maxLength para prevenir conteúdo excessivo',
        'Use validação para campos obrigatórios',
        'Forneça feedback sobre limites de caracteres',
        'Considere validação de conteúdo mínimo quando necessário',
      ],
    },
    {
      title: '3. Tamanhos Recomendados',
      items: [
        'Para comentários breves: 2-3 linhas',
        'Para descrições: 4-5 linhas',
        'Para conteúdo extenso: 6+ linhas',
        'Considere redimensionamento automático para melhor UX',
      ],
    },
    {
      title: '4. Acessibilidade',
      items: [
        'Sempre use labels apropriados',
        'Forneça helperText descritivo sobre requisitos',
        'Mantenha navegação por teclado funcional',
        'Use aria-describedby para textos de ajuda',
      ],
    },
    {
      title: '5. Performance',
      items: [
        'Use debounce para validação em tempo real',
        'Evite re-renderizações desnecessárias',
        'Considere lazy loading para listas com muitos textareas',
        'Use defaultValue quando o controle total não é necessário',
      ],
    },
  ],
};

const cssClasses: CssClass[] = [
  {
    name: '.ods-textarea',
    description: 'Estilos aplicados ao elemento textarea principal.',
  },
  {
    name: '.ods-textarea--filled',
    description: 'Estilos aplicados ao textarea quando está preenchido.',
  },
  {
    name: '.ods-textarea--error',
    description: 'Estilos aplicados ao textarea quando error=true.',
  },
  {
    name: '.ods-textarea--disabled',
    description: 'Estilos aplicados ao textarea quando disabled=true.',
  },
];

const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente TextArea é baseado no elemento textarea e suporta todos os atributos padrão de textarea.',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description:
        'O rótulo do campo textarea. Exibido acima do campo para identificação.',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'undefined',
      description:
        'Texto exibido quando o campo está vazio. Fornece orientação sobre o conteúdo esperado.',
    },
    {
      name: 'helperText',
      type: 'string',
      defaultValue: 'undefined',
      description:
        'Texto de ajuda exibido abaixo do campo. Use para instruções ou validação.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Quando true, aplica o estilo de erro ao campo. Use para indicar problemas de validação.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Quando true, desabilita o campo textarea. Use quando a entrada não é permitida.',
    },
    {
      name: 'rows',
      type: 'number',
      defaultValue: '4',
      description:
        'Define o número de linhas visíveis do textarea. Afeta a altura inicial.',
    },
    {
      name: 'maxLength',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Limite máximo de caracteres permitidos no campo.',
    },
    {
      name: 'value',
      type: 'string',
      defaultValue: 'undefined',
      description: 'O valor atual do textarea (modo controlado).',
    },
    {
      name: 'onChange',
      type: '(event: ChangeEvent<HTMLTextAreaElement>) => void',
      defaultValue: 'undefined',
      description: 'Callback chamado quando o valor do textarea muda.',
    },
  ],
  footer:
    'A ref é encaminhada para o elemento textarea. Qualquer outra prop fornecida será passada para o elemento textarea.',
};

// Criação dos componentes usando os factories
const Introduction = createIntroduction(introductionConfig);
const CommonPatterns = createCommonPatterns(commonPatternsConfig);
const BestPractices = createBestPractices(bestPracticesConfig);
const CssClasses = createCssClasses(cssClasses);
const ApiReference = createApiReference(apiReferenceConfig);

// Lista de Tamanhos usando createCodeList
const SizesList = createCodeList([
  {
    code: '2 linhas',
    description: 'Para comentários breves e respostas curtas',
  },
  { code: '3-4 linhas', description: 'Para descrições e mensagens padrão' },
  { code: '5-6 linhas', description: 'Para feedback detalhado e avaliações' },
  {
    code: '8+ linhas',
    description: 'Para conteúdo extenso como artigos ou relatórios',
  },
]);

// Descrição dos Estados usando createStatesDescription
const StatesDescription = createStatesDescription([
  {
    state: 'error',
    description: 'Quando há problemas de validação ou campos obrigatórios',
  },
  { state: 'disabled', description: 'Quando a entrada não está disponível' },
  {
    state: 'helperText',
    description: 'Para fornecer orientações sobre o conteúdo esperado',
  },
]);

// Demonstração de Tamanhos
const Sizes = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <TextArea
      label="Comentário Breve (2 linhas)"
      placeholder="Digite aqui..."
      helperText="Para comentários curtos"
      rows={2}
      maxLength={100}
    />
    <TextArea
      label="Descrição"
      placeholder="Descreva o produto, serviço ou situação"
      helperText="Descreva os detalhes importantes"
      rows={4}
      maxLength={250}
    />
    <TextArea
      label="Mensagem"
      placeholder="Escreva sua mensagem"
      helperText="Escreva sua mensagem completa"
      rows={6}
      maxLength={500}
    />
  </div>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <TextArea
      label="Campo Obrigatório"
      placeholder="Digite aqui..."
      helperText="Este campo é obrigatório"
      error
      rows={3}
    />
    <TextArea
      label="Comentário"
      placeholder="Digite aqui..."
      helperText="Digite seu texto aqui"
      rows={3}
    />
    <TextArea
      label="Campo Desabilitado"
      placeholder="Não disponível"
      helperText="Campo desabilitado"
      disabled
      rows={3}
      value="Conteúdo pré-preenchido que não pode ser editado"
    />
  </div>
);

// Demonstração de Limites de Caracteres
const CharacterLimits = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <TextArea
      label="Comentário Curto (100 chars)"
      placeholder="Máximo 100 caracteres"
      helperText="Limite: 100 caracteres"
      rows={2}
      maxLength={100}
    />
    <TextArea
      label="Descrição Média (250 chars)"
      placeholder="Máximo 250 caracteres"
      helperText="Limite: 250 caracteres"
      rows={4}
      maxLength={250}
    />
    <TextArea
      label="Texto Longo (500 chars)"
      placeholder="Máximo 500 caracteres"
      helperText="Limite: 500 caracteres"
      rows={6}
      maxLength={500}
    />
    <TextArea
      label="Sem Limite"
      placeholder="Sem limite de caracteres"
      helperText="Digite livremente"
      rows={5}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Comentários e Feedback</h3>
    <DocBlock.Source
      dark
      code={`<TextArea
  label="Comentário"
  placeholder="Digite seu comentário"
  helperText="Compartilhe sua opinião sobre o produto"
  rows={3}
  maxLength={500}
/>`}
    />

    <h3>Descrição em Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <TextArea
    name="description"
    label="Descrição do Produto"
    placeholder="Descreva as características principais"
    helperText="Mínimo 50 caracteres"
    rows={4}
    required
  />
  <Button type="submit">Salvar</Button>
</form>`}
    />

    <h3>Com Validação</h3>
    <DocBlock.Source
      dark
      code={`const [text, setText] = useState('');
const [error, setError] = useState(false);

const handleTextChange = (e) => {
  const value = e.target.value;
  setText(value);
  setError(value.length < 10);
};

<TextArea
  label="Feedback"
  value={text}
  onChange={handleTextChange}
  error={error}
  helperText={error ? "Mínimo de 10 caracteres" : "Compartilhe sua opinião"}
  rows={4}
  maxLength={500}
/>`}
    />
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: 'Comentário',
    placeholder: 'Digite aqui...',
    helperText: 'Digite seu texto aqui',
    error: false,
    disabled: false,
    rows: 3,
  },
  decorators: createDefaultDecorator(),
};

// Stories visuais com controles desabilitados
export const SizesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <Sizes />,
};

export const StatesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const CharacterLimitsStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <CharacterLimits />,
};

// Meta configuration
const meta: Meta<typeof TextArea> = {
  title: 'Components/Inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    ...commonFormArgTypes,
    rows: {
      description: 'Número de linhas visíveis do textarea.',
      control: 'number',
    },
    maxLength: {
      description: 'Limite máximo de caracteres.',
      control: 'number',
    },
    value: {
      description: 'Valor atual do textarea.',
      control: 'text',
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
          <h3 id="tamanhos">Tamanhos</h3>
          <SizesList />
          <DocBlock.Canvas of={SizesStory} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={StatesStory} />
          <h3 id="limites-caracteres">Limites de Caracteres</h3>
          <DocBlock.Canvas of={CharacterLimitsStory} />
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
