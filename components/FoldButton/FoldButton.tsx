import clsx from 'clsx';
import './style.scss';
import type { HTMLProps } from 'react';
import { Icon } from '../Icon';

type Props = {
  open: boolean;
  textOpen: string;
  textClose: string;
  onChange: (value: boolean) => void;
  variant?: 'settings';
} & Omit<HTMLProps<HTMLButtonElement>, 'onChange'>;

export const FoldButton = ({
  variant = 'settings',
  open,
  textOpen,
  textClose,
  onChange,
}: Props) => {
  return (
    <button
      className={clsx('fold-button', `variant-${variant}`)}
      onClick={() => onChange(!open)}
    >
      {variant === 'settings' && <Icon icon="settings" />}
      <span>{open ? textClose : textOpen}</span>
    </button>
  );
};
