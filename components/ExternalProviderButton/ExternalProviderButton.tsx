import './style.scss';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { motionTransitionStandard } from '../../consts';
import { isPresent } from '../../utils/isPresent';
import { Icon } from '../Icon';
import { LoaderSpinner } from '../LoaderSpinner/LoaderSpinner';
import { ExternalProviderButtonIconCustom } from './icons/ExternalProviderButtonIconCustom';
import { ExternalProviderButtonIconGoogle } from './icons/ExternalProviderButtonIconGoogle';
import { ExternalProviderButtonIconJumpCloud } from './icons/ExternalProviderButtonIconJumpCloud';
import { ExternalProviderButtonIconMicrosoft } from './icons/ExternalProviderButtonIconMicrosoft';
import { ExternalProviderButtonIconOkta } from './icons/ExternalProviderButtonIconOkta';
import type { ExternalProviderButtonProps } from './types';

const Empty = () => {
  return null;
};

export const ExternalProviderButton = ({
  text,
  testId,
  provider,
  iconRight,
  onClick,
  ref,
  iconRightRotation,
  size = 'primary',
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  className,
  ...props
}: ExternalProviderButtonProps) => {
  const RenderProviderIcon = useMemo(() => {
    if (!provider) return Empty;
    switch (provider) {
      case 'microsoft':
        return ExternalProviderButtonIconMicrosoft;
      case 'google':
        return ExternalProviderButtonIconGoogle;
      case 'okta':
        return ExternalProviderButtonIconOkta;
      case 'jumpcloud':
        return ExternalProviderButtonIconJumpCloud;
      case 'custom':
        return ExternalProviderButtonIconCustom;
    }
  }, [provider]);

  return (
    <button
      {...props}
      data-variant={variant}
      data-testid={testId}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={(e) => {
        if (!disabled && !loading) {
          onClick?.(e);
        }
      }}
      className={clsx(
        'external-provider-button',
        `variant-${variant}`,
        `size-${size}`,
        className,
        {
          disabled,
          loading: !disabled && loading,
          'icon-left': isPresent(provider) && !isPresent(iconRight),
          'icon-right': isPresent(iconRight) && !isPresent(provider),
          'icon-both': isPresent(provider) && isPresent(iconRight),
        },
      )}
    >
      <RenderProviderIcon />
      <span className="text">{text}</span>
      {isPresent(iconRight) && (
        <Icon icon={iconRight} size={20} rotationDirection={iconRightRotation} />
      )}
      <AnimatePresence mode="wait">
        {loading && !disabled && (
          <motion.div
            className="loader-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={motionTransitionStandard}
          >
            <LoaderSpinner />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
