import { MarkdownToHtml } from '../core/shared/ReactMarkdown';

type InterpreterMarkdownInterface = {
  text: string;
};

export const InterpreterMarkdown = ({ text }: InterpreterMarkdownInterface) => {
  return <MarkdownToHtml body={text} />;
};
