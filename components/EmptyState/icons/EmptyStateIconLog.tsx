import { type SVGProps, useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconLog = (props: SVGProps<SVGSVGElement>) => {
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
          d="M30.0866 17.1308H20.9842C19.099 17.1308 17.5708 18.7012 17.5708 20.6385V29.9923C17.5708 31.9296 19.099 33.5 20.9842 33.5H30.0866C31.9718 33.5 33.5 31.9296 33.5 29.9923V20.6385C33.5 18.7012 31.9718 17.1308 30.0866 17.1308Z"
          fill="#F7F8FA"
          style={{
            fill: ThemeVariable.BgMuted,
          }}
        />
        <path
          d="M28.8692 15.377H19.7668C17.8816 15.377 16.3534 16.9474 16.3534 18.8846V28.2385C16.3534 30.1757 17.8816 31.7462 19.7668 31.7462H28.8692C30.7543 31.7462 32.2826 30.1757 32.2826 28.2385V18.8846C32.2826 16.9474 30.7543 15.377 28.8692 15.377Z"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M31.873 23.5498H27.7314L25.5354 28.4957L23.1005 18.6274L20.9046 23.5732H16.3534"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="18" height="19" fill="white" transform="translate(15.5 14.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};
