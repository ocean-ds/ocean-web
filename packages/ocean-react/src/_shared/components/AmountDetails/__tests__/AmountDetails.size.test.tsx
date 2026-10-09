import React from 'react';
import { render, screen } from '@testing-library/react';
import AmountDetails from '../AmountDetails';

const root = () => document.querySelector('.ods-amount-details') as HTMLElement;

const tagElement = (): HTMLElement =>
  document.querySelector('.ods-tag') as HTMLElement;

describe('AmountDetails size, strikethrough and tag', () => {
  test('without size keeps the original markup (no size modifiers)', () => {
    render(<AmountDetails amount="R$ 1,00" indicator={<span>Tag</span>} />);

    expect(root()).toHaveClass('ods-amount-details', { exact: true });
    expect(screen.getByText('R$ 1,00')).toHaveClass(
      'ods-amount-details__amount',
      { exact: true }
    );
    expect(
      document.querySelector('.ods-amount-details__indicator')
    ).toHaveClass('ods-amount-details__indicator', { exact: true });
  });

  test.each(['md', 'sm'] as const)('size %s adds the modifiers', (size) => {
    render(<AmountDetails amount="R$ 1,00" size={size} />);

    expect(root()).toHaveClass(`ods-amount-details--${size}`);
    expect(screen.getByText('R$ 1,00')).toHaveClass(
      'ods-amount-details__amount--sized'
    );
  });

  test('negative with size marks sign and amount as sized', () => {
    render(<AmountDetails amount="R$ 1,00" type="negative" size="md" />);

    expect(screen.getByText('-')).toHaveClass(
      'ods-amount-details__amount-sign--sized'
    );
    expect(screen.getByText('R$ 1,00')).toHaveClass(
      'ods-amount-details__amount--sized'
    );
  });

  test('negative without size keeps the original classes', () => {
    render(<AmountDetails amount="R$ 1,00" type="negative" />);

    expect(screen.getByText('-')).toHaveClass(
      'ods-amount-details__amount-sign',
      { exact: true }
    );
  });

  test.each(['strikethrough', 'strikethrough-neutral'] as const)(
    '%s renders the struck amount before the current amount',
    (type) => {
      render(
        <AmountDetails
          amount="Grátis"
          strikethroughAmount="R$ 3,99"
          type={type}
          size="sm"
        />
      );

      const struck = screen.getByText('R$ 3,99');
      expect(struck).toHaveClass('ods-amount-details__strikethrough');
      expect(screen.getByText('Grátis')).toHaveClass(
        `ods-amount-details__amount--${type}`,
        'ods-amount-details__amount--sized'
      );
      expect(struck.parentElement).toHaveClass(
        'ods-amount-details__amount-row--strikethrough'
      );
      expect(struck.nextElementSibling).toBe(screen.getByText('Grátis'));
    }
  );

  test('strikethrough without struck amount only renders the amount', () => {
    render(<AmountDetails amount="Grátis" type="strikethrough" />);

    expect(
      document.querySelector('.ods-amount-details__strikethrough')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Grátis')).toHaveClass(
      'ods-amount-details__amount ods-amount-details__amount--strikethrough',
      { exact: true }
    );
  });

  test('inactive with size marks the block as inactive', () => {
    render(<AmountDetails amount="R$ 1,00" type="inactive" size="md" />);

    expect(root()).toHaveClass('ods-amount-details--inactive');
  });

  test('inactive without size keeps the original markup', () => {
    render(<AmountDetails amount="R$ 1,00" type="inactive" />);

    expect(root()).not.toHaveClass('ods-amount-details--inactive');
  });

  test('tag follows the size: md → medium, sm → small, positive by default, no icon', () => {
    const { rerender } = render(
      <AmountDetails amount="R$ 1,00" size="md" tag={{ label: 'Label' }} />
    );

    let tag = tagElement();
    expect(tag).toHaveClass('ods-tag--medium', 'ods-tag--positive');
    expect(tag.querySelector('svg')).not.toBeInTheDocument();
    expect(tag.parentElement).not.toHaveClass(
      'ods-amount-details__indicator--medium'
    );

    rerender(
      <AmountDetails
        amount="R$ 1,00"
        size="sm"
        tag={{ label: 'Label', type: 'warning', setIconOff: false }}
      />
    );

    tag = tagElement();
    expect(tag).toHaveClass('ods-tag--small', 'ods-tag--warning');
  });

  test('tag turns neutral when the type is inactive', () => {
    render(
      <AmountDetails
        amount="R$ 1,00"
        size="sm"
        type="inactive"
        tag={{ label: 'Label', type: 'positive' }}
      />
    );

    expect(tagElement()).toHaveClass('ods-tag--neutral');
  });

  test('tag takes precedence over the indicator', () => {
    render(
      <AmountDetails
        amount="R$ 1,00"
        tag={{ label: 'Label' }}
        indicator={<span>Indicator</span>}
      />
    );

    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.queryByText('Indicator')).not.toBeInTheDocument();
  });

  test('indicator size is derived from size when not passed', () => {
    render(
      <AmountDetails amount="R$ 1,00" size="md" indicator={<span>Tag</span>} />
    );

    expect(
      document.querySelector('.ods-amount-details__indicator')
    ).toHaveClass('ods-amount-details__indicator--medium');
  });

  test('explicit indicatorSize wins over size', () => {
    render(
      <AmountDetails
        amount="R$ 1,00"
        size="md"
        indicatorSize="small"
        indicator={<span>Tag</span>}
      />
    );

    expect(
      document.querySelector('.ods-amount-details__indicator')
    ).not.toHaveClass('ods-amount-details__indicator--medium');
  });

  test('the tag keeps its full label as a tooltip', () => {
    const label = 'Payment scheduled for Oct 15 by bank transfer';
    render(
      <AmountDetails
        amount="R$ 1.314,28"
        size="md"
        tag={{ label, type: 'complementary' }}
      />
    );

    expect(screen.getByText(label).closest('.ods-tag')).toHaveAttribute(
      'title',
      label
    );
  });

  test('a tag with a node label has no tooltip', () => {
    render(
      <AmountDetails
        amount="R$ 1.314,28"
        size="md"
        tag={{ label: <span>Processing</span> }}
      />
    );

    expect(
      screen.getByText('Processing').closest('.ods-tag')
    ).not.toHaveAttribute('title');
  });
});
