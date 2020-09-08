import React from 'react';
import classNames from 'classnames';

import { MergeElementProps } from '../_util/type';
import './styles/form-label.scss';

export type FormLabelProps<P extends React.ElementType = 'label'> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * @default 'label'
   */
  component?: P;
} & MergeElementProps<
  P,
  {
    /**
     * If true, the label should be displayed in a disabled state.
     * @default false
     */
    disabled?: boolean;
  }
>;

function FormLabelBase<T extends React.ElementType = 'label'>(
  { children, className, component, disabled, ...rest }: FormLabelProps<T>,
  ref: React.Ref<HTMLButtonElement>
) {
  return React.createElement(
    component || 'label',
    {
      ref,
      className: classNames(
        'ods-form-control__label',
        disabled && 'ods-form-control__label--disabled',
        className
      ),
      ...rest,
    },
    children
  );
}

const FormLabel = (React.forwardRef(
  FormLabelBase
) as unknown) as typeof FormLabelBase;

export default FormLabel;
