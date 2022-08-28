import { ReactNode } from 'react';
import { generateIds } from '../shared/generateIds';
import { useGetUrlApi } from '../hooks/useGetUrlApi';
import { BoardViewer } from '../../components/widgets/boardViewer';
import { commentColors } from '../helpers/colors';
import { renderHandlerMarkdownType } from '../interfaces/interpreter';

const extractBolder = (listAllOccurrence: any) => {
  const regexHasLink = /(\*\*.*?\*\*)/;
  const listOccurrences = listAllOccurrence.split(regexHasLink);

  return listOccurrences.map((item: any) => {
    const isLinkable = /(\*\*.*?\*\*)/;
    const data = isLinkable.exec(item);
    if (data) {
      return (
        <span key={generateIds()} title={data[1]} className="font-bold">
          {data[1].slice(2, data[1].length - 2)}
        </span>
      );
    }
    return <span key={generateIds()}>{item}</span>;
  });
};

const extractUrls = (listAllOccurrence: any) => {
  const regexHasLink = /(\[.{0,1000}?\]\(.{0,1000}?\))/;
  const listOccurrences = listAllOccurrence.split(regexHasLink);

  return listOccurrences.map((item: any) => {
    const isLinkable = /\[(.{0,1000}?)\]\((.{0,1000}?)\)/;
    const data = isLinkable.exec(item);
    if (data) {
      return (
        <a
          key={generateIds()}
          title={data[2]}
          target="_blank"
          className="text-blue-500 dark:text-blue-400 hover:underline"
          href={data[2]}
          rel="noreferrer">
          {extractBolder(data[1])}
        </a>
      );
    }
    return <span key={generateIds()}>{extractBolder(item)}</span>;
  });
};

const { currentUrlOrigin } = useGetUrlApi();

export const renderHandlerMarkdownDocbytest: renderHandlerMarkdownType = {
  base: (children: ReactNode) => {
    return (
      <div key={generateIds()} className="px-4">
        {children}
      </div>
    );
  },
  h1: (content: string) => (
    <h1 key={generateIds()} className="text-5xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">
      {content.trim()}
    </h1>
  ),
  h2: (content: string) => (
    <h2 key={generateIds()} className="text-4xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">
      {content.trim()}
    </h2>
  ),
  h3: (content: string) => (
    <h3 key={generateIds()} className="text-3xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-5">
      {content.trim()}
    </h3>
  ),
  h4: (content: string) => (
    <h4 key={generateIds()} className="text-2xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-4">
      {content.trim()}
    </h4>
  ),
  h5: (content: string) => (
    <h5 key={generateIds()} className="text-xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-3">
      {content.trim()}
    </h5>
  ),
  h6: (content: string) => (
    <h6 key={generateIds()} className="text-sm font-bold dark:text-gray-100 text-gray-700 mb-3 my-2">
      {content.trim()}
    </h6>
  ),
  code: (language: string, code: string) => {
    const isJson = language === 'json';
    return <BoardViewer type={language} title={isJson ? 'json' : ''} response={isJson ? JSON.parse(code) : code} />;
  },
  hr: () => <hr className="bg-transparent border-b-1 border-b-gray-100 my-4" />,
  image: (description: string, link: string) => <img src={`${currentUrlOrigin}${link}`} alt={description} />,
  specialTable: (key: string, value: string) => {
    return (
      <span data-testid="special">
        {key} - {value}
      </span>
    );
  },
  list: (completeList: string) => {
    return (
      <ul className="text-lg dark:text-gray-200 text-gray-600 list-disc my-3 mx-4">
        {completeList.split('\n').map((itemList: string) => {
          if (!itemList) {
            return null;
          }
          const removeStart = itemList.replace(/\s{0,10}[\\*•]\s{0,10}/, '');
          return <li key={generateIds()}>{extractUrls(removeStart)}</li>;
        })}
      </ul>
    );
  },
  table: (tbody: string, thead: string) => {
    return (
      <table className="table-auto w-full text-lg dark:text-gray-200 text-gray-600 my-4 dark:bg-gray-700 bg-gray-200">
        <thead data-testid="tbody">
          <tr className="bg-gray-300 dark:bg-gray-800">
            {tbody.split('|').map((rowTable) => {
              if (!rowTable) {
                return null;
              }
              return (
                <th
                  key={generateIds()}
                  className="py-2 border-b border-b-gray-300 dark:border-b-gray-700 text-left px-6">
                  {extractUrls(rowTable)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody data-testid="thead">
          {thead.split('\n').map((rowTable: string) => {
            const itemsColumnTable = rowTable.split('|');

            return (
              <tr key={generateIds()}>
                {itemsColumnTable.map((itemColumnTable: string) => {
                  if (!itemColumnTable) {
                    return null;
                  }
                  return (
                    <td key={generateIds()} className="font-bold px-6 py-2">
                      {extractUrls(itemColumnTable)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
  comment: (color: string, title: string, text: string) => {
    const removeSpecialCharacters = (textItem: string) => {
      return textItem.replace(/^\s{0,10}>\s{0,10}/, '');
    };

    const colorFinal = removeSpecialCharacters(color.trim().toLowerCase());

    const backgroundColor = commentColors[colorFinal]?.bg || commentColors.default.bg;
    const titleColor = commentColors[colorFinal]?.title || commentColors.default.title;
    const textColor = commentColors[colorFinal]?.text || commentColors.default.text;

    const linesComment = text.split('\n');

    return (
      <div className={`${backgroundColor} py-4`}>
        <h4 className={`uppercase text-lg font-bold ${titleColor}`}>{extractUrls(title)}</h4>
        {linesComment.map((lineComment) => {
          return (
            <p key={generateIds()} className={` text-lg font-base ${textColor} pt-2`}>
              {extractUrls(removeSpecialCharacters(lineComment))}
            </p>
          );
        })}
      </div>
    );
  },

  paragraph: (paragraph: string) => {
    return <p className=" text-lg dark:text-gray-200 text-gray-600 my-2">{extractUrls(paragraph.trim())}</p>;
  },
};
