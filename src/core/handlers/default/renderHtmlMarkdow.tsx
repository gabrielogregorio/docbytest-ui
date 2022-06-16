import { ReactNode } from 'react';
import { renderHandlerMarkdownType } from '../../interfaces/interpreter';

export const renderHandlerMarkdownDefault: renderHandlerMarkdownType = {
  base: (children: ReactNode) => {
    return <div>{children}</div>;
  },
  h1: (content: string) => <h1 data-testid="title-h1">{content.trim()}</h1>,
  h2: (content: string) => <h2 data-testid="title-h2">{content.trim()}</h2>,
  h3: (content: string) => <h3 data-testid="title-h3">{content.trim()}</h3>,
  h4: (content: string) => <h4 data-testid="title-h4">{content.trim()}</h4>,
  h5: (content: string) => <h5 data-testid="title-h5">{content.trim()}</h5>,
  h6: (content: string) => <h6 data-testid="title-h6">{content.trim()}</h6>,
  code: (language: string, code: string) => (
    <code data-testid="code">
      {language} - {code.trim()}
    </code>
  ),
  specialTable: (key: string, value: string) => {
    return (
      <span data-testid="special">
        {key} - {value}
      </span>
    );
  },
  list: (completeList: string) => <li data-testid="completeList">{completeList.trim()}</li>,
  table: (tbody: string, thead: string) => (
    <table>
      <tbody data-testid="tbody">{tbody.trim()}</tbody>
      <thead data-testid="thead">{thead.trim()}</thead>
    </table>
  ),
  comment: (color: string, title: string, text: string) => {
    return (
      <div>
        <div data-testid="comment-type">{color}</div>
        <div data-testid="comment-title">{title}</div>
        <div data-testid="comment-content">{text}</div>
      </div>
    );
  },

  paragraph: (paragraph: string) => {
    return <p data-testid="paragraph">{paragraph.trim()}</p>;
  },
};
