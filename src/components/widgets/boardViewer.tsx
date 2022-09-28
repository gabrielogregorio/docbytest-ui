import { JsonColorizer } from '../../core/jsonBeautfull';
import { CopyClipboard } from './copyClipboard';

export const BoardViewer = ({
  response,
  title,
  type,
}: {
  type: string;
  response: string | number | true | object;
  title: string;
}) => {
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
        <code className="bg-transparent outline-none w-full text-sm codeFont">
          {type === 'json' ? <JsonColorizer text={JSON.stringify(response, null, 4)} /> : response.toString()}
        </code>
      </pre>

      <div className="absolute bottom-0 right-2">
        <CopyClipboard dataToCopy={type === 'json' ? JSON.stringify(response, null, 4) : response} />
      </div>
    </div>
  );
};
