import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { DotsVertical } from '@useblu/ocean-icons-react';

export type ActionItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /**
   * Variant that influences the color of the action item.
   */
  variant?: 'default' | 'positive' | 'warning' | 'negative' | 'neutral';
};

type InternalListActionsProps = {
  /**
   * List of actions to display in the dropdown menu.
   */
  actions: ActionItem[];
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Position of the dropdown menu relative to the button.
   */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /**
   * Enable mobile mode behavior. When true, shows mobile version on small screens.
   * When false, always shows desktop version.
   * @default true
   */
  withMobileMode?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

const InternalListActions = forwardRef<HTMLDivElement, InternalListActionsProps>(
  (
    {
      actions,
      disabled = false,
      position = 'bottom-right',
      withMobileMode = true,
      className,
      ...rest
    },
    forwardedRef
  ): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);

    // Detect mobile viewport
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(withMobileMode && window.innerWidth <= 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => window.removeEventListener('resize', checkMobile);
    }, [withMobileMode]);

    // Handle swipe gesture on mobile
    useEffect(() => {
      if (!isMobile || !triggerRef.current) return;

      const trigger = triggerRef.current;

      const handleTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!touchStartX.current || !touchStartY.current) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;

        const deltaX = touchStartX.current - touchEndX;
        const deltaY = Math.abs(touchStartY.current - touchEndY);

        // Swipe left (drag from right to left) with minimal vertical movement
        if (deltaX > 50 && deltaY < 30 && !isOpen) {
          setIsOpen(true);
          setIsClosing(false);
          touchStartX.current = 0;
          touchStartY.current = 0;
        }
      };

      const handleTouchEnd = () => {
        touchStartX.current = 0;
        touchStartY.current = 0;
      };

      trigger.addEventListener('touchstart', handleTouchStart);
      trigger.addEventListener('touchmove', handleTouchMove);
      trigger.addEventListener('touchend', handleTouchEnd);

      return () => {
        trigger.removeEventListener('touchstart', handleTouchStart);
        trigger.removeEventListener('touchmove', handleTouchMove);
        trigger.removeEventListener('touchend', handleTouchEnd);
      };
    }, [isMobile, isOpen]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, isMobile]);

    useEffect(() => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(wrapperRef.current);
        } else {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current =
            wrapperRef.current;
        }
      }
    }, [forwardedRef]);

    const handleToggle = () => {
      if (!disabled) {
        if (isOpen) {
          handleClose();
        } else {
          setIsOpen(true);
          setIsClosing(false);
        }
      }
    };

    const handleClose = () => {
      if (isMobile) {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, 300); // Match animation duration
      } else {
        setIsOpen(false);
      }
    };

    const handleActionClick = (action: ActionItem) => {
      if (!action.disabled) {
        action.onClick();
        handleClose();
      }
    };

    const handleBackdropClick = () => {
      handleClose();
    };

    const handleDragHandleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClose();
      }
    };

    return (
      <div
        ref={wrapperRef}
        className={classNames('ods-internal-list-actions', className, {
          'ods-internal-list-actions--disable-mobile': !withMobileMode,
        })}
        {...rest}
      >
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          className={classNames('ods-internal-list-actions__trigger', {
            'ods-internal-list-actions__trigger--active': isOpen,
          })}
          onClick={handleToggle}
          aria-label="Abrir menu de ações"
          aria-expanded={isOpen}
        >
          {isMobile ? (
            <svg
              width="5"
              height="24"
              viewBox="0 0 5 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0.5" y1="0.5" x2="0.499999" y2="23.5" stroke="currentColor" strokeLinecap="round" />
              <line x1="4.5" y1="0.5" x2="4.5" y2="23.5" stroke="currentColor" strokeLinecap="round" />
            </svg>
          ) : (
            <DotsVertical />
          )}
        </button>

        {isOpen && isMobile && (
          <div
            className="ods-internal-list-actions__backdrop"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        {isOpen && (
          <ul
            className={classNames(
              'ods-internal-list-actions__menu',
              `ods-internal-list-actions__menu--${position}`,
              {
                'ods-internal-list-actions__menu--closing': isClosing,
              }
            )}
            role="menu"
          >
            {isMobile && (
              <li
                className="ods-internal-list-actions__drag-handle"
                onClick={handleClose}
                onKeyDown={handleDragHandleKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Fechar menu"
              >
                <svg
                  width="5"
                  height="24"
                  viewBox="0 0 5 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ods-internal-list-actions__drag-handle-icon"
                >
                  <line x1="0.5" y1="0.5" x2="0.499999" y2="23.5" stroke="#CED1E1" strokeLinecap="round" />
                  <line x1="4.5" y1="0.5" x2="4.5" y2="23.5" stroke="#CED1E1" strokeLinecap="round" />
                </svg>
              </li>
            )}
            {actions.map((action, index) => (
              <li key={index} role="none">
                <button
                  type="button"
                  className={classNames(
                    'ods-internal-list-actions__menu-item',
                    {
                      'ods-internal-list-actions__menu-item--disabled':
                        action.disabled,
                    },
                    action.variant &&
                    `ods-internal-list-actions__menu-item--${action.variant}`
                  )}
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  role="menuitem"
                >
                  {action.icon && (
                    <span className="ods-internal-list-actions__menu-item-icon">
                      {action.icon}
                    </span>
                  )}
                  <span className="ods-internal-list-actions__menu-item-label">
                    {action.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

InternalListActions.displayName = 'InternalListActions';

export default InternalListActions;

