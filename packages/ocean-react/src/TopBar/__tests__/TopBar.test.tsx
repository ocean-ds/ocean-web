import React from 'react';
import { render } from '@testing-library/react';

import { ArrowLeftOutline } from '@useblu/ocean-icons-react';
import TopBar from '../TopBar';

test('renders element properly', () => {
  const { container } = render(
    <TopBar
      leftIcon={<ArrowLeftOutline />}
      variants="extended"
      title="Title"
      onLeftAction={() => console.log('aa')}
      onRightAction={() => console.log('aa')}
      description="Description"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-topbar ods-topbar-extend ods-topbar-default"
>
  <div
    class="ods-topbar-actions"
  >
    <div
      class="ods-topbar-left"
    >
      <span>
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
      </span>
    </div>
  </div>
  <div
    class="ods-topbar-title"
  >
    Title
    <span>
      Description
    </span>
  </div>
</div>
`);
});
test('should render the buttons and Click', () => {
  const { container } = render(
    <TopBar
      leftIcon={<ArrowLeftOutline />}
      rightIcon={<ArrowLeftOutline />}
      variants="extended"
      title="Title"
      onLeftAction={() => console.log('aa')}
      onRightAction={() => console.log('aa')}
      description="Description"
    />
  );

  expect(container.firstChild).toHaveClass('ods-topbar-extend');
  expect(document.querySelector('.ods-topbar-left')).toBeInTheDocument();
  expect(document.querySelector('.ods-topbar-right')).toBeInTheDocument();
});

test('should not render buttons', () => {
  const { container } = render(
    <TopBar
      leftIcon={<ArrowLeftOutline />}
      variants="extended"
      title="Title"
      description="Description"
    />
  );

  expect(container.firstChild).toHaveClass('ods-topbar-extend');
  expect(document.querySelector('.ods-topbar-left')).not.toBeInTheDocument();
  expect(document.querySelector('.ods-topbar-right')).not.toBeInTheDocument();
});

test('should render the variant default', () => {
  const { container } = render(
    <TopBar
      leftIcon={<ArrowLeftOutline />}
      variants="default"
      title="Title"
      description="Description"
    />
  );
  expect(container.firstChild).toHaveClass('ods-topbar');
  expect(container.firstChild).toHaveClass('ods-topbar-default');
  expect(container.firstChild).toHaveTextContent('Description');
  expect(document.querySelector('.ods-topbar-title')).toBeInTheDocument();
});

test('should render the color default', () => {
  const { container } = render(
    <TopBar
      leftIcon={<ArrowLeftOutline />}
      color="off"
      title="Title"
      description="Description"
    />
  );
  expect(container.firstChild).toHaveClass('ods-topbar-default');
});

test('should render the color on', () => {
  const { container } = render(
    <TopBar
      leftIcon={<ArrowLeftOutline />}
      color="on"
      title="Title"
      description="Description"
    />
  );
  expect(container.firstChild).toHaveClass('ods-topbar-light');
});

test('should render with scrollbar', () => {
  const { container } = render(
    <TopBar scrollBar color="off" title="Title" description="Description" />
  );
  expect(container.firstChild).toHaveClass('ods-topbar-scroll-bar');
});
