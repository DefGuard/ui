import './style.scss';

import classNames from 'classnames';
import { useMemo } from 'react';

import { CheckBoxProps } from './types';

export const CheckBox = ({
  value,
  onChange,
  disabled = false,
  ...rest
}: CheckBoxProps) => {
  const checked = useMemo(() => (Number(value) ? true : false), [value]);

  const cn = useMemo(
    () =>
      classNames('checkbox', {
        checked: checked,
        disabled: disabled,
      }),
    [checked, disabled],
  );

  return (
    <div
      {...rest}
      className={cn}
      onClick={() => {
        if (onChange && !disabled) {
          onChange(!value);
        }
      }}
    >
      <div className="box"></div>
    </div>
  );
};
