import './style.scss';

import { CheckBox } from '../Checkbox/CheckBox';
import { CheckBoxProps } from '../Checkbox/types';

type Props = CheckBoxProps & {
  label: string;
};

/* Use when need checkbox with label outside of Form context.*/
export const LabeledCheckbox = ({ label, onChange, value, disabled, ...rest }: Props) => {
  return (
    <div className="labeled-checkbox">
      <CheckBox value={value} disabled={disabled} onChange={onChange} {...rest} />
      <label
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!disabled && onChange) {
            onChange(!value);
          }
        }}
      >
        {label}
      </label>
    </div>
  );
};
