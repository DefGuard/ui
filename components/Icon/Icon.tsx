import { type CSSProperties, type Ref, useMemo } from 'react';
import type { IconKindValue } from './icon-types';
import './style.scss';
import type { Direction } from '../../types';
import { IconAccessSettings } from './icons/IconAccessSettings';
import { IconActivity } from './icons/IconActivity';
import { IconActivityNotes } from './icons/IconActivityNotes';
import { IconAddDevice } from './icons/IconAddDevice';
import { IconAddGroup } from './icons/IconAddGroup';
import { IconAddLocation } from './icons/IconAddLocation';
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
import { IconClear } from './icons/IconClear';
import { IconClose } from './icons/IconClose';
import { IconConfig } from './icons/IconConfig';
import { IconConnectedDevices } from './icons/IconConnectedDevices';
import { IconCopy } from './icons/IconCopy';
import { IconDebian } from './icons/IconDebian';
import { IconDelete } from './icons/IconDelete';
import { IconDesktop } from './icons/IconDesktop';
import { IconDevices } from './icons/IconDevices';
import { IconDevicesActive } from './icons/IconDevicesActive';
import { IconDisabled } from './icons/IconDisabled';
import { IconDownload } from './icons/IconDownload';
import { IconEdit } from './icons/IconEdit';
import { IconEmptyPoint } from './icons/IconEmptyPoint';
import { IconEnter } from './icons/IconEnter';
import { IconExternalMfa } from './icons/IconExternalMFA';
import { IconFile } from './icons/IconFile';
import { IconGlobe } from './icons/IconGlobe';
import { IconGroups } from './icons/IconGroups';
import { IconHamburger } from './icons/IconHamburger';
import { IconHelp } from './icons/IconHelp';
import { IconHide } from './icons/IconHide';
import { IconInfoFilled } from './icons/IconInfoFilled';
import { IconInfoOutlined } from './icons/IconInfoOutlined';
import { IconInternalMfa } from './icons/IconInternalMFA';
import { IconKey } from './icons/IconKey';
import { IconLinux } from './icons/IconLinux';
import { IconLoader } from './icons/IconLoader';
import { IconLocation } from './icons/IconLocation';
import { IconLocationTracking } from './icons/IconLocationTracking';
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
import { IconPieChart } from './icons/IconPieChart';
import { IconPlus } from './icons/IconPlus';
import { IconPlusCircle } from './icons/IconPlusCircle';
import { IconProfile } from './icons/IconProfile';
import { IconSearch } from './icons/IconSearch';
import { IconSettings } from './icons/IconSettings';
import { IconShow } from './icons/IconShow';
import { IconSortable } from './icons/IconSortable';
import { IconStatusAttention } from './icons/IconStatusAttention';
import { IconStatusImportant } from './icons/IconStatusImportant';
import { IconStatusSimple } from './icons/IconStatusSimple';
import { IconToken } from './icons/IconToken';
import { IconUbuntu } from './icons/IconUbuntu';
import { IconUser } from './icons/IconUser';
import { IconUserActive } from './icons/IconUserActive';
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
      case 'connected-devices':
        return IconConnectedDevices;
      case 'external-mfa':
        return IconExternalMfa;
      case 'internal-mfa':
        return IconInternalMfa;
      case 'token':
        return IconToken;
      case 'add-location':
        return IconAddLocation;
      case 'add-group':
        return IconAddGroup;
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
        return IconActivity;
      case 'activity-notes':
        return IconActivityNotes;
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
        return IconClear;
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
        return IconDevicesActive;
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
        return IconInfoFilled;
      case 'info-outlined':
        return IconInfoOutlined;
      case 'location':
        return IconLocation;
      case 'location-preview':
        return EmptyIcon;
      case 'location-tracking':
        return IconLocationTracking;
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
        return IconPieChart;
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
        return IconStatusAttention;
      case 'status-available':
        return EmptyIcon;
      case 'status-important':
        return IconStatusImportant;
      case 'support':
        return EmptyIcon;
      case 'transactions':
        return EmptyIcon;
      case 'user':
        return IconUser;
      case 'user-active':
        return IconUserActive;
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
