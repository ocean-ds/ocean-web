import React, { ReactNode } from 'react';

export type DoughnutChartProps = {
  /**
   * Determines the chart title
   * @requires
   */
  title: string;
  /**
   * Determines the chart subtitle
   * @requires
   */
  subtitle: string;
  /**
   * Determines the center chart value
   */
  centerChartValue?: string;
  /**
   * Determines the center chart label
   */
  centerChartLabel?: string;
  /**
   * Determines graphic counts and legends
   * @requires
   */
  data: IDoughnutChartData[];
  /**
   * ClassName to overwrite default style
   * @default null
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export type IDoughnutChartData = {
  id: string | number;
  count: number;
  percentage: number;
  color: string;
  descriptionLevel1: string | number | ReactNode;
  descriptionLevel2?: string | number | ReactNode;
};
