/* Página de documentação da família Transaction List montada a partir de dados (JSON por
 * componente): o texto vive no JSON, a estrutura das cinco abas vive aqui, uma vez só. */
import React, { ReactNode } from 'react';
import { Controls, Source, Story } from '@storybook/blocks';
import { Placeholder, PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListReadOnly from '../../../packages/ocean-react/src/TransactionListReadOnly';
import TransactionListAction from '../../../packages/ocean-react/src/TransactionListAction';
import TransactionListSelectable from '../../../packages/ocean-react/src/TransactionListSelectable';
import TransactionListExpandable from '../../../packages/ocean-react/src/TransactionListExpandable';
import TransactionListChildAction from '../../../packages/ocean-react/src/TransactionListChildAction';
import TransactionListChildReadOnly from '../../../packages/ocean-react/src/TransactionListChildReadOnly';
import { AiRules, AiRulesBlock } from '../DocLinks';
import { AnatomyLegend, AnatomySide } from '../AnatomyLegend';
import { Availability, AvailabilityTable } from '../AvailabilityTable';
import { ConfigTable, MigrationTable } from '../ConfigTable';
import { DocPage } from '../DocPage';
import { DocSection, DocTable } from '../DocTable';
import { DoDont, DoDontGrid } from '../DoDont';
import { FixedRowsTable } from '../StatusTable';
import { PreviewCanvas } from '../PreviewCanvas';
import { TokenTable, tokenValue } from '../TokenTable';
import {
  blockConfigRows,
  blockTokenRows,
  CONTENT_RULES,
  FAMILY_FORBIDDEN,
  figmaNode,
  footerLinks,
  headerLinks,
  kbPath,
  legacyBlockMigration,
  PRS,
  rowMeasures,
} from './shared';

/** Texto com `código` e **negrito** (o mínimo de markdown que as páginas usam). */
export const Md = ({ text }: { text: string }): React.ReactElement => (
  <>
    {text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((part, index) => {
      if (part.startsWith('`'))
        // eslint-disable-next-line react/no-array-index-key
        return <code key={index}>{part.slice(1, -1)}</code>;
      if (part.startsWith('**'))
        // eslint-disable-next-line react/no-array-index-key
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      return part;
    })}
  </>
);

const md = (text?: string): ReactNode => (text ? <Md text={text} /> : '—');

/** Exemplo vivo descrito em dados. Valores "$icon24" / "$icon16" viram ícones. */
export type ExampleSpec = {
  component: string;
  props?: Record<string, unknown>;
  children?: ExampleSpec[];
};

const registry: Record<string, React.ElementType> = {
  TransactionListReadOnly,
  TransactionListAction,
  TransactionListSelectable,
  TransactionListExpandable,
  TransactionListChildAction,
  TransactionListChildReadOnly,
};

const resolveValue = (value: unknown): unknown => {
  if (value === '$icon24') return <PlaceholderOutline size={24} />;
  if (value === '$icon16') return <Placeholder size={16} />;
  if (value === '$noop') return () => undefined;
  if (Array.isArray(value)) return value.map(resolveValue);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveValue(item)])
    );
  return value;
};

export const Example = ({
  spec,
}: {
  spec: ExampleSpec;
}): React.ReactElement => {
  if (spec.component === 'Separator')
    return <div className="odoc__separator" />;
  const Component = registry[spec.component];
  const props = resolveValue(spec.props ?? {}) as Record<string, unknown>;
  return (
    <Component {...props}>
      {spec.children?.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Example key={index} spec={child} />
      ))}
    </Component>
  );
};

const Examples = ({ specs }: { specs: ExampleSpec[] }) => (
  <>
    {specs.map((spec, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Example key={index} spec={spec} />
    ))}
  </>
);

/** Nome de token do Figma (Status/Warning/Up) → cor. */
const tokenColor = (name?: string): string | undefined =>
  name ? tokenValue(name) : undefined;

type Row = string[];

