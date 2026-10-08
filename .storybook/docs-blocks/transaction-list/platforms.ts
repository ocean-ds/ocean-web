/**
 * Per-platform data of the Code tab: component names, installation, usage snippets and the
 * native APIs (SwiftUI and Jetpack Compose). The React API comes from the Storybook argTypes.
 */
export type PlatformId = 'react' | 'ios' | 'android';

export type VariantId =
  | 'readOnly'
  | 'action'
  | 'selectable'
  | 'expandable'
  | 'childReadOnly'
  | 'childAction';

export type Platform = {
  id: PlatformId;
  label: string;
  language: 'tsx' | 'swift' | 'kotlin';
  install: { label: string; language: string; code: string }[];
};

export const PLATFORMS: Platform[] = [
  {
    id: 'react',
    label: 'React',
    language: 'tsx',
    install: [
      {
        label: 'Install the packages',
        language: 'bash',
        code: 'yarn add @useblu/ocean-react @useblu/ocean-core @useblu/ocean-icons-react',
      },
      {
        label: 'Import the styles once, at the root of the app',
        language: 'tsx',
        code: "import '@useblu/ocean-core/ocean.min.css';",
      },
    ],
  },
  {
    id: 'ios',
    label: 'iOS (SwiftUI)',
    language: 'swift',
    install: [
      {
        label: 'Add the Swift package (File › Add Packages…)',
        language: 'swift',
        code: '.package(url: "https://github.com/ocean-ds/ocean-ios.git", from: "1.0.0")',
      },
      {
        label: 'Import the components',
        language: 'swift',
        code: 'import OceanComponents',
      },
    ],
  },
  {
    id: 'android',
    label: 'Android (Compose)',
    language: 'kotlin',
    install: [
      {
        label: 'Add the dependency to the module build file',
        language: 'kotlin',
        code: 'implementation("br.com.useblu:ocean-components:<version>")',
      },
      {
        label: 'Import the components',
        language: 'kotlin',
        code: 'import br.com.useblu.oceands.components.compose.transactionlist.*',
      },
    ],
  },
];

export type Variant = {
  id: VariantId;
  label: string;
  /** Storybook id of the component's Playground story. */
  storyId: string;
  names: Record<PlatformId, string>;
};

export const VARIANTS: Variant[] = [
  {
    id: 'readOnly',
    label: 'Read only',
    storyId: 'components-list-transaction-list-read-only--default',
    names: {
      react: 'TransactionListReadOnly',
      ios: 'OceanSwiftUI.TransactionListReadOnly',
      android: 'OceanTransactionListReadOnly',
    },
  },
  {
    id: 'action',
    label: 'Action',
    storyId: 'components-list-transaction-list-action--default',
    names: {
      react: 'TransactionListAction',
      ios: 'OceanSwiftUI.TransactionListAction',
      android: 'OceanTransactionListAction',
    },
  },
  {
    id: 'selectable',
    label: 'Selectable',
    storyId: 'components-list-transaction-list-selectable--default',
    names: {
      react: 'TransactionListSelectable',
      ios: 'OceanSwiftUI.TransactionListSelectable',
      android: 'OceanTransactionListSelectable',
    },
  },
  {
    id: 'expandable',
    label: 'Expandable',
    storyId: 'components-list-transactionlistexpandable--usage',
    names: {
      react: 'TransactionListExpandable',
      ios: 'OceanSwiftUI.TransactionListExpandable',
      android: 'OceanTransactionListExpandable',
    },
  },
  {
    id: 'childReadOnly',
    label: 'Child read only',
    storyId: 'components-list-transaction-list-child--timeline',
    names: {
      react: 'TransactionListChildReadOnly',
      ios: 'OceanSwiftUI.TransactionListChildReadOnly',
      android: 'OceanChildTransactionListReadOnly',
    },
  },
  {
    id: 'childAction',
    label: 'Child action',
    storyId: 'components-list-transaction-list-child--default',
    names: {
      react: 'TransactionListChildAction',
      ios: 'OceanSwiftUI.TransactionListChildAction',
      android: 'OceanChildTransactionListAction',
    },
  },
];

