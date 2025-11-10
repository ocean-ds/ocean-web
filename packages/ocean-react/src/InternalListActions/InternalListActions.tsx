import React, { forwardRef, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { InternalListActionsProps, ActionItem } from './types';
import { CLOSE_ANIMATION_DURATION } from './constants';
import { useMobileDetection, useSwipeGesture, useClickOutside } from './hooks';
import { MenuBackdrop, MenuList, TriggerButton } from './components';

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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const isMobile = useMobileDetection(withMobileMode);

    const handleSwipeLeft = () => {
      setIsOpen(true);
      setIsClosing(false);
    };

    const handleClose = () => {
      if (isMobile) {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, CLOSE_ANIMATION_DURATION);
      } else {
        setIsOpen(false);
      }
    };

    useSwipeGesture(triggerRef, isMobile, isOpen, handleSwipeLeft);
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
          'ods-internal-list-actions--disable-mobile': !withMobileMode,
        })}
        {...rest}
      >
        <TriggerButton
          triggerRef={triggerRef}
          disabled={disabled}
          isOpen={isOpen}
          isMobile={isMobile}
          onClick={handleToggle}
        />

        {isOpen && isMobile && <MenuBackdrop onClick={handleClose} />}

        {isOpen && (
          <MenuList
            actions={actions}
            position={position}
            isClosing={isClosing}
            isMobile={isMobile}
            onActionClick={handleActionClick}
            onClose={handleClose}
            onDragHandleKeyDown={handleDragHandleKeyDown}
          />
        )}
      </div>
    );
  }
);

InternalListActions.displayName = 'InternalListActions';

export default InternalListActions;
