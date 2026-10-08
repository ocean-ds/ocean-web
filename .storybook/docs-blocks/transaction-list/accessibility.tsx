import React from 'react';
import { DocTable, Section, Subsection, c } from '../blocks';

export const ACCESSIBILITY_SECTIONS = [
  'What Ocean provides',
  'Development considerations',
];

const KEYBOARD_ROWS: React.ReactNode[][] = [
  [
    'Tab',
    'Moves to the next row, menu trigger or control. Read only rows are skipped.',
    'Action, Selectable, Expandable, Child action',
  ],
  [
    <>Enter / Space</>,
    'Activates the row: opens details, toggles the child items or the menu.',
    'Action, Expandable, Child action',
  ],
  ['Space', 'Checks or unchecks the control.', 'Selectable'],
  ['Arrow keys', 'Move between the radios of a group.', 'Selectable (radio)'],
  [
    <>Enter / Space on a menu item</>,
    'Runs the action and closes the menu.',
    'Action (menu, swipe)',
  ],
];

const SCREEN_READER_ROWS: React.ReactNode[][] = [
  [
    'Action, Child action',
    <>Rendered as a native {c('<button>')}; the row text is its name.</>,
  ],
  [
    'Selectable',
    <>
      Native checkbox or radio; the whole row is its label, so the name includes
      title, description and amount.
    </>,
  ],
  [
    'Expandable',
    <>
      Toggle with {c('aria-expanded')} and a name that says whether it expands
      or collapses the row.
    </>,
  ],
  [
    'Menu trigger',
    <>
      {c('aria-expanded')} reflects the menu; the menu has {c('role="menu"')}.
    </>,
  ],
  [
    'Loading',
    <>{c('aria-busy="true"')} on the row while the skeleton is shown.</>,
  ],
  [
    'Disabled',
    <>
      Native {c('disabled')} on buttons and controls;{' '}
      {c('aria-disabled="true"')} on read only rows.
    </>,
  ],
  [
    'Icons',
    <>Decorative: hidden from assistive technology ({c('aria-hidden')}).</>,
  ],
];

export const Accessibility = (): React.ReactElement => (
  <>
    <Section title="What Ocean provides">
      <Subsection title="Keyboard">
        <DocTable
          columns={['Key', 'Action', 'Variants']}
          rows={KEYBOARD_ROWS}
        />
      </Subsection>
      <Subsection title="Screen readers">
        <DocTable columns={['Element', 'Behavior']} rows={SCREEN_READER_ROWS} />
      </Subsection>
      <Subsection title="Focus">
        <p>
          Interactive rows show a 2px primary outline inside the row on keyboard
          focus, so it is never clipped by the list container.
        </p>
      </Subsection>
    </Section>
    <Section title="Development considerations">
      <ul>
        <li>
          <strong>Color is never the only signal.</strong> The positive tag and
          the positive amount are below 4.5:1 contrast on white. Keep the sign
          from {c('amountType')} and a text label on the tag, so meaning does
          not depend on color.
        </li>
        <li>
          <strong>Use Action for anything clickable.</strong> Don’t attach click
          handlers to Read only rows; they are not focusable and screen readers
          do not announce them as buttons.
        </li>
        <li>
          <strong>Overflow menu name.</strong> The trigger has a generic
          built-in name (&quot;Abrir menu de ações&quot;). Keep each row’s title
          and description distinct so people can tell which row the trigger
          belongs to.
        </li>
        <li>
          <strong>Announce new rows.</strong> When more rows load, announce the
          result in a live region ({c('aria-live="polite"')}), such as &quot;10
          more transactions loaded&quot;.
        </li>
        <li>
          <strong>Child items.</strong> The timeline is visual only; keep the
          order of the child items meaningful, since it is the reading order.
        </li>
      </ul>
    </Section>
  </>
);
