import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SuccessScreen from '../SuccessScreen';

test('renders the default positive screen and forwards its ref and attributes', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <SuccessScreen
      ref={ref}
      title="Payment complete"
      data-testid="success-screen"
      className="custom-screen"
      tagLabel="Paid"
      description="The payment is complete."
      extraInformation="Nov 12, 9:15 AM"
    >
      <span>Payment summary</span>
    </SuccessScreen>
  );

  const root = screen.getByTestId('success-screen');
  expect(root).toHaveClass(
    'ods-success-screen',
    'ods-success-screen--positive',
    'custom-screen'
  );
  expect(ref.current).toBe(root);
  expect(screen.getByText('Payment complete')).toBeInTheDocument();
  expect(screen.getByText('The payment is complete.')).toBeInTheDocument();
  expect(screen.getByText('Paid').closest('.ods-tag')).toHaveClass(
    'ods-tag--translucent',
    'ods-tag--positive'
  );
  expect(screen.getByText('Payment summary')).toBeInTheDocument();
  expect(screen.getByText('Nov 12, 9:15 AM')).toHaveClass(
    'ods-success-screen__extra-information'
  );
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders the neutral Tag with its default calendar icon and omits optional content', () => {
  render(
    <SuccessScreen
      status="neutral"
      title="Payment pending"
      tagLabel="Processing"
    />
  );

  expect(
    screen.getByText('Payment pending').closest('.ods-success-screen')
  ).toHaveClass('ods-success-screen--neutral');
  expect(screen.queryByText('Description')).not.toBeInTheDocument();
  expect(screen.queryByText('Nov 12, 9:15 AM')).not.toBeInTheDocument();
  expect(screen.getByText('Processing').closest('.ods-tag')).toHaveClass(
    'ods-tag--neutral-02',
    'ods-tag--translucent'
  );
});

test('renders the neutral Tag with the provided icon and label', () => {
  render(
    <SuccessScreen
      status="neutral"
      title="Payment processing"
      tagLabel="Processing"
      tagIcon={<svg data-testid="custom-tag-icon" />}
    />
  );

  expect(screen.getByTestId('custom-tag-icon')).toBeInTheDocument();
  expect(screen.getByText('Processing').closest('.ods-tag')).toHaveClass(
    'ods-tag--neutral-02',
    'ods-tag--translucent'
  );
});

test('renders the negative Tag with its default XCircle icon', () => {
  render(
    <SuccessScreen
      status="negative"
      title="Payment not completed"
      tagLabel="Not completed"
    />
  );

  expect(
    screen.getByText('Payment not completed').closest('.ods-success-screen')
  ).toHaveClass('ods-success-screen--negative');
  expect(screen.getByText('Not completed').closest('.ods-tag')).toHaveClass(
    'ods-tag--neutral',
    'ods-tag--translucent'
  );
});

test('renders desktop actions and calls their handlers', () => {
  const onPrimaryClick = jest.fn();
  const onSecondaryClick = jest.fn();
  render(
    <SuccessScreen
      title="Payment complete"
      primaryAction={{ label: 'View payment', onClick: onPrimaryClick }}
      secondaryAction={{ label: 'Done', onClick: onSecondaryClick }}
    />
  );

  expect(screen.getAllByRole('button')).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', { name: 'View payment' }));
  fireEvent.click(screen.getByRole('button', { name: 'Done' }));
  expect(onPrimaryClick).toHaveBeenCalledTimes(1);
  expect(onSecondaryClick).toHaveBeenCalledTimes(1);
});

test('does not submit a containing form when actions or the close button are clicked', () => {
  const onSubmit = jest.fn();
  const onPrimaryClick = jest.fn();
  const onSecondaryClick = jest.fn();
  const onClose = jest.fn();

  render(
    <form onSubmit={onSubmit}>
      <SuccessScreen
        title="Payment complete"
        showTopBar
        onClose={onClose}
        primaryAction={{ label: 'View payment', onClick: onPrimaryClick }}
        secondaryAction={{ label: 'Done', onClick: onSecondaryClick }}
      />
    </form>
  );

  fireEvent.click(screen.getByRole('button', { name: 'View payment' }));
  fireEvent.click(screen.getByRole('button', { name: 'Done' }));
  fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));

  expect(onSubmit).not.toHaveBeenCalled();
  expect(onPrimaryClick).toHaveBeenCalledTimes(1);
  expect(onSecondaryClick).toHaveBeenCalledTimes(1);
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('renders only a passed action, including when it has no click handler', () => {
  render(
    <SuccessScreen
      title="Payment complete"
      primaryAction={{ label: 'Continue' }}
    />
  );

  expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
});

test('shows the mobile Top Bar and calls onClose', () => {
  const onClose = jest.fn();
  render(
    <SuccessScreen
      title="Payment complete"
      showTopBar
      onClose={onClose}
      primaryAction={{ label: 'Continue' }}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
});

test('keeps desktop actions out of the mobile layout through CSS classes', () => {
  render(<SuccessScreen title="Payment complete" showTopBar />);

  expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Continue' })
  ).not.toBeInTheDocument();
});

test('allows overriding the close button accessible label', () => {
  render(
    <SuccessScreen
      title="Payment complete"
      showTopBar
      closeButtonAriaLabel="Dismiss"
    />
  );

  expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
});

test('accepts a custom icon for positive and negative status Tags', () => {
  render(
    <>
      <SuccessScreen
        status="positive"
        title="Positive result"
        tagLabel="Paid"
        tagIcon={<svg data-testid="positive-tag-icon" />}
      />
      <SuccessScreen
        status="negative"
        title="Negative result"
        tagLabel="Not completed"
        tagIcon={<svg data-testid="negative-tag-icon" />}
      />
    </>
  );

  expect(screen.getByTestId('positive-tag-icon')).toBeInTheDocument();
  expect(screen.getByTestId('negative-tag-icon')).toBeInTheDocument();
});
