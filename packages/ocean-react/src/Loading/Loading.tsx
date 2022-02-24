import React from 'react';
import classNames from 'classnames';

export type LoadingProps = React.ComponentPropsWithoutRef<'div'>;

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  function OceanLoading({ children, className, ...rest }, ref) {
    return (
      <div ref={ref} className={classNames('ods-loading', className)} {...rest}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.4"
            cx="12"
            cy="12"
            r="10.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
);

export default Loading;
