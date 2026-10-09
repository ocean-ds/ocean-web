import React, { ReactNode, useEffect, useState } from 'react';
import { Unstyled } from '@storybook/blocks';
import Breadcrumb from '../../../packages/ocean-react/src/Breadcrumb';
import Link from '../../../packages/ocean-react/src/Link';
import Tag from '../../../packages/ocean-react/src/Tag';
import Typography from '../../../packages/ocean-react/src/Typography';
import TransactionListReadOnly from '../../../packages/ocean-react/src/TransactionListReadOnly';
import TransactionListAction from '../../../packages/ocean-react/src/TransactionListAction';
import TransactionListSelectable from '../../../packages/ocean-react/src/TransactionListSelectable';
import TransactionListExpandable from '../../../packages/ocean-react/src/TransactionListExpandable';
import TransactionListChildAction from '../../../packages/ocean-react/src/TransactionListChildAction';
import TransactionListChildReadOnly from '../../../packages/ocean-react/src/TransactionListChildReadOnly';
import {
  Anatomy,
  DoDont,
  DocTable,
  OnThisPage,
  Section,
  Stage,
  Subsection,
  Swatch,
  Tabs,
  c,
  tokenValue,
} from '../blocks';
import { Screen } from '../doc-parts';
import { LocaleFiles, Md, Translate, useTranslate } from '../i18n';
import {
  SECTION_REQUEST_KEY,
  TAB_REQUEST_KEY,
  request,
  takeRequest,
} from '../navigation';
import common from '../locales/common.en.json';
import commonPt from '../locales/common.pt.json';
import en from '../locales/transaction-list-group.en.json';
import pt from '../locales/transaction-list-group.pt.json';
import {
  AMOUNT_TYPE_CASES,
  CHILD_POSITIONS,
  RowFixture,
  childRows,
  expandableParent,
  rows,
  selectableRows,
  statementRows,
  swipeActions,
  menuActions,
} from './fixtures';

/** Page data: change here, not in the markup. */
export const PAGE = {
  title: 'Transaction List',
  status: 'Beta',
  lastUpdated: '2026-10-09',
  library: 'Ocean Core',
  github: 'https://github.com/ocean-ds',
};

const LOCALES: LocaleFiles[] = [
  { en: common, pt: commonPt },
  { en, pt } as unknown as LocaleFiles,
];

