/* Página de documentação em abas — protótipo MR-615 T16.
 * Texto: base de conhecimento (ux-knowledge-layer/components/usage-guidelines/
 * transactionlistreadonly.md + padrao-de-documentacao.md); exemplos vivos. */
import React from 'react';
import { Controls, Source, Story, Unstyled } from '@storybook/blocks';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import { colorStatusWarningUp } from '@useblu/ocean-tokens/web/tokens';
import TransactionListReadOnly from '../TransactionListReadOnly';
import Typography from '../../Typography';
import {
  AiRules,
  AiRulesBlock,
  AnatomyLegend,
  AvailabilityTable,
  ConfigTable,
  DocSection,
  DocTable,
  DocTabs,
  DoDont,
  DoDontGrid,
  DocFooter,
  DocHeaderLinks,
  FixedRowsTable,
  MigrationTable,
  PreviewCanvas,
  TokenTable,
} from '../../../../../.storybook/docs-blocks';

type StoryRef = Record<string, unknown>;

const icon = <PlaceholderOutline size={24} />;
const FIGMA =
  'https://www.figma.com/design/PgLv9k22CHHZZ867HwN65y/%F0%9F%8C%8A-Ocean-DS-Core?node-id=26559-4449';

const example = {
  title: 'Pix recebido',
  description: 'Padaria São José',
  caption: '12 de novembro às 14:32',
  amount: 'R$ 150,00',
  amountTag: { label: 'Pago' },
  additionalData: 'Saldo disponível',
  icon,
};

const c = (text: string) => <code>{text}</code>;

const GH_WEB =
  'https://github.com/ocean-ds/ocean-web/tree/feature/MR-615-familia-transaction-list-web/packages/ocean-react/src/TransactionListReadOnly';
export const KB_GUIDE_PATH =
  'knowledge-bases/ux-knowledge-layer/components/usage-guidelines/transactionlistreadonly.md';
const KB_GUIDE = `https://github.com/Pagnet/knowledge-bases/blob/feat/MR-615-transaction-list-kb/${KB_GUIDE_PATH}`;
const JIRA = 'https://useblu.atlassian.net/browse/MR-615';

const exampleCode = `<TransactionListReadOnly
  icon={<PlaceholderOutline size={24} />}
  title="Pix recebido"
  description="Padaria São José"
  caption="12 de novembro às 14:32"
  amount="R$ 150,00"
  amountTag={{ label: 'Pago' }}
  additionalData="Saldo disponível"
/>`;

/** Regras para IA — mesmo texto na aba Diretrizes e no resumo da Meta (manifesto). */
export const AI_RULES: AiRules = {
  useWhen: [
    'O valor monetário é a peça mais importante da linha (extrato, movimentação, saldo por loja/conta).',
    'A linha não navega, não expande e não é selecionada.',
  ],
  dontUse: [
    'Linha que leva ao detalhe ou abre menu/ações → TransactionListAction.',
    'Linha escolhida pelo valor → TransactionListSelectable.',
    'Linha que abre detalhes na própria lista → TransactionListExpandable.',
    'Linha dentro da expansão de uma transação → TransactionListChildReadOnly / TransactionListChildAction.',
    'Linha sem valor monetário → ListReadOnly.',
  ],
  required: [
    'title e amount.',
    'amount já formatado e sem sinal ("R$ 1.234,56"); o "- " de negative é do componente.',
    'Entrada: amountType="positive" (sem "+"). Saída: amountType="negative".',
    'disabled para desabilitar (aplica o tipo inactive nos dois blocos e a etiqueta neutral).',
    'showDivider={false} no último item do grupo.',
  ],
  forbidden: [
    'Sinal no amount ("-R$ 24,50", "+R$ 150,00").',
    'amountType="strikethrough" para item cancelado (use default + amountTag Cancelado neutral).',
    'status ou amountType "inactive" à mão para desabilitar.',
    'Dois dados num texto ("Crédito • Final 1234").',
    'iconColor="on-color" sobre fundo branco.',
    'amountTag e amountIndicator juntos.',
    'Montar a linha com <div> + flex.',
  ],
  defaults: [
    'inverted=true · contentSize="md" · amountSize="md" · status="default" · amountType="default"',
    'iconColor="default" · density="default" · showDivider=true · showAmountIndicator=true',
    'amountTag.type="positive" · amountTag.setIconOff=true',
  ],
  childOf: [
    'List (ou outro container de lista). Dentro de TransactionListExpandable use os itens filhos.',
  ],
  source: [KB_GUIDE_PATH],
};

