import React from 'react';
import { render, screen } from '@testing-library/react';

import Stepper from '../Stepper';

jest.mock('@useblu/ocean-icons-react', () => ({
  PlusOutline: function StarOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>Plus-Outline</div>;
  },
  MinusSm: function StarOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>Minus-Sm</div>;
  },
}));

test('renders element properly', () => {
  const { container } = render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      className="custom-class"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-form-control__root"
>
  <label
    class="ods-form-label"
  >
    Teste
  </label>
  <div
    class="ods-form-control__element"
  >
    <div
      class="ods-input ods-input--amount custom-class"
    >
      <div
        class="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_minus"
      >
        <button
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--disabled"
        >
          <div
            size="24"
          >
            Minus-Sm
          </div>
        </button>
      </div>
      <input
        data-testid="stepper-test"
        type="text"
        value="0"
      />
      <div
        class="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_plus"
      >
        <button
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--disabled"
        >
          <div
            size="24"
          >
            Plus-Outline
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
`);
  expect(screen.getByTestId('stepper-test')).toHaveAttribute('type', 'text');
});