const formatDate = (iso: string, locale: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(
    locale === 'pt' ? 'pt-BR' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
  );

const docsId = (component: string) =>
  `components-lists-transaction-list-transaction-list-${component}--overview`;
const blockId = (block: string) =>
  `components-lists-content-list-content-list-${block}--overview`;

/** Link to another docs page; `section` scrolls to it after the page opens. */
const DocsLink = ({
  id,
  section,
  children,
}: {
  id: string;
  section?: string;
  children: ReactNode;
}) => (
  <Link
    href={`./?path=/docs/${id}`}
    target="_top"
    onClick={() => section && request(SECTION_REQUEST_KEY, section)}
  >
    {children}
  </Link>
);

const COMPONENTS: [string, string, string][] = [
  ['readOnly', 'Transaction List Read Only', docsId('read-only')],
  ['action', 'Transaction List Action', docsId('action')],
  ['selectable', 'Transaction List Selectable', docsId('selectable')],
  ['expandable', 'Transaction List Expandable', docsId('expandable')],
  [
    'childReadOnly',
    'Transaction List Child Read Only',
    docsId('child-read-only'),
  ],
  ['childAction', 'Transaction List Child Action', docsId('child-action')],
];

const TOKEN_LINKS: Record<string, [string, string][]> = {
  color: [
    ['Transaction List Action', docsId('action')],
    ['Content List Default', blockId('default')],
    ['Content List Amount', blockId('amount')],
  ],
  iconColor: [
    ['Transaction List Action', docsId('action')],
    ['Transaction List Child Action', docsId('child-action')],
  ],
  states: [['Transaction List Action', docsId('action')]],
  typography: [
    ['Content List Default', blockId('default')],
    ['Content List Amount', blockId('amount')],
  ],
  structure: [
    ['Transaction List Action', docsId('action')],
    ['Transaction List Selectable', docsId('selectable')],
    ['Transaction List Child Action', docsId('child-action')],
  ],
  size: [['Transaction List Read Only', docsId('read-only')]],
};

const FullList = ({ table, t }: { table: string; t: Translate }) => (
  <p className="odoc-fulllist">
    <span>{t('specs.fullList')}</span>
    {TOKEN_LINKS[table].map(([name, id]) => (
      <DocsLink key={id} id={id} section="design-tokens">
        {`${name} › ${t('sections.designTokens')}`}
      </DocsLink>
    ))}
  </p>
);

/* ----- Examples ----- */

type Render = (props: RowFixture & Record<string, unknown>) => ReactNode;

const readOnly: Render = (props) => <TransactionListReadOnly {...props} />;
const action: Render = (props) => <TransactionListAction {...props} />;

const Group = ({
  list,
  render,
  extra = {},
}: {
  list: RowFixture[];
  render: Render;
  extra?: Record<string, unknown>;
}) => (
  <Screen>
    {list.map((row, index) => (
      <React.Fragment key={index}>
        {render({ ...row, ...extra, showDivider: index < list.length - 1 })}
      </React.Fragment>
    ))}
  </Screen>
);

const SelectableGroup = ({ radio = false }: { radio?: boolean }) => {
  const [selected, setSelected] = useState<number[]>([0]);
  const toggle = (index: number) =>
    setSelected((current) => {
      if (radio) return [index];
      return current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index];
    });
  return (
    <Screen>
      {selectableRows.map((row, index) => {
        const control = {
          id: `${radio ? 'radio' : 'checkbox'}-${index}`,
          checked: selected.includes(index),
          onChange: () => toggle(index),
        };
        return (
          <TransactionListSelectable
            key={index}
            {...row}
            showDivider={index < selectableRows.length - 1}
            {...(radio
              ? { radio: { ...control, name: 'receivable' } }
              : { checkbox: control })}
          />
        );
      })}
    </Screen>
  );
};

const ExpandableGroup = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Screen>
      <TransactionListExpandable
        {...expandableParent}
        supportingText="Fees already deducted"
        expanded={expanded}
        onToggle={setExpanded}
      >
        {childRows.map((row, index) => (
          <TransactionListChildReadOnly
            key={index}
            {...row}
            position={CHILD_POSITIONS[index]}
          />
        ))}
      </TransactionListExpandable>
    </Screen>
  );
};

const Children = ({
  Child,
}: {
  Child:
    | typeof TransactionListChildAction
    | typeof TransactionListChildReadOnly;
}) => (
  <Screen>
    {childRows.map((row, index) => (
      <Child key={index} {...row} position={CHILD_POSITIONS[index]} />
    ))}
  </Screen>
);

/* ----- Guidelines ----- */

const GUIDELINES_TOC = [
  'overview',
  'formatting',
  'content',
  'behaviors',
  'variants',
  'related',
  'feedback',
];

