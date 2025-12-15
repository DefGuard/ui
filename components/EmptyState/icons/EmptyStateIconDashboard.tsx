import type { SVGProps } from 'react';
import { ThemeVariable } from '../../../types';

export const EmptyStateIconDashboard = (props: SVGProps<SVGSVGElement>) => {
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
        style={{ stroke: ThemeVariable.BorderFaded }}
      />
      <path
        d="M30.2192 17.5968H20.4127C18.3817 17.5968 16.7353 19.2432 16.7353 21.2742V31.0807C16.7353 33.1117 18.3817 34.7581 20.4127 34.7581H30.2192C32.2501 34.7581 33.8966 33.1117 33.8966 31.0807V21.2742C33.8966 19.2432 32.2501 17.5968 30.2192 17.5968Z"
        fill="#F7F8FA"
        style={{ fill: ThemeVariable.BgMuted }}
      />
      <path
        d="M20.1632 29.3323V25.0542"
        stroke="#939CA9"
        strokeLinejoin="round"
        style={{ stroke: ThemeVariable.FgDisabled }}
      />
      <path
        d="M24.4536 29.3323V21.8426"
        stroke="#939CA9"
        strokeLinejoin="round"
        style={{ stroke: ThemeVariable.FgDisabled }}
      />
      <path
        d="M28.7316 29.3323V18.631"
        stroke="#939CA9"
        strokeLinejoin="round"
        style={{ stroke: ThemeVariable.FgDisabled }}
      />
      <path
        d="M28.9032 15.6694H19.0968C17.0658 15.6694 15.4194 17.3158 15.4194 19.3468V29.1532C15.4194 31.1842 17.0658 32.8307 19.0968 32.8307H28.9032C30.9342 32.8307 32.5806 31.1842 32.5806 29.1532V19.3468C32.5806 17.3158 30.9342 15.6694 28.9032 15.6694Z"
        stroke="#939CA9"
        strokeLinejoin="round"
        style={{ stroke: ThemeVariable.FgDisabled }}
      />
    </svg>
  );
};
