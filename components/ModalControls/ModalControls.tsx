import './style.scss';
import clsx from 'clsx';
import { isPresent } from '../../utils/isPresent';
import { Button } from '../Button/Button';
import type { ModalControlsProps } from './types';

export const ModalControls = ({
  submitProps,
  cancelProps,
  children,
}: ModalControlsProps) => {
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
