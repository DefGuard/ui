import { useMemo } from 'react';
import { useFieldContext } from '../../../../form';
import { isPresent } from '../../../utils/isPresent';
import { InteractiveBlock } from '../../InteractiveBlock/InteractiveBlock';
import type { InteractiveBlockProps } from '../../InteractiveBlock/types';

type Props = Omit<InteractiveBlockProps, 'value' | 'onChange'> & {
  value?: number | string | boolean;
};

export const FormInteractiveBlock = ({ value, children, ...props }: Props) => {
  const field = useFieldContext<number | string | boolean>();

  const valueState = useMemo(() => {
    if (props.variant === 'empty') {
      return false;
    }
    if (props.variant === 'radio') {
      return value === field.state.value;
    }
    return Boolean(field.state.value);
  }, [field.state.value, props.variant, value]);

  return (
    <InteractiveBlock
      value={valueState}
      onClick={() => {
        if (props.variant === 'empty') {
          return;
        }
        if (props.variant === 'radio' && isPresent(value)) {
          field.handleChange(value);
        }
        if (props.variant !== 'radio') {
          field.handleChange(!field.state.value);
        }
      }}
      {...props}
    >
      {children}
    </InteractiveBlock>
  );
};
