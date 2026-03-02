import React, { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PhotographOutline, CheckCircleOutline, PlaceholderOutline } from '@useblu/ocean-icons-react';
import InternalContextualHero, {
  InternalContextualHeroProps,
  InternalContextualHeroListItemString,
} from '../InternalContextualHero';
import ListAction from '../../ListAction';

const ImagePlaceholder = (): ReactElement => (
  <div
    style={{
      width: '200px',
      height: '100%',
      border: '1px dashed #7B61FF',
      backgroundColor: '#EDEAFF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <PhotographOutline size={32} color="#5872F5" />
  </div>
);

const listItemsOptions: Record<string, (ReactElement | InternalContextualHeroListItemString)[]> = {
  'Without list items': [],
  'Text with icons': [
    { icon: <CheckCircleOutline size={20} />, description: 'This is item number one' },
    { icon: <CheckCircleOutline size={20} />, description: 'And this one is item number two' },
    { icon: <CheckCircleOutline size={20} />, description: 'Here you have the 3rd item' },
  ],
  'Text without icons': [
    { description: 'First item without icon' },
    { description: 'Second item without icon' },
    { description: 'Third item without icon' },
  ],
  'ListAction components': [
    <ListAction key="1" title="Item 1" icon={<PlaceholderOutline size={20} color="#5872F5" />} description="Description 1" type="text" showDivider />,
    <ListAction key="2" title="Item 2" description="Description 2" type="text" showDivider />,
    <ListAction key="3" title="Item 3" description="Description 3" type="text" />,
  ],
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => { };

const meta: Meta<typeof InternalContextualHero> = {
  title: 'Components/InternalContextualHero',
  component: InternalContextualHero,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InternalContextualHero>;

type UsageArgs = {
  title: string;
  description: string;
  showImage: boolean;
  actionsCount: 'None' | 'One' | 'Two';
  primaryActionLabel: string;
  secondaryActionLabel: string;
  listItems: string;
  imagePosition: 'top' | 'bottom' | 'full';
  type: 'default' | 'warning' | 'negative';
};

export const Usage = {
  argTypes: {
    type: {
      description: 'Tipo do hero.',
      control: 'select',
      options: ['default', 'warning', 'negative'],
    },
    title: {
      description: 'Título principal do hero.',
      control: 'text',
    },
    description: {
      description: 'Descrição ou subtítulo do hero.',
      control: 'text',
    },
    showImage: {
      description: 'Exibir imagem na lateral direita.',
      control: 'boolean',
    },
    imagePosition: {
      description: 'Posição da imagem.',
      control: 'select',
      options: ['top', 'bottom', 'full'],
    },
    actionsCount: {
      description: 'Quantidade de botões de ação.',
      control: 'select',
      options: ['None', 'One', 'Two'],
    },
    primaryActionLabel: {
      description: 'Label do botão primário.',
      control: 'text',
      if: { arg: 'actionsCount', neq: 'None' },
    },
    secondaryActionLabel: {
      description: 'Label do botão secundário.',
      control: 'text',
      if: { arg: 'actionsCount', eq: 'Two' },
    },
    listItems: {
      description: 'Tipo dos itens da lista.',
      control: 'select',
      options: Object.keys(listItemsOptions),
    },

  },
  args: {
    type: 'default',
    title: 'Highlight personalized messages based on the users journey',
    description: 'Supporting text that providing context benefits.',
    showImage: true,
    imagePosition: 'top',
    actionsCount: 'Two',
    primaryActionLabel: 'Primary Action',
    secondaryActionLabel: 'Secondary Action',
    listItems: 'Text with icons',
  },
  render: (args: UsageArgs): ReactElement => {
    const getActions = (): InternalContextualHeroProps['actions'] => {
      if (args.actionsCount === 'None') return undefined;
      if (args.actionsCount === 'One') {
        return [{ label: args.primaryActionLabel, onClick: noop }];
      }
      return [
        { label: args.primaryActionLabel, onClick: noop },
        { label: args.secondaryActionLabel, onClick: noop },
      ];
    };

    return (
      <InternalContextualHero
        type={args.type}
        title={args.title}
        imagePosition={args.imagePosition}
        description={args.description}
        image={args.showImage ? <ImagePlaceholder /> : undefined}
        actions={getActions()}
        listItems={listItemsOptions[args.listItems as keyof typeof listItemsOptions]}
      />
    );
  },
};

export const WithOneAction: Story = {
  args: {
    title: 'Single action variant',
    description: 'This variant shows only one action button.',
    image: <ImagePlaceholder />,
    actions: [{ label: 'Single Action', onClick: noop }],
    listItems: [
      { icon: <PlaceholderOutline size={20} />, description: 'First item in the list' },
      { icon: <PlaceholderOutline size={20} color="#5872F5" />, description: 'Second item in the list' },
    ],
  },
};

export const WithoutActions: Story = {
  args: {
    title: 'No actions variant',
    description: 'This variant shows the hero without any action buttons.',
    image: <ImagePlaceholder />,
    listItems: [
      { icon: <PlaceholderOutline size={20} color="#5872F5" />, description: 'First item' },
      { icon: <PlaceholderOutline size={20} color="#5872F5" />, description: 'Second item' },
      { icon: <PlaceholderOutline size={20} color="#5872F5" />, description: 'Third item' },
    ],
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'No image variant',
    description: 'This variant shows the hero without the image section.',
    actions: [
      { label: 'Primary Action', onClick: noop },
      { label: 'Secondary Action', onClick: noop },
    ],
    listItems: [
      { icon: <CheckCircleOutline size={20} color="#5872F5" />, description: 'Item without image' },
      { icon: <CheckCircleOutline size={20} color="#5872F5" />, description: 'Another item' },
    ],
  },
};

export const WithListActionItems: Story = {
  args: {
    title: 'Using ListAction components',
    description: 'This variant uses ListAction components as list items.',
    image: <ImagePlaceholder />,
    actions: [{ label: 'Action', onClick: noop }],
    listItems: [
      <ListAction
        key="1"
        title="Item 1"
        description="Description 1"
        type="text"
        // eslint-disable-next-line no-alert
        onClick={(): void => window.alert('Action 1')}
        showDivider
        actionType="menu"
        menuActions={[{ label: 'Menu Action', onClick: noop }]}
      />,
      <ListAction
        key="2"
        title="Item 2"
        description="Description 2"
        type="text"
        showDivider
      />,
      <ListAction
        key="3"
        title="Item 3"
        description="Description 3"
        type="text"
      />,
    ],
  },
};

export const WithTextListItems: Story = {
  args: {
    title: 'Text list items with icons',
    description: 'This variant uses simple text items with icons.',
    image: <ImagePlaceholder />,
    actions: [
      { label: 'Learn More', onClick: noop },
      { label: 'Dismiss', onClick: noop },
    ],
    listItems: [
      { icon: <CheckCircleOutline size={20} color="#5872F5" />, description: 'This is item number one' },
      { icon: <CheckCircleOutline size={20} color="#5872F5" />, description: 'And this one is item number two' },
      { icon: <CheckCircleOutline size={20} color="#5872F5" />, description: 'Here you have the 3rd item' },
    ],
  },
};

export const WithTextListItemsNoIcons: Story = {
  args: {
    title: 'Text list items without icons',
    description: 'This variant uses simple text items without icons.',
    image: <ImagePlaceholder />,
    actions: [{ label: 'Primary', onClick: noop }],
    listItems: [
      { description: 'First item without icon' },
      { description: 'Second item without icon' },
      { description: 'Third item without icon' },
    ],
  },
};

export const Minimal: Story = {
  args: {
    title: 'Minimal variant',
    description: 'Only title, description and list items.',
    listItems: [
      { description: 'Simple item 1' },
      { description: 'Simple item 2' },
    ],
  },
};

export const TypeDefault: Story = {
  args: {
    type: 'default',
    title: 'Default type variant',
    description: 'This is the default type with primary colors.',
    image: <ImagePlaceholder />,
    actions: [
      { label: 'Primary Action', onClick: noop },
      { label: 'Secondary Action', onClick: noop },
    ],
    listItems: [
      { icon: <CheckCircleOutline size={20} />, description: 'Default styled item 1' },
      { icon: <CheckCircleOutline size={20} />, description: 'Default styled item 2' },
    ],
  },
};

export const TypeWarning: Story = {
  args: {
    type: 'warning',
    title: 'Warning type variant',
    description: 'This variant uses warning colors for attention.',
    image: <ImagePlaceholder />,
    actions: [
      { label: 'Primary Action', onClick: noop },
      { label: 'Secondary Action', onClick: noop },
    ],
    listItems: [
      { icon: <CheckCircleOutline size={20} />, description: 'Warning styled item 1' },
      { icon: <CheckCircleOutline size={20} />, description: 'Warning styled item 2' },
    ],
  },
};

export const TypeNegative: Story = {
  args: {
    type: 'negative',
    title: 'Negative type variant',
    description: 'This variant uses critical/negative colors for errors.',
    image: <ImagePlaceholder />,
    actions: [
      { label: 'Primary Action', onClick: noop },
      { label: 'Secondary Action', onClick: noop },
    ],
    listItems: [
      { icon: <CheckCircleOutline size={20} />, description: 'Negative styled item 1' },
      { icon: <CheckCircleOutline size={20} />, description: 'Negative styled item 2' },
    ],
  },
};

export const ImagePositionTop: Story = {
  args: {
    title: 'Image position: top',
    description: 'Image aligned to the top right corner.',
    imagePosition: 'top',
    image: <ImagePlaceholder />,
    actions: [{ label: 'Action', onClick: noop }],
    listItems: [
      { icon: <CheckCircleOutline size={20} />, description: 'Item with top image' },
      { icon: <CheckCircleOutline size={20} />, description: 'Another item' },
    ],
  },
};

export const ImagePositionBottom: Story = {
  args: {
    title: 'Image position: bottom',
    description: 'Image aligned to the bottom right corner.',
    imagePosition: 'bottom',
    image: <ImagePlaceholder />,
    actions: [{ label: 'Action', onClick: noop }],
    listItems: [
      { icon: <CheckCircleOutline size={20} />, description: 'Item with bottom image' },
      { icon: <CheckCircleOutline size={20} />, description: 'Another item' },
    ],
  },
};

export const ImagePositionFull: Story = {
  args: {
    title: 'Image position: full',
    description: 'Image takes full height on the right side.',
    imagePosition: 'full',
    image: <ImagePlaceholder />,
    actions: [{ label: 'Action', onClick: noop }],
    listItems: [
      { icon: <CheckCircleOutline size={20} />, description: 'Item with full image' },
      { icon: <CheckCircleOutline size={20} />, description: 'Another item' },
    ],
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h2 style={{ marginBottom: '8px' }}>Type Variants</h2>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Default Type</h3>
        <InternalContextualHero
          type="default"
          title="Default type"
          description="Primary colors and styling."
          image={<ImagePlaceholder />}
          actions={[
            { label: 'Primary', onClick: noop },
            { label: 'Secondary', onClick: noop },
          ]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Warning Type</h3>
        <InternalContextualHero
          type="warning"
          title="Warning type"
          description="Warning colors for attention."
          image={<ImagePlaceholder />}
          actions={[
            { label: 'Primary', onClick: noop },
            { label: 'Secondary', onClick: noop },
          ]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Negative Type</h3>
        <InternalContextualHero
          type="negative"
          title="Negative type"
          description="Critical colors for errors."
          image={<ImagePlaceholder />}
          actions={[
            { label: 'Primary', onClick: noop },
            { label: 'Secondary', onClick: noop },
          ]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <h2 style={{ marginBottom: '8px', marginTop: '24px' }}>Image Position Variants</h2>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Image Position: Top (default)</h3>
        <InternalContextualHero
          title="Top position"
          description="Image aligned to top right."
          imagePosition="top"
          image={<ImagePlaceholder />}
          actions={[{ label: 'Action', onClick: noop }]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Image Position: Bottom</h3>
        <InternalContextualHero
          title="Bottom position"
          description="Image aligned to bottom right."
          imagePosition="bottom"
          image={<ImagePlaceholder />}
          actions={[{ label: 'Action', onClick: noop }]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Image Position: Full</h3>
        <InternalContextualHero
          title="Full position"
          description="Image takes full height."
          imagePosition="full"
          image={<ImagePlaceholder />}
          actions={[{ label: 'Action', onClick: noop }]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <h2 style={{ marginBottom: '8px', marginTop: '24px' }}>Content Variants</h2>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Complete (with image, actions and list)</h3>
        <InternalContextualHero
          title="Complete variant"
          description="All elements visible."
          image={<ImagePlaceholder />}
          actions={[
            { label: 'Primary', onClick: noop },
            { label: 'Secondary', onClick: noop },
          ]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Without image</h3>
        <InternalContextualHero
          title="No image variant"
          description="Without the image section."
          actions={[{ label: 'Action', onClick: noop }]}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Without actions</h3>
        <InternalContextualHero
          title="No actions variant"
          description="Without action buttons."
          image={<ImagePlaceholder />}
          listItems={[
            { icon: <CheckCircleOutline size={20} />, description: 'Item 1' },
            { icon: <CheckCircleOutline size={20} />, description: 'Item 2' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Minimal</h3>
        <InternalContextualHero
          title="Minimal variant"
          description="Only required elements."
          listItems={[
            { description: 'Item 1' },
            { description: 'Item 2' },
          ]}
        />
      </div>
    </div>
  ),
};

