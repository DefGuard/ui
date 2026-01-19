import type { HTMLProps, PropsWithChildren } from 'react';
import type { IconKindValue } from '../Icon/icon-types';
import './style.scss';
import clsx from 'clsx';
import { SectionMarker } from '../SectionMarker/SectionMarker';

type Props = {
  icon: IconKindValue;
} & PropsWithChildren &
  HTMLProps<HTMLDivElement>;

export const MarkedSection = ({
  icon,
  children,
  className,
  ...containerProps
}: Props) => {
  return (
    <div className={clsx('marked-section', className)} {...containerProps}>
      <SectionMarker icon={icon} />
      <div className="content">{children}</div>
    </div>
  );
};
