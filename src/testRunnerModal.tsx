import { useState } from 'react';
import { SiCurl } from 'react-icons/si';
import { GrNode } from 'react-icons/gr';
import { copyToClipboard } from './core/helpers/clipboard';

const responseExample = `{
  "username": "user has name!",
  "isReady": false,
  "metadata": {
    "limit": 120
  }
}`;

export const TestRunnerModal = () => {
  const [body, setBody] = useState<string>(`curl --request GET \\
  --url 'https://valorant.tips/v1/users' \\
  --header 'Authorization: PL6QA5315151762414'`);
  const [response, setResponse] = useState<string>(responseExample);

  return (
    <div className="col-span-4 max-h-screen overflow-y-auto ">
      <div className="bg-gray-100 p-2">
        <div className="flex flex-col ">
          <h3 className="font-bold text-gray-500 mr-3 mb-2">Linguagem</h3>
          <div>
            <button type="button" className="border-2 p-3 mr-2 rounded-md text-gray-800 bg-gray-300 border-gray-300">
              <div className="flex flex-col items-center justify-center">
                <SiCurl />
                cURL
              </div>
            </button>
            <button type="button" className="border-2 p-3 mr-2 rounded-md text-gray-500">
              <div className="flex flex-col items-center justify-center">
                <GrNode />
                nodejs
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-500 mr-3 mb-2">Headers</h3>
          <div className="flex items-center border border-gray-300 bg-gray-200 my-2 p-2 rounded-md">
            <h4 className="font-bold text-gray-500 mr-3">API KEY</h4>
            <input
              type="text"
              name="auth"
              id="auth"
              value="FAQH92F"
              className="bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-500 mr-3 mb-2">Query</h3>
          <div className="flex items-center border border-gray-300 bg-gray-200 my-2 p-2 rounded-md">
            <h4 className="font-bold text-gray-500 mr-3">offset</h4>
            <input
              type="number"
              name="auth"
              id="auth"
              value="10"
              className="bg-transparent outline-none text-gray-700"
            />
          </div>
          <div className="flex items-center border border-gray-300 bg-gray-200 my-2 p-2 rounded-md">
            <h4 className="font-bold text-gray-500 mr-3">limit</h4>
            <input
              type="number"
              name="auth"
              id="auth"
              value="20"
              className="bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-500 mr-3 mb-2">Params</h3>
          <div className="flex items-center border border-gray-300 bg-gray-200 my-2 p-2 rounded-md">
            <h4 className="font-bold text-gray-500 mr-3">userId</h4>
            <input
              type="text"
              name="auth"
              id="auth"
              value="BHQ123L42GSD6JAS53FQ432"
              className="bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        <div className="p-2 mb-3 bg-gray-700 text-white rounded-md ">
          <div>
            <label htmlFor="body" className="flex flex-col">
              REQUEST
              <textarea
                className="bg-transparent outline-none w-full"
                name="body"
                id="body"
                value={body}
                rows={10}
                onChange={(event) => setBody(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => copyToClipboard(body)} className="">
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

            <button type="button" className="bg-blue-500 text-white rounded-lg px-3 py-2">
              Request
            </button>
          </div>
        </div>

        <div className="p-2 mb-3 bg-gray-200 text-gray-700 rounded-md ">
          <div>
            <label htmlFor="body" className="flex flex-col">
              <div className="flex mb-2">
                <div className="flex-1">
                  <button type="button" className="border-b mr-2 ">
                    RESPONSE
                  </button>
                  <button type="button" className="border-b mr-2 border-gray-700 font-bold">
                    EXAMPLE
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2" />
                  200
                </div>
              </div>
              <textarea
                className="bg-transparent outline-none w-full"
                name="body"
                id="body"
                value={response}
                rows={10}
                onChange={(event) => setResponse(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => copyToClipboard(response)} className="">
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

            <button type="button" className="text-gray-700 font-bold rounded-lg px-3 py-2">
              Headers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
