/* Página de documentação em abas (formato aprovado no MR-615).
 * Texto: base de conhecimento (usage-guidelines/transactionlistselectable.md); exemplos vivos. */
import React from 'react';
import { Controls, Source, Story } from '@storybook/blocks';
import TransactionListSelectable from '../TransactionListSelectable';
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

const KB_FILE = 'transactionlistselectable.md';
const NODE = '24320-5708';

const example = {
  title: 'Loja Centro',
  description: 'CNPJ 12.345.678/0001-90',
  caption: 'Conta digital',
  amount: 'R$ 1.250,00',
  additionalData: 'Saldo disponível',
};

const exampleCode = `const [checked, setChecked] = useState(false);

<TransactionListSelectable
  title="Loja Centro"
  description="CNPJ 12.345.678/0001-90"
  caption="Conta digital"
  amount="R$ 1.250,00"
  additionalData="Saldo disponível"
  checkbox={{ id: 'loja-centro', checked, onChange: () => setChecked(!checked) }}
/>`;

export const AI_RULES: AiRules = {
  useWhen: [
    'O valor por item decide a escolha (de quais lojas/contas o dinheiro sai, somando enquanto marca).',
    'Selecionar transações para uma ação em lote (exportar, conciliar, contestar).',
  ],
  dontUse: [
    'Opções sem valor decisivo → ListSelectable.',
    'Opções simples de uma linha → Checkbox / Radio soltos.',
    'A linha leva ao detalhe → TransactionListAction.',
    'Item indisponível que só informa → TransactionListReadOnly, sem controle.',
  ],
  required: [
    'title e amount; amount formatado e sem sinal.',
    'checkbox (padrão) ou radio com id e checked + onChange (controlado).',
    'radio: o mesmo name em todos os itens do grupo.',
    'platform="web" no portal (controle à esquerda); "app" no web mobile e app (à direita).',
  ],
  forbidden: [
    ...FAMILY_FORBIDDEN,
    'Misturar seleção e navegação na mesma linha.',
    'Controle travado só para informar indisponibilidade (use Read Only ou linha ativa que explica).',
    'Erro de validação só na cor do controle (a tela explica o que falta).',
  ],
  defaults: [
    'controle = checkbox (quando radio não é passado) · platform="web"',
    'inverted=true · contentSize="md" · amountSize="md" · status="default" · amountType="default"',
    'density="default" · showDivider=true · sem ícone à esquerda (o lugar é do controle)',
  ],
  childOf: [
    'List (ou outro container de lista); nunca dentro de TransactionListExpandable.',
  ],
  source: [kbPath(KB_FILE)],
};

