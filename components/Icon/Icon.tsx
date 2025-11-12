import { type CSSProperties, type Ref, useMemo } from 'react';
import type { IconKindValue } from './icon-types';
import './style.scss';
import type { Direction } from '../../types';
import { IconAccessSettings } from './icons/IconAccessSettings';
import { IconAddDevice } from './icons/IconAddDevice';
import { IconAddToken } from './icons/IconAddToken';
import { IconAddUser } from './icons/IconAddUser';
import { IconAndroid } from './icons/IconAndroid';
import { IconApple } from './icons/IconApple';
import { IconAppStore } from './icons/IconAppstore';
import { IconArchLinux } from './icons/IconArchLinux';
import { IconArrowBig } from './icons/IconArrowBig';
import { IconArrowSmall } from './icons/IconArrowSmall';
import { IconBiometric } from './icons/IconBiometric';
import { IconCheck } from './icons/IconCheck';
import { IconCheckCircle } from './icons/IconCheckCircle';
import { IconCheckFilled } from './icons/IconCheckFilled';
import { IconClose } from './icons/IconClose';
import { IconConfig } from './icons/IconConfig';
import { IconCopy } from './icons/IconCopy';
import { IconDebian } from './icons/IconDebian';
import { IconDelete } from './icons/IconDelete';
import { IconDesktop } from './icons/IconDesktop';
import { IconDevices } from './icons/IconDevices';
import { IconDisabled } from './icons/IconDisabled';
import { IconDownload } from './icons/IconDownload';
import { IconEdit } from './icons/IconEdit';
import { IconEmptyPoint } from './icons/IconEmptyPoint';
import { IconEnter } from './icons/IconEnter';
import { IconFile } from './icons/IconFile';
import { IconGlobe } from './icons/IconGlobe';
import { IconGroups } from './icons/IconGroups';
import { IconHamburger } from './icons/IconHamburger';
import { IconHelp } from './icons/IconHelp';
import { IconHide } from './icons/IconHide';
import { IconKey } from './icons/IconKey';
import { IconLinux } from './icons/IconLinux';
import { IconLoader } from './icons/IconLoader';
import { IconLocation } from './icons/IconLocation';
import { IconLockOpen } from './icons/IconLock';
import { IconLogout } from './icons/IconLogout';
import { IconMail } from './icons/IconMail';
import { IconMenu } from './icons/IconMenu';
import { IconMinusCircle } from './icons/IconMinusCircle';
import { IconMobile } from './icons/IconMobile';
import { IconOneTimePassword } from './icons/IconOneTimePassword';
import { IconOpenId } from './icons/IconOpenId';
import { IconOpenInNewWindow } from './icons/IconOpenInNewWindow';
import { IconPending } from './icons/IconPending';
import { IconPlus } from './icons/IconPlus';
import { IconPlusCircle } from './icons/IconPlusCircle';
import { IconProfile } from './icons/IconProfile';
import { IconSearch } from './icons/IconSearch';
import { IconSettings } from './icons/IconSettings';
import { IconShow } from './icons/IconShow';
import { IconSortable } from './icons/IconSortable';
import { IconStatusSimple } from './icons/IconStatusSimple';
import { IconUbuntu } from './icons/IconUbuntu';
import { IconUsers } from './icons/IconUsers';
import { IconWarning } from './icons/IconWarning';
import { IconWebhooks } from './icons/IconWebhooks';
import { IconWindows } from './icons/IconWindows';

type Props<T extends IconKindValue = IconKindValue> = {
  icon: T;
  size?: number;
  rotationDirection?: Direction;
  customRotation?: number;
  ref?: Ref<HTMLDivElement>;
};

type RotationMap = Record<Direction, number>;

const mapRotation = (kind: IconKindValue, direction: Direction): number => {
  switch (kind) {
    case 'arrow-small':
    case 'arrow-big': {
      const map: RotationMap = {
        down: 90,
        right: 0,
        up: -90,
        left: 180,
      };
      return map[direction];
    }
  }
  console.error(`Unimplemented rotation mapping for icon kind of ${kind}`);
  // safe return for unimplemented
  return 0;
};

const EmptyIcon = () => {
  return null;
};