const Overview = () => (
  <>
    <DocSection title="Transaction List Read Only">
      <p className="odoc__lead">
        Linha de transação só de leitura: mostra o que é a transação e o valor,
        sem toque.
      </p>
      <PreviewCanvas code={exampleCode}>
        <TransactionListReadOnly {...example} showDivider={false} />
      </PreviewCanvas>
      <ul className="odoc__list">
        <li>
          <strong>Dois blocos:</strong> conteúdo (título, descrição, legenda) à
          esquerda e valor (com etiqueta e informação extra) à direita.
        </li>
        <li>
          <strong>Tamanhos independentes:</strong> {c('contentSize')} e{' '}
          {c('amountSize')} em {c('md')} (padrão) ou {c('sm')}.
        </li>
        <li>
          <strong>Tipos de valor:</strong> padrão, entrada ({c('positive')}),
          saída ({c('negative')}) e valor que mudou ({c('strikethrough')} verde
          ou {c('strikethrough-neutral')}).
        </li>
        <li>
          <strong>Estados:</strong> padrão, carregando e desabilitado. Sem hover
          nem toque — para linha que leva ao detalhe, use a Transaction List
          Action.
        </li>
        <li>
          <strong>Cor do ícone:</strong> {c('default')}, {c('on-color')} ou{' '}
          {c('highlight')}; desabilitado sempre apaga o ícone.
        </li>
      </ul>
    </DocSection>

    <DocSection title="Disponibilidade por plataforma">
      <AvailabilityTable
        rows={[
          {
            platform: 'Portal (web)',
            status: 'em revisão',
            link: {
              label: 'ocean-web #1275',
              href: 'https://github.com/ocean-ds/ocean-web/pull/1275',
            },
            notes: (
              <>
                {c('TransactionListReadOnly')} em {c('@useblu/ocean-react')}{' '}
                (versão depois de 1.145.0). Estado por booleanos {c('loading')}{' '}
                / {c('disabled')}.
              </>
            ),
          },
          {
            platform: 'iOS',
            status: 'em revisão',
            link: {
              label: 'ocean-ios #713',
              href: 'https://github.com/ocean-ds/ocean-ios/pull/713',
            },
            notes: (
              <>
                {c('OceanSwiftUI.TransactionListReadOnly')}; estado em{' '}
                {c('state')}; layout sempre invertido.
              </>
            ),
          },
          {
            platform: 'Android',
            status: 'em revisão',
            link: {
              label: 'ocean-android #1113',
              href: 'https://github.com/ocean-ds/ocean-android/pull/1113',
            },
            notes: (
              <>
                {c('OceanTransactionListReadOnly')} (Compose); valor opcional;
                no riscado do conteúdo, {c('description')} é o texto riscado.
              </>
            ),
          },
          {
            platform: 'Figma',
            status: 'pronto',
            link: { label: 'node 26559-4449', href: FIGMA },
            notes: 'State = Default · Loading · Disabled; frame 360.',
          },
        ]}
      />
      <p className="odoc__lead" style={{ marginTop: 8 }}>
        Valor riscado verde ({c('strikethrough')}) e neutro (
        {c('strikethrough-neutral')}) existem nas três plataformas.
      </p>
    </DocSection>

    <DocSection
      title="O que mudou / migração"
      intro={
        <>
          A família Transaction List substitui o {c('TransactionListItem')},
          marcado como substituído no código sem mudar comportamento. As telas
          migram no MR-903.
        </>
      }
    >
      <MigrationTable
        rows={[
          {
            from: c('readOnly'),
            to: <>{c('TransactionListReadOnly')}</>,
            notes: 'Linha sem destino de clique',
          },
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
                {c('isInverted')} → {c('inverted')} (padrão {c('true')} na
                família)
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
            notes: (
              <>
                Saída: {c('amountType="negative"')} com o valor sem sinal — o
                componente põe o &quot;- &quot;
              </>
            ),
          },
          {
            from: c('tags'),
            to: (
              <>
                {c('amountTag')} ({c('{ label, type }')}) ou{' '}
                {c('amountIndicator')}
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
            notes:
              'Sem slot de horário nem metadado de topo — um dado por linha',
          },
          {
            from: (
              <>
                {c('withChevron')} + {c('onClick')}
              </>
            ),
            to: 'Transaction List Action',
            notes: 'Não é Read Only',
          },
          {
            from: c('subItens'),
            to: 'Transaction List Expandable + itens filhos',
            notes: (
              <>
                {c('children')} + {c('position')}
              </>
            ),
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
        example={<TransactionListReadOnly {...example} />}
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
            category: 'Bloco de conteúdo',
            option: c('contentSize'),
            values: (
              <>
                {c('md')} · {c('sm')}
              </>
            ),
            defaultValue: c('md'),
          },
          {
            category: 'Bloco de conteúdo',
            option: c('status'),
            values: (
              <>
                {c('default')} · {c('positive')} · {c('warning')} ·{' '}
                {c('highlight')} · {c('highlight-lead')} · {c('strikethrough')}
              </>
            ),
            defaultValue: c('default'),
          },
          {
            category: 'Bloco de conteúdo',
            option: c('inverted'),
            values: (
              <>
                {c('true')} · {c('false')}
              </>
            ),
            defaultValue: c('true'),
          },
          {
            category: 'Bloco de valor',
            option: c('amountSize'),
            values: (
              <>
                {c('md')} (valor 16, Tag Medium) · {c('sm')} (valor 14, Tag
                Small)
              </>
            ),
            defaultValue: c('md'),
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
                {c('default')} (padding vertical 16) · {c('compact')} (8)
              </>
            ),
            defaultValue: c('default'),
          },
          {
            category: 'Aparência',
            option: c('showDivider'),
            values: (
              <>
                {c('true')} · {c('false')} (último item do grupo)
              </>
            ),
            defaultValue: c('true'),
          },
          {
            category: 'Estado',
            option: (
              <>
                {c('loading')} / {c('disabled')}
              </>
            ),
            values: 'Padrão · Carregando · Desabilitado',
            defaultValue: 'Padrão',
          },
        ]}
      />
    </DocSection>

    <DocSection title="Cor por estado">
      <TokenTable
        states={['Padrão', 'Carregando', 'Desabilitado']}
        rows={[
          {
            part: 'Ícone (default)',
            tokens: [
              'Interface/Dark/Up',
              'Interface/Light/Up',
              'Interface/Light/Deep',
            ],
          },
          {
            part: 'Título (invertido)',
            tokens: [
              'Interface/Dark/Down',
              'Interface/Light/Up',
              'Interface/Dark/Up',
            ],
          },
          {
            part: 'Descrição (destaque)',
            tokens: [
              'Interface/Dark/Deep',
              'Interface/Light/Up',
              'Interface/Dark/Up',
            ],
          },
          {
            part: 'Valor (default)',
            tokens: [
              'Interface/Dark/Deep',
              'Interface/Light/Up',
              'Interface/Dark/Up',
            ],
          },
          {
            part: 'Informação extra',
            tokens: ['Interface/Dark/Down', '—', 'Interface/Dark/Up'],
          },
          {
            part: 'Etiqueta (fundo)',
            tokens: ['Status/Positive/Up', '—', 'Interface/Light/Up'],
          },
          {
            part: 'Divisor',
            tokens: [
              'Interface/Light/Down',
              'Interface/Light/Down',
              'Interface/Light/Down',
            ],
          },
        ]}
      />
      <p className="odoc__lead" style={{ marginTop: 8 }}>
        Carregando: o esqueleto usa a base do Skeleton (Interface/Light/Up). O
        divisor compõe em {c('multiply')} com o fundo real.
      </p>
    </DocSection>

    <DocSection
      title="Estados lado a lado"
      intro="Padrão, carregando e desabilitado em cada combinação de tamanho de conteúdo e de valor."
    >
      <PreviewCanvas
        width="auto"
        code={`<TransactionListReadOnly {...props} />
<TransactionListReadOnly {...props} loading />
<TransactionListReadOnly {...props} disabled />
// em cada combinação de contentSize="md" | "sm" e amountSize="md" | "sm"`}
      >
        <Story of={stories.States} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Tamanhos × tipos de valor">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListReadOnly {...props} amountType="positive" contentSize="sm" amountSize="sm" />
