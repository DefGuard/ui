import clsx from 'clsx';
import { Radio } from '../Radio/Radio';
import './style.scss';
import { isPresent } from '../../utils/isPresent';
import { Badge } from '../Badge/Badge';
import { CheckboxIndicator } from '../CheckboxIndicator/CheckboxIndicator';
import { Toggle } from '../Toggle/Toggle';
import type { InteractiveBlockProps } from './types';

export const InteractiveBlock = ({
  content,
  onClick,
  title,
  value,
  className,
  children,
  badge,
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
          if (!disabled && variant !== 'empty') {
            onClick?.(e);
          }
        }}
      >
        <div className="icon-track">
          {variant === 'radio' && <Radio active={value} disabled={disabled} />}
          {variant === 'toggle' && <Toggle active={value} disabled={disabled} />}
          {variant === 'checkbox' && (
            <CheckboxIndicator active={value} disabled={disabled} />
          )}
        </div>
        <div className="interactive-content content-track">
          <div className="header">
            <p className="title">{title}</p>
            {isPresent(badge) && <Badge {...badge} />}
          </div>
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
