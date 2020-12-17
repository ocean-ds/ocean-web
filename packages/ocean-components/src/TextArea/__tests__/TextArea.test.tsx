import React from 'react';
import { render } from '@testing-library/react';

import TextArea from '../TextArea';

test('renders element properly', () => {
  const { container } = render(
    <TextArea data-testid="textarea-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <textarea
          class="ods-textarea custom-class"
          data-testid="textarea-test"
        />
      </div>
    </div>
  `);
});

test('renders a error state for the textarea', () => {
  const { getByTestId } = render(
    <TextArea data-testid="textarea-test" error helperText="Error message." />
  );
  expect(
    getByTestId('textarea-test')
  ).toHaveClass('ods-textarea ods-textarea--error', { exact: true });
});
