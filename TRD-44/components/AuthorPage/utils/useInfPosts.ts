import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { WithAdBlock } from '../../ArticleScroller/WithAdBlock';
import { getInitialPostsWithAds } from './getInitialPostsWithAds';
import { getMorePostsWithAds } from './getMorePostsWithAds';
import { extractPageFromQuery } from './extractPageFromQuery';
import { identity } from '../../../generic/utils';

export const useInfPosts = <
  TRequest extends { id: string; page: number; market?: string },
  TResponse,
  TPost,
>(
  idKey: string,
  fetch: (params: TRequest) => Promise<AxiosResponse<TResponse, any>>,
  initialPosts: TPost[],
  getPostsFromResponse: (value: TResponse) => TPost[],
  idTransformer: (id: string) => string = identity,
) => {
  const { query } = useRouter();

  const [posts, setPosts] = useState<WithAdBlock<TPost>[]>(
    getInitialPostsWithAds(initialPosts),
  );
  const [market, setMarket] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(extractPageFromQuery(query.pageNumber));

  const fetchPosts = useCallback(
    async (nextPage: number, nextMarket: string | undefined) => {
      const response = await fetch({
        id: idTransformer(query[idKey] as string),
        page: nextPage,
        market: nextMarket || undefined,
      } as any);

      return response;
    },
    [],
  );

  const loadInitialRows = useCallback(async () => {
    const response = await fetchPosts(
      extractPageFromQuery(query.pageNumber),
      market,
    );
    setPosts(getInitialPostsWithAds(getPostsFromResponse(response?.data)));
  }, [fetchPosts, market]);

  const loadMoreRows = useCallback(async () => {
    const response = await fetchPosts(page + 1, market);

    setPage(page + 1);
    setPosts([
      ...posts,
      ...getMorePostsWithAds(
        getPostsFromResponse(response?.data),
        posts.length,
      ),
    ]);

    return Promise.resolve();
  }, [fetchPosts, page, posts]);

  useEffect(() => {
    setPosts(getInitialPostsWithAds(initialPosts));
    setMarket(undefined);
  }, [initialPosts]);

  useEffect(() => {
    if (market !== undefined) {
      setPage(extractPageFromQuery(query.pageNumber));
      loadInitialRows();
    }
  }, [market]);

  return { posts, market, setMarket, loadMoreRows };
};
