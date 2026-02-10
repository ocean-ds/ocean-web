import React from 'react';
import { render, screen } from '@testing-library/react';

import Badge from '../Badge';

test('renders element properly', () => {
  render(
    <Badge data-testid="btn-test" className="custom-class">
      Hello
    </Badge>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
<div
  class="ods-badge ods-badge--small ods-badge--undefined custom-class"
  data-testid="btn-test"
  role="tag"
>
  <div
    class="ods-badge__content ods-badge__text"
  >
    Hello
  </div>
</div>
`);
});

test('renders element with count', () => {
  render(
    <Badge count={8} data-testid="btn-test" className="custom-class">
      Hello
    </Badge>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
<div
  class="ods-badge ods-badge--small ods-badge--undefined custom-class"
  data-testid="btn-test"
  role="tag"
>
  <div
    class="ods-badge__content ods-badge__count"
  >
    8
  </div>
</div>
`);
});

test('renders element with count more then 99', () => {
  render(
    <Badge count={123} data-testid="btn-test" className="custom-class">
      Hello
    </Badge>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
<div
  class="ods-badge ods-badge--small ods-badge--undefined custom-class ods-badge--overflow"
  data-testid="btn-test"
  role="tag"
>
  <div
    class="ods-badge__content ods-badge__count"
  >
    99+
  </div>
</div>
`);
});

test('renders element with count equals 0', () => {
  render(
    <Badge count={0} data-testid="btn-test" className="custom-class">
      Hello
    </Badge>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
<div
  class="ods-badge ods-badge--small ods-badge--undefined custom-class"
  data-testid="btn-test"
  role="tag"
>
  <div
    class="ods-badge__content ods-badge__count"
  >
    0
  </div>
</div>
`);
});

test('renders element with variation', () => {
  render(
    <Badge variation="tiny" data-testid="btn-test" className="custom-class">
      Hello
    </Badge>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
<div
  class="ods-badge ods-badge--tiny ods-badge--undefined custom-class"
  data-testid="btn-test"
  role="tag"
>
  <div
    class="ods-badge__content"
  />
</div>
`);
});

test('renders element with highlight color', () => {
  render(
    <Badge color="highlight" data-testid="btn-test" className="custom-class">
      Hello
    </Badge>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
<div
  class="ods-badge ods-badge--small ods-badge--highlight custom-class"
  data-testid="btn-test"
  role="tag"
>
  <div
    class="ods-badge__content ods-badge__text"
  >
    Hello
  </div>
</div>
`);
});
