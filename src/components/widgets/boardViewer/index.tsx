/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { contentRequestType } from '../../../core/interfaces/api';
import { CopyClipboard } from '../copyClipboard';

type typeType = 'json' | 'bash';

type boardViewerProps = {
  type: typeType;
  response: contentRequestType | string;
  title: string;
  titleBase: string;
};

const JSON_SPACING: number = 4;

export const BoardViewer = ({ response, title, type, titleBase }: boardViewerProps): ReactElement => {
  const jsonParsed: string = type === 'json' ? JSON.stringify(response, null, JSON_SPACING) : (response as string);

  return (
    <div>
      <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">{titleBase}</h3>

      <div className="relative flex flex-col mb-2">
        <div className="flex bg-gray-800 text-gray-700 py-1 px-1">
          <div className="flex-1  w-full text-sm text-white px-2 py-1">
            <button type="button" className="mr-2 font-bold">
              {title}
            </button>
          </div>
        </div>

        <pre className="overflow-auto bg-[#282A36] text-white py-1 px-1">
          <SyntaxHighlighter style={dracula as any} language={type} PreTag="div">
            {jsonParsed}
          </SyntaxHighlighter>
        </pre>

        <div className="absolute bottom-0 right-2">
          <CopyClipboard dataToCopy={jsonParsed} />
        </div>
      </div>
    </div>
  );
};
