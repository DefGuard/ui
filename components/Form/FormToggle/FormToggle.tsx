import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form';

import { Toggle } from '../../Layout/Toggle/Toggle';
import type { ToggleProps } from '../../Layout/Toggle/types';

interface Props<T extends FieldValues, D>
  extends Omit<ToggleProps<D>, 'onChange' | 'selected'> {
  controller: UseControllerProps<T>;
}

export const FormToggle = <T extends FieldValues, D>({
  controller,
  ...rest
}: Props<T, D>) => {
  const {
    field: { onChange, value },
  } = useController(controller);
  return <Toggle {...rest} selected={value} onChange={(v) => onChange(v)} />;
};
