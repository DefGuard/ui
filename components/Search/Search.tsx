import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import type { InputProps } from '../Input/types';

type Props = {
  placeholder?: string;
  initialValue?: string;
  debounce?: number;
  size?: InputProps['size'];
  onChange: (val: string) => void;
};

export const Search = ({
  onChange,
  size,
  debounce,
  initialValue,
  placeholder,
}: Props) => {
  const [value, setValue] = useState(initialValue ?? '');
  const debounced = useDebounce(value, debounce ?? 200);

  // biome-ignore lint/correctness/useExhaustiveDependencies: sideEffect
  useEffect(() => {
    onChange(debounced);
  }, [debounced]);

  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={value}
      size={size}
      onChange={(val) => {
        setValue((val as string | null) ?? '');
      }}
    />
  );
};
