import { useEffect, useState } from 'react';
import { apiResponseDocType } from '../interfaces/api';
import { useGetUrlApi } from './useGetUrlApi';

export const useFetchDocumentation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { currentUrlAPi } = useGetUrlApi();
  const [data, setData] = useState<apiResponseDocType>({
    docs: [],
    files: [],
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`${currentUrlAPi}-json`)
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
    data,
    error,
    isLoading,
  };
};
