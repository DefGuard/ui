import type { HTMLProps } from 'react';
import './style.scss';
import clsx from 'clsx';
import React from 'react';

type Props = HTMLProps<HTMLDivElement> & {
  variant?: 'default' | 'sub-header';
  first?: boolean;
  last?: boolean;
  tableSelectionEnabled?: boolean;
  assignColumnSizing?: boolean;
};

export const TableRowContainer = ({
  children,
  className,
  first,
  last,
  variant = 'default',
  assignColumnSizing = false,
  ...props
}: Props) => {
  const childrenCount = React.Children.count(children);

  return (
    <div
      className={clsx('table-row-container', className, `variant-${variant}`, {
        first,
        last,
      })}
      {...props}
    >
      {React.Children.map(children, (child, childIndex) => {
        if (!React.isValidElement(child)) return child;
        if (
          !assignColumnSizing ||
          childIndex === childrenCount - 1 ||
          child.type === React.Fragment
        )
          return child;
        return React.cloneElement(child, {
          // @ts-expect-error
          style: {
            // @ts-expect-error
            ...(child.props.style ?? {}),
            width: `calc(var(--col-${childIndex}-size) * 1px)`,
          },
        });
      })}
    </div>
  );
};
