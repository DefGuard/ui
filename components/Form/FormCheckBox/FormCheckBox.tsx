import './style.scss';

import { isUndefined } from 'lodash-es';
import { useId, useMemo } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { CheckBox, CheckBoxProps } from '../../Layout/Checkbox/CheckBox';

interface Props<T extends FieldValues> extends Partial<CheckBoxProps> {
  controller: UseControllerProps<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customValue?: (context: any) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customOnChange?: (context: any) => unknown;

  label?: string;
  labelPlacement?: 'left' | 'right';
}

export const FormCheckBox = <T extends FieldValues>({
  controller,
  customValue,
  customOnChange,
  label,
  labelPlacement,
  ...rest
}: Props<T>) => {
  const fieldId = useId();

  const {
    field: { value, onChange },
  } = useController(controller);

  const checkBoxValue = useMemo(() => {
    if (customValue) {
      return customValue(value);
    }

    return value;
  }, [customValue, value]);

  const renderLabel = () => {
    if (label) {
      return (
        <label
          htmlFor={fieldId}
          onClick={() => {
            onChange(!checkBoxValue);
          }}
        >
          {label}
        </label>
      );
    }
    return null;
  };

  return (
    <div className="form-checkbox">
      {labelPlacement === 'left' && !isUndefined(label) && renderLabel()}
      <CheckBox
        id={fieldId}
        data-testid={`field-${controller.name}`}
        {...rest}
        value={checkBoxValue}
        onChange={(e) => {
          if (customOnChange) {
            onChange(customOnChange(value));
          } else {
            onChange(e);
          }
        }}
      />
      {labelPlacement === 'right' && !isUndefined(label) && renderLabel()}
    </div>
  );
};
