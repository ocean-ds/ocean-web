import React from 'react';
import type { ComponentDocConfig, ExampleSpec } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TransactionFooterProps } from '../../../packages/ocean-react/src/TransactionFooter';
import type { TransactionSummaryProps } from '../../../packages/ocean-react/src/TransactionSummary';
import TransactionFooter from '../../../packages/ocean-react/src/TransactionFooter';
import TransactionSummary from '../../../packages/ocean-react/src/TransactionSummary';
import {
  getTransactionSummaryItems,
  transactionNotice,
  transactionSummaryAction,
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

const items = getTransactionSummaryItems();
const total = transactionSummaryTotal;
const action = transactionSummaryAction;
const notice = transactionNotice;
const richItems = [
  { content: { title: 'Pedido' }, amount: { value: 'R$ 623,80' } },
  {
    content: { title: 'Custo de antecipação' },
    amount: {
      value: 'Grátis',
      strikethroughValue: 'R$ 96,39',
      type: 'strikethrough' as const,
    },
  },
];
const manyItems = Array.from({ length: 5 }, (_, index) => ({
  content: { title: `Item ${index + 1}` },
  amount: { value: `R$ ${100 + index},00` },
}));

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
    { items, total, action },
    `<TransactionFooter
  items={[
    { content: { title: 'Pedido' }, amount: { value: 'R$ 623,80' } },
    {
      content: { title: 'Pague em' },
      amount: { value: '3x de R$ 207,93', info: 'sem acréscimo' },
    },
  ]}
  total={{ label: 'Total', value: 'R$ 623,80' }}
  action={<Button variant="primary" blocked>Revisar pagamento</Button>}
/>`
  ),
  sections: [
    {
      key: 'default',
      example: footerExample(
        { items, total, action },
        `<TransactionFooter items={items} total={total} action={action} />`
      ),
    },
    {
      key: 'highlight',
      example: footerExample(
        { type: 'highlight', items, total, action },
        `<TransactionFooter type="highlight" items={items} total={total} action={action} />`
      ),
    },
    {
      key: 'with-notice',
      example: footerExample(
        { items, total, action, notice },
        `<TransactionFooter items={items} total={total} notice={notice} action={action} />`
      ),
    },
    {
      key: 'with-notice-highlight',
      example: footerExample(
        { type: 'highlight', items, total, action, notice },
        `<TransactionFooter type="highlight" items={items} total={total} notice={notice} action={action} />`
      ),
    },
    {
      key: 'rich-rows',
      example: footerExample(
        { items: richItems, total, action },
        `<TransactionFooter items={richItems} total={total} action={action} />`
      ),
    },
    {
      key: 'many-rows',
      example: footerExample(
        { items: manyItems, total, action },
        `<TransactionFooter items={manyItems} total={total} action={action} />`
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
    { title: 'Resumo', items, total, action },
    `<TransactionSummary
  title="Resumo"
  items={items}
  total={total}
  action={<Button variant="primary" blocked>Revisar pagamento</Button>}
/>`
  ),
  sections: [
    {
      key: 'default',
      example: summaryExample(
        { title: 'Resumo', items, total, action },
        `<TransactionSummary title="Resumo" items={items} total={total} action={action} />`
      ),
    },
    {
      key: 'without-title',
      example: summaryExample(
        { items, total, action },
        `<TransactionSummary items={items} total={total} action={action} />`
      ),
    },
    {
      key: 'with-notice',
      example: summaryExample(
        { title: 'Resumo', items, total, notice, action },
        `<TransactionSummary title="Resumo" items={items} total={total} notice={notice} action={action} />`
      ),
    },
  ],
  platforms: summaryPlatforms,
  argTypes: summaryArgTypes,
  tokens,
};