<TransactionListReadOnly {...props} amount="Grátis" strikethroughAmount="3,99%" amountType="strikethrough" />
<TransactionListReadOnly {...props} amount="R$ 2,00" strikethroughAmount="R$ 3,99" amountType="strikethrough-neutral" />`}
      >
        <Story of={stories.Sizes} />
      </PreviewCanvas>
    </DocSection>

    <DocSection
      title="Densidade"
      intro="default: padding vertical 16 (Spacing/Xs), linha de 94. compact: 8 (Spacing/Xxs), linha de 78. Horizontal, espaço entre elementos e divisor não mudam."
    >
      <PreviewCanvas
        width="auto"
        code={`<TransactionListReadOnly {...props} />
<TransactionListReadOnly {...props} density="compact" />`}
      >
        <Story of={stories.Density} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Medidas">
      <DocTable
        head={['Medida', 'Valor', 'Token']}
        rows={[
          ['Largura de referência (frame)', '360', '—'],
          ['Padding da linha (default)', '16', c('Spacing/Xs')],
          ['Padding vertical (compact)', '8', c('Spacing/Xxs')],
          ['Espaço ícone ↔ conteúdo', '12', c('Spacing/XxsExtra')],
          ['Espaço conteúdo ↔ valor', '8', c('Spacing/Xxs')],
          [
            'Entre linhas de texto / valor e informação extra',
            '4',
            c('Spacing/Xxxs'),
          ],
          ['Recuo do divisor', '16', c('Spacing/Xs')],
          ['Ícone', '24', '—'],
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
          Lista em que o{' '}
          <strong>valor monetário é a peça mais importante</strong> da linha
          (extrato, movimentação, saldo por loja/conta) e a linha não navega,
          não expande e não é selecionada.
        </li>
        <li>
          Linhas de composição já mostradas sem drill-down (ex.: parcelas pagas
          numa tela de detalhe).
        </li>
      </ul>
    </DocSection>

    <DocSection title="Quando não usar">
      <DocTable
        head={['Situação', 'Use']}
        rows={[
          [
            'A linha leva ao detalhe (ou abre menu/ações)',
            'Transaction List Action',
          ],
          ['A linha é escolhida pelo valor', 'Transaction List Selectable'],
          [
            'A linha abre detalhes na própria lista',
            'Transaction List Expandable',
          ],
          [
            'Linha dentro da expansão de uma transação',
            'Child Read Only / Child Action',
          ],
          ['Linha sem valor monetário', c('ListReadOnly')],
        ]}
      />
    </DocSection>

    <DocSection title="Faça e não faça">
      <DoDontGrid>
        <DoDont
          kind="do"
          caption="Valor que mudou a favor do cliente: original riscado e o atual em verde, na mesma linha."
          code={`<TransactionListReadOnly\n  title="Taxa"\n  description="Antecipação"\n  amount="Grátis"\n  strikethroughAmount="3,99%"\n  amountType="strikethrough"\n/>`}
        >
          <TransactionListReadOnly
            title="Taxa"
            description="Antecipação"
            amount="Grátis"
            strikethroughAmount="3,99%"
            amountType="strikethrough"
            icon={icon}
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="dont"
          caption='Não passe o valor com sinal junto com amountType="negative": sai "- -R$ 24,50".'
          code={`// Não faça\n<TransactionListReadOnly amount="-R$ 24,50" amountType="negative" … />\n// Faça\n<TransactionListReadOnly amount="R$ 24,50" amountType="negative" … />`}
        >
          <TransactionListReadOnly
            title="Pagamento"
            description="Padaria São José"
            amount="-R$ 24,50"
            amountType="negative"
            icon={icon}
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="do"
          caption="Item cancelado: valor normal, sem riscar e sem sinal; a etiqueta comunica."
          code={`<TransactionListReadOnly\n  title="PagBlu"\n  description="Padaria São José"\n  amount="R$ 15,00"\n  amountTag={{ label: 'Cancelado', type: 'neutral' }}\n/>`}
        >
          <TransactionListReadOnly
            title="PagBlu"
            description="Padaria São José"
            amount="R$ 15,00"
            amountTag={{ label: 'Cancelado', type: 'neutral' }}
            icon={icon}
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="dont"
          caption="Não junte dois dados num texto: um dado por linha; o segundo vai ao detalhe."
          code={`// Não faça\n<TransactionListReadOnly description="Crédito • Final 1234 • Padaria São José" … />\n// Faça\n<TransactionListReadOnly description="Padaria São José" … />`}
        >
          <TransactionListReadOnly
            title="Pagamento"
            description="Crédito • Final 1234 • Padaria São José"
            amount="R$ 24,50"
            icon={icon}
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="caution"
          background={colorStatusWarningUp}
          caption="on-color só sobre fundo colorido (ex.: herói em Status/Warning/Up); no fundo branco, use default."
          code={`// sobre fundo colorido (ex.: herói Status/Warning/Up)\n<TransactionListReadOnly iconColor="on-color" … />`}
        >
          <TransactionListReadOnly
            {...example}
            iconColor="on-color"
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="caution"
          caption="Desabilite com disabled — não passe status/amountType inactive à mão."
          code="<TransactionListReadOnly … disabled />"
        >
          <TransactionListReadOnly {...example} disabled showDivider={false} />
        </DoDont>
      </DoDontGrid>
    </DocSection>

    <DocSection title="Regras de conteúdo">
      <ul className="odoc__list">
        <li>
          <strong>Valor nunca vai no conteúdo.</strong> {c('title')}/
          {c('description')}/{c('caption')} são contexto; o valor vai em{' '}
          {c('amount')}.
        </li>
        <li>
          <strong>Cor do valor vem do tipo</strong>, nunca de cor à mão. Entrada
          é {c('positive')} sem &quot;+&quot;; saída é {c('negative')}; cobrança
          em aberto é {c('default')}.
        </li>
        <li>
          <strong>Etiqueta só de status de pagamento</strong> e nem em todo
          item.
        </li>
        <li>Último item do grupo sem divisor ({c('showDivider={false}')}).</li>
      </ul>
    </DocSection>

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
              Os textos, na ordem do DOM: &quot;Pix recebido, Padaria São José,
              12 de novembro às 14:32, R$ 150,00, Pago, Saldo disponível&quot;.
              O ícone não é lido (SVG sem nome). Saída vem com &quot;-&quot;
              antes do valor. {c('aria-disabled')} quando desabilitado,{' '}
              {c('aria-busy')} carregando.
            </>
          ),
        },
        {
          topic: 'Teclado',
          content: (
            <>
              Não recebe foco (só leitura). Para toque, use a Transaction List
              Action.
            </>
          ),
        },
        {
          topic: 'Contraste',
          content: (
            <>
              Ícone {c('default')} (Interface/Dark/Up) no branco 2,2:1 ·{' '}
              {c('on-color')} (Interface/Dark/Down) sobre Status/Warning/Up
              5,1:1 e Status/Negative/Up 4,9:1 · {c('highlight')}{' '}
              (Brand/Primary/Down) no branco 4,1:1. {c('on-color')} só sobre
              fundo colorido.
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
              axe (painel Accessibility) em 08/10, depois da correção do Tag:{' '}
              {c('States × sizes')} 4, {c('Sizes × amount types')} 18,{' '}
              {c('Icon colors')} 9 e {c('Density')} 4 violações — todas de
              contraste de cor, sem token disponível (etiqueta positiva 2,9:1;
              valor verde 3,0:1; riscado Interface/Dark/Up 2,2:1). Ver o painel
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
        code={`import { TransactionListReadOnly } from '@useblu/ocean-react';\nimport type { TransactionListReadOnlyProps } from '@useblu/ocean-react';`}
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
        code={`import { List, TransactionListReadOnly } from '@useblu/ocean-react';
import { ArrowDownOutline, ArrowUpOutline } from '@useblu/ocean-icons-react';

<List>
  {/* Entrada: positive, sem "+" */}
  <TransactionListReadOnly
    icon={<ArrowDownOutline />}
    title="Pix recebido"
    description="João Silva"
    caption="12 de novembro às 09:15"
    amount="R$ 150,00"
    amountType="positive"
  />
  {/* Saída: negative — o componente põe o "- " */}
  <TransactionListReadOnly
    icon={<ArrowUpOutline />}
    title="Pagamento"
    description="Padaria São José"
    caption="12 de novembro às 14:32"
    amount="R$ 24,50"
    amountType="negative"
    showDivider={false}
  />
</List>`}
      />
    </DocSection>
  </>
);

const TransactionListReadOnlyDocs = ({
  stories,
}: {
  stories: Record<string, StoryRef>;
}): React.ReactElement => (
  // Unstyled: sem o CSS do Storybook Docs, os componentes vivos saem como no produto.
  <Unstyled>
    <div className="odoc" style={{ maxWidth: 1200 }}>
      <header className="odoc__header">
        <Typography variant="heading2">Transaction List Read Only</Typography>
        <p className="odoc__lead">
          Família Transaction List · substitui o {c('TransactionListItem')}
        </p>
        <DocHeaderLinks
          links={[
            { label: 'Código-fonte', href: GH_WEB },
            { label: 'Guia na base de conhecimento', href: KB_GUIDE },
            { label: 'Figma', href: FIGMA },
          ]}
        />
      </header>
      <DocTabs
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
      <DocFooter
        links={[
          { label: 'Editar esta documentação', href: KB_GUIDE },
          { label: 'Dar feedback', href: JIRA },
        ]}
      />
    </div>
  </Unstyled>
);

export default TransactionListReadOnlyDocs;
