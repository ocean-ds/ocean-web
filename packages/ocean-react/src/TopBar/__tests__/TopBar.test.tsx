import React from 'react';
import { render } from '@testing-library/react';

import TopBar from '../TopBar';

test('renders element properly', () => {
  const { container } = render(
    <TopBar
      variants="extended"
      title="Title"
      onBack={() => console.log('aa')}
      onSearch={() => console.log('aa')}
      description="Description"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-topbar ods-topbar-extend ods-topbar-default"
>
  <div
    class="ods-topbar-prev"
  >
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  </div>
  <div
    class="ods-topbar-title"
  >
    Title
    <span>
      Description
    </span>
  </div>
  <div
    class="ods-topbar-search"
  >
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  </div>
</div>
`);
});
test('should render the buttons and Click', () => {
  const { container } = render(
    <TopBar
      variants="extended"
      title="Title"
      onBack={() => console.log('aa')}
      onSearch={() => console.log('aa')}
      description="Description"
    />
  );

  expect(container.firstChild).toHaveClass('ods-topbar-extend');
  expect(document.querySelector('.ods-topbar-prev')).toBeInTheDocument();
  expect(document.querySelector('.ods-topbar-search')).toBeInTheDocument();
});

test('should not render buttons', () => {
  const { container } = render(
    <TopBar variants="extended" title="Title" description="Description" />
  );

  expect(container.firstChild).toHaveClass('ods-topbar-extend');
  expect(document.querySelector('.ods-topbar-prev')).not.toBeInTheDocument();
  expect(document.querySelector('.ods-topbar-search')).not.toBeInTheDocument();
});

test('should render the variant default', () => {
  const { container } = render(
    <TopBar variants="default" title="Title" description="Description" />
  );
  expect(container.firstChild).toHaveClass('ods-topbar');
  expect(container.firstChild).toHaveClass('ods-topbar-default');
  expect(container.firstChild).toHaveTextContent('Description');
  expect(document.querySelector('.ods-topbar-title')).toBeInTheDocument();
});

test('should render the color light', () => {
  const { container } = render(
    <TopBar
      variants="default"
      color="light"
      title="Title"
      description="Description"
    />
  );
  expect(container.firstChild).toHaveClass('ods-topbar-light');
});
