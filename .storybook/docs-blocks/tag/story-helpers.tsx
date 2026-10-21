import React from 'react';
import type { Decorator } from '@storybook/react';

export const tagDecorator: Decorator = (Story, context) => {
  const translucent =
    context.args.variant !== 'highlight' &&
    context.args.appearance === 'translucent';

  return (
    <div
      className={`odoc-canvas ${
        translucent ? 'odoc-canvas--tag-translucent' : 'odoc-canvas--white'
      }`}
    >
      <div
        className={translucent ? 'odoc-tag-surface' : 'odoc-tag-white-surface'}
      >
        <Story />
      </div>
    </div>
  );
};

export const tagVisualDecorator: Decorator = (Story) => (
  <div className="odoc-visual-root odoc-visual-root--tag">
    <Story />
  </div>
);
