import { createContext, useMemo, useState } from 'react';
import { testsType } from '../interfaces/api';

type initialStateTestSelectedType = {
  tests: testsType[];
  indexSelected: string;
  titleBase: string;
  descriptionBase: string;
};

const initialStateTestSelected: initialStateTestSelectedType = {
  tests: [],
  indexSelected: '',
  titleBase: '',
  descriptionBase: '',
};

type TestSelectedContextType = {
  testSelected: typeof initialStateTestSelected;
  setTestSelected: (testSelected: initialStateTestSelectedType) => void;
  resetTestSelected: Function;
};

export const TestSelectedContext = createContext({} as TestSelectedContextType);

export const TestSelectedProvider = ({ children }: any) => {
  const [testSelected, setTestSelected] = useState<typeof initialStateTestSelected>(initialStateTestSelected);

  function resetTestSelected() {
    setTestSelected(initialStateTestSelected);
  }

  const value = useMemo(() => ({ testSelected, setTestSelected, resetTestSelected }), [testSelected]);

  return <TestSelectedContext.Provider value={value}>{children}</TestSelectedContext.Provider>;
};
