import { useMemo } from 'react';
import { RequestGetTopStories, ResponseGetTopStories } from '../../graphql';
import { useGraphqlQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';

export const useTopStoriesList = (prop?: string) => {
  const params = useMemo(
    () => ({
      market: prop,
      count: 4,
    }),
    [prop],
  );

  const { data, refetch } = useGraphqlQuery<
    ResponseGetTopStories,
    RequestGetTopStories
  >(IdGraphqlQuery.getTopStories, params);
  return { data: data?.topArticlesList.articles, refetch };
};
