import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import Badge from '../Badge';
import Options from './Options';

interface IChips {
  label: string;
  counter?: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
  options?: Array<{ label: string; value: any }>;
  onClick?: () => void;
  onChange?: (value: any) => void;
}

const Chips: React.FunctionComponent<IChips> = ({
  label,
  counter,
  icon,
  disabled,
  options,
  onClick,
  onChange,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectionIsOpen, setSelectionIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<{
    label: string;
    value: any;
  }>({
    label: '',
    value: null,
  });

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSelectionIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleClickChips = () => {
    if (options && options?.length > 0) {
      setSelectionIsOpen(!selectionIsOpen);
    }

    if (onClick) {
      onClick();
    }
  };

  const handleSelectOption = (labelProp: string, value: any) => {
    setSelectedOption({ label: labelProp, value });
    setSelectionIsOpen(false);

    if (onChange) {
      onChange({ label: labelProp, value });
    }
  };

  return (
    <div className="ods-chips" ref={wrapperRef}>
      <button
        type="button"
        onClick={handleClickChips}
        disabled={disabled}
        className={classNames('ods-chips__button', {
          'ods-chips__button--disabled': disabled,
          'ods-chips__button--active':
            selectionIsOpen || !!selectedOption.value,
        })}
      >
        {icon || undefined}
        <p className="ods-chips__label">
          {selectedOption.value ? selectedOption.label : label}
        </p>
        {counter && (
          <Badge color="brand" className="ods-chips__badge">
            {counter}
          </Badge>
        )}
        {options && options?.length > 0 && !selectionIsOpen && <ChevronDown />}
        {options && options?.length > 0 && selectionIsOpen && <ChevronUp />}
      </button>
      {selectionIsOpen && options && (
        <Options options={options} onSelect={handleSelectOption} />
      )}
    </div>
  );
};

Chips.displayName = 'Chips';

export default Chips;
