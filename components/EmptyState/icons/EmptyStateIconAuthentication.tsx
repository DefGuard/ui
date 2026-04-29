import { type SVGProps, useId } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconAuthentication = (props: SVGProps<SVGSVGElement>) => {
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
        <g opacity="0.3">
          <path
            d="M31.5445 28.6276H27.5703C27.0199 28.6276 26.5737 29.0737 26.5737 29.6241V32.1035C26.5737 32.6539 27.0199 33.1 27.5703 33.1H31.5445C32.0948 33.1 32.541 32.6539 32.541 32.1035V29.6241C32.541 29.0737 32.0948 28.6276 31.5445 28.6276Z"
            fill="#F7F8FA"
            style={{ fill: ThemeVariable.BgMuted }}
          />
          <path
            d="M31.5445 28.6513V27.37C31.5445 26.421 30.7734 25.6498 29.8243 25.6498H29.2904C28.3414 25.6498 27.5703 26.421 27.5703 27.37V28.6275"
            fill="#F7F8FA"
            style={{ fill: ThemeVariable.BgMuted }}
          />
        </g>
        <path
          d="M30.8801 28.0344H26.9059C26.3555 28.0344 25.9094 28.4805 25.9094 29.0309V31.5103C25.9094 32.0607 26.3555 32.5068 26.9059 32.5068H30.8801C31.4305 32.5068 31.8766 32.0607 31.8766 31.5103V29.0309C31.8766 28.4805 31.4305 28.0344 30.8801 28.0344Z"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{ stroke: ThemeVariable.FgDisabled }}
        />
        <path
          d="M30.8801 28.0581V26.7768C30.8801 25.8278 30.109 25.0566 29.1599 25.0566H28.6261C27.677 25.0566 26.9059 25.8278 26.9059 26.7768V28.0343"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{ stroke: ThemeVariable.FgDisabled }}
        />
        <path
          d="M22.6588 32.5068H19.2896C18.3524 32.5068 17.5932 31.7476 17.5932 30.8103V16.2896C17.5932 15.3524 18.3524 14.5931 19.2896 14.5931H26.7161C27.6533 14.5931 28.4125 15.3524 28.4125 16.2896V21.8891"
          stroke="#939CA9"
          strokeLinejoin="round"
          style={{ stroke: ThemeVariable.FgDisabled }}
        />
        <path d="M21.3776 17.3336H24.6163" stroke="#939CA9" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="15.5291" height="19.1" fill="white" transform="translate(17 14)" />
        </clipPath>
      </defs>
    </svg>
  );
};
