/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { mountRequestItem } from '../core/helpers/mountRequest';
import { MountCurlMethodEnum, MountCurlTypeEnum, TypeToMountEnum } from '../core/helpers/mountRequest/types';

describe('Curl Request', () => {
  it('should mount curl request complete, PUT, QUERY, HEADER, JSON', () => {
    const responseQuery: string = mountRequestItem(
      {
        method: MountCurlMethodEnum.PUT,
        host: 'https://itemabc.com.br',
        query: [
          {
            key: 'queryKey',
            value: ['item1', 'item2'],
          },
          {
            key: 'queryKey2',
            value: ['item3', 'item4'],
          },
        ],
        header: [
          { key: 'header2', value: '*/*' },
          { key: 'User-Agent', value: 'Thunder Client (https://www.thunderclient.com)' },
          { key: 'header1', value: 'value1' },
          { key: 'Accept', value: 'value2' },
        ],
        body: {
          type: MountCurlTypeEnum['application/json'],
          content: { name: 'abc' },
          urlEncoded: [
            {
              key: 'keyEncode',
              value: 'valueEncode',
            },
          ],
        },
      },
      TypeToMountEnum.CURL,
    );

    expect(responseQuery).toEqual(`curl -X PUT \\
  'https://itemabc.com.br?queryKey=item1,item2&queryKey2=item3,item4' \\
  --header 'header2: */*' \\
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \\
  --header 'header1: value1' \\
  --header 'Accept: value2' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{"name":"abc"}'`);
  });

  it('should mount curl request complete, DELETE, WITHOUT QUERY, HEADER BEARER AND TEXT CONTENT', () => {
    const responseQuery: string = mountRequestItem(
      {
        method: MountCurlMethodEnum.DELETE,
        host: '127.0.0.1:3333/user/:id',
        query: [],
        header: [
          {
            key: 'Authorization',
            value: 'Bearer Bearrier TOlne',
          },
        ],
        body: {
          type: MountCurlTypeEnum['text/plain'],
          content: 'my text plan',
          urlEncoded: [],
        },
      },
      TypeToMountEnum.CURL,
    );

    expect(responseQuery).toEqual(`curl -X DELETE \\
  '127.0.0.1:3333/user/:id' \\
  --header 'Authorization: Bearer Bearrier TOlne' \\
  --header 'Content-Type: text/plain' \\
  --data-raw 'my text plan'`);
  });

  it('should mount curl request complete, GET, WITHOUT QUERY, NO HEADER, ENCODED', () => {
    const responseQuery: string = mountRequestItem(
      {
        method: MountCurlMethodEnum.GET,
        host: '127.0.0.1:3333/user/123',
        query: [],
        header: [],
        body: {
          type: MountCurlTypeEnum['application/x-www-form-urlencoded'],
          content: { name: 'abc' },
          urlEncoded: [
            {
              key: 'keyEncode',
              value: 'valueEncode',
            },
            {
              key: 'keyEncode2',
              value: 'valueEncode2',
            },
          ],
        },
      },
      TypeToMountEnum.CURL,
    );

    expect(responseQuery).toEqual(`curl -X GET \\
  '127.0.0.1:3333/user/123' \\
  --header 'Content-Type: application/x-www-form-urlencoded' \\
  --data-urlencode 'keyEncode=valueEncode' \\
  --data-urlencode 'keyEncode2=valueEncode2' \\
`);
  });
});
