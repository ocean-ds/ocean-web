import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import ListSettings from '../ListSettings';
import List from '../../List';

const meta: Meta<typeof ListSettings> = {
  title: 'Components/List/ListSettings',
  component: ListSettings,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    strikethroughDescription: { control: 'text' },
    caption: { control: 'text' },
    inverted: { control: 'boolean' },
    type: {
      description: 'Tipo de estilo do card.',
      control: 'select',
      options: ['card', 'text'],
    },
    status: {
      description: 'Status do conteúdo do card.',
      control: 'select',
      options: ['default', 'inactive', 'positive', 'warning', 'highlight', 'highlight-lead', 'strikethrough'],
    },
    showDivider: {
      description: 'Mostra um divisor entre os cards quando type é "text".',
      control: 'boolean',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    icon: {
      control: 'select',
      options: ['withoutIcon', 'withIcon'],
    },
    actionType: {
      description: 'Tipo de ação: botão (requer confirmação) ou toggle (ação imediata)',
      control: 'select',
      options: ['button', 'toggle'],
    },
    buttonLabel: {
      description: 'Label do botão (apenas quando actionType="button")',
      control: 'text',
    },
    buttonSize: {
      control: 'select',
      options: ['sm', 'md'],
    },
    buttonVariant: {
      description: 'Variant do botão (apenas quando actionType="button")',
      control: 'select',
      options: ['primary', 'primaryCritical', 'secondary', 'secondaryCritical', 'tertiary', 'tertiaryCritical'],
    },
    toggleChecked: {
      description: 'Estado do toggle (apenas quando actionType="toggle")',
      control: 'boolean',
    },
    onButtonClick: { action: 'button clicked' },
    onToggleChange: { action: 'toggle changed' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ListSettings>;

// Story Usage (Principal com Controles)
export const Usage: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    icon: 'withIcon',
    actionType: 'button',
    buttonLabel: 'Label',
    buttonSize: 'sm',
    type: 'card',
    status: 'default',
    showDivider: false,
    onButtonClick: () => alert('Button clicked!'),
  },
  render: (args) => {
    const iconMap = {
      withoutIcon: undefined,
      withIcon: <PlaceholderOutline size={24} />,
    };

    return (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ minWidth: '400px' }}>
          <ListSettings
            {...args}
            icon={iconMap[args.icon as keyof typeof iconMap]}
          />
        </div>
      </div>
    );
  },
};

// Story: Action Type Button
export const ActionTypeButton: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListSettings
        title="Default State"
        description="Button action enabled"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Button clicked!')}
      />
      <ListSettings
        title="Disabled State"
        description="Button action disabled"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Label"
        disabled
        onButtonClick={() => alert('Button clicked!')}
      />
      <ListSettings
        title="Loading State"
        description="Loading state"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Label"
        loading
        onButtonClick={() => alert('Button clicked!')}
      />
    </List>
  ),
};

// Story: Action Type Toggle
export const ActionTypeToggle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function RenderToggle() {
    const [toggle1, setToggle1] = React.useState(false);
    const [toggle2, setToggle2] = React.useState(true);

    return (
      <List style={{ minWidth: '300px' }}>
        <ListSettings
          title="Toggle Off"
          description="Toggle action disabled"
          icon={<PlaceholderOutline size={24} />}
          actionType="toggle"
          toggleChecked={toggle1}
          onToggleChange={setToggle1}
        />
        <ListSettings
          title="Toggle On"
          description="Toggle action enabled"
          icon={<PlaceholderOutline size={24} />}
          actionType="toggle"
          toggleChecked={toggle2}
          onToggleChange={setToggle2}
        />
        <ListSettings
          title="Disabled State"
          description="Toggle disabled"
          icon={<PlaceholderOutline size={24} />}
          actionType="toggle"
          toggleChecked={false}
          disabled
          onToggleChange={() => undefined}
        />
        <ListSettings
          title="Loading State"
          description="Loading state"
          icon={<PlaceholderOutline size={24} />}
          actionType="toggle"
          loading
          onToggleChange={() => undefined}
        />
      </List>
    );
  },
};

