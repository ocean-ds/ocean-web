export const footerPlatforms = {
  react: `import { Button, TransactionFooter } from '@useblu/ocean-react';

<TransactionFooter
  type="default"
  mainItem={{ label: 'Pedido', value: 'R$ 623,80' }}
  details={[
    { label: 'Pague em', value: '3x de R$ 207,93 sem acréscimo' },
  ]}
  total={{ label: 'Total', value: 'R$ 623,80' }}
  notice={{
    title: 'Economia de R$ 96,39',
    description: 'Economia aplicada ao seu pagamento.',
  }}
  action={<Button variant="primary" blocked>Revisar pagamento</Button>}
/>`,
  swift: `let content = TransactionFooterContent(
    type: .default,
    notice: TransactionFooterNotice(
        title: "Economia de R$ 96,39",
        description: "Economia aplicada ao seu pagamento."
    ),
    mainItem: TransactionFooterRow(label: "Pedido", value: "R$ 623,80"),
    details: [
        TransactionFooterRow(label: "Pague em", value: "3x de R$ 207,93 sem acréscimo")
    ],
    total: TransactionFooterTotal(label: "Total", value: "R$ 623,80"),
    button: button
)

OceanSwiftUI.TransactionFooter(
    parameters: TransactionFooterParameters(style: .v2(content))
)`,
  compose: `OceanTransactionFooter(
    total = OceanTransactionFooterTotal(
        label = "Total",
        value = "R$ 623,80"
    ),
    button = button,
    modifier = Modifier,
    type = OceanTransactionFooterType.Default,
    notice = OceanTransactionFooterNotice(
        title = "Economia de R$ 96,39",
        description = "Economia aplicada ao seu pagamento."
    ),
    mainItem = OceanTransactionFooterItem(
        label = "Pedido",
        value = "R$ 623,80"
    ),
    details = listOf(
        OceanTransactionFooterItem(
            label = "Pague em",
            value = "3x de R$ 207,93 sem acréscimo"
        )
    )
)`,
};

export const summaryPlatforms = 'table' as const;
