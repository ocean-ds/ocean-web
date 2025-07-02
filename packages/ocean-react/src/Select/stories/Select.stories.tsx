import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Select from '../Select';

type Story = StoryObj<typeof Select>;

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

// Melhores Práticas
const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
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

    <h3>2. Organização das Opções</h3>
    <ul>
      <li>
        Use Select para listas de até 20 itens (use SelectAutocomplete para
        mais)
      </li>
      <li>
        Ordene opções alfabeticamente ou por importância/frequência de uso
      </li>
      <li>Evite opções com textos muito similares que possam confundir</li>
      <li>Considere agrupar categorias quando aplicável</li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Sempre forneça labels descritivos para leitores de tela</li>
      <li>Use helper text para orientações importantes</li>
      <li>Mantenha estados visuais claros (erro, desabilitado)</li>
      <li>Garanta que a navegação por teclado funcione corretamente</li>
    </ul>

    <h3>4. Design e UX</h3>
    <ul>
      <li>
        Evite labels genéricos como &ldquo;Selecione&rdquo; ou
        &ldquo;Escolha&rdquo;
      </li>
      <li>Use placeholders informativos que demonstrem o conteúdo esperado</li>
      <li>Forneça feedback visual claro para estados de validação</li>
      <li>Mantenha consistência visual em toda a aplicação</li>
    </ul>
  </>
);

// Classes CSS
const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
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

// Referência da API
const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
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
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '300px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Stories visuais com controles desabilitados
export const OptionTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select
        label="Campo Obrigatório"
        placeholder="Selecione uma categoria"
        helperText="Este campo é obrigatório"
        error
        options={[
          { value: 'electronics', label: 'Eletrônicos' },
          { value: 'clothing', label: 'Vestuário' },
          { value: 'books', label: 'Livros' },
        ]}
      />
      <Select
        label="Status"
        placeholder="Escolha o status"
        helperText="Atualize o status do item"
        options={[
          { value: 'pending', label: 'Pendente' },
          { value: 'in-progress', label: 'Em Andamento' },
          { value: 'completed', label: 'Concluído' },
          { value: 'cancelled', label: 'Cancelado' },
        ]}
      />
      <Select
        label="Prioridade"
        placeholder="Defina a prioridade"
        helperText="Defina a prioridade da tarefa"
        disabled
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
    onChange: {
      description: 'Callback chamado quando o valor muda.',
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
          <h3 id="tipos-opcoes">Tipos de Opções</h3>
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
