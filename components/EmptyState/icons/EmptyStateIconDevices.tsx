import { useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconDevices = () => {
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
          d="M34.5351 20.6888H30.4072C29.6589 20.6888 29.0523 21.2954 29.0523 22.0437V31.2999C29.0523 32.0482 29.6589 32.6548 30.4072 32.6548H34.5351C35.2834 32.6548 35.89 32.0482 35.89 31.2999V22.0437C35.89 21.2954 35.2834 20.6888 34.5351 20.6888Z"
          fill="#F7F8FA"
          style={{
            fill: ThemeVariable.BgMuted,
          }}
        />
        <path
          d="M14.7311 27.8937V17.6625C14.7311 16.9028 15.3389 16.295 16.0987 16.295H32.4712"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M25.089 31.5278H14.4779C13.6928 31.5278 13.0597 30.8947 13.0597 30.1097V27.8937H25.013"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M33.1676 19.5618H29.0396C28.2914 19.5618 27.6848 20.1684 27.6848 20.9167V30.1729C27.6848 30.9212 28.2914 31.5278 29.0396 31.5278H33.1676C33.9159 31.5278 34.5225 30.9212 34.5225 30.1729V20.9167C34.5225 20.1684 33.9159 19.5618 33.1676 19.5618Z"
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
            width="23.78"
            height="17.3095"
            fill="white"
            transform="translate(12.11 15.3453)"
            style={{
              fill: ThemeVariable.BgWhite,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
