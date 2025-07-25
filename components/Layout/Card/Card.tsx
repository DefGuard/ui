import './style.scss';

import classNames from 'classnames';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { type ReactNode, useMemo } from 'react';
import { useBreakpoint } from 'use-breakpoint';

import { deviceBreakpoints } from '../../../../constants';

interface Props extends HTMLMotionProps<'div'> {
  children?: ReactNode;
  shaded?: boolean;
  hideMobile?: boolean;
  bordered?: boolean;
}

export const Card = ({
  bordered,
  children,
  className,
  shaded,
  hideMobile,
  ...rest
}: Props) => {
  const { breakpoint } = useBreakpoint(deviceBreakpoints);

  const cn = useMemo(
    () =>
      classNames('card', className, {
        shaded,
        bordered,
        'hide-appearance': breakpoint !== 'desktop' && hideMobile,
      }),
    [breakpoint, className, hideMobile, shaded, bordered],
  );

  return (
    <motion.div className={cn} {...rest}>
      {children}
    </motion.div>
  );
};
