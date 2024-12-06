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
