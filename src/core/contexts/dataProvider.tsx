import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';
import { apiDocsType, apiResponseDocType, apiResponseFileTypes } from '../interfaces/api';

type DataContextType = {
  setData: (data: apiResponseDocType) => void;
  suites: apiResponseFileTypes[];
  docs: apiDocsType[];
};

export const DataContext: Context<DataContextType> = createContext({} as DataContextType);

export const DataProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [suites, setSuites] = useState<apiResponseFileTypes[]>([]);
  const [docs, setDocs] = useState<apiDocsType[]>([]);

  const setData = (data: apiResponseDocType): void => {
    setSuites(data.suites);
    setDocs(data.docs);
  };

  const value: DataContextType = useMemo(() => ({ setData, docs, suites }), [docs, suites]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
