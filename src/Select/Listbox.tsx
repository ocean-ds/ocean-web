import React, { useContext } from 'react';

import Option from './Option';
import Context from './context';
import { OptionType } from './types';

type ListboxProps = {
  id: string;
  options: Array<{ id: string } & OptionType>;
  onKeyDown: React.KeyboardEventHandler;
};

const Listbox = React.forwardRef<HTMLUListElement, ListboxProps>(
  function Listbox({ id, options, onKeyDown }, ref) {
    const { selected } = useContext(Context);

    return (
      <div className="ods-select__listbox-wrapper">
        <ul
          ref={ref}
          id={id}
          tabIndex={-1}
          role="listbox"
          // Tells assistive technologies which of the options, if any, is
          // visually indicated as having keyboard focus. DOM focus remains on the
          // `ul` element and the idref specified for `aria-activedescendant`
          // refers to the `li` element that is visually styled as focused. When
          // navigation keys, such as `Down Arrow`, are pressed, the JavaScript
          // changes the value.
          aria-activedescendant={selected?.id || undefined}
          className="ods-select__listbox"
          onKeyDown={onKeyDown}
        >
          {options.map((option, index) => (
            <Option key={option.value} index={index} {...option} />
          ))}
        </ul>
      </div>
    );
  }
);

export default React.memo(Listbox);
