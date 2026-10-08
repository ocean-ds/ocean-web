/* Página de documentação em abas (formato aprovado no MR-615).
 * Texto: base de conhecimento (usage-guidelines/transactionlistaction.md); exemplos vivos. */
import React from 'react';
import { Controls, Source, Story } from '@storybook/blocks';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListAction from '../TransactionListAction';
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

const KB_FILE = 'transactionlistaction.md';
const NODE = '24289-64384';
const icon = <PlaceholderOutline size={24} />;

const example = {
  title: 'PagBlu',
  description: 'Padaria São José',
  caption: 'Cobrança 10482',
  amount: 'R$ 15,00',
  amountTag: { label: 'Pago' },
  additionalData: '6x de R$ 2,50',
  icon,
};

const exampleCode = `<TransactionListAction
  icon={<PlaceholderOutline size={24} />}
  title="PagBlu"
  description="Padaria São José"
  caption="Cobrança 10482"
  amount="R$ 15,00"
  amountTag={{ label: 'Pago' }}
  additionalData="6x de R$ 2,50"
  onClick={() => navigate('/cobrancas/10482')}
/>`;

export const AI_RULES: AiRules = {
  useWhen: [
    'O valor é a peça mais importante da linha e a linha leva ao detalhe da transação (actionType="chevron").',
    'Duas ou mais ações sobre o item (actionType="menu"; no web mobile, "swipe").',
  ],
  dontUse: [
    'Linha sem destino nem ação → TransactionListReadOnly.',
    'Linha escolhida pelo valor → TransactionListSelectable.',
    'Detalhe que abre na própria lista → TransactionListExpandable.',
    'Linha dentro da expansão que leva a um detalhe → TransactionListChildAction.',
    'Linha sem valor monetário que navega → ListAction.',
  ],
  required: [
    'title e amount; amount formatado e sem sinal.',
    'onClick na linha (chevron); menuActions com menu/swipe.',
    'disabled para desabilitar; showDivider={false} no último item do grupo.',
  ],
  forbidden: [
    ...FAMILY_FORBIDDEN,
    'Action sem destino (só para parecer clicável).',
    'menu com uma ação só (use chevron e leve a ação ao detalhe).',
    'menu/swipe sem menuActions.',
  ],
  defaults: [
    'actionType="chevron" · menuActions=[] · menuPosition="bottom-right"',
    'inverted=true · contentSize="md" · amountSize="md" · status="default" · amountType="default"',
    'iconColor="default" · density="default" · showDivider=true',
  ],
  childOf: [
    'List (ou outro container de lista). Dentro de TransactionListExpandable use TransactionListChildAction.',
  ],
  source: [kbPath(KB_FILE)],
};

