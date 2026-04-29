import { useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconOpenId = () => {
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
          d="M24.9458 33C20.302 33 16.5403 30.3157 16.5403 26.9928C16.5403 23.6699 20.302 20.9856 24.9458 20.9856V33Z"
          fill="#F7F8FA"
          style={{ fill: ThemeVariable.BgMuted }}
        />
        <path
          d="M27.4111 23.3776L32.3737 25.2177L32.7031 20.4227"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M23.6919 15V31.9934C19.0587 31.9934 15.297 29.3091 15.297 25.9862C15.297 22.6633 19.0587 19.979 23.6919 19.979C26.3591 19.979 28.7394 20.8665 30.2696 22.2628C30.9391 22.8581 31.4385 23.5508 31.7573 24.3085"
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
            width="19"
            height="18"
            fill="white"
            transform="translate(14.5 15)"
            style={{
              fill: ThemeVariable.BgWhite,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
