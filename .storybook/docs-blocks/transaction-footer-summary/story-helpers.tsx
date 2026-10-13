import React from 'react';
import type { Decorator } from '@storybook/react';

export const transactionFooterDecorator: Decorator = (Story, context) => {
  const type = context.args.type === 'highlight' ? 'highlight' : 'default';

  return (
    <div className={`odoc-canvas odoc-canvas--footer-${type}`}>
      <div className="odoc-example__frame">
        <div className={`odoc-footer-surface odoc-footer-surface--${type}`}>
          <Story />
        </div>
      </div>
    </div>
  );
};

export const transactionSummaryDecorator: Decorator = (Story) => (
  <div className="odoc-canvas odoc-canvas--white">
    <div className="odoc-example__frame">
      <Story />
    </div>
  </div>
);

export const centeredMatrix: Decorator = (Story, context) => (
  <div
    className={`odoc-visual-root odoc-visual-root--transaction-summary${
      context.parameters.whiteCanvas ? ' odoc-canvas--white' : ''
    }`}
  >
    <Story />
  </div>
);
