import './style.scss';

import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';

import { CheckBox } from '../Checkbox/CheckBox';

type Props = {
  selected: boolean;
  onClick?: () => void;
  onCheckBoxClick?: () => void;
  children?: ReactNode;
  className?: string;
  id?: string;
};

/**Row with checkbox on left */
export const SelectRow = ({
  selected,
  onClick,
  children,
  id,
  className,
  onCheckBoxClick,
}: Props) => {
  const cn = useMemo(() => classNames('select-row', className), [className]);

  return (
    <div onClick={onClick} id={id} className={cn}>
      <CheckBox value={selected} onChange={onCheckBoxClick} />
      <div className="content">{children}</div>
    </div>
  );
};
