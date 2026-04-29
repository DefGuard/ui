import { type SVGProps, useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconAliases = (props: SVGProps<SVGSVGElement>) => {
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
          d="M33.264 29.3712H29.0843C28.5055 29.3712 28.0363 29.8404 28.0363 30.4193V33.0269C28.0363 33.6057 28.5055 34.075 29.0843 34.075H33.264C33.8428 34.075 34.3121 33.6057 34.3121 33.0269V30.4193C34.3121 29.8404 33.8428 29.3712 33.264 29.3712Z"
          fill="#F7F8FA"
          style={{
            fill: ThemeVariable.BgMuted,
          }}
        />
        <path
          d="M32.1411 28.3232H27.9614C27.3826 28.3232 26.9133 28.7924 26.9133 29.3712V31.9789C26.9133 32.5577 27.3826 33.0269 27.9614 33.0269H32.1411C32.7199 33.0269 33.1892 32.5577 33.1892 31.9789V29.3712C33.1892 28.7924 32.7199 28.3232 32.1411 28.3232Z"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M32.1411 28.3606V27.0131C32.1411 26.015 31.3302 25.204 30.332 25.204H29.7706C28.7724 25.204 27.9614 26.015 27.9614 27.0131V28.3357"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M31.2303 22.9831C31.929 20.4254 31.8666 18.2669 31.8167 17.3186C30.5815 17.2687 28.972 17.0816 27.1504 16.5326C25.5409 16.046 24.2308 15.4222 23.2327 14.8607C22.272 15.4346 20.9744 16.0834 19.3649 16.57C17.5183 17.1315 15.8839 17.2937 14.6736 17.3186C14.5613 18.8034 14.4865 22.9581 17.0567 27.2127C19.1653 30.7062 21.985 32.3781 23.2576 33.0269H23.2327C23.5446 32.8647 23.9563 32.6401 24.418 32.3407"
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
            width="20.5992"
            height="20.15"
            fill="white"
            transform="translate(13.7004 13.925)"
            style={{
              fill: ThemeVariable.BgWhite,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
