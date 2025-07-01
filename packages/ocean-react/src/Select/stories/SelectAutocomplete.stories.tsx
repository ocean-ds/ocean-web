import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import SelectAutocomplete from '../SelectAutocomplete';

type Story = StoryObj<typeof SelectAutocomplete>;

// Constantes do SelectAutocomplete
const SELECT_AUTOCOMPLETE_DATA = {
  LABELS: {
    basicLabel: 'Pesquisar e selecionar',
    searchLabel: 'Buscar opção',
    countryLabel: 'País',
    cityLabel: 'Cidade',
    productLabel: 'Produto',
    userLabel: 'Usuário',
    requiredField: 'Campo Obrigatório',
  },
  HELPER_TEXTS: {
    basicHelp: 'Digite para buscar e selecionar uma opção',
    searchHelp: 'Use o campo para pesquisar entre as opções disponíveis',
    countryHelp: 'Digite o nome do país para buscar',
    cityHelp: 'Pesquise a cidade desejada',
    productHelp: 'Digite o nome do produto para encontrar',
    userHelp: 'Busque pelo nome do usuário',
    validationError: 'Este campo é obrigatório',
    noResultsHelp: 'Nenhum resultado encontrado para sua busca',
  },
  PLACEHOLDERS: {
    basicPlaceholder: 'Digite para buscar...',
    searchPlaceholder: 'Pesquisar...',
    countryPlaceholder: 'Digite o nome do país',
    cityPlaceholder: 'Digite o nome da cidade',
    productPlaceholder: 'Digite o nome do produto',
    userPlaceholder: 'Digite o nome do usuário',
  },
  OPTIONS: {
    countries: [
      { value: 'br', label: 'Brasil' },
      { value: 'us', label: 'Estados Unidos' },
      { value: 'ca', label: 'Canadá' },
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' },
      { value: 'cl', label: 'Chile' },
      { value: 'co', label: 'Colômbia' },
      { value: 'pe', label: 'Peru' },
    ],
    cities: [
      { value: 'sp', label: 'São Paulo' },
      { value: 'rj', label: 'Rio de Janeiro' },
      { value: 'bh', label: 'Belo Horizonte' },
      { value: 'salvador', label: 'Salvador' },
      { value: 'brasilia', label: 'Brasília' },
      { value: 'fortaleza', label: 'Fortaleza' },
    ],
    products: [
      { value: 'laptop', label: 'Laptop' },
      { value: 'smartphone', label: 'Smartphone' },
      { value: 'tablet', label: 'Tablet' },
      { value: 'monitor', label: 'Monitor' },
      { value: 'keyboard', label: 'Teclado' },
      { value: 'mouse', label: 'Mouse' },
    ],
    users: [
      { value: 'john', label: 'João Silva' },
      { value: 'mary', label: 'Maria Santos' },
      { value: 'peter', label: 'Pedro Oliveira' },
      { value: 'ana', label: 'Ana Costa', disabled: true },
      { value: 'carlos', label: 'Carlos Ferreira' },
    ],
  },
};

