import './style.scss';
import clsx from 'clsx';
import { isPresent } from '../../utils/isPresent';
import type { ToggleProps } from './types';

export const Toggle = ({
  active,
  testId,
  label,
  disabled = false,
  onClick,
}: ToggleProps) => {
  return (
    <div
      className={clsx('toggle', {
        disabled,
        active,
      })}
      role="button"
      aria-disabled={disabled}
      onClick={(e) => {
        if (!disabled) {
          onClick?.(e);
        }
      }}
    >
      <div className="inner">
        <div className="circle" data-testid={testId}></div>
      </div>
      {isPresent(label) && <p>{label}</p>}
    </div>
  );
};
