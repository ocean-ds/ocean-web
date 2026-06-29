import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Banner, { BannerProps } from '../Banner';

const setup = (props: Partial<BannerProps> = {}) => {
  const defaultProps: BannerProps = {
    title: 'Test Title',
    image: 'http://example.com/img.png',
    ...props,
  } as BannerProps;
  return render(<Banner {...defaultProps} />);
};

describe('Banner', () => {
  test('renders the title', () => {
    setup({ title: 'Hello Banner' });
    expect(screen.getByText('Hello Banner')).toBeInTheDocument();
  });

  test('renders the description when provided', () => {
    setup({ description: 'Some description text' });
    expect(screen.getByText('Some description text')).toBeInTheDocument();
  });

  test('does not render the description when absent', () => {
    setup();
    expect(screen.queryByText('Some description text')).not.toBeInTheDocument();
  });

  test.each(['large', 'small'] as const)(
    'renders the image when provided (%s)',
    (size) => {
      setup({ size, image: 'http://example.com/img.png' });
      const img = document.querySelector(
        '.ods-banner__image'
      ) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('http://example.com/img.png');
    }
  );

  test('does not render the image area when image is absent (small)', () => {
    setup({ size: 'small', image: undefined });
    expect(
      document.querySelector('.ods-banner__image')
    ).not.toBeInTheDocument();
  });

  test('renders primaryAction button when provided', () => {
    setup({ primaryAction: { label: 'Primary', onClick: jest.fn() } });
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  test('renders both actions when provided', () => {
    setup({
      primaryAction: { label: 'Primary', onClick: jest.fn() },
      secondaryAction: { label: 'Secondary', onClick: jest.fn() },
    });
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  test('does not render actions area when no actions are provided', () => {
    setup();
    expect(
      document.querySelector('.ods-banner__actions')
    ).not.toBeInTheDocument();
  });

  test('calls onClick when primaryAction button is clicked', () => {
    const mockFn = jest.fn();
    setup({ primaryAction: { label: 'Click Me', onClick: mockFn } });
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('defaults size to large when not specified', () => {
    setup();
    expect(document.querySelector('.ods-banner--large')).toBeInTheDocument();
  });

  test.each(['large', 'small'] as const)('applies %s size class', (size) => {
    setup({ size });
    expect(document.querySelector(`.ods-banner--${size}`)).toBeInTheDocument();
  });

  test.each(['default', 'warning', 'negative', 'emphasys'] as const)(
    'applies %s type class',
    (type) => {
      setup({ type });
      expect(
        document.querySelector(`.ods-banner--${type}`)
      ).toBeInTheDocument();
    }
  );

  test.each([
    ['default', '.ods-btn--primary', '.ods-btn--tertiary'],
    ['warning', '.ods-btn--primary-warning', '.ods-btn--tertiary-warning'],
    ['negative', '.ods-btn--primary-critical', '.ods-btn--tertiary-critical'],
    ['emphasys', '.ods-btn--secondary', '.ods-btn--tertiary'],
  ] as const)(
    'renders correct button variants for %s type',
    (type, primarySelector, secondarySelector) => {
      setup({
        type,
        primaryAction: { label: 'Primary', onClick: jest.fn() },
        secondaryAction: { label: 'Secondary', onClick: jest.fn() },
      });
      expect(document.querySelector(primarySelector)).toBeInTheDocument();
      expect(document.querySelector(secondarySelector)).toBeInTheDocument();
    }
  );

  test('forwards extra className', () => {
    setup({ className: 'my-custom-class' });
    expect(document.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  test.each([
    ['large', '.ods-banner__image-wrapper--top'],
    ['small', '.ods-banner__image-wrapper--side'],
  ] as const)(
    'renders image in correct wrapper for %s size',
    (size, selector) => {
      setup({ size, image: 'http://example.com/img.png' });
      expect(document.querySelector(selector)).toBeInTheDocument();
    }
  );
});
