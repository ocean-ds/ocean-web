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
    expect(asFragment()).toMatchSnapshot();
  });

  test('keeps the chevron pointing right by default', () => {
    render(<TextListItem title="Title" description="Description" withAction />);

    expect(
      document.querySelector('.ods-text-list-item__chevron')
    ).not.toHaveClass('ods-text-list-item__chevron--flipped');
  });

  test('flips the chevron when chevronFlipped is true', () => {
    render(
      <TextListItem
        title="Title"
        description="Description"
        withAction
        chevronFlipped
      />
    );

    expect(document.querySelector('.ods-text-list-item__chevron')).toHaveClass(
      'ods-text-list-item__chevron--flipped'
    );
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
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render with a checkbox if the checkbox prop is provided', () => {
    const { asFragment } = render(
      <TextListItem
        title={defaultProps.title}
        description={defaultProps.description}
        checkbox={{ checked: false }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Sample Title')).toBeInTheDocument();
  });

  test('should render with a radio if the radio prop is provided', () => {
    const { asFragment } = render(
      <TextListItem
        title={defaultProps.title}
        description={defaultProps.description}
        radio={{ checked: true }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Sample Title')).toBeInTheDocument();
  });
});
