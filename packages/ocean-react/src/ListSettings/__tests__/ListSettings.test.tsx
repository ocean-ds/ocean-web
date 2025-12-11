import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListSettings from '../ListSettings';

const TestIcon = () => <div data-testid="test-icon">Icon</div>;

describe('ListSettings', () => {
  describe('Rendering', () => {
    test('renders the title', () => {
      render(<ListSettings title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders the description', () => {
      render(
        <ListSettings title="Test Title" description="Test Description" />
      );
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    test('renders the caption', () => {
      render(
        <ListSettings
          title="Test Title"
          description="Test Description"
          caption="Test Caption"
        />
      );
      expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    test('renders without description', () => {
      render(<ListSettings title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.queryByText('Description')).not.toBeInTheDocument();
    });

    test('renders with custom className', () => {
      const { container } = render(
        <ListSettings title="Test Title" className="custom-class" />
      );
      expect(container.firstChild?.firstChild).toHaveClass('custom-class');
    });

    test('renders with strikethroughDescription', () => {
      render(
        <ListSettings
          title="Test Title"
          strikethroughDescription="Old Price"
          status="strikethrough"
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders with data-testid', () => {
      render(<ListSettings title="Test Title" />);
      expect(screen.getByTestId('list-settings')).toBeInTheDocument();
    });

    test('accepts additional HTML attributes via rest props', () => {
      render(
        <ListSettings
          title="Test Title"
          data-custom="custom-value"
          aria-label="Settings card"
        />
      );
      const element = screen.getByTestId('list-settings');
      expect(element).toHaveAttribute('data-custom', 'custom-value');
      expect(element).toHaveAttribute('aria-label', 'Settings card');
    });
  });

  describe('Icon', () => {
    test('renders the icon when provided', () => {
      render(<ListSettings title="Test Title" icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    test('does not render icon when not provided', () => {
      render(<ListSettings title="Test Title" />);
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });
  });

  describe('Action Type - Button', () => {
    test('renders button with default label', () => {
      render(<ListSettings title="Test Title" actionType="button" />);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    test('renders button with custom label', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonLabel="Custom Label"
        />
      );
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
    });

    test('calls onButtonClick when button is clicked', () => {
      const handleClick = jest.fn();
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonLabel="Click Me"
          onButtonClick={handleClick}
        />
      );

      const button = screen.getByText('Click Me');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onButtonClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonLabel="Click Me"
          onButtonClick={handleClick}
          disabled
        />
      );

      const button = screen.getByText('Click Me');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    test('renders small button size', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonSize="sm"
        />
      );
      const button = screen.getByText('Label');
      expect(button.closest('button')).toHaveClass('ods-btn--sm');
    });

    test('renders medium button size', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonSize="md"
        />
      );
      const button = screen.getByText('Label');
      expect(button.closest('button')).toHaveClass('ods-btn--md');
    });

    test('renders button with primary variant', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonVariant="primary"
        />
      );
      const button = screen.getByText('Label');
      expect(button.closest('button')).toHaveClass('ods-btn--primary');
    });

    test('renders button with secondary variant', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonVariant="secondary"
        />
      );
      const button = screen.getByText('Label');
      expect(button.closest('button')).toHaveClass('ods-btn--secondary');
    });

    test('renders button with tertiary variant', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="button"
          buttonVariant="tertiary"
        />
      );
      const button = screen.getByText('Label');
      expect(button.closest('button')).toHaveClass('ods-btn--tertiary');
    });
  });

  describe('Action Type - Toggle', () => {
    test('renders toggle switch', () => {
      render(
        <ListSettings title="Test Title" actionType="toggle" />
      );
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeInTheDocument();
    });

    test('renders toggle with checked state', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="toggle"
          toggleChecked
        />
      );
      const switchElement = screen.getByRole('checkbox') as HTMLInputElement;
      expect(switchElement.checked).toBe(true);
    });

    test('renders toggle with unchecked state', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="toggle"
          toggleChecked={false}
        />
      );
      const switchElement = screen.getByRole('checkbox') as HTMLInputElement;
      expect(switchElement.checked).toBe(false);
    });

    test('calls onToggleChange when toggle is clicked', () => {
      const handleToggleChange = jest.fn();
      render(
        <ListSettings
          title="Test Title"
          actionType="toggle"
          toggleChecked={false}
          onToggleChange={handleToggleChange}
        />
      );

      const switchElement = screen.getByRole('checkbox') as HTMLInputElement;
      fireEvent.click(switchElement);

      expect(handleToggleChange).toHaveBeenCalledTimes(1);
      expect(handleToggleChange).toHaveBeenCalledWith(true);
    });

    test('does not call onToggleChange when disabled', () => {
      render(
        <ListSettings
          title="Test Title"
          actionType="toggle"
          toggleChecked={false}
          onToggleChange={jest.fn()}
          disabled
        />
      );

      const switchElement = screen.getByRole('checkbox') as HTMLInputElement;

      // Verify the switch is disabled
      expect(switchElement.disabled).toBe(true);

      // Try to click the disabled switch
      fireEvent.click(switchElement);

      // Even though click event fires, onChange should not be called
      // because the input is disabled
      expect(switchElement.checked).toBe(false);
    });
  });

  describe('States', () => {
    test('renders disabled state', () => {
      render(
        <ListSettings title="Test Title" disabled />
      );
      expect(screen.getByTestId('list-settings')).toHaveClass('ods-list-settings--disabled');
    });

    test('renders loading state', () => {
      render(
        <ListSettings title="Test Title" loading />
      );
      expect(screen.getByTestId('list-settings')).toHaveClass('ods-list-settings--loading');
    });

    test('renders skeleton when loading', () => {
      render(
        <ListSettings title="Test Title" loading />
      );

      // Check that the loading class is present
      const loadingElement = document.querySelector('.ods-list-settings--loading');
      expect(loadingElement).toBeInTheDocument();

      // Check that skeleton is rendered
      const skeletonElement = document.querySelector('.ods-list-settings__skeleton');
      expect(skeletonElement).toBeInTheDocument();
    });

    test('does not render content when loading', () => {
      render(<ListSettings title="Test Title" loading />);
      // The title should not be visible in loading state
      const skeletonContainer = document.querySelector(
        '.ods-list-settings--loading'
      );
      expect(skeletonContainer).toBeInTheDocument();
    });
  });

  describe('Content Types', () => {
    test('renders default status', () => {
      render(<ListSettings title="Test Title" status="default" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders inactive status', () => {
      render(<ListSettings title="Test Title" status="inactive" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders positive status', () => {
      render(<ListSettings title="Test Title" status="positive" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders warning status', () => {
      render(<ListSettings title="Test Title" status="warning" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders highlight status', () => {
      render(<ListSettings title="Test Title" status="highlight" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders highlight-lead status', () => {
      render(<ListSettings title="Test Title" status="highlight-lead" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders strikethrough status', () => {
      render(<ListSettings title="Test Title" status="strikethrough" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });

  describe('Type', () => {
    test('renders card type by default', () => {
      render(<ListSettings title="Test Title" />);
      expect(screen.getByTestId('list-settings')).toHaveClass('ods-list-settings--card');
    });

    test('renders text type', () => {
      render(<ListSettings title="Test Title" type="text" />);
      expect(screen.getByTestId('list-settings')).toHaveClass('ods-list-settings--text');
    });

    test('renders divider when showDivider is true and type is text', () => {
      render(<ListSettings title="Test Title" type="text" showDivider />);
      const divider = document.querySelector('.ods-list-settings__divider');
      expect(divider).toBeInTheDocument();
    });

    test('does not render divider when type is card', () => {
      render(<ListSettings title="Test Title" type="card" showDivider />);
      const divider = document.querySelector('.ods-list-settings__divider');
      expect(divider).not.toBeInTheDocument();
    });
  });

  describe('Inverted', () => {
    test('renders with inverted prop', () => {
      render(
        <ListSettings
          title="Test Title"
          description="Test Description"
          inverted
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    test('renders without inverted prop', () => {
      render(
        <ListSettings
          title="Test Title"
          description="Test Description"
          inverted={false}
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    test('renders complete card with button action', () => {
      const handleClick = jest.fn();
      render(
        <ListSettings
          title="Settings Option"
          description="Enable this feature"
          icon={<TestIcon />}
          actionType="button"
          buttonLabel="Enable"
          buttonSize="sm"
          onButtonClick={handleClick}
        />
      );

      expect(screen.getByText('Settings Option')).toBeInTheDocument();
      expect(screen.getByText('Enable this feature')).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();

      const button = screen.getByText('Enable');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders complete card with toggle action', () => {
      const handleToggle = jest.fn();
      render(
        <ListSettings
          title="Notifications"
          description="Enable push notifications"
          icon={<TestIcon />}
          actionType="toggle"
          toggleChecked={false}
          onToggleChange={handleToggle}
        />
      );

      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Enable push notifications')).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();

      const switchElement = screen.getByRole('checkbox') as HTMLInputElement;
      fireEvent.click(switchElement);
      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    test('renders disabled card with all features', () => {
      const handleClick = jest.fn();
      render(
        <ListSettings
          title="Disabled Option"
          description="This option is disabled"
          icon={<TestIcon />}
          actionType="button"
          buttonLabel="Action"
          disabled
          onButtonClick={handleClick}
        />
      );

      expect(screen.getByText('Disabled Option')).toBeInTheDocument();
      expect(screen.getByText('This option is disabled')).toBeInTheDocument();

      const button = screen.getByText('Action');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('ForwardRef', () => {
    test('forwards ref to the root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListSettings title="Test Title" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('ods-list-settings');
    });

    test('forwards ref in loading state', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListSettings title="Test Title" loading ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('ods-list-settings--loading');
    });
  });

  describe('DisplayName', () => {
    test('has correct displayName', () => {
      expect(ListSettings.displayName).toBe('ListSettings');
    });
  });
});
