import './style.scss';

import { useClipboard } from '../../../../hooks/useClipboard';

type Props = {
  text: string;
  disableCopy?: boolean;
};

/**This will crop text to it's parent container and enable copy of given value on click */
export const TextContainer = ({ text, disableCopy = false }: Props) => {
  const { writeToClipboard } = useClipboard();

  return (
    <p
      className="text-container"
      onClick={() => {
        if (!disableCopy) {
          writeToClipboard(text);
        }
      }}
    >
      {text}
    </p>
  );
};
