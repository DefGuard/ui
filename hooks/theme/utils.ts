import { availableThemes, type ThemeKey } from './types';

export const isThemeKey = (val: string): val is ThemeKey =>
  availableThemes.includes(val as ThemeKey);
