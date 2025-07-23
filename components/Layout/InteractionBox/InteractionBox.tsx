import './style.scss';

import clsx from 'clsx';
import { type PropsWithChildren, useState } from 'react';

type Props = {
  onClick: () => void;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  className?: string;
} & PropsWithChildren;

export const InteractionBox = ({
  children,
  preventDefault,
  stopPropagation,
  className,
  onClick,
}: Props) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={clsx('interaction-box', className, {
        hover: hover,
      })}
    >
      {children}
      <button
        type="button"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={(e) => {
          if (preventDefault) {
            e.preventDefault();
          }
          if (stopPropagation) {
            e.stopPropagation();
          }
          onClick();
        }}
      />
    </div>
  );
};
