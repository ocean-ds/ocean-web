import React, { forwardRef, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { InternalListActionsProps, ActionItem } from './types';
import { CLOSE_ANIMATION_DURATION } from './constants';
import { useSwipeGesture, useClickOutside } from './hooks';
import { MenuBackdrop, MenuList, TriggerButton } from './components';

const InternalListActions = forwardRef<
  HTMLDivElement,
  InternalListActionsProps
>(
  (
    {
      actions,
      actionType = 'menu',
      disabled = false,
      position = 'bottom-right',
      className,
      onOpenChange,
      ...rest
    },
    forwardedRef
  ): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    // When actionType is 'swipe', always use swipe mode (mobile UI) regardless of device
    const isSwipeMode = actionType === 'swipe';

    const notifyOpenChange = (open: boolean) => {
      if (open && isSwipeMode && menuRef.current) {
        // Wait for menu to render and measure its width
        requestAnimationFrame(() => {
          const menuWidth = menuRef.current?.offsetWidth || 0;
          onOpenChange?.(true, menuWidth);
        });
      } else if (open) {
        onOpenChange?.(true);
      } else {
        onOpenChange?.(false);
      }
    };

    const handleSwipeLeft = () => {
      setIsOpen(true);
      setIsClosing(false);
    };

    const handleClose = () => {
      if (isSwipeMode) {
        setIsClosing(true);
        notifyOpenChange(false);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, CLOSE_ANIMATION_DURATION);
      } else {
        setIsOpen(false);
        notifyOpenChange(false);
      }
    };

    useSwipeGesture(triggerRef, isSwipeMode, isOpen, handleSwipeLeft);
    useClickOutside(wrapperRef, isOpen, handleClose, menuRef);

    useEffect(() => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(wrapperRef.current);
        } else {
          (
            forwardedRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = wrapperRef.current;
        }
      }
    }, [forwardedRef]);

    // Notify when menu opens in swipe mode (after menu is rendered)
    useEffect(() => {
      if (isOpen && isSwipeMode && !isClosing) {
        notifyOpenChange(true);
      }
    }, [isOpen, isSwipeMode, isClosing]);

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

    const handleActionClick = (action: ActionItem) => {
      if (!action.disabled) {
        action.onClick();
        handleClose();
      }
    };

    const handleDragHandleKeyDown = (e: React.KeyboardEvent) => {
      const isTriggerKey = e.key === 'Enter' || e.key === ' ';
      if (isTriggerKey) {
        e.preventDefault();
        handleClose();
      }
    };

    return (
      <div
        ref={wrapperRef}
        className={classNames('ods-internal-list-actions', className, {
          'ods-internal-list-actions--force-swipe': isSwipeMode,
        })}
        {...rest}
      >
        <TriggerButton
          triggerRef={triggerRef}
          disabled={disabled}
          isOpen={isOpen}
          isSwipeGesture={isSwipeMode}
          onClick={handleToggle}
        />

        {isOpen && isSwipeMode && <MenuBackdrop onClick={handleClose} />}

        {isOpen && (
          <MenuList
            menuRef={menuRef}
            actions={actions}
            position={position}
            isClosing={isClosing}
            isSwipeMode={isSwipeMode}
            onActionClick={handleActionClick}
            onClose={handleClose}
            onDragHandleKeyDown={handleDragHandleKeyDown}
            triggerElement={triggerRef.current}
          />
        )}
      </div>
    );
  }
);

InternalListActions.displayName = 'InternalListActions';

export default InternalListActions;