const reactBlock = (extra: string, indent = '  ') =>
  [
    'title="Supplier payment"',
    'description="Coral Distributors"',
    'caption="Nov 12, 9:15 AM"',
    'amount="R$ 1.250,00"',
    'amountType="negative"',
    "amountTag={{ label: 'Paid', type: 'positive' }}",
    extra,
  ]
    .filter(Boolean)
    .map((line) => `${indent}${line}`)
    .join('\n');

const iosContent = `contentList: .init(title: "Supplier payment",
                       description: "Coral Distributors",
                       caption: "Nov 12, 9:15 AM",
                       isInverted: true),
    amountDetails: .init(amount: "R$ 1.250,00",
                         type: .negative,
                         tag: .init(label: "Paid", status: .positive))`;

const androidContent = `content = ContentListStyle.Inverted(
        title = "Supplier payment",
        description = "Coral Distributors",
        caption = "Nov 12, 9:15 AM"
    ),
    amount = ContentListStyle.Amount(
        amount = "R$ 1.250,00",
        type = AmountType.Negative,
        tag = OceanTagModel(type = OceanTagType.Positive, text = "Paid")
    )`;

export const SNIPPETS: Record<PlatformId, Record<VariantId, string>> = {
  react: {
    readOnly: `import { TransactionListReadOnly } from '@useblu/ocean-react';
import { TruckOutline } from '@useblu/ocean-icons-react';

<TransactionListReadOnly
  icon={<TruckOutline size={24} />}
${reactBlock('')}
/>`,
    action: `import { TransactionListAction } from '@useblu/ocean-react';

<TransactionListAction
  icon={<TruckOutline size={24} />}
${reactBlock('onClick={openDetails}')}
/>

<TransactionListAction
${reactBlock(`actionType="menu"
  menuActions={[
    { label: 'View receipt', onClick: viewReceipt },
    { label: 'Cancel payment', onClick: cancel, variant: 'negative' },
  ]}`)}
/>`,
    selectable: `import { TransactionListSelectable } from '@useblu/ocean-react';

<TransactionListSelectable
  title="Retailer"
  description="Seashell Store"
  amount="R$ 1.250,00"
  additionalData="Available balance"
  checkbox={{ id: 'seashell', checked, onChange: toggle }}
/>`,
    expandable: `import {
  TransactionListExpandable,
  TransactionListChildReadOnly,
} from '@useblu/ocean-react';

<TransactionListExpandable
  title="Sale received"
  description="Seashell Store"
  amount="R$ 1.000,00"
  amountType="positive"
  contentSize="md"
  amountSize="md"
  expanded={expanded}
  onToggle={setExpanded}
>
  <TransactionListChildReadOnly position="first" title="Gross amount" amount="R$ 1.089,90" />
  <TransactionListChildReadOnly position="last" title="Advance fee" amount="R$ 89,90" amountType="negative" />
</TransactionListExpandable>`,
    childReadOnly: `import { TransactionListChildReadOnly } from '@useblu/ocean-react';

<TransactionListChildReadOnly
  position="middle"
  title="Advance fee"
  description="Receivables advance"
  amount="R$ 89,90"
  amountType="negative"
/>`,
    childAction: `import { TransactionListChildAction } from '@useblu/ocean-react';

<TransactionListChildAction
  position="middle"
  title="Advance fee"
  description="Receivables advance"
  amount="R$ 89,90"
  amountType="negative"
  onClick={openFee}
/>`,
  },
  ios: {
    readOnly: `OceanSwiftUI.TransactionListReadOnly(parameters: .init(
    icon: Ocean.icon.truckOutline,
    ${iosContent}
))`,
    action: `OceanSwiftUI.TransactionListAction(parameters: .init(
    actionType: .chevron,
    icon: Ocean.icon.truckOutline,
    ${iosContent},
    onTouch: { openDetails() }
))`,
    selectable: `OceanSwiftUI.TransactionListSelectable(parameters: .init(
    controlType: .checkbox,
    isSelected: isSelected,
    ${iosContent},
    onSelection: { isSelected = $0 }
))`,
    expandable: `OceanSwiftUI.TransactionListExpandable(parameters: .init(
    header: OceanSwiftUI.TransactionListReadOnlyParameters(
        contentList: .init(title: "Sale received", description: "Seashell Store", isInverted: true),
        amountDetails: .init(amount: "R$ 1.000,00", type: .positive)
    ),
    slot: AnyView(feeBreakdown),
    status: .collapsed
))`,
    childReadOnly: `OceanSwiftUI.TransactionListChildReadOnly(parameters: .init(
    position: .position(at: index, count: items.count),
    contentList: .init(title: "Advance fee", description: "Receivables advance", isInverted: true, size: .sm),
    amountDetails: .init(amount: "R$ 89,90", type: .negative, size: .sm)
))`,
    childAction: `OceanSwiftUI.TransactionListChildAction(parameters: .init(
    position: .middle,
    contentList: .init(title: "Advance fee", description: "Receivables advance", isInverted: true, size: .sm),
    amountDetails: .init(amount: "R$ 89,90", type: .negative, size: .sm),
    onTouch: { openFee() }
))`,
  },
  android: {
    readOnly: `OceanTransactionListReadOnly(
    icon = OceanIconModel(icon = OceanIcons.TRUCK_OUTLINE),
    ${androidContent}
)`,
    action: `OceanTransactionListAction(
    type = OceanTransactionListActionType.Chevron,
    onClick = { openDetails() },
    ${androidContent}
)`,
    selectable: `OceanTransactionListSelectable(
    controller = OceanTransactionListController.Checkbox,
    selected = selected,
    onSelectedChange = { selected = it },
    ${androidContent}
)`,
    expandable: `OceanTransactionListExpandable(
    content = ContentListStyle.Inverted(title = "Sale received", description = "Seashell Store"),
    amount = ContentListStyle.Amount(amount = "R$ 1.000,00", type = AmountType.Positive),
    items = listOf(
        OceanTransactionListChildItem(
            content = ContentListStyle.Inverted(title = "Advance fee", description = "Receivables advance"),
            amount = ContentListStyle.Amount(amount = "R$ 89,90", type = AmountType.Negative)
        )
    )
)`,
    childReadOnly: `OceanChildTransactionListReadOnly(
    position = OceanTransactionListPosition.Middle,
    content = ContentListStyle.Inverted(title = "Advance fee", description = "Receivables advance"),
    amount = ContentListStyle.Amount(amount = "R$ 89,90", type = AmountType.Negative)
)`,
    childAction: `OceanChildTransactionListAction(
    position = OceanTransactionListPosition.Middle,
    onClick = { openFee() },
    content = ContentListStyle.Inverted(title = "Advance fee", description = "Receivables advance"),
    amount = ContentListStyle.Amount(amount = "R$ 89,90", type = AmountType.Negative)
)`,
  },
};

