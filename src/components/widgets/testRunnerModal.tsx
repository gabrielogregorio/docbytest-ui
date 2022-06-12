import { useEffect, useState } from 'react';
import { GroupInputParams } from './groupInputParams';
import {
  mountCurlRequest,
  mountHeadersParams,
  mountQueryParams,
  mountUrlParams,
} from '../../core/helpers/handleQueries';
import { GroupInputHeaders } from './groupInputHeaders';
import { BoardViewer } from './boardViewer';
import { paramsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';
import { InsideMenu } from './insideMenu';

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
  const { headers, method, fullPath, sendContent } = testRunner ?? {};
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
    setBody(mountCurlRequestOrchestrator(queryParams, urlParams, headers, method, fullPath, sendContent));
  }, [testRunner]);

  return (
    <div className="relative">
      {headers ? <GroupInputHeaders headers={headers} /> : null}
      <GroupInputParams params={queryParams} title="Query" />
      <GroupInputParams params={urlParams} title="Parametros" />

      {sendContent ? (
        <div>
          <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">Payload</h3>
          <BoardViewer type="json" response={sendContent} title="Payload" />
        </div>
      ) : null}

      {response ? (
        <div>
          <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">Resposta</h3>
          <BoardViewer type="json" response={response} title="Resposta" />
        </div>
      ) : null}

      <div className="flex flex-col ">
        <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">Linguagem</h3>
        <div className="flex">
          <InsideMenu isSelected text="cURL" onClick={() => null} />
        </div>
      </div>

      {body ? (
        <div>
          <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">Requisição</h3>
          <BoardViewer type="text" response={body} title="Request" />
        </div>
      ) : null}
    </div>
  );
};
