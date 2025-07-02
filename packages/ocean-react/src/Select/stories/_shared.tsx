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
      code={'import { Select } from "@useblu/ocean-react";'}
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
      code={'import { SelectAutocomplete } from "@useblu/ocean-react";'}
    />
  </>
);

// Padrões Comuns para Select
export const SelectCommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={
        '// Uso básico\n<Select\n  label="Selecione uma opção"\n  placeholder="Selecione..."\n  helperText="Escolha uma das opções disponíveis"\n  options={[\n    { value: "br", label: "Brasil" },\n    { value: "us", label: "Estados Unidos" },\n    { value: "ca", label: "Canadá" }\n  ]}\n/>\n\n// Com valor controlado\n<Select\n  label="País"\n  value={selectedCountry}\n  onChange={setSelectedCountry}\n  options={countries}\n/>\n\n// Em formulários com validação\n<form onSubmit={handleSubmit}>\n  <Select\n    label="Campo Obrigatório"\n    error={hasError}\n    helperText={hasError ? "Este campo é obrigatório" : "Escolha uma categoria"}\n    options={categories}\n    required\n  />\n</form>'
      }
    />
  </>
);

// Padrões Comuns para SelectAutocomplete
export const SelectAutocompleteCommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={
        '// Uso básico com busca\n<SelectAutocomplete\n  label="Pesquisar e selecionar"\n  placeholder="Digite para buscar..."\n  helperText="Digite para buscar e selecionar uma opção"\n  options={[\n    { value: "br", label: "Brasil" },\n    { value: "us", label: "Estados Unidos" },\n    { value: "ca", label: "Canadá" }\n  ]}\n/>\n\n// Com valor controlado\n<SelectAutocomplete\n  label="País"\n  value={selectedCountry}\n  onChange={setSelectedCountry}\n  options={countries}\n/>\n\n// Em formulários com validação\n<form onSubmit={handleSubmit}>\n  <SelectAutocomplete\n    label="Campo Obrigatório"\n    error={hasError}\n    helperText={hasError ? "Este campo é obrigatório" : "Digite para buscar"}\n    options={userOptions}\n    required\n  />\n</form>'
      }
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

// Melhores Práticas para Select
export const SelectBestPractices = (): JSX.Element => (
  <>
    <h3>Melhores Práticas</h3>
    <h4>✅ Recomendado</h4>
    <ul>
      <li>
        Use labels descritivos que expliquem claramente o propósito da seleção
      </li>
      <li>Forneça helper text quando necessário para orientar o usuário</li>
      <li>
        Mantenha as opções organizadas em ordem lógica (alfabética, por
        importância)
      </li>
      <li>
        Use placeholders que indiquem a ação esperada (&ldquo;Selecione um
        país&rdquo;)
      </li>
    </ul>
    <h4>❌ Evite</h4>
    <ul>
      <li>
        Labels genéricos como &ldquo;Selecione&rdquo; ou &ldquo;Escolha&rdquo;
      </li>
      <li>Listas muito longas sem categorização</li>
      <li>Opções com textos muito similares que possam confundir</li>
      <li>
        Usar Select para listas com mais de 20 itens (considere
        SelectAutocomplete)
      </li>
    </ul>
  </>
);

// Melhores Práticas para SelectAutocomplete
export const SelectAutocompleteBestPractices = (): JSX.Element => (
  <>
    <h3>1. Uso Geral</h3>
    <ul>
      <li>Use para listas grandes (mais de 20 opções)</li>
      <li>
        Forneça placeholders que incentivem a digitação (&ldquo;Digite para
        buscar...&rdquo;)
      </li>
      <li>Implemente feedback visual durante a busca</li>
      <li>Forneça mensagens claras quando não há resultados</li>
    </ul>

    <h3>2. Funcionalidade de Busca</h3>
    <ul>
      <li>Implemente busca sensível a acentos e maiúsculas/minúsculas</li>
      <li>Configure busca responsiva com debounce apropriado</li>
      <li>Evite busca muito restritiva que não encontre resultados óbvios</li>
      <li>Considere busca por múltiplos campos (label, value, descrição)</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Mantenha navegação por teclado funcional durante a busca</li>
      <li>Forneça feedback sonoro para leitores de tela</li>
      <li>Use aria-labels apropriados para o campo de busca</li>
      <li>Anuncie mudanças no número de resultados encontrados</li>
    </ul>

    <h3>4. Design e UX</h3>
    <ul>
      <li>Evite usar para listas pequenas (menos de 10 itens)</li>
      <li>Destaque visualmente o termo buscado nos resultados</li>
      <li>Mantenha consistência visual com outros campos de busca</li>
      <li>Forneça indicadores visuais de carregamento quando necessário</li>
    </ul>
  </>
);

