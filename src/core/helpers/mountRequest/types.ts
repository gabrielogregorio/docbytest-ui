export enum MountCurlMethodEnum {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'DELETE' = 'DELETE',
  'PATCH' = 'PATCH',
  'HEAD' = 'HEAD',
  'OPTIONS' = 'OPTIONS',
  'PROPFIND' = 'PROPFIND',
}

export enum MountCurlTypeEnum {
  'application/json' = 'application/json',
  'application/xml' = 'application/xml',
  'text/plain' = 'text/plain',
  'application/x-www-form-urlencoded' = 'application/x-www-form-urlencoded',
}

export type MountCurlType = {
  method: MountCurlMethodEnum;
  host: string;
  query: {
    key: string;
    value: string[];
  }[];
  header: { key: string; value: string }[];
  body: {
    type: MountCurlTypeEnum;
    content: object | string;
    urlEncoded: {
      key: string;
      value: string;
    }[];
  };
};

export enum TypeToMountEnum {
  'CURL' = 'CURL',
}
