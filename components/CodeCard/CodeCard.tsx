import './style.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ThemeVariable } from '../../types';
import { useClipboard } from '../../hooks/useClipboard';
import { isPresent } from '../../utils/isPresent';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton/IconButton';
import type { CodeCardProps } from './types';

export const CodeCard = ({ title, value, copy, onDownload }: CodeCardProps) => {
  const [copied, setCopied] = useState(false);
  const { writeToClipboard } = useClipboard();

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <div className={clsx('code-card')}>
      <div className="top">
        <div className="track">
          <Icon icon="code" staticColor={ThemeVariable.FgMuted} />
          <p className="card-title">{title}</p>
          <div className="actions">
            {copy && (
              <IconButton
                onClick={() => {
                  void writeToClipboard(value);
                  setCopied(true);
                }}
                icon={!copied ? 'copy' : 'check-filled'}
                className={clsx({ copied })}
              />
            )}
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
