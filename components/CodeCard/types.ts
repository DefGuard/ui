export interface CodeCardProps {
  value: string;
  title: string;
  copy?: boolean;
  onDownload?: () => void;
}
