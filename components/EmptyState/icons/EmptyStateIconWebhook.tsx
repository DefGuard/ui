import { type SVGProps, useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconWebhook = (props: SVGProps<SVGSVGElement>) => {
  const id = useId();
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="47"
        rx="23.5"
        stroke="#A2ACBA"
        strokeDasharray="2 2"
        style={{
          stroke: ThemeVariable.BorderFaded,
        }}
      />
      <g clipPath={`url(#${id})`}>
        <path
          d="M17.8644 24.8326C16.2582 25.0452 14.9354 26.1908 14.4984 27.7262C14.3922 28.0805 14.3449 28.4585 14.3449 28.8482C14.3449 29.238 14.3922 29.6159 14.4984 29.9702C14.9827 31.6709 16.5417 32.8992 18.3841 32.8992C20.569 32.8992 22.3524 31.1631 22.4233 28.9899H29.6041"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M23.9351 19.14L27.5373 25.376C28.1514 25.0098 28.86 24.7972 29.6159 24.7972C31.8481 24.7972 33.6669 26.6043 33.6669 28.8482C33.6669 31.0922 31.8599 32.8993 29.6159 32.8993C28.4112 32.8993 27.3365 32.3796 26.5924 31.541"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M18.2542 28.99L21.9155 22.6477C20.7108 21.9509 19.8959 20.64 19.8959 19.14C19.8959 16.9078 21.7029 15.1008 23.9351 15.1008C26.1672 15.1008 27.9861 16.9078 27.9861 19.14C27.9861 19.7069 27.868 20.2384 27.6672 20.7226"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
      </g>
      <defs>
        <clipPath id={id}>
          <rect
            width="21.0817"
            height="19.57"
            fill="white"
            transform="translate(13.4591 14.215)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
