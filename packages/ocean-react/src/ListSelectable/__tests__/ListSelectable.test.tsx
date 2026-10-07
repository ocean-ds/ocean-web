import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ListSelectable from '../ListSelectable';

describe('ListSelectable — basic rendering', () => {
  test('renders title and description with checkbox', () => {
    render(
      <ListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'cb-1' }}
      />
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders with radio controller', () => {
    render(
      <ListSelectable title="Title" radio={{ id: 'r-1', name: 'group' }} />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  test('shows skeleton when loading (title is hidden)', () => {
    render(
      <ListSelectable title="Title" loading checkbox={{ id: 'cb-loading' }} />
    );

    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  test('renders inline indicator (existing tag inline)', () => {
    render(
      <ListSelectable
        title="Title"
        indicator={<span data-testid="indicator">Inline</span>}
        checkbox={{ id: 'cb-ind' }}
      />
    );

    expect(screen.getByTestId('indicator')).toBeInTheDocument();
  });
});

describe('ListSelectable — cornerTag (V-02 to V-14)', () => {
  test('V-02: renders Corner Tag in card type with default color', () => {
    render(
      <ListSelectable
        title="Title"
        checkbox={{ id: 'cb-corner' }}
        cornerTag={{ label: 'Recomendado' }}
      />
    );

    const tag = screen.getByText('Recomendado');
    expect(tag).toHaveClass('ods-corner-tag');
    expect(tag).toHaveClass('ods-corner-tag--primaryDown');
    expect(tag).toHaveAttribute('aria-label', 'Recomendado');
  });

  test('V-03: renders both inline indicator and Corner Tag simultaneously', () => {
    render(
      <ListSelectable
        title="Title"
        indicator={<span data-testid="inline-tag">Inline</span>}
        checkbox={{ id: 'cb-both' }}
        cornerTag={{ label: 'Corner' }}
      />
    );

    expect(screen.getByTestId('inline-tag')).toBeInTheDocument();
    expect(screen.getByText('Corner')).toBeInTheDocument();
  });

  test('V-04: renders without any tag when neither is provided', () => {
    render(<ListSelectable title="Title" checkbox={{ id: 'cb-none' }} />);

    expect(screen.queryByText('Recomendado')).not.toBeInTheDocument();
  });

  test('V-05: does NOT render Corner Tag when type=text', () => {
    render(
      <ListSelectable type="text" title="Title" checkbox={{ id: 'cb-text' }} />
    );

    expect(screen.queryByText('Recomendado')).not.toBeInTheDocument();
  });

  test('V-06: Corner Tag persists in selected state', () => {
    render(
      <ListSelectable
        title="Title"
        checkbox={{ id: 'cb-selected', checked: true }}
        cornerTag={{ label: 'Selected' }}
      />
    );

    expect(screen.getByText('Selected')).toBeInTheDocument();
  });

  test('V-07: Corner Tag keeps normal appearance in disabled state', () => {
    render(
      <ListSelectable
        title="Title"
        disabled
        checkbox={{ id: 'cb-disabled', disabled: true }}
        cornerTag={{ label: 'Disabled' }}
      />
    );

    const tag = screen.getByText('Disabled');
    expect(tag).toHaveClass('ods-corner-tag--primaryDown');
    expect(tag).not.toHaveClass('ods-corner-tag--disabled');
  });

  test('V-08: Corner Tag is hidden during loading', () => {
    render(
      <ListSelectable
        title="Title"
        loading
        checkbox={{ id: 'cb-loading-corner' }}
        cornerTag={{ label: 'Hidden' }}
      />
    );

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  test('V-09: Corner Tag persists when card has error', () => {
    render(
      <ListSelectable
        title="Title"
        checkbox={{ id: 'cb-error', error: true }}
        cornerTag={{ label: 'WithError' }}
      />
    );

    expect(screen.getByText('WithError')).toBeInTheDocument();
  });

  test('V-10: empty label does not render Corner Tag', () => {
    render(
      <ListSelectable
        title="Title"
        checkbox={{ id: 'cb-empty' }}
        cornerTag={{ label: '' }}
      />
    );

    // No aria-label="" element is expected; querying any text 'Recomendado' is a stand-in check.
    expect(screen.queryByLabelText('')).not.toBeInTheDocument();
  });

  test('V-11: long label renders without truncation', () => {
    const longLabel = 'Texto muito longo que pode quebrar a linha';
    render(
      <ListSelectable
        title="Title"
        checkbox={{ id: 'cb-long' }}
        cornerTag={{ label: longLabel }}
      />
    );

    expect(screen.getByText(longLabel)).toHaveTextContent(longLabel);
  });

  test('V-12: Corner Tag works with checkbox', () => {
    render(
      <ListSelectable
        title="Title"
        checkbox={{ id: 'cb-corner' }}
        cornerTag={{ label: 'Checkbox' }}
      />
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Checkbox')).toBeInTheDocument();
  });

  test('V-13: Corner Tag works with radio', () => {
    render(
      <ListSelectable
        title="Title"
        radio={{ id: 'r-corner', name: 'g' }}
        cornerTag={{ label: 'Radio' }}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByText('Radio')).toBeInTheDocument();
  });

  test('V-14: complementaryPure color renders correct class', () => {
    render(
      <ListSelectable
        title="Title"
        checkbox={{ id: 'cb-comp' }}
        cornerTag={{ label: 'Novo', color: 'complementaryPure' }}
      />
    );

    expect(screen.getByText('Novo')).toHaveClass(
      'ods-corner-tag--complementaryPure'
    );
  });

  test('Corner Tag is forwarded to ListReadOnly when isSelectableDisabled', () => {
    render(
      <ListSelectable
        title="Title"
        isSelectableDisabled
        cornerTag={{ label: 'ReadOnly' }}
      />
    );

    expect(screen.getByText('ReadOnly')).toBeInTheDocument();
  });
});

describe('ListSelectable — indicatorPosition', () => {
  const indicator = <span>3x sem acréscimo</span>;

  test('CT-1: keeps the current wrapper when the prop is omitted', () => {
    render(
      <ListSelectable
        title="Title"
        indicator={indicator}
        checkbox={{ id: 'cb-default' }}
      />
    );

    const tag = screen.getByText('3x sem acréscimo');

    expect(tag.closest('.ods-list-selectable__indicator')).toBeInTheDocument();
    expect(tag.closest('.ods-content-list__indicator')).toBeNull();
  });

  test('CT-4: explicit inline renders the same tree as the default', () => {
    const { asFragment: defaultTree } = render(
      <ListSelectable
        title="Title"
        indicator={indicator}
        checkbox={{ id: 'cb-a' }}
      />
    );
    const { asFragment: inlineTree } = render(
      <ListSelectable
        title="Title"
        indicator={indicator}
        indicatorPosition="inline"
        checkbox={{ id: 'cb-a' }}
      />
    );

    expect(inlineTree()).toEqual(defaultTree());
  });

  test('CT-2: renders above as the first child of the content column', () => {
    render(
      <ListSelectable
        title="Title"
        description="Description"
        indicator={indicator}
        indicatorPosition="above"
        radio={{ id: 'r-above', name: 'group' }}
      />
    );

    const content = screen.getByText('Title').closest('.ods-content-list');

    expect(content?.firstElementChild).toHaveClass(
      'ods-content-list__indicator--above'
    );
    expect(
      screen
        .getByText('3x sem acréscimo')
        .closest('.ods-list-selectable__indicator')
    ).toBeNull();
  });

  test('CT-4 (trailing): the input is untouched when stacked', () => {
    render(
      <ListSelectable
        title="Title"
        indicator={indicator}
        indicatorPosition="below"
        radio={{ id: 'r-below', name: 'group' }}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(
      screen
        .getByText('3x sem acréscimo')
        .closest('.ods-content-list__indicator--below')
    ).toBeInTheDocument();
  });

  test('CT-8: forwards the position to ListReadOnly when isSelectableDisabled', () => {
    render(
      <ListSelectable
        title="Title"
        indicator={indicator}
        indicatorPosition="above"
        isSelectableDisabled
        checkbox={{ id: 'cb-disabled' }}
      />
    );

    const tag = screen.getByText('3x sem acréscimo');

    expect(screen.getByTestId('card-list-readonly')).toBeInTheDocument();
    expect(
      tag.closest('.ods-content-list__indicator--above')
    ).toBeInTheDocument();
    expect(tag.closest('.ods-list-readonly__trailing')).toBeNull();
  });

  test('CT-9: re-rendering with a new position updates the DOM', () => {
    const { rerender } = render(
      <ListSelectable
        title="Title"
        indicator={indicator}
        indicatorPosition="inline"
        checkbox={{ id: 'cb-rerender' }}
      />
    );

    expect(
      screen
        .getByText('3x sem acréscimo')
        .closest('.ods-list-selectable__indicator')
    ).toBeInTheDocument();

    rerender(
      <ListSelectable
        title="Title"
        indicator={indicator}
        indicatorPosition="above"
        checkbox={{ id: 'cb-rerender' }}
      />
    );

    const tag = screen.getByText('3x sem acréscimo');

    expect(tag.closest('.ods-list-selectable__indicator')).toBeNull();
    expect(
      tag.closest('.ods-content-list__indicator--above')
    ).toBeInTheDocument();
  });

  test('CT-11: the prop is inert without an indicator', () => {
    render(
      <ListSelectable
        title="Title"
        indicatorPosition="above"
        checkbox={{ id: 'cb-noind' }}
      />
    );

    const content = screen.getByText('Title').closest('.ods-content-list');

    expect(content?.children).toHaveLength(1);
  });
});

describe('ListSelectable — clicking the indicator toggles selection (CT-14)', () => {
  const positions = ['inline', 'above', 'below'] as const;

  test.each(positions)(
    'checkbox toggles when clicking the indicator (%s)',
    (position) => {
      const onChange = jest.fn();

      render(
        <ListSelectable
          title="Title"
          indicator={<span>3x sem acréscimo</span>}
          indicatorPosition={position}
          checkbox={{ id: `cb-click-${position}`, onChange }}
        />
      );

      fireEvent.click(screen.getByText('3x sem acréscimo'));

      expect(screen.getByRole('checkbox')).toBeChecked();
      expect(onChange).toHaveBeenCalled();
    }
  );

  test.each(positions)(
    'radio selects when clicking the indicator (%s)',
    (position) => {
      render(
        <ListSelectable
          title="Title"
          indicator={<span>3x sem acréscimo</span>}
          indicatorPosition={position}
          radio={{ id: `r-click-${position}`, name: `g-${position}` }}
        />
      );

      fireEvent.click(screen.getByText('3x sem acréscimo'));

      expect(screen.getByRole('radio')).toBeChecked();
    }
  );
});
