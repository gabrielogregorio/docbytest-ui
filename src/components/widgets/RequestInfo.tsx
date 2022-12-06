import { ReactElement, useEffect, useState } from 'react';
import { mountCurlRequest, mountHeadersParams, mountQueryParams, mountUrlParams } from '@/helpers/handleQueries';
import { contentRequestType, paramsType } from '@/interfaces/api';
import { InitialTestRunnerType } from '@/interfaces/testRunner';
import { GroupMethodRequestAndUrls } from './groupInputParams';
import { GroupInputHeaders } from './groupInputHeaders';
import { BoardViewer } from './boardViewer/index';

const mountCurlRequestOrchestrator = (
  queryParams: paramsType[],
  urlParams: paramsType[],
  headers: contentRequestType,
  method: string,
  path: string,
  sendContent: contentRequestType,
  // eslint-disable-next-line max-params
): string => {
  if (!method) {
    return '';
  }

  const mountParams: string = mountUrlParams(urlParams);
  const mountQuery: string = mountQueryParams(queryParams);
  const mountHeaders: string = mountHeadersParams(headers);

  return mountCurlRequest({
    method,
    path,
    sendContent,
    mountParams,
    mountQuery,
    mountHeaders,
  });
};

export const RequestInfo = ({ testRunner }: { testRunner: InitialTestRunnerType }): ReactElement => {
  const queryParams: paramsType[] = testRunner?.parameters?.filter((item: paramsType) => item.in === 'query');
  const urlParams: paramsType[] = testRunner?.parameters?.filter((item: paramsType) => item.in === 'param');
  const { headers, method, path, sendContent } = testRunner ?? {};
  const [body, setBody] = useState<string>('');
  const [response, setResponse] = useState<contentRequestType>({});

  useEffect(() => {
    if (testRunner?.response) {
      setResponse(testRunner?.response?.body);
    } else {
      setResponse({});
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
