import type { SVGProps } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconRules = (props: SVGProps<SVGSVGElement>) => {
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
      <g clipPath="url(#clip0_6308_431)">
        <path
          d="M34.828 17.2333C34.4244 16.8171 33.8568 16.5648 33.2262 16.5648H20.6892C19.4406 16.5648 18.4189 17.5864 18.4189 18.8477V29.1018H14.9883V31.3847C14.9883 32.6334 16.0225 33.655 17.2712 33.655H28.673C29.9217 33.655 30.9433 32.6334 30.9433 31.3847V21.118H35.5091V18.8477C35.5091 18.2171 35.2568 17.6495 34.828 17.2333Z"
          fill="#F7F8FA"
          style={{
            fill: ThemeVariable.BgMuted,
          }}
        />
        <path
          d="M33.9451 17.5738V19.8567H29.392V17.5738C29.392 16.3251 30.4136 15.2909 31.6749 15.2909C32.3055 15.2909 32.8731 15.5431 33.2767 15.9594C33.6929 16.3756 33.9451 16.9432 33.9451 17.5612V17.5738Z"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M16.855 32.3811H17.9901H27.1091"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M31.6749 15.2909C30.4262 15.2909 29.392 16.3125 29.392 17.5738V30.1108C29.392 31.3594 28.3703 32.3937 27.1091 32.3937C25.8478 32.3937 24.8262 31.3721 24.8262 30.1108V27.8279H16.855V17.5738C16.855 16.3251 17.8766 15.2909 19.1379 15.2909H31.6749Z"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M15.7198 32.3811C14.4711 32.3811 13.4369 31.3595 13.4369 30.0982V27.8153H16.8549"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M15.7198 32.3811H17.9901"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M19.8946 19.9198H26.1757"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
        <path
          d="M19.8946 23.8297H23.4892"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{
            stroke: ThemeVariable.FgDisabled,
          }}
        />
      </g>
      <defs>
        <clipPath id="clip0_6308_431">
          <rect
            width="23.0181"
            height="19.31"
            fill="white"
            transform="translate(12.491 14.345)"
            style={{
              fill: ThemeVariable.BgWhite,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
