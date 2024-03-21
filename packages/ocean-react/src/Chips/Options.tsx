import React from 'react';

interface IOptions {
  options: Array<{ label: string; value: any }>;
  onSelect: (label: string, value: any) => void;
}

const Options: React.FunctionComponent<IOptions> = ({ options, onSelect }) => (
  <div className="ods-chips__options">
    {options.map(({ label, value }) => (
      <button
        key={label}
        type="button"
        value={value}
        onClick={() => onSelect(label, value)}
        className="ods-chips__options--option"
      >
        {label}
      </button>
    ))}
  </div>
);

export default Options;