export type FamilyDocsData = {
  page: {
    title: string;
    subtitle: string;
    componentDir: string;
    kbFile: string;
    node: string;
  };
  overview: {
    purpose: string;
    example: ExampleSpec[];
    exampleCode: string;
    bullets: string[];
    availability: (Omit<Availability, 'notes' | 'link'> & {
      notes: string;
      pr?: 'web' | 'ios' | 'android';
      link?: { label: string; href: string };
      figma?: boolean;
    })[];
    availabilityNote?: string;
    migration: { intro?: string; rows: Row[]; legacyBlocks?: boolean };
  };
  specs: {
    anatomy: {
      example: ExampleSpec[];
      parts: {
        selector: string;
        side: AnatomySide;
        anchor?: number;
        label: string;
        prop?: string;
      }[];
    };
    config: Row[];
    blockConfigDefault: string;
    tokens: {
      states: string[];
      rows: { part: string; tokens: string[] }[];
      blockRows?: {
        disabledIndex: number | number[];
        loadingIndex?: number;
        after?: number;
      };
      note?: string;
    };
    sections: {
      title: string;
      intro?: string;
      stories: string[];
      code: string;
      width?: 'auto';
    }[];
    measures: { rowGap?: [string, string]; rows: Row[] };
  };
  guidelines: {
    useWhen: string[];
    dontUse: Row[];
    doDont: {
      kind: 'do' | 'dont' | 'caution';
      caption: string;
      code: string;
      background?: string;
      examples: ExampleSpec[];
    }[];
    aiRules: AiRules & { familyForbidden?: boolean };
  };
  a11y: {
    reading: string;
    keyboard: string;
    contrast: string;
    textScale?: string;
    verification: string;
  };
  code: {
    importCode: string;
    playgroundStory: string;
    playgroundIntro: string;
    usageCode: string;
  };
};

/** Regras para IA prontas (com as proibições comuns da família quando pedido). */
export const familyAiRules = (data: FamilyDocsData): AiRules => {
  const { familyForbidden, ...rules } = data.guidelines.aiRules;
  return {
    ...rules,
    forbidden: familyForbidden
      ? [...FAMILY_FORBIDDEN, ...rules.forbidden]
      : rules.forbidden,
  };
};

type Stories = Record<string, Record<string, unknown>>;

const Overview = ({ data }: { data: FamilyDocsData }) => {
  const { overview, page } = data;
  return (
    <>
      <DocSection title={page.title}>
        <p className="odoc__lead">{md(overview.purpose)}</p>
        <PreviewCanvas code={overview.exampleCode}>
          <Examples specs={overview.example} />
        </PreviewCanvas>
        <ul className="odoc__list">
          {overview.bullets.map((bullet) => (
            <li key={bullet}>{md(bullet)}</li>
          ))}
        </ul>
      </DocSection>
      <DocSection title="Disponibilidade por plataforma">
        <AvailabilityTable
          rows={overview.availability.map((row) => {
            let { link } = row;
            if (row.pr) link = PRS[row.pr];
            if (row.figma)
              link = { label: `node ${page.node}`, href: figmaNode(page.node) };
            return { ...row, link, notes: md(row.notes) };
          })}
        />
        {overview.availabilityNote && (
          <p className="odoc__lead odoc__note">
            {md(overview.availabilityNote)}
          </p>
        )}
      </DocSection>
      <DocSection
        title="O que mudou / migração"
        intro={overview.migration.intro && md(overview.migration.intro)}
      >
        <MigrationTable
          rows={[
            ...overview.migration.rows.map(([from, to, notes]) => ({
              from: md(from),
              to: md(to),
              notes: md(notes),
            })),
            ...(overview.migration.legacyBlocks ? legacyBlockMigration : []),
          ]}
        />
      </DocSection>
    </>
  );
};

const Specs = ({
  data,
  stories,
}: {
  data: FamilyDocsData;
  stories: Stories;
}) => {
  const { specs } = data;
  const tokenRows = [...specs.tokens.rows];
  if (specs.tokens.blockRows) {
    const {
      disabledIndex,
      loadingIndex,
      after = tokenRows.length - 1,
    } = specs.tokens.blockRows;
    tokenRows.splice(
      after,
      0,
      ...blockTokenRows(specs.tokens.states.length, disabledIndex, loadingIndex)
    );
  }
  return (
    <>
      <DocSection title="Anatomia">
        <AnatomyLegend
          example={<Examples specs={specs.anatomy.example} />}
          parts={specs.anatomy.parts.map((part) => ({
            ...part,
            prop: part.prop && md(part.prop),
          }))}
        />
      </DocSection>
      <DocSection title="Configurações">
        <ConfigTable
          rows={[
            ...specs.config.map(([category, option, values, defaultValue]) => ({
              category,
              option: md(option),
              values: md(values),
              defaultValue: md(defaultValue),
            })),
            ...blockConfigRows(md(specs.blockConfigDefault)),
          ]}
        />
      </DocSection>
      <DocSection title="Cor por estado">
        <TokenTable states={specs.tokens.states} rows={tokenRows} />
        {specs.tokens.note && (
          <p className="odoc__lead odoc__note">{md(specs.tokens.note)}</p>
        )}
      </DocSection>
      {specs.sections.map((section) => (
        <DocSection
          key={section.title}
          title={section.title}
          intro={section.intro && md(section.intro)}
        >
          <PreviewCanvas width={section.width ?? 'auto'} code={section.code}>
            <div className="odoc__stories">
              {section.stories.map((name) => (
                <Story key={name} of={stories[name]} />
              ))}
            </div>
          </PreviewCanvas>
        </DocSection>
      ))}
      <DocSection title="Medidas">
        <DocTable
          head={['Medida', 'Valor', 'Token']}
          rows={[
            ...(specs.measures.rowGap
              ? rowMeasures(specs.measures.rowGap[0], specs.measures.rowGap[1])
              : []),
            ...specs.measures.rows.map(([label, value, token]) => [
              label,
              value,
              md(token),
            ]),
          ]}
        />
      </DocSection>
    </>
  );
};

