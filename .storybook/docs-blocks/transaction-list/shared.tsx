import React, { ReactNode } from 'react';
import { DocLink } from '../DocLinks';
import { ConfigRow } from '../ConfigTable';

/** Peças comuns das páginas da família Transaction List (MR-615). */

export const c = (text: string): React.ReactElement => <code>{text}</code>;

export const FIGMA_FILE =
  'https://www.figma.com/design/PgLv9k22CHHZZ867HwN65y/%F0%9F%8C%8A-Ocean-DS-Core';
export const figmaNode = (node: string): string =>
  `${FIGMA_FILE}?node-id=${node}`;

const WEB_TREE =
  'https://github.com/ocean-ds/ocean-web/tree/feature/MR-615-familia-transaction-list-web/packages/ocean-react/src';
const KB_BRANCH =
  'https://github.com/Pagnet/knowledge-bases/blob/feat/MR-615-transaction-list-kb';
export const kbPath = (file: string): string =>
  `knowledge-bases/ux-knowledge-layer/components/usage-guidelines/${file}`;
export const JIRA = 'https://useblu.atlassian.net/browse/MR-615';

export const headerLinks = (
  component: string,
  kbFile: string,
  node: string
): DocLink[] => [
  { label: 'Código-fonte', href: `${WEB_TREE}/${component}` },
  {
    label: 'Guia na base de conhecimento',
    href: `${KB_BRANCH}/${kbPath(kbFile)}`,
  },
  { label: 'Figma', href: figmaNode(node) },
];

export const footerLinks = (kbFile: string): DocLink[] => [
  { label: 'Editar esta documentação', href: `${KB_BRANCH}/${kbPath(kbFile)}` },
  { label: 'Dar feedback', href: JIRA },
];

export const PRS = {
  web: {
    label: 'ocean-web #1275',
    href: 'https://github.com/ocean-ds/ocean-web/pull/1275',
  },
  ios: {
    label: 'ocean-ios #713',
    href: 'https://github.com/ocean-ds/ocean-ios/pull/713',
  },
  android: {
    label: 'ocean-android #1113',
    href: 'https://github.com/ocean-ds/ocean-android/pull/1113',
  },
};

/** Matriz de exemplos: linhas × colunas, com rótulos (stories com snapshot). */
export const MatrixGrid = ({
  columns,
  rows,
  columnWidth = 360,
}: {
  columns: string[];
  rows: { label: string; cells: ReactNode[] }[];
  columnWidth?: number;
}): React.ReactElement => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `120px repeat(${columns.length}, ${columnWidth}px)`,
      gap: '16px 24px',
      alignItems: 'start',
    }}
  >
    <span />
    {columns.map((column) => (
      <p key={column} className="ods-typography ods-typography__captionbold">
        {column}
      </p>
    ))}
    {rows.map((row) => (
      <React.Fragment key={row.label}>
        <p className="ods-typography ods-typography__captionbold">
          {row.label}
        </p>
        {row.cells.map((cell, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{cell}</div>
        ))}
      </React.Fragment>
    ))}
  </div>
);

/** Configurações dos blocos (iguais na família; o padrão de tamanho muda por componente). */
export const blockConfigRows = (sizeDefault: string): ConfigRow[] => [
  {
    category: 'Bloco de conteúdo',
    option: c('contentSize'),
    values: (
      <>
        {c('md')} · {c('sm')}
      </>
    ),
    defaultValue: sizeDefault,
  },
  {
    category: 'Bloco de conteúdo',
    option: c('status'),
    values: (
      <>
        {c('default')} · {c('positive')} · {c('warning')} · {c('highlight')} ·{' '}
        {c('highlight-lead')} · {c('strikethrough')}
      </>
    ),
    defaultValue: c('default'),
  },
  {
    category: 'Bloco de valor',
    option: c('amountSize'),
    values: (
      <>
        {c('md')} (valor 16, Tag Medium) · {c('sm')} (valor 14, Tag Small)
      </>
    ),
    defaultValue: sizeDefault,
  },
  {
    category: 'Bloco de valor',
    option: c('amountType'),
    values: (
      <>
        {c('default')} · {c('positive')} · {c('negative')} ·{' '}
        {c('strikethrough')} · {c('strikethrough-neutral')}
      </>
    ),
    defaultValue: c('default'),
  },
];

