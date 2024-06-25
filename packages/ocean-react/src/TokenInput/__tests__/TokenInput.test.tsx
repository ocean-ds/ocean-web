import React from 'react';
import { render } from '@testing-library/react';

import TokenInput from '../TokenInput';

const onChangeToken = jest.fn();

test('renders element properly', () => {
  const { container } = render(
    <TokenInput
      data-testid="token-input-test"
      className="custom-class"
      autoFocus
      digitsQuantity={4}
      onChangeToken={onChangeToken}
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <div
          class="custom-class ods-token-input"
        >
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
        </div>
      </div>
      
    </div>
  `);
});
