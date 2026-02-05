import { useMemo } from 'react';
import './style.scss';
import clsx from 'clsx';
import { ThemeSpacing } from '../../types';
import { isPresent } from '../../utils/isPresent';
import { Button } from '../Button/Button';
import { SizedBox } from '../SizedBox/SizedBox';
import { EmptyStateIconAliases } from './icons/EmptyStateIconAliases';
import { EmptyStateIconApiToken } from './icons/EmptyStateIconApiToken';
import { EmptyStateIconApps } from './icons/EmptyStateIconApps';
import { EmptyStateIconAuthentication } from './icons/EmptyStateIconAuthentication';
import { EmptyStateIconDashboard } from './icons/EmptyStateIconDashboard';
import { EmptyStateIconDevices } from './icons/EmptyStateIconDevices';
import { EmptyStateIconGateway } from './icons/EmptyStateIconGateway';
import { EmptyStateIconLog } from './icons/EmptyStateIconLog';
import { EmptyStateIconRules } from './icons/EmptyStateIconRules';
import { EmptyStateIconSearch } from './icons/EmptyStateIconSearch';
import { EmptyStateIconWebhook } from './icons/EmptyStateIconWebhook';
import type { EmptyStateProps } from './types';

const Empty = () => {
  return null;
};

export const EmptyState = ({
  ref,
  icon,
  primaryAction,
  secondaryAction,
  secondaryActionText,
  subtitle,
  title,
  className,
  id,
  testId,
}: EmptyStateProps) => {
  const RenderIcon = useMemo(() => {
    if (!icon) return Empty;
    switch (icon) {
      case 'gateway':
        return EmptyStateIconGateway;
      case 'search':
        return EmptyStateIconSearch;
      case 'apps':
        return EmptyStateIconApps;
      case 'authentication':
        return EmptyStateIconAuthentication;
      case 'api-token':
        return EmptyStateIconApiToken;
      case 'webhook':
        return EmptyStateIconWebhook;
      case 'dashboard':
        return EmptyStateIconDashboard;
      case 'aliases':
        return EmptyStateIconAliases;
      case 'rules':
        return EmptyStateIconRules;
      case 'log':
        return EmptyStateIconLog;
      case 'devices':
        return EmptyStateIconDevices;
    }
  }, [icon]);

  return (
    <div
      ref={ref}
      className={clsx('empty-state', className)}
      id={id}
      data-testid={testId}
    >
      {isPresent(icon) && (
        <>
          <RenderIcon />
          <SizedBox height={ThemeSpacing.Lg} />
        </>
      )}
      {isPresent(title) && (
        <>
          <p className="title">{title}</p>
          <SizedBox height={4} />
        </>
      )}
      {isPresent(subtitle) && <p className="subtitle">{subtitle}</p>}
      <SizedBox height={ThemeSpacing.Lg} />
      {isPresent(primaryAction) && (
        <>
          <Button {...primaryAction} />
          <SizedBox height={ThemeSpacing.Lg} />
        </>
      )}
      {isPresent(secondaryAction) && isPresent(secondaryActionText) && (
        <button className="secondary-action" onClick={secondaryAction}>
          {secondaryActionText}
        </button>
      )}
    </div>
  );
};
