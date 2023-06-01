import React from 'react';
import { render } from '@testing-library/react';

import Shortcut, { ShortcutProps } from '../Shortcut';

jest.mock('@useblu/ocean-icons-react', () => ({
  LockClosed: () => 'mock-lock-closed',
}));

const setup = ({
  icon,
  label,
  description,
  size = 'medium',
  blocked = false,
  disabled = false,
}: ShortcutProps) => {
  render(
    <Shortcut
      icon={icon}
      label={label}
      description={description}
      size={size}
      blocked={blocked}
      disabled={disabled}
    />
  );
};

test('renders shortcut component properly', () => {
  setup({ icon: 'mock-home-xvg', label: 'Label' });

  expect(document.querySelector('.ods-shortcut')).toMatchInlineSnapshot(`
    <div
      class="ods-shortcut ods-shortcut--medium"
    >
      <div
        class="ods-shortcut__content"
      >
        <div
          class="ods-shortcut__icon"
        >
          mock-home-xvg
        </div>
        <h5
          class="ods-shortcut__label ods-typography ods-typography__heading5"
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
      class="ods-shortcut ods-shortcut--medium"
    >
      <div
        class="ods-shortcut__content"
      >
        <div
          class="ods-shortcut__icon"
        >
          mock-home-xvg
        </div>
        <h5
          class="ods-shortcut__label ods-typography ods-typography__heading5"
        >
          Label
        </h5>
      </div>
      <span
        class="ods-shortcut__description ods-typography ods-typography__description"
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

test.each(['tiny', 'small', 'medium', 'large'] as const)(
  'renders ods-drawer__content--header icon in each side',
  (size) => {
    setup({ icon: 'mock-home-xvg', label: 'Label', size });

    expect(document.querySelector('.ods-shortcut')).toHaveClass(
      `ods-shortcut--${size}`
    );
  }
);
