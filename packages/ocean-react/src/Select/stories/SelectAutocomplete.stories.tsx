import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import SelectAutocomplete from '../SelectAutocomplete';
import {
  SELECT_COMMON_DATA,
  commonContainerStyles,
  SelectAutocompleteIntroduction,
  SelectAutocompleteCommonPatterns,
  SelectAutocompleteSearchTypesList,
  SelectAutocompleteStatesDescription,
  SelectAutocompleteBestPractices,
  SelectAutocompleteCssClasses,
  SelectAutocompleteApiReference,
  selectAutocompleteArgTypes,
} from './_shared';

type Story = StoryObj<typeof SelectAutocomplete>;

// Demonstração com opções de busca
const SearchExamples = (): JSX.Element => (
  <div style={commonContainerStyles.showcase}>
    <SelectAutocomplete
      label={SELECT_COMMON_DATA.LABELS.countryLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.countrySearchPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.countrySearchHelp}
      options={SELECT_COMMON_DATA.OPTIONS.countries}
    />
    <SelectAutocomplete
      label={SELECT_COMMON_DATA.LABELS.cityLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.citySearchPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.cityHelp}
      options={SELECT_COMMON_DATA.OPTIONS.cities}
    />
    <SelectAutocomplete
      label={SELECT_COMMON_DATA.LABELS.productLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.productPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.productHelp}
      options={SELECT_COMMON_DATA.OPTIONS.products}
    />
  </div>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={commonContainerStyles.showcase}>
    <SelectAutocomplete
      label={SELECT_COMMON_DATA.LABELS.requiredField}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.userPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.validationError}
      error
      options={SELECT_COMMON_DATA.OPTIONS.users}
    />
    <SelectAutocomplete
      label={SELECT_COMMON_DATA.LABELS.userLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.userPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.userHelp}
      error={false}
      options={SELECT_COMMON_DATA.OPTIONS.users}
    />
    <SelectAutocomplete
      label={SELECT_COMMON_DATA.LABELS.productLabel}
      placeholder={SELECT_COMMON_DATA.PLACEHOLDERS.productPlaceholder}
      helperText={SELECT_COMMON_DATA.HELPER_TEXTS.productHelp}
      disabled
      options={SELECT_COMMON_DATA.OPTIONS.products}
    />
  </div>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: SELECT_COMMON_DATA.LABELS.searchLabel,
    placeholder: SELECT_COMMON_DATA.PLACEHOLDERS.searchPlaceholder,
    helperText: SELECT_COMMON_DATA.HELPER_TEXTS.searchHelp,
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
export const SearchOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <SearchExamples />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

// Meta configuration
const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Components/Inputs/SelectAutocomplete',
  component: SelectAutocomplete,
  tags: ['autodocs'],
  argTypes: selectAutocompleteArgTypes,
  parameters: {
    docs: {
      page: () => (
        <>
          <SelectAutocompleteIntroduction />
          <DocBlock.Heading>Uso</DocBlock.Heading>
          <DocBlock.Canvas of={Usage} />
          <DocBlock.Controls of={Usage} />
          <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
          <SelectAutocompleteCommonPatterns />
          <DocBlock.Heading>Exemplos</DocBlock.Heading>
          <h3 id="busca">Tipos de Busca</h3>
          <SelectAutocompleteSearchTypesList />
          <DocBlock.Canvas of={SearchOptions} />
          <h3 id="estados">Estados</h3>
          <SelectAutocompleteStatesDescription />
          <DocBlock.Canvas of={ErrorStates} />
          <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>
          <SelectAutocompleteBestPractices />
          <DocBlock.Heading>Classes CSS</DocBlock.Heading>
          <SelectAutocompleteCssClasses />
          <DocBlock.Heading>API Reference</DocBlock.Heading>
          <SelectAutocompleteApiReference />
        </>
      ),
    },
  },
};

export default meta;
