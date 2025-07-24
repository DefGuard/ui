import { type SVGProps, useId } from 'react';

const SvgIconArrowSingleSmall = (props: SVGProps<SVGSVGElement>) => {
  const id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <mask
        id={id}
        width={18}
        height={18}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <path fill="#fff" d="M18 0H0v18h18z" />
      </mask>
      <g fill="#899CA8" mask={`url(#${id})`}>
        <path d="m7.464 7.265 2.314 2.314a.818.818 0 1 0 1.157-1.157L8.621 6.108a.818.818 0 1 0-1.157 1.157" />
        <path d="m9.777 8.703-2.314 2.314a.818.818 0 0 0 1.157 1.157l2.314-2.314a.818.818 0 1 0-1.157-1.157" />
      </g>
    </svg>
  );
};
export default SvgIconArrowSingleSmall;
