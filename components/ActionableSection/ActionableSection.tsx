import './style.scss';
import clsx from 'clsx';
import { ThemeSpacing } from '../../types';
import { isPresent } from '../../utils/isPresent';
import { SizedBox } from '../SizedBox/SizedBox';
import { type ActionableSectionProps, ActionableSectionVariant } from './types';

export const ActionableSection = ({
  imageSrc,
  subtitle,
  title,
  children,
  variant = ActionableSectionVariant.Primary,
}: ActionableSectionProps) => {
  return (
    <div className={clsx('actionable-section', `variant-${variant}`)}>
      <div className="inner-track">
        <div className="image-track">
          <img src={imageSrc} alt="section image" />
        </div>
        <div className="content-track">
          <div className="default">
            <p className="title">{title}</p>
            <SizedBox height={ThemeSpacing.Xs} />
            <p className="subtitle">{subtitle}</p>
          </div>
          {isPresent(children) && (
            <>
              <SizedBox height={ThemeSpacing.Lg} />
              <div className="custom">{children}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
