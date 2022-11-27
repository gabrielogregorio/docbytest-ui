/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { commentColors } from '../helpers/colors';
import { getUrlApi } from '../hooks/getUrlApi';

const getTextFromReactNode = (node: ReactNode): string | number => {
  if (typeof node === 'string' || typeof node === 'number') return node || '';
  if (node instanceof Array) return node.map(getTextFromReactNode).join('');
  if (typeof node === 'object' && node) return getTextFromReactNode((node as ReactElement)?.props?.children);
  return '';
};

const getNameColor = (stringElement: string) => {
  const reColor = /(.{3,200}?)#/;
  const resultsColor = stringElement.match(reColor);
  let color = '';
  if (resultsColor) {
    color = resultsColor[1];
  }
  return color;
};

const getTitle = (stringElement: string) => {
  const reTitleFinal = /.{0,200}?#(.*)/;
  const results = reTitleFinal.exec(stringElement);
  let titleFinal = '';
  if (results) {
    titleFinal = results[1];
  }

  return titleFinal;
};

const { currentUrlOrigin } = getUrlApi();

export const MarkdownToHtml = ({ body }: { body: string }): ReactElement => {
  return (
    <div className="px-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          a: ({ href, children }) => (
            <a
              target="_blank"
              rel="noreferrer"
              href={href}
              className="text-blue-500 dark:text-blue-400 hover:underline">
              {children}
            </a>
          ),

          h1: ({ children }) => (
            <h1 className="text-5xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-3xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-5">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-2xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-4">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-3">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-bold dark:text-gray-100 text-gray-700 mb-3 my-2">{children}</h6>
          ),

          hr: () => <hr className="bg-transparent border-b-1 border-b-gray-100 my-4" />,

          img: ({ src, title }) => <img src={`${currentUrlOrigin}${src}`} alt={title} />,

          table: ({ children }) => (
            <table className="table-auto w-full text-lg dark:text-gray-200 text-gray-600 my-4 dark:bg-[#282A36] bg-gray-200">
              {children}
            </table>
          ),

          th: ({ children }) => (
            <th className="py-2 border-b border-b-gray-300 dark:border-b-gray-700 text-left px-6">{children}</th>
          ),

          tr: ({ children }) => <tr className="bg-gray-300 dark:bg-gray-800">{children}</tr>,

          td: ({ children }) => <td className="font-bold px-6 py-2">{children}</td>,

          li: ({ children }) => <li>{children}</li>,
          ul: ({ children }) => (
            <ul className="text-lg dark:text-gray-200 text-gray-600 list-disc my-3 mx-4">{children}</ul>
          ),

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match?.[1];
            const removeLastBreakLine = String(children).replace(/\n$/, '');

            return (
              <span className="codeFont">
                {!inline && match ? (
                  <SyntaxHighlighter
                    // eslint-disable-next-line react/no-children-prop
                    children={removeLastBreakLine}
                    style={dracula as any}
                    language={language}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )}
              </span>
            );
          },

          blockquote: ({ children }) => {
            const stringElement: string = getTextFromReactNode(children).toString();

            const titleFinal = getTitle(stringElement);
            const color = getNameColor(stringElement);
            const bodyText = stringElement.replace(/.{0,999}?#.*/g, '');

            const colorFinal = color.trim().toLowerCase();
            const backgroundColor = commentColors[colorFinal]?.bg || commentColors.default.bg;
            const titleColor = commentColors[colorFinal]?.title || commentColors.default.title;
            const textColor = commentColors[colorFinal]?.text || commentColors.default.text;

            return (
              <blockquote className={`${backgroundColor} py-4`}>
                <h4 className={`uppercase text-lg font-bold ${titleColor}`}>{titleFinal}</h4>

                <p className={` text-lg font-base ${textColor} pt-2`}>{bodyText}</p>
              </blockquote>
            );
          },

          p: ({ children }) => <p className=" text-lg dark:text-gray-200 text-gray-600 my-2">{children}</p>,
        }}>
        {body}
      </ReactMarkdown>
    </div>
  );
};
