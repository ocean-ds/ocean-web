import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CrossSellCard from '../CrossSellCard';

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
      <div
        class="ods-cross-sell-card__content"
        data-testid="cta-test"
      >
        <div
          class="ods-cross-sell-card__information"
        >
          <div
            class="ods-typography--inverse ods-typography__heading3"
          >
            Title Test
          </div>
          <div
            class="ods-typography--inverse ods-typography__description ods-cross-sell-card__description "
          >
            Description Test
          </div>
        </div>
        <img
          class="ods-cross-sell-card__image"
          src="../img/placeholder.svg"
        />
      </div>
      <button
        class="ods-cross-sell-card__cta"
      >
        Cta Text Test
         
        <svg
          class="ods-cross-sell-card__cta-icon"
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
