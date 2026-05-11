import { useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconPostureChecks = () => {
  const id = useId();

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
          d="M14.4028 28.0825V17.5925C14.4028 16.813 15.0343 16.1838 15.817 16.1838H31.373C32.087 16.1838 32.6774 16.7719 32.6774 17.4831V21.6134"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M22.476 31.8162H14.1419C13.3318 31.8162 12.6865 31.1597 12.6865 30.3664V28.0961H22.3936"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M25.524 27.932L29.4783 31.8162L35.492 24.9232"
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
            width="24"
            height="17"
            fill="white"
            transform="translate(12 15.5)"
            style={{
              fill: ThemeVariable.BgWhite,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
