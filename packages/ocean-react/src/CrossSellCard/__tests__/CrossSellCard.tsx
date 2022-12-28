import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CrossSellCard from '../CrossSellCard';
import { ChevronLeft } from '@useblu/ocean-icons-react';

const mockFunction = jest.fn();

test('renders element properly', () => {
  render(
    <CrossSellCard
      title="Title Test"
      description="Description Test"
      imageSrc={'../img/placeholder.svg'}
      ctaText="Cta Text Test"
      ctaAction={mockFunction}
      className="custom-class"
      data-testid="csc-test"
    />
  );

  expect(screen.getByTestId('csc-test')).toMatchInlineSnapshot(`
<div
  class="ods-cross-sell-card custom-class"
  data-testid="csc-test"
>
  <a
    class="ods-cross-sell-card__content"
    data-testid="cta-test"
    style="background: rgb(0, 37, 224);"
  >
    <div
      class="ods-cross-sell-card__information"
    >
      <div
        class="ods-typography--inverse ods-typography__heading3"
        style="color: white;"
      >
        Title Test
      </div>
      <div
        class="ods-typography--inverse ods-typography__description ods-cross-sell-card__description"
        style="color: rgb(184, 195, 255);"
      >
        Description Test
      </div>
    </div>
    <img
      class="ods-cross-sell-card__image"
      src="../img/placeholder.svg"
    />
  </a>
  <button
    class="ods-cross-sell-card__cta"
  >
    Cta Text Test
     
    <span
      class="ods-cross-sell-card__cta-icon"
    >
      <svg
        fill="currentColor"
        height="24"
        viewBox="0 0 20 20"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          fill-rule="evenodd"
        />
      </svg>
    </span>
  </button>
</div>
`);
});

test('action is being fired', () => {
  render(
    <CrossSellCard
      title="Title Test"
      description="Description Test"
      imageSrc={'../img/placeholder.svg'}
      ctaText="Cta Text Test"
      ctaAction={mockFunction}
      className="custom-class"
    />
  );

  fireEvent.click(screen.getByTestId('cta-test'));
  expect(mockFunction).toHaveBeenCalledTimes(1);
});

test('renders component with custom icon', () => {
  render(
    <CrossSellCard
      title="Card Title"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      imageSrc={'../img/placeholder.svg'}
      ctaText="Call To Action"
      ctaAction={mockFunction}
      className="custom-class"
      data-testid="csc-test"
      customIcon={<ChevronLeft />}
    />
  );

  expect(screen.getByTestId('csc-test')).toMatchInlineSnapshot(`
<div
  class="ods-cross-sell-card custom-class"
  data-testid="csc-test"
>
  <a
    class="ods-cross-sell-card__content"
    data-testid="cta-test"
    style="background: rgb(0, 37, 224);"
  >
    <div
      class="ods-cross-sell-card__information"
    >
      <div
        class="ods-typography--inverse ods-typography__heading3"
        style="color: white;"
      >
        Card Title
      </div>
      <div
        class="ods-typography--inverse ods-typography__description ods-cross-sell-card__description"
        style="color: rgb(184, 195, 255);"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>
    <img
      class="ods-cross-sell-card__image"
      src="../img/placeholder.svg"
    />
  </a>
  <button
    class="ods-cross-sell-card__cta"
  >
    Call To Action
     
    <span
      class="ods-cross-sell-card__cta-icon"
    >
      <svg
        fill="currentColor"
        height="24"
        viewBox="0 0 20 20"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          fill-rule="evenodd"
        />
      </svg>
    </span>
  </button>
</div>
`);
});

test('renders custom component', () => {
  render(
    <CrossSellCard
      title="Card Title"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      imageSrc={'../img/placeholder.svg'}
      ctaText="Call To Action"
      ctaAction={mockFunction}
      className="custom-class"
      data-testid="csc-test"
    />
  );

  expect(screen.getByTestId('csc-test')).toMatchInlineSnapshot(`
<div
  class="ods-cross-sell-card custom-class"
  data-testid="csc-test"
>
  <a
    class="ods-cross-sell-card__content"
    data-testid="cta-test"
    style="background: rgb(0, 37, 224);"
  >
    <div
      class="ods-cross-sell-card__information"
    >
      <div
        class="ods-typography--inverse ods-typography__heading3"
        style="color: white;"
      >
        Card Title
      </div>
      <div
        class="ods-typography--inverse ods-typography__description ods-cross-sell-card__description"
        style="color: rgb(184, 195, 255);"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>
    <img
      class="ods-cross-sell-card__image"
      src="../img/placeholder.svg"
    />
  </a>
  <button
    class="ods-cross-sell-card__cta"
  >
    Call To Action
     
    <span
      class="ods-cross-sell-card__cta-icon"
    >
      <svg
        fill="currentColor"
        height="24"
        viewBox="0 0 20 20"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          fill-rule="evenodd"
        />
      </svg>
    </span>
  </button>
</div>
`);
});
