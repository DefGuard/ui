import type { SVGProps } from 'react';
const SvgIconInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <circle cx={9} cy={9} r={9} style={{ fill: 'var(--surface-icon-primary)' }} />
    <path
      d="M8 8a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0zM8 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0"
      style={{ fill: 'var(--surface-icon-secondary)' }}
    />
  </svg>
);
export default SvgIconInfo;
