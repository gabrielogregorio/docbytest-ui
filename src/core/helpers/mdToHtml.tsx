import { mountHtmlTableByMd } from './mountHtmlByMd';
import { mountHtmlListByMd } from './mountHtmlListByMd';

const regexIsTable = /^\s*\|.+\|\s*$/;

export const MdToHtml = ({ markdown }: { markdown: string }) => {
  let fullTable = '';
  let fullList = '';
  let fullCode = '';
  let startCode = false;

  // resolve this complex
  function renderMarkdown() {
    return markdown.split('\n').map((doc: string) => {
      const regexRouter = regexIsTable.exec(doc);
      if (regexRouter) {
        fullTable += `${doc}\n`;
        return null;
      }

      if (fullTable !== '') {
        const local = fullTable;
        fullTable = '';
        return mountHtmlTableByMd(local);
      }
      // table

      // list
      const startWithList = doc.slice(0, 2) === '* ' || doc.slice(0, 2) === '- ';
      if (startWithList) {
        fullList += `${doc.slice(2, doc.length)}\n`;
        return null;
      }

      if (fullList !== '') {
        const local = fullList;
        fullList = '';
        return mountHtmlListByMd(local);
      }
      // list

      // code
      const finishAnalysesCode = startCode && doc.slice(0, 3) === '```';
      if (finishAnalysesCode) {
        startCode = false;
        const local = fullCode;
        fullCode = '';
        return (
          <pre className="p-2 my-3 bg-gray-700 dark:text-gray-200 text-white rounded-md ">
            <code>{local}</code>
          </pre>
        );
      }

      if (startCode) {
        fullCode += `${doc}\n`;
        return null;
      }

      if (doc.slice(0, 3) === '```') {
        startCode = true;
        return null;
      }

      if (doc.startsWith('# ')) {
        return <h1 className="text-5xl font-bold dark:text-gray-100 text-gray-700 my-3">{doc.slice(2, doc.length)}</h1>;
      }

      if (doc.startsWith('## ')) {
        return <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-700 my-3">{doc.slice(3, doc.length)}</h2>;
      }

      if (doc.startsWith('### ')) {
        return <h3 className="text-3xl font-bold dark:text-gray-100 text-gray-700 my-3">{doc.slice(4, doc.length)}</h3>;
      }

      if (doc.startsWith('#### ')) {
        return <h4 className="text-2xl font-bold dark:text-gray-100 text-gray-700 my-3">{doc.slice(5, doc.length)}</h4>;
      }

      const regexHasLink = /(\[.*?\]\(.*?\))/;
      const listAllOccurrence = doc.split(regexHasLink);
      let allData: any = null;
      if (listAllOccurrence) {
        const isLinkable = /\[(.*?)\]\((.*?)\)/;

        allData = listAllOccurrence.map((item) => {
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
      }

      return <p className=" text-lg dark:text-gray-200 text-gray-600 my-2">{allData}</p>;
    });
  }

  return <div className="px-4 ">{renderMarkdown()}</div>;
};
