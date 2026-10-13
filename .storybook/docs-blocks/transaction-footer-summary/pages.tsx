import React from 'react';
import type { ComponentDocConfig, ExampleSpec } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TransactionFooterProps } from '../../../packages/ocean-react/src/TransactionFooter';
import type { TransactionSummaryProps } from '../../../packages/ocean-react/src/TransactionSummary';
import TransactionFooter from '../../../packages/ocean-react/src/TransactionFooter';
import TransactionSummary from '../../../packages/ocean-react/src/TransactionSummary';
import {
  transactionFourDetails,
  transactionNotice,
  transactionNoticeWithTitleAndIcon,
  transactionSummaryAction,
  transactionSummaryDetails,
  transactionSummaryMainItem,
  transactionSummaryTotal,
} from '../../../packages/ocean-react/src/_shared/__fixtures__/transactionFooterSummary';
import footerEn from '../locales/transaction-footer.en.json';
import footerPt from '../locales/transaction-footer.pt.json';
import summaryEn from '../locales/transaction-summary.en.json';
import summaryPt from '../locales/transaction-summary.pt.json';
import tokens from '../../assets/tokens/transaction-footer-summary.json';
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
): ExampleSpec => ({
  rows: [<TransactionFooter key="transaction-footer" {...props} />],
  code,
});

const summaryExample = (
  props: TransactionSummaryProps,
  code: string
): ExampleSpec => ({
  rows: [<TransactionSummary key="transaction-summary" {...props} />],
  code,
});

const mainItem = transactionSummaryMainItem;
const details = transactionSummaryDetails;
const total = transactionSummaryTotal;
const action = transactionSummaryAction;
const notice = transactionNotice;
const noticeWithTitleAndIcon = transactionNoticeWithTitleAndIcon;

const footerImports =
  "import { Button, TransactionFooter } from '@useblu/ocean-react';";
const summaryImports =
  "import { Button, TransactionSummary } from '@useblu/ocean-react';";

export const footerDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-footer',
  title: 'Transaction Footer',
  kind: 'block',
  source: 'packages/ocean-react/src/TransactionFooter',
  locale: locale(footerEn, footerPt),
  imports: footerImports,
  primary: footerExample(
    { mainItem, details, total, action },
    `<TransactionFooter
  mainItem={{ label: 'Pedido', value: 'R$ 623,80' }}
  details={[
    { label: 'Pague em', value: '3x de R$ 207,93 sem acréscimo' },
  ]}
  total={{ label: 'Total', value: 'R$ 623,80' }}
  action={<Button variant="primary" blocked>Revisar pagamento</Button>}
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
    {
      key: 'with-notice',
      example: footerExample(
        { mainItem, details, total, action, notice },
        `<TransactionFooter mainItem={mainItem} details={details} total={total} notice={notice} action={action} />`
      ),
    },
    {
      key: 'with-notice-highlight',
      example: footerExample(
        { type: 'highlight', mainItem, details, total, action, notice },
        `<TransactionFooter type="highlight" mainItem={mainItem} details={details} total={total} notice={notice} action={action} />`
      ),
    },
    {
      key: 'notice-title-icon',
      example: footerExample(
        { mainItem, details, total, action, notice: noticeWithTitleAndIcon },
        `<TransactionFooter notice={{ title: 'Economia de R$ 96,39', description: 'A economia será aplicada ao pagamento.', icon: <CheckCircleOutline /> }} mainItem={mainItem} details={details} total={total} action={action} />`
      ),
    },
    {
      key: 'main-item-only',
      example: footerExample(
        { mainItem, total, action },
        `<TransactionFooter mainItem={mainItem} total={total} action={action} />`
      ),
    },
    {
      key: 'details-only',
      example: footerExample(
        { details, total, action },
        `<TransactionFooter details={details} total={total} action={action} />`
      ),
    },
    {
      key: 'four-details',
      example: footerExample(
        { details: transactionFourDetails, total, action },
        `<TransactionFooter details={fourDetails} total={total} action={action} />`
      ),
    },
  ],
  platforms: footerPlatforms,
  argTypes: footerArgTypes,
  tokens,
};

export const summaryDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-summary',
  title: 'Transaction Summary',
  kind: 'block',
  source: 'packages/ocean-react/src/TransactionSummary',
  locale: locale(summaryEn, summaryPt),
  imports: summaryImports,
  primary: summaryExample(
    { title: 'Resumo do pagamento', mainItem, details, total, action },
    `<TransactionSummary
  title="Resumo do pagamento"
  mainItem={mainItem}
  details={details}
  total={total}
  action={<Button variant="primary" blocked>Revisar pagamento</Button>}
/>`
  ),
  sections: [
    {
      key: 'default',
      example: summaryExample(
        { title: 'Resumo do pagamento', mainItem, details, total, action },
        `<TransactionSummary title="Resumo do pagamento" mainItem={mainItem} details={details} total={total} action={action} />`
      ),
    },
    {
      key: 'without-title',
      example: summaryExample(
        { mainItem, details, total, action },
        `<TransactionSummary mainItem={mainItem} details={details} total={total} action={action} />`
      ),
    },
    {
      key: 'with-notice',
      example: summaryExample(
        {
          title: 'Resumo do pagamento',
          mainItem,
          details,
          total,
          notice,
          action,
        },
        `<TransactionSummary title="Resumo do pagamento" mainItem={mainItem} details={details} total={total} notice={notice} action={action} />`
      ),
    },
    {
      key: 'details-only',
      example: summaryExample(
        { title: 'Resumo do pagamento', details, total, action },
        `<TransactionSummary title="Resumo do pagamento" details={details} total={total} action={action} />`
      ),
    },
  ],
  platforms: summaryPlatforms,
  argTypes: summaryArgTypes,
  tokens,
};
