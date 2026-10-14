import React from 'react';
import type { ComponentDocConfig, ExampleSpec } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TransactionFooterProps } from '../../../packages/ocean-react/src/TransactionFooter';
import type { TransactionSummaryProps } from '../../../packages/ocean-react/src/TransactionSummary';
import TransactionFooter from '../../../packages/ocean-react/src/TransactionFooter';
import TransactionSummary from '../../../packages/ocean-react/src/TransactionSummary';
import {
  transactionAsideTitle,
  transactionFourDetails,
  transactionNotice,
  transactionNoticeWithTitleAndIcon,
  transactionSummaryAction,
  transactionSummaryDetails,
  transactionSummaryMainItem,
  transactionSummaryTotal,
} from './fixtures';
import footerEn from '../locales/transaction-footer.en.json';
import footerPt from '../locales/transaction-footer.pt.json';
import summaryEn from '../locales/transaction-summary.en.json';
import summaryPt from '../locales/transaction-summary.pt.json';
import footerTokens from '../../assets/tokens/transaction-footer.json';
import summaryTokens from '../../assets/tokens/transaction-summary.json';
import { footerArgTypes, summaryArgTypes } from './argTypes';
import { footerPlatforms, summaryPlatforms } from './platform-snippets';

const locale = (
  en: Record<string, unknown>,
  pt: Record<string, unknown>
): LocaleFiles => ({
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
});

const footerExample = (
  props: TransactionFooterProps,
  code: string
): ExampleSpec => {
  const type = props.type === 'highlight' ? 'highlight' : 'default';

  return {
    rows: [
      <div key="transaction-footer" className="odoc-footer-surface">
        <TransactionFooter {...props} />
      </div>,
    ],
    code,
    unframed: true,
    canvasClass: `odoc-canvas--footer-${type}`,
  };
};

const summaryExample = (
  props: TransactionSummaryProps,
  code: string
): ExampleSpec => ({
  rows: [<TransactionSummary key="transaction-summary" {...props} />],
  code,
  unframed: true,
  canvasClass: 'odoc-canvas--white odoc-canvas--aside',
});

const mainItem = transactionSummaryMainItem;
const details = transactionSummaryDetails;
const total = transactionSummaryTotal;
const action = transactionSummaryAction;

const footerImports =
  "import { Button, TransactionFooter } from '@useblu/ocean-react';";
const summaryImports =
  "import { Button, TransactionSummary } from '@useblu/ocean-react';";

export const footerDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-footer',
  title: 'Footer',
  codeName: 'TransactionFooter',
  kind: 'component',
  source: 'packages/ocean-react/src/TransactionFooter',
  groupOverview: 'components-transaction-summary-overview--docs',
  locale: locale(footerEn, footerPt),
  imports: footerImports,
  primary: footerExample(
    { mainItem, details, total, action },
    `<TransactionFooter
  mainItem={{ content: { title: 'Subtotal' }, amount: { value: '$1,250.00' } }}
  details={[
    { content: { title: 'Installments' }, amount: { value: '5 × $250.00', info: 'No additional fees' } },
  ]}
  total={{ label: 'Total', value: '$1,250.00' }}
  action={<Button variant="primary" blocked>Continue</Button>}
/>`
  ),
  sections: [
    {
      key: 'default',
      example: footerExample(
        { mainItem, details, total, action },
        `<TransactionFooter mainItem={mainItem} details={details} total={total} action={action} />`
      ),
    },
    {
      key: 'highlight',
      example: footerExample(
        { type: 'highlight', mainItem, details, total, action },
        `<TransactionFooter type="highlight" mainItem={mainItem} details={details} total={total} action={action} />`
      ),
    },
  ],
  optionsTitle: 'sections.options',
  optionsLocalePrefix: 'options',
  options: {
    notice: footerExample(
      { notice: transactionNotice, mainItem, details, total, action },
      `<TransactionFooter notice={notice} mainItem={mainItem} details={details} total={total} action={action} />`
    ),
    'notice-title-icon': footerExample(
      {
        notice: transactionNoticeWithTitleAndIcon,
        mainItem,
        details,
        total,
        action,
      },
      `<TransactionFooter notice={noticeWithTitleAndIcon} mainItem={mainItem} details={details} total={total} action={action} />`
    ),
    'main-item-only': footerExample(
      { mainItem, total, action },
      `<TransactionFooter mainItem={mainItem} total={total} action={action} />`
    ),
    'details-only': footerExample(
      { details, total, action },
      `<TransactionFooter details={details} total={total} action={action} />`
    ),
    'four-details': footerExample(
      { details: transactionFourDetails, total, action },
      `<TransactionFooter details={fourDetails} total={total} action={action} />`
    ),
    'additional-info': footerExample(
      {
        mainItem: {
          ...mainItem,
          amount: { ...mainItem.amount, info: 'No additional fees' },
        },
        total,
        action,
      },
      `<TransactionFooter mainItem={{ ...mainItem, amount: { ...mainItem.amount, info: 'No additional fees' } }} total={total} action={action} />`
    ),
  },
  platforms: footerPlatforms,
  argTypes: footerArgTypes,
  tokens: footerTokens,
};

export const summaryDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-summary',
  title: 'Aside',
  codeName: 'TransactionSummary',
  kind: 'component',
  source: 'packages/ocean-react/src/TransactionSummary',
  groupOverview: 'components-transaction-summary-overview--docs',
  locale: locale(summaryEn, summaryPt),
  imports: summaryImports,
  primary: summaryExample(
    { title: transactionAsideTitle, mainItem, details, total, action },
    `<TransactionSummary
  title="Payment summary"
  mainItem={mainItem}
  details={details}
  total={total}
  action={<Button variant="primary" blocked>Continue</Button>}
/>`
  ),
  sections: [
    {
      key: 'default',
      example: summaryExample(
        { title: transactionAsideTitle, mainItem, details, total, action },
        `<TransactionSummary title="Payment summary" mainItem={mainItem} details={details} total={total} action={action} />`
      ),
    },
  ],
  optionsTitle: 'sections.options',
  optionsLocalePrefix: 'options',
  options: {
    'without-title': summaryExample(
      { mainItem, details, total, action },
      `<TransactionSummary mainItem={mainItem} details={details} total={total} action={action} />`
    ),
    notice: summaryExample(
      {
        title: transactionAsideTitle,
        mainItem,
        details,
        total,
        notice: transactionNotice,
        action,
      },
      `<TransactionSummary title="Payment summary" notice={notice} mainItem={mainItem} details={details} total={total} action={action} />`
    ),
    'details-only': summaryExample(
      { title: transactionAsideTitle, details, total, action },
      `<TransactionSummary title="Payment summary" details={details} total={total} action={action} />`
    ),
  },
  platforms: summaryPlatforms,
  argTypes: summaryArgTypes,
  tokens: summaryTokens,
};
