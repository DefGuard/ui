import { TextStyle, ThemeSpacing, ThemeVariable } from '../../types';
import { AppText } from '../AppText/AppText';
import { InfoBanner } from '../InfoBanner/InfoBanner';
import { SizedBox } from '../SizedBox/SizedBox';

type Props = {
  title: string;
  description?: string;
  warning?: string;
};

export const MarkedSectionHeader = ({ description, title, warning }: Props) => {
  return (
    <>
      <AppText font={TextStyle.TBodyPrimary600} color={ThemeVariable.FgDefault}>
        {title}
      </AppText>
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
      <AppText font={TextStyle.TBodySm400} color={ThemeVariable.FgMuted}>
        {description}
      </AppText>
      <SizedBox height={ThemeSpacing.Xl} />
    </>
  );
};
