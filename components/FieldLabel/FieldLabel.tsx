import './style.scss';

import clsx from 'clsx';
import { type MouseEventHandler, type Ref, useMemo } from 'react';
import { m } from '../../../../paraglide/messages';
import type { TranslationKey } from '../../types';
import { isPresent } from '../../utils/isPresent';
import { Helper } from '../Helper/Helper';

type TranslationParams = Record<string, unknown>;
type MessageFn = (...args: unknown[]) => string;

const getMessage = (key: string, params?: TranslationParams): string | null => {
  const maybeMessage = (m as Record<string, unknown>)[key];

  if (typeof maybeMessage !== 'function') {
    return null;
  }

  const message = maybeMessage as MessageFn;
  if (isPresent(params)) {
    return message(params);
  }

  return message();
};

function getHelper<K extends TranslationKey>(key: K) {
  const helperKey = `${String(key)}_helper`;
  return getMessage(helperKey);
}

type Props = {
  label: TranslationKey;
  labelArgs?: TranslationParams;
  id?: string;
  ref?: Ref<HTMLDivElement>;
  required?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const FieldLabel = ({ label, labelArgs, ref, required, id, onClick }: Props) => {
  const labelText = useMemo((): string => {
    const resolvedLabel = getMessage(String(label), labelArgs);
    if (isPresent(resolvedLabel)) {
      return resolvedLabel;
    }
    return String(label);
  }, [label, labelArgs]);

  const helperText = useMemo((): string | null => getHelper(label), [label]);

  const shouldRenderHelper = useMemo(
    () => isPresent(helperText) && helperText.trim().length > 0,
    [helperText],
  );

  return (
    <div
      className={clsx('field-label', {
        required,
      })}
      ref={ref}
      id={id}
      onClick={onClick}
    >
      {required && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5"
          height="5"
          viewBox="0 0 5 5"
          fill="none"
          className="required-icon"
        >
          <path
            d="M1.332 4.128L0.6 3.684L1.368 2.52H0V1.608L1.368 1.62L0.6 0.456L1.332 0L2.064 1.224L2.808 0L3.528 0.456L2.76 1.62L4.128 1.608V2.52H2.76L3.528 3.684L2.808 4.128L2.064 2.916L1.332 4.128Z"
            fill="#CC3C3C"
          />
        </svg>
      )}
      <span>{labelText}</span>
      {shouldRenderHelper && (
        <Helper size={16}>
          <p>{helperText}</p>
        </Helper>
      )}
    </div>
  );
};
