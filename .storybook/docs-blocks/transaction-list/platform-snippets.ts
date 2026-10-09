/**
 * Equivalent snippets on React, SwiftUI (ocean-ios) and Jetpack Compose (ocean-android),
 * written against the public APIs of each library.
 */

const swiftContent = (indent: string, size = '') =>
  `contentList: .init(title: "Payment to supplier",\n${indent}                   description: "Tidewater Company",\n${indent}                   caption: "Order #7182",\n${indent}                   isInverted: true${size})`;

const swiftAmount = (indent: string, extra = '') =>
  `amountDetails: .init(amount: "R$ 6.819,33"${extra})`.replace(
    '\n',
    `\n${indent}`
  );

const composeContent = `content = ContentListStyle.Inverted(
        title = "Payment to supplier",
        description = "Tidewater Company",
        caption = "Order #7182"
    )`;

const composeAmount =
  'amount = ContentListStyle.Amount(amount = "R$ 6.819,33")';

const reactRow = (name: string, extra = '') => `<${name}
  icon={<OutflowOutline />}
  content={{
    title: 'Payment to supplier',
    description: 'Tidewater Company',
    caption: 'Order #7182',
  }}
  amount={{ value: 'R$ 6.819,33' }}${extra}
/>`;

export const readOnly = {
  react: reactRow('TransactionListReadOnly'),
  swift: `OceanSwiftUI.TransactionListReadOnly(parameters: .init(
    icon: Ocean.icon.moneyOutflowOutline,
    ${swiftContent('    ')},
    ${swiftAmount('    ')}
))`,
  compose: `OceanTransactionListReadOnly(
    ${composeContent},
    ${composeAmount},
    icon = OceanIconModel(icon = OceanIcons.OUTFLOW_OUTLINE)
)`,
};

export const action = {
  react: reactRow('TransactionListAction', '\n  onClick={openDetails}'),
  swift: `OceanSwiftUI.TransactionListAction(parameters: .init(
    actionType: .chevron,
    icon: Ocean.icon.moneyOutflowOutline,
    ${swiftContent('    ')},
    ${swiftAmount('    ')},
    onTouch: { openDetails() }
))`,
  compose: `OceanTransactionListAction(
    ${composeContent},
    onClick = { openDetails() },
    ${composeAmount},
    icon = OceanIconModel(icon = OceanIcons.OUTFLOW_OUTLINE),
    type = OceanTransactionListActionType.Chevron
)`,
};

export const selectable = {
  react: `<TransactionListSelectable
  content={{ title: 'Receivables', description: 'Credit card', caption: 'Due Oct 15' }}
  amount={{ value: 'R$ 7.899,01', info: 'Available balance' }}
  checkbox={{ id: 'credit', checked, onChange: toggle }}
/>`,
  swift: `OceanSwiftUI.TransactionListSelectable(parameters: .init(
    controlType: .checkbox,
    isSelected: isSelected,
    contentList: .init(title: "Receivables",
                       description: "Credit card",
                       caption: "Due Oct 15",
                       isInverted: true),
    amountDetails: .init(amount: "R$ 7.899,01",
                         additionalData: "Available balance"),
    onSelection: { isSelected = $0 }
))`,
  compose: `OceanTransactionListSelectable(
    content = ContentListStyle.Inverted(
        title = "Receivables",
        description = "Credit card",
        caption = "Due Oct 15"
    ),
    selected = selected,
    onSelectedChange = { selected = it },
    amount = ContentListStyle.Amount(
        amount = "R$ 7.899,01",
        additionalData = "Available balance"
    ),
    controller = OceanTransactionListController.Checkbox
)`,
};

export const expandable = {
  react: `<TransactionListExpandable
  icon={<InflowOutline />}
  content={{ title: 'Sales received', description: 'Credit card', size: 'md' }}
  amount={{ value: 'R$ 7.899,01', type: 'positive', size: 'md' }}
  supportingText="Fees already deducted"
  expanded={expanded}
  onToggle={setExpanded}
>
  <TransactionListChildReadOnly
    position="first"
    content={{ title: 'Gross amount', description: 'Card sales' }}
    amount={{ value: 'R$ 7.988,91' }}
  />
  <TransactionListChildReadOnly
    position="last"
    content={{ title: 'Advance fee', description: 'Receivables advance' }}
    amount={{ value: 'R$ 89,90', type: 'negative' }}
  />
</TransactionListExpandable>`,
  swift: `OceanSwiftUI.TransactionListExpandable(parameters: .init(
    bottomMessage: "Fees already deducted",
    status: .collapsed,
    header: OceanSwiftUI.TransactionListReadOnlyParameters(
        icon: Ocean.icon.moneyInflowOutline,
        contentList: .init(title: "Sales received",
                           description: "Credit card",
                           isInverted: true),
        amountDetails: .init(amount: "R$ 7.899,01", type: .positive)
    ),
    slot: AnyView(feeItems)
))`,
  compose: `// import br.com.useblu.oceands.components.compose.list.OceanTransactionListExpandable
OceanTransactionListExpandable(
    content = ContentListStyle.Inverted(
        title = "Sales received",
        description = "Credit card"
    ),
    amount = ContentListStyle.Amount(amount = "R$ 7.899,01", type = AmountType.Positive),
    items = listOf(
        OceanTransactionListChildItem(
            content = ContentListStyle.Inverted(title = "Advance fee", description = "Receivables advance"),
            amount = ContentListStyle.Amount(amount = "R$ 89,90", type = AmountType.Negative)
        )
    ),
    footerText = "Fees already deducted"
)`,
};

const reactChild = (name: string, extra = '') => `<${name}
  position="middle"
  content={{ title: 'Advance fee', description: 'Receivables advance' }}
  amount={{ value: 'R$ 89,90', type: 'negative' }}${extra}
/>`;

const swiftChild = (
  name: string,
  extra = ''
) => `OceanSwiftUI.${name}(parameters: .init(
    position: .middle,
    contentList: .init(title: "Advance fee",
                       description: "Receivables advance",
                       isInverted: true,
                       size: .sm),
    amountDetails: .init(amount: "R$ 89,90", type: .negative, size: .sm)${extra}
))`;

const composeChild = (name: string, extra = '') => `${name}(
    content = ContentListStyle.Inverted(
        title = "Advance fee",
        description = "Receivables advance"
    ),${extra}
    amount = ContentListStyle.Amount(amount = "R$ 89,90", type = AmountType.Negative),
    position = OceanTransactionListPosition.Middle
)`;

export const childReadOnly = {
  react: reactChild('TransactionListChildReadOnly'),
  swift: swiftChild('TransactionListChildReadOnly'),
  compose: composeChild('OceanChildTransactionListReadOnly'),
};

export const childAction = {
  react: reactChild('TransactionListChildAction', '\n  onClick={openFee}'),
  swift: swiftChild(
    'TransactionListChildAction',
    ',\n    onTouch: { openFee() }'
  ),
  compose: composeChild(
    'OceanChildTransactionListAction',
    '\n    onClick = { openFee() },'
  ),
};
