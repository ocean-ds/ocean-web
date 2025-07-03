import type { Meta, StoryObj } from '@storybook/react';
import Select from '../Select';
import {
  createIntroduction,
  createCommonPatterns,
  createBestPractices,
  createCssClasses,
  createApiReference,
  createCodeList,
  createStatesDescription,
  createStatesDemo,
  createDataTypesDemo,
  createDisabledControlsStory,
  createSelectArgTypes,
  createUsageStory,
  createDocsPage,
  createSelectCommonPatterns,
  createSelectUsageExamples,
  createListSizesDemo,
  SELECT_COMMON_DATA,
  COMMON_SELECT_CSS_CLASSES,
  SELECT_INTRODUCTION_CONFIG,
  SELECT_BEST_PRACTICES_CONFIG,
  SELECT_SPECIFIC_PROPS,
  SELECT_DATA_TYPES_LIST,
  SELECT_STATES_DESCRIPTION,
  type ApiReferenceConfig,
} from './_shared';

type Story = StoryObj<typeof Select>;

// Component creation using shared configurations
const Introduction = createIntroduction(SELECT_INTRODUCTION_CONFIG);
const CommonPatterns = createCommonPatterns(createSelectCommonPatterns());
const BestPractices = createBestPractices(SELECT_BEST_PRACTICES_CONFIG);
const CssClasses = createCssClasses(COMMON_SELECT_CSS_CLASSES);
const DataTypesList = createCodeList(SELECT_DATA_TYPES_LIST);
const StatesDescription = createStatesDescription(SELECT_STATES_DESCRIPTION);
const UsageExamples = createSelectUsageExamples();

// API Reference
const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente Select é baseado no elemento select e suporta todos os atributos padrão de select.',
  props: SELECT_SPECIFIC_PROPS,
  footer:
    'A ref é encaminhada para o elemento select. Qualquer outra prop fornecida será passada para o elemento select.',
};
const ApiReference = createApiReference(apiReferenceConfig);

// Demo components
const DataTypes = createDataTypesDemo(Select);
const States = createStatesDemo(Select, SELECT_COMMON_DATA.PRIORITIES);
const ListSizes = createListSizesDemo(Select);

// Stories
export const Usage: Story = createUsageStory();
export const DataTypesStory: Story = createDisabledControlsStory(DataTypes);
export const StatesStory: Story = createDisabledControlsStory(States);
export const ListSizesStory: Story = createDisabledControlsStory(ListSizes);

// Meta configuration
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: createSelectArgTypes(),
  parameters: {
    docs: {
      page: createDocsPage({
        Introduction,
        Usage,
        CommonPatterns,
        sections: [
          {
            id: 'tipos-dados',
            title: 'Tipos de Dados',
            list: DataTypesList,
            story: DataTypesStory,
          },
          {
            id: 'estados',
            title: 'Estados',
            list: StatesDescription,
            story: StatesStory,
          },
          {
            id: 'tamanhos-lista',
            title: 'Tamanhos de Lista',
            story: ListSizesStory,
          },
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
