import React from 'react';
import { render, screen } from '@testing-library/react';

import CornerTag from '../CornerTag';

test('renders with default color (primaryDown)', () => {
  render(<CornerTag label="Recomendado" />);

  const tag = screen.getByText('Recomendado');
  expect(tag).toHaveClass('ods-corner-tag');
  expect(tag).toHaveClass('ods-corner-tag--primaryDown');
  expect(tag).toHaveAttribute('aria-label', 'Recomendado');
});

test('renders with complementaryPure color', () => {
  render(<CornerTag label="Novo" color="complementaryPure" />);

  const tag = screen.getByText('Novo');
  expect(tag).toHaveClass('ods-corner-tag--complementaryPure');
});

test('does not render when label is empty', () => {
  const { container } = render(<CornerTag label="" />);

  expect(container).toBeEmptyDOMElement();
});

test('forwards additional class names', () => {
  render(<CornerTag label="Promo" className="custom-class" />);

  expect(screen.getByText('Promo')).toHaveClass('custom-class');
});

test('expands without truncation for long labels', () => {
  const longLabel = 'Texto muito longo que pode quebrar a linha';
  render(<CornerTag label={longLabel} />);

  const tag = screen.getByText(longLabel);
  expect(tag).toHaveTextContent(longLabel);
  expect(tag).toHaveAttribute('aria-label', longLabel);
});
