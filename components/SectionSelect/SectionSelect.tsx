import { type HTMLProps, type ReactNode, type Ref, useMemo } from 'react';
import './style.scss';
import clsx from 'clsx';
import { isPresent } from '../../utils/isPresent';
import { Badge } from '../Badge/Badge';
import type { BadgeProps } from '../Badge/types';
import { CheckboxIndicator } from '../CheckboxIndicator/CheckboxIndicator';
import { Icon } from '../Icon';
import { RadioIndicator } from '../RadioIndicator/RadioIndicator';
import behavior from './assets/behavior.png';
import customSettings from './assets/custom-settings.png';
import customization from './assets/customization.png';
import deviceClc from './assets/device-clc.png';
import enrollment from './assets/enrollment.png';
import externalId from './assets/external-id.png';
import gatewayNotifications from './assets/gateway-notifications.png';
import integrations from './assets/integrations.png';
import ldap from './assets/ldap.png';
import location from './assets/location.png';
import logstash from './assets/logstash.png';
import manualSetup from './assets/manual-setup.png';
import manualUser from './assets/manual-user.png';
import providers from './assets/providers.png';
import proxyManagement from './assets/proxy-management.png';
import remoteActivation from './assets/remote-activation.png';
import selfEnrollment from './assets/self-enrollment.png';
import serviceLocation from './assets/service-location.png';
import smtp from './assets/smtp.png';
import tokenChat from './assets/token-chat.png';
import tokenEmail from './assets/token-email.png';
import vector from './assets/vector.png';
import wireguardDevice from './assets/wireguard-device.png';
import type { SectionSelectImageValue } from './types';

type Props = HTMLProps<HTMLDivElement> & {
  title: string;
  content: string;
  image: SectionSelectImageValue;
  ref?: Ref<HTMLDivElement>;
  checkbox?: boolean;
  radio?: boolean;
  selected?: boolean;
  badgeProps?: BadgeProps;
  disabled?: boolean;
  children?: ReactNode;
};

export const SectionSelect = ({
  image,
  ref: propsRef,
  className,
  checkbox,
  radio,
  selected,
  badgeProps,
  title,
  content,
  disabled = false,
  children,
  ...rest
}: Props) => {
  const imageSource = useMemo(() => {
    switch (image) {
      case 'ldap':
        return ldap;
      case 'proxy-management':
        return proxyManagement;
      case 'smtp':
        return smtp;
      case 'gateway-notifications':
        return gatewayNotifications;
      case 'remote-activation':
        return remoteActivation;
      case 'enrollment':
        return enrollment;
      case 'manual-setup':
        return manualSetup;
      case 'token-email':
        return tokenEmail;
      case 'customization':
        return customization;
      case 'behavior':
        return behavior;
      case 'integrations':
        return integrations;
      case 'id-providers':
        return providers;
      case 'custom-settings':
        return customSettings;
      case 'self-enrollment':
        return selfEnrollment;
      case 'manual-user':
        return manualUser;
      case 'token-chat':
        return tokenChat;
      case 'device-clc':
        return deviceClc;
      case 'wireguard-device':
        return wireguardDevice;
      case 'service-location':
        return serviceLocation;
      case 'location':
        return location;
      case 'logstash':
        return logstash;
      case 'vector':
        return vector;
      case 'external-id':
        return externalId;
    }
  }, [image]);

  return (
    <div
      className={clsx('section-select', {
        disabled,
        selected,
      })}
      ref={propsRef}
      {...rest}
    >
      <div className="track">
        <div className="section-icon">
          <img src={imageSource} loading="lazy" />
        </div>
        <div className="content">
          <div className="header">
            <p className={clsx({ disabled })}>{title}</p>
            {isPresent(badgeProps) && <Badge {...badgeProps} />}
          </div>
          <p className={clsx({ disabled })}>{content}</p>
          {children}
        </div>
        <div className="extra">
          {disabled && <Icon icon="lock-closed" />}
          {!checkbox && !radio && !disabled && (
            <Icon icon="arrow-small" rotationDirection="right" />
          )}
          {checkbox && !disabled && <CheckboxIndicator active={selected ?? false} />}
          {radio && !disabled && <RadioIndicator active={selected ?? false} />}
        </div>
      </div>
    </div>
  );
};
