import { RenderMarkdown } from '../RenderMarkdown/RenderMarkdown';
import './style.scss';

export const CodeBox = ({ text, markdown }: { text: string; markdown?: boolean }) => {
  return (
    <div className="code-box">
      {markdown && <RenderMarkdown content={text} />}
      {!markdown && <p>{text}</p>}
    </div>
  );
};
