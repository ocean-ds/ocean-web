import React from 'react';
import ReactModal from 'react-modal';
import { XOutline } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

export type ModalProps = {
  /**
   * If `true`, the modal stretches to `maxWidth`.
   * Notice that the modal width grow is limited by the default margin.
   * @default false
   */
  blocked?: boolean;
  /**
   * Determine the max-width of the modal (desktop only).
   * The modal width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default false
   */
  maxWidth?: 'sm' | 'md' | 'lg' | false;
  /**
   * Function that will be run when the modal is requested to be closed, prior to actually closing.
   */

  disableClose?: false;
  /**
   * it will disable the close button
   */
  onRequestClose(event: React.MouseEvent | React.KeyboardEvent): void;
} & ReactModal.Props;

const Modal: React.FC<ModalProps> = ({
  children,
  maxWidth = false,
  disableClose = false,
  blocked = false,
  onRequestClose,
  ...rest
}) => (
  <ReactModal
    closeTimeoutMS={150}
    portalClassName="ods-modal"
    overlayClassName={{
      base: 'ods-modal__overlay',
      afterOpen: 'ods-modal__overlay--after-open',
      beforeClose: 'ods-modal__overlay--before-close',
    }}
    className={{
      base: classNames('ods-modal__content', {
        [`ods-modal__content--${maxWidth}`]: maxWidth,
        'ods-modal__content--blocked': blocked,
      }),
      afterOpen: 'ods-modal__content--after-open',
      beforeClose: 'ods-modal__content--before-close',
    }}
    onRequestClose={onRequestClose}
    {...rest}
  >
    <div className="ods-modal__header">
      {!disableClose && (
        <button
          type="button"
          className="ods-modal__header-close"
          aria-label="Close modal"
          onClick={onRequestClose}
        >
          <XOutline />
        </button>
      )}
    </div>
    <div className="ods-modal__body">{children}</div>
  </ReactModal>
);

export default Modal;
