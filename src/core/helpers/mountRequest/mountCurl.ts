import { MountCurlTypeEnum, MountCurlType } from './types';

export const mountCurl = ({ method, host, query, header, body }: MountCurlType): string => {
  let queries: string = '';
  if (query.length) {
    queries = '?';
    query.forEach((value: MountCurlType['query'][0], index: number) => {
      const needAddedEInEnd: string = query.length - 1 !== index ? '&' : '';
      queries += `${value.key}=${value.value.join(',')}${needAddedEInEnd}`;
    });
  }

  const listHeaders: string = header
    .map((item: MountCurlType['header'][0]) => {
      return `  --header '${item.key}: ${item.value}' \\\n`;
    })
    .join('');

  let bodyContent: string = '';
  if (body.type === MountCurlTypeEnum['application/json']) {
    bodyContent = `  --header 'Content-Type: application/json' \\\n  --data-raw '${JSON.stringify(body.content)}'`;
  }

  if (body.type === MountCurlTypeEnum['text/plain']) {
    bodyContent = `  --header 'Content-Type: text/plain' \\\n  --data-raw '${body.content}'`;
  }

  if (body.type === MountCurlTypeEnum['application/xml']) {
    bodyContent = `  --header 'Content-Type: application/xml' \\\n  --data-raw '${body.content}'`;
  }

  if (body.type === MountCurlTypeEnum['application/x-www-form-urlencoded']) {
    bodyContent = `  --header 'Content-Type: application/x-www-form-urlencoded' \\\n`;

    body.urlEncoded.forEach((encoded: MountCurlType['body']['urlEncoded'][0]) => {
      bodyContent += `  --data-urlencode '${encoded.key}=${encoded.value}' \\\n`;
    });
  }

  return `curl -X ${method} \\
  '${host}${queries}' \\
${listHeaders}${bodyContent}`;
};
