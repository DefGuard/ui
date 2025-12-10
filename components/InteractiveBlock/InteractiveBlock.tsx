import clsx from 'clsx';
import { Radio } from '../Radio/Radio';
import './style.scss';
import { isPresent } from '../../utils/isPresent';
import { Checkbox } from '../Checkbox/Checkbox';
import { Toggle } from '../Toggle/Toggle';
import type { InteractiveBlockProps } from './types';

export const InteractiveBlock = ({
  content,
  onClick,
  title,
  value,
  className,
  children,
  variant = 'radio',
  disabled = false,
  ...containerProps
}: InteractiveBlockProps) => {
  return (
    <div
      className={clsx('interactive-block', className, `variant-${variant}`, {
        disabled,
      })}
      aria-disabled={disabled}
      {...containerProps}
    >
      <div
        className="interactive grid"
        onClick={(e) => {
          if (!disabled) {
            onClick?.(e);
          }
        }}
      >
        <div className="icon-track">
          {variant === 'radio' && <Radio active={value} disabled={disabled} />}
          {variant === 'toggle' && <Toggle active={value} disabled={disabled} />}
          {variant === 'checkbox' && <Checkbox active={value} disabled={disabled} />}
        </div>
        <div className="interactive-content content-track">
          <p className="title">{title}</p>
          {isPresent(content) && <p className="content">{content}</p>}
        </div>
      </div>
      {isPresent(children) && (
        <div className="grid">
          <div className="content-track">{children}</div>
        </div>
      )}
    </div>
  );
};
