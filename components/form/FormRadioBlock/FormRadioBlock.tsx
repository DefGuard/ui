import { useFieldContext } from '../../../../form';
import { InteractiveBlock } from '../../InteractiveBlock/InteractiveBlock';
import type { InteractiveBlockProps } from '../../InteractiveBlock/types';

type Props = Pick<InteractiveBlockProps, 'title' | 'content'> & {
  value: string | boolean | number;
};

export const FormRadioBlock = ({ value, title, content }: Props) => {
  const field = useFieldContext<string | boolean | number>();
  return (
    <InteractiveBlock
      value={value === field.state.value}
      onClick={() => {
        field.handleChange(value);
      }}
      title={title}
      content={content}
    />
  );
};
