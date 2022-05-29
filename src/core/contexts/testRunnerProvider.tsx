import { createContext, useMemo, useState } from 'react';
import { dataApiResponseType } from '../interfaces/api';

const initialStateTestRunner: dataApiResponseType = {
  title: '',
  description: '',
  headers: {},
  method: '',
  params: [],
  response: '',
  sendContent: '',
  path: '',
  router: '',
};

type TestRunnerContextType = {
  testRunner: dataApiResponseType;
  setTestRunner: (testRunner: any) => void;
  resetTestRunner: Function;
};

export const TestRunnerContext = createContext({} as TestRunnerContextType);

export const TestRunnerProvider = ({ children }: any) => {
  const [testRunner, setTestRunner] = useState<dataApiResponseType>(initialStateTestRunner);

  function resetTestRunner() {
    setTestRunner(initialStateTestRunner);
  }

  const value = useMemo(() => ({ testRunner, setTestRunner, resetTestRunner }), [testRunner]);

  return <TestRunnerContext.Provider value={value}>{children}</TestRunnerContext.Provider>;
};
