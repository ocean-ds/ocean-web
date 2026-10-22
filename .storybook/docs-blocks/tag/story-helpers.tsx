import React from 'react';
import type { Decorator } from '@storybook/react';
import '../docs.scss';

type TranslucentStoryArgs = {
  appearance?: unknown;
  icon?: unknown;
  setIconOff?: unknown;
  size?: unknown;
  type?: unknown;
  variant?: unknown;
};

const TRANSLUCENT_TYPES = new Set([
  'positive',
  'warning',
  'negative',
  'complementary',
  'neutral',
  'neutral-02',
]);

export const isSupportedTranslucentTag = (
  args: TranslucentStoryArgs
): boolean =>
  args.appearance === 'translucent' &&
  args.size === 'medium' &&
  args.icon !== 'none' &&
  !args.setIconOff &&
  typeof args.type === 'string' &&
  TRANSLUCENT_TYPES.has(args.type) &&
  args.variant !== 'highlight';

export const tagSurfaceClassName = (type: string, compact = false): string => {
  const classes = ['odoc-tag-surface'];

  if (type === 'neutral-02') {
    classes.push('odoc-tag-surface--light');
  }
  if (compact) {
    classes.push('odoc-tag-surface--compact');
  }

  return classes.join(' ');
};

export const tagTranslucentCanvasClassName = (type: string): string =>
  type === 'neutral-02'
    ? 'odoc-canvas--tag-translucent-light'
    : 'odoc-canvas--tag-translucent';

export const tagDecorator: Decorator = (Story, context) => {
  const translucent = isSupportedTranslucentTag(context.args);
  const type = typeof context.args.type === 'string' ? context.args.type : '';

  return (
    <div
      className={`odoc-canvas ${
        translucent ? tagTranslucentCanvasClassName(type) : 'odoc-canvas--white'
      }`}
    >
      <div
        className={
          translucent ? tagSurfaceClassName(type) : 'odoc-tag-white-surface'
        }
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
