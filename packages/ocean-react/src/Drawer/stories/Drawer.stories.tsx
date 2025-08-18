import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Drawer from '../Drawer';
import SimpleDrawer from '../examples/SimpleDrawer';
import AttachedDrawer from '../examples/AttachedDrawer';
import Button from '../../Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Conteúdo a ser exibido dentro do drawer.',
      control: false,
    },
    open: {
      description: 'Controla se o drawer está aberto ou fechado.',
      control: 'boolean',
    },
    onDrawerClose: {
      description: 'Função chamada quando o drawer é fechado.',
      control: false,
    },
    overlayClose: {
      description: 'Função chamada quando clica no overlay.',
      control: false,
    },
    headerIcon: {
      description: 'Ícone customizado para o cabeçalho.',
      control: false,
    },
    align: {
      description: 'Posição do drawer na tela.',
      control: 'select',
      options: ['left', 'right'],
    },
    iconAlignment: {
      description: 'Alinhamento do ícone no cabeçalho.',
      control: 'select',
      options: ['left', 'right'],
    },
    anchorEl: {
      description: 'Elemento de referência para posicionamento.',
      control: false,
    },
    onMouseOutDrawer: {
      description: 'Função chamada quando o mouse sai do drawer.',
      control: false,
    },
    size: {
      description: 'Tamanho do drawer.',
      control: 'radio',
      options: ['small', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerContent = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
      }}
    >
      <h3
        style={{
          fontFamily: 'Avenir',
          fontSize: '20px',
          fontWeight: '800',
          lineHeight: '22px',
          color: '#393B47',
          margin: '0 0 8px 0',
        }}
      >
        Drawer title
      </h3>
      <p
        style={{
          fontFamily: 'Nunito Sans',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
          color: '#67697A',
          margin: '0 0 16px 0',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipi elit. Semper diam
        adipiscing.
      </p>
      <div
        style={{
          width: '100%',
          height: '120px',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          color: '#999',
        }}
      >
        Conteúdo placeholder
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderTop: 'solid 1px #EBECF5',
      }}
    >
      <Button
        variant="secondary"
        size="md"
        blocked
        style={{ margin: '0 12px 0 0' }}
      >
        Cancelar
      </Button>
      <Button size="md" blocked>
        Confirmar
      </Button>
    </div>
  </div>
);

export const Usage: Story = {
  args: {
    open: false,
    align: 'right',
    iconAlignment: 'right',
    size: 'small',
  },
  render: (args) => (
    <SimpleDrawer {...args}>
      <DrawerContent />
    </SimpleDrawer>
  ),
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '500px',
          height: '400px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Attached: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <AttachedDrawer align="right" iconAlignment="right" size="small">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 24px',
          height: '400px',
        }}
      >
        <h3
          style={{
            fontFamily: 'Avenir',
            fontSize: '20px',
            fontWeight: '800',
            lineHeight: '22px',
            color: '#393B47',
            margin: '0 0 8px 0',
          }}
        >
          Drawer anexado
        </h3>
        <p>Este drawer está anexado a um elemento específico da página.</p>
      </div>
    </AttachedDrawer>
  ),
};
