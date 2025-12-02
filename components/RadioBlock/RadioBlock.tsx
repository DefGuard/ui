import clsx from 'clsx';
import { Radio } from '../Radio/Radio';
import './style.scss';
import { isPresent } from '../../utils/isPresent';
import type { RadioBlockProps } from './types';

export const RadioBlock = ({
  content,
  onClick,
  title,
  value,
  className,
  ...containerProps
}: RadioBlockProps) => {
  return (
    <div className={clsx('radio-block', className)} onClick={onClick} {...containerProps}>
      <div className="icon-track">
        <Radio active={value} />
      </div>
      <div className="content-track">
        <p className="title">{title}</p>
        {isPresent(content) && <p className="content">{content}</p>}
      </div>
    </div>
  );
};