/** [parameter, type, default] */
export type ApiRow = [string, string, string];

const iosShared: ApiRow[] = [
  ['state', 'TransactionListState (.default, .loading, .disabled)', '.default'],
  ['icon', 'UIImage?', 'nil'],
  ['contentList', 'ContentListParameters', '.init()'],
  ['amountDetails', 'AmountDetailsParameters', '.init()'],
  ['density', 'TransactionListDensity (.default, .compact)', '.default'],
];
const iosIconColor: ApiRow = [
  'iconColor',
  'TransactionListIconColor (.default, .onColor, .highlight)',
  '.default',
];
const iosDivider: ApiRow = ['showDivider', 'Bool', 'true'];
const iosChild: ApiRow[] = [
  [
    'position',
    'TransactionListChildPosition (.standalone, .first, .middle, .last)',
    '.standalone',
  ],
  ['iconColor', 'TransactionListIconColor?', 'nil'],
  ...iosShared,
];

const androidShared: ApiRow[] = [
  ['content', 'ContentListStyle', 'required'],
  ['amount', 'ContentListStyle.Amount?', 'null'],
  [
    'state',
    'OceanTransactionListState (Default, Loading, Disabled)',
    'Default',
  ],
  ['icon', 'OceanIconModel?', 'null'],
  ['density', 'TransactionListDensity (Default, Compact)', 'Default'],
  ['modifier', 'Modifier', 'Modifier'],
];
const androidIconColor: ApiRow = [
  'iconColor',
  'TransactionListIconColor (Default, OnColor, Highlight)',
  'Default',
];
const androidDivider: ApiRow = ['showDivider', 'Boolean', 'true'];
const androidChild: ApiRow[] = [
  [
    'position',
    'OceanTransactionListPosition (Standalone, First, Middle, Last)',
    'Standalone',
  ],
  ['iconColor', 'TransactionListIconColor?', 'null'],
  ...androidShared,
];

