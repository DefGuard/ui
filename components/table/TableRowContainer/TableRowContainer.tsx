import type { HTMLProps } from 'react';
import './style.scss';
import clsx from 'clsx';

type Props = HTMLProps<HTMLDivElement> & {
  variant?: 'default' | 'sub-header';
  first?: boolean;
  last?: boolean;
};

export const TableRowContainer = ({
  children,
  className,
  first,
  last,
  variant = 'default',
  ...props
}: Props) => {
  return (
    <div
      className={clsx('table-row-container', className, `variant-${variant}`, {
        first,
        last,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
