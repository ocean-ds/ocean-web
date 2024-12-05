import React from 'react';
import { render, screen } from '@testing-library/react';
import TextListItem, { TextListItemProps } from '../TextListItem';

describe('TextListItem', () => {
  const defaultProps: TextListItemProps = {
    title: 'Sample Title',
    description: 'Sample Description',
    caption: 'Sample Caption',
    tagLabel: 'New',
    infoText: 'Info Text',
    infoTextType: 'neutral',
    withAction: true,
    onActionClick: jest.fn(),
    className: 'custom-class',
  };

  test('should render with action and match snapshot', () => {
    const { asFragment } = render(
      <TextListItem
        title={defaultProps.title}
        description={defaultProps.description}
        caption={defaultProps.caption}
        withAction={defaultProps.withAction}
      />
    );
    expect(asFragment()).toMatchSnapshot(`
        <button
    class="ods-text-list-item--button"
    type="button"
  >
    <div
      class="ods-text-list-item ods-text-list-item--with-action"
    >
      <div
        class="ods-text-list-item__default-content"
      >
        <p
          class="ods-typography ods-typography__paragraph"
        >
          Sample Title
        </p>
        <p
          class="ods-typography ods-typography__description"
        >
          Sample Description
        </p>
        <p
          class="ods-typography ods-typography__captionbold"
        >
          Sample Caption
        </p>
      </div>
      <svg
        fill="currentColor"
        height="24"
        viewBox="0 0 20 20"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z"
          fill-rule="evenodd"
        />
      </svg>
    </div>
  </button>
    `);
  });

  test('should render with info text and match snapshot', () => {
    const { asFragment } = render(
      <TextListItem
        title={defaultProps.title}
        description={defaultProps.description}
        infoText={defaultProps.infoText}
        infoTextType={defaultProps.infoTextType}
      />
    );
    expect(asFragment()).toMatchSnapshot(`
        <button
    class="ods-text-list-item--button"
    type="button"
  >
    <div
      class="ods-text-list-item"
    >
      <div
        class="ods-text-list-item__default-content"
      >
        <p
          class="ods-typography ods-typography__paragraph"
        >
          Sample Title
        </p>
        <p
          class="ods-typography ods-typography__description"
        >
          Sample Description
        </p>
      </div>
      <p
        class="ods-typography ods-typography__description ods-text-list-item__info-text ods-text-list-item__info-text--neutral"
      >
        Info Text
      </p>
    </div>
  </button>
    `);
  });

  test('should render with a checkbox if the checkbox prop is provided', () => {
    const { asFragment } = render(
      <TextListItem
        title={defaultProps.title}
        description={defaultProps.description}
        checkbox={{ checked: false }}
      />
    );
    expect(screen.getByText('Sample Title')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(`
        <div
    class="ods-text-list-item-selectable"
  >
    <div
      class="ods-checkbox__root-container"
    >
      <label
        class="ods-checkbox__root"
      >
        <input
          class="ods-checkbox"
          type="checkbox"
        />
        <span
          class="ods-checkbox__checkmark"
        />
        <span
          class="ods-typography ods-typography__description ods-checkbox__label"
        >
          <button
            class="ods-text-list-item--button"
            type="button"
          >
            <div
              class="ods-text-list-item ods-text-list-item--selectable"
            >
              <div
                class="ods-text-list-item__default-content"
              >
                <p
                  class="ods-typography ods-typography__paragraph"
                >
                  Sample Title
                </p>
                <p
                  class="ods-typography ods-typography__description"
                >
                  Sample Description
                </p>
              </div>
            </div>
          </button>
        </span>
      </label>
    </div>
  </div>
    `);
  });

  test('should render with a radio if the radio prop is provided', () => {
    const { asFragment } = render(
      <TextListItem
        title={defaultProps.title}
        description={defaultProps.description}
        radio={{ checked: true }}
      />
    );
    expect(screen.getByText('Sample Title')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(`
      <div
    class="ods-text-list-item-selectable"
  >
    <label
      class="ods-radio__root"
    >
      <input
        checked=""
        class="ods-radio"
        type="radio"
      />
      <span
        class="ods-radio__checkmark"
      />
      <span
        class="ods-typography ods-typography__description ods-radio__label"
      >
        <button
          class="ods-text-list-item--button"
          type="button"
        >
          <div
            class="ods-text-list-item ods-text-list-item--selectable"
          >
            <div
              class="ods-text-list-item__default-content"
            >
              <p
                class="ods-typography ods-typography__paragraph"
              >
                Sample Title
              </p>
              <p
                class="ods-typography ods-typography__description"
              >
                Sample Description
              </p>
            </div>
          </div>
        </button>
      </span>
    </label>
  </div>
    `);
  });
});
