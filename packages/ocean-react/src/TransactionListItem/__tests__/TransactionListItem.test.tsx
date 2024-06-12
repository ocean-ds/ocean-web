import React from 'react';
import { render } from '@testing-library/react';
import { ExclamationCircle } from '@useblu/ocean-icons-react';
import Tag from '../../Tag';
import TransactionListItem, {
  TransactionListItemProps,
} from '../TransactionListItem';

jest.mock('@useblu/ocean-icons-react', () => ({
  ExclamationCircle: () => 'mock-exclamation-circle-outline',
}));

const setup = (props?: TransactionListItemProps) => {
  render(<TransactionListItem {...props}>Bank Transfer</TransactionListItem>);
};

test('renders default element properly', () => {
  setup();

  expect(document.querySelector('.ods-transaction-list-item'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-transaction-list-item"
    >
      <div
        class="ods-transaction-list-item__content"
      >
        <div
          class="ods-transaction-list-item__information "
        >
          <div
            class="ods-transaction-list-item__level1"
          >
            Bank Transfer
          </div>
        </div>
        <div
          class="ods-transaction-list-item__sub-information"
        >
          <div
            class="ods-transaction-list-item__value"
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

  expect(document.querySelector('.ods-transaction-list-item'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-transaction-list-item"
    >
      <div
        class="ods-transaction-list-item__content"
      >
        <div
          class="ods-transaction-list-item__icon"
        >
          mock-exclamation-circle-outline
        </div>
        <div
          class="ods-transaction-list-item__information ods-transaction-list-item__information--with-icon"
        >
          <div
            class="ods-transaction-list-item__level4"
          >
            Level 4
          </div>
          <div
            class="ods-transaction-list-item__level1"
          >
            Bank Transfer
          </div>
          <div
            class="ods-transaction-list-item__level2"
          >
            Level 2
          </div>
          <div
            class="ods-transaction-list-item__level3"
          >
            Level 3
          </div>
        </div>
        <div
          class="ods-transaction-list-item__sub-information"
        >
          <div
            class="ods-transaction-list-item__value"
          >
            U$ 00.000,00
          </div>
          <div
            class="ods-transaction-list-item__tags"
          >
            <div
              class="ods-tag ods-tag--medium ods-tag--default"
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
            class="ods-transaction-list-item__time"
          >
            9:00
          </div>
        </div>
      </div>
    </div>
  `);
});

test('renders default element properly with sub transaction-list-items', () => {
  setup({
    icon: <ExclamationCircle />,
    subItens: (
      <TransactionListItem icon={<ExclamationCircle />}>
        Sub
      </TransactionListItem>
    ),
  });

  expect(document.querySelector('.ods-transaction-list-item'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-transaction-list-item"
    >
      <div
        class="ods-transaction-list-item__content"
      >
        <div
          class="ods-transaction-list-item__icon"
        >
          mock-exclamation-circle-outline
        </div>
        <div
          class="ods-transaction-list-item__information ods-transaction-list-item__information--with-icon"
        >
          <div
            class="ods-transaction-list-item__level1"
          >
            Bank Transfer
          </div>
        </div>
        <div
          class="ods-transaction-list-item__sub-information"
        >
          <div
            class="ods-transaction-list-item__value"
          />
        </div>
      </div>
      <div
        class="ods-transaction-list-item__sub-itens"
      >
        <div
          class="ods-transaction-list-item"
        >
          <div
            class="ods-transaction-list-item__content"
          >
            <div
              class="ods-transaction-list-item__icon"
            >
              mock-exclamation-circle-outline
            </div>
            <div
              class="ods-transaction-list-item__information ods-transaction-list-item__information--with-icon"
            >
              <div
                class="ods-transaction-list-item__level1"
              >
                Sub
              </div>
            </div>
            <div
              class="ods-transaction-list-item__sub-information"
            >
              <div
                class="ods-transaction-list-item__value"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
