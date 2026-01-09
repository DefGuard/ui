import { type MouseEventHandler, type Ref, useMemo } from 'react';
import { Icon } from '../Icon';
import type { IconKindValue } from '../Icon/icon-types';
import './style.scss';
import clsx from 'clsx';

type Props = {
  iconSize: number;
  interactionSize?: number;
  icon: IconKindValue;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  className?: string;
  ref?: Ref<HTMLDivElement>;
  disabled?: boolean;
  tabIndex?: number;
};

export const InteractionBox = ({
  iconSize,
  icon,
  onClick,
  className,
  id,
  ref,
  tabIndex,
  interactionSize,
  disabled = false,
}: Props) => {
  const style = useMemo(() => {
    const res: Record<string, number | string> = {};
    if (interactionSize) {
      res['--interaction-size'] = `${interactionSize}px`;
    }
    return res;
  }, [interactionSize]);

  return (
    <div className={clsx('interaction-box', className)} ref={ref} id={id} style={style}>
      <Icon icon={icon} size={iconSize} />
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        tabIndex={tabIndex}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      ></button>
    </div>
  );
};
