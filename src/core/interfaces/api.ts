export type apiMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type paramsApiResponseType = {
  example: string;
  in: 'param' | 'query';
  required: boolean;
  tag: string;
  type: string;
  variable: string;
};

export type dataApiResponseType = {
  title: string;
  description: string;
  headers: any;
  method: string;
  params: paramsApiResponseType[];
  response: any;
  sendContent: string;
  path: string;
  router: string;
};
