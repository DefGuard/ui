export interface CodeCardProps {
  value: string;
  title: string;
  onCopy?: () => void;
  onDownload?: () => void;
}
