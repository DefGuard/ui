import './style.scss';
import clsx from 'clsx';
import { ThemeVariable } from '../../types';
import { isPresent } from '../../utils/isPresent';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton/IconButton';
import type { CodeCardProps } from './types';

export const CodeCard = ({ title, value, onCopy, onDownload }: CodeCardProps) => {
  return (
    <div className={clsx('code-card')}>
      <div className="top">
        <div className="track">
          <Icon icon="code" staticColor={ThemeVariable.FgMuted} />
          <p className="card-title">{title}</p>
          <div className="actions">
            {isPresent(onCopy) && <IconButton onClick={onCopy} icon="copy" />}
            {isPresent(onDownload) && <IconButton onClick={onDownload} icon="download" />}
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="scroll-container">
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};
