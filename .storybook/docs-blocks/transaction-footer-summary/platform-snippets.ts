export const footerPlatforms = {
  react: `import { Button, TransactionFooter } from '@useblu/ocean-react';

<TransactionFooter
  type="default"
  mainItem={{ label: 'Subtotal', value: 'R$ 1.250,00' }}
  details={[
    { label: 'Installments', value: '5x of R$ 250,00', info: 'No additional fees' },
  ]}
  total={{ label: 'Total', value: 'R$ 1.250,00' }}
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
    mainItem: TransactionFooterRow(label: "Subtotal", value: "R$ 1.250,00"),
    details: [
        TransactionFooterRow(
            label: "Installments",
            value: "5x of R$ 250,00",
            info: "No additional fees"
        )
    ],
    total: TransactionFooterTotal(label: "Total", value: "R$ 1.250,00"),
    button: button
)

OceanSwiftUI.TransactionFooter(
    parameters: TransactionFooterParameters(style: .v2(content))
)`,
  compose: `OceanTransactionFooter(
    total = OceanTransactionFooterTotal(
        label = "Total",
        value = "R$ 1.250,00"
    ),
    button = button,
    modifier = Modifier,
    type = OceanTransactionFooterType.Default,
    notice = OceanTransactionFooterNotice(
        title = "Discount applied",
        description = "Supporting text for the notice."
    ),
    mainItem = OceanTransactionFooterItem(
        label = "Subtotal",
        value = "R$ 1.250,00"
    ),
    details = listOf(
        OceanTransactionFooterItem(
            label = "Installments",
            value = "5x of R$ 250,00",
            info = "No additional fees"
        )
    )
)`,
};

export const summaryPlatforms = 'table' as const;
