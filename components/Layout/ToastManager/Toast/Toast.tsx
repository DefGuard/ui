import './style.scss';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useToastsStore } from '../../../../hooks/toasts/useToastStore';
import SvgIconInfo from '../../../svg/IconInfo';
import SvgIconInfoSuccess from '../../../svg/IconInfoSuccess';
import SvgIconWarning from '../../../svg/IconWarning';
import { type ToastProps, ToastType } from './types';

// in seconds
const defaultLifeTime = 5;

export const Toast = ({
  data: { id, type, message, subMessage, lifetime },
}: ToastProps) => {
  const timer = useRef(lifetime ?? defaultLifeTime);
  const timerTick = useRef<number | null>(null);
  const timeControlDisabled = useMemo(
    () => lifetime !== undefined && lifetime < 0,
    [lifetime],
  );
  const [timerControl, setTimerControl] = useState(!timeControlDisabled);
  const cn = useMemo(() => classNames('toast', type.valueOf()), [type]);
  const removeToast = useToastsStore((store) => store.removeToast);

  const getIcon = useMemo(() => {
    if (type === ToastType.INFO && !subMessage) {
      return <SvgIconInfo />;
    }
    if (type === ToastType.ERROR) {
      return <SvgIconWarning />;
    }
    if (type === ToastType.WARNING) {
      return <SvgIconInfo />;
    }
    if (type === ToastType.SUCCESS) {
      return <SvgIconInfoSuccess />;
    }
    return <SvgIconInfo />;
  }, [type, subMessage]);

  // auto hide at lifetime end.
  // biome-ignore lint/correctness/useExhaustiveDependencies: migration, checkMeLater
  useEffect(() => {
    if (timerControl && !timeControlDisabled) {
      timerTick.current = window.setInterval(() => {
        if (timer.current !== 0) {
          timer.current -= 1;
        }
        if (timer.current === 0) {
          removeToast(id);
          if (timerTick.current) {
            window.clearInterval(timerTick.current);
            timerTick.current = null;
          }
        }
      }, 1000);
    } else {
      if (timerTick.current) {
        window.clearInterval(timerTick.current);
      }
    }
    return () => {
      if (timerTick.current) {
        window.clearInterval(timerTick.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerControl, timeControlDisabled]);

  return (
    <motion.div
      className={cn}
      onHoverStart={() => {
        if (!timeControlDisabled) {
          setTimerControl(false);
        }
      }}
      onHoverEnd={() => {
        if (!timeControlDisabled) {
          setTimerControl(true);
        }
      }}
      onClick={() => removeToast(id)}
    >
      {getIcon}
      <p className="message">
        {message}
        {subMessage?.length && <span className="sub-message">{subMessage}</span>}
      </p>
    </motion.div>
  );
};