// Color should be set by css bcs some icons have different structures like 'loader'
export const Icon = <T extends IconKindValue>({
  icon: iconKind,
  rotationDirection,
  customRotation,
  ref,
  size = 20,
}: Props<T>) => {
  const IconToRender = useMemo(() => {
    switch (iconKind) {
      case 'add-token':
        return IconAddToken;
      case 'key':
        return IconKey;
      case 'add-device':
        return IconAddDevice;
      case 'warning':
        return IconWarning;
      case 'ubuntu':
        return IconUbuntu;
      case 'debian':
        return IconDebian;
      case 'arch-linux':
        return IconArchLinux;
      case 'disabled':
        return IconDisabled;
      case 'show':
        return IconShow;
      case 'hide':
        return IconHide;
      case 'copy':
        return IconCopy;
      case 'config':
        return IconConfig;
      case 'open-in-new-window':
        return IconOpenInNewWindow;
      case 'arrow-big':
        return IconArrowBig;
      case 'arrow-small':
        return IconArrowSmall;
      case 'loader':
        return IconLoader;
      case 'plus':
        return IconPlus;
      case 'status-simple':
        return IconStatusSimple;
      case 'lock-open':
        return IconLockOpen;
      case 'check-circle':
        return IconCheckCircle;
      case 'check-filled':
        return IconCheckFilled;
      case 'empty-point':
        return IconEmptyPoint;
      case 'desktop':
        return IconDesktop;
      case 'mobile':
        return IconMobile;
      case 'windows':
        return IconWindows;
      case 'linux':
        return IconLinux;
      case 'app-store':
        return IconAppStore;
      case 'apple':
        return IconApple;
      case 'android':
        return IconAndroid;
      case 'close':
        return IconClose;
      case 'file':
        return IconFile;
      case 'globe':
        return IconGlobe;
      case 'help':
        return IconHelp;
      case 'access-settings':
        return IconAccessSettings;
      case 'activity':
        return EmptyIcon;
      case 'activity-notes':
        return EmptyIcon;
      case 'add-user':
        return IconAddUser;
      case 'analytics':
        return EmptyIcon;
      case 'archive':
        return EmptyIcon;
      case 'attention':
        return EmptyIcon;
      case 'check':
        return IconCheck;
      case 'clear':
        return EmptyIcon;
      case 'code':
        return EmptyIcon;
      case 'collapse':
        return EmptyIcon;
      case 'credit-card':
        return EmptyIcon;
      case 'date':
        return EmptyIcon;
      case 'delete':
        return IconDelete;
      case 'deploy':
        return EmptyIcon;
      case 'devices':
        return IconDevices;
      case 'devices-active':
        return EmptyIcon;
      case 'download':
        return IconDownload;
      case 'edit':
        return IconEdit;
      case 'enter':
        return IconEnter;
      case 'expand':
        return EmptyIcon;
      case 'filter':
        return EmptyIcon;
      case 'gateway':
        return EmptyIcon;
      case 'gift':
        return EmptyIcon;
      case 'github':
        return EmptyIcon;
      case 'groups':
        return IconGroups;
      case 'hamburger':
        return IconHamburger;
      case 'info-filled':
        return EmptyIcon;
      case 'info-outlined':
        return EmptyIcon;
      case 'location':
        return IconLocation;
      case 'location-preview':
        return EmptyIcon;
      case 'location-tracking':
        return EmptyIcon;
      case 'logout':
        return IconLogout;
      case 'mail':
        return IconMail;
      case 'manage-keys':
        return EmptyIcon;
      case 'menu':
        return IconMenu;
      case 'minus-circle':
        return IconMinusCircle;
      case 'navigation-collapse':
        return EmptyIcon;
      case 'navigation-uncollapse':
        return EmptyIcon;
      case 'notification':
        return EmptyIcon;
      case 'one-time-password':
        return IconOneTimePassword;
      case 'openid':
        return IconOpenId;
      case 'pdf':
        return EmptyIcon;
      case 'pie-chart':
        return EmptyIcon;
      case 'plus-circle':
        return IconPlusCircle;
      case 'profile':
        return IconProfile;
      case 'protection':
        return EmptyIcon;
      case 'qr':
        return EmptyIcon;
      case 'search':
        return IconSearch;
      case 'servers':
        return EmptyIcon;
      case 'settings':
        return IconSettings;
      case 'sort':
        return EmptyIcon;
      case 'sortable':
        return IconSortable;
      case 'status-attention':
        return EmptyIcon;
      case 'status-available':
        return EmptyIcon;
      case 'status-important':
        return EmptyIcon;
      case 'support':
        return EmptyIcon;
      case 'transactions':
        return EmptyIcon;
      case 'user':
        return EmptyIcon;
      case 'user-active':
        return EmptyIcon;
      case 'users':
        return IconUsers;
      case 'webhooks':
        return IconWebhooks;
      case 'yubi-keys':
        return EmptyIcon;
      case 'biometric':
        return IconBiometric;
      case 'pending':
        return IconPending;
    }
  }, [iconKind]);

  const getStyle = useMemo((): CSSProperties => {
    const styles: CSSProperties = {};
    const transform: string[] = [];
    // kind specific configurations
    switch (iconKind) {
      case 'arrow-big':
      case 'arrow-small':
        if (rotationDirection) {
          transform.push(`rotate(${mapRotation(iconKind, rotationDirection)}deg)`);
        }
        break;
    }
    if (customRotation && !rotationDirection) {
      transform.push(`rotate(${customRotation}deg)`);
    }
    if (size) {
      styles.width = size;
      styles.height = size;
    }
    if (transform.length) {
      styles.transform = transform.join(' ');
    }
    return styles;
  }, [iconKind, size, rotationDirection, customRotation]);

  return (
    <div className="icon" ref={ref} style={getStyle} data-kind={iconKind}>
      <IconToRender />
    </div>
  );
};
