import { useContext, useEffect, useState } from 'react';
import { SiCurl } from 'react-icons/si';
import { copyToClipboard } from './core/helpers/clipboard';
import { TestRunnerContext } from './core/contexts/testRunnerProvider';
import { paramsApiResponseType } from './core/interfaces/api';
import { BadgeStatusCode } from './components/badgeStatusCode';
import { GroupInputParams } from './components/widgets/groupInputParams';
import { mountCurlRequest, mountHeadersParams, mountQueryParams, mountUrlParams } from './core/helpers/handleQueries';
import { GroupInputHeaders } from './components/widgets/groupInputHeaders';

const mountCurlRequestOrchestrator = (
  queryParams: paramsApiResponseType[],
  urlParams: paramsApiResponseType[],
  headers: any,
  method: string,
  path: string,
  sendContent: string,
) => {
  if (!method) {
    return '';
  }

  const mountParams = mountUrlParams(urlParams);
  const mountQuery = mountQueryParams(queryParams);
  const mountHeaders = mountHeadersParams(headers);

  return mountCurlRequest({
    method,
    path,
    sendContent,
    mountParams,
    mountQuery,
    mountHeaders,
  });
};

export const TestRunnerModal = () => {
  const { testRunner, resetTestRunner } = useContext(TestRunnerContext);
  const queryParams = testRunner.params.filter((item) => item.in === 'query');
  const urlParams = testRunner.params.filter((item) => item.in === 'param');
  const { headers, method, path, sendContent } = testRunner;

  const [body, setBody] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    if (testRunner.response) {
      setResponse(JSON.stringify(testRunner.response?.body));
    } else {
      setResponse('');
    }
  }, [testRunner.response]);

  useEffect(() => {
    setBody(mountCurlRequestOrchestrator(queryParams, urlParams, headers, method, path, sendContent));
  }, [testRunner]);

  return (
    <div className="col-span-4 max-h-screen overflow-y-auto ">
      <div className="bg-gray-100 p-2 relative">
        <button
          type="button"
          onClick={() => resetTestRunner()}
          className="absolute right-4 top-3 bg-red-500 w-6 h-6 rounded-full text-white text-xs font-bold">
          X
        </button>
        <div>
          <h3 className="font-bold text-gray-500 mr-3 mb-2">{testRunner.title}</h3>
          <h4 className="font-bold text-gray-500 mr-3 mb-2 text-sm">{testRunner.description}</h4>
        </div>

        <div className="flex flex-col ">
          <h3 className="font-bold text-gray-500 mr-3 mb-2">Linguagem</h3>
          <div>
            <button type="button" className="border-2 p-3 mr-2 rounded-md text-gray-800 bg-gray-300 border-gray-300">
              <div className="flex flex-col items-center justify-center">
                <SiCurl />
                cURL
              </div>
            </button>
          </div>
        </div>

        <GroupInputHeaders headers={headers} />
        <GroupInputParams params={queryParams} title="Query" />
        <GroupInputParams params={urlParams} title="Parametros" />

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

        {response ? (
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
                    <BadgeStatusCode statusCode={testRunner.response?.statusCode} />
                    {testRunner.response?.statusCode}
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
        ) : null}
      </div>
    </div>
  );
};
