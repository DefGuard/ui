import './style.scss';

import clsx from 'clsx';

type Position = 'left' | 'center' | 'right';

interface Props {
  customMessage?: string;
  messagePosition?: Position;
}

/**
 * Styled placeholder for places where elements are waiting or has no data coming form API
 * @param customMessage Text to replace default 'No data' text
 */
export const NoData = ({ customMessage, messagePosition = 'left' }: Props) => {
  return (
    <p className={clsx('no-data', `message-position-${messagePosition}`)}>
      {customMessage && customMessage.length ? customMessage : 'No data'}
    </p>
  );
};
