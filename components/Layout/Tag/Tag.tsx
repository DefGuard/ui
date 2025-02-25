import './style.scss';

import clsx from 'clsx';
import { HTMLProps } from 'react';

import SvgIconCancel from '../../svg/IconCancel';

interface Props extends HTMLProps<HTMLDivElement> {
  onDispose?: () => void;
  disposable?: boolean;
  text: string;
}

export const Tag = ({ onDispose, disposable, text, className, ...rest }: Props) => {
  return (
    <div
      className={clsx('tag', className, {
        disposable: disposable,
      })}
      {...rest}
    >
      <span>{text}</span>
      {disposable && (
        <button
          className="dispose"
          onClick={() => {
            onDispose?.();
          }}
        >
          <SvgIconCancel />
        </button>
      )}
    </div>
  );
};