export const NATIVE_API: Record<
  Exclude<PlatformId, 'react'>,
  Record<VariantId, ApiRow[]>
> = {
  ios: {
    readOnly: [...iosShared, iosIconColor, iosDivider],
    action: [
      ['actionType', 'ActionType (.chevron, .menu)', '.chevron'],
      ['isMenuActive', 'Bool', 'false'],
      ['onTouch', '() -> Void', '{ }'],
      ...iosShared,
      iosIconColor,
      iosDivider,
    ],
    selectable: [
      ['controlType', 'ControlType (.checkbox, .radio)', '.checkbox'],
      ['controlPosition', 'ControlPosition (.trailing, .leading)', '.trailing'],
      ['isSelected', 'Bool', 'false'],
      ['isIndeterminate', 'Bool', 'false'],
      ['hasError', 'Bool', 'false'],
      ['onSelection', '(Bool) -> Void', '{ _ in }'],
      ...iosShared.filter(([name]) => name !== 'icon'),
      iosDivider,
    ],
    expandable: [
      ['header', 'TransactionListParameters?', 'nil'],
      ['slot', 'AnyView?', 'nil'],
      ['bottomMessage', 'String', '""'],
      ['status', 'Status (.collapsed, .expanded)', '.collapsed'],
      ['isEnabled', 'Bool', 'true'],
      ['hasDivider', 'Bool', 'true'],
      ['onStatusChange', '(Status) -> Void', '{ _ in }'],
    ],
    childReadOnly: iosChild,
    childAction: [...iosChild, ['onTouch', '() -> Void', '{ }']],
  },
  android: {
    readOnly: [...androidShared, androidIconColor, androidDivider],
    action: [
      ['onClick', '() -> Unit', 'required'],
      ['type', 'OceanTransactionListActionType (Chevron, Menu)', 'Chevron'],
      ['menuActive', 'Boolean', 'false'],
      ['onMenuClick', '() -> Unit', '{}'],
      ...androidShared,
      androidIconColor,
      androidDivider,
    ],
    selectable: [
      ['selected', 'Boolean', 'required'],
      ['onSelectedChange', '(Boolean) -> Unit', 'required'],
      [
        'controller',
        'OceanTransactionListController (Checkbox, Radio)',
        'Checkbox',
      ],
      ['indeterminate', 'Boolean', 'false'],
      ['showError', 'Boolean', 'false'],
      ...androidShared.filter(([name]) => name !== 'icon'),
      androidDivider,
    ],
    expandable: [
      ['items', 'List<OceanTransactionListChildItem>', 'emptyList()'],
      ['footerText', 'String', '""'],
      ['footer', '(@Composable () -> Unit)?', 'null'],
      ['startExpanded', 'Boolean', 'false'],
      ['onExpandedChange', '(Boolean) -> Unit', '{}'],
      ...androidShared,
      androidIconColor,
      androidDivider,
    ],
    childReadOnly: androidChild,
    childAction: [['onClick', '() -> Unit', 'required'], ...androidChild],
  },
};
