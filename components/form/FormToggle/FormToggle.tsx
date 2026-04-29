import { useFieldContext } from '../../../../form';
import { Toggle } from '../../Toggle/Toggle';
import type { ToggleProps } from '../../Toggle/types';

export const FormToggle = ({
  disabled,
  label,
}: Omit<ToggleProps, 'active' | 'onClick'>) => {
  const field = useFieldContext<boolean>();

  return (
    <Toggle
      disabled={disabled}
      label={label}
      active={field.state.value}
      onClick={() => {
        field.handleChange(!field.state.value);
      }}
    />
  );
};
