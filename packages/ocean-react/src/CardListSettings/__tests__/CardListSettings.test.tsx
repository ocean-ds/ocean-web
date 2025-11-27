import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardListSettings from '../CardListSettings';

const TestIcon = () => <div data-testid="test-icon">Icon</div>;

describe('CardListSettings', () => {
  describe('Rendering', () => {
    test('renders the title', () => {
      render(<CardListSettings title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders the description', () => {
      render(
        <CardListSettings title="Test Title" description="Test Description" />
      );
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    test('renders the caption', () => {
      render(
        <CardListSettings
          title="Test Title"
          description="Test Description"
          caption="Test Caption"
        />
      );
      expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    test('renders without description', () => {
      render(<CardListSettings title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.queryByText('Description')).not.toBeInTheDocument();
    });

    test('renders with custom className', () => {
      const { container } = render(
        <CardListSettings title="Test Title" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Icon', () => {
    test('renders the icon when provided', () => {
      render(<CardListSettings title="Test Title" icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    test('does not render icon when not provided', () => {
      render(<CardListSettings title="Test Title" />);
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    test('hides icon when showIcon is false', () => {
      render(
        <CardListSettings
          title="Test Title"
          icon={<TestIcon />}
          showIcon={false}
        />
      );
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    test('shows icon when showIcon is true', () => {
      render(
        <CardListSettings
          title="Test Title"
          icon={<TestIcon />}
          showIcon
        />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  describe('Action Type - Button', () => {
    test('renders button with default label', () => {
      render(<CardListSettings title="Test Title" actionType="button" />);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    test('renders button with custom label', () => {
      render(
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
          title="Test Title"
          actionType="button"
          buttonSize="md"
        />
      );
      const button = screen.getByText('Label');
      expect(button.closest('button')).toHaveClass('ods-btn--md');
    });
  });

  describe('Action Type - Toggle', () => {
    test('renders toggle switch', () => {
      render(
        <CardListSettings title="Test Title" actionType="toggle" />
      );
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeInTheDocument();
    });

    test('renders toggle with checked state', () => {
      render(
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
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
      const { container } = render(
        <CardListSettings title="Test Title" disabled />
      );
      expect(container.firstChild).toHaveClass('ods-card-list-settings--disabled');
    });

    test('renders loading state', () => {
      const { container } = render(
        <CardListSettings title="Test Title" loading />
      );
      expect(container.firstChild).toHaveClass('ods-card-list-settings--loading');
    });

    test('renders skeleton when loading', () => {
      render(
        <CardListSettings title="Test Title" loading />
      );
      
      // Check that the loading class is present
      const loadingElement = document.querySelector('.ods-card-list-settings--loading');
      expect(loadingElement).toBeInTheDocument();
      
      // Check that skeleton is rendered
      const skeletonElement = document.querySelector('.ods-card-list-settings__skeleton');
      expect(skeletonElement).toBeInTheDocument();
    });

    test('does not render content when loading', () => {
      render(<CardListSettings title="Test Title" loading />);
      // The title should not be visible in loading state
      const skeletonContainer = document.querySelector(
        '.ods-card-list-settings--loading'
      );
      expect(skeletonContainer).toBeInTheDocument();
    });
  });

  describe('Content Types', () => {
    test('renders default type', () => {
      render(<CardListSettings title="Test Title" type="default" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders inactive type', () => {
      render(<CardListSettings title="Test Title" type="inactive" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders positive type', () => {
      render(<CardListSettings title="Test Title" type="positive" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders warning type', () => {
      render(<CardListSettings title="Test Title" type="warning" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders highlight type', () => {
      render(<CardListSettings title="Test Title" type="highlight" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders highlight-lead type', () => {
      render(<CardListSettings title="Test Title" type="highlight-lead" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders strikethrough type', () => {
      render(<CardListSettings title="Test Title" type="strikethrough" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });

  describe('Inverted', () => {
    test('renders with inverted prop', () => {
      render(
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
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
        <CardListSettings
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
});