const Overview = () => (
  <>
    <DocSection title="Transaction List Action">
      <p className="odoc__lead">
        Linha de transação com ação à direita: um toque leva ao detalhe (seta)
        ou abre as ações do item (menu, deslizar).
      </p>
      <PreviewCanvas code={exampleCode}>
        <TransactionListAction {...example} showDivider={false} />
      </PreviewCanvas>
      <ul className="odoc__list">
        <li>
          <strong>Três ações:</strong> {c('chevron')} (detalhe, padrão),{' '}
          {c('menu')} (três pontos) e {c('swipe')} (deslizar, web mobile).
        </li>
        <li>
          <strong>Mesmos blocos da família:</strong> conteúdo e valor, com{' '}
          {c('contentSize')} e {c('amountSize')} independentes.
        </li>
        <li>
          <strong>Estados:</strong> padrão, hover, ativo (menu/swipe aberto),
          carregando e desabilitado.
        </li>
        <li>
          <strong>Densidade:</strong> {c('default')} ou {c('compact')}.
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
                {c('chevron')}, {c('menu')} e {c('swipe')}; o menu abre ancorado
                nos três pontos ({c('menuActions')}, {c('menuPosition')}).
              </>
            ),
          },
          {
            platform: 'iOS',
            status: 'em revisão',
            link: PRS.ios,
            notes: (
              <>
                {c('.chevron')} e {c('.menu')}, sem deslizar; as opções do menu
                abrem no bottom sheet do Ocean ({c('isMenuActive')} enquanto
                aberto).
              </>
            ),
          },
          {
            platform: 'Android',
            status: 'em revisão',
            link: PRS.android,
            notes: (
              <>
                {c('Chevron')} e {c('Menu')}, sem deslizar; as opções abrem no
                bottom sheet do Ocean ({c('onMenuClick')}, {c('menuActive')}).
              </>
            ),
          },
          {
            platform: 'Figma',
            status: 'pronto',
            link: { label: `node ${NODE}`, href: figmaNode(NODE) },
            notes:
              'Type = Chevron · Menu · Swipe × State = Default · Hover · Active · Disabled · Loading.',
          },
        ]}
      />
    </DocSection>

    <DocSection
      title="O que mudou / migração"
      intro={
        <>
          Substitui o {c('TransactionListItem')} com {c('withChevron')}; as
          telas migram no MR-903.
        </>
      }
    >
      <MigrationTable
        rows={[
          {
            from: (
              <>
                {c('withChevron')} + {c('onClick')}
              </>
            ),
            to: (
              <>
                {c('TransactionListAction')} ({c('actionType="chevron"')},
                padrão) + {c('onClick')}
              </>
            ),
            notes: 'Linha que leva ao detalhe',
          },
          {
            from: c('chevronFlipped'),
            to: 'não existe na família',
            notes: 'Drawer ao lado: a seta não vira',
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
        example={<TransactionListAction {...example} />}
        parts={[
          {
            selector: '.ods-transaction-list__icon',
            side: 'left',
            label: 'Ícone',
            prop: c('icon'),
          },
          {
            selector: '.ods-content-list',
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
            selector: '.ods-amount-details__amount',
            side: 'right',
            label: 'Bloco de valor',
            prop: c('amount'),
          },
          {
            selector: '.ods-amount-details__indicator',
            side: 'right',
            label: 'Etiqueta',
            prop: c('amountTag'),
          },
          {
            selector: '.ods-amount-details__caption',
            side: 'right',
            label: 'Informação extra',
            prop: c('additionalData'),
          },
          {
            selector: '.ods-transaction-list__chevron',
            side: 'top',
            label: 'Ação (seta 20 / três pontos / alça)',
            prop: c('actionType'),
          },
          {
            selector: '.ods-transaction-list__divider',
            side: 'bottom',
            label: 'Divisor (recuo 16, multiply)',
            prop: c('showDivider'),
          },
        ]}
      />
    </DocSection>

    <DocSection title="Configurações">
      <ConfigTable
        rows={[
          {
            category: 'Aparência',
            option: c('actionType'),
            values: (
              <>
                {c('chevron')} · {c('menu')} · {c('swipe')}
              </>
            ),
            defaultValue: c('chevron'),
          },
          {
            category: 'Aparência',
            option: c('menuPosition'),
            values: (
              <>
                {c('bottom-right')} · {c('bottom-left')} · {c('top-right')} ·{' '}
                {c('top-left')}
              </>
            ),
            defaultValue: c('bottom-right'),
          },
          {
            category: 'Aparência',
            option: c('iconColor'),
            values: (
              <>
                {c('default')} · {c('on-color')} · {c('highlight')}
              </>
            ),
            defaultValue: c('default'),
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
            option: c('showDivider'),
            values: (
              <>
                {c('true')} · {c('false')}
              </>
            ),
            defaultValue: c('true'),
          },
          ...blockConfigRows("'md'"),
        ]}
      />
    </DocSection>

    <DocSection title="Cor por estado">
      <TokenTable
        states={[
          'Padrão',
          'Hover',
          'Pressionado / Ativo',
          'Carregando',
          'Desabilitado',
        ]}
        rows={[
          {
            part: 'Fundo da linha (multiply)',
            tokens: [
              '—',
              'Interface/Light/Up',
              'Interface/Light/Deep',
              '—',
              '—',
            ],
          },
          {
            part: 'Ícone (default)',
            tokens: [
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              'Interface/Light/Up',
              'Interface/Light/Deep',
            ],
          },
          {
            part: 'Seta / gatilho do menu',
            tokens: [
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              'Brand/Primary/Pure',
              '—',
              'Interface/Light/Deep',
            ],
          },
          ...blockTokenRows(5, 4, 3),
          {
            part: 'Divisor',
            tokens: Array(5).fill('Interface/Light/Down'),
          },
        ]}
      />
      <p className="odoc__lead" style={{ marginTop: 8 }}>
        Ativo no menu: o gatilho ganha fundo Interface/Light/Up e ícone
        Brand/Primary/Pure. No swipe, a linha desliza e mostra as ações.
      </p>
    </DocSection>

    <DocSection
      title="Estados lado a lado"
      intro="Tipo de ação × padrão, hover, desabilitado e carregando."
    >
      <PreviewCanvas
        width="auto"
        code={`<TransactionListAction {...props} actionType="chevron" />
<TransactionListAction {...props} actionType="menu" menuActions={actions} />
<TransactionListAction {...props} actionType="swipe" menuActions={actions} />
// + disabled / loading`}
      >
        <Story of={stories.States} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Menu e swipe abertos (interativo)">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListAction actionType="menu" menuActions={[
  { label: 'Reenviar cobrança', onClick: resend },
  { label: 'Cancelar cobrança', onClick: cancel, variant: 'negative' },
]} … />`}
      >
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <Story of={stories.MenuActive} />
          <Story of={stories.SwipeActive} />
        </div>
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Tamanhos × tipos de valor">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListAction {...props} contentSize="sm" amountSize="sm" amountType="positive" />`}
      >
        <Story of={stories.Sizes} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Medidas">
      <DocTable
        head={['Medida', 'Valor', 'Token']}
        rows={[
          ...rowMeasures('12', 'Spacing/XxsExtra'),
          ['Padding vertical (compact)', '8', c('Spacing/Xxs')],
          ['Padding à direita (menu)', '8', c('Spacing/Xxs')],
          ['Seta', '20', '—'],
          ['Gatilho do menu', '32', '—'],
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
          O valor é a peça mais importante da linha <strong>e</strong> a linha
          leva ao detalhe da transação (extrato, vendas, cobranças) —{' '}
          {c('actionType="chevron"')}.
        </li>
        <li>
          Ações por item sobre uma transação (reenviar, cancelar) — {c('menu')};
          no app, as opções abrem no bottom sheet do Ocean; no web mobile também{' '}
          {c('swipe')}.
        </li>
      </ul>
    </DocSection>

    <DocSection title="Quando não usar">
      <DocTable
        head={['Situação', 'Use']}
        rows={[
          ['A linha não tem destino nem ação', 'Transaction List Read Only'],
          [
            'A linha é escolhida pelo valor (marcar)',
            'Transaction List Selectable',
          ],
          ['O detalhe abre na própria lista', 'Transaction List Expandable'],
          ['Linha dentro da expansão que leva a um detalhe', 'Child Action'],
          ['Linha sem valor monetário que navega', c('ListAction')],
          [
            'Item de identidade (convite, membro) com menu',
            'Padrão identity-list-item',
          ],
        ]}
      />
    </DocSection>

    <DocSection title="Faça e não faça">
      <DoDontGrid>
        <DoDont
          kind="do"
          caption="Linha que leva ao detalhe: seta à direita e um onClick por toque."
          code={exampleCode}
        >
          <TransactionListAction {...example} showDivider={false} />
        </DoDont>
        <DoDont
          kind="dont"
          caption="Não use menu com uma ação só: use a seta e leve a ação ao detalhe."
          code={`// Não faça\n<TransactionListAction actionType="menu" menuActions={[{ label: 'Ver detalhe', onClick }]} … />\n// Faça\n<TransactionListAction onClick={openDetail} … />`}
        >
          <TransactionListAction
            {...example}
            actionType="menu"
            menuActions={[{ label: 'Ver detalhe', onClick: () => undefined }]}
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="dont"
          caption="Não use Action sem destino só para parecer clicável: use a Read Only."
          code="// Sem destino: use TransactionListReadOnly"
        >
          <TransactionListAction {...example} showDivider={false} />
        </DoDont>
        <DoDont
          kind="caution"
          caption="Item indisponível que precisa explicar o motivo não fica desabilitado: a linha ativa abre a explicação."
          code="<TransactionListAction … disabled />"
        >
          <TransactionListAction {...example} disabled showDivider={false} />
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
              Um botão com os textos na ordem: &quot;PagBlu, Padaria São José,
              Cobrança 10482, R$ 15,00, Pago, 6x de R$ 2,50, botão&quot;. O
              gatilho do menu/swipe é outro botão: &quot;Abrir menu de
              ações&quot;. Desabilitado e carregando: botão desabilitado (
              {c('aria-busy')} carregando).
            </>
          ),
        },
        {
          topic: 'Teclado',
          content: (
            <>
              Tab foca a linha (foco visível); Enter/Espaço chamam o{' '}
              {c('onClick')}. O gatilho do menu é um foco à parte; Enter/Espaço
              abrem o menu e Esc fecha.
            </>
          ),
        },
        {
          topic: 'Contraste',
          content: (
            <>
              Ícone {c('default')} no branco 2,2:1 · {c('on-color')} sobre fundo
              colorido 4,9–5,1:1 · {c('highlight')} 4,1:1. Seta e gatilho em
              Interface/Dark/Up (2,2:1). {c('on-color')} só sobre fundo
              colorido.
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
              axe (painel Accessibility) em 08/10: {c('Types × states')} 13 e{' '}
              {c('Sizes × amount types')} 28 violações — todas de fora da linha:
              role=&quot;Tag&quot; inválido no componente Tag e contraste de
              tokens (etiqueta positiva 2,9:1; valor verde 3,0:1; riscado
              2,2:1). O nome do botão carregando foi corrigido na família.
              Menu/swipe aberto (sem snapshot): 7, todas do InternalListActions
              compartilhado (estrutura de lista do menu e texto branco sobre
              Interface/Dark/Up 2,2:1 e Status/Negative/Pure 3,5:1). Ver o
              painel Accessibility de cada story.
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
        code={`import { TransactionListAction } from '@useblu/ocean-react';\nimport type { TransactionListActionProps, ActionItem } from '@useblu/ocean-react';`}
      />
    </DocSection>
    <DocSection title="Playground" intro="Todas as propriedades nos controles.">
      <PreviewCanvas compact>
        <Story of={stories.Default} />
      </PreviewCanvas>
      <Controls of={stories.Default} />
    </DocSection>
    <DocSection title="Uso (pronto para copiar)">
      <Source
        language="tsx"
        dark
        code={`import { List, TransactionListAction } from '@useblu/ocean-react';

<List>
  {/* Leva ao detalhe */}
  <TransactionListAction
    title="PagBlu"
    description="Padaria São José"
    caption="Cobrança 10482"
    amount="R$ 15,00"
    onClick={() => navigate('/cobrancas/10482')}
  />
  {/* Ações sobre o item */}
  <TransactionListAction
    title="PagBlu"
    description="Mercado Central"
    amount="R$ 42,00"
    actionType="menu"
    menuActions={[
      { label: 'Reenviar cobrança', onClick: resend },
      { label: 'Cancelar cobrança', onClick: cancel, variant: 'negative' },
    ]}
    showDivider={false}
  />
</List>`}
      />
    </DocSection>
  </>
);

const TransactionListActionDocs = ({
  stories,
}: {
  stories: Record<string, StoryRef>;
}): React.ReactElement => (
  <DocPage
    title="Transaction List Action"
    subtitle={
      <>
        Família Transaction List · substitui o {c('TransactionListItem')} com
        seta
      </>
    }
    links={headerLinks('TransactionListAction', KB_FILE, NODE)}
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

export default TransactionListActionDocs;
