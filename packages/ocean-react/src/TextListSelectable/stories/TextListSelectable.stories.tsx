import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TextListSelectable from '../TextListSelectable';

const storyStyles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '0px',
    width: '360px',
  },
  gridContainer: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    width: '100%',
    maxWidth: '800px',
  },
  singleItem: {
    width: '360px',
  },
};

const meta: Meta<typeof TextListSelectable> = {
  title: 'Components/List/TextListSelectable',
  component: TextListSelectable,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal do item (obrigatório).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    description: {
      description: 'Descrição detalhada do item (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    caption: {
      description: 'Legenda ou informação adicional em destaque (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    tagLabel: {
      description: 'Texto da tag exibida ao lado do título (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    loading: {
      description: 'Exibe estado de carregamento com skeleton.',
      control: 'boolean',
      table: {
        category: '⚙️ Estado',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'Desabilita o item, tornando-o não interativo.',
      control: 'boolean',
      table: {
        category: '⚙️ Estado',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkbox: {
      table: { disable: true },
    },
    radio: {
      table: { disable: true },
    },
    showDivider: {
      table: { disable: true },
    },
    indicator: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextListSelectable>;

export const Usage: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    tagLabel: 'Label',
    checkbox: { id: 'checkbox-usage' },
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={storyStyles.singleItem}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Checkbox States
export const CheckboxStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-default' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-checked', checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-indeterminate', indeterminate: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-disabled' }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-disabled-checked', checked: true }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-error', error: true }}
        showDivider
      />
    </div>
  ),
};

// Radio States
export const RadioStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        radio={{ id: 'radio-default', name: 'radio-group' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        radio={{ id: 'radio-selected', name: 'radio-group', checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        radio={{ id: 'radio-disabled', name: 'radio-group-2' }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        radio={{
          id: 'radio-disabled-selected',
          name: 'radio-group-2',
          checked: true,
        }}
        disabled
        showDivider
      />
    </div>
  ),
};

// Without Tag Label
export const WithoutTagLabel: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-no-tag-default' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-no-tag-indeterminate', indeterminate: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-no-tag-checked', checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-no-tag-disabled' }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-no-tag-disabled-checked', checked: true }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-no-tag-error', error: true }}
        showDivider
      />
    </div>
  ),
};

// Radio Without Tag Label
export const RadioWithoutTagLabel: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-no-tag-default', name: 'radio-no-tag' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{
          id: 'radio-no-tag-selected',
          name: 'radio-no-tag',
          checked: true,
        }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-no-tag-disabled', name: 'radio-no-tag-2' }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{
          id: 'radio-no-tag-disabled-selected',
          name: 'radio-no-tag-2',
          checked: true,
        }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-no-tag-error', name: 'radio-no-tag-3' }}
        showDivider
      />
    </div>
  ),
};

// All States Grid
export const AllStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.gridContainer}>
      {/* Checkbox with Label */}
      <div style={storyStyles.container}>
        <h3 style={{ marginBottom: '16px' }}>Checkbox com Label</h3>
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          checkbox={{ id: 'cb-label-1' }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          checkbox={{ id: 'cb-label-2', checked: true }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          checkbox={{ id: 'cb-label-3', indeterminate: true }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          checkbox={{ id: 'cb-label-4' }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          checkbox={{ id: 'cb-label-5', checked: true }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          checkbox={{ id: 'cb-label-6', error: true }}
          showDivider
        />
      </div>

      {/* Radio with Label */}
      <div style={storyStyles.container}>
        <h3 style={{ marginBottom: '16px' }}>Radio com Label</h3>
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          radio={{ id: 'radio-label-1', name: 'radio-label' }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          radio={{ id: 'radio-label-2', name: 'radio-label', checked: true }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          radio={{ id: 'radio-label-3', name: 'radio-label-2' }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          radio={{ id: 'radio-label-4', name: 'radio-label-2', checked: true }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          tagLabel="Label"
          radio={{ id: 'radio-label-5', name: 'radio-label-3' }}
          showDivider
        />
      </div>

      {/* Checkbox without Label */}
      <div style={storyStyles.container}>
        <h3 style={{ marginBottom: '16px' }}>Checkbox sem Label</h3>
        <TextListSelectable
          title="Title"
          description="Description"
          checkbox={{ id: 'cb-no-label-1' }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          checkbox={{ id: 'cb-no-label-2', indeterminate: true }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          checkbox={{ id: 'cb-no-label-3', checked: true }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          checkbox={{ id: 'cb-no-label-4' }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          checkbox={{ id: 'cb-no-label-5', checked: true }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          checkbox={{ id: 'cb-no-label-6', error: true }}
          showDivider
        />
      </div>

      {/* Radio without Label */}
      <div style={storyStyles.container}>
        <h3 style={{ marginBottom: '16px' }}>Radio sem Label</h3>
        <TextListSelectable
          title="Title"
          description="Description"
          radio={{ id: 'radio-no-label-1', name: 'radio-no-label' }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          radio={{
            id: 'radio-no-label-2',
            name: 'radio-no-label',
            checked: true,
          }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          radio={{ id: 'radio-no-label-3', name: 'radio-no-label-2' }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          radio={{
            id: 'radio-no-label-4',
            name: 'radio-no-label-2',
            checked: true,
          }}
          disabled
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          radio={{ id: 'radio-no-label-5', name: 'radio-no-label-3' }}
          showDivider
        />
        <TextListSelectable
          title="Title"
          description="Description"
          radio={{
            id: 'radio-no-label-6',
            name: 'radio-no-label-3',
            checked: true,
          }}
          showDivider
        />
      </div>
    </div>
  ),
};

// With Caption
export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Title"
        description="Description"
        caption="Caption"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-caption-1' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        caption="Caption"
        tagLabel="Label"
        checkbox={{ id: 'checkbox-caption-2', checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        caption="Caption"
        checkbox={{ id: 'checkbox-caption-3' }}
        showDivider
      />
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Title"
        description="Description"
        tagLabel="Label"
        loading
        checkbox={{ id: 'checkbox-loading' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        loading
        radio={{ id: 'radio-loading', name: 'radio-loading' }}
        showDivider
      />
    </div>
  ),
};

// Complete Example
export const Complete: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Item completo"
        description="Este item possui todas as funcionalidades disponíveis"
        caption="Legenda adicional"
        tagLabel="Premium"
        checkbox={{ id: 'checkbox-complete', checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Item completo com radio"
        description="Item completo usando radio button"
        caption="Legenda adicional"
        tagLabel="Nova"
        radio={{ id: 'radio-complete', name: 'complete-group', checked: true }}
        showDivider
      />
    </div>
  ),
};
