/* eslint-disable */
// @ts-nocheck
import React from 'react';

import Typography from '../../Typography/Typography.tsx';
import Snackbar from '../../Snackbar/Snackbar.tsx';

import colors from '../constants/colors';

import './styles.css';

interface IColorRowProps {
  type:
    | 'primary'
    | 'complementary'
    | 'highlight'
    | 'interfaceLight'
    | 'interfaceDark'
    | 'status';
}

const ColorRow: React.FC<IColorRowProps> = ({ type }) => {
  const [open, setOpen] = React.useState(false);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setOpen(true);
  };

  return (
    <div className="ods-doc-color-row">
      <div className="ods-doc-color-row-head">
        <Typography variant="description">Color</Typography>
        <Typography variant="description">Name</Typography>
        <Typography variant="description">Rgba</Typography>
        <Typography variant="description">Token</Typography>
      </div>

      {Object.entries(colors[type]).map((color) => (
        <div key={color[0]} className="ods-doc-color-row-body">
          <div
            className="ods-doc-color-row-square"
            style={{
              backgroundColor: `${color[1]}`,
            }}
          />
          <Typography
            variant="description"
            onClick={() => handleCopy(color[0])}
            className="ods-doc-color-row-text"
          >
            {color[0]}
          </Typography>
          <Typography
            variant="description"
            onClick={() => handleCopy(`"${color[1]}"`)}
            className="ods-doc-color-row-text"
          >
            {color[1]}
          </Typography>
          <Typography
            variant="description"
            onClick={() => handleCopy(color[0])}
            className="ods-doc-color-row-text"
          >
            {color[0]}
          </Typography>
        </div>
      ))}

      <Snackbar
        type="positive"
        isOpen={open}
        setIsOpen={setOpen}
        message="Copy to clipboard!"
      />
    </div>
  );
};

export default ColorRow;
