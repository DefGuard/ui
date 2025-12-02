import { useFieldContext } from '../../../../form';
import { RadioBlock } from '../../RadioBlock/RadioBlock';
import type { RadioBlockProps } from '../../RadioBlock/types';

type Props = Pick<RadioBlockProps, 'title' | 'content'> & {
  value: string | boolean | number;
};

export const FormRadioBlock = ({ value, title, content }: Props) => {
  const field = useFieldContext<string | boolean | number>();
  return (
    <RadioBlock
      value={value === field.state.value}
      onClick={() => {
        field.handleChange(value);
      }}
      title={title}
      content={content}
    />
  );
};
