import { createContext, useMemo, useState } from 'react';
import { testsType } from '../interfaces/api';

export type initialStateDocSelectedType = {
  tests: testsType[];
  idContent: string;
  title: string;
  description: string;
};

const initialStateDocSelected: initialStateDocSelectedType = {
  tests: [],
  idContent: '',
  title: '',
  description: '',
};

type DocSelectedContextType = {
  docSelected: typeof initialStateDocSelected;
  setDocSelected: (docSelected: initialStateDocSelectedType) => void;
  resetDocSelected: Function;
};

export const DocSelectedContext = createContext({} as DocSelectedContextType);

export const DocSelectedProvider = ({ children }: any) => {
  const [docSelected, setDocSelected] = useState<typeof initialStateDocSelected>(initialStateDocSelected);

  function resetDocSelected() {
    setDocSelected(initialStateDocSelected);
  }

  const value = useMemo(() => ({ docSelected, setDocSelected, resetDocSelected }), [docSelected]);

  return <DocSelectedContext.Provider value={value}>{children}</DocSelectedContext.Provider>;
};
