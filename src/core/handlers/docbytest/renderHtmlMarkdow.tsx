import { ReactNode } from 'react';
import { commentColors } from '../../helpers/colors';
import { renderHandlerMarkdownType } from '../../interfaces/interpreter';

const extractUrls = (listAllOccurrence: any) => {
  const regexHasLink = /(\[.*?\]\(.*?\))/;
  const listOccurrences = listAllOccurrence.split(regexHasLink);

  return listOccurrences.map((item: any) => {
    const isLinkable = /\[(.*?)\]\((.*?)\)/;
    const data = isLinkable.exec(item);
    if (data) {
      return (
        <a target="_blank" className="text-blue-500 dark:text-blue-400" href={data[2]} rel="noreferrer">
          {data[1]}
        </a>
      );
    }
    return <span>{item}</span>;
  });
};

export const renderHandlerMarkdownDocbytest: renderHandlerMarkdownType = {
  base: (children: ReactNode) => {
    return <div className="px-4">{children}</div>;
  },
  h1: (content: string) => (
    <h1 className="text-5xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{content.trim()}</h1>
  ),
  h2: (content: string) => (
    <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{content.trim()}</h2>
  ),
  h3: (content: string) => (
    <h3 className="text-3xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-5">{content.trim()}</h3>
  ),
  h4: (content: string) => (
    <h4 className="text-2xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-4">{content.trim()}</h4>
  ),
  h5: (content: string) => (
    <h5 className="text-xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-3">{content.trim()}</h5>
  ),
  h6: (content: string) => (
    <h6 className="text-sm font-bold dark:text-gray-100 text-gray-700 mb-3 my-2">{content.trim()}</h6>
  ),
  code: (language: string, code: string) => (
    <pre className="p-2 my-3 bg-gray-700 dark:text-gray-200 text-white rounded-md ">
      <code>
        {language} - {code.trim()}
      </code>
    </pre>
  ),
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
          const removeStart = itemList.replace(/\s*\*\s*/, '');
          return <li>{removeStart}</li>;
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
                <th className="py-2 border-b border-b-gray-300 dark:border-b-gray-700 text-left px-6">
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
              <tr>
                {itemsColumnTable.map((itemColumnTable: string) => {
                  if (!itemColumnTable) {
                    return null;
                  }
                  return <td className="font-bold px-6 py-2">{extractUrls(itemColumnTable)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
  comment: (color: string, title: string, text: string) => {
    const colorFinal = color.trim().toLowerCase();

    const backgroundColor = commentColors[colorFinal]?.bg || commentColors.default.bg;
    const titleColor = commentColors[colorFinal]?.title || commentColors.default.title;
    const textColor = commentColors[colorFinal]?.text || commentColors.default.text;

    return (
      <div className={backgroundColor}>
        <h4 className={`uppercase text-lg font-bold ${titleColor} py-2 pt-3`}>{extractUrls(title)}</h4>
        <p className={` text-lg font-base ${textColor} py-0.5 pb-3`}>{extractUrls(text)}</p>
      </div>
    );
  },

  paragraph: (paragraph: string) => {
    return <p className=" text-lg dark:text-gray-200 text-gray-600 my-2">{extractUrls(paragraph.trim())}</p>;
  },
};
