import clsx from 'clsx';
import { Radio } from '../Radio/Radio';
import './style.scss';
import { isPresent } from '../../utils/isPresent';
import { Badge } from '../Badge/Badge';
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
          <p className="title">
            {title}
            {isPresent(badge) && (
              <span className="badge">
                <Badge {...badge} />
              </span>
            )}
          </p>
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
