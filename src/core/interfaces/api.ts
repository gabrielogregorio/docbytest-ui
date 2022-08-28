export type paramsType = {
  tag: string;
  variable: string;
  in: string;
  required: null;
  type: string;
  example: string;
};

export type testsType = {
  method: string;
  sendContent: any;
  parameters: paramsType[];
  title: string;
  description: string;
  router: string;
  fullPath: string;
  headers: any;
  response: {
    statusCode: number;
    body: any;
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
