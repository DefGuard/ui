import clsx from 'clsx';
import './style.scss';
import type { HTMLProps } from 'react';
import { Icon } from '../Icon';

type Props = {
  open: boolean;
  text: (value: boolean) => string;
  onChange: (value: boolean) => void;
  variant?: 'settings';
} & Omit<HTMLProps<HTMLButtonElement>, 'onChange'>;

export const FoldButton = ({ variant = 'settings', open, text, onChange }: Props) => {
  return (
    <button
      className={clsx('fold-button', `variant-${variant}`)}
      onClick={() => onChange(!open)}
    >
      {variant === 'settings' && <Icon icon="settings" />}
      <span>{text(open)}</span>
    </button>
  );
};
