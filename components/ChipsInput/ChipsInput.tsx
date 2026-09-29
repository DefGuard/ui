import './style.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { isPresent } from '../../utils/isPresent';
import { Chip } from '../Chip/Chip';
import { FieldBox } from '../FieldBox/FieldBox';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import type { ChipsInputProps } from './types';

export const ChipsInput = ({
  value,
  onChange,
  onBlur,
  error,
  label,
  helper,
  testId,
  validate,
  onInputErrorChange,
}: ChipsInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState<string>();
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cursorPosition = Math.min(cursor ?? value.length, value.length);
  const isInputEmpty = inputValue.length === 0;
  const errorMessage = inputError ?? error;

  const addChip = () => {
    const chip = inputValue.trim();
    if (!chip.length) return;

    const chipError = validate?.(chip);
    if (isPresent(chipError)) {
      setInputError(chipError);
      onInputErrorChange?.(chipError);
      return;
    }

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
    <div className="chips-input">
      {isPresent(label) && <FieldLabel text={label} helper={helper} />}
      <FieldBox
        className={clsx({
          'has-chips': value.length > 0,
        })}
        error={isPresent(errorMessage)}
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
              width: `${inputValue.length + 1}ch`,
            }}
            onChange={(event) => {
              setInputValue(event.target.value);
              if (isPresent(inputError)) {
                setInputError(undefined);
                onInputErrorChange?.(undefined);
              }
            }}
            onKeyDown={(event) => {
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
            }}
            onBlur={(event) => {
              addChip();
              setCursor(null);
              onBlur?.(event);
            }}
          />
          {value
            .slice(cursorPosition)
            .map((chip, index) => renderChip(chip, cursorPosition + index))}
        </div>
      </FieldBox>
      <FieldError error={errorMessage} />
    </div>
  );
};
