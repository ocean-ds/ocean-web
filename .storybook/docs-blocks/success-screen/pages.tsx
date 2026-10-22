import React from 'react';
import SuccessScreen from '../../../packages/ocean-react/src/SuccessScreen';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import * as Stories from '../../../packages/ocean-react/src/SuccessScreen/stories/SuccessScreen.stories';
import tokens from '../../assets/tokens/success-screen.json';
import en from '../locales/success-screen.en.json';
import pt from '../locales/success-screen.pt.json';
import { successScreenArgTypes } from './argTypes';

const locale: LocaleFiles = {
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
};
const example = (
  <SuccessScreen
    title="Payment complete"
    description="Your payment has been processed."
    tagLabel="Paid"
  >
    Payment to supplier · Coral Distributors · R$ 6.819,33
  </SuccessScreen>
);

export const successScreenDoc: ComponentDocConfig = {
  id: 'success-screen',
  title: 'Success Screen',
  kind: 'component',
  status: 'stable',
  source: 'packages/ocean-react/src/SuccessScreen/',
  groupOverview: 'components-feedback-success-screen-overview--docs',
  locale,
  imports: "import SuccessScreen from '@useblu/ocean-react/SuccessScreen';",
  primary: {
    rows: [example],
    code: '<SuccessScreen title="Payment complete" tagLabel="Paid">Payment details</SuccessScreen>',
  },
  sections: [
    { key: 'positive', example: { rows: [example] } },
    {
      key: 'neutral',
      example: {
        rows: [
          <SuccessScreen
            key="neutral"
            status="neutral"
            title="Payment scheduled"
            description="Your payment will be processed on Nov 12."
            tagLabel="Scheduled"
          />,
        ],
      },
    },
    {
      key: 'negative',
      example: {
        rows: [
          <SuccessScreen
            key="negative"
            status="negative"
            title="Payment not completed"
            description="We couldn't process this payment."
            tagLabel="Not completed"
          />,
        ],
      },
    },
  ],
  optionsTitle: 'sections.options',
  optionsLocalePrefix: 'options',
  options: {
    topBar: {
      rows: [
        <SuccessScreen
          key="topbar"
          title="Payment complete"
          showTopBar
          tagLabel="Paid"
        />,
      ],
      code: '<SuccessScreen title="Payment complete" showTopBar tagLabel="Paid" />',
    },
  },
  platforms: 'react-only',
  reactSnippet: `import SuccessScreen from '@useblu/ocean-react/SuccessScreen';\n\n<SuccessScreen title="Payment complete" tagLabel="Paid" />`,
  story: Stories.Positive,
  argTypes: successScreenArgTypes,
  tokens: tokens as TokensFile,
};
