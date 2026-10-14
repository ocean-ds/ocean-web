export const footerPlatforms = {
  react: `import { Button, TransactionFooter } from '@useblu/ocean-react';

<TransactionFooter
  type="default"
  mainItem={{
    content: { title: 'Subtotal' },
    amount: { value: '$1,250.00' },
  }}
  details={[
    {
      content: { title: 'Installments' },
      amount: { value: '5 × $250.00', info: 'No additional fees' },
    },
  ]}
  total={{ label: 'Total', value: '$1,250.00' }}
  notice={{
    title: 'Discount applied',
    description: 'Supporting text for the notice.',
  }}
  action={<Button variant="primary" blocked>Continue</Button>}
/>`,
  swift: `let content = TransactionFooterContent(
    type: .default,
    notice: TransactionFooterNotice(
        title: "Discount applied",
        description: "Supporting text for the notice."
    ),
    mainItem: TransactionFooterRow(
        contentList: ContentListParameters(title: "Subtotal", isInverted: false),
        amountDetails: AmountDetailsParameters(amount: "$1,250.00")
    ),
    details: [
        TransactionFooterRow(
            contentList: ContentListParameters(title: "Installments", isInverted: false),
            amountDetails: AmountDetailsParameters(
                amount: "5 × $250.00",
                additionalData: "No additional fees"
            )
        )
    ],
    total: TransactionFooterTotal(label: "Total", value: "$1,250.00"),
    button: button
)

OceanSwiftUI.TransactionFooter(
    parameters: TransactionFooterParameters(style: .v2(content))
)`,
  compose: `OceanTransactionFooter(
    total = OceanTransactionFooterTotal(
        label = "Total",
        value = "$1,250.00"
    ),
    button = button,
    modifier = Modifier,
    type = OceanTransactionFooterType.Default,
    notice = OceanTransactionFooterNotice(
        title = "Discount applied",
        description = "Supporting text for the notice."
    ),
    mainItem = OceanTransactionFooterItem(
        content = ContentListStyle.Default(title = "Subtotal"),
        amount = ContentListStyle.Amount(amount = "$1,250.00")
    ),
    details = listOf(
        OceanTransactionFooterItem(
            content = ContentListStyle.Default(title = "Installments"),
            amount = ContentListStyle.Amount(
                amount = "5 × $250.00",
                additionalData = "No additional fees"
            )
        )
    )
)`,
};

export const summaryPlatforms = 'table' as const;
