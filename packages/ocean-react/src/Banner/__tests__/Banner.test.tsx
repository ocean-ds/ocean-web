import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Banner, { BannerProps } from '../Banner';

const setup = (props: Partial<BannerProps> = {}) => {
  const defaultProps: BannerProps = {
    size: 'large',
    title: 'Test Title',
    ...props,
  };
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

  test('renders the image when provided (large)', () => {
    setup({ size: 'large', image: 'http://example.com/img.png' });
    const img = document.querySelector('.ods-banner__image') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('http://example.com/img.png');
  });

  test('renders the image when provided (small)', () => {
    setup({ size: 'small', image: 'http://example.com/img.png' });
    const img = document.querySelector('.ods-banner__image') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('http://example.com/img.png');
  });

  test('does not render the image area when image is absent', () => {
    setup();
    expect(document.querySelector('.ods-banner__image')).not.toBeInTheDocument();
  });

  test('renders buttons when provided', () => {
    setup({
      buttons: [
        { label: 'Button One', onClick: jest.fn() },
        { label: 'Button Two', onClick: jest.fn() },
      ],
    });
    expect(screen.getByText('Button One')).toBeInTheDocument();
    expect(screen.getByText('Button Two')).toBeInTheDocument();
  });

  test('does not render buttons when buttons prop is absent', () => {
    setup();
    expect(document.querySelector('.ods-banner__actions')).not.toBeInTheDocument();
  });

  test('does not render buttons when buttons array is empty', () => {
    setup({ buttons: [] });
    expect(document.querySelector('.ods-banner__actions')).not.toBeInTheDocument();
  });

  test('renders at most 2 buttons even when more are provided', () => {
    setup({
      buttons: [
        { label: 'Btn 1', onClick: jest.fn() },
        { label: 'Btn 2', onClick: jest.fn() },
        { label: 'Btn 3', onClick: jest.fn() },
      ],
    });
    const buttons = document.querySelectorAll('.ods-banner__actions .ods-btn');
    expect(buttons.length).toBe(2);
    expect(screen.queryByText('Btn 3')).not.toBeInTheDocument();
  });

  test('calls onClick when a button is clicked', () => {
    const mockFn = jest.fn();
    setup({
      buttons: [{ label: 'Click Me', onClick: mockFn }],
    });
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('applies size class for large', () => {
    setup({ size: 'large' });
    expect(document.querySelector('.ods-banner--large')).toBeInTheDocument();
  });

  test('applies size class for small', () => {
    setup({ size: 'small' });
    expect(document.querySelector('.ods-banner--small')).toBeInTheDocument();
  });

  test('applies default type class', () => {
    setup({ type: 'default' });
    expect(document.querySelector('.ods-banner--default')).toBeInTheDocument();
  });

  test('applies warning type class', () => {
    setup({ type: 'warning' });
    expect(document.querySelector('.ods-banner--warning')).toBeInTheDocument();
  });

  test('applies negative type class', () => {
    setup({ type: 'negative' });
    expect(document.querySelector('.ods-banner--negative')).toBeInTheDocument();
  });

  test('applies emphasys type class', () => {
    setup({ type: 'emphasys' });
    expect(document.querySelector('.ods-banner--emphasys')).toBeInTheDocument();
  });

  test('renders inverse button variant for emphasys type', () => {
    setup({
      type: 'emphasys',
      buttons: [{ label: 'Emphasys Btn', onClick: jest.fn() }],
    });
    const btn = document.querySelector('.ods-btn--inverse');
    expect(btn).toBeInTheDocument();
  });

  test('renders primary button variant for default type', () => {
    setup({
      type: 'default',
      buttons: [{ label: 'Default Btn', onClick: jest.fn() }],
    });
    const btn = document.querySelector('.ods-btn--primary');
    expect(btn).toBeInTheDocument();
  });

  test('applies custom backgroundColor via inline style', () => {
    setup({ backgroundColor: 'rgb(255, 0, 0)' });
    const banner = document.querySelector('.ods-banner') as HTMLElement;
    expect(banner.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  test('forwards extra className', () => {
    setup({ className: 'my-custom-class' });
    expect(document.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  test('renders image in top wrapper for large size', () => {
    setup({ size: 'large', image: 'http://example.com/img.png' });
    expect(
      document.querySelector('.ods-banner__image-wrapper--top')
    ).toBeInTheDocument();
  });

  test('renders image in side wrapper for small size', () => {
    setup({ size: 'small', image: 'http://example.com/img.png' });
    expect(
      document.querySelector('.ods-banner__image-wrapper--side')
    ).toBeInTheDocument();
  });
});
