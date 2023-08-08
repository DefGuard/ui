import classNames from 'classnames';

import SvgIconStatus from '../../svg/IconStatus';
import { ActivityIconVariant } from './types';

type Props = {
  status?: ActivityIconVariant;
};

export const ActivityIcon = ({ status }: Props) => {
  const cn = classNames(
    'activity-icon',
    status ? `variant-${status.valueOf()}` : undefined,
  );

  return (
    <div className={cn}>
      <SvgIconStatus />
    </div>
  );
};
