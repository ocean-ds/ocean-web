import React from 'react';
import { render } from '@testing-library/react';

import Modal from '../Modal';

test('renders element properly', () => {
  render(
    <Modal isOpen ariaHideApp={false}>
      Hello There!
    </Modal>
  );

  // eslint-disable-next-line testing-library/no-node-access
  expect(document.querySelector('.ods-modal__body')).toMatchInlineSnapshot(`
    <div
      class="ods-modal__body"
    >
      Hello There!
    </div>
  `);
});
