import React, { forwardRef, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { InternalListActionsProps, ActionItem } from './types';
import { CLOSE_ANIMATION_DURATION } from './constants';
import { useSwipeGesture, useClickOutside } from './hooks';
import { MenuBackdrop, MenuList, TriggerButton } from './components';

const InternalListActions = forwardRef<HTMLDivElement, InternalListActionsProps>(
  (
    {
      actions,
      actionType = 'menu',
      disabled = false,
      position = 'bottom-right',
      className,
      withMobileMode, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...rest
    },
    forwardedRef
  ): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // When actionType is 'swipe', always use swipe mode (mobile UI) regardless of device
    const isSwipeMode = actionType === 'swipe';

    const handleSwipeLeft = () => {
      setIsOpen(true);
      setIsClosing(false);
    };

    const handleClose = () => {
      if (isSwipeMode) {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, CLOSE_ANIMATION_DURATION);
      } else {
        setIsOpen(false);
      }
    };

    useSwipeGesture(triggerRef, isSwipeMode, isOpen, handleSwipeLeft);
    useClickOutside(wrapperRef, isOpen, handleClose);

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

    const handleActionClick = (action: ActionItem) => {
      if (!action.disabled) {
        action.onClick();
        handleClose();
      }
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
