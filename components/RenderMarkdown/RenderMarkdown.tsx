import type { HTMLProps } from 'react';
import './style.scss';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const RenderMarkdown = ({
  content,
  containerProps,
}: {
  content?: string | null | undefined;
  containerProps?: HTMLProps<HTMLDivElement>;
}) => {
  const containerCustomClassName = containerProps?.className;

  return (
    <div
      {...containerProps}
      className={clsx('markdown-render', containerCustomClassName)}
    >
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
};
