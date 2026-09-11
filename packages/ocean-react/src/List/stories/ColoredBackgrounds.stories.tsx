import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  CheckCircleOutline,
  ChevronRight,
  PlaceholderOutline,
} from '@useblu/ocean-icons-react';
import {
  colorInterfaceLightPure,
  colorInterfaceLightUp,
  colorStatusNegativeUp,
  colorStatusWarningUp,
  borderRadiusMd,
  spacingStackXs,
} from '@useblu/ocean-tokens/web/tokens';
import List from '../List';
import ListAction from '../../ListAction';
import ListExpandable from '../../ListExpandable';
import ListReadOnly from '../../ListReadOnly';
import ListSettings from '../../ListSettings';
import ListSelectable from '../../ListSelectable';
import CardListItem from '../../CardListItem';
import TransactionListItem from '../../TransactionListItem';
import InternalContextualHero from '../../InternalContextualHero';

const meta: Meta = {
  title: 'Components/List/Fundos não brancos',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Os itens de lista não têm fundo próprio: herdam o do container. ' +
          'Hover, focus, `:active` e `--show-hover` usam `Interface/Light/Up` com ' +
          '`mix-blend-mode: multiply`, e os dividers `Interface/Light/Down` também em ' +
          'multiply — sobre branco o resultado é o mesmo de antes; sobre fundo colorido ' +
          'o hover deriva do próprio fundo.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const backgrounds = [
  { label: 'Branco (Interface/Light/Pure)', color: colorInterfaceLightPure },
  { label: 'Interface/Light/Up', color: colorInterfaceLightUp },
  { label: 'Status/Warning/Up', color: colorStatusWarningUp },
  { label: 'Status/Negative/Up', color: colorStatusNegativeUp },
];

const Surface = ({
  color,
  label,
  children,
}: {
  color: string;
  label: string;
  children: React.ReactNode;
}): JSX.Element => (
  <div>
    <h4 style={{ margin: `0 0 ${spacingStackXs} 0`, fontSize: '14px' }}>
      {label}
    </h4>
    <div
      style={{
        backgroundColor: color,
        borderRadius: borderRadiusMd,
        padding: spacingStackXs,
        width: '400px',
      }}
    >
      {children}
    </div>
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: spacingStackXs,
      alignItems: 'flex-start',
    }}
  >
    {children}
  </div>
);

const textListActions = (
  <>
    <ListAction
      title="Parcela 1 de 3"
      description="Vence em 5 dias"
      icon={<CheckCircleOutline size={24} />}
      type="text"
      showDivider
      onClick={() => undefined}
    />
    <ListAction
      title="Parcela 2 de 3"
      description="Vence em 35 dias"
      icon={<CheckCircleOutline size={24} />}
      type="text"
      showDivider
      onClick={() => undefined}
    />
    <ListAction
      title="Parcela 3 de 3"
      description="Vence em 65 dias"
      icon={<CheckCircleOutline size={24} />}
      type="text"
      onClick={() => undefined}
    />
  </>
);

export const TextListAction: Story = {
  name: 'ListAction (text) — hover/focus/active',
  render: () => (
    <Grid>
      {backgrounds.map(({ label, color }) => (
        <Surface key={label} label={label} color={color}>
          {textListActions}
        </Surface>
      ))}
    </Grid>
  ),
};

export const InsideContextualHero: Story = {
  name: 'ListAction dentro da InternalContextualHero',
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: spacingStackXs }}
    >
      {(['default', 'warning', 'negative'] as const).map((type) => (
        <InternalContextualHero
          key={type}
          type={type}
          title={`Hero ${type}`}
          description="O hover dos itens compõe com o fundo da hero."
          actions={[{ label: 'Ação', onClick: () => undefined }]}
          listItems={[
            <ListAction
              key="1"
              title="Item 1"
              description="Descrição 1"
              type="text"
              showDivider
              onClick={() => undefined}
            />,
            <ListAction
              key="2"
              title="Item 2"
              description="Descrição 2"
              type="text"
              showDivider
              onClick={() => undefined}
            />,
            <ListAction
              key="3"
              title="Item 3"
              description="Descrição 3"
              type="text"
              onClick={() => undefined}
            />,
          ]}
        />
      ))}
    </div>
  ),
};

export const ExpandableShowHover: Story = {
  name: 'ListExpandable — --show-hover e focus',
  render: () => (
    <Grid>
      {backgrounds.map(({ label, color }) => (
        <Surface key={label} label={label} color={color}>
          <ListExpandable
            title="Hover simulado"
            description="Modificador --show-hover ligado"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            showDivider
            className="ods-list-expandable--show-hover"
          >
            <div style={{ padding: spacingStackXs }}>Conteúdo expandido</div>
          </ListExpandable>
          <ListExpandable
            title="Item normal"
            description="Passe o mouse ou foque por teclado"
            icon={<PlaceholderOutline size={24} />}
            type="text"
          >
            <div style={{ padding: spacingStackXs }}>Conteúdo expandido</div>
          </ListExpandable>
        </Surface>
      ))}
    </Grid>
  ),
};

export const CardAndTransactionInsideList: Story = {
  name: 'CardListItem e TransactionListItem dentro de List',
  render: () => (
    <Grid>
      {backgrounds.map(({ label, color }) => (
        <Surface key={label} label={label} color={color}>
          <List>
            <CardListItem
              title="Card list item"
              description="Dentro de List"
              leadingIcon={<PlaceholderOutline />}
              actionIcon={<ChevronRight />}
              fullWidth
            />
            <TransactionListItem
              icon={<PlaceholderOutline />}
              value="R$ 100,00"
              tags="Transação"
            >
              Transaction list item
            </TransactionListItem>
            <TransactionListItem
              icon={<PlaceholderOutline />}
              value="R$ 50,00"
              isLoading
            >
              Carregando
            </TransactionListItem>
          </List>
        </Surface>
      ))}
    </Grid>
  ),
};

export const SelectableReadOnlyAndSettings: Story = {
  name: 'ListSelectable, ListReadOnly e ListSettings',
  render: () => (
    <Grid>
      {backgrounds.map(({ label, color }) => (
        <Surface key={label} label={label} color={color}>
          <ListSelectable
            title="Selecionável"
            description="Hover e focus compõem com o fundo"
            checkbox={{ id: `checkbox-${label}` }}
            showDivider
          />
          <ListReadOnly
            title="Somente leitura"
            description="Sem hover, sem fundo próprio"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            showDivider
          />
          <ListSettings
            title="Configuração"
            description="Sem hover, sem fundo próprio"
            icon={<PlaceholderOutline size={24} />}
            actionType="button"
            buttonLabel="Editar"
            type="text"
            onButtonClick={() => undefined}
          />
        </Surface>
      ))}
    </Grid>
  ),
};

export const DisabledAndLoading: Story = {
  name: 'Disabled e loading — sem hover',
  render: () => (
    <Grid>
      {backgrounds.map(({ label, color }) => (
        <Surface key={label} label={label} color={color}>
          <ListAction
            title="Desabilitado"
            description="Sem hover"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            showDivider
            disabled
          />
          <ListAction
            title="Carregando"
            description="Sem hover"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            loading
          />
        </Surface>
      ))}
    </Grid>
  ),
};
