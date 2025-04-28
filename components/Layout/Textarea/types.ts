export type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};
