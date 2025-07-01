import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Select from '../Select';

type Story = StoryObj<typeof Select>;

// Constantes do Select
const SELECT_DATA = {
  LABELS: {
    basicLabel: 'Selecione uma opção',
    countryLabel: 'País',
    categoryLabel: 'Categoria',
    priorityLabel: 'Prioridade',
    statusLabel: 'Status',
    requiredField: 'Campo Obrigatório',
  },
  HELPER_TEXTS: {
    basicHelp: 'Escolha uma das opções disponíveis',
    countryHelp: 'Selecione o país de origem',
    categoryHelp: 'Escolha a categoria do produto',
    priorityHelp: 'Defina a prioridade da tarefa',
    statusHelp: 'Atualize o status do item',
    validationError: 'Este campo é obrigatório',
    formatHelp: 'Use as setas para navegar ou digite para buscar',
  },
  PLACEHOLDERS: {
    basicPlaceholder: 'Selecione...',
    countryPlaceholder: 'Escolha um país',
    categoryPlaceholder: 'Selecione uma categoria',
    priorityPlaceholder: 'Defina a prioridade',
    statusPlaceholder: 'Escolha o status',
    searchPlaceholder: 'Digite para buscar...',
  },
  OPTIONS: {
    countries: [
      { value: 'br', label: 'Brasil' },
      { value: 'us', label: 'Estados Unidos' },
      { value: 'ca', label: 'Canadá' },
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' },
    ],
    categories: [
      { value: 'electronics', label: 'Eletrônicos' },
      { value: 'clothing', label: 'Vestuário' },
      { value: 'books', label: 'Livros' },
      { value: 'home', label: 'Casa e Jardim' },
      { value: 'sports', label: 'Esportes' },
    ],
    priorities: [
      { value: 'low', label: 'Baixa' },
      { value: 'medium', label: 'Média' },
      { value: 'high', label: 'Alta' },
      { value: 'urgent', label: 'Urgente' },
    ],
    statuses: [
      { value: 'pending', label: 'Pendente' },
      { value: 'in-progress', label: 'Em Andamento' },
      { value: 'completed', label: 'Concluído' },
      { value: 'cancelled', label: 'Cancelado' },
    ],
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
      Componente de seleção que permite escolher uma opção de uma lista
      predefinida.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Select oferece uma interface intuitiva para seleção de
      opções, com suporte a busca, navegação por teclado e estados visuais
      claros. Ideal para formulários que requerem escolha entre opções
      específicas.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Lista Expansível</strong>: Interface dropdown com opções
        organizadas
      </li>
      <li>
        <strong>Busca Integrada</strong>: Filtragem de opções por digitação
      </li>
      <li>
        <strong>Navegação por Teclado</strong>: Suporte completo a
        acessibilidade
      </li>
      <li>
        <strong>Estados Visuais</strong>: Feedback claro para seleção e
        validação
      </li>
      <li>
        <strong>Configurável</strong>: Suporte a diferentes tipos de dados e
        formatos
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Select } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico
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
</form>`}
    />
  </>
);

// Lista de Tipos de Opções
const OptionTypesList = (): JSX.Element => (
  <ul>
    <li>
      <code>Países/Localizações</code>: Para formulários geográficos
    </li>
    <li>
      <code>Categorias</code>: Para classificação de produtos ou conteúdo
    </li>
    <li>
      <code>Status/Estados</code>: Para workflows e processos
    </li>
    <li>
      <code>Prioridades</code>: Para sistemas de tarefas e tickets
    </li>
  </ul>
);

// Demonstração de Diferentes Opções
const DifferentOptions = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <Select
      label={SELECT_DATA.LABELS.countryLabel}
      placeholder={SELECT_DATA.PLACEHOLDERS.countryPlaceholder}
      helperText={SELECT_DATA.HELPER_TEXTS.countryHelp}
      options={SELECT_DATA.OPTIONS.countries}
    />
    <Select
      label={SELECT_DATA.LABELS.categoryLabel}
      placeholder={SELECT_DATA.PLACEHOLDERS.categoryPlaceholder}
      helperText={SELECT_DATA.HELPER_TEXTS.categoryHelp}
      options={SELECT_DATA.OPTIONS.categories}
    />
    <Select
      label={SELECT_DATA.LABELS.priorityLabel}
      placeholder={SELECT_DATA.PLACEHOLDERS.priorityPlaceholder}
      helperText={SELECT_DATA.HELPER_TEXTS.priorityHelp}
      options={SELECT_DATA.OPTIONS.priorities}
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
        <code>error</code>: Quando há problemas de validação ou seleção
        obrigatória
      </li>
      <li>
        <code>disabled</code>: Quando a seleção não está disponível
      </li>
      <li>
        <code>helperText</code>: Para fornecer orientações sobre as opções
      </li>
    </ul>
  </>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <Select
      label={SELECT_DATA.LABELS.requiredField}
      placeholder={SELECT_DATA.PLACEHOLDERS.categoryPlaceholder}
      helperText={SELECT_DATA.HELPER_TEXTS.validationError}
      error
      options={SELECT_DATA.OPTIONS.categories}
    />
    <Select
      label={SELECT_DATA.LABELS.statusLabel}
      placeholder={SELECT_DATA.PLACEHOLDERS.statusPlaceholder}
      helperText={SELECT_DATA.HELPER_TEXTS.statusHelp}
      error={false}
      options={SELECT_DATA.OPTIONS.statuses}
    />
    <Select
      label={SELECT_DATA.LABELS.priorityLabel}
      placeholder={SELECT_DATA.PLACEHOLDERS.priorityPlaceholder}
      helperText={SELECT_DATA.HELPER_TEXTS.priorityHelp}
      disabled
      options={SELECT_DATA.OPTIONS.priorities}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Select é versátil e adequado para diversos contextos de
      seleção. Aqui estão alguns exemplos práticos de implementação:
    </DocBlock.Markdown>

    <h3>Integração com Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Select
    label="Categoria"
    placeholder="Selecione uma categoria"
    name="category"
    options={categories}
  />
  <Button type="submit">Enviar</Button>
</form>`}
    />

    <h3>Controle de Estado</h3>
    <DocBlock.Source
      dark
      code={`function CategorySelector() {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategories(getSubcategoriesByCategory(value));
  };

  return (
    <div>
      <Select
        label="Categoria Principal"
        value={category}
        onChange={handleCategoryChange}
        options={categories}
      />
      {subcategories.length > 0 && (
        <Select
          label="Subcategoria"
          options={subcategories}
          disabled={!category}
        />
      )}
    </div>
  );
}`}
    />

    <h3>Validação em Tempo Real</h3>
    <DocBlock.Source
      dark
      code={`const [status, setStatus] = useState('');
const [error, setError] = useState(false);

const handleStatusChange = (value) => {
  setStatus(value);
  setError(!value); // Erro se não há seleção
};

<Select
  label="Status do Projeto"
  value={status}
  onChange={handleStatusChange}
  error={error}
  helperText={error ? "Selecione um status" : "Atualize o status do projeto"}
  options={projectStatuses}
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
      <li>
        Use labels descritivos que indiquem claramente o que deve ser
        selecionado
      </li>
      <li>Forneça helperText para orientar sobre as opções disponíveis</li>
      <li>Mantenha listas de opções organizadas e lógicas</li>
      <li>Use placeholders informativos quando apropriado</li>
    </ul>

    <h3>2. Organização de Opções</h3>
    <ul>
      <li>Agrupe opções relacionadas logicamente</li>
      <li>Use textos consistentes para opções similares</li>
      <li>Considere ordem alfabética para listas longas</li>
      <li>Mantenha hierarquia visual clara</li>
    </ul>

    <h3>3. Validação e Feedback</h3>
    <ul>
      <li>Use a prop error para indicar problemas de validação</li>
      <li>Forneça mensagens de erro claras no helperText</li>
      <li>Considere validação em tempo real para melhor UX</li>
      <li>Indique campos obrigatórios claramente</li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>Sempre use labels apropriados</li>
      <li>Forneça helperText descritivo</li>
      <li>Mantenha navegação por teclado funcional</li>
      <li>Use textos descritivos para as opções</li>
    </ul>

    <h3>5. Performance e UX</h3>
    <ul>
      <li>Use busca integrada para listas com mais de 10 opções</li>
      <li>Considere paginação para listas muito longas</li>
      <li>Implemente loading states para opções dinâmicas</li>
      <li>Considere o contexto mobile para interação</li>
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
            <code>.ods-select__root</code>
          </td>
          <td>Estilos aplicados ao elemento raiz do componente.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__control</code>
          </td>
          <td>Estilos aplicados ao elemento de controle principal.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__control--expanded</code>
          </td>
          <td>Estilos aplicados ao controle quando o popup está aberto.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__control--filled</code>
          </td>
          <td>
            Estilos aplicados ao controle quando há uma opção selecionada.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__control--error</code>
          </td>
          <td>Estilos aplicados ao controle quando error=true.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__value</code>
          </td>
          <td>Estilos aplicados ao elemento que exibe o valor selecionado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__value--empty</code>
          </td>
          <td>Estilos aplicados ao valor quando o placeholder aparece.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__arrow</code>
          </td>
          <td>Estilos aplicados ao ícone de seta do dropdown.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__arrow--down</code>
          </td>
          <td>Estilos aplicados à seta quando o popup está fechado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__arrow--up</code>
          </td>
          <td>Estilos aplicados à seta quando o popup está aberto.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__listbox</code>
          </td>
          <td>Estilos aplicados ao container das opções.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__option</code>
          </td>
          <td>Estilos aplicados a cada opção individual.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__option--selected</code>
          </td>
          <td>Estilos aplicados à opção atualmente selecionada.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__option--disabled</code>
          </td>
          <td>Estilos aplicados às opções desabilitadas.</td>
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
      O componente Select é baseado no elemento select e suporta todos os
      atributos padrão de select.
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
            O rótulo do campo select. Exibido acima do campo para identificação.
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
            Texto exibido quando nenhuma opção está selecionada. Fornece
            orientação ao usuário.
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
            Quando true, desabilita o campo select. Use quando a seleção não é
            permitida.
          </td>
        </tr>
        <tr>
          <td>
            <code>options</code>
          </td>
          <td>
            <code>Array</code>
          </td>
          <td>
            <code>[]</code>
          </td>
          <td>
            Array de opções disponíveis no select. Cada opção deve ter value e
            label.
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
            O valor atualmente selecionado. Use para controlar o estado do
            componente.
          </td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento select. Qualquer outra prop fornecida
      será passada para o elemento select.
    </DocBlock.Markdown>
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: SELECT_DATA.LABELS.basicLabel,
    placeholder: SELECT_DATA.PLACEHOLDERS.basicPlaceholder,
    helperText: SELECT_DATA.HELPER_TEXTS.basicHelp,
    error: false,
    disabled: false,
    options: SELECT_DATA.OPTIONS.countries,
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
export const DifferentOptionTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DifferentOptions />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

// Meta configuration
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'O valor atualmente selecionado.',
      control: 'text',
    },
    label: {
      description: 'O rótulo do campo select.',
      control: 'text',
    },
    placeholder: {
      description: 'Texto exibido quando nenhuma opção está selecionada.',
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
      description: 'Quando true, desabilita o campo select.',
      control: 'boolean',
    },
    options: {
      description: 'Array de opções disponíveis no select.',
      control: { type: null },
    },
    ariaLabel: {
      control: { type: null },
    },
    name: {
      control: { type: null },
    },
    id: {
      control: { type: null },
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
          <h3 id="opcoes">Tipos de Opções</h3>
          <OptionTypesList />
          <DocBlock.Canvas of={DifferentOptionTypes} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={ErrorStates} />
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
