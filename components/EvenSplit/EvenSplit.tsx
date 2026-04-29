import clsx from 'clsx';
import type { HTMLProps } from 'react';
import { ThemeSpacing, type ThemeSpacingValue } from '../../types';
import './style.scss';

type Props = HTMLProps<HTMLDivElement> & {
  parts?: number;
  spacing?: ThemeSpacingValue;
};

export const EvenSplit = ({
  className,
  parts = 2,
  style,
  children,
  spacing = ThemeSpacing.Md,
  ...props
}: Props) => {
  return (
    <div
      className={clsx('even-split', className)}
      style={{
        ...style,
        gridTemplateColumns: `repeat(${parts}, 1fr)`,
        columnGap: spacing,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
