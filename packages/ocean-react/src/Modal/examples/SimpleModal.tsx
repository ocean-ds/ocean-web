import React, { useState } from 'react';

import Modal, { ModalProps } from '../Modal';
import Button from '../../Button';

const SimpleModal: React.FC<Omit<ModalProps, 'isOpen' | 'onRequestClose'>> = ({
  children,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <Button onClick={toggleOpen}>Open Modal</Button>
      <Modal {...rest} isOpen={isOpen} onRequestClose={toggleOpen}>
        {children}
      </Modal>
    </>
  );
};

export default SimpleModal;
