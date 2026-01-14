import type { PropsWithChildren } from 'react';

export const ActionableSectionVariant = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export type ActionableSectionVariantValue =
  (typeof ActionableSectionVariant)[keyof typeof ActionableSectionVariant];

export interface ActionableSectionProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  imageSrc: string;
  variant?: ActionableSectionVariantValue;
}
