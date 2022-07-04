import { useEffect, useState } from 'react';

export type ApiResponse<T> = {
  status: Number;
  statusText: String;
  data: T | any;
  error: any;
  loading: Boolean;
};

export const useApiGet = <T>(apiPath: string): ApiResponse<T> => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>('');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(apiPath);
      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
      setData(apiResponse.body);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    status,
    statusText,
    data,
    error,
    loading,
  };
};
