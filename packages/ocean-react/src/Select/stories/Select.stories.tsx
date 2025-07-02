import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Select from '../Select';
import {
  SELECT_COMMON_DATA,
  commonContainerStyles,
  SelectIntroduction,
  SelectCommonPatterns,
  SelectOptionTypesList,
  SelectStatesDescription,
  SelectUsageExamples,
  SelectBestPractices,
  SelectCssClasses,
  SelectApiReference,
  commonSelectArgTypes,
} from './_shared';

type Story = StoryObj<typeof Select>;

// Demonstração de Diferentes Opções
const DifferentOptions = (): JSX.Element => (
  <div style={commonContainerStyles.showcase}>
    <Select
      label={SELECT_COMMON_DATA.LABELS.countryLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.countryPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.countryHelp}
      options={SELECT_COMMON_DATA.OPTIONS.countries}
    />
    <Select
      label={SELECT_COMMON_DATA.LABELS.categoryLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.categoryPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.categoryHelp}
      options={SELECT_COMMON_DATA.OPTIONS.categories}
    />
    <Select
      label={SELECT_COMMON_DATA.LABELS.priorityLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.priorityPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.priorityHelp}
      options={SELECT_COMMON_DATA.OPTIONS.priorities}
    />
  </div>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={commonContainerStyles.showcase}>
    <Select
      label={SELECT_COMMON_DATA.LABELS.requiredField}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.categoryPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.validationError}
      error
      options={SELECT_COMMON_DATA.OPTIONS.categories}
    />
    <Select
      label={SELECT_COMMON_DATA.LABELS.statusLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.statusPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.statusHelp}
      error={false}
      options={SELECT_COMMON_DATA.OPTIONS.statuses}
    />
    <Select
      label={SELECT_COMMON_DATA.LABELS.priorityLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.priorityPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.priorityHelp}
      disabled
      options={SELECT_COMMON_DATA.OPTIONS.priorities}
    />
  </div>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: SELECT_COMMON_DATA.LABELS.basicLabel,
    placeholder: SELECT_COMMON_DATA.PLACEHOLDERS.basicPlaceholder,
    helperText: SELECT_COMMON_DATA.HELPER_TEXTS.basicHelp,
    error: false,
    disabled: false,
    options: SELECT_COMMON_DATA.OPTIONS.countries,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '300px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Stories visuais sem controles
export const DifferentOptionTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DifferentOptions />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

// Meta configuration
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: commonSelectArgTypes,
  parameters: {
    docs: {
      page: () => (
        <>
          <SelectIntroduction />
          <DocBlock.Heading>Uso</DocBlock.Heading>
          <DocBlock.Canvas of={Usage} />
          <DocBlock.Controls of={Usage} />
          <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
          <SelectCommonPatterns />
          <DocBlock.Heading>Exemplos</DocBlock.Heading>
          <h3 id="opcoes">Tipos de Opções</h3>
          <SelectOptionTypesList />
          <DocBlock.Canvas of={DifferentOptionTypes} />
          <h3 id="estados">Estados</h3>
          <SelectStatesDescription />
          <DocBlock.Canvas of={ErrorStates} />
          <SelectUsageExamples />
          <SelectBestPractices />
          <SelectCssClasses />
          <SelectApiReference />
        </>
      ),
    },
  },
};

export default meta;
