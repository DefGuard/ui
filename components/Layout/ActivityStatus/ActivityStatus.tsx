import './style.scss';

import { ComponentPropsWithoutRef, useMemo } from 'react';

import { ActivityIcon } from '../../icons/ActivityIcon/ActivityIcon';
import { ActivityIconVariant } from '../../icons/ActivityIcon/types';
import { ActivityType } from './types';

interface Props extends ComponentPropsWithoutRef<'div'> {
  connectionStatus?: ActivityType;
  customMessage?: string;
}

/**
 * Displays styled information about connection status of an device or user.
 */
export const ActivityStatus = ({
  connectionStatus = ActivityType.CONNECTED,
  customMessage,
  className,
  ...rest
}: Props) => {
  const getText = useMemo(() => {
    switch (connectionStatus) {
      case ActivityType.CONNECTED:
        return 'Connected';
      case ActivityType.ADDED:
        return 'New device';
      case ActivityType.ALERT:
        return 'Heavy usage alert';
      case ActivityType.DISCONNECTED:
        return 'Disconnected';
      case ActivityType.REMOVED:
        return 'Removed device';
    }
  }, [connectionStatus]);

  const getIconType = useMemo((): ActivityIconVariant => {
    switch (connectionStatus) {
      case ActivityType.CONNECTED:
        return ActivityIconVariant.CONNECTED;
      case ActivityType.ADDED:
        return ActivityIconVariant.CONNECTED;
      case ActivityType.ALERT:
        return ActivityIconVariant.ERROR;
      case ActivityType.DISCONNECTED:
        return ActivityIconVariant.DISCONNECTED;
      case ActivityType.REMOVED:
        return ActivityIconVariant.ERROR;
    }
  }, [connectionStatus]);

  const getClassName = useMemo(() => {
    const res = ['activity-status'];
    res.push(connectionStatus.valueOf());
    if (className) {
      res.push(className);
    }
    return res.join(' ');
  }, [className, connectionStatus]);

  return (
    <div className={getClassName} {...rest}>
      <ActivityIcon status={getIconType} />
      <span>{customMessage || getText}</span>
    </div>
  );
};
