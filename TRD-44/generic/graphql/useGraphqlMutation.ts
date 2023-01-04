import { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IdGraphqlMutation } from './IdGraphqlMutation';

export const getMutation = <Response extends {}, Request extends {}>(
  query: IdGraphqlMutation,
  params: Request,
) =>
  axios.post<Response>('/api/graphql/mutation', {
    ...params,
    query,
  });

export const useGraphqlMutation = <Response extends {}, Request extends {}>(
  query: IdGraphqlMutation,
): [
  (params: Request) => Promise<AxiosResponse<Response>>,
  { data: Response | null; loading: boolean },
] => {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    (params: Request) => {
      setLoading(true);

      return getMutation<Response, Request>(query, params).then((data) => {
        setLoading(false);
        setData(data?.data);
        return data;
      });
    },
    [query, setLoading],
  );

  return [
    request,
    {
      data: data as Response | null,
      loading,
    },
  ];
};
