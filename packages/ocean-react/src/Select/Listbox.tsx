import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Context from './context';
import { OptionProps } from './types';
import Option from './Option';
import Typography from '../Typography';

type ListboxProps = {
  id: string;
  options: OptionProps[];
  onKeyDown: React.KeyboardEventHandler;
};
const Listbox = React.memo<ListboxProps>(({ id, options, onKeyDown }) => {
  const { selected } = useContext(Context);
  const refListbox = useRef<HTMLUListElement | null>(null);
  const withoutOptions = options.length === 0;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    refListbox.current!.focus();
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
        className={classNames(
          'ods-select__listbox',
          'ods-select-autocomplete__listbox',
          {
            'ods-select-autocomplete__listbox--empty': withoutOptions,
          }
        )}
        onKeyDown={onKeyDown}
      >
        {options.map(({ value, index, ...rest }) => (
          <Option key={value} value={value} index={index} {...rest} />
        ))}
        {withoutOptions && (
          <Typography variant="description">
            Nenhuma opção encontrada.
          </Typography>
        )}
      </ul>
    </div>
  );
});

Listbox.displayName = 'Listbox';

export default Listbox;
