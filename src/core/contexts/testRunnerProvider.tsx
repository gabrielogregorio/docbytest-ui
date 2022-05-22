import { createContext, useMemo, useState } from 'react';

type TestRunnerContextType = {
  testRunnerIsOpen: any;
  setTestRunnerIsOpen: (testRunnerIsOpen: any) => void;
};

export const TestRunnerContext = createContext({} as TestRunnerContextType);

export const TestRunnerProvider = ({ children }: any) => {
  const [testRunnerIsOpen, setTestRunnerIsOpen] = useState<any>(null);

  const value = useMemo(() => ({ testRunnerIsOpen, setTestRunnerIsOpen }), [testRunnerIsOpen]);

  return <TestRunnerContext.Provider value={value}>{children}</TestRunnerContext.Provider>;
};
