import { useGetUrlApi } from '../hooks/useGetUrlApi';
import { paramsType } from '../interfaces/api';

export const mountUrlParams = (urlParams: paramsType[]) => {
  let mountParams = '';
  urlParams.forEach((url) => {
    mountParams += `${url.example}/`;
  });

  return mountParams;
};

export const mountQueryParams = (queryParams: paramsType[]) => {
  let mountParams = '?';
  queryParams.forEach((url) => {
    mountParams += `${url.tag}=${url.example}&`;
  });

  return mountParams;
};

const mountHeaderByType = (value: any): string => {
  if (typeof value === 'string') {
    return `${value}`;
  }
  return value;
};

export const mountHeadersParams = (headers: any) => {
  if (!headers) {
    return '';
  }

  let mountHeaders = '';

  const keysHeader = Object.keys(headers);
  keysHeader.forEach((key, index) => {
    const shouldBreakLine = keysHeader.length !== index + 1 ? '\n' : '';
    mountHeaders += `--header "${key}: ${mountHeaderByType(headers[key])}" \\${shouldBreakLine}`;
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
  const { currentUrlOrigin } = useGetUrlApi();
  const sendContentMounted = `'${JSON.stringify(sendContent, null, 2).replaceAll("'", '"')}'`;
  const linkRequest = `${currentUrlOrigin}${path}/${mountParams || ''}${
    mountQuery.slice(0, mountQuery.length - 1) || ''
  }`;

  if (!mountHeaders && !sendContent) {
    return `curl --location --request ${method.toUpperCase()} '${linkRequest}'`;
  }

  if (!sendContent && mountHeaders) {
    return `curl --location --request ${method.toUpperCase()} '${linkRequest}'  \\
    ${mountHeaders}`;
  }

  if (sendContent && !mountHeaders) {
    return `curl --location --request ${method.toUpperCase()} '${linkRequest}'  \\
    --header 'Content-Type: application/json' \\
    --data-raw ${sendContentMounted}`;
  }

  return `curl --location --request ${method.toUpperCase()} '${linkRequest}'  \\
    ${mountHeaders}
    --header 'Content-Type: application/json' \\
    --data-raw ${sendContentMounted}`;
};
