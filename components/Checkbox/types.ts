export interface CheckboxProps {
  testId?: string;
  active?: boolean;
  error?: string;
  disabled?: boolean;
  text?: string;
  forceHover?: boolean;
  onClick?: () => void;
}
