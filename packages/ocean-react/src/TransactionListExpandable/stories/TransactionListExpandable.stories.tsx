import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListExpandable, {
  TransactionListExpandableProps,
} from '../TransactionListExpandable';
import Tag from '../../Tag';
import List from '../../List';
import ListAction from '../../ListAction';
import placeholderIcon from '../assets/placeholder.svg';

export type StateOption = 'Default' | 'Hover' | 'Loading';

type TransactionListExpandableStoryArgs = TransactionListExpandableProps & {
  state?: StateOption;
};

const meta: Meta<typeof TransactionListExpandable> = {
  title: 'Components/List/TransactionListExpandable',
  component: TransactionListExpandable,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal da transação.',
      control: 'text',
    },
    description: {
      description: 'Descrição ou texto secundário.',
      control: 'text',
    },
    caption: {
      description: 'Legenda ou texto terciário.',
      control: 'text',
    },
    amount: {
      description: 'Valor exibido à direita (ex: R$ 0,00).',
      control: 'text',
    },
    amountType: {
      description: 'Tipo visual do valor (default, positive, negative).',
      control: 'select',
      options: ['default', 'positive', 'negative'],
    },
    showAmountIndicator: {
      description: 'Exibe o indicador (tag) ao lado do valor.',
      control: 'boolean',
    },
    additionalData: {
      description:
        'Dado adicional abaixo do valor (exibido apenas se preenchido).',
      control: 'text',
    },
    inverted: {
      description: 'Inverte a posição do título com a descrição.',
      control: 'boolean',
    },
    type: {
      description: 'Tipo de estilo (card ou text).',
      control: 'select',
      options: ['card', 'text'],
    },
    status: {
      description: 'Status do conteúdo.',
      control: 'select',
      options: [
        'default',
        'inactive',
        'positive',
        'warning',
        'highlight',
        'highlight-lead',
        'strikethrough',
      ],
    },
    loading: {
      description:
        'Estado de carregamento com skeleton (espelhado por state=Loading).',
      control: { type: null },
    },
    disabled: {
      description: 'Se está desabilitado.',
      control: 'boolean',
    },
    showDivider: {
      description: 'Mostra divisor entre o header e o conteúdo expandido.',
      control: 'boolean',
    },
    expanded: {
      description: 'Se o conteúdo está expandido.',
      control: 'boolean',
    },
    onToggle: {
      description: 'Callback ao expandir/colapsar.',
      action: 'toggled',
    },
    children: {
      description: 'Conteúdo exibido quando expandido (ex.: ListAction).',
      control: false,
    },
    supportingText: {
      description: 'Texto de apoio exibido abaixo do conteúdo expandido.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TransactionListExpandable>;

const defaultSupportingText = 'Supporting text that providing context.';

const childContentWithFooter = (
  <>
    <ListAction
      title="Title"
      description="Description"
      caption="Caption"
      icon={
        <img src={placeholderIcon as unknown as string} alt="placeholder" />
      }
      type="text"
      inverted
      position="first"
      amountDetails={{
        amount: 'R$ 0,00',
        indicator: (
          <Tag type="positive" size="small" setIconOff>
            Label
          </Tag>
        ),
        additionalData: 'Additional data',
      }}
    />
    <ListAction
      title="Title"
      description="Description"
      caption="Caption"
      icon={
        <img src={placeholderIcon as unknown as string} alt="placeholder" />
      }
      type="text"
      inverted
      position="last"
      amountDetails={{
        amount: 'R$ 0,00',
        indicator: (
          <Tag type="positive" size="small" setIconOff>
            Label
          </Tag>
        ),
        additionalData: 'Additional data',
      }}
    />
  </>
);

function UsageWrapper(props: TransactionListExpandableStoryArgs) {
  const [expanded, setExpanded] = React.useState(true);
  const { state = 'Default', ...rest } = props;
  const isLoading = state === 'Loading';
  const showHover = state === 'Hover';
  const wrapperClassName = showHover
    ? 'ods-list-expandable--show-hover'
    : undefined;

  return (
    <div style={{ width: '400px' }} className={wrapperClassName}>
      <TransactionListExpandable
        {...rest}
        expanded={expanded}
        onToggle={setExpanded}
        loading={isLoading}
        amountIndicator={
          <Tag type="positive" size="small" setIconOff>
            Label
          </Tag>
        }
        icon={<PlaceholderOutline size={24} />}
      >
        {childContentWithFooter}
      </TransactionListExpandable>
    </div>
  );
}

export const Usage: StoryObj<TransactionListExpandableStoryArgs> = {
  argTypes: {
    state: {
      description: 'Estado visual do componente (Default, Hover, Loading).',
      control: 'select',
      options: ['Default', 'Hover', 'Loading'],
    },
  },
  args: {
    state: 'Default',
    title: 'Title',
    description: 'Description',
    caption: 'Caption',
    amount: 'R$ 0,00',
    amountType: 'default',
    additionalData: 'Additional data',
    type: 'card',
    showDivider: false,
    expanded: true,
    supportingText: defaultSupportingText,
  },
  render: (args) => <UsageWrapper {...args} />,
};

export const StateDefault: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: '400px' }}>
      <TransactionListExpandable
        title="Title"
        description="Description"
        caption="Caption"
        amount="R$ 0,00"
        amountIndicator={
          <Tag type="positive" size="small" setIconOff>
            Label
          </Tag>
        }
        additionalData="Additional data"
        icon={<PlaceholderOutline size={24} />}
        showDivider
        expanded
        supportingText={defaultSupportingText}
      >
        {childContentWithFooter}
      </TransactionListExpandable>
    </div>
  ),
};

export const StateHover: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: '400px' }} className="ods-list-expandable--show-hover">
      <TransactionListExpandable
        title="Title"
        description="Description"
        caption="Caption"
        amount="R$ 0,00"
        amountIndicator={
          <Tag type="positive" size="small" setIconOff>
            Label
          </Tag>
        }
        additionalData="Additional data"
        icon={<PlaceholderOutline size={24} />}
        showDivider
        expanded
        supportingText={defaultSupportingText}
      >
        {childContentWithFooter}
      </TransactionListExpandable>
    </div>
  ),
};

export const StateLoading: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: '400px' }}>
      <TransactionListExpandable
        title="Transação"
        description="Descrição"
        amount="R$ 0,00"
        icon={<PlaceholderOutline size={24} />}
        showDivider={false}
        loading
      />
    </div>
  ),
};

export const AmountTypes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <List style={{ width: '400px' }}>
      <TransactionListExpandable
        title="Transação"
        description="Valor default"
        amount="R$ 0,00"
        icon={<PlaceholderOutline size={24} />}
      />
      <TransactionListExpandable
        title="Transação"
        description="Valor positivo"
        amount="R$ 500,00"
        amountType="positive"
        amountIndicator={
          <Tag type="positive" size="small" setIconOff>
            Crédito
          </Tag>
        }
        icon={<PlaceholderOutline size={24} />}
      />
      <TransactionListExpandable
        title="Transação"
        description="Valor negativo"
        amount="R$ 150,00"
        amountType="negative"
        amountIndicator={
          <Tag type="negative" size="small" setIconOff>
            Débito
          </Tag>
        }
        icon={<PlaceholderOutline size={24} />}
      />
    </List>
  ),
};
