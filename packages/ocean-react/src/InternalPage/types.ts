import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { StepsProps } from './../Steps/Steps';

export type TextsProps = {
  title: string;
  description?: string;
};

export type InternalPageProps = {
  main: TextsProps;

  content?: TextsProps;

  navigation?: string[] | ReactNode[];

  steps?: StepsProps;

  action?: ReactNode;

  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;
