/* Página de documentação em abas (formato aprovado no MR-615): Child Action + Child Read Only
 * numa página só (padrão de documentação §1). Texto: base de conhecimento
 * (usage-guidelines/transactionlistexpandable.md › Itens filhos); exemplos vivos. */
import React from 'react';
import { Controls, Source, Story } from '@storybook/blocks';
import { Placeholder } from '@useblu/ocean-icons-react';
import TransactionListChildAction from '../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
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
  PRS,
} from '../../../../../.storybook/docs-blocks/transaction-list/shared';

type StoryRef = Record<string, unknown>;

const KB_FILE = 'transactionlistexpandable.md';
const NODE_ACTION = '24323-3663';
const NODE_READONLY = '26758-376';
const icon = <Placeholder size={16} />;

const child = {
  title: 'Agenda antecipada',
  description: 'Antecipação',
  caption: '12 de novembro',
  amount: 'R$ 150,00',
  amountType: 'negative' as const,
  amountTag: { label: 'Pago' },
  additionalData: 'Taxa 1,99%',
  icon,
};

const exampleCode = `{partes.map((parte, index) => (
  <TransactionListChildAction
    key={parte.id}
    icon={<Placeholder size={16} />}
    title={parte.titulo}
    description={parte.descricao}
    amount={parte.valor}
    position={
      partes.length === 1
        ? 'standalone'
        : index === 0
        ? 'first'
        : index === partes.length - 1
        ? 'last'
        : 'middle'
    }
    onClick={() => abrirDetalhe(parte.id)}
  />
))}`;

export const AI_RULES: AiRules = {
  useWhen: [
    'Parte que compõe o valor de uma transação aberta numa TransactionListExpandable.',
    'Com destino próprio → TransactionListChildAction; sem destino → TransactionListChildReadOnly.',
  ],
  dontUse: [
    'Fora de uma TransactionListExpandable → TransactionListAction / TransactionListReadOnly.',
    'Segundo nível de expansão → leve ao detalhe (Child Action).',
  ],
  required: [
    'title e amount; amount formatado e sem sinal.',
    'position derivada do índice (standalone, first, middle, last).',
    'onClick no Child Action.',
  ],
  forbidden: [
    ...FAMILY_FORBIDDEN,
    'Divider entre os filhos (a linha do tempo liga).',
    'Filho com R$ 0,00 (renderize só a parte que existe).',
    'ListAction / ListReadOnly como filho em código novo.',
  ],
  defaults: [
    'position="standalone" · contentSize="sm" · amountSize="sm" · density="default"',
    'iconColor sem padrão = Interface/Light/Down · inverted=true · status="default" · amountType="default"',
    'sem divisor (o filho não tem showDivider)',
  ],
  childOf: ['TransactionListExpandable (slot children).'],
  source: [`${kbPath(KB_FILE)} › Itens filhos`],
};

const Overview = () => (
  <>
    <DocSection title="Transaction List Child">
      <p className="odoc__lead">
        Parte que compõe o valor de uma transação aberta, ligada às outras
        partes por uma linha do tempo — com seta quando a parte tem detalhe
        próprio (Child Action), sem seta quando não tem (Child Read Only).
      </p>
      <PreviewCanvas code={exampleCode}>
        <TransactionListChildAction {...child} position="first" />
        <TransactionListChildReadOnly
          {...child}
          title="Agenda em trava bancária"
          description="Banco Exemplo"
          position="last"
        />
      </PreviewCanvas>
      <ul className="odoc__list">
        <li>
          <strong>Dois componentes:</strong> {c('TransactionListChildAction')}{' '}
          (seta, {c('onClick')}) e {c('TransactionListChildReadOnly')} (sem
          toque).
        </li>
        <li>
          <strong>Linha do tempo:</strong> {c('position')} {c('standalone')},{' '}
          {c('first')}, {c('middle')} ou {c('last')}.
        </li>
        <li>
          <strong>Escala compacta por padrão:</strong> {c('contentSize')} e{' '}
          {c('amountSize')} em {c('sm')}; ícone de 16 em Interface/Light/Down
          quando {c('iconColor')} não é passado.
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
                Tamanhos {c('sm')}/{c('sm')} nas props; ícone
                Interface/Light/Down sem {c('iconColor')}; {c('onClick(event)')}
                .
              </>
            ),
          },
          {
            platform: 'iOS',
            status: 'em revisão',
            link: PRS.ios,
            notes: (
              <>
                {c('size: .sm')} no init; ícone fixo Interface/Light/Down;{' '}
                {c('onTouch()')}; posição por{' '}
                {c('TransactionListChildPosition.position(at:count:)')}.
              </>
            ),
          },
          {
            platform: 'Android',
            status: 'em revisão',
            link: PRS.android,
            notes: (
              <>
                Sem padrão próprio de tamanho: passe {c('size = Sm')} no
                conteúdo e no valor; {c('onClick()')} obrigatório.
              </>
            ),
          },
          {
            platform: 'Figma',
            status: 'pronto',
            link: {
              label: `nodes ${NODE_ACTION} / ${NODE_READONLY}`,
              href: figmaNode(NODE_ACTION),
            },
            notes: 'State × Position (Standalone · First · Middle · Last).',
          },
        ]}
      />
    </DocSection>

    <DocSection title="O que mudou / migração">
      <MigrationTable
        rows={[
          {
            from: <>{c('ListAction type="text"')} como filho</>,
            to: c('TransactionListChildAction'),
            notes: 'position no lugar das linhas do ícone',
          },
          {
            from: <>{c('ListReadOnly')} como filho</>,
            to: c('TransactionListChildReadOnly'),
            notes: '—',
          },
          {
            from: (
              <>
                {c('subItens')} do {c('TransactionListItem')}
              </>
            ),
            to: 'filhos da TransactionListExpandable',
            notes: 'Sem divisor entre filhos',
          },
        ]}
      />
    </DocSection>
  </>
);

