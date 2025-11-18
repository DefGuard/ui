import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const RenderMarkdown = ({ content }: { content?: string | null | undefined }) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>;
};
