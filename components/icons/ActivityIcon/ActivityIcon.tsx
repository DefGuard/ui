import './style.scss';

import classNames from 'classnames';

import SvgIconStatus from '../../svg/IconStatus';
import SvgIconStatusBlank from '../../svg/IconStatusBlank';
import { ActivityIconVariant } from './types';

type Props = {
  status?: ActivityIconVariant;
};

const getSvg = (status: ActivityIconVariant) => {
  if (status === ActivityIconVariant.BLANK) {
    return <SvgIconStatusBlank />;
  }
  if (status === ActivityIconVariant.ERROR_FILLED) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
          style={{ fill: 'var(--surface-alert-primary)' }}
        />
      </svg>
    );
  }
  return <SvgIconStatus />;
};

export const ActivityIcon = ({ status = ActivityIconVariant.BLANK }: Props) => {
  const cn = classNames(
    'activity-icon',
    status ? `variant-${status.valueOf()}` : undefined,
  );

  return <div className={cn}>{getSvg(status)}</div>;
};
