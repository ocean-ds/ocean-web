import React from 'react';
import { render } from '@testing-library/react';

import SubHeader from '../SubHeader';

test('renders element properly with default size', () => {
  const { container } = render(
    <SubHeader className="custom-class"> Title </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-sub-header custom-class ods-sub-header--medium"
>
  <div
    class="ods-sub-header__title"
  >
     Title 
  </div>
</div>
`);
});

test('renders element with size small', () => {
  const { container } = render(
    <SubHeader className="custom-class" size="small">
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-sub-header custom-class ods-sub-header--small"
>
  <div
    class="ods-sub-header__title"
  >
    Title
  </div>
</div>
`);
});

test('renders element with size medium', () => {
  const { container } = render(
    <SubHeader className="custom-class" size="medium">
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-sub-header custom-class ods-sub-header--medium"
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
      class="ods-sub-header custom-class ods-sub-header--medium"
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

test('renders element with subtitle and size small', () => {
  const { container } = render(
    <SubHeader className="custom-class" subtitle="Subtitle" size="small">
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-sub-header custom-class ods-sub-header--small"
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
      class="ods-sub-header custom-class ods-sub-header--medium"
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

test('renders element with icon and size small', () => {
  const { container } = render(
    <SubHeader
      className="custom-class"
      icon={<span data-testid="icon">🔔</span>}
      size="small"
    >
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-sub-header custom-class ods-sub-header--small"
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
      class="ods-sub-header custom-class ods-sub-header--medium"
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

test('renders element with icon, subtitle and size small', () => {
  const { container } = render(
    <SubHeader
      className="custom-class"
      icon={<span data-testid="icon">📅</span>}
      subtitle="Subtitle"
      size="small"
    >
      Title
    </SubHeader>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-sub-header custom-class ods-sub-header--small"
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
