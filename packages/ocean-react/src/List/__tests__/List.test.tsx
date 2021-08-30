import React from 'react';
import { render } from '@testing-library/react';
import List, { ListProps } from '../List';

const setup = (props?: ListProps) => {
  render(
    <List {...props}>
      <div> List Item </div>
    </List>
  );
};

test('renders default element properly', () => {
  setup();

  expect(document.querySelector('.ods-list')).toMatchInlineSnapshot(`
<div
  class="ods-list"
>
  <div>
     List Item 
  </div>
</div>
`);
});
