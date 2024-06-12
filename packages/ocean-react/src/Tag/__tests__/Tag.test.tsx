import React from 'react';
import { render } from '@testing-library/react';
import { Star } from '@useblu/ocean-icons-react';

import Tag, { TagProps } from '../Tag';

jest.mock('@useblu/ocean-icons-react', () => ({
  ExclamationCircle: () => 'mock-exclamation-circle-outline',
  XCircle: () => 'mock-x-circle-outline',
  CheckCircle: () => 'mock-check-circle-outline',
  Star: function StarMock(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>mock-start-circle-outline</div>;
  },
}));

const setup = (props?: TagProps) => {
  render(<Tag {...props}>Hello There!</Tag>);
};

test('renders default element properly', () => {
  setup();

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--default"
      role="Tag"
    >
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders positive element properly', () => {
  setup({ type: 'positive', size: 'small' });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--small ods-tag--small__with-icon ods-tag--positive"
      role="Tag"
    >
      mock-check-circle-outline
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders neutral-02 element properly', () => {
  setup({ type: 'neutral-02' });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--neutral-02"
      role="Tag"
    >
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders neutral-03 element properly', () => {
  setup({ type: 'neutral-03' });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--neutral-03"
      role="Tag"
    >
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders negative element properly', () => {
  setup({ type: 'negative' });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--medium__with-icon ods-tag--negative"
      role="Tag"
    >
      mock-x-circle-outline
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders element with a custom icon', () => {
  setup({ icon: <Star /> });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--medium__with-icon ods-tag--default"
      role="Tag"
    >
      <div
        class="ods-tag__icon"
      >
        mock-start-circle-outline
      </div>
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders warning element properly', () => {
  setup({ type: 'warning' });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--medium__with-icon ods-tag--warning"
      role="Tag"
    >
      mock-exclamation-circle-outline
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders warning element without icon by properly', () => {
  setup({ type: 'warning', setIconOff: true });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--warning"
      role="Tag"
    >
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders highlight element with important element properly', () => {
  setup({ variant: 'highlight', type: 'important' });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--highlight__important"
      role="Tag"
    >
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});

test('renders highlight element with neutral element properly', () => {
  setup({ variant: 'highlight', type: 'neutral' });

  expect(document.querySelector('.ods-tag')).toMatchInlineSnapshot(`
    <div
      class="ods-tag ods-tag--medium ods-tag--highlight__neutral"
      role="Tag"
    >
      <div
        class="ods-tag__content"
      >
        Hello There!
      </div>
    </div>
  `);
});
