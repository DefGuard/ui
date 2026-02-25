import './style.scss';
import { useHover } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { isPresent } from '../../utils/isPresent';
import { Badge } from '../Badge/Badge';
import { FieldError } from '../FieldError/FieldError';
import { RadioIndicator } from '../RadioIndicator/RadioIndicator';
import type { RadioProps } from './types';

export const Radio = ({
  text,
  testId,
  active,
  disabled,
  error,
  onClick,
  badgeProps,
}: RadioProps) => {
  const [ref, hover] = useHover();

  return (
    <div
      className={clsx('radio', {
        disabled,
      })}
    >
      <div
        ref={ref}
        onClick={() => {
          if (!disabled) {
            onClick?.();
          }
        }}
        data-testid={testId}
        data-active={active}
        data-disabled={disabled}
        role="button"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={clsx('inner', {
          text: isPresent(text),
          disabled,
        })}
      >
        <RadioIndicator hover={hover} active={active} disabled={disabled} />
        {isPresent(text) && <span>{text}</span>}
        {isPresent(badgeProps) && <Badge {...badgeProps} />}
      </div>
      <FieldError error={error} />
    </div>
  );
};
