import React from 'react';
import { render } from '@testing-library/react';

import Shortcut, { ShortcutProps } from '../Shortcut';

jest.mock('@useblu/ocean-icons-react', () => ({
  LockClosed: () => 'mock-lock-closed',
}));

const setup = (props: ShortcutProps) => render(<Shortcut {...props} />);

test('renders shortcut component properly', () => {
  setup({ icon: 'mock-home-xvg', label: 'Label' });

  expect(document.querySelector('.ods-shortcut')).toMatchInlineSnapshot(`
    <div
      class="ods-shortcut ods-shortcut--medium ods-shortcut--horizontal"
    >
      <div
        class="ods-shortcut__content ods-shortcut__content--horizontal"
      >
        <div
          class="ods-shortcut__icon"
        >
          mock-home-xvg
        </div>
        <h5
          class="ods-shortcut__label ods-typography__heading5"
        >
          Label
        </h5>
      </div>
    </div>
  `);
});

test('renders shortcut component with description', () => {
  setup({ icon: 'mock-home-xvg', label: 'Label', description: 'Description' });

  expect(document.querySelector('.ods-shortcut')).toMatchInlineSnapshot(`
    <div
      class="ods-shortcut ods-shortcut--medium ods-shortcut--horizontal"
    >
      <div
        class="ods-shortcut__content ods-shortcut__content--horizontal"
      >
        <div
          class="ods-shortcut__icon"
        >
          mock-home-xvg
        </div>
        <h5
          class="ods-shortcut__label ods-typography__heading5"
        >
          Label
        </h5>
      </div>
      <span
        class="ods-shortcut__description ods-typography__description"
      >
        Description
      </span>
    </div>
  `);
});

test('renders shortcut component with blocked state', () => {
  setup({ icon: 'mock-home-xvg', label: 'Label', blocked: true });

  expect(document.querySelector('.ods-shortcut')).toHaveClass(
    'ods-shortcut--blocked'
  );

  expect(document.querySelector('.ods-shortcut__blocked'))
    .toMatchInlineSnapshot(`
      <div
        class="ods-shortcut__blocked"
      >
        mock-lock-closed
      </div>
  `);
});

test('renders shortcut component with disabled state', () => {
  setup({ icon: 'mock-home-xvg', label: 'Label', disabled: true });

  expect(document.querySelector('.ods-shortcut')).toHaveClass(
    'ods-shortcut--disabled'
  );
});

test('renders shortcut component full width', () => {
  setup({ icon: 'mock-home-xvg', label: 'Label', fullWidth: true });

  expect(document.querySelector('.ods-shortcut')).toHaveClass(
    'ods-shortcut--full-width'
  );
});

test('renders shortcut component with count badge', () => {
  setup({ icon: 'mock-home-xvg', label: 'Label', count: 9 });

  expect(document.querySelector('.ods-shortcut__badge')).toMatchInlineSnapshot(`
    <div
      class="ods-badge ods-badge--small ods-badge--alert ods-shortcut__badge"
      role="tag"
    >
      <div
        class="ods-badge__content ods-badge__count"
      >
        9
      </div>
    </div>
  `);
});

test.each(['tiny', 'small', 'medium'] as const)(
  'renders ods-drawer__content--header icon in each side',
  (size) => {
    setup({ icon: 'mock-home-xvg', label: 'Label', size });

    expect(document.querySelector('.ods-shortcut')).toHaveClass(
      `ods-shortcut--${size}`
    );
  }
);

test.each(['vertical', 'horizontal'] as const)(
  'renders ods-drawer__content--header icon in each side',
  (orientation) => {
    setup({ icon: 'mock-home-xvg', label: 'Label', orientation });

    expect(document.querySelector('.ods-shortcut')).toHaveClass(
      `ods-shortcut--${orientation}`
    );
  }
);

test.each(['tiny', 'small'] as const)(
  'not renders description when size is tiny or small',
  (size) => {
    setup({
      icon: 'mock-home-xvg',
      label: 'Label',
      size,
      description: 'Description',
    });

    expect(document.querySelector('.ods-shortcut__description')).toBeFalsy();
  }
);
