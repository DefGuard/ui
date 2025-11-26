import type { HTMLProps, PropsWithChildren } from 'react';
import type { IconKindValue } from '../Icon/icon-types';
import './style.scss';
import clsx from 'clsx';
import { ThemeVariable } from '../../types';
import { Icon } from '../Icon';

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
      <div className="icon-wrapper">
        <div className="bg"></div>
        <Icon icon={icon} size={20} staticColor={ThemeVariable.FgAction} />
      </div>
      <div className="content">{children}</div>
    </div>
  );
};
