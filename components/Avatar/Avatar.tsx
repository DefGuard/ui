import './style.scss';
import clsx from 'clsx';
import { type HtmlHTMLAttributes, type Ref, useId, useMemo } from 'react';
import { isPresent } from '../../utils/isPresent';
import type { AvatarSizeValue } from './types';

type Props = {
  size?: AvatarSizeValue;
  ref?: Ref<HTMLDivElement>;
  variant?: 'empty' | 'initials';
  firstName?: string;
  lastName?: string;
  online?: boolean;
} & HtmlHTMLAttributes<HTMLDivElement>;

export const Avatar = ({
  ref,
  size = 'default',
  variant = 'empty',
  firstName,
  lastName,
  online = false,
  className,
  ...divProps
}: Props) => {
  const initials = useMemo(() => {
    if (!isPresent(firstName) || !isPresent(lastName)) return '';
    const first = firstName.trim()[0];
    const last = lastName.trim()[0];
    if (size === 'small') return first.toUpperCase();
    return (first + last).toUpperCase();
  }, [firstName, lastName, size]);

  return (
    <div
      className={clsx('avatar', `size-${size}`, `variant-${variant}`, className)}
      ref={ref}
      {...divProps}
    >
      <div className="inner">
        {variant === 'empty' && <EmptyIcon />}
        {variant === 'initials' && (
          <div className="initials">
            <span>{initials}</span>
          </div>
        )}
      </div>
      {online && <span className="online-indicator" aria-hidden="true" />}
    </div>
  );
};

const EmptyIcon = () => {
  const id = useId();
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-default"
    >
      <g clipPath={`url(#${id})`}>
        <rect width="16" height="16" rx="8" fill="#F0F2F5" />
        <path
          d="M15 16.2065C15 16.6499 14.6055 17 14.1091 17H1.89091C1.39455 17 1 16.6383 1 16.2065C1 13.4293 3.54545 11.1655 6.66364 11.1655H9.32364C12.4545 11.1655 14.9873 13.4176 14.9873 16.2065H15ZM8.78909 9.91694C10.2273 9.59021 11.1818 8.25994 11.1818 6.85967V5.99616C11.1818 4.09412 9.31091 2.61216 7.21091 3.09059C5.77273 3.41732 4.81818 4.74758 4.81818 6.14786V7.01136C4.81818 8.91341 6.68909 10.407 8.78909 9.92861V9.91694Z"
          fill="#B8C0CD"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="16" height="16" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
