import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import ContextualHero, { ContextualHeroAction } from '../ContextualHero';

type SingleAction = [ContextualHeroAction];
type TwoActions = [ContextualHeroAction, ContextualHeroAction];

const createAction = (label: string, onClick = jest.fn()): ContextualHeroAction => ({
  label,
  onClick,
});

describe('ContextualHero', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    listItems: [{ description: 'Item 1' }, { description: 'Item 2' }],
  };

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<ContextualHero {...defaultProps} />);

      expect(screen.getByTestId('contextual-hero')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders list items with description', () => {
      render(<ContextualHero {...defaultProps} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders list items with icons', () => {
      const listItems = [
        {
          icon: <PlaceholderOutline data-testid="icon-1" />,
          description: 'Item with icon',
        },
      ];

      render(<ContextualHero {...defaultProps} listItems={listItems} />);

      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
      expect(screen.getByText('Item with icon')).toBeInTheDocument();
    });

    it('renders ReactNode list items', () => {
      const listItems = [
        <div key="custom-1" data-testid="custom-item">
          Custom Item
        </div>,
      ];

      render(<ContextualHero {...defaultProps} listItems={listItems} />);

      expect(screen.getByTestId('custom-item')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ContextualHero {...defaultProps} className="custom-class" />);

      const hero = screen.getByTestId('contextual-hero');
      expect(hero).toHaveClass('custom-class', 'ods-contextual-hero');
    });
  });

  describe('Image', () => {
    it('renders image when provided as string', () => {
      render(<ContextualHero {...defaultProps} image="/test-image.png" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/test-image.png');
      expect(img).toHaveAttribute('alt', 'Test Title');
    });

    it('renders image when provided as ReactNode', () => {
      render(
        <ContextualHero
          {...defaultProps}
          image={<div data-testid="custom-image">Custom Image</div>}
        />
      );

      expect(screen.getByTestId('custom-image')).toBeInTheDocument();
    });

    it('does not render image section when not provided', () => {
      render(<ContextualHero {...defaultProps} />);

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('renders one action button', () => {
      const actions: SingleAction = [createAction('Primary Action')];

      render(<ContextualHero {...defaultProps} actions={actions} />);

      expect(screen.getByText('Primary Action')).toBeInTheDocument();
    });

    it('renders two action buttons', () => {
      const actions: TwoActions = [
        createAction('Primary Action'),
        createAction('Secondary Action'),
      ];

      render(<ContextualHero {...defaultProps} actions={actions} />);

      expect(screen.getByText('Primary Action')).toBeInTheDocument();
      expect(screen.getByText('Secondary Action')).toBeInTheDocument();
    });

    it('calls onClick when action buttons are clicked', () => {
      const handlePrimary = jest.fn();
      const handleSecondary = jest.fn();
      const actions: TwoActions = [
        createAction('Primary Action', handlePrimary),
        createAction('Secondary Action', handleSecondary),
      ];

      render(<ContextualHero {...defaultProps} actions={actions} />);

      fireEvent.click(screen.getByText('Primary Action'));
      expect(handlePrimary).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByText('Secondary Action'));
      expect(handleSecondary).toHaveBeenCalledTimes(1);
    });

    it('does not render actions section when not provided', () => {
      render(<ContextualHero {...defaultProps} />);

      expect(screen.queryByText('Primary Action')).not.toBeInTheDocument();
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ContextualHero {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('ods-contextual-hero');
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot with minimal props', () => {
      const { container } = render(<ContextualHero {...defaultProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with all props', () => {
      const { container } = render(
        <ContextualHero
          title="Full Title"
          description="Full Description"
          image="/test.png"
          className="test-class"
          actions={[createAction('Primary'), createAction('Secondary')]}
          listItems={[
            { icon: <PlaceholderOutline />, description: 'Item with icon' },
            { description: 'Item without icon' },
          ]}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
