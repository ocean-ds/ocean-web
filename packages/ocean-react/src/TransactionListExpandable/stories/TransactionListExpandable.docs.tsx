/* Página de documentação em abas (formato aprovado no MR-615).
 * Texto: base de conhecimento (usage-guidelines/transactionlistexpandable.md); exemplos vivos. */
import React from 'react';
import { Controls, Source, Story } from '@storybook/blocks';
import { Placeholder, PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListExpandable from '../TransactionListExpandable';
import TransactionListChildAction from '../../TransactionListChildAction';
import {
  AiRules,
  AiRulesBlock,
  AnatomyLegend,
  AvailabilityTable,
  ConfigTable,
  DocPage,
  DocSection,
  DocTable,
  DoDont,
  DoDontGrid,
  FixedRowsTable,
  MigrationTable,
  PreviewCanvas,
  TokenTable,
} from '../../../../../.storybook/docs-blocks';
import {
  blockConfigRows,
  blockTokenRows,
  c,
  CONTENT_RULES,
  FAMILY_FORBIDDEN,
  figmaNode,
  footerLinks,
  headerLinks,
  kbPath,
  legacyBlockMigration,
  PRS,
  rowMeasures,
} from '../../../../../.storybook/docs-blocks/transaction-list/shared';

type StoryRef = Record<string, unknown>;

const KB_FILE = 'transactionlistexpandable.md';
const NODE = '24289-64430';
const childIcon = <Placeholder size={16} />;

const parent = {
  title: 'Maquininha Blu',
  description: 'Crédito Mastercard',
  caption: '12 de novembro',
  amount: 'R$ 850,00',
  amountType: 'positive' as const,
  amountTag: { label: 'Agendado', type: 'warning' as const },
  additionalData: 'Líquido a receber',
  contentSize: 'md' as const,
  amountSize: 'md' as const,
  icon: <PlaceholderOutline size={24} />,
  showDivider: true,
  supportingText: 'Valores líquidos de taxas',
};

const children = (
  <>
    <TransactionListChildAction
      title="Agenda gerada"
      description="Bruto"
      amount="R$ 1.000,00"
      icon={childIcon}
      position="first"
    />
    <TransactionListChildAction
      title="Agenda antecipada"
      description="Antecipação"
      amount="R$ 150,00"
      amountType="negative"
      icon={childIcon}
      position="last"
    />
  </>
);

const exampleCode = `const [expanded, setExpanded] = useState(false);

<TransactionListExpandable
  icon={<PlaceholderOutline size={24} />}
  title="Maquininha Blu"
  description="Crédito Mastercard"
  amount="R$ 850,00"
  amountType="positive"
  contentSize="md"
  amountSize="md"
  showDivider
  expanded={expanded}
  onToggle={setExpanded}
  supportingText="Valores líquidos de taxas"
>
  <TransactionListChildAction position="first" title="Agenda gerada" description="Bruto" amount="R$ 1.000,00" icon={<Placeholder size={16} />} />
  <TransactionListChildAction position="last" title="Agenda antecipada" description="Antecipação" amount="R$ 150,00" amountType="negative" icon={<Placeholder size={16} />} />
</TransactionListExpandable>`;

export const AI_RULES: AiRules = {
  useWhen: [
    'O valor da linha é composto por partes que o lojista quer ver sem sair da lista (UR com antecipação e trava, compra parcelada, vendas do dia por bandeira).',
    'Conciliação que abre o breakdown.',
  ],
  dontUse: [
    'Transação sem composição a mostrar → TransactionListAction ou TransactionListReadOnly.',
    'Linha expansível sem valor → ListExpandable.',
    'Conteúdo colapsável genérico (FAQ, termos) → Accordion.',
    'Expansão dentro da expansão → não aninhe; o segundo nível vai ao detalhe (Child Action).',
  ],
  required: [
    'title e amount; amount formatado e sem sinal.',
    'expanded + onToggle (controlado).',
    'Filhos TransactionListChildAction / TransactionListChildReadOnly com position (first, middle, last).',
    'contentSize="md" e amountSize="md" para seguir o Figma da família (sem eles, o desenho antigo).',
  ],
  forbidden: [
    ...FAMILY_FORBIDDEN,
    'defaultExpanded (não existe) ou expanded sem onToggle.',
    'Divider entre os filhos (a linha do tempo liga; showDivider fica no pai).',
    'ListAction / ListReadOnly como filho em código novo.',
    'Filho com R$ 0,00 (renderize só a parte que existe).',
    'Expandable dentro de Expandable.',
  ],
  defaults: [
    'expanded=false · showDivider=false (web) · type="card"',
    'contentSize e amountSize sem padrão (opt-in; passe "md") · iconColor sem padrão (cor atual)',
    'inverted=true · status="default" · amountType="default" · density="default"',
  ],
  childOf: [
    'List (ou outro container de lista). Filhos: TransactionListChildAction / TransactionListChildReadOnly.',
  ],
  source: [kbPath(KB_FILE)],
};

const Overview = () => (
  <>
    <DocSection title="Transaction List Expandable">
      <p className="odoc__lead">
        Linha de transação que abre na própria lista as partes que compõem o
        valor, sem levar o lojista para outra tela.
      </p>
      <PreviewCanvas code={exampleCode}>
        <TransactionListExpandable {...parent} expanded>
          {children}
        </TransactionListExpandable>
      </PreviewCanvas>
      <ul className="odoc__list">
        <li>
          <strong>Aberta / fechada:</strong> controlado por {c('expanded')} +{' '}
          {c('onToggle')}.
        </li>
        <li>
          <strong>Filhos por slot:</strong> Child Action / Child Read Only
          ligados pela linha do tempo, e um rodapé ({c('supportingText')}).
        </li>
        <li>
          <strong>Formato da família por opt-in:</strong> {c('contentSize')},{' '}
          {c('amountSize')}, {c('amountTag')}, {c('iconColor')} e {c('density')}{' '}
          — sem eles, a linha desenha como antes (extrato, OriginSection e
          DebtStep no ar).
        </li>
      </ul>
    </DocSection>

    <DocSection title="Disponibilidade por plataforma">
      <AvailabilityTable
        rows={[
          {
            platform: 'Portal (web)',
            status: 'em revisão',
            link: PRS.web,
            notes: (
              <>
                Controlado ({c('expanded')} + {c('onToggle')}); divisor padrão{' '}
                {c('false')}; desabilitado por opacidade (comportamento
                anterior).
              </>
            ),
          },
          {
            platform: 'iOS',
            status: 'em revisão',
            link: PRS.ios,
            notes: (
              <>
                {c('status')} {c('.collapsed/.expanded')}; o toque alterna e
                chama {c('onStatusChange')}; divisor padrão {c('true')}.
              </>
            ),
          },
          {
            platform: 'Android',
            status: 'em revisão',
            link: PRS.android,
            notes: (
              <>
                Não controlado: {c('startExpanded')} + estado interno, avisa em{' '}
                {c('onExpandedChange')}; divisor padrão {c('true')}.
              </>
            ),
          },
          {
            platform: 'Figma',
            status: 'pronto',
            link: { label: `node ${NODE}`, href: figmaNode(NODE) },
            notes:
              'State = Default · Hover · Loading · Disabled × Expandable = No · Yes.',
          },
        ]}
      />
    </DocSection>

    <DocSection
      title="O que mudou / migração"
      intro={
        <>
          Substitui o {c('subItens')} do {c('TransactionListItem')} e os filhos
          montados com {c('ListAction')}; as telas migram no MR-903.
        </>
      }
    >
      <MigrationTable
        rows={[
          {
            from: c('subItens'),
            to: (
              <>
                {c('children')} (Child Action / Child Read Only) +{' '}
                {c('position')}
              </>
            ),
            notes: 'Linha do tempo no lugar do divisor entre filhos',
          },
          {
            from: <>{c('ListAction type="text"')} como filho</>,
            to: c('TransactionListChildAction'),
            notes: 'Escala sm por padrão',
          },
          ...legacyBlockMigration,
        ]}
      />
    </DocSection>
  </>
);

const Specs = ({ stories }: { stories: Record<string, StoryRef> }) => (
  <>
    <DocSection title="Anatomia">
      <AnatomyLegend
        example={
          <TransactionListExpandable {...parent} expanded>
            {children}
          </TransactionListExpandable>
        }
        parts={[
          {
            selector: '.ods-list-expandable__icon',
            side: 'left',
            label: 'Ícone',
            prop: c('icon'),
          },
          {
            selector: '.ods-list-expandable__main .ods-content-list',
            side: 'left',
            anchor: 0.12,
            label: 'Bloco de conteúdo',
            prop: (
              <>
                {c('title')}, {c('description')}, {c('caption')}
              </>
            ),
          },
          {
            selector: '.ods-list-expandable__main .ods-amount-details__amount',
            side: 'right',
            label: 'Bloco de valor',
            prop: c('amount'),
          },
          {
            selector:
              '.ods-list-expandable__main .ods-amount-details__indicator',
            side: 'right',
            label: 'Etiqueta',
            prop: c('amountTag'),
          },
          {
            selector: '.ods-list-expandable__action',
            side: 'top',
            label: 'Seta (abre/fecha)',
            prop: c('expanded'),
          },
          {
            selector: '.ods-list-expandable__content',
            side: 'left',
            label: 'Filhos (linha do tempo)',
            prop: c('children'),
          },
          {
            selector: '.ods-list-expandable__footer',
            side: 'bottom',
            anchor: 0.7,
            label: 'Rodapé',
            prop: c('supportingText'),
          },
          {
            selector: '.ods-list-expandable__divider',
            side: 'bottom',
            anchor: 0.1,
            label: 'Divisor (abaixo do conteúdo aberto)',
            prop: c('showDivider'),
          },
        ]}
      />
    </DocSection>

    <DocSection title="Configurações">
      <ConfigTable
        rows={[
          {
            category: 'Estado',
            option: c('expanded'),
            values: (
              <>
                {c('false')} (fechada) · {c('true')} (aberta)
              </>
            ),
            defaultValue: c('false'),
          },
          {
            category: 'Aparência',
            option: c('type'),
            values: (
              <>
                {c('card')} · {c('text')}
              </>
            ),
            defaultValue: c('card'),
          },
          {
            category: 'Aparência',
            option: c('showDivider'),
            values: (
              <>
                {c('false')} · {c('true')} (padrão do Figma)
              </>
            ),
            defaultValue: c('false'),
          },
          {
            category: 'Aparência',
            option: c('density'),
            values: (
              <>
                {c('default')} (16) · {c('compact')} (8)
              </>
            ),
            defaultValue: c('default'),
          },
          {
            category: 'Aparência',
            option: c('iconColor'),
            values: (
              <>
                {c('default')} · {c('on-color')} · {c('highlight')}
              </>
            ),
            defaultValue: '— (cor atual)',
          },
          ...blockConfigRows('— (opt-in; passe md)'),
        ]}
      />
    </DocSection>

    <DocSection title="Cor por estado">
      <TokenTable
        states={['Fechada', 'Hover', 'Aberta', 'Carregando', 'Desabilitado']}
        rows={[
          {
            part: 'Fundo da linha (multiply)',
            tokens: ['—', 'Interface/Light/Up', '—', '—', '—'],
          },
          {
            part: 'Ícone',
            tokens: [
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              'Interface/Light/Up',
              'Interface/Dark/Up (opacidade 0,6)',
            ],
          },
          {
            part: 'Seta',
            tokens: [
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              '—',
              'Interface/Dark/Up (opacidade 0,6)',
            ],
          },
          ...blockTokenRows(5, -1, 3),
          { part: 'Rodapé', tokens: ['—', '—', 'Interface/Dark/Up', '—', '—'] },
          { part: 'Divisor', tokens: Array(5).fill('Interface/Light/Down') },
        ]}
      />
      <p className="odoc__lead" style={{ marginTop: 8 }}>
        Desabilitado no web: a linha inteira fica com opacidade 0,6
        (comportamento anterior, para as telas no ar) — não usa o tipo inativo
        dos blocos.
      </p>
    </DocSection>

    <DocSection
      title="Estados lado a lado"
      intro="Fechada, aberta e o desenho legado (telas no ar), em cada estado."
    >
      <PreviewCanvas width="auto" code={exampleCode}>
        <Story of={stories.States} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Abrir e fechar (interativo)">
      <PreviewCanvas code={exampleCode}>
        <Story of={stories.WithFamilyChildren} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Tamanhos × tipos de valor">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListExpandable … contentSize="sm" amountSize="sm" density="compact" />`}
      >
        <Story of={stories.AmountTypes} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Medidas">
      <DocTable
        head={['Medida', 'Valor', 'Token']}
        rows={[
          ...rowMeasures('8', 'Spacing/Xxs'),
          ['Padding vertical (compact)', '8', c('Spacing/Xxs')],
          ['Padding à direita da linha', '8', c('Spacing/Xxs')],
          ['Rodapé (cima / baixo)', '12 / 24', c('Spacing/XxsExtra / Sm')],
        ]}
      />
    </DocSection>
  </>
);

const Guidelines = () => (
  <>
    <DocSection title="Quando usar">
      <ul className="odoc__list">
        <li>
          O valor da linha é <strong>composto</strong> por partes que o lojista
          quer ver sem sair da lista (UR com antecipação e trava, compra
          parcelada, vendas do dia por bandeira).
        </li>
        <li>Conciliação que abre o breakdown.</li>
        <li>
          Expandir é decisão <strong>por item</strong>: na mesma lista convivem
          Expandable e Action/Read Only.
        </li>
      </ul>
    </DocSection>

    <DocSection title="Quando não usar">
      <DocTable
        head={['Situação', 'Use']}
        rows={[
          [
            'Transação sem composição a mostrar',
            'Transaction List Action ou Read Only',
          ],
          ['Linha expansível sem valor', c('ListExpandable')],
          ['Conteúdo colapsável genérico (FAQ, termos)', c('Accordion')],
          [
            'Expansão dentro da expansão',
            'Não aninhe — o segundo nível vai ao detalhe (Child Action)',
          ],
        ]}
      />
    </DocSection>

    <DocSection title="Faça e não faça">
      <DoDontGrid>
        <DoDont
          kind="do"
          caption="Partes do valor como filhos, ligadas pela linha do tempo; o divisor fica no pai."
          code={exampleCode}
        >
          <TransactionListExpandable {...parent} expanded>
            {children}
          </TransactionListExpandable>
        </DoDont>
        <DoDont
          kind="dont"
          caption="Não mostre filho com R$ 0,00: renderize só a parte que existe."
          code={`// Não faça\n<TransactionListChildAction title="Agenda em trava bancária" amount="R$ 0,00" … />`}
        >
          <TransactionListExpandable
            {...parent}
            expanded
            supportingText={undefined}
          >
            <TransactionListChildAction
              title="Agenda gerada"
              amount="R$ 850,00"
              icon={childIcon}
              position="first"
            />
            <TransactionListChildAction
              title="Agenda em trava bancária"
              amount="R$ 0,00"
              icon={childIcon}
              position="last"
            />
          </TransactionListExpandable>
        </DoDont>
        <DoDont
          kind="caution"
          caption="Sem contentSize/amountSize a linha usa o desenho anterior; passe md para seguir o Figma da família."
          code={`<TransactionListExpandable contentSize="md" amountSize="md" … />`}
        >
          <TransactionListExpandable
            title="Maquininha Blu"
            description="Crédito Mastercard"
            amount="R$ 850,00"
            amountType="positive"
            icon={<PlaceholderOutline size={24} />}
          />
        </DoDont>
        <DoDont
          kind="caution"
          caption="No web o padrão do divisor é false (no app é true): passe showDivider em lista contínua."
          code="<TransactionListExpandable showDivider … />"
        >
          <TransactionListExpandable {...parent} />
        </DoDont>
      </DoDontGrid>
    </DocSection>

    <DocSection title="Regras de conteúdo">{CONTENT_RULES}</DocSection>

    <DocSection title="Regras para IA">
      <AiRulesBlock
        rules={AI_RULES}
        intro="Resumo para agentes de código, com rótulos fixos. O mesmo texto vai no resumo da story (manifesto)."
      />
    </DocSection>
  </>
);

const Accessibility = () => (
  <DocSection title="Acessibilidade">
    <FixedRowsTable
      rows={[
        {
          topic: 'O que o leitor de tela anuncia',
          content: (
            <>
              Um botão com {c('aria-expanded')} e nome &quot;Expandir Maquininha
              Blu&quot; / &quot;Recolher Maquininha Blu&quot; — o{' '}
              {c('aria-label')} substitui os textos da linha: descrição, valor e
              etiqueta não são lidos no botão (comportamento anterior, mantido).
              Os filhos são lidos depois, quando aberta.
            </>
          ),
        },
        {
          topic: 'Teclado',
          content: (
            <>
              Tab foca a linha; Enter/Espaço abrem e fecham. Os filhos Child
              Action entram na ordem de foco quando abertos.
            </>
          ),
        },
        {
          topic: 'Contraste',
          content: (
            <>
              Ícone e seta em Interface/Dark/Up (2,2:1 no branco); com{' '}
              {c('iconColor')}, as mesmas regras da família ({c('on-color')} só
              sobre fundo colorido).
            </>
          ),
        },
        {
          topic: 'Texto grande',
          content: 'O conteúdo quebra linha; o valor não quebra.',
        },
        {
          topic: 'Verificação automática',
          content: (
            <>
              axe (painel Accessibility) em 08/10: {c('States')} 42 e{' '}
              {c('Sizes × amount types')} 22 violações — role=&quot;Tag&quot; inválido no
              componente Tag; contraste de tokens (etiqueta positiva 2,9:1 e de
              aviso 2,2:1; valor verde 3,0:1, 2,8:1 no hover; riscado e rodapé
              em Interface/Dark/Up 2,2:1); e o desabilitado por opacidade 0,6 da
              Expandable no web (comportamento anterior, mantido para as telas
              no ar), que baixa o contraste de todos os textos. Ver o painel
              Accessibility de cada story.
            </>
          ),
        },
      ]}
    />
  </DocSection>
);

const Code = ({ stories }: { stories: Record<string, StoryRef> }) => (
  <>
    <DocSection title="Importação">
      <Source
        language="tsx"
        dark
        code={`import {\n  TransactionListExpandable,\n  TransactionListChildAction,\n  TransactionListChildReadOnly,\n} from '@useblu/ocean-react';`}
      />
    </DocSection>
    <DocSection
      title="Playground"
      intro="Todas as propriedades nos controles; abre e fecha no toque."
    >
      <PreviewCanvas compact>
        <Story of={stories.Usage} />
      </PreviewCanvas>
      <Controls of={stories.Usage} />
    </DocSection>
    <DocSection title="Uso (pronto para copiar)">
      <Source language="tsx" dark code={exampleCode} />
    </DocSection>
  </>
);

const TransactionListExpandableDocs = ({
  stories,
}: {
  stories: Record<string, StoryRef>;
}): React.ReactElement => (
  <DocPage
    title="Transaction List Expandable"
    subtitle={
      <>
        Família Transaction List · substitui o {c('subItens')} do{' '}
        {c('TransactionListItem')}
      </>
    }
    links={headerLinks('TransactionListExpandable', KB_FILE, NODE)}
    footer={footerLinks(KB_FILE)}
    tabs={[
      { id: 'overview', label: 'Visão geral', content: <Overview /> },
      {
        id: 'specs',
        label: 'Especificações',
        content: <Specs stories={stories} />,
      },
      { id: 'guidelines', label: 'Diretrizes', content: <Guidelines /> },
      { id: 'a11y', label: 'Acessibilidade', content: <Accessibility /> },
      { id: 'code', label: 'Código', content: <Code stories={stories} /> },
    ]}
  />
);

export default TransactionListExpandableDocs;
