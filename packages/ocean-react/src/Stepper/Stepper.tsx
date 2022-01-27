import React, { ReactElement } from 'react';

export interface StepperProps {
  /**
   * Determines the current step.
   * @default 1
   */
  step: 1 | 2 | 3 | 4;

  /**
   * Determines the total amount of steps.
   * @default 4
   */
  off: 1 | 2 | 3 | 4;
}
const defaultProps = {
  step: 1,
  off: 4,
};

const Stepper = ({
  step,
  off,
}: StepperProps & typeof defaultProps): ReactElement => {
  if (step === 1) {
    return (
      <svg
        width="116"
        height="20"
        viewBox="0 0 116 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="stepper-1"
      >
        <circle cx="9.5" cy="10.5" r="5.5" stroke="#13BDBD" strokeWidth="2" />
        <path d="M15 10H20" stroke="#13BDBD" strokeWidth="2" />

        {off === 2 && (
          <>
            <path d="M20 10H32" stroke="#EBECF5" strokeWidth="2" />
            <path d="M32 10L37 10" stroke="#EBECF5" strokeWidth="2" />
            <circle cx="42" cy="10" r="5" stroke="#EBECF5" strokeWidth="2" />
          </>
        )}

        {off === 3 && (
          <>
            <path d="M20 10H32" stroke="#EBECF5" strokeWidth="2" />
            <path d="M32 10L37 10" stroke="#EBECF5" strokeWidth="2" />
            <circle cx="42" cy="10" r="5" stroke="#EBECF5" strokeWidth="2" />
            <path d="M47 10H52" stroke="#EBECF5" strokeWidth="2" />
            <path d="M52 10H64" stroke="#EBECF5" strokeWidth="2" />
            <path d="M64 10L69 10" stroke="#EBECF5" strokeWidth="2" />
            <circle cx="74" cy="10" r="5" stroke="#EBECF5" strokeWidth="2" />
          </>
        )}

        {off === 4 && (
          <>
            <path d="M20 10H32" stroke="#EBECF5" strokeWidth="2" />
            <path d="M32 10L37 10" stroke="#EBECF5" strokeWidth="2" />
            <circle cx="42" cy="10" r="5" stroke="#EBECF5" strokeWidth="2" />
            <path d="M47 10H52" stroke="#EBECF5" strokeWidth="2" />
            <path d="M52 10H64" stroke="#EBECF5" strokeWidth="2" />
            <path d="M64 10L69 10" stroke="#EBECF5" strokeWidth="2" />
            <circle cx="74" cy="10" r="5" stroke="#EBECF5" strokeWidth="2" />
            <path d="M79 10H84" stroke="#EBECF5" strokeWidth="2" />
            <path d="M84 10H96" stroke="#EBECF5" strokeWidth="2" />
            <circle
              r="5"
              transform="matrix(-1 0 0 1 106 10)"
              stroke="#EBECF5"
              strokeWidth="2"
            />
            <path d="M101 10H96" stroke="#EBECF5" strokeWidth="2" />
          </>
        )}
      </svg>
    );
  }

  if (step === 2) {
    return (
      <svg
        width="116"
        height="20"
        viewBox="0 0 116 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="stepper-2"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          fill="#13BDBD"
          stroke="#13BDBD"
          strokeWidth="2"
        />
        <path
          d="M7 10L9 12L13 8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 10H32" stroke="#13BDBD" strokeWidth="2" />
        <path d="M32 10L37 10" stroke="#13BDBD" strokeWidth="2" />
        <circle cx="42" cy="10" r="5" stroke="#13BDBD" strokeWidth="2" />
        {off > 2 && (
          <>
            <path d="M47 10H52" stroke="#13BDBD" strokeWidth="2" />
            <path d="M52 10H64" stroke="#EBECF5" strokeWidth="2" />
          </>
        )}

        {off === 3 && (
          <>
            <path d="M52 10H64" stroke="#EBECF5" strokeWidth="2" />
            <path d="M64 10L69 10" stroke="#EBECF5" strokeWidth="2" />
            <circle cx="74" cy="10" r="5" stroke="#EBECF5" strokeWidth="2" />
          </>
        )}

        {off === 4 && (
          <>
            <path d="M52 10H64" stroke="#EBECF5" strokeWidth="2" />
            <path d="M64 10L69 10" stroke="#EBECF5" strokeWidth="2" />
            <circle cx="74" cy="10" r="5" stroke="#EBECF5" strokeWidth="2" />
            <path d="M79 10H84" stroke="#EBECF5" strokeWidth="2" />
            <path d="M84 10H96" stroke="#EBECF5" strokeWidth="2" />
            <circle
              r="5"
              transform="matrix(-1 0 0 1 106 10)"
              stroke="#EBECF5"
              strokeWidth="2"
            />
            <path d="M101 10H96" stroke="#EBECF5" strokeWidth="2" />
          </>
        )}
      </svg>
    );
  }

  return (
    <svg
      width="116"
      height="20"
      viewBox="0 0 116 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="stepper-3"
    >
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="#13BDBD"
        stroke="#13BDBD"
        strokeWidth="2"
      />
      <path
        d="M7 10L9 12L13 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 10H32" stroke="#13BDBD" strokeWidth="2" />
      <circle
        cx="42"
        cy="10"
        r="9"
        fill="#13BDBD"
        stroke="#13BDBD"
        strokeWidth="2"
      />
      <path
        d="M39 10L41 12L45 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M52 10H64" stroke="#13BDBD" strokeWidth="2" />
      {step === 3 ? (
        <>
          <path d="M64 10L69 10" stroke="#13BDBD" strokeWidth="2" />
          <circle cx="74" cy="10" r="5" stroke="#13BDBD" strokeWidth="2" />
          {off > 3 && (
            <>
              <path d="M79 10H84" stroke="#13BDBD" strokeWidth="2" />
              <path d="M84 10H96" stroke="#EBECF5" strokeWidth="2" />
              <path d="M101 10H96" stroke="#EBECF5" strokeWidth="2" />
              <circle
                r="5"
                transform="matrix(-1 0 0 1 106 10)"
                stroke="#EBECF5"
                strokeWidth="2"
              />
            </>
          )}
        </>
      ) : (
        <>
          <circle
            cx="74"
            cy="10"
            r="9"
            fill="#13BDBD"
            stroke="#13BDBD"
            strokeWidth="2"
          />
          <path
            d="M71 10L73 12L77 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M84 10H96" stroke="#13BDBD" strokeWidth="2" />
          <path d="M101 10H96" stroke="#13BDBD" strokeWidth="2" />
          <circle
            r="5"
            transform="matrix(-1 0 0 1 106 10)"
            stroke="#13BDBD"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
};

export default Stepper;
