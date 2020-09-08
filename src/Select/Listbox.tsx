import React, { useContext, useEffect, useRef } from 'react';

import Option from './Option';
import Context from './context';
import { OptionType } from './types';
import './styles/listbox.scss';

type ListboxProps = {
  id: string;
  options: Array<{ id: string } & OptionType>;
  onKeyDown: React.KeyboardEventHandler;
};

const Listbox = React.memo<ListboxProps>(function Listbox({
  id,
  options,
  onKeyDown,
}) {
  const { selected } = useContext(Context);
  const refListbox = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    refListbox.current?.focus();
  }, []);

  return (
    <div className="ods-select__listbox-wrapper">
      <ul
        ref={refListbox}
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
        {options.map(({ value, index, ...rest }) => (
          <Option key={value} value={value} index={index} {...rest} />
        ))}
      </ul>
    </div>
  );
});

export default Listbox;
