import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../contexts/dataProvider';
import { getUrlApi } from './getUrlApi';

export const useFetchDocsAndSaveContext = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { currentUrlOrigin } = getUrlApi();
  const { setData } = useContext(DataContext);
  const isFirstLoading = useRef<boolean>(true);

  useEffect(() => {
    if (!isFirstLoading.current) {
      return;
    }
    isFirstLoading.current = false;

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
  }, [currentUrlOrigin, setData]);

  return {
    error,
    isLoading,
  };
};
