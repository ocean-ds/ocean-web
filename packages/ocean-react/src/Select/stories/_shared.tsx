import * as DocBlock from '@storybook/blocks';
import React from 'react';

// Constantes consolidadas do Select
export const SELECT_COMMON_DATA = {
  LABELS: {
    // Labels básicos
    basicLabel: 'Selecione uma opção',
    searchLabel: 'Pesquisar e selecionar',
    buscarLabel: 'Buscar opção',

    // Labels específicos
    countryLabel: 'País',
    cityLabel: 'Cidade',
    categoryLabel: 'Categoria',
    priorityLabel: 'Prioridade',
    statusLabel: 'Status',
    productLabel: 'Produto',
    userLabel: 'Usuário',
    requiredField: 'Campo Obrigatório',
  },
  HELPER_TEXTS: {
    // Helper texts básicos
    basicHelp: 'Escolha uma das opções disponíveis',
    searchHelp: 'Digite para buscar e selecionar uma opção',
    searchAdvancedHelp:
      'Use o campo para pesquisar entre as opções disponíveis',
    formatHelp: 'Use as setas para navegar ou digite para buscar',

    // Helper texts específicos
    countryHelp: 'Selecione o país de origem',
    countrySearchHelp: 'Digite o nome do país para buscar',
    cityHelp: 'Pesquise a cidade desejada',
    categoryHelp: 'Escolha a categoria do produto',
    priorityHelp: 'Defina a prioridade da tarefa',
    statusHelp: 'Atualize o status do item',
    productHelp: 'Digite o nome do produto para encontrar',
    userHelp: 'Busque pelo nome do usuário',

    // Validação e erros
    validationError: 'Este campo é obrigatório',
    noResultsHelp: 'Nenhum resultado encontrado para sua busca',
  },
  PLACEHOLDERS: {
    // Placeholders básicos
    basicPlaceholder: 'Selecione...',
    searchPlaceholder: 'Digite para buscar...',
    advancedSearchPlaceholder: 'Pesquisar...',

    // Placeholders específicos
    countryPlaceholder: 'Escolha um país',
    countrySearchPlaceholder: 'Digite o nome do país',
    citySearchPlaceholder: 'Digite o nome da cidade',
    categoryPlaceholder: 'Selecione uma categoria',
    priorityPlaceholder: 'Defina a prioridade',
    statusPlaceholder: 'Escolha o status',
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

// Retrocompatibilidade com constantes antigas
export const SELECT_DATA = SELECT_COMMON_DATA;
export const SELECT_AUTOCOMPLETE_DATA = SELECT_COMMON_DATA;

// Estilos compartilhados
export const commonContainerStyles = {
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

// Componente de Introdução para Select
export const SelectIntroduction = (): JSX.Element => (
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

// Componente de Introdução para SelectAutocomplete
export const SelectAutocompleteIntroduction = (): JSX.Element => (
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

// Padrões Comuns para Select
export const SelectCommonPatterns = (): JSX.Element => (
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

// Padrões Comuns para SelectAutocomplete
export const SelectAutocompleteCommonPatterns = (): JSX.Element => (
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

// Lista de Tipos de Opções para Select
export const SelectOptionTypesList = (): JSX.Element => (
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

// Lista de Tipos de Busca para SelectAutocomplete
export const SelectAutocompleteSearchTypesList = (): JSX.Element => (
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

// Descrição dos Estados compartilhada
export const SelectStatesDescription = (): JSX.Element => (
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

// Descrição dos Estados para SelectAutocomplete
export const SelectAutocompleteStatesDescription = (): JSX.Element => (
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

// Exemplos de Uso compartilhados
export const SelectUsageExamples = (): JSX.Element => (
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

// Exemplos de Uso para SelectAutocomplete
export const SelectAutocompleteUsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente SelectAutocomplete é ideal para listas grandes e pesquisas
      dinâmicas. Aqui estão alguns exemplos práticos:
    </DocBlock.Markdown>

    <h3>Busca de Usuários</h3>
    <DocBlock.Source
      dark
      code={`function UserSelector() {
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm) {
      const results = await searchUsers(searchTerm);
      setUsers(results);
    }
  };

  return (
    <SelectAutocomplete
      label="Selecionar Usuário"
      placeholder="Digite o nome do usuário"
      value={selectedUser}
      onChange={setSelectedUser}
      onSearch={handleSearch}
      options={users}
    />
  );
}`}
    />

    <h3>Busca de Produtos</h3>
    <DocBlock.Source
      dark
      code={`<SelectAutocomplete
  label="Produto"
  placeholder="Digite o nome do produto"
  helperText="Digite para buscar entre milhares de produtos"
  options={products}
  onSearch={handleProductSearch}
/>`}
    />

    <h3>Localização com Busca</h3>
    <DocBlock.Source
      dark
      code={`function LocationPicker() {
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState([]);

  const handleCountryChange = (countryValue) => {
    setCountry(countryValue);
    setCities(getCitiesByCountry(countryValue));
  };

  return (
    <div>
      <SelectAutocomplete
        label="País"
        placeholder="Digite o nome do país"
        value={country}
        onChange={handleCountryChange}
        options={countries}
      />
      {cities.length > 0 && (
        <SelectAutocomplete
          label="Cidade"
          placeholder="Digite o nome da cidade"
          options={cities}
          disabled={!country}
        />
      )}
    </div>
  );
}`}
    />
  </>
);

// Melhores Práticas compartilhadas
export const SelectBestPractices = (): JSX.Element => (
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

// Melhores Práticas para SelectAutocomplete
export const SelectAutocompleteBestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Busca Eficiente</h3>
    <ul>
      <li>
        Implemente debounce para evitar muitas requisições durante a digitação
      </li>
      <li>Use busca incremental para listas grandes</li>
      <li>Forneça feedback de loading durante a busca</li>
      <li>Mantenha histórico de buscas recentes quando apropriado</li>
    </ul>

    <h3>2. Experiência do Usuário</h3>
    <ul>
      <li>Destaque os termos pesquisados nos resultados</li>
      <li>Mostre mensagens claras quando não há resultados</li>
      <li>Permita seleção por teclado e mouse</li>
      <li>Mantenha foco no campo após seleção quando necessário</li>
    </ul>

    <h3>3. Performance</h3>
    <ul>
      <li>Use virtualização para listas muito grandes</li>
      <li>Implemente cache de resultados quando possível</li>
      <li>Considere paginação para datasets extensos</li>
      <li>Otimize queries de busca no backend</li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>Use ARIA labels apropriados para leitores de tela</li>
      <li>Anuncie o número de resultados encontrados</li>
      <li>Mantenha navegação por teclado funcional</li>
      <li>Forneça instruções claras sobre como usar a busca</li>
    </ul>
  </>
);

// Classes CSS compartilhadas
export const SelectCssClasses = (): JSX.Element => (
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

// Classes CSS para SelectAutocomplete
export const SelectAutocompleteCssClasses = (): JSX.Element => (
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
          <td>Estilos aplicados ao campo de entrada/busca.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__input--searching</code>
          </td>
          <td>Estilos aplicados ao input durante a busca.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__listbox</code>
          </td>
          <td>Estilos aplicados ao container das opções.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__option</code>
          </td>
          <td>Estilos aplicados a cada opção individual.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__option--highlighted</code>
          </td>
          <td>Estilos aplicados à opção com destaque de busca.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__option--selected</code>
          </td>
          <td>Estilos aplicados à opção atualmente selecionada.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__no-results</code>
          </td>
          <td>Estilos aplicados à mensagem de nenhum resultado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__loading</code>
          </td>
          <td>Estilos aplicados ao indicador de carregamento.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// API Reference para Select
export const SelectApiReference = (): JSX.Element => (
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

// API Reference para SelectAutocomplete
export const SelectAutocompleteApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>API Reference</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente SelectAutocomplete é baseado no elemento input com
      funcionalidade de autocomplete e suporta propriedades específicas para
      busca.
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
            O rótulo do campo select autocomplete. Exibido acima do campo.
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
            busca.
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
            Texto de ajuda exibido abaixo do campo. Use para instruções de
            busca.
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
          <td>Quando true, aplica o estilo de erro ao campo de busca.</td>
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
          <td>Quando true, desabilita o campo de busca e seleção.</td>
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
            Array de opções disponíveis para busca e seleção. Suporta opções
            desabilitadas.
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
          <td>O valor atualmente selecionado. Use para controlar o estado.</td>
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
            Callback chamado quando o usuário digita. Recebe o termo de busca.
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

// ArgTypes compartilhados
export const commonSelectArgTypes = {
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
};

// ArgTypes específicos para SelectAutocomplete
export const selectAutocompleteArgTypes = {
  ...commonSelectArgTypes,
  label: {
    description: 'O rótulo do campo select autocomplete.',
    control: 'text',
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
};
