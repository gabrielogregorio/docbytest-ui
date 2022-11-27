import { useEffect, useState } from 'react';
import { GroupMethodRequestAndUrls } from './groupInputParams';
import {
  mountCurlRequest,
  mountHeadersParams,
  mountQueryParams,
  mountUrlParams,
} from '../../core/helpers/handleQueries';
import { GroupInputHeaders } from './groupInputHeaders';
import { BoardViewer } from './boardViewer/index';
import { contentRequestType, paramsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';

const mountCurlRequestOrchestrator = (
  queryParams: paramsType[],
  urlParams: paramsType[],
  headers: contentRequestType,
  method: string,
  path: string,
  sendContent: contentRequestType,
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

export const RequestInfo = ({ testRunner }: { testRunner: InitialTestRunnerType }) => {
  const queryParams = testRunner?.parameters?.filter((item: paramsType) => item.in === 'query');
  const urlParams = testRunner?.parameters?.filter((item: paramsType) => item.in === 'param');
  const { headers, method, path, sendContent } = testRunner ?? {};
  const [body, setBody] = useState<string>('');
  const [response, setResponse] = useState<contentRequestType>('');

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
    <div className="relative">
      {headers ? <GroupInputHeaders headers={headers} /> : null}

      {queryParams ? <GroupMethodRequestAndUrls params={queryParams} title="Query" /> : null}

      {urlParams ? <GroupMethodRequestAndUrls params={urlParams} title="Parametros" /> : null}

      {sendContent ? <BoardViewer type="json" response={sendContent} title="json" titleBase="Payload" /> : null}

      {response ? <BoardViewer type="json" response={response} title="json" titleBase="Resposta" /> : null}

      {body ? <BoardViewer type="bash" response={body} title="curl" titleBase="Requisição" /> : null}
    </div>
  );
};