// Estilos de container
const containerStyles = {
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
      Componente de seleção com funcionalidade de busca automática que permite
      filtrar opções em tempo real.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente SelectAutocomplete combina a funcionalidade de um campo de
      busca com um select, permitindo que usuários digitem para filtrar opções
      disponíveis. Ideal para listas grandes onde a busca melhora
      significativamente a experiência do usuário.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Busca em Tempo Real</strong>: Filtragem instantânea conforme o
        usuário digita
      </li>
      <li>
        <strong>Navegação por Teclado</strong>: Suporte completo para
        acessibilidade
      </li>
      <li>
        <strong>Destaque de Termos</strong>: Realce dos termos pesquisados nos
        resultados
      </li>
      <li>
        <strong>Estados Visuais</strong>: Feedback claro para busca e seleção
      </li>
      <li>
        <strong>Performance Otimizada</strong>: Suporte a grandes listas de
        opções
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { SelectAutocomplete } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico com busca
<SelectAutocomplete
  label="Pesquisar e selecionar"
  placeholder="Digite para buscar..."
  helperText="Digite para buscar e selecionar uma opção"
  options={[
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' }
  ]}
/>

// Com valor controlado
<SelectAutocomplete
  label="País"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={countries}
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <SelectAutocomplete
    label="Campo Obrigatório"
    error={hasError}
    helperText={hasError ? "Este campo é obrigatório" : "Digite para buscar"}
    options={userOptions}
    required
  />
</form>`}
    />
  </>
);

// Lista de Tipos de Busca
const SearchTypesList = (): JSX.Element => (
  <ul>
    <li>
      <code>Países/Localizações</code>: Para formulários geográficos com busca
    </li>
    <li>
      <code>Usuários/Pessoas</code>: Para seleção de pessoas em sistemas
    </li>
    <li>
      <code>Produtos</code>: Para catálogos e e-commerce
    </li>
    <li>
      <code>Cidades</code>: Para endereços e localização
    </li>
  </ul>
);

// Demonstração de Diferentes Tipos de Dados
const DifferentDataTypes = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <SelectAutocomplete
      label={SELECT_AUTOCOMPLETE_DATA.LABELS.countryLabel}
      placeholder={SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.countryPlaceholder}
      helperText={SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.countryHelp}
      options={SELECT_AUTOCOMPLETE_DATA.OPTIONS.countries}
    />
    <SelectAutocomplete
      label={SELECT_AUTOCOMPLETE_DATA.LABELS.cityLabel}
      placeholder={SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.cityPlaceholder}
      helperText={SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.cityHelp}
      options={SELECT_AUTOCOMPLETE_DATA.OPTIONS.cities}
    />
    <SelectAutocomplete
      label={SELECT_AUTOCOMPLETE_DATA.LABELS.productLabel}
      placeholder={SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.productPlaceholder}
      helperText={SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.productHelp}
      options={SELECT_AUTOCOMPLETE_DATA.OPTIONS.products}
    />
  </div>
);

// Descrição dos Estados
const StatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use as props de estado para diferentes contextos de busca:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>error</code>: Quando há problemas de validação ou seleção
        obrigatória
      </li>
      <li>
        <code>disabled</code>: Quando a busca não está disponível
      </li>
      <li>
        <code>helperText</code>: Para orientar sobre como usar a busca
      </li>
    </ul>
  </>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={containerStyles.showcase}>
    <SelectAutocomplete
      label={SELECT_AUTOCOMPLETE_DATA.LABELS.requiredField}
      placeholder={SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.userPlaceholder}
      helperText={SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.validationError}
      error
      options={SELECT_AUTOCOMPLETE_DATA.OPTIONS.users}
    />
    <SelectAutocomplete
      label={SELECT_AUTOCOMPLETE_DATA.LABELS.userLabel}
      placeholder={SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.userPlaceholder}
      helperText={SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.userHelp}
      error={false}
      options={SELECT_AUTOCOMPLETE_DATA.OPTIONS.users}
    />
    <SelectAutocomplete
      label={SELECT_AUTOCOMPLETE_DATA.LABELS.productLabel}
      placeholder={SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.productPlaceholder}
      helperText={SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.productHelp}
      disabled
      options={SELECT_AUTOCOMPLETE_DATA.OPTIONS.products}
    />
  </div>
);

// Demonstração de Opções Desabilitadas
const DisabledOptionsDemo = (): JSX.Element => (
  <SelectAutocomplete
    label={SELECT_AUTOCOMPLETE_DATA.LABELS.userLabel}
    placeholder={SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.userPlaceholder}
    helperText={SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.userHelp}
    options={SELECT_AUTOCOMPLETE_DATA.OPTIONS.users}
  />
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <DocBlock.Markdown>
      O SelectAutocomplete é especialmente útil quando você tem listas grandes
      de opções e precisa oferecer uma experiência de busca fluida. Aqui estão
      exemplos práticos:
    </DocBlock.Markdown>

    <h3>Integração com Formulários</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <SelectAutocomplete
    label="Usuário"
    placeholder="Digite o nome do usuário"
    name="user"
    options={userOptions}
  />
  <Button type="submit">Enviar</Button>
</form>`}
    />

    <h3>Busca com Estado Controlado</h3>
    <DocBlock.Source
      dark
      code={`function UserSelector() {
  const [selectedUser, setSelectedUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = users.filter(user =>
      user.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <SelectAutocomplete
      label="Selecionar Usuário"
      value={selectedUser}
      onChange={setSelectedUser}
      onSearch={handleSearch}
      options={filteredUsers}
      placeholder="Digite para buscar usuário..."
    />
  );
}`}
    />

    <h3>Busca Assíncrona</h3>
    <DocBlock.Source
      dark
      code={`function AsyncSearch() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.length < 2) return;
    
    setLoading(true);
    try {
      const results = await fetchUsers(searchTerm);
      setOptions(results);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SelectAutocomplete
      label="Buscar Usuários"
      onSearch={handleSearch}
      options={options}
      placeholder="Digite pelo menos 2 caracteres..."
    />
  );
}`}
    />
  </>
);

