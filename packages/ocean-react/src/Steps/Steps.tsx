import React, { ReactElement } from 'react';

export interface StepsProps {
  /**
   * Determines the current step.
   * @default 1
   */
  currentStep: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  /**
   * Determines the total amount of steps.
   * @default 4
   */
  steps: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
const defaultProps = {
  currentStep: 1,
  steps: 4,
};

const Steps = ({
  currentStep,
  steps,
}: StepsProps & typeof defaultProps): ReactElement => {
  const getCurrentStep = (step: number) => {
    const left = 30 * (step - 1);

    if (step === currentStep) {
      return (
        <>
          <circle
            cx={step === 1 ? 9.5 : left + 12}
            cy="10"
            r="5"
            stroke="#13BDBD"
            strokeWidth="2"
          ></circle>
          {steps > step && (
            <>
              <path
                d={step === 1 ? 'M15 10H20' : `M${left + 17} 10H${left + 22}`}
                stroke="#13BDBD"
                strokeWidth="2"
              ></path>
              <path
                d={step === 1 ? 'M20 10H37' : `M${left + 22} 10H${left + 38}`}
                stroke="#EBECF5"
                strokeWidth="2"
              ></path>
            </>
          )}
        </>
      );
    }

    if (currentStep > step) {
      return (
        <>
          <circle
            cx={step === 1 ? 10 : left + 12}
            cy="10"
            r="9"
            fill="#13BDBD"
            stroke="#13BDBD"
            strokeWidth="2"
          />

          <path
            d={
              step === 1
                ? 'M7 10 L 9 12 L 13 8'
                : `M${left + 9} 10 L ${left + 11} 12 L ${left + 16} 8`
            }
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {steps > step && (
            <>
              <path
                d={`M${step === 1 ? 20 : left + 22} 10H${step * 30 + 2}`}
                stroke="#13BDBD"
                strokeWidth="2"
              />
              <path
                d={`M${step * 30 + 2} 10L${step * 30 + 7} 10`}
                stroke="#13BDBD"
                strokeWidth="2"
              />
            </>
          )}
        </>
      );
    }

    return (
      <>
        <circle
          cx={step === 1 ? 9.5 : left + 12}
          cy="10"
          r="5"
          stroke="#EBECF5"
          strokeWidth="2"
        ></circle>
        {steps > step && (
          <path
            d={step === 1 ? 'M15 10H37' : `M${left + 17} 10H${left + 38}`}
            stroke="#EBECF5"
            strokeWidth="2"
          ></path>
        )}
      </>
    );
  };

  return (
    <svg
      height="20"
      width={30 * (steps - 1) + 22}
      viewBox={`0 0 ${30 * (steps - 1) + 22} 20`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid={`step-${currentStep}`}
    >
      {Array.from(Array(steps).keys()).map((step) => (
        <g key={step}>{getCurrentStep(step + 1)}</g>
      ))}
    </svg>
  );
};

export default Steps;
