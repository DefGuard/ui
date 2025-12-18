import clsx from 'clsx';
import './style.scss';
import { isPresent } from '../../utils/isPresent';
import { FieldError } from '../FieldError/FieldError';
import type { CheckboxProps } from './types';

export const Checkbox = ({
  text,
  error,
  testId,
  forceHover,
  active = false,
  disabled = false,
  onClick,
}: CheckboxProps) => {
  const hasError = isPresent(error);

  return (
    <div
      data-testid={testId}
      className="checkbox"
      onClick={onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      data-active={active}
    >
      <div
        className={clsx('track', {
          text: isPresent(text),
          disabled: disabled,
          active: active,
          error: hasError,
        })}
      >
        <div className="box-positioner">
          <div
            className={clsx('box', {
              hover: forceHover,
              disabled: disabled,
              active: active,
              error: hasError,
            })}
          ></div>
          {active && <CheckIcon />}
        </div>
        {isPresent(text) && <span>{text}</span>}
      </div>
      {isPresent(error) && error.length > 0 && <FieldError error={error} />}
    </div>
  );
};

const CheckIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5 7.47029L8.38301 14L4.5 10.4374L5.79805 8.96712L8.38301 11.3388L14.2019 6L15.5 7.47029Z"
        fill="#7E8794"
      />
    </svg>
  );
};