const Overview = () => (
  <>
    <DocSection title="Transaction List Selectable">
      <p className="odoc__lead">
        Linha de transação selecionável pelo valor: o lojista marca o item lendo
        o valor para decidir, comparar ou somar.
      </p>
      <PreviewCanvas code={exampleCode}>
        <TransactionListSelectable
          {...example}
          checkbox={{ checked: true, readOnly: true }}
          showDivider={false}
        />
      </PreviewCanvas>
      <ul className="odoc__list">
        <li>
          <strong>Controle:</strong> caixa de marcar (padrão, aceita
          indeterminado) ou opção única ({c('radio')}).
        </li>
        <li>
          <strong>Duas versões:</strong> {c('platform="web"')} com o controle à
          esquerda e {c('platform="app"')} à direita.
        </li>
        <li>
          <strong>Estados do Figma:</strong> Default, Hover, Indeterminate,
          Selected, Disabled, Disabled Selected, Error e Loading.
        </li>
        <li>
          <strong>Sem ícone à esquerda:</strong> o lugar é do controle.
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
                As duas versões: {c('platform="web"')} (controle à esquerda,
                padrão) e {c('"app"')} (à direita); controlado por{' '}
                {c('checked')} + {c('onChange')}.
              </>
            ),
          },
          {
            platform: 'iOS',
            status: 'em revisão',
            link: PRS.ios,
            notes: (
              <>
                Versão app (controle à direita, {c('controlPosition .trailing')}{' '}
                padrão); o toque alterna e chama {c('onSelection')}.
              </>
            ),
          },
          {
            platform: 'Android',
            status: 'em revisão',
            link: PRS.android,
            notes: (
              <>
                Só a versão app (controle à direita); {c('selected')} +{' '}
                {c('onSelectedChange')} obrigatórios.
              </>
            ),
          },
          {
            platform: 'Figma',
            status: 'pronto',
            link: { label: `node ${NODE}`, href: figmaNode(NODE) },
            notes: '8 estados × Checkbox/Radio × Platform App/Web.',
          },
        ]}
      />
    </DocSection>

    <DocSection
      title="O que mudou / migração"
      intro={
        <>
          No web o {c('TransactionListItem')} não tinha seleção (gap da árvore
          de decisão); a seleção com valor era montada com {c('ListSelectable')}{' '}
          e o valor no {c('indicator')}.
        </>
      }
    >
      <MigrationTable
        rows={[
          {
            from: (
              <>
                {c('ListSelectable')} + valor no {c('indicator')}
              </>
            ),
            to: c('TransactionListSelectable'),
            notes: 'Quando o valor decide a escolha',
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
          <TransactionListSelectable
            {...example}
            amountTag={{ label: 'Disponível' }}
            checkbox={{ checked: true, readOnly: true }}
          />
        }
        parts={[
          {
            selector: '.ods-checkbox__checkmark',
            side: 'left',
            label: 'Controle (caixa ou opção única, 20)',
            prop: (
              <>
                {c('checkbox')} / {c('radio')}, {c('platform')}
              </>
            ),
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
            category: 'Conteúdo',
            option: 'Controle',
            values: (
              <>
                {c('checkbox')} · {c('radio')}
              </>
            ),
            defaultValue: c('checkbox'),
          },
          {
            category: 'Aparência',
            option: c('platform'),
            values: (
              <>
                {c('web')} (controle à esquerda) · {c('app')} (à direita)
              </>
            ),
            defaultValue: c('web'),
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
          'Default',
          'Hover',
          'Selected / Indeterminate',
          'Error',
          'Disabled',
          'Disabled Selected',
        ]}
        rows={[
          {
            part: 'Fundo da linha (multiply)',
            tokens: ['—', 'Interface/Light/Up', '—', '—', '—', '—'],
          },
          {
            part: 'Borda do controle',
            tokens: [
              'Interface/Dark/Up',
              'Interface/Dark/Up',
              'Complementary/Pure',
              'Status/Negative/Pure',
              'Interface/Light/Down',
              'Interface/Light/Down',
            ],
          },
          {
            part: 'Fundo do controle',
            tokens: [
              'Interface/Light/Pure',
              'Interface/Light/Up',
              'Complementary/Pure',
              'Interface/Light/Pure',
              'Interface/Light/Pure',
              'Interface/Light/Down',
            ],
          },
          ...blockTokenRows(6, 4).map((row) => ({
            ...row,
            tokens: row.tokens.map((token, index) =>
              index === 5 ? row.tokens[4] : token
            ),
          })),
          { part: 'Divisor', tokens: Array(6).fill('Interface/Light/Down') },
        ]}
      />
    </DocSection>

    <DocSection title="Estados lado a lado — caixa de marcar">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListSelectable checkbox={{ checked, onChange }} … />
<TransactionListSelectable checkbox={{ indeterminate: true }} … />
<TransactionListSelectable checkbox={{ error: true }} … />
<TransactionListSelectable checkbox={{ checked: true }} disabled … />
<TransactionListSelectable platform="app" … />`}
      >
        <Story of={stories.StatesCheckbox} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Estados lado a lado — opção única">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListSelectable radio={{ name: 'origem', value: 'centro', checked, onChange }} … />`}
      >
        <Story of={stories.StatesRadio} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Tamanhos × tipos de valor">
      <PreviewCanvas
        width="auto"
        code={`<TransactionListSelectable … contentSize="sm" amountSize="sm" density="compact" />`}
      >
        <Story of={stories.Sizes} />
      </PreviewCanvas>
    </DocSection>

    <DocSection title="Medidas">
      <DocTable
        head={['Medida', 'Valor', 'Token']}
        rows={[
          ...rowMeasures('16', 'Spacing/Xs'),
          ['Padding vertical (compact)', '8', c('Spacing/Xxs')],
          ['Controle', '20', '—'],
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
          Seleção em que <strong>o valor por item decide a escolha</strong> —
          escolher de quais lojas/contas o dinheiro sai, somando enquanto marca
          (nome e CNPJ identificam; o valor decide).
        </li>
        <li>
          Selecionar transações para uma ação em lote (exportar, conciliar,
          contestar).
        </li>
      </ul>
    </DocSection>

    <DocSection title="Quando não usar">
      <DocTable
        head={['Situação', 'Use']}
        rows={[
          [
            'Opções sem valor decisivo (contas, categorias, métodos)',
            c('ListSelectable'),
          ],
          ['Opções simples de uma linha', 'Checkbox / Radio soltos'],
          ['A linha leva ao detalhe', 'Transaction List Action'],
          [
            'Item indisponível que só informa',
            'Transaction List Read Only, sem controle',
          ],
          [
            'Escolha no POS/app com contexto rico e sem valor decisivo',
            'Card Option',
          ],
        ]}
      />
    </DocSection>

    <DocSection title="Faça e não faça">
      <DoDontGrid>
        <DoDont
          kind="do"
          caption="Escolher de qual loja sai o valor: o valor de cada linha decide."
          code={exampleCode}
        >
          <TransactionListSelectable
            {...example}
            checkbox={{ checked: true, readOnly: true }}
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="dont"
          caption="Não use a Selectable para opções sem valor decisivo: use ListSelectable."
          code={`// Não faça\n<TransactionListSelectable title="Conta corrente" amount="—" … />`}
        >
          <TransactionListSelectable
            title="Conta corrente"
            description="Banco do Brasil"
            amount="—"
            checkbox={{ readOnly: true }}
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="caution"
          caption="Linha travada (obrigatória ou bloqueada) é Disabled Selected; se precisa explicar o motivo, a linha fica ativa e abre a explicação."
          code="<TransactionListSelectable checkbox={{ checked: true }} disabled … />"
        >
          <TransactionListSelectable
            {...example}
            checkbox={{ checked: true, readOnly: true }}
            disabled
            showDivider={false}
          />
        </DoDont>
        <DoDont
          kind="caution"
          caption="Erro não fica só na cor do controle: a tela explica o que falta."
          code="<TransactionListSelectable checkbox={{ error: true }} … />"
        >
          <TransactionListSelectable
            {...example}
            checkbox={{ error: true, readOnly: true }}
            showDivider={false}
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
              Uma caixa de seleção (ou botão de opção) cujo rótulo é a linha
              inteira: &quot;Loja Centro, CNPJ 12.345.678/0001-90, Conta
              digital, R$ 1.250,00, Saldo disponível, caixa de seleção,
              marcada&quot;. Desabilitado: controle desabilitado.
            </>
          ),
        },
        {
          topic: 'Teclado',
          content: (
            <>
              Tab foca o controle; Espaço marca/desmarca. Opções únicas do mesmo{' '}
              {c('name')}: setas trocam a escolha. Clique em qualquer ponto da
              linha alterna (o item é o {c('<label>')}).
            </>
          ),
        },
        {
          topic: 'Contraste',
          content: (
            <>
              Borda do controle Interface/Dark/Up no branco 2,2:1; marcado em
              Complementary/Pure. Erro em Status/Negative/Pure — sempre com
              mensagem da tela.
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
              axe (painel Accessibility) em 08/10: {c('States · checkbox')} 0,{' '}
              {c('States · radio')} 0 e {c('Sizes × amount types')} 6 violações
              — todas de contraste de cor, sem token disponível (valor verde
              3,0:1; riscado 2,2:1). Ver o painel Accessibility de cada story.
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
        code={`import { TransactionListSelectable } from '@useblu/ocean-react';\nimport type { TransactionListSelectableProps } from '@useblu/ocean-react';`}
      />
    </DocSection>
    <DocSection
      title="Playground"
      intro="Todas as propriedades nos controles; marcar e desmarcar funciona."
    >
      <PreviewCanvas compact>
        <Story of={stories.Default} />
      </PreviewCanvas>
      <Controls of={stories.Default} />
    </DocSection>
    <DocSection title="Uso (pronto para copiar)">
      <Source
        language="tsx"
        dark
        code={`import { List, TransactionListSelectable } from '@useblu/ocean-react';

const lojas = [
  { id: 'centro', nome: 'Loja Centro', saldo: 'R$ 1.250,00' },
  { id: 'norte', nome: 'Loja Norte', saldo: 'R$ 830,00' },
];

const [selecionadas, setSelecionadas] = useState<string[]>([]);
const toggle = (id: string) =>
  setSelecionadas((atual) =>
    atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]
  );

<List>
  {lojas.map((loja, index) => (
    <TransactionListSelectable
      key={loja.id}
      title={loja.nome}
      amount={loja.saldo}
      additionalData="Saldo disponível"
      checkbox={{
        id: \`loja-\${loja.id}\`,
        checked: selecionadas.includes(loja.id),
        onChange: () => toggle(loja.id),
      }}
      showDivider={index < lojas.length - 1}
    />
  ))}
</List>`}
      />
    </DocSection>
  </>
);

const TransactionListSelectableDocs = ({
  stories,
}: {
  stories: Record<string, StoryRef>;
}): React.ReactElement => (
  <DocPage
    title="Transaction List Selectable"
    subtitle={<>Família Transaction List · seleção pelo valor</>}
    links={headerLinks('TransactionListSelectable', KB_FILE, NODE)}
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

export default TransactionListSelectableDocs;
