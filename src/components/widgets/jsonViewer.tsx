import { useEffect, useState } from 'react';
import { copyToClipboard } from '../../core/helpers/clipboard';

export const JsonViewer = ({ statusCode, response }: { statusCode: number; response: any }) => {
  const [recentClickCopyItem, setRecentClickCopyItem] = useState<boolean>(false);

  useEffect(() => {
    if (recentClickCopyItem) {
      setTimeout(() => {
        setRecentClickCopyItem(false);
      }, 900);
    }

    return () => clearTimeout();
  }, [recentClickCopyItem]);
  return (
    <div>
      <div>
        <div className="relative flex flex-col mb-2">
          <div className="flex bg-gray-800 text-gray-700 py-1 px-1">
            <div className="flex-1  w-full text-sm text-white px-2 py-1">
              {statusCode !== 0 ? (
                <button type="button" className="mr-2 font-bold">
                  RESPONSE
                </button>
              ) : (
                <button type="button" className="mr-2 font-bold">
                  SEND
                </button>
              )}
            </div>
          </div>

          <pre className="overflow-auto bg-gray-700 text-white py-1 px-1">
            <code className="bg-transparent outline-none w-full text-sm codeFont" contentEditable>
              {JSON.stringify(response, null, 2)}
            </code>
          </pre>

          <div className="absolute bottom-0 right-2">
            <button
              type="button"
              onClick={() => {
                copyToClipboard(JSON.stringify(response, null, 2));
                setRecentClickCopyItem(true);
              }}
              className={`text-white ${recentClickCopyItem ? 'animation duration-500 scale-150 opacity-0' : ''}`}>
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
      </div>
    </div>
  );
};
