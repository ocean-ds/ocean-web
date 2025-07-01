import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import TextArea from '../TextArea';

type Story = StoryObj<typeof TextArea>;

// Constantes do TextArea
const TEXTAREA_DATA = {
  LABELS: {
    basicLabel: 'Comentário',
    descriptionLabel: 'Descrição',
    messageLabel: 'Mensagem',
    feedbackLabel: 'Feedback',
    observationsLabel: 'Observações',
    notesLabel: 'Anotações',
    reviewLabel: 'Avaliação',
    requiredField: 'Campo Obrigatório',
    shortComment: 'Comentário Breve (2 linhas)',
    shortLimit: 'Comentário Curto (100 chars)',
    mediumLimit: 'Descrição Média (250 chars)',
    longLimit: 'Texto Longo (500 chars)',
    noLimit: 'Sem Limite',
  },
  HELPER_TEXTS: {
    basicHelp: 'Digite seu texto aqui',
    descriptionHelp: 'Descreva os detalhes importantes',
    messageHelp: 'Escreva sua mensagem completa',
    feedbackHelp: 'Compartilhe sua opinião ou sugestão',
    observationsHelp: 'Adicione observações relevantes',
    notesHelp: 'Faça suas anotações pessoais',
    reviewHelp: 'Escreva sua avaliação detalhada',
    validationError: 'Este campo é obrigatório',
    characterLimit: 'Máximo de 500 caracteres',
    minCharacters: 'Mínimo de 10 caracteres',
    shortCommentHelp: 'Para comentários curtos',
    shortLimitHelp: 'Limite: 100 caracteres',
    mediumLimitHelp: 'Limite: 250 caracteres',
    longLimitHelp: 'Limite: 500 caracteres',
    noLimitHelp: 'Digite livremente',
    disabledHelp: 'Campo desabilitado',
  },
  PLACEHOLDERS: {
    basicPlaceholder: 'Digite aqui...',
    descriptionPlaceholder: 'Descreva o produto, serviço ou situação',
    messagePlaceholder: 'Escreva sua mensagem',
    feedbackPlaceholder: 'Conte-nos sua experiência',
    observationsPlaceholder: 'Adicione suas observações',
    notesPlaceholder: 'Suas anotações',
    reviewPlaceholder: 'Como foi sua experiência?',
    shortLimitPlaceholder: 'Máximo 100 caracteres',
    mediumLimitPlaceholder: 'Máximo 250 caracteres',
    longLimitPlaceholder: 'Máximo 500 caracteres',
    noLimitPlaceholder: 'Sem limite de caracteres',
  },
  SCENARIOS: {
    basic: { rows: 3, maxLength: undefined },
    short: { rows: 2, maxLength: 100 },
    medium: { rows: 4, maxLength: 250 },
    long: { rows: 6, maxLength: 500 },
    extended: { rows: 8, maxLength: 1000 },
    unlimited: { rows: 5, maxLength: undefined },
  },
  VALUES: {
    prefilledContent: 'Conteúdo pré-preenchido que não pode ser editado',
    publishButton: 'Publicar Comentário',
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
      Componente de entrada de texto multilinha para captura de conteúdo extenso
      como comentários, descrições e mensagens.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente TextArea oferece uma área de texto expansível para entrada de
      conteúdo longo. É ideal para formulários que requerem descrições
      detalhadas, comentários, feedback ou qualquer texto que ultrapasse uma
      linha simples. Suporta validação, limites de caracteres e
      redimensionamento automático.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Texto Multilinha</strong>: Suporte nativo para conteúdo em
        múltiplas linhas
      </li>
      <li>
        <strong>Redimensionamento</strong>: Altura ajustável conforme o conteúdo
      </li>
      <li>
        <strong>Limites de Caracteres</strong>: Controle de maxLength integrado
      </li>
      <li>
        <strong>Validação</strong>: Estados de erro e validação em tempo real
      </li>
      <li>
        <strong>Configurável</strong>: Número de linhas e comportamentos
        customizáveis
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { TextArea } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico
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
</form>`}
    />
  </>
);

// Lista de Tamanhos
const SizesList = (): JSX.Element => (
  <ul>
    <li>
      <code>2 linhas</code>: Para comentários breves e respostas curtas
    </li>
    <li>
      <code>3-4 linhas</code>: Para descrições e mensagens padrão
    </li>
    <li>
      <code>5-6 linhas</code>: Para feedback detalhado e avaliações
    </li>
    <li>
      <code>8+ linhas</code>: Para conteúdo extenso como artigos ou relatórios
    </li>
  </ul>
);

// Demonstração de Tamanhos
const Sizes = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <TextArea
      label={TEXTAREA_DATA.LABELS.shortComment}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.basicPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.shortCommentHelp}
      rows={TEXTAREA_DATA.SCENARIOS.short.rows}
      maxLength={TEXTAREA_DATA.SCENARIOS.short.maxLength}
    />
    <TextArea
      label={TEXTAREA_DATA.LABELS.descriptionLabel}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.descriptionPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.descriptionHelp}
      rows={TEXTAREA_DATA.SCENARIOS.medium.rows}
      maxLength={TEXTAREA_DATA.SCENARIOS.medium.maxLength}
    />
    <TextArea
      label={TEXTAREA_DATA.LABELS.reviewLabel}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.reviewPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.reviewHelp}
      rows={TEXTAREA_DATA.SCENARIOS.long.rows}
      maxLength={TEXTAREA_DATA.SCENARIOS.long.maxLength}
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
        <code>error</code>: Quando há problemas de validação ou conteúdo
        inválido
      </li>
      <li>
        <code>disabled</code>: Quando a entrada não está disponível
      </li>
      <li>
        <code>helperText</code>: Para fornecer instruções ou feedback específico
      </li>
    </ul>
  </>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <TextArea
      label={TEXTAREA_DATA.LABELS.requiredField}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.messagePlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.validationError}
      error
      rows={TEXTAREA_DATA.SCENARIOS.medium.rows}
    />
    <TextArea
      label={TEXTAREA_DATA.LABELS.messageLabel}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.messagePlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.messageHelp}
      error={false}
      rows={TEXTAREA_DATA.SCENARIOS.medium.rows}
    />
    <TextArea
      label={TEXTAREA_DATA.LABELS.observationsLabel}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.observationsPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.disabledHelp}
      disabled
      rows={TEXTAREA_DATA.SCENARIOS.medium.rows}
      defaultValue={TEXTAREA_DATA.VALUES.prefilledContent}
    />
  </div>
);

// Demonstração de Limites de Caracteres
const CharacterLimits = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <TextArea
      label={TEXTAREA_DATA.LABELS.shortLimit}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.shortLimitPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.shortLimitHelp}
      rows={2}
      maxLength={100}
    />
    <TextArea
      label={TEXTAREA_DATA.LABELS.mediumLimit}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.mediumLimitPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.mediumLimitHelp}
      rows={4}
      maxLength={250}
    />
    <TextArea
      label={TEXTAREA_DATA.LABELS.longLimit}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.longLimitPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.longLimitHelp}
      rows={6}
      maxLength={500}
    />
    <TextArea
      label={TEXTAREA_DATA.LABELS.noLimit}
      placeholder={TEXTAREA_DATA.PLACEHOLDERS.noLimitPlaceholder}
      helperText={TEXTAREA_DATA.HELPER_TEXTS.noLimitHelp}
      rows={4}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente TextArea é versátil e pode ser usado em diversos contextos.
      Aqui estão alguns exemplos práticos de implementação:
    </DocBlock.Markdown>

    <h3>Integração com Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <TextArea
    label="Descrição"
    placeholder="Descreva o produto, serviço ou situação"
    name="description"
    rows={4}
    maxLength={250}
  />
  <Button type="submit">Enviar</Button>
</form>`}
    />

    <h3>Controle de Estado</h3>
    <DocBlock.Source
      dark
      code={`function CommentForm() {
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxLength = 500;

  const handleChange = (e) => {
    setComment(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div>
      <TextArea
        label="Comentário"
        value={comment}
        onChange={handleChange}
        maxLength={maxLength}
        rows={5}
        helperText={\`\${charCount}/\${maxLength} caracteres\`}
      />
      <Button disabled={comment.length < 10}>
        Publicar Comentário
      </Button>
    </div>
  );
}`}
    />

    <h3>Validação em Tempo Real</h3>
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

// Melhores Práticas
const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use para conteúdo que requer múltiplas linhas</li>
      <li>Defina um número apropriado de linhas iniciais (rows)</li>
      <li>Forneça placeholders descritivos sobre o conteúdo esperado</li>
      <li>Use labels claros que indiquem o propósito do campo</li>
    </ul>

    <h3>2. Limites e Validação</h3>
    <ul>
      <li>Defina maxLength para prevenir conteúdo excessivo</li>
      <li>Use validação para campos obrigatórios</li>
      <li>Forneça feedback sobre limites de caracteres</li>
      <li>Considere validação de conteúdo mínimo quando necessário</li>
    </ul>

    <h3>3. Tamanhos Recomendados</h3>
    <ul>
      <li>Para comentários breves: 2-3 linhas</li>
      <li>Para descrições: 4-5 linhas</li>
      <li>Para conteúdo extenso: 6+ linhas</li>
      <li>Considere redimensionamento automático para melhor UX</li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>Sempre use labels apropriados</li>
      <li>Forneça helperText descritivo sobre requisitos</li>
      <li>Mantenha navegação por teclado funcional</li>
      <li>Use aria-describedby para textos de ajuda</li>
    </ul>

    <h3>5. Performance</h3>
    <ul>
      <li>Use debounce para validação em tempo real</li>
      <li>Evite re-renderizações desnecessárias</li>
      <li>Considere lazy loading para listas com muitos textareas</li>
      <li>Use defaultValue quando o controle total não é necessário</li>
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
            <code>.ods-textarea</code>
          </td>
          <td>Estilos aplicados ao elemento textarea principal.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-textarea--filled</code>
          </td>
          <td>Estilos aplicados ao textarea quando está preenchido.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-textarea--error</code>
          </td>
          <td>Estilos aplicados ao textarea quando error=true.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-textarea--disabled</code>
          </td>
          <td>Estilos aplicados ao textarea quando disabled=true.</td>
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
      O componente TextArea é baseado no elemento textarea e suporta todos os
      atributos padrão de textarea.
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
            O rótulo do campo textarea. Exibido acima do campo para
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
            conteúdo esperado.
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
            Quando true, desabilita o campo textarea. Use quando a entrada não é
            permitida.
          </td>
        </tr>
        <tr>
          <td>
            <code>rows</code>
          </td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>3</code>
          </td>
          <td>
            Número de linhas visíveis do textarea. Define a altura inicial do
            campo.
          </td>
        </tr>
        <tr>
          <td>
            <code>maxLength</code>
          </td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Número máximo de caracteres permitidos. Previne entrada excessiva.
          </td>
        </tr>
        <tr>
          <td>
            <code>value</code>
          </td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            O valor atual do textarea. Use para controlar o estado do
            componente.
          </td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento textarea. Qualquer outra prop
      fornecida será passada para o elemento textarea.
    </DocBlock.Markdown>
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: TEXTAREA_DATA.LABELS.basicLabel,
    placeholder: TEXTAREA_DATA.PLACEHOLDERS.basicPlaceholder,
    helperText: TEXTAREA_DATA.HELPER_TEXTS.basicHelp,
    error: false,
    disabled: false,
    rows: TEXTAREA_DATA.SCENARIOS.basic.rows,
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
export const DifferentSizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <Sizes />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const CharacterLimitsDemo: Story = {
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
    value: {
      description: 'O valor atual do textarea.',
      control: 'text',
    },
    label: {
      description: 'O rótulo do campo textarea.',
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
      description: 'Quando true, desabilita o campo textarea.',
      control: 'boolean',
    },
    rows: {
      description: 'Número de linhas visíveis do textarea.',
      control: 'number',
    },
    maxLength: {
      description: 'Número máximo de caracteres permitidos.',
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
          <h3 id="tamanhos">Tamanhos</h3>
          <SizesList />
          <DocBlock.Canvas of={DifferentSizes} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={ErrorStates} />
          <h3 id="limites">Limites de Caracteres</h3>
          <DocBlock.Canvas of={CharacterLimitsDemo} />
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
