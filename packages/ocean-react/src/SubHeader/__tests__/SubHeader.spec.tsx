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
