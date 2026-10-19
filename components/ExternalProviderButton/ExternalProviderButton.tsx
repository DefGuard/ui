import './style.scss';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { motionTransitionStandard } from '../../consts';
import { LoaderSpinner } from '../LoaderSpinner/LoaderSpinner';
import customImage from './assets/custom.svg';
import googleImage from './assets/google.svg';
import jumpcloudImage from './assets/jumpcloud.svg';
import jumpcloudWhiteImage from './assets/jumpcloud-white.svg';
import microsoftImage from './assets/microsoft.svg';
import oktaImage from './assets/okta.svg';
import oktaWhiteImage from './assets/okta-white.svg';
import type { ExternalProviderButtonProps } from './types';

export const ExternalProviderButton = ({
  text,
  testId,
  provider,
  theme,
  onClick,
  ref,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  className,
  ...props
}: ExternalProviderButtonProps) => {
  const providerImage = useMemo(() => {
    switch (provider) {
      case 'microsoft':
        return microsoftImage;
      case 'google':
        return googleImage;
      case 'okta':
        return oktaImage;
      case 'jumpcloud':
        return jumpcloudImage;
      default:
        return customImage;
    }
  }, [provider]);

  const providerDarkImage = useMemo(() => {
    switch (provider) {
      case 'okta':
        return oktaWhiteImage;
      case 'jumpcloud':
        return jumpcloudWhiteImage;
      default:
        return providerImage;
    }
  }, [provider, providerImage]);

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
      className={clsx('external-provider-button', `variant-${variant}`, className, {
        disabled,
        loading: !disabled && loading,
      })}
    >
      <img
        src={theme === 'dark' ? providerDarkImage : providerImage}
        width={20}
        height={20}
        loading="eager"
      />
      <span className="text">{text}</span>
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
