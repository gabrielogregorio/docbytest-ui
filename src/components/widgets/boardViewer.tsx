import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyClipboard } from './copyClipboard';

const allowedLanguages = ['json', 'bash', 'python'];

export const BoardViewer = ({ response, title, type }: { type: string; response: any; title: string }) => {
  const language = allowedLanguages.includes(type) ? type : 'bash';
  return (
    <div className="relative flex flex-col mb-2">
      <div className="flex bg-gray-800 text-gray-700 py-1 px-1">
        <div className="flex-1  w-full text-sm text-white px-2 py-1">
          <button type="button" className="mr-2 font-bold">
            {title}
          </button>
        </div>
      </div>

      <pre className="overflow-auto bg-gray-700 text-white py-1 px-1">
        <code>
          <SyntaxHighlighter style={dracula as any} language={language} PreTag="div">
            {language === 'json' ? JSON.stringify(response, null, 4) : response}
          </SyntaxHighlighter>
        </code>
      </pre>

      <div className="absolute bottom-0 right-2">
        <CopyClipboard dataToCopy={language === 'json' ? JSON.stringify(response, null, 4) : response} />
      </div>
    </div>
  );
};
