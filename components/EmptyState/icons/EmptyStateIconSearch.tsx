import { useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconSearch = () => {
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
          d="M23.7569 30.3975C27.216 30.3975 30.0203 27.4876 30.0203 23.8979C30.0203 20.3082 27.216 17.3983 23.7569 17.3983C20.2977 17.3983 17.4935 20.3082 17.4935 23.8979C17.4935 27.4876 20.2977 30.3975 23.7569 30.3975Z"
          fill="#F7F8FA"
          style={{
            fill: ThemeVariable.BgMuted,
          }}
        />
        <path
          d="M22.8423 29.1C26.3014 29.1 29.1056 26.19 29.1056 22.6004C29.1056 19.0107 26.3014 16.1007 22.8423 16.1007C19.3831 16.1007 16.5789 19.0107 16.5789 22.6004C16.5789 26.19 19.3831 29.1 22.8423 29.1Z"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M27.6122 27.5982L31.0738 31.1904"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="16" height="17" fill="white" transform="translate(16 15.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};
