import { useEffect, useState } from 'react';
import { SiCurl } from 'react-icons/si';
import { copyToClipboard } from '../../core/helpers/clipboard';
import { GroupInputParams } from './groupInputParams';
import {
  mountCurlRequest,
  mountHeadersParams,
  mountQueryParams,
  mountUrlParams,
} from '../../core/helpers/handleQueries';
import { GroupInputHeaders } from './groupInputHeaders';
import { JsonViewer } from './jsonViewer';
import { paramsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';

const mountCurlRequestOrchestrator = (
  queryParams: paramsType[],
  urlParams: paramsType[],
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

export const TestRunnerModal = ({ testRunner }: { testRunner: InitialTestRunnerType }) => {
  const queryParams = testRunner?.params?.filter((item: paramsType) => item.in === 'query');
  const urlParams = testRunner?.params?.filter((item: paramsType) => item.in === 'param');
  const { headers, method, path, sendContent } = testRunner ?? {};

  const [body, setBody] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    if (testRunner?.response) {
      setResponse(testRunner?.response?.body);
    } else {
      setResponse('');
    }
  }, [testRunner?.response]);

  useEffect(() => {
    setBody(mountCurlRequestOrchestrator(queryParams, urlParams, headers, method, path, sendContent));
  }, [testRunner]);

  return (
    <div className="px-2 py-2 relative">
      {headers ? <GroupInputHeaders headers={headers} /> : null}
      <GroupInputParams params={queryParams} title="Query" />
      <GroupInputParams params={urlParams} title="Parametros" />

      {sendContent ? <JsonViewer statusCode={0} response={sendContent} /> : null}

      {response ? <JsonViewer statusCode={Number(testRunner?.response?.statusCode)} response={response} /> : null}

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

      <h4> REQUEST</h4>
      <div className="p-2 mb-3 bg-gray-700 text-white rounded-md ">
        <div>
          <pre className="overflow-auto">
            <code className="bg-transparent outline-none w-full text-sm" contentEditable>
              {body}
            </code>
          </pre>
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
        </div>
      </div>
    </div>
  );
};
