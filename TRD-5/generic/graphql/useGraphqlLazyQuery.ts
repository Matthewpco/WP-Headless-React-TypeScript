import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IdGraphqlQuery } from './IdGraphqlQuery';

export const getQuery = <Response extends {}, Request extends {}>(
  query: IdGraphqlQuery,
  params?: Request,
) =>
  axios.post<Response>('/api/graphql/query', {
    ...(params ?? {}),
    query,
  });

export const useGraphqlLazyQuery = <
  Response extends {},
  Request extends {} = {},
>(
  query: IdGraphqlQuery,
): [(params?: Request) => Promise<AxiosResponse<Response>>, boolean] => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    (params?: Request) => {
      setLoading(true);

      return getQuery<Response, Request>(query, params).then((data) => {
        setLoading(false);
        return data;
      });
    },
    [query, setLoading],
  );

  return [request, loading];
};

export const useGraphqlQuery = <Response extends {}, Request extends {} = {}>(
  query: IdGraphqlQuery,
  params?: Request,
) => {
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [fetch, loading] = useGraphqlLazyQuery(query);

  useEffect(() => {
    fetch(params)
      .then((data) => setData((data?.data ?? null) as Response | null))
      .catch((error) => setError(error ?? null));
  }, [fetch, params]);

  const refetch = useCallback(
    (newParams?: Request) =>
      fetch({ ...params, ...(newParams ?? {}) })
        .then((data) => setData((data?.data ?? null) as Response | null))
        .catch((error) => setError(error ?? null)),
    [fetch, params],
  );

  return { data, error, refetch, loading };
};
