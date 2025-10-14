import './style.scss';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { isPresent } from '../../utils/isPresent';
import { Button } from '../Button/Button';
import type { ButtonProps } from '../Button/types';

type Props = {
  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
  children?: ReactNode;
};

export const ModalControls = ({ submitProps, cancelProps, children }: Props) => {
  return (
    <div
      className={clsx('modal-controls', {
        extras: isPresent(children),
      })}
    >
      {isPresent(children) && <div className="extras">{children}</div>}
      <div className="buttons">
        {isPresent(cancelProps) && (
          <Button
            {...cancelProps}
            variant={cancelProps?.variant ?? 'secondary'}
            text={cancelProps?.text}
          />
        )}
        {isPresent(submitProps) && (
          <Button
            {...submitProps}
            variant={submitProps?.variant ?? 'primary'}
            text={submitProps?.text}
          />
        )}
      </div>
    </div>
  );
};