// Melhores Práticas
const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use labels descritivos que indiquem a funcionalidade de busca</li>
      <li>Forneça placeholders que orientem sobre o que pode ser digitado</li>
      <li>
        Mantenha listas de opções organizadas alfabeticamente quando possível
      </li>
      <li>Use helperText para explicar como a busca funciona</li>
    </ul>

    <h3>2. Performance e Busca</h3>
    <ul>
      <li>
        Para listas muito grandes, considere implementar busca do lado do
        servidor
      </li>
      <li>Use debounce para evitar muitas chamadas de busca</li>
      <li>Limite o número de resultados exibidos simultaneamente</li>
      <li>Implemente busca que funcione com acentos e caracteres especiais</li>
    </ul>

    <h3>3. Experiência do Usuário</h3>
    <ul>
      <li>Considere busca por múltiplos campos (value e label)</li>
      <li>Forneça feedback quando nenhum resultado é encontrado</li>
      <li>Mantenha a busca case-insensitive</li>
      <li>Destaque os termos de busca nos resultados quando possível</li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>Sempre use labels apropriados</li>
      <li>Forneça helperText descritivo sobre a funcionalidade</li>
      <li>Mantenha navegação por teclado funcional</li>
      <li>Use aria-labels adequados para leitores de tela</li>
    </ul>

    <h3>5. Estados e Feedback</h3>
    <ul>
      <li>Mantenha feedback visual claro sobre o estado da busca</li>
      <li>Considere mostrar quantos resultados foram encontrados</li>
      <li>Forneça mensagens claras para estados de erro</li>
      <li>Use indicadores visuais apropriados durante operações assíncronas</li>
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
            <code>.ods-select-autocomplete__root</code>
          </td>
          <td>Estilos aplicados ao elemento raiz do componente.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__input</code>
          </td>
          <td>Estilos aplicados ao campo de entrada de busca.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__arrow</code>
          </td>
          <td>Estilos aplicados ao ícone de seta do dropdown.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__arrow--up</code>
          </td>
          <td>Estilos aplicados à seta quando o popup está aberto.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__arrow--down</code>
          </td>
          <td>Estilos aplicados à seta quando o popup está fechado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__arrow--disabled</code>
          </td>
          <td>Estilos aplicados à seta quando disabled=true.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__listbox</code>
          </td>
          <td>Estilos aplicados ao container das opções filtradas.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__option</code>
          </td>
          <td>Estilos aplicados a cada opção individual nos resultados.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__option--highlighted</code>
          </td>
          <td>Estilos aplicados à opção destacada durante navegação.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__option--selected</code>
          </td>
          <td>Estilos aplicados à opção atualmente selecionada.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__option--disabled</code>
          </td>
          <td>Estilos aplicados às opções desabilitadas.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__no-results</code>
          </td>
          <td>Estilos aplicados à mensagem de nenhum resultado encontrado.</td>
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
      O componente SelectAutocomplete é baseado no elemento input com
      funcionalidade de autocomplete e suporta todos os atributos padrão de
      input.
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
            O rótulo do campo select autocomplete. Exibido acima do campo para
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
            Texto exibido quando nenhuma opção está selecionada. Orienta sobre a
            funcionalidade de busca.
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
            Texto de ajuda exibido abaixo do campo. Use para instruções de busca
            ou validação.
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
            Quando true, desabilita o campo select autocomplete. Use quando a
            busca não é permitida.
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
            Array de opções disponíveis para busca e seleção. Cada opção deve
            ter value e label.
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
        <tr>
          <td>
            <code>onSearch</code>
          </td>
          <td>
            <code>function</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Callback chamado quando o usuário digita no campo. Útil para busca
            assíncrona.
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
    label: SELECT_AUTOCOMPLETE_DATA.LABELS.basicLabel,
    placeholder: SELECT_AUTOCOMPLETE_DATA.PLACEHOLDERS.basicPlaceholder,
    helperText: SELECT_AUTOCOMPLETE_DATA.HELPER_TEXTS.basicHelp,
    error: false,
    disabled: false,
    options: SELECT_AUTOCOMPLETE_DATA.OPTIONS.countries,
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
export const DifferentDataTypesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DifferentDataTypes />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const DisabledOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DisabledOptionsDemo />,
};

// Meta configuration
const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Components/Inputs/SelectAutocomplete',
  component: SelectAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'O valor atualmente selecionado.',
      control: 'text',
    },
    label: {
      description: 'O rótulo do campo select autocomplete.',
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
      description: 'Quando true, desabilita o campo select autocomplete.',
      control: 'boolean',
    },
    options: {
      description: 'Array de opções disponíveis para busca e seleção.',
      control: { type: null },
    },
    onSearch: {
      description: 'Callback chamado quando o usuário digita no campo.',
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
          <h3 id="tipos-busca">Tipos de Busca</h3>
          <SearchTypesList />
          <DocBlock.Canvas of={DifferentDataTypesStory} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={ErrorStates} />
          <h3 id="opcoes-desabilitadas">Opções Desabilitadas</h3>
          <DocBlock.Canvas of={DisabledOptions} />
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
