import React from 'react';

export type ProgressProps = {
  /**
   * The size of the progress.
   * @default 'md'
   */
  size?: 'md' | 'lg' | 'sm';
};

const Progress: React.FC<ProgressProps> = ({ size = 'md', ...rest }) => {
  return (
    <div className="ods-progress" {...rest}>
      <span className={`ods-progress__primary ods-progress--${size}`}>
        <svg className="ods-progress-svg" viewBox="22 22 44 44">
          <circle cx="44" cy="44" r="18" fill="none" />
        </svg>
      </span>
      <span className={`ods-progress__secondary ods-progress--${size}`}>
        <svg viewBox="22 22 44 44">
          <circle cx="44" cy="44" r="18" fill="none" />
        </svg>
      </span>
    </div>
  );
};

export default Progress;