// Story: With and Without Icon
export const WithAndWithoutIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListSettings
        title="With Icon"
        description="Card with icon"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Button clicked!')}
      />
      <ListSettings
        title="Without Icon"
        description="Card without icon"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Button clicked!')}
      />
      <ListSettings
        title="With Icon Toggle"
        description="Card with icon and toggle"
        icon={<PlaceholderOutline size={24} />}
        actionType="toggle"
        toggleChecked={false}
        onToggleChange={() => undefined}
      />
      <ListSettings
        title="Without Icon Toggle"
        description="Card without icon with toggle"
        actionType="toggle"
        toggleChecked
        onToggleChange={() => undefined}
      />
    </List>
  ),
};

// Story: Without Description
export const WithoutDescription: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListSettings
        title="Only Title - Button"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Button clicked!')}
      />
      <ListSettings
        title="Only Title - Toggle"
        icon={<PlaceholderOutline size={24} />}
        actionType="toggle"
        toggleChecked={false}
        onToggleChange={() => undefined}
      />
    </List>
  ),
};

// Story: All Content Types
export const AllContentTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListSettings
        title="Status Default"
        description="Default content status"
        icon={<PlaceholderOutline size={24} />}
        status="default"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicked!')}
      />
      <ListSettings
        title="Status Inactive"
        description="Inactive content"
        icon={<PlaceholderOutline size={24} />}
        status="inactive"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicked!')}
      />
      <ListSettings
        title="Status Positive"
        description="Positive content"
        icon={<PlaceholderOutline size={24} />}
        status="positive"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicked!')}
      />
      <ListSettings
        title="Status Warning"
        description="Warning content"
        icon={<PlaceholderOutline size={24} />}
        status="warning"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicked!')}
      />
      <ListSettings
        title="Status Highlight"
        description="Highlighted content"
        icon={<PlaceholderOutline size={24} />}
        status="highlight"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicked!')}
      />
      <ListSettings
        title="Status Highlight Lead"
        description="Highlight lead content"
        icon={<PlaceholderOutline size={24} />}
        status="highlight-lead"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicked!')}
      />
    </List>
  ),
};

// Story: Button Sizes
export const ButtonSizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListSettings
        title="Button Size Small"
        description="Small button size"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Label"
        buttonSize="sm"
        onButtonClick={() => alert('Button clicked!')}
      />
      <ListSettings
        title="Button Size Medium"
        description="Medium button size"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Label"
        buttonSize="md"
        onButtonClick={() => alert('Button clicked!')}
      />
    </List>
  ),
};

// Story: Interactive Toggle with Alert
export const InteractiveToggleWithAlert: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function RenderInteractive() {
    const [isEnabled, setIsEnabled] = React.useState(false);

    const handleToggleChange = (checked: boolean) => {
      setIsEnabled(checked);
      alert(`Toggle ${checked ? 'ativado' : 'desativado'}!`);
    };

    return (
      <List style={{ minWidth: '300px' }}>
        <ListSettings
          title="Notificações Push"
          description="Receba alertas em tempo real"
          icon={<PlaceholderOutline size={24} />}
          actionType="toggle"
          toggleChecked={isEnabled}
          onToggleChange={handleToggleChange}
        />
      </List>
    );
  },
};

// Story: Button Variants
export const ButtonVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListSettings
        title="Primary Button"
        description="Primary variant"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Primary"
        buttonVariant="primary"
        onButtonClick={() => alert('Primary clicked!')}
      />
      <ListSettings
        title="Secondary Button"
        description="Secondary variant"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Secondary"
        buttonVariant="secondary"
        onButtonClick={() => alert('Secondary clicked!')}
      />
      <ListSettings
        title="Tertiary Button"
        description="Tertiary variant"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Tertiary"
        buttonVariant="tertiary"
        onButtonClick={() => alert('Tertiary clicked!')}
      />
      <ListSettings
        title="Primary Critical Button"
        description="Primary critical variant"
        icon={<PlaceholderOutline size={24} />}
        actionType="button"
        buttonLabel="Critical"
        buttonVariant="primaryCritical"
        onButtonClick={() => alert('Critical clicked!')}
      />
    </List>
  ),
};