// Classes CSS para Select
export const SelectCssClasses = (): JSX.Element => (
  <>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-select</code>
          </td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__label</code>
          </td>
          <td>Estilos aplicados ao label do campo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__input</code>
          </td>
          <td>Estilos aplicados ao campo de input do select.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__dropdown</code>
          </td>
          <td>Estilos aplicados ao container do dropdown.</td>
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
          <td>Estilos aplicados a opções desabilitadas.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select__helper-text</code>
          </td>
          <td>Estilos aplicados ao texto de ajuda.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select--error</code>
          </td>
          <td>Estilos aplicados quando o componente está em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select--disabled</code>
          </td>
          <td>Estilos aplicados quando o componente está desabilitado.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// Classes CSS para SelectAutocomplete
export const SelectAutocompleteCssClasses = (): JSX.Element => (
  <>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-select-autocomplete</code>
          </td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__label</code>
          </td>
          <td>Estilos aplicados ao label do campo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__input</code>
          </td>
          <td>Estilos aplicados ao campo de input de busca.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete__dropdown</code>
          </td>
          <td>Estilos aplicados ao container do dropdown.</td>
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
          <td>Estilos aplicados à opção destacada durante a busca.</td>
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
          <td>Estilos aplicados à mensagem de sem resultados.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete--error</code>
          </td>
          <td>Estilos aplicados quando o componente está em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-select-autocomplete--disabled</code>
          </td>
          <td>Estilos aplicados quando o componente está desabilitado.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// Referência da API para Select
export const SelectApiReference = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      O componente Select é baseado no elemento HTML select e suporta todos os
      atributos padrão relevantes.
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
          <td>options</td>
          <td>
            <code>Option[]</code>
          </td>
          <td>
            <code>[]</code>
          </td>
          <td>
            Array de opções para seleção. Cada opção deve ter value e label.
          </td>
        </tr>
        <tr>
          <td>value</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Valor atualmente selecionado no select.</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>
            <code>(value: string) =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Callback chamado quando o valor selecionado muda.</td>
        </tr>
        <tr>
          <td>label</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Rótulo descritivo do campo de seleção.</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto exibido quando nenhuma opção está selecionada.</td>
        </tr>
        <tr>
          <td>helperText</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto de ajuda exibido abaixo do campo.</td>
        </tr>
        <tr>
          <td>error</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, aplica o estilo de erro ao campo.</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, desabilita o campo select.</td>
        </tr>
      </tbody>
    </table>

    <h4>Tipo Option</h4>
    <DocBlock.Source
      dark
      code={`interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}`}
    />

    <DocBlock.Markdown>
      A ref é encaminhada para o elemento select. Qualquer outra prop fornecida
      será passada para o elemento select.
    </DocBlock.Markdown>
  </>
);

// Referência da API para SelectAutocomplete
export const SelectAutocompleteApiReference = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      O componente SelectAutocomplete é baseado no elemento HTML input com
      funcionalidade de busca e suporta todos os atributos padrão relevantes.
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
          <td>options</td>
          <td>
            <code>Option[]</code>
          </td>
          <td>
            <code>[]</code>
          </td>
          <td>Array de opções disponíveis para busca e seleção.</td>
        </tr>
        <tr>
          <td>value</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Valor atualmente selecionado no select autocomplete.</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>
            <code>(value: string) =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Callback chamado quando o valor selecionado muda.</td>
        </tr>
        <tr>
          <td>onSearch</td>
          <td>
            <code>(query: string) =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Callback chamado quando o usuário digita no campo de busca.</td>
        </tr>
        <tr>
          <td>label</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Rótulo descritivo do campo de busca.</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto exibido quando o campo está vazio.</td>
        </tr>
        <tr>
          <td>helperText</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto de ajuda exibido abaixo do campo.</td>
        </tr>
        <tr>
          <td>error</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, aplica o estilo de erro ao campo.</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, desabilita o campo select autocomplete.</td>
        </tr>
      </tbody>
    </table>

    <h4>Tipo Option</h4>
    <DocBlock.Source
      dark
      code={`interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}`}
    />

    <DocBlock.Markdown>
      A ref é encaminhada para o elemento input. Qualquer outra prop fornecida
      será passada para o elemento input.
    </DocBlock.Markdown>
  </>
);

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
