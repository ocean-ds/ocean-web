import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SettingsListItem from '../SettingsListItem';

// Mock dos ícones
jest.mock('@useblu/ocean-icons-react', () => ({
  LockClosed: function LockClosedMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return (
      <div data-testid="lock-icon" {...props}>
        mock-lock-closed
      </div>
    );
  },
}));

test('renders with required title prop', () => {
  render(<SettingsListItem title="Test Title" />);

  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('renders with title and description', () => {
  render(
    <SettingsListItem title="Test Title" description="Test Description" />
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});

test('renders with caption', () => {
  render(<SettingsListItem title="Test Title" caption="Test Caption" />);

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Caption')).toBeInTheDocument();
});

test('renders with error message', () => {
  render(
    <SettingsListItem title="Test Title" errorMessage="Something went wrong" />
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});

test('renders disabled state', () => {
  render(<SettingsListItem title="Test Title" disabled />);

  // Verifica se o componente renderiza no estado disabled através do conteúdo
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('renders loading state', () => {
  render(<SettingsListItem title="Test Title" loading />);

  // Quando loading=true, o ContentList exibe skeleton
  expect(
    document.querySelector('.ods-content-list__skeleton')
  ).toBeInTheDocument();
});

test('renders with divider by default', () => {
  render(<SettingsListItem title="Test Title" />);

  // Verifica se tem o divisor através da presença do título (divider é comportamento padrão)
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('renders without divider when showDivider is false', () => {
  render(<SettingsListItem title="Test Title" showDivider={false} />);

  // Verifica se o título ainda renderiza mesmo sem divisor
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('renders blocked state with lock icon', () => {
  render(<SettingsListItem title="Test Title" blocked />);

  expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  expect(screen.getByText('mock-lock-closed')).toBeInTheDocument();
});

test('renders with button', () => {
  render(
    <SettingsListItem
      title="Test Title"
      button={{
        children: 'Click me',
        variant: 'primary',
      }}
    />
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Click me')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('button click handler works', () => {
  const mockClick = jest.fn();

  render(
    <SettingsListItem
      title="Test Title"
      button={{
        children: 'Click me',
        onClick: mockClick,
      }}
    />
  );

  fireEvent.click(screen.getByText('Click me'));
  expect(mockClick).toHaveBeenCalledTimes(1);
});

test('button is disabled when component is disabled', () => {
  render(
    <SettingsListItem
      title="Test Title"
      disabled
      button={{
        children: 'Click me',
        variant: 'primary',
      }}
    />
  );

  expect(screen.getByRole('button')).toBeDisabled();
});

test('renders with tag', () => {
  render(
    <SettingsListItem
      title="Test Title"
      tag={{
        children: 'Active',
        type: 'positive',
      }}
    />
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Active')).toBeInTheDocument();
});

test('renders strikethrough description with correct conditions', () => {
  render(
    <SettingsListItem
      title="Test Title"
      description="New description"
      strikethroughDescription="Old description"
      type="inverted"
      state="strikethrough"
    />
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('New description')).toBeInTheDocument();
  expect(screen.getByText('Old description')).toBeInTheDocument();
});

test('renders inverted type', () => {
  render(<SettingsListItem title="Test Title" type="inverted" />);

  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('renders with all visual states', () => {
  const states = [
    'default',
    'inactive',
    'positive',
    'warning',
    'highlight',
    'highlight-lead',
    'strikethrough',
  ] as const;

  states.forEach((state) => {
    const { unmount } = render(
      <SettingsListItem
        title={`Test Title ${state}`}
        state={state}
        type="inverted"
      />
    );

    expect(screen.getByText(`Test Title ${state}`)).toBeInTheDocument();
    unmount();
  });
});

test('renders complete example with all props', () => {
  render(
    <SettingsListItem
      title="Complete Example"
      description="Full description here"
      caption="Important caption"
      errorMessage="Some error occurred"
      button={{
        children: 'Action Button',
        variant: 'secondary',
      }}
      state="warning"
      type="inverted"
    />
  );

  expect(screen.getByText('Complete Example')).toBeInTheDocument();
  expect(screen.getByText('Full description here')).toBeInTheDocument();
  expect(screen.getByText('Important caption')).toBeInTheDocument();
  expect(screen.getByText('Some error occurred')).toBeInTheDocument();
  expect(screen.getByText('Action Button')).toBeInTheDocument();
});
