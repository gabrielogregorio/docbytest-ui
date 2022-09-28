import { ReactNode } from 'react';
import { createContext, useMemo, useState } from 'react';
import { apiDocsType, apiResponseDocType, apiResponseFileTypes } from '../interfaces/api';

type DataContextType = {
  setData: (data: apiResponseDocType) => void;
  suites: apiResponseFileTypes[];
  docs: apiDocsType[];
};

export const DataContext = createContext({} as DataContextType);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [suites, setSuites] = useState<apiResponseFileTypes[]>([]);
  const [docs, setDocs] = useState<apiDocsType[]>([]);

  const setData = (data: apiResponseDocType): void => {
    setSuites(data.suites);
    setDocs(data.docs);
  };

  const value = useMemo(() => ({ setData, docs, suites }), [docs, suites]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
