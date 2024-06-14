import React from 'react';
import { render } from '@testing-library/react';
import {
  ExclamationCircle,
  ExclamationCircleOutline,
} from '@useblu/ocean-icons-react';
import UnorderedListItem from '../UnorderedListItem';

test('renders default element properly', () => {
  const { container } = render(
    <UnorderedListItem description="Bank Transfer" iconVariant="chevron" />
  );

  expect(container.firstChild).toMatchSnapshot(`
  <div
  class="ods-unordered-list-item"
>
  <span
    class="ods-unordered-list-item__icon-container"
  >
    <svg
      fill="currentColor"
      height="16"
      viewBox="0 0 20 20"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        fill-rule="evenodd"
      />
    </svg>
  </span>
  <span>
    <p
      class="ods-typography ods-typography__description ods-unordered-list-item__description"
    >
      Bank Transfer
    </p>
  </span>
</div>
<div
  class="ods-unordered-list-item"
>
  <span
    class="ods-unordered-list-item__icon-container"
  >
    <svg
      fill="currentColor"
      height="16"
      viewBox="0 0 20 20"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        fill-rule="evenodd"
      />
    </svg>
  </span>
  <span>
    <p
      class="ods-typography ods-typography__description ods-unordered-list-item__description"
    >
      Bank Transfer
    </p>
  </span>
</div>
  `);
});

test('renders outline element properly with all possible information', () => {
  const { container } = render(
    <UnorderedListItem
      description="Bank Transfer"
      iconVariant="outline"
      icon={ExclamationCircleOutline}
      title="Title"
    />
  );

  expect(container.firstChild).toMatchSnapshot(`
  <div
  class="ods-unordered-list-item"
>
  <svg
    class="ods-unordered-list-item__icon"
    fill="none"
    height="24"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
  <span>
    <p
      class="ods-typography ods-typography__paragraph ods-unordered-list-item__title"
    >
      Title
    </p>
    <p
      class="ods-typography ods-typography__description"
    >
      Bank Transfer
    </p>
  </span>
</div>
<div
  class="ods-unordered-list-item"
>
  <svg
    class="ods-unordered-list-item__icon"
    fill="none"
    height="24"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
  <span>
    <p
      class="ods-typography ods-typography__paragraph ods-unordered-list-item__title"
    >
      Title
    </p>
    <p
      class="ods-typography ods-typography__description"
    >
      Bank Transfer
    </p>
  </span>
</div>
  `);
});

test('renders solid element properly with all possible information', () => {
  const { container } = render(
    <UnorderedListItem
      description="Bank Transfer"
      iconVariant="solid"
      icon={ExclamationCircle}
      title="Title"
    />
  );

  expect(container.firstChild).toMatchSnapshot(`
  <div
  class="ods-unordered-list-item"
>
  <svg
    class="ods-unordered-list-item__icon"
    fill="currentColor"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      fill-rule="evenodd"
    />
  </svg>
  <span>
    <p
      class="ods-typography ods-typography__paragraph ods-unordered-list-item__title ods-unordered-list-item__title--with-solid-icon"
    >
      Title
    </p>
    <p
      class="ods-typography ods-typography__description"
    >
      Bank Transfer
    </p>
  </span>
</div>
<div
  class="ods-unordered-list-item"
>
  <svg
    class="ods-unordered-list-item__icon ods-unordered-list-item__icon--solid"
    fill="currentColor"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      fill-rule="evenodd"
    />
  </svg>
  <span>
    <p
      class="ods-typography ods-typography__paragraph ods-unordered-list-item__title ods-unordered-list-item__title--with-solid-icon"
    >
      Title
    </p>
    <p
      class="ods-typography ods-typography__description"
    >
      Bank Transfer
    </p>
  </span>
</div>
  `);
});
