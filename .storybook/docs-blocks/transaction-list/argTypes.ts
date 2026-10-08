/**
 * argTypes compartilhados da família Transaction List (padrão de documentação §3.3–3.5):
 * mesmas categorias e a mesma frase em todos os componentes.
 */
export const category = {
  content: '📝 Conteúdo',
  appearance: '🎨 Aparência',
  state: '⚙️ Estado',
  interaction: '👆 Interação',
  contentBlock: '🧩 Bloco de conteúdo',
  amountBlock: '🧩 Bloco de valor',
  advanced: '🔧 Avançado',
};

const controlFor = (type: string) => {
  if (type === 'string') return 'text';
  if (type === 'boolean') return 'boolean';
  if (type.startsWith('{')) return 'object';
  return undefined;
};

export const arg = (
  cat: string,
  description: string,
  type: string,
  defaultValue?: string,
  extra: Record<string, unknown> = {}
): Record<string, unknown> => ({
  description,
  control: controlFor(type),
  table: {
    category: cat,
    type: { summary: type },
    defaultValue: defaultValue ? { summary: defaultValue } : undefined,
  },
  ...extra,
});

const radio = (options: string[]) => ({ control: 'inline-radio', options });
const select = (options: string[]) => ({ control: 'select', options });

export const STATUS = [
  'default',
  'inactive',
  'positive',
  'warning',
  'highlight',
  'highlight-lead',
  'strikethrough',
];
export const AMOUNT_TYPES = [
  'default',
  'positive',
  'negative',
  'inactive',
  'strikethrough',
  'strikethrough-neutral',
];

/** Bloco de conteúdo + bloco de valor (descrição canônica na base). */
export const blockArgTypes = ({
  sizeDefault,
}: {
  /** Padrão de contentSize/amountSize no componente ('md', 'sm' ou '—' quando não há). */
  sizeDefault: string;
}): Record<string, unknown> => ({
  title: arg(
    category.contentBlock,
    'Texto de cima da linha; com `inverted` sai menor que a descrição. Um dado só: o tipo da transação ou a categoria ("Pix recebido", "PagBlu")',
    'string'
  ),
  description: arg(
    category.contentBlock,
    'Texto em destaque da linha quando invertido. Um dado só: a contraparte, o método **ou** o final do cartão ("Padaria São José")',
    'string'
  ),
  strikethroughDescription: arg(
    category.contentBlock,
    'Texto original riscado antes do texto em destaque. Só tem efeito com o tipo `strikethrough`',
    'string'
  ),
  caption: arg(
    category.contentBlock,
    'Terceira linha, em `captionBold`: um dado de informação adicional (data "12 de novembro às 14:32", referência)',
    'string'
  ),
  inverted: arg(
    category.contentBlock,
    'Troca o peso de título e descrição: invertido, a descrição é a linha em destaque',
    'boolean',
    'true'
  ),
  status: arg(
    category.contentBlock,
    'Cor e peso do texto em destaque. Ignorado com a linha desabilitada (o bloco usa `inactive`)',
    STATUS.map((s) => `'${s}'`).join(' | '),
    "'default'",
    select(STATUS)
  ),
  contentSize: arg(
    category.contentBlock,
    'Tamanho do texto do bloco de conteúdo, escolhido independente do valor',
    "'md' | 'sm'",
    sizeDefault,
    radio(['md', 'sm'])
  ),
  amount: arg(
    category.amountBlock,
    'Valor à direita, já formatado e **sem sinal** ("R$ 1.234,56"); o "- " de `negative` é o componente que põe',
    'string'
  ),
  amountType: arg(
    category.amountBlock,
    'Cor do valor e o "- " na saída. Ignorado com a linha desabilitada (o bloco usa `inactive`)',
    AMOUNT_TYPES.map((s) => `'${s}'`).join(' | '),
    "'default'",
    select(AMOUNT_TYPES)
  ),
  amountSize: arg(
    category.amountBlock,
    'Tamanho do valor e da etiqueta abaixo dele, escolhido independente do conteúdo',
    "'md' | 'sm'",
    sizeDefault,
    radio(['md', 'sm'])
  ),
  strikethroughAmount: arg(
    category.amountBlock,
    'Valor original riscado antes do valor atual, na mesma linha. Só tem efeito com os tipos `strikethrough` e `strikethrough-neutral`',
    'string'
  ),
  amountTag: arg(
    category.amountBlock,
    'Etiqueta abaixo do valor; o tamanho segue `amountSize` e vira `neutral` com a linha desabilitada',
    '{ label: ReactNode; type?: AmountDetailsTagType; setIconOff?: boolean }'
  ),
  amountIndicator: arg(
    category.amountBlock,
    'Elemento livre abaixo do valor, quando a etiqueta não basta. Ignorado quando `amountTag` é passado',
    'ReactNode',
    undefined,
    { control: false }
  ),
  showAmountIndicator: arg(
    category.amountBlock,
    'Mostra a etiqueta ou o indicador abaixo do valor',
    'boolean',
    'true'
  ),
  additionalData: arg(
    category.amountBlock,
    'Linha abaixo do valor, em `captionBold`: um dado só ("6x de R$ 100,00", "Saldo disponível")',
    'string'
  ),
});

export const stateArgTypes = (): Record<string, unknown> => ({
  loading: arg(
    category.state,
    'Mostra o esqueleto no lugar do ícone, do conteúdo e do valor',
    'boolean',
    'false'
  ),
  disabled: arg(
    category.state,
    'Apaga a linha: conteúdo e valor no tipo `inactive` e etiqueta `neutral`; nas linhas com toque, também não dispara o callback',
    'boolean',
    'false'
  ),
});

export const iconArgTypes = ({
  iconSize = 24,
  iconColorDefault = "'default'",
}: {
  iconSize?: number;
  iconColorDefault?: string;
} = {}): Record<string, unknown> => ({
  icon: arg(
    category.content,
    `Ícone de ${iconSize}px à esquerda; entra só quando distingue os itens da lista. Herda a cor de \`iconColor\` — passe o ícone sem cor própria`,
    'ReactNode',
    undefined,
    { control: false }
  ),
  iconColor: arg(
    category.appearance,
    'Cor do ícone: `default` sobre fundo branco, `on-color` sobre fundo colorido, `highlight` para mais ênfase. Ignorado com a linha desabilitada (o ícone usa Interface/Light/Deep)',
    "'default' | 'on-color' | 'highlight'",
    iconColorDefault,
    radio(['default', 'on-color', 'highlight'])
  ),
});

export const dividerArgType = (
  defaultValue = 'true'
): Record<string, unknown> => ({
  showDivider: arg(
    category.appearance,
    'Mostra o divisor abaixo do item (recuo de 16px)',
    'boolean',
    defaultValue
  ),
});

export const classNameArgType = (
  target = '<div>'
): Record<string, unknown> => ({
  className: arg(
    category.advanced,
    `Classes no elemento raiz; \`ref\` e os demais atributos vão para o ${target}`,
    'string',
    undefined,
    { control: false }
  ),
});

export const densityArgType = (): Record<string, unknown> => ({
  density: arg(
    category.appearance,
    'Densidade vertical: `compact` usa padding de 8 (Spacing/Xxs) em cima e embaixo; o esqueleto acompanha. O padding horizontal não muda',
    "'default' | 'compact'",
    "'default'",
    { control: 'inline-radio', options: ['default', 'compact'] }
  ),
});
