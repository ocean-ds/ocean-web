import React from 'react';
import { render } from '@testing-library/react';

import SubHeader from '../SubHeader';

test('renders element properly', () => {
  const { container } = render(
    <SubHeader className="custom-class"> Title </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-sub-header custom-class"
>
  <div
    class="ods-sub-header__title"
  >
     Title 
  </div>
</div>
`);
});

test('renders element with subtitle', () => {
  const { container } = render(
    <SubHeader className="custom-class" subtitle="Subtitle">
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-sub-header custom-class"
    >
      <div
        class="ods-sub-header__title"
      >
        Title
      </div>
      <div
        class="ods-sub-header__subtitle"
      >
        Subtitle
      </div>
    </div>
  `);
});

test('renders element with icon', () => {
  const { container } = render(
    <SubHeader className="custom-class" icon={<span data-testid="icon">🔔</span>}>
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-sub-header custom-class"
    >
      <div
        class="ods-sub-header__title"
      >
        <div
          class="ods-sub-header__icon"
        >
          <span
            data-testid="icon"
          >
            🔔
          </span>
        </div>
        Title
      </div>
    </div>
  `);
});

test('renders element with icon and subtitle', () => {
  const { container } = render(
    <SubHeader
      className="custom-class"
      icon={<span data-testid="icon">📅</span>}
      subtitle="Subtitle"
    >
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-sub-header custom-class"
    >
      <div
        class="ods-sub-header__title"
      >
        <div
          class="ods-sub-header__icon"
        >
          <span
            data-testid="icon"
          >
            📅
          </span>
        </div>
        Title
      </div>
      <div
        class="ods-sub-header__subtitle"
      >
        Subtitle
      </div>
    </div>
  `);
});
