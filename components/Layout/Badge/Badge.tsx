import './style.scss';

import classNames from 'classnames';
import { HTMLProps, useMemo } from 'react';

import { BadgeStyleVariant } from './types';

type Props = HTMLProps<HTMLDivElement> & {
  text?: string;
  icon?: React.ReactNode;
  styleVariant?: BadgeStyleVariant;
};

export const Badge = ({
  text,
  className,
  styleVariant = BadgeStyleVariant.STANDARD,
  icon,
  ...rest
}: Props) => {
  const cn = useMemo(
    () => classNames('badge', className, styleVariant.valueOf()),
    [className, styleVariant],
  );

  return (
    <div className={cn} {...rest}>
      {icon}
      {text && <span>{text}</span>}
    </div>
  );
};
