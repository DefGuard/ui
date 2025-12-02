import type { HTMLProps } from 'react';
import './style.scss';
import clsx from 'clsx';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  text: string;
  size?: 'sm' | 'lg';
}

export const Chip = ({ text, className, size = 'sm', ...containerProps }: Props) => {
  return (
    <div className={clsx('chip', className, `size-${size}`)} {...containerProps}>
      <span>{text}</span>
    </div>
  );
};
