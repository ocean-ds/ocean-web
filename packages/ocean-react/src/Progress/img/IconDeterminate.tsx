import React from 'react';

const SIZE_CONFIG = {
  sm: { size: 16, strokeWidth: 3, radius: 6 },
  md: { size: 24, strokeWidth: 4, radius: 10 },
  lg: { size: 32, strokeWidth: 5, radius: 13 },
};

type IconDeterminateProps = {
  size: 'sm' | 'md' | 'lg';
  percentage: undefined | number;
};

const IconDeterminate: React.FunctionComponent<IconDeterminateProps> = ({
  size,
  percentage,
}) => {
  const config = SIZE_CONFIG[size];
  const circumference = 2 * Math.PI * config.radius;
  const normalizedPercentage = Math.min(100, Math.max(0, percentage ?? 0));
  const strokeDashoffset =
    circumference - (normalizedPercentage / 100) * circumference;

  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox={`0 0 ${config.size} ${config.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ods-progress__determinate"
    >
      <circle
        className="ods-progress__track"
        cx={config.size / 2}
        cy={config.size / 2}
        r={config.radius}
        strokeWidth={config.strokeWidth}
        fill="none"
      />
      <circle
        className="ods-progress__fill"
        cx={config.size / 2}
        cy={config.size / 2}
        r={config.radius}
        strokeWidth={config.strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${config.size / 2} ${config.size / 2})`}
      />
    </svg>
  );
};

export default IconDeterminate;

