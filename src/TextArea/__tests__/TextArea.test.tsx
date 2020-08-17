import React from 'react';
import { render } from '@testing-library/react';

import TextArea from '../TextArea';

test('renders element properly', () => {
  const { container, getByTestId } = render(
    <TextArea data-testid="textarea-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-textarea__root"
    >
      <textarea
        class="ods-textarea custom-class"
        data-testid="textarea-test"
        type="text"
      />
    </div>
  `);
  expect(getByTestId('textarea-test')).toHaveAttribute('type', 'text');
});

test('renders a label for the textarea', () => {
  const { getByText } = render(<TextArea label="The textarea label" />);
  expect(getByText('The textarea label').className).toBe('ods-textarea__label');
});

test('renders a helper text for the textarea', () => {
  const { getByText } = render(<TextArea helperText="Just a small info." />);
  expect(getByText('Just a small info.').className).toBe(
    'ods-textarea__helper-text'
  );
});

test('renders a full width textarea', () => {
  const { getByTestId } = render(
    <TextArea data-testid="textarea-test" blocked />
  );
  expect(getByTestId('textarea-test').className).toBe(
    'ods-textarea ods-textarea--blocked'
  );
});

test('renders a error state for the textarea', () => {
  const { getByTestId, getByText } = render(
    <TextArea data-testid="textarea-test" error helperText="Error message." />
  );
  expect(getByTestId('textarea-test').className).toBe(
    'ods-textarea ods-textarea--error'
  );
  expect(getByText('Error message.').className).toBe(
    'ods-textarea__helper-text ods-textarea__helper-text--error'
  );
});
