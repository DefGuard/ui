import './style.scss';

import classNames from 'classnames';
import clsx from 'clsx';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { debounceTime, Subject } from 'rxjs';

import SvgIconLoupe from '../../svg/IconLoupe';
import { InteractionBox } from '../InteractionBox/InteractionBox';

type Props = {
  containerMotionProps?: HTMLMotionProps<'div'>;
  debounceTiming?: number;
  onDebounce?: (v: string) => void;
  className?: string;
  onChange?: (v: string) => void;
  initialValue?: string;
  placeholder?: string;
};
/**
 * Styled input component that can debounce it's input witch is handy when handling requests depending on user input stream
 */
export const Search = ({
  className,
  containerMotionProps,
  debounceTiming = 1000,
  onDebounce,
  onChange,
  placeholder,
  initialValue = '',
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(initialValue);
  const [changeSubject, setChangeSubject] = useState<Subject<string> | undefined>();
  const [inputFocus, setInputFocus] = useState(false);

  const cn = classNames('search', className);

  const showClear = inputValue.length > 0 && inputFocus;

  useEffect(() => {
    if (changeSubject) {
      const sub = changeSubject.pipe(debounceTime(debounceTiming)).subscribe((value) => {
        if (onDebounce) {
          onDebounce(value);
        }
      });
      return () => sub.unsubscribe();
    } else {
      setChangeSubject(new Subject());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeSubject]);

  return (
    <motion.div
      ref={containerRef}
      className={cn}
      onClick={() => inputRef.current?.focus()}
      {...containerMotionProps}
    >
      <motion.input
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        initial="idle"
        onBlur={(event) => {
          if (containerRef.current) {
            if (!containerRef.current.contains(event.relatedTarget)) {
              setInputFocus(false);
            }
          } else {
            setInputFocus(false);
          }
        }}
        onFocus={() => {
          setInputFocus(true);
        }}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
          if (onDebounce) {
            changeSubject?.next(e.target.value);
          }
          setInputValue(e.target.value);
        }}
      />
      <div className="icon">
        {!showClear && <SvgIconLoupe />}
        {showClear && (
          <InteractionBox
            stopPropagation
            preventDefault
            className={clsx('clear-value')}
            onClick={() => {
              setInputValue('');
              changeSubject?.next('');
              inputRef.current?.focus();
            }}
          >
            <ClearIcon />
          </InteractionBox>
        )}
      </div>
    </motion.div>
  );
};

const ClearIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M13.6281 12.4712L5.52849 4.37163C5.20897 4.05211 4.69093 4.05211 4.37141 4.37163C4.05189 4.69115 4.05189 5.2092 4.37141 5.52872L12.471 13.6283C12.7905 13.9478 13.3086 13.9478 13.6281 13.6283C13.9476 13.3088 13.9476 12.7907 13.6281 12.4712Z"
        fill="#C4C4C4"
      />
      <path
        d="M5.5289 13.6281L13.6285 5.52849C13.948 5.20897 13.948 4.69093 13.6285 4.37141C13.309 4.05189 12.7909 4.05189 12.4714 4.37141L4.37182 12.471C4.0523 12.7905 4.0523 13.3086 4.37182 13.6281C4.69134 13.9476 5.20938 13.9476 5.5289 13.6281Z"
        fill="#C4C4C4"
      />
    </svg>
  );
};