// Story: With Strikethrough Description
export const WithStrikethroughDescription: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListSettings
        title="R$ 99,90"
        description="Preço promocional"
        strikethroughDescription="R$ 149,90"
        icon={<PlaceholderOutline size={24} />}
        status="strikethrough"
        actionType="button"
        buttonLabel="Comprar"
        onButtonClick={() => alert('Comprar!')}
      />
    </List>
  ),
};

// Story: With Ref
export const WithRef: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function RenderWithRef() {
    const ref = React.useRef<HTMLDivElement>(null);

    const scrollToElement = () => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ref.current.style.border = '2px solid blue';
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.border = '';
          }
        }, 2000);
      }
    };

    return (
      <div style={{ minWidth: '300px' }}>
        <button type="button" onClick={scrollToElement} style={{ marginBottom: '20px' }}>
          Scroll to Card with Ref
        </button>
        <List>
          <ListSettings
            title="Card 1"
            description="Without ref"
            icon={<PlaceholderOutline size={24} />}
            actionType="button"
            buttonLabel="Action"
            onButtonClick={() => alert('Card 1')}
          />
          <ListSettings
            title="Card 2"
            description="Without ref"
            icon={<PlaceholderOutline size={24} />}
            actionType="button"
            buttonLabel="Action"
            onButtonClick={() => alert('Card 2')}
          />
          <ListSettings
            ref={ref}
            title="Card with Ref"
            description="This card has a ref attached"
            icon={<PlaceholderOutline size={24} />}
            actionType="button"
            buttonLabel="Action"
            onButtonClick={() => alert('Card with Ref')}
          />
          <ListSettings
            title="Card 3"
            description="Without ref"
            icon={<PlaceholderOutline size={24} />}
            actionType="button"
            buttonLabel="Action"
            onButtonClick={() => alert('Card 3')}
          />
        </List>
      </div>
    );
  },
};

// Story: Tipo Text com Divisor
export const TextTypeWithDivider: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ minWidth: '300px' }}>
      <ListSettings
        title="Card com tipo Text"
        description="R$ 1.234,56"
        caption="Legenda terciária"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        showDivider
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicado!')}
      />
      <ListSettings
        title="Card com Caption"
        description="Descrição secundária"
        caption="12/12/2024 às 14:30"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        showDivider
        actionType="toggle"
        toggleChecked={false}
        onToggleChange={() => undefined}
      />
      <ListSettings
        title="Último Card sem Divisor"
        description="Sem showDivider"
        caption="Este é o último item"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        actionType="button"
        buttonLabel="Label"
        onButtonClick={() => alert('Clicado!')}
      />
    </div>
  ),
};

// Story: Comparação entre tipos Card e Text
export const CardVsTextType: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ marginBottom: '16px' }}>type=&quot;card&quot; (padrão)</h4>
        <List style={{ minWidth: '300px' }}>
          <ListSettings
            title="Card Type"
            description="Com borda de card"
            caption="Caption de exemplo"
            icon={<PlaceholderOutline size={24} />}
            type="card"
            actionType="button"
            buttonLabel="Label"
            onButtonClick={() => alert('Clicado!')}
          />
          <ListSettings
            title="Outro Card"
            description="Segunda linha"
            caption="Mais informações"
            icon={<PlaceholderOutline size={24} />}
            type="card"
            actionType="toggle"
            toggleChecked
            onToggleChange={() => undefined}
          />
        </List>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px' }}>type=&quot;text&quot;</h4>
        <List style={{ minWidth: '300px' }}>
          <ListSettings
            title="Text Type"
            description="Sem borda de card"
            caption="Caption de exemplo"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            showDivider
            actionType="button"
            buttonLabel="Label"
            onButtonClick={() => alert('Clicado!')}
          />
          <ListSettings
            title="Outro Text"
            description="Segunda linha"
            caption="Mais informações"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            showDivider
            actionType="toggle"
            toggleChecked
            onToggleChange={() => undefined}
          />
        </List>
      </div>
    </div>
  ),
};
