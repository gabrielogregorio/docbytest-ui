import { useEffect, useState } from 'react';
import { apiResponseDocType } from '../interfaces/api';

export const useFetchDocumentation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<apiResponseDocType>({
    docs: '',
    files: [],
  });

  useEffect(() => {
    setIsLoading(true);
    fetch('http://127.0.0.1:3333/docs')
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