const Guidelines = ({ data }: { data: FamilyDocsData }) => {
  const { guidelines } = data;
  return (
    <>
      <DocSection title="Quando usar">
        <ul className="odoc__list">
          {guidelines.useWhen.map((item) => (
            <li key={item}>{md(item)}</li>
          ))}
        </ul>
      </DocSection>
      <DocSection title="Quando não usar">
        <DocTable
          head={['Situação', 'Use']}
          rows={guidelines.dontUse.map(([situation, use]) => [
            md(situation),
            md(use),
          ])}
        />
      </DocSection>
      <DocSection title="Faça e não faça">
        <DoDontGrid>
          {guidelines.doDont.map((card) => (
            <DoDont
              key={card.caption}
              kind={card.kind}
              caption={card.caption}
              code={card.code}
              background={tokenColor(card.background)}
            >
              <Examples specs={card.examples} />
            </DoDont>
          ))}
        </DoDontGrid>
      </DocSection>
      <DocSection title="Regras de conteúdo">{CONTENT_RULES}</DocSection>
      <DocSection title="Regras para IA">
        <AiRulesBlock
          rules={familyAiRules(data)}
          intro="Resumo para agentes de código, com rótulos fixos. O mesmo texto vai no resumo da story (manifesto)."
        />
      </DocSection>
    </>
  );
};

const Accessibility = ({ data }: { data: FamilyDocsData }) => {
  const { a11y } = data;
  return (
    <DocSection title="Acessibilidade">
      <FixedRowsTable
        rows={[
          {
            topic: 'O que o leitor de tela anuncia',
            content: md(a11y.reading),
          },
          { topic: 'Teclado', content: md(a11y.keyboard) },
          { topic: 'Contraste', content: md(a11y.contrast) },
          {
            topic: 'Texto grande',
            content: md(
              a11y.textScale ?? 'O conteúdo quebra linha; o valor não quebra.'
            ),
          },
          { topic: 'Verificação automática', content: md(a11y.verification) },
        ]}
      />
    </DocSection>
  );
};

const Code = ({
  data,
  stories,
}: {
  data: FamilyDocsData;
  stories: Stories;
}) => {
  const { code } = data;
  const playground = stories[code.playgroundStory];
  return (
    <>
      <DocSection title="Importação">
        <Source language="tsx" dark code={code.importCode} />
      </DocSection>
      <DocSection title="Playground" intro={code.playgroundIntro}>
        <PreviewCanvas compact>
          <Story of={playground} />
        </PreviewCanvas>
        <Controls of={playground} />
      </DocSection>
      <DocSection title="Uso (pronto para copiar)">
        <Source language="tsx" dark code={code.usageCode} />
      </DocSection>
    </>
  );
};

/** A página inteira: cabeçalho, cinco abas e rodapé. */
export const FamilyDocsPage = ({
  data,
  stories,
}: {
  data: FamilyDocsData;
  stories: Stories;
}): React.ReactElement => (
  <DocPage
    title={data.page.title}
    subtitle={md(data.page.subtitle)}
    links={headerLinks(
      data.page.componentDir,
      data.page.kbFile,
      data.page.node
    )}
    footer={footerLinks(data.page.kbFile)}
    tabs={[
      {
        id: 'overview',
        label: 'Visão geral',
        content: <Overview data={data} />,
      },
      {
        id: 'specs',
        label: 'Especificações',
        content: <Specs data={data} stories={stories} />,
      },
      {
        id: 'guidelines',
        label: 'Diretrizes',
        content: <Guidelines data={data} />,
      },
      {
        id: 'a11y',
        label: 'Acessibilidade',
        content: <Accessibility data={data} />,
      },
      {
        id: 'code',
        label: 'Código',
        content: <Code data={data} stories={stories} />,
      },
    ]}
  />
);

export { kbPath };

/**
 * Liga o JSON de um componente às stories: devolve as regras para IA (resumo da Meta) e a
 * página de docs, que lê as stories na hora de renderizar.
 */
export const familyDocs = (
  json: unknown
): {
  aiRules: AiRules;
  page: (stories: () => Stories) => () => React.ReactElement;
} => {
  const data = json as FamilyDocsData;
  return {
    aiRules: familyAiRules(data),
    page: (stories) =>
      function FamilyDocs() {
        return <FamilyDocsPage data={data} stories={stories()} />;
      },
  };
};