const Guidelines = ({ t }: { t: Translate }) => {
  const g = (key: string) => t(`guidelines.${key}`);
  const verdict = (kind: 'do' | 'dont' | 'caution') =>
    g(`content.verdicts.${kind}`);
  const doDont = t.list('guidelines.content.doDontItems');
  const single = (props: RowFixture & Record<string, unknown>) => (
    <Screen>
      <TransactionListReadOnly {...props} showDivider={false} />
    </Screen>
  );
  return (
    <>
      <Section id="overview" title={g('overview.title')}>
        <p>
          <Md text={g('overview.text')} />
        </p>
        <Stage
          frames={[{ content: <Group list={statementRows} render={action} /> }]}
        />
        <div className="odoc-columns">
          {(['whenToUse', 'whenNotToUse'] as const).map((key) => (
            <div key={key} className="odoc-prose">
              <h4>{g(`overview.${key}`)}</h4>
              <ul>
                {t.list(`guidelines.overview.${key}Items`).map((item) => (
                  <li key={item}>
                    <Md text={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Subsection id="variants-table" title={g('overview.variants')}>
          <DocTable
            columns={t.list('guidelines.overview.variantColumns')}
            rows={COMPONENTS.map(([key, name, id]) => [
              <DocsLink id={id}>{name}</DocsLink>,
              g(`overview.variantRows.${key}`),
            ])}
          />
        </Subsection>
      </Section>

      <Section id="formatting" title={g('formatting.title')}>
        <Subsection id="anatomy" title={g('formatting.anatomy')}>
          <Anatomy
            example={
              <Screen>
                <TransactionListReadOnly
                  {...rows.bankTransfer}
                  content={{
                    ...rows.bankTransfer.content,
                    caption: 'Oct 8, 9:15 AM',
                  }}
                  amount={{ ...rows.bankTransfer.amount, info: 'Due Oct 15' }}
                />
              </Screen>
            }
            parts={[
              { selector: '.ods-transaction-list__icon', side: 'left' },
              {
                selector: '.ods-content-list > :nth-child(1)',
                side: 'top',
                anchor: 0.3,
              },
              {
                selector: '.ods-content-list > :nth-child(2)',
                side: 'top',
                anchor: 0.92,
              },
              { selector: '.ods-content-list > :nth-child(3)', side: 'bottom' },
              { selector: '.ods-amount-details__amount', side: 'right' },
              { selector: '.ods-tag', side: 'right' },
              { selector: '.ods-amount-details__caption', side: 'right' },
              { selector: '.ods-transaction-list__divider', side: 'left' },
            ]}
          />
          <DocTable
            columns={t.list('guidelines.formatting.anatomyColumns')}
            rows={(en.guidelines.formatting.anatomyRows as string[][]).map(
              (_, index) => [
                index + 1,
                t(`guidelines.formatting.anatomyRows.${index}.0`),
                g(
                  index === 1 || index === 4
                    ? 'formatting.yes'
                    : 'formatting.no'
                ),
                <Md text={t(`guidelines.formatting.anatomyRows.${index}.1`)} />,
              ]
            )}
          />
        </Subsection>
        <Subsection id="sizes" title={g('formatting.sizes')}>
          <p>
            <Md text={g('formatting.sizesText')} />
          </p>
          <Stage
            frames={(['md', 'sm'] as const).map((size) => ({
              label: g('formatting.size').replace('{size}', size),
              content: single({
                ...rows.supplierPayment,
                content: { ...rows.supplierPayment.content, size },
                amount: { ...rows.supplierPayment.amount, size },
              }),
            }))}
          />
        </Subsection>
        <Subsection id="density" title={g('formatting.density')}>
          <p>
            <Md text={g('formatting.densityText')} />
          </p>
          <Stage
            frames={(['default', 'compact'] as const).map((density) => ({
              label: g(
                density === 'default'
                  ? 'formatting.densityDefault'
                  : 'formatting.densityCompact'
              ),
              content: (
                <Group
                  list={statementRows.slice(0, 2)}
                  render={readOnly}
                  extra={{ density }}
                />
              ),
            }))}
          />
        </Subsection>
        <Subsection id="dividers" title={g('formatting.dividers')}>
          <p>
            <Md text={g('formatting.dividersText')} />
          </p>
          <Stage
            frames={[
              {
                content: (
                  <Group list={statementRows.slice(1)} render={readOnly} />
                ),
              },
            ]}
            caption={t('rowOptions.divider.caption')}
          />
        </Subsection>
      </Section>

      <Section id="content" title={g('content.title')}>
        <Subsection id="main-elements" title={g('content.mainElements')}>
          <ul>
            {t.list('guidelines.content.mainElementsItems').map((item) => (
              <li key={item}>
                <Md text={item} />
              </li>
            ))}
          </ul>
        </Subsection>
        <Subsection id="amount-type" title={g('content.amountType')}>
          <DocTable
            columns={t.list('guidelines.content.amountTypeColumns')}
            rows={AMOUNT_TYPE_CASES.map(([type]) => [
              c(type),
              t(`guidelines.content.amountTypes.${type}.0`),
              t(`guidelines.content.amountTypes.${type}.1`),
            ])}
          />
          <Stage
            frames={[
              {
                content: (
                  <Group
                    list={[
                      rows.creditSales,
                      {
                        ...rows.bankTransfer,
                        amount: { value: 'R$ 1.314,28', type: 'negative' },
                      },
                      rows.receivablesAdvance,
                      rows.supplierPayment,
                    ]}
                    render={readOnly}
                  />
                ),
              },
            ]}
          />
        </Subsection>
        <Subsection id="tags" title={g('content.tags')}>
          <p>
            <Md text={g('content.tagsText')} />
          </p>
          <DocTable
            columns={t.list('guidelines.content.tagColumns')}
            rows={(en.guidelines.content.tagRows as string[][]).map(
              (_, index) => [
                t(`guidelines.content.tagRows.${index}.0`),
                <Md text={t(`guidelines.content.tagRows.${index}.1`)} />,
              ]
            )}
          />
          <Stage
            frames={[
              {
                content: (
                  <Group
                    list={[rows.bankTransfer, rows.canceled, rows.creditSales]}
                    render={readOnly}
                  />
                ),
              },
            ]}
          />
        </Subsection>
        <Subsection id="do-and-dont" title={g('content.doDont')}>
          <DoDont
            verdicts={{
              do: verdict('do'),
              dont: verdict('dont'),
              caution: verdict('caution'),
            }}
            items={[
              {
                kind: 'do',
                example: single(rows.supplierPayment),
                text: <Md text={doDont[0]} />,
              },
              {
                kind: 'dont',
                example: single({
                  ...rows.supplierPayment,
                  amount: { value: '-R$ 6.819,33' },
                }),
                text: <Md text={doDont[1]} />,
              },
              {
                kind: 'do',
                example: single(rows.canceled),
                text: <Md text={doDont[2]} />,
              },
              {
                kind: 'dont',
                example: single({
                  ...rows.supplierPayment,
                  amount: {
                    ...rows.supplierPayment.amount,
                    tag: { label: 'Paid', type: 'positive' },
                  },
                }),
                text: <Md text={doDont[3]} />,
              },
              {
                kind: 'caution',
                example: single(rows.receivablesAdvance),
                text: <Md text={doDont[4]} />,
              },
              {
                kind: 'caution',
                example: single({ ...rows.creditSales, iconColor: 'on-color' }),
                text: <Md text={doDont[5]} />,
              },
            ]}
          />
        </Subsection>
      </Section>

      <Section id="behaviors" title={g('behaviors.title')}>
        <Subsection id="states" title={g('behaviors.states')}>
          <DocTable
            columns={t.list('guidelines.behaviors.stateColumns')}
            rows={(en.guidelines.behaviors.stateRows as string[][]).map(
              (row, index) =>
                row.map((_, cell) =>
                  t(`guidelines.behaviors.stateRows.${index}.${cell}`)
                )
            )}
          />
          <Stage
            frames={(['default', 'loading', 'disabled'] as const).map(
              (state) => ({
                label: g(`behaviors.stateLabels.${state}`),
                content: (
                  <Screen>
                    <TransactionListAction
                      {...rows.supplierPayment}
                      loading={state === 'loading'}
                      disabled={state === 'disabled'}
                      showDivider={false}
                    />
                  </Screen>
                ),
              })
            )}
          />
        </Subsection>
        <Subsection id="interaction" title={g('behaviors.interaction')}>
          <p>
            <Md text={g('behaviors.interactionText')} />
          </p>
          <Stage
            frames={(['chevron', 'menu', 'swipe'] as const).map((type) => ({
              label: g(`behaviors.actionTypes.${type}`),
              content: (
                <Screen>
                  <TransactionListAction
                    {...rows.supplierPayment}
                    actionType={type}
                    menuActions={type === 'swipe' ? swipeActions : menuActions}
                    showDivider={false}
                  />
                </Screen>
              ),
            }))}
          />
        </Subsection>
      </Section>

      <Section id="variants" title={g('variants.title')}>
        <Subsection id="variant-read-only" title="Read Only">
          <p>
            <Md text={g('variants.readOnly')} />
          </p>
          <Stage
            frames={[
              {
                content: (
                  <Group list={statementRows.slice(2)} render={readOnly} />
                ),
              },
            ]}
          />
        </Subsection>
        <Subsection id="variant-action" title="Action">
          <p>
            <Md text={g('variants.action')} />
          </p>
          <Stage
            frames={[
              {
                content: (
                  <Group list={statementRows.slice(0, 2)} render={action} />
                ),
              },
            ]}
          />
        </Subsection>
        <Subsection id="variant-selectable" title="Selectable">
          <p>
            <Md text={g('variants.selectable')} />
          </p>
          <Stage
            frames={[
              { label: g('variants.checkbox'), content: <SelectableGroup /> },
              {
                label: g('variants.radio'),
                content: <SelectableGroup radio />,
              },
            ]}
          />
        </Subsection>
        <Subsection id="variant-expandable" title="Expandable">
          <p>
            <Md text={g('variants.expandable')} />
          </p>
          <Stage frames={[{ content: <ExpandableGroup /> }]} />
        </Subsection>
        <Subsection id="variant-child" title="Child Read Only · Child Action">
          <p>
            <Md text={g('variants.child')} />
          </p>
          <Stage
            frames={[
              {
                label: 'Child Read Only',
                content: <Children Child={TransactionListChildReadOnly} />,
              },
              {
                label: 'Child Action',
                content: <Children Child={TransactionListChildAction} />,
              },
            ]}
          />
        </Subsection>
      </Section>

      <Section id="related" title={g('related.title')}>
        <div className="odoc-related">
          {(
            [
              ['list', 'components-list-listreadonly--docs'],
              ['tag', 'components-tag--docs'],
              ['bottomSheet', ''],
            ] as const
          ).map(([key, id]) => (
            <div key={key} className="odoc-related__card odoc-prose">
              <h4>{t(`guidelines.related.${key}.0`)}</h4>
              <p>{t(`guidelines.related.${key}.1`)}</p>
              {id && (
                <DocsLink id={id}>{t(`guidelines.related.${key}.0`)}</DocsLink>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="feedback" title={g('feedback.title')}>
        <p>
          <Md text={g('feedback.text')} />
        </p>
      </Section>
    </>
  );
};

/* ----- Specs ----- */

const SPECS_TOC = [
  'color',
  'iconColor',
  'states',
  'typography',
  'structure',
  'size',
];

const COLOR_TOKENS = [
  'color-interface-dark-down',
  'color-interface-dark-deep',
  'color-interface-dark-down',
  'color-status-positive-deep',
  'color-status-warning-deep',
  'color-interface-dark-deep',
  'color-status-positive-deep',
  'color-interface-dark-up',
  'color-interface-dark-down',
  'color-interface-dark-up',
  'color-interface-dark-up',
  'color-interface-light-deep',
  'color-interface-light-down',
  'color-interface-light-down',
  'color-interface-light-up',
];

const ICON_TOKENS: [string, string][] = [
  ['default', 'color-interface-dark-up'],
  ['on-color', 'color-interface-dark-down'],
  ['highlight', 'color-brand-primary-down'],
  ['disabled', 'color-interface-light-deep'],
  ['child (no iconColor)', 'color-interface-light-down'],
];

const STATE_TOKENS = [
  'color-interface-light-up',
  'color-interface-light-deep',
  'color-brand-primary-pure',
  '',
];

const TYPE_TOKENS: [string, string, string, string, string][] = [
  [
    '14px',
    '12px',
    'font-size-xxs',
    'font-size-xxxs',
    'font-weight-regular / medium',
  ],
  ['16px', '14px', 'font-size-xs', 'font-size-xxs', 'font-weight-regular'],
  ['12px', '12px', 'font-size-xxxs', 'font-size-xxxs', 'font-weight-medium'],
  ['16px', '14px', 'font-size-xs', 'font-size-xxs', 'font-weight-medium'],
  ['16px', '14px', 'font-size-xs', 'font-size-xxs', 'font-weight-regular'],
  ['12px', '12px', 'font-size-xxxs', 'font-size-xxxs', 'font-weight-medium'],
  ['12px', '10px', 'font-size-xxxs', '', 'font-weight-medium / bold'],
];

const STRUCTURE_TOKENS = [
  'spacing-inline-xs',
  'spacing-stack-xxs',
  'spacing-inline-xxs-extra',
  'spacing-inline-xxs',
  'spacing-inline-xxxs',
  'spacing-inline-xxxs',
  'spacing-inline-xs',
  'border-width-hairline',
  'spacing-inline-xs',
  'spacing-inline-xxs',
  'spacing-inline-xxs-extra',
  'spacing-inline-sm',
  'spacing-inline-xxxs',
  '',
];

const SIZES = [
  ['100px', '84px'],
  ['94px', '78px'],
  ['73px', '57px'],
];

const rem = (px: string) => `${parseInt(px, 10) / 16}rem`;

const Specs = ({ t }: { t: Translate }) => {
  const s = (key: string) => t(`specs.${key}`);
  return (
    <>
      <Section id="color" title={s('color.title')}>
        <DocTable
          columns={t.list('specs.color.columns')}
          rows={COLOR_TOKENS.map((token, index) => [
            t(`specs.color.rows.${index}.0`),
            t(`specs.color.rows.${index}.1`),
            <Swatch token={token} />,
          ])}
        />
        <FullList table="color" t={t} />
      </Section>
      <Section id="iconColor" title={s('iconColor.title')}>
        <DocTable
          columns={t.list('specs.iconColor.columns')}
          rows={ICON_TOKENS.map(([value, token], index) => [
            c(value),
            <Md text={t(`specs.iconColor.rows.${index}`)} />,
            <Swatch token={token} />,
          ])}
        />
        <FullList table="iconColor" t={t} />
      </Section>
      <Section id="states" title={s('states.title')}>
        <DocTable
          columns={t.list('specs.states.columns')}
          rows={STATE_TOKENS.map((token, index) => [
            t(`specs.states.rows.${index}.0`),
            token ? <Swatch token={token} /> : '–',
            t(`specs.states.rows.${index}.1`),
          ])}
        />
        <FullList table="states" t={t} />
      </Section>
      <Section id="typography" title={s('typography.title')}>
        <p>
          <Md
            text={s('typography.text').replace(
              '{font}',
              tokenValue('font-family-base')
            )}
          />
        </p>
        <DocTable
          columns={t.list('specs.typography.columns')}
          rows={TYPE_TOKENS.map(([md, sm, mdToken, smToken, weight], index) => [
            t(`specs.typography.rows.${index}.0`),
            md,
            sm,
            t(`specs.typography.rows.${index}.1`),
            <>
              {c(mdToken)} / {smToken ? c(smToken) : s('typography.noToken')} ·{' '}
              {c(weight)}
            </>,
          ])}
        />
        <FullList table="typography" t={t} />
      </Section>
      <Section id="structure" title={s('structure.title')}>
        <DocTable
          columns={t.list('specs.structure.columns')}
          rows={STRUCTURE_TOKENS.map((token, index) => {
            const px = token ? tokenValue(token) : '24px / 16px';
            return [
              t(`specs.structure.rows.${index}.0`),
              t(`specs.structure.rows.${index}.1`),
              px,
              token ? rem(px) : '–',
              token ? c(token) : s('structure.noToken'),
            ];
          })}
        />
        <FullList table="structure" t={t} />
      </Section>
      <Section id="size" title={s('size.title')}>
        <p>
          <Md text={s('size.text')} />
        </p>
        <DocTable
          columns={t.list('specs.size.columns')}
          rows={SIZES.map(([size, compact], index) => [
            t(`specs.size.rows.${index}`),
            size,
            compact,
          ])}
        />
        <FullList table="size" t={t} />
      </Section>
    </>
  );
};

/* ----- Accessibility ----- */

const ACCESSIBILITY_TOC = ['provides', 'considerations'];

const Accessibility = ({ t }: { t: Translate }) => {
  const a = (key: string) => t(`accessibility.${key}`);
  const table = (
    rowsKey: string,
    columns: string,
    count: number,
    cells: number
  ) => (
    <DocTable
      columns={t.list(`accessibility.provides.${columns}`)}
      rows={Array.from({ length: count }, (_, index) =>
        Array.from({ length: cells }, (__, cell) => (
          <Md text={t(`accessibility.provides.${rowsKey}.${index}.${cell}`)} />
        ))
      )}
    />
  );
  return (
    <>
      <Section id="provides" title={a('provides.title')}>
        <Subsection id="keyboard" title={a('provides.keyboard')}>
          {table(
            'keyboardRows',
            'keyboardColumns',
            en.accessibility.provides.keyboardRows.length,
            3
          )}
        </Subsection>
        <Subsection id="screen-readers" title={a('provides.screenReaders')}>
          {table(
            'screenReaderRows',
            'screenReaderColumns',
            en.accessibility.provides.screenReaderRows.length,
            2
          )}
        </Subsection>
        <Subsection id="focus" title={a('provides.focus')}>
          <p>
            <Md text={a('provides.focusText')} />
          </p>
        </Subsection>
      </Section>
      <Section id="considerations" title={a('considerations.title')}>
        <ul>
          {t.list('accessibility.considerations.items').map((item) => (
            <li key={item}>
              <Md text={item} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
};

/* ----- Page ----- */

type TabId = 'guidelines' | 'specs' | 'accessibility';

const TOC: Record<TabId, [string, string][]> = {
  guidelines: GUIDELINES_TOC.map((id) => [id, `guidelines.${id}.title`]),
  specs: SPECS_TOC.map((id) => [id, `specs.${id}.title`]),
  accessibility: ACCESSIBILITY_TOC.map((id) => [
    id,
    `accessibility.${id}.title`,
  ]),
};

const requestedTab = (): TabId | null => {
  let fromUrl: string | null = null;
  try {
    fromUrl = new URLSearchParams(window.location.search).get('tab');
  } catch {
    fromUrl = null;
  }
  const tab = fromUrl ?? takeRequest(TAB_REQUEST_KEY);
  return tab && tab in TOC ? (tab as TabId) : null;
};

/** Group Overview of the Transaction List family: design guidelines, specs and accessibility. */
export const GroupOverview = (): React.ReactElement => {
  const t = useTranslate(...LOCALES);
  const [tab, setTab] = useState<TabId>(() => requestedTab() ?? 'guidelines');
  useEffect(() => window.scrollTo?.(0, 0), []);

  return (
    <Unstyled>
      <div className="odoc">
        <header className="odoc-header">
          <div>
            <Breadcrumb items={t.list('breadcrumb')} />
            <Typography variant="heading1" className="odoc-header__title">
              {PAGE.title}
            </Typography>
            <div className="odoc-header__meta">
              <Tag type="neutral-02" size="medium" setIconOff>
                {PAGE.status}
              </Tag>
              <span>
                {t('lastUpdated').replace(
                  '{date}',
                  formatDate(PAGE.lastUpdated, t.locale)
                )}
              </span>
            </div>
            <Typography variant="lead" className="odoc-header__description">
              {t('description')}
            </Typography>
          </div>
          <aside className="odoc-panel" aria-label={t('componentDetails')}>
            <div>
              <span className="odoc-panel__label">{t('library')}</span>
              <span className="odoc-panel__value">{PAGE.library}</span>
            </div>
            <Link
              href={PAGE.github}
              target="_blank"
              rel="noreferrer"
              icon="externalLink"
            >
              GitHub
            </Link>
          </aside>
        </header>
        <Tabs
          label={t('documentation')}
          tabs={(Object.keys(TOC) as TabId[]).map((id) => ({
            id,
            label: t(`tabs.${id}`),
          }))}
          active={tab}
          onChange={(id) => setTab(id as TabId)}
        />
        <div className="odoc-body">
          <div role="tabpanel" aria-labelledby={`odoc-tab-${tab}`}>
            {tab === 'guidelines' && <Guidelines t={t} />}
            {tab === 'specs' && <Specs t={t} />}
            {tab === 'accessibility' && <Accessibility t={t} />}
          </div>
          <OnThisPage
            key={`${tab}-${t.locale}`}
            title={t('toc')}
            items={TOC[tab].map(([id, key]) => ({ id, label: t(key) }))}
          />
        </div>
      </div>
    </Unstyled>
  );
};
