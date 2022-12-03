import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';
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

export const DocSelectedContext: Context<DocSelectedContextType> = createContext({} as DocSelectedContextType);

export const DocSelectedProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [docSelected, setDocSelected] = useState<typeof initialStateDocSelected>(initialStateDocSelected);

  const resetDocSelected = (): void => {
    setDocSelected(initialStateDocSelected);
  };

  const value: DocSelectedContextType = useMemo(
    () => ({ docSelected, setDocSelected, resetDocSelected }),
    [docSelected],
  );

  return <DocSelectedContext.Provider value={value}>{children}</DocSelectedContext.Provider>;
};
