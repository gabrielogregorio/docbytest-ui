import { BadgeStatusCode } from '../badgeStatusCode';
import { copyToClipboard } from '../../core/helpers/clipboard';

export const JsonViewer = ({ statusCode, response }: { statusCode: number; response: any }) => {
  return (
    <div className="p-2 mb-3 bg-gray-200 text-gray-700 rounded-md ">
      <div>
        <div className="flex flex-col">
          <div className="flex mb-2">
            <div className="flex-1">
              {statusCode !== 0 ? (
                <button type="button" className="border-b mr-2 border-gray-700 font-bold">
                  RESPONSE
                </button>
              ) : (
                <button type="button" className="border-b mr-2 border-gray-700 font-bold">
                  SEND
                </button>
              )}
            </div>

            <div className="flex items-center">
              {statusCode !== 0 ? (
                <>
                  <BadgeStatusCode statusCode={statusCode.toString()} />
                  {statusCode}
                </>
              ) : null}
            </div>
          </div>

          <pre className="overflow-auto">
            <code className="bg-transparent outline-none w-full text-sm" contentEditable>
              {JSON.stringify(response, null, 2)}
            </code>
          </pre>
        </div>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={() => copyToClipboard(JSON.stringify(response, null, 2))} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
