import './style.scss';
import { measureNaturalWidth, prepareWithSegments } from '@chenglou/pretext';
import clsx from 'clsx';
import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isPresent } from '../../utils/isPresent';
import { Chip } from '../Chip/Chip';
import { FieldBox } from '../FieldBox/FieldBox';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import type { MultiSelectProps } from './types';

export const MultiSelect = ({
  value,
  onChange,
  onBlur,
  error,
  label,
  helper,
  testId,
  validateValue,
  onInputChange,
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState('');
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cursorPosition = Math.min(cursor ?? value.length, value.length);
  const isInputEmpty = inputValue.length === 0;

  const inputWidth = useMemo(() => {
    if (!inputRef.current) return 2;
    const { fontWeight, fontSize, fontFamily } = getComputedStyle(inputRef.current);
    const font = `${fontWeight} ${fontSize} ${fontFamily}`;
    const textWidth = measureNaturalWidth(prepareWithSegments(inputValue, font));
    return Math.ceil(Math.max(textWidth + 4, 2));
  }, [inputValue]);

  const addChip = () => {
    const chip = inputValue.trim();
    if (!chip.length) return;

    if (isPresent(validateValue) && !validateValue(chip)) return;

    onChange([...value.slice(0, cursorPosition), chip, ...value.slice(cursorPosition)]);
    setCursor(cursorPosition + 1);
    setInputValue('');
  };

  const removeChip = (index: number) => {
    onChange(value.filter((_, chipIndex) => chipIndex !== index));
    if (index < cursorPosition) {
      setCursor(cursorPosition - 1);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onInputChange?.(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        addChip();
        break;
      case 'Backspace':
        if (isInputEmpty && cursorPosition > 0) {
          removeChip(cursorPosition - 1);
        }
        break;
      case 'ArrowLeft':
        if (isInputEmpty && cursorPosition > 0) {
          setCursor(cursorPosition - 1);
        }
        break;
      case 'ArrowRight':
        if (isInputEmpty && cursorPosition < value.length) {
          setCursor(cursorPosition + 1);
        }
        break;
    }
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    addChip();
    setCursor(null);
    onBlur?.(event);
  };

  const renderChip = (chip: string, index: number) => (
    <Chip
      key={index}
      size="lg"
      text={chip}
      onDismiss={() => {
        removeChip(index);
      }}
    />
  );

  return (
    <div className="multi-select">
      {isPresent(label) && <FieldLabel text={label} helper={helper} />}
      <FieldBox
        className={clsx({
          'has-chips': value.length > 0,
        })}
        error={isPresent(error)}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <div className="chips-container">
          {value.slice(0, cursorPosition).map((chip, index) => renderChip(chip, index))}
          <input
            data-testid={testId}
            ref={inputRef}
            type="text"
            value={inputValue}
            style={{
              width: `${inputWidth}px`,
            }}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
          />
          {value
            .slice(cursorPosition)
            .map((chip, index) => renderChip(chip, cursorPosition + index))}
        </div>
      </FieldBox>
      <FieldError error={error} />
    </div>
  );
};
