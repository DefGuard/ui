import type { HTMLProps, PropsWithChildren } from 'react';
import { Icon } from '../Icon';
import './style.scss';
import clsx from 'clsx';

type Props = HTMLProps<HTMLAnchorElement> & PropsWithChildren;

export const ExternalLink = ({ children, className, ...props }: Props) => {
  return (
    <a {...props} className={clsx(className, 'external-link')}>
      <span>{children}</span>
      <Icon icon="open-in-new-window" />
    </a>
  );
};
