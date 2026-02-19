import { TextStyle, ThemeSpacing, ThemeVariable } from '../../types';
import { AppText } from '../AppText/AppText';
import { SizedBox } from '../SizedBox/SizedBox';

type Props = {
  title: string;
  description: string;
};

export const MarkedSectionHeader = ({ description, title }: Props) => {
  return (
    <>
      <AppText font={TextStyle.TBodyPrimary600} color={ThemeVariable.FgDefault}>
        {title}
      </AppText>
      <SizedBox height={ThemeSpacing.Xl} />
      <AppText font={TextStyle.TBodySm400} color={ThemeVariable.FgMuted}>
        {description}
      </AppText>
      <SizedBox height={ThemeSpacing.Xl} />
    </>
  );
};