/** Linhas de cor (tokens) dos blocos — mesmas em toda a família. */
export const blockTokenRows = (
  states: number,
  disabledIndex: number,
  loadingIndex?: number
): { part: string; tokens: string[] }[] => {
  const row = (
    part: string,
    normal: string,
    disabled: string,
    loading = 'Interface/Light/Up'
  ) => ({
    part,
    tokens: Array.from({ length: states }, (_, index) => {
      if (index === disabledIndex) return disabled;
      if (index === loadingIndex) return loading;
      return normal;
    }),
  });
  return [
    row('Título (invertido)', 'Interface/Dark/Down', 'Interface/Dark/Up'),
    row('Descrição (destaque)', 'Interface/Dark/Deep', 'Interface/Dark/Up'),
    row('Valor (default)', 'Interface/Dark/Deep', 'Interface/Dark/Up'),
    row('Etiqueta (fundo)', 'Status/Positive/Up', 'Interface/Light/Up', '—'),
    row('Informação extra', 'Interface/Dark/Down', 'Interface/Dark/Up', '—'),
  ];
};

/** Linha de migração comum (blocos e valor) do TransactionListItem legado. */
export const legacyBlockMigration = [
  {
    from: (
      <>
        {c('children')} (level1) / {c('level2')} / {c('level3')}
      </>
    ),
    to: (
      <>
        {c('title')} / {c('description')} / {c('caption')}
      </>
    ),
    notes: (
      <>
        {c('isInverted')} → {c('inverted')} (padrão {c('true')} na família)
      </>
    ),
  },
  {
    from: (
      <>
        {c('value')} + {c('positive')}
      </>
    ),
    to: (
      <>
        {c('amount')} + {c('amountType="positive"')}
      </>
    ),
    notes: <>Saída: {c('amountType="negative"')} com o valor sem sinal</>,
  },
  {
    from: c('tags'),
    to: (
      <>
        {c('amountTag')} ou {c('amountIndicator')}
      </>
    ),
    notes: 'A etiqueta fica abaixo do valor',
  },
  {
    from: (
      <>
        {c('time')} / {c('level4')}
      </>
    ),
    to: (
      <>
        {c('caption')} ou {c('additionalData')}
      </>
    ),
    notes: 'Um dado por linha',
  },
];

/** Medidas comuns da linha (Figma, tokens Ocean Spacing). */
export const rowMeasures = (
  mainGap: string,
  mainGapToken: string
): ReactNode[][] => [
  ['Largura de referência (frame)', '360', '—'],
  ['Padding da linha', '16', c('Spacing/Xs')],
  ['Espaço entre os elementos da linha (Main)', mainGap, c(mainGapToken)],
  ['Espaço conteúdo ↔ valor', '8', c('Spacing/Xxs')],
  ['Entre linhas de texto / valor e informação extra', '4', c('Spacing/Xxxs')],
];

/** Regras de conteúdo da família (iguais em todas as páginas). */
export const CONTENT_RULES = (
  <ul className="odoc__list">
    <li>
      <strong>Valor nunca vai no conteúdo.</strong> {c('title')}/
      {c('description')}/{c('caption')} são contexto; o valor vai em{' '}
      {c('amount')}.
    </li>
    <li>
      <strong>Cor do valor vem do tipo</strong>, nunca de cor à mão. Entrada é{' '}
      {c('positive')} sem &quot;+&quot;; saída é {c('negative')}; cobrança em
      aberto é {c('default')}.
    </li>
    <li>
      <strong>Etiqueta só de status de pagamento</strong> e nem em todo item.
    </li>
  </ul>
);

/** Proibições comuns da família (bloco Regras para IA). */
export const FAMILY_FORBIDDEN = [
  'Sinal no amount ("-R$ 24,50", "+R$ 150,00").',
  'amountType="strikethrough" para item cancelado (use default + amountTag Cancelado neutral).',
  'status ou amountType "inactive" à mão para desabilitar.',
  'Dois dados num texto ("Crédito • Final 1234").',
  'iconColor="on-color" sobre fundo branco.',
  'amountTag e amountIndicator juntos.',
];
