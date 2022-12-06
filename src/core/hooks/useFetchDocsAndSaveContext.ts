import { useContext, useEffect, useState } from 'react';
import { apiResponseDocType } from '@/interfaces/api';
import { DataContext } from '@/contexts/dataProvider';
import { getUrlApi } from './getUrlApi';

export const useFetchDocsAndSaveContext = (): { error: string; isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { currentUrlOrigin } = getUrlApi();
  const { setData } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${currentUrlOrigin}/docs-json`)
      .then((res: Response) => res.json())
      .then((dataApi: apiResponseDocType) => {
        setData(dataApi);
      })
      .catch(() => {
        setError('Erro ao fazer requisição');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    error,
    isLoading,
  };
};
