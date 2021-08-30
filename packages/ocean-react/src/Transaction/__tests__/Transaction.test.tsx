import React from 'react';
import { render } from '@testing-library/react';
import { ExclamationCircle } from '@useblu/ocean-icons-react';
import Tag from '../../Tag';
import Transaction, { TransactionProps } from '../Transaction';

jest.mock('@useblu/ocean-icons-react', () => ({
  ExclamationCircle: () => 'mock-exclamation-circle-outline',
}));

const setup = (props?: TransactionProps) => {
  render(<Transaction {...props}>Bank Transfer</Transaction>);
};

test('renders default element properly', () => {
  setup();

  expect(document.querySelector('.ods-transaction')).toMatchInlineSnapshot(`
<div
  class="ods-transaction"
>
  <div
    class="ods-transaction__content"
  >
    <div
      class="ods-transaction__information"
    >
      <div
        class="ods-transaction__level1"
      >
        Bank Transfer
      </div>
    </div>
    <div
      class="ods-transaction__sub-information"
    >
      <div
        class="ods-transaction__value"
      />
    </div>
  </div>
</div>
`);
});

test('renders default element properly with all possible information', () => {
  setup({
    icon: <ExclamationCircle />,
    tags: <Tag>Tag</Tag>,
    time: '9:00',
    value: 'U$ 00.000,00',
    level2: 'Level 2',
    level3: 'Level 3',
    level4: 'Level 4',
  });

  expect(document.querySelector('.ods-transaction')).toMatchInlineSnapshot(`
<div
  class="ods-transaction"
>
  <div
    class="ods-transaction__content"
  >
    <div
      class="ods-transaction__icon"
    >
      mock-exclamation-circle-outline
    </div>
    <div
      class="ods-transaction__information"
    >
      <div
        class="ods-transaction__level4"
      >
        Level 4
      </div>
      <div
        class="ods-transaction__level1"
      >
        Bank Transfer
      </div>
      <div
        class="ods-transaction__level2"
      >
        Level 2
      </div>
      <div
        class="ods-transaction__level3"
      >
        Level 3
      </div>
    </div>
    <div
      class="ods-transaction__sub-information"
    >
      <div
        class="ods-transaction__value"
      >
        U$ 00.000,00
      </div>
      <div
        class="ods-transaction__tags"
      >
        <div
          class="ods-tag ods-tag--default"
          role="Tag"
        >
          <div
            class="ods-tag__content"
          >
            Tag
          </div>
        </div>
      </div>
      <div
        class="ods-transaction__time"
      >
        9:00
      </div>
    </div>
  </div>
</div>
`);
});

test('renders default element properly with sub transactions', () => {
  setup({
    icon: <ExclamationCircle />,
    subTransactions: (
      <Transaction icon={<ExclamationCircle />}>Sub</Transaction>
    ),
  });

  expect(document.querySelector('.ods-transaction')).toMatchInlineSnapshot(`
<div
  class="ods-transaction"
>
  <div
    class="ods-transaction__content"
  >
    <div
      class="ods-transaction__icon"
    >
      mock-exclamation-circle-outline
    </div>
    <div
      class="ods-transaction__information"
    >
      <div
        class="ods-transaction__level1"
      >
        Bank Transfer
      </div>
    </div>
    <div
      class="ods-transaction__sub-information"
    >
      <div
        class="ods-transaction__value"
      />
    </div>
  </div>
  <div
    class="ods-transaction__sub-transactions"
  >
    <div
      class="ods-transaction"
    >
      <div
        class="ods-transaction__content"
      >
        <div
          class="ods-transaction__icon"
        >
          mock-exclamation-circle-outline
        </div>
        <div
          class="ods-transaction__information"
        >
          <div
            class="ods-transaction__level1"
          >
            Sub
          </div>
        </div>
        <div
          class="ods-transaction__sub-information"
        >
          <div
            class="ods-transaction__value"
          />
        </div>
      </div>
    </div>
  </div>
</div>
`);
});
