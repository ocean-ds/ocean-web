import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Search from '../Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Texto de placeholder do campo de busca.',
      control: 'text',
    },
    disabled: {
      description: 'Desabilita o campo de busca.',
      control: 'boolean',
    },
    label: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
    tooltipMessage: {
      table: { disable: true },
    },
    htmlFor: {
      table: { disable: true },
    },
    helperText: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Usage: Story = {
  args: {
    placeholder: 'Buscar...',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

const WithValueComponent = () => {
  const [searchValue, setSearchValue] = React.useState('Exemplo de busca');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Search
        placeholder="Buscar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
        Valor atual: &quot;{searchValue}&quot;
      </p>
    </div>
  );
};

export const WithValue: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <WithValueComponent />,
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Search placeholder="Campo normal" />
      <Search placeholder="Campo desabilitado" disabled />
      <Search placeholder="Campo com valor" defaultValue="Texto de exemplo" />
    </div>
  ),
};

const InteractiveComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState<string[]>([]);

  const mockData = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Next.js',
    'Vue.js',
    'Angular',
    'Svelte',
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      const filtered = mockData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Search
        placeholder="Buscar tecnologias..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {results.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Resultados:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
            {results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>
      )}

      {searchTerm.length > 0 && results.length === 0 && (
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          Nenhum resultado encontrado para &quot;{searchTerm}&quot;
        </p>
      )}
    </div>
  );
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <InteractiveComponent />,
};
