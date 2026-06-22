import { TextStyle, ThemeSpacing, ThemeVariable } from '../../types';
import { isPresent } from '../../utils/isPresent';
import { AppText } from '../AppText/AppText';
import { Badge } from '../Badge/Badge';
import type { BadgeProps } from '../Badge/types';
import { InfoBanner } from '../InfoBanner/InfoBanner';
import { SizedBox } from '../SizedBox/SizedBox';
import './style.scss';

type Props = {
  title: string;
  description?: string;
  warning?: string;
  badgeProps?: BadgeProps;
};

export const MarkedSectionHeader = ({
  description,
  title,
  warning,
  badgeProps,
}: Props) => {
  return (
    <>
      <div className="marked-section-header">
        <AppText font={TextStyle.TBodyPrimary600} color={ThemeVariable.FgDefault}>
          {title}
        </AppText>
        {isPresent(badgeProps) && <Badge {...badgeProps} />}
      </div>
      {description && (
        <>
          <SizedBox height={ThemeSpacing.Xl} />
          <AppText font={TextStyle.TBodySm400} color={ThemeVariable.FgMuted}>
            {description}
          </AppText>
        </>
      )}
      <SizedBox height={ThemeSpacing.Xl} />
      {warning && (
        <>
          <InfoBanner variant="warning" icon="info-outlined" text={warning} />
          <SizedBox height={ThemeSpacing.Xl} />
        </>
      )}
    </>
  );
};
