export const footerPlatforms = {
  react: `import { Button, TransactionFooter } from '@useblu/ocean-react';

<TransactionFooter
  type="default"
  items={[
    { content: { title: 'Pedido' }, amount: { value: 'R$ 623,80' } },
    {
      content: { title: 'Pague em' },
      amount: { value: '3x de R$ 207,93', info: 'sem acréscimo' },
    },
  ]}
  total={{ label: 'Total', value: 'R$ 623,80' }}
  notice={{
    title: 'Economia de R$ 96,39',
    description: 'Economia aplicada ao seu pagamento.',
  }}
  action={<Button variant="primary" blocked>Revisar pagamento</Button>}
/>`,
  swift: `let content = OceanSwiftUI.TransactionFooterContent(
    type: .default,
    notice: "Economia de R$ 96,39",
    items: items,
    total: .init(label: "Total", value: "R$ 623,80"),
    button: button
)

OceanSwiftUI.TransactionFooter(
    parameters: OceanSwiftUI.TransactionFooterParameters(
        style: .transaction(content)
    )
)`,
  compose: `OceanTransactionFooter(
    items = items,
    total = OceanTransactionFooterTotal(
        label = "Total",
        value = "R$ 623,80"
    ),
    button = button,
    modifier = Modifier,
    type = OceanTransactionFooterType.Default,
    notice = "Economia de R$ 96,39"
)`,
};

export const summaryPlatforms = 'table' as const;
