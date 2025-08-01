import './style.scss';

import {
  arrow,
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  useFloating,
} from '@floating-ui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { isUndefined } from 'lodash-es';
import mergeRefs from 'merge-refs';
import React, {
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import SvgIconAsterix from '../../svg/IconAsterix';
import SvgIconWarning from '../../svg/IconWarning';
import SvgIconX from '../../svg/IconX';
import { FloatingArrow } from '../FloatingArrow/FloatingArrow';
import { FloatingBox } from '../FloatingBox/FloatingBox';
import type { InputProps } from './types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      required,
      invalid,
      value,
      disposable,
      disposeHandler,
      placeholder,
      disabled = false,
      errorMessage,
      label,
      disableOuterLabelColon,
      floatingErrors,
      labelExtras,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const innerInputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);

    const inputId = useId();

    const [floatingErrorsOpen, setFloatingErrorsOpen] = useState(false);

    const floatingErrorsArrow = useRef<HTMLDivElement | null>(null);

    const {
      refs: { setFloating, setReference },
      placement,
      middlewareData,
      floatingStyles,
    } = useFloating({
      open: floatingErrorsOpen,
      onOpenChange: setFloatingErrorsOpen,
      placement: 'bottom-end',
      middleware: [
        offset(10),
        flip(),
        arrow({
          element: floatingErrorsArrow,
        }),
      ],
      whileElementsMounted: (refElement, floatingElement, updateFunc) =>
        autoUpdate(refElement, floatingElement, updateFunc),
    });

    const getInputContainerClassName = useMemo(() => {
      return classNames('input-container', className, {
        invalid,
        disabled,
        disposable: disposable && !disabled,
      });
    }, [className, disabled, disposable, invalid]);

    const getInputIcon: ReactNode = useMemo(() => {
      if (disabled) {
        return null;
      }
      if (disposable && (focused || hovered)) {
        return <SvgIconX />;
      }
      if (invalid) {
        return <SvgIconWarning />;
      }
      if (required) {
        return <SvgIconAsterix />;
      }
      return null;
    }, [disabled, disposable, focused, hovered, invalid, required]);

    // control floatingErrors while typing
    useEffect(() => {
      if (
        focused &&
        floatingErrors &&
        floatingErrors.errorMessages.length > 0 &&
        !floatingErrorsOpen
      ) {
        setFloatingErrorsOpen(true);
      }
      if (
        (!focused && floatingErrorsOpen) ||
        (floatingErrorsOpen &&
          floatingErrors &&
          floatingErrors.errorMessages.length === 0)
      ) {
        setFloatingErrorsOpen(false);
      }
    }, [floatingErrors, floatingErrorsOpen, focused]);

    return (
      <div className="input">
        {(!isUndefined(label) || !isUndefined(labelExtras)) && (
          <div className="top">
            {!isUndefined(label) && (
              <motion.label
                className="input-label"
                htmlFor={inputId}
                initial={false}
                onClick={() => {
                  if (innerInputRef) {
                    innerInputRef.current?.focus();
                  }
                }}
              >
                {label}
                {!disableOuterLabelColon && ':'}
              </motion.label>
            )}
            {!isUndefined(labelExtras) && labelExtras}
          </div>
        )}
        <motion.div
          ref={setReference}
          className={getInputContainerClassName}
          onFocus={() => {
            setFocused(true);
            if (floatingErrors?.errorMessages.length) {
              setFloatingErrorsOpen(true);
            }
          }}
          onBlur={() => {
            setFocused(false);
            if (floatingErrorsOpen) {
              setFloatingErrorsOpen(false);
            }
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={() => {
            if (innerInputRef) {
              innerInputRef.current?.focus();
            }
          }}
        >
          <motion.input
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            ref={mergeRefs(innerInputRef, forwardedRef)}
            {...props}
            value={value}
            placeholder={placeholder}
            id={inputId}
            disabled={disabled}
          />
          <span
            className="icon-container"
            onClick={(e) => {
              if (disposable) {
                e.preventDefault();
                e.stopPropagation();
                disposeHandler?.();
              }
            }}
          >
            {getInputIcon}
          </span>
        </motion.div>
        <AnimatePresence>
          {invalid && errorMessage && !disabled && (
            <motion.span
              className="error-message"
              initial={{
                x: 0,
                opacity: 0,
              }}
              animate={{
                x: 20,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                x: 0,
              }}
            >
              {errorMessage}
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {floatingErrorsOpen && floatingErrors && (
            <FloatingPortal>
              <FloatingBox
                className="floating-input-errors"
                ref={setFloating}
                style={floatingStyles}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <p className="title">{floatingErrors.title}</p>
                <div className="errors">
                  {floatingErrors.errorMessages.map((errorMessage) => (
                    <div className="error" key={errorMessage}>
                      <SvgIconWarning />
                      <p>{errorMessage}</p>
                    </div>
                  ))}
                </div>
                <FloatingArrow
                  placement={placement}
                  ref={floatingErrorsArrow}
                  data={middlewareData.arrow}
                />
              </FloatingBox>
            </FloatingPortal>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
