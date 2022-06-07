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
  params: paramsType[];
  title: string;
  description: string;
  router: string;
  path: string;
  headers: any;
  response: {
    statusCode: string;
    body: any;
  };
};

export type testBaseObjectType = { tests: testsType[] };

export type pathOnePathType = {
  [method: string]: testBaseObjectType;
};

export type apiPathType = { [path: string]: pathOnePathType };

export type apiResponseFileTypes = {
  paths: apiPathType;
  description: string;
  title: string;
};

export type apiResponseDocType = {
  files: apiResponseFileTypes[];
  docs: string;
};
