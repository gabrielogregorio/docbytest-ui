import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../contexts/dataProvider';
import { useGetUrlApi } from './useGetUrlApi';

export const useFetchDocsAndSaveContext = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { currentUrlOrigin } = useGetUrlApi();
  const { setData } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${currentUrlOrigin}/docs-json`)
      .then((res) => res.json())
      .then((dataApi) => {
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