const Specs = ({ stories }: { stories: Record<string, StoryRef> }) => (
  <>
    <DocSection title="Anatomia">
      <AnatomyLegend
        example={<TransactionListChildAction {...child} position="middle" />}
        parts={[
          {
            selector: '.ods-transaction-list__timeline-line',
            side: 'left',
            anchor: 0.3,
            label: 'Linha do tempo (traços em Interface/Light/Down)',
            prop: c('position'),
          },
          {
            selector: '.ods-transaction-list__timeline-icon',
            side: 'left',
            label: 'Ícone 16',
            prop: c('icon'),
          },
          {
            selector: '.ods-content-list',
            side: 'top',
            anchor: 0.3,
            label: 'Bloco de conteúdo (sm)',
            prop: (
              <>
                {c('title')}, {c('description')}, {c('caption')}
              </>
            ),
          },
          {
            selector: '.ods-amount-details__amount',
            side: 'right',
            label: 'Bloco de valor (sm)',
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
            label: 'Seta (só Child Action)',
            prop: c('onClick'),
          },
        ]}
      />
    </DocSection>

    <DocSection title="Configurações">
      <ConfigTable
        rows={[
          {
            category: 'Aparência',
            option: c('position'),
            values: (
              <>
                {c('standalone')} · {c('first')} · {c('middle')} · {c('last')}
              </>
            ),
            defaultValue: c('standalone'),
          },
          {
            category: 'Aparência',
            option: c('iconColor'),
            values: (
              <>
                {c('default')} · {c('on-color')} · {c('highlight')}
              </>
            ),
            defaultValue: '— (Interface/Light/Down)',
          },
          {
            category: 'Aparência',
            option: c('density'),
            values: (
              <>
                {c('default')} (12) · {c('compact')} (8)
              </>
            ),
            defaultValue: c('default'),
          },
          ...blockConfigRows("'sm'"),
        ]}
      />
    </DocSection>

    <DocSection title="Cor por estado">
      <TokenTable
        states={['Padrão', 'Hover (Action)', 'Carregando', 'Desabilitado']}
        rows={[
          {
            part: 'Fundo da linha (multiply)',
            tokens: ['—', 'Interface/Light/Up', '—', '—'],
          },
          {
            part: 'Linha do tempo',
            tokens: Array(4).fill('Interface/Light/Down'),
          },
          {
            part: 'Ícone (sem iconColor)',
            tokens: [
              'Interface/Light/Down',
              'Interface/Light/Down',
              'Interface/Light/Down',
              'Interface/Light/Deep',
            ],
          },
          {
            part: 'Seta (Action)',
            tokens: [
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              '—',
              'Interface/Light/Deep',
            ],
          },
          ...blockTokenRows(4, 3, 2),
        ]}
      />
    </DocSection>

    <DocSection
      title="Linha do tempo"
      intro="As quatro posições, nos dois filhos."
    >
      <PreviewCanvas width="auto" code={exampleCode}>
        <Story of={stories.Timeline} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Estados lado a lado">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListChildAction … />\n<TransactionListChildAction … disabled />\n<TransactionListChildAction … loading />\n<TransactionListChildAction … density="compact" />`}
      >
        <Story of={stories.States} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Cor do ícone">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListChildAction iconColor="highlight" … />`}
      >
        <Story of={stories.IconColors} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Medidas">
      <DocTable
        head={['Medida', 'Valor', 'Token']}
        rows={[
          ['Largura de referência (frame)', '360', '—'],
          ['Padding horizontal', '16', c('Spacing/Xs')],
          [
            'Padding vertical do conteúdo (default)',
            '12',
            c('Spacing/XxsExtra'),
          ],
          ['Padding vertical do conteúdo (compact)', '8', c('Spacing/Xxs')],
          ['Espaço entre os elementos da linha', '12', c('Spacing/XxsExtra')],
          ['Coluna da linha do tempo', '24', c('Spacing/Sm')],
          ['Ícone (com padding 4)', '16', c('Spacing/Xxxs')],
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
          A parte tem destino (detalhe da UR gerada, da antecipação, da trava) →{' '}
          <strong>Child Action</strong>.
        </li>
        <li>
          A parte não tem destino → <strong>Child Read Only</strong>.
        </li>
      </ul>
    </DocSection>

    <DocSection title="Quando não usar">
      <DocTable
        head={['Situação', 'Use']}
        rows={[
          [
            'Fora de uma Transaction List Expandable',
            'Transaction List Action / Read Only',
          ],
          ['Segundo nível de expansão', 'Leve ao detalhe (Child Action)'],
        ]}
      />
    </DocSection>

    <DocSection title="Faça e não faça">
      <DoDontGrid>
        <DoDont
          kind="do"
          caption="Posição derivada do índice: a linha do tempo fica contínua entre as partes."
          code={exampleCode}
        >
          <TransactionListChildAction {...child} position="first" />
          <TransactionListChildAction
            {...child}
            title="Agenda gerada"
            amountType="default"
            position="last"
          />
        </DoDont>
        <DoDont
          kind="dont"
          caption="Não coloque divisor entre os filhos: a linha do tempo já liga as partes."
          code={`// Não faça\n<TransactionListChildAction … />\n<Divider />\n<TransactionListChildAction … />`}
        >
          <TransactionListChildAction {...child} position="standalone" />
          <hr
            style={{ margin: 0, border: 0, borderTop: '1px solid #E0E2EE' }}
          />
          <TransactionListChildAction {...child} position="standalone" />
        </DoDont>
        <DoDont
          kind="dont"
          caption="Não mostre parte com R$ 0,00: renderize só a parte que existe."
          code={`// Não faça\n<TransactionListChildReadOnly amount="R$ 0,00" … />`}
        >
          <TransactionListChildReadOnly
            {...child}
            amount="R$ 0,00"
            amountType="default"
            position="standalone"
          />
        </DoDont>
        <DoDont
          kind="caution"
          caption="Sem iconColor o ícone do filho é Interface/Light/Down; passe default/on-color/highlight só quando precisar de outra ênfase."
          code={`<TransactionListChildAction iconColor="highlight" … />`}
        >
          <TransactionListChildAction
            {...child}
            iconColor="highlight"
            position="standalone"
          />
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
              Child Action: um botão com os textos na ordem (&quot;Agenda
              antecipada, Antecipação, 12 de novembro, - R$ 150,00, Pago, Taxa
              1,99%, botão&quot;). Child Read Only: os mesmos textos, sem papel
              interativo. A linha do tempo e o ícone não são lidos.
            </>
          ),
        },
        {
          topic: 'Teclado',
          content: (
            <>
              Child Action: Tab foca (foco visível), Enter/Espaço chamam o{' '}
              {c('onClick')}. Child Read Only: não recebe foco.
            </>
          ),
        },
        {
          topic: 'Contraste',
          content: (
            <>
              Ícone sem {c('iconColor')} em Interface/Light/Down (1,3:1 no
              branco) — decorativo; {c('highlight')} 4,1:1. Seta em
              Interface/Dark/Up (2,2:1).
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
              axe (painel Accessibility) em 08/10: {c('Timeline')} 16,{' '}
              {c('States')} 15 e {c('Icon colors')} 18 violações — todas de fora
              da linha: role=&quot;Tag&quot; inválido no componente Tag e contraste da
              etiqueta positiva (2,9:1). O nome do botão carregando foi
              corrigido na família. Ver o painel Accessibility de cada story.
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
        code={`import {\n  TransactionListChildAction,\n  TransactionListChildReadOnly,\n} from '@useblu/ocean-react';\nimport type { TransactionListChildPosition } from '@useblu/ocean-react';`}
      />
    </DocSection>
    <DocSection
      title="Playground"
      intro="Child Action com todas as propriedades nos controles."
    >
      <PreviewCanvas compact>
        <Story of={stories.Default} />
      </PreviewCanvas>
      <Controls of={stories.Default} />
    </DocSection>
    <DocSection title="Uso (pronto para copiar)">
      <Source language="tsx" dark code={exampleCode} />
    </DocSection>
  </>
);

const TransactionListChildDocs = ({
  stories,
}: {
  stories: Record<string, StoryRef>;
}): React.ReactElement => (
  <DocPage
    title="Transaction List Child"
    subtitle={
      <>
        Child Action e Child Read Only · itens filhos da{' '}
        {c('TransactionListExpandable')}
      </>
    }
    links={headerLinks('TransactionListChildAction', KB_FILE, NODE_ACTION)}
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

export default TransactionListChildDocs;
