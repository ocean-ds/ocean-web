import type { Meta, StoryObj } from '@storybook/react';
import SelectAutocomplete from '../SelectAutocomplete';
import {
  createIntroduction,
  createCommonPatterns,
  createBestPractices,
  createCssClasses,
  createApiReference,
  createCodeList,
  createStatesDescription,
  createStatesDemo,
  createDisabledControlsStory,
  createSelectArgTypes,
  createUsageStory,
  createDocsPage,
  createSelectAutocompleteCommonPatterns,
  createSelectAutocompleteUsageExamples,
  createUseCasesDemo,
  createPerformanceDemo,
  SELECT_COMMON_DATA,
  generateNumberOptions,
  COMMON_SELECT_AUTOCOMPLETE_CSS_CLASSES,
  SELECT_AUTOCOMPLETE_INTRODUCTION_CONFIG,
  SELECT_AUTOCOMPLETE_BEST_PRACTICES_CONFIG,
  SELECT_AUTOCOMPLETE_SPECIFIC_PROPS,
  SELECT_AUTOCOMPLETE_USE_CASES_LIST,
  SELECT_AUTOCOMPLETE_STATES_DESCRIPTION,
  type ApiReferenceConfig,
} from './_shared';

type Story = StoryObj<typeof SelectAutocomplete>;

// Component creation using shared configurations
const Introduction = createIntroduction(
  SELECT_AUTOCOMPLETE_INTRODUCTION_CONFIG
);
const CommonPatterns = createCommonPatterns(
  createSelectAutocompleteCommonPatterns()
);
const BestPractices = createBestPractices(
  SELECT_AUTOCOMPLETE_BEST_PRACTICES_CONFIG
);
const CssClasses = createCssClasses(COMMON_SELECT_AUTOCOMPLETE_CSS_CLASSES);
const UseCasesList = createCodeList(SELECT_AUTOCOMPLETE_USE_CASES_LIST);
const StatesDescription = createStatesDescription(
  SELECT_AUTOCOMPLETE_STATES_DESCRIPTION
);
const UsageExamples = createSelectAutocompleteUsageExamples();

// API Reference
const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente SelectAutocomplete é baseado no elemento input com funcionalidades de autocomplete e suporta todos os atributos padrão de input.',
  props: SELECT_AUTOCOMPLETE_SPECIFIC_PROPS,
  footer:
    'A ref é encaminhada para o elemento input. Qualquer outra prop fornecida será passada para o elemento input.',
};
const ApiReference = createApiReference(apiReferenceConfig);

// Demo components
const UseCases = createUseCasesDemo(SelectAutocomplete);
const States = createStatesDemo(
  SelectAutocomplete,
  SELECT_COMMON_DATA.PRIORITIES
);
const Performance = createPerformanceDemo(SelectAutocomplete);

// Stories
export const Usage: Story = createUsageStory(
  generateNumberOptions(10).map((opt) => ({
    ...opt,
    disabled: opt.value === 'opt-3',
  }))
);
export const UseCasesStory: Story = createDisabledControlsStory(UseCases);
export const StatesStory: Story = createDisabledControlsStory(States);
export const PerformanceStory: Story = createDisabledControlsStory(Performance);

// Meta configuration
const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Components/Inputs/SelectAutocomplete',
  component: SelectAutocomplete,
  tags: ['autodocs'],
  argTypes: createSelectArgTypes({
    noOptionsText: {
      description: 'Texto exibido quando nenhuma opção corresponde à busca.',
      control: 'text',
    },
    onInputChange: { table: { disable: true } },
    inputValue: { table: { disable: true } },
  }),
  parameters: {
    docs: {
      page: createDocsPage({
        Introduction,
        Usage,
        CommonPatterns,
        sections: [
          {
            id: 'casos-uso',
            title: 'Casos de Uso',
            list: UseCasesList,
            story: UseCasesStory,
          },
          {
            id: 'estados',
            title: 'Estados',
            list: StatesDescription,
            story: StatesStory,
          },
          { id: 'performance', title: 'Performance', story: PerformanceStory },
        ],
        UsageExamples,
        BestPractices,
        CssClasses,
        ApiReference,
      }),
    },
  },
};

export default meta;
