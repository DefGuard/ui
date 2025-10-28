import type { HTMLProps } from 'react';
import './style.scss';
import clsx from 'clsx';

type Props = HTMLProps<HTMLDivElement>;

export const TableHeader = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx('table-header', className)}>
      <div className="cells" {...props}>
        {children}
      </div>
    </div>
  );
};
