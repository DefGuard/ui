import clsx from 'clsx';
import { isPresent } from '../../../utils/isPresent';
import { Helper } from '../../Helper/Helper';
import { Icon } from '../../Icon';
import type { MenuItemProps } from '../types';

export const MenuItem = ({
  disabled,
  disabledHelper,
  text,
  icon,
  items,
  testId,
  variant,
  onClick,
  onClose,
}: MenuItemProps) => {
  const hasItems = isPresent(items) && items.length > 0;
  const hasIcon = isPresent(icon);

  return (
    <div
      className={clsx('menu-item', `variant-${variant}`, {
        disabled,
        'grid-default': !hasItems && !hasIcon,
        'grid-group': hasItems && !hasIcon,
        'grid-icon': !hasItems && hasIcon,
        'grid-full':
          (hasIcon && hasItems) || (hasIcon && disabled && isPresent(disabledHelper)),
        nested: hasItems || (disabled && isPresent(disabledHelper)),
      })}
      data-testid={testId}
      onClick={() => {
        if (!disabled) {
          onClick?.();
          if (!hasItems) {
            onClose?.();
          }
        }
      }}
    >
      {isPresent(icon) && <Icon icon={icon} size={20} />}
      <p>{text}</p>
      {disabled && isPresent(disabledHelper) && (
        <div className="suffix">
          <Helper icon="lock-closed" color={null}>
            <p>{disabledHelper}</p>
          </Helper>
        </div>
      )}
      {hasItems && !disabled && (
        <div className="suffix">
          <Icon icon="arrow-small" size={20} />
        </div>
      )}
    </div>
  );
};
