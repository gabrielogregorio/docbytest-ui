import { getUrlApi } from '../hooks/getUrlApi';
import { contentRequestType, paramsType } from '../interfaces/api';

export const mountUrlParams = (urlParams: paramsType[]): string => {
  let mountParams: string = '';
  urlParams.forEach((url: paramsType) => {
    mountParams += `${url.example}/`;
  });

  return mountParams;
};

export const mountQueryParams = (queryParams: paramsType[]): string => {
  let mountParams: string = '?';
  queryParams.forEach((url: paramsType) => {
    mountParams += `${url.name}=${url.example}&`;
  });

  return mountParams;
};

const mountHeaderByType = (value: contentRequestType): contentRequestType => {
  return value;
};

export const mountHeadersParams = (headers: contentRequestType): string => {
  if (!headers) {
    return '';
  }

  let mountHeaders: string = '';

  const keysHeader: string[] = Object.keys(headers);
  keysHeader.forEach((key: string, index: number) => {
    const shouldBreakLine: string = keysHeader.length !== index + 1 ? '\n' : '';

    // @ts-ignore
    mountHeaders += `--header "${key}: ${mountHeaderByType(headers[key])}" \\${shouldBreakLine}`;
  });

  return mountHeaders;
};

type mountCurlRequestType = {
  method: string;
  path: string;
  sendContent: contentRequestType;
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
}: mountCurlRequestType): string => {
  const { currentUrlOrigin } = getUrlApi();
  const sendContentMounted: string = `'${JSON.stringify(sendContent, null, 2).replaceAll("'", '"')}'`;
  const linkRequest: string = `${currentUrlOrigin}${path}/${mountParams || ''}${
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
