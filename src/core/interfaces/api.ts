export enum parametersInEnum {
  query = 'query',
  param = 'param',
}
export type parametersExampleType = string | number | boolean;

export type paramsType = {
  in: parametersInEnum;
  name: string;
  example: parametersExampleType;
  variable: string;
  type: string;
};

export type contentRequestType = string | number | boolean | object;

export type testsType = {
  method: string;
  sendContent: contentRequestType;
  parameters: paramsType[];
  title: string;
  description: string;
  path: string;
  headers: contentRequestType;
  response: {
    statusCode: number;
    body: contentRequestType;
  };
};

export type testBaseObjectType = testsType[];

export type pathOnePathType = {
  [method: string]: testBaseObjectType;
};

export type apiPathType = { [path: string]: pathOnePathType };

export type apiResponseFileTypes = {
  paths: apiPathType;
  description: string;
  title: string;
};

export type docItemType = {
  title: string;
  order: number;
  text: string;
};

export type apiDocsType = {
  title: string;
  order: number;
  docs: docItemType[];
};

export type apiResponseDocType = {
  suites: apiResponseFileTypes[];
  docs: apiDocsType[];
};
