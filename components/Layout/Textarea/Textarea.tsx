import './style.scss';

import { useDrag } from '@use-gesture/react';
import clsx from 'clsx';
import { useState } from 'react';

import { isPresent } from '../../../utils/isPresent';
import { FieldError } from '../FieldError/FieldError';
import { TextareaProps } from './types';

const defaultHeight = 200;

export const Textarea = ({
  onChange,
  value,
  errorMessage,
  label,
  disabled = false,
}: TextareaProps) => {
  const [height, setHeight] = useState(defaultHeight);
  const bindDrag = useDrag(
    ({ delta: [, dy] }) => {
      setHeight((current) => {
        const next = current + dy;
        if (next >= 200) {
          return next;
        }
        return current;
      });
    },
    {
      enabled: !disabled,
    },
  );

  return (
    <div className="textarea-spacer spacer">
      <div className="textarea">
        {isPresent(label) && <p className="label">{label}:</p>}
        <div
          className={clsx('inner', {
            error: isPresent(errorMessage),
            disabled: disabled,
          })}
        >
          <textarea
            style={{ height: height }}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            disabled={disabled}
          />
          <div {...bindDrag()} className="resize-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path d="M21 10.6465L10.6465 21" stroke="#899CA8" strokeLinecap="round" />
              <path
                d="M20.9099 14.6978L14.6978 20.9099"
                stroke="#899CA8"
                strokeLinecap="round"
              />
              <path
                d="M20.8199 18.7495L18.7492 20.8202"
                stroke="#899CA8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <FieldError errorMessage={errorMessage} />
      </div>
    </div>
  );
};
