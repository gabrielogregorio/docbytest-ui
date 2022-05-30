import { paramsApiResponseType } from '../interfaces/api';

export const mountUrlParams = (urlParams: paramsApiResponseType[]) => {
  let mountParams = '';
  urlParams.forEach((url) => {
    mountParams += `${url.example}/`;
  });

  return mountParams;
};

export const mountQueryParams = (queryParams: paramsApiResponseType[]) => {
  let mountParams = '?';
  queryParams.forEach((url) => {
    mountParams += `${url.tag}=${url.example}&`;
  });

  return mountParams;
};

export const mountHeadersParams = (headers: any) => {
  let mountHeaders = '';
  const keysHeader = Object.keys(headers);
  keysHeader.forEach((key) => {
    mountHeaders += `-H ${key}: ${headers[key]} `;
  });

  return mountHeaders;
};

type mountCurlRequestType = {
  method: string;
  path: string;
  sendContent: any;
  mountParams: string;
  mountQuery: string;
  mountHeaders: string;
};

export const mountCurlRequest = ({
  method,
  path,
  sendContent,
  mountParams,
  mountQuery,
  mountHeaders,
}: mountCurlRequestType) => {
  return `curl -X ${method.toUpperCase()} \\
    -d ${JSON.stringify(sendContent)} 'https://backend-valorant.herokuapp.com${path}/${mountParams || ''}${
    mountQuery.slice(0, mountQuery.length - 1) || ''
  }' \\
    ${mountHeaders}`;
};
