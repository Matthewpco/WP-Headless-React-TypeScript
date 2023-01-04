import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { last, uniqBy } from 'lodash/fp';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import {
  Article,
  RequestGetNextArticle,
  ResponseGetNextArticle,
} from '../../graphql';
import { useDebounce } from '../../generic/hooks';
import { isClientSide } from '../../generic/utils';

declare const window: any;

export interface IUseArticlesParams {
  article: Article;
  nextArticleQuery: IdGraphqlQuery;
  extractPostFromResponse: (value: any) => Article;
  isFreeAccess: boolean;
}

export const useArticles = ({
  article,
  nextArticleQuery,
  extractPostFromResponse,
  isFreeAccess,
}: IUseArticlesParams) => {
  const callDebouncedFunction = useDebounce(50);
  const [isPaidUser, setIsPaidUser] = useState(true);
  const [isPaywallFired, setIsPaywallFired] = useState(false);
  const [articles, setArticles] = useState<Article[]>([article]);
  const observerRef = useRef<IntersectionObserver[]>([]);
  const paywallType = useMemo(
    () => last(articles)?.paywall?.type,
    [articles.length],
  );

  useEffect(() => {
    if (article && articles?.[0]?.databaseId !== article?.databaseId) {
      setArticles([article]);
    }
  }, [article]);

  const [requestNextArticle, loadingNextArticle] =
    useGraphqlLazyQuery<ResponseGetNextArticle, RequestGetNextArticle>(
      nextArticleQuery,
    );

  const resetArticles = () => setArticles([]);

  const loadNextArticle = () => {
    callDebouncedFunction(async () => {
      const lastArticleDatabaseId = last(articles)?.databaseId;
      if (!lastArticleDatabaseId) {
        return;
      }

      const response = await requestNextArticle({
        id: lastArticleDatabaseId,
      }).catch(() => {
        //
      });

      const previousPost = extractPostFromResponse(response);
      if (previousPost) {
        setArticles((prevState) => {
          const newArray = [...prevState, previousPost];
          return uniqBy('databaseId', newArray);
        });
      }
    });
  };

  useEffect(() => {
    window.tp = window.tp || [];
    window.tp.push([
      'addHandler',
      'showTemplate',
      (meterData: any) => {
        if (meterData.containerSelector === '#article-paywall-container') {
          setIsPaywallFired(true);
        }
      },
    ]);
  }, []);

  useEffect(() => {
    const lessThanOneArticle = articles.length <= 1;
    const meterRemaining = paywallType !== 'subscriber_only';

    if (lessThanOneArticle) {
      const articleData = articles[0];
      const uri = articleData?.uri;
      if (uri) {
        window.tp = window.tp || [];
        window.tp.push(['setPageURL', `${window.location.origin}${uri}`]);
      }
    }

    if (
      (lessThanOneArticle && meterRemaining && !isPaywallFired) ||
      isPaidUser
    ) {
      loadNextArticle();
    }
  }, [isPaywallFired, paywallType, isPaidUser]);

  const handleObserver = useCallback(
    (entries: any[]) => {
      const element = entries[0];

      if (element.isIntersecting && articles.length > 0) {
        const index = element.target.getAttribute('data-article-index');
        const articleData = articles[index];
        const uri = articleData?.uri;

        window.history.pushState(undefined, '', uri);

        if ((!isPaywallFired && index !== '0') || isFreeAccess) {
          loadNextArticle();

          if (isClientSide()) {
            if (uri) {
              window.pid = articleData.slug?.slice(0, 35);
              window.initDFP();

              window.tp = window.tp || [];
              window.tp.push([
                'setPageURL',
                window.tp.push([
                  'setPageURL',
                  `${window.location.origin}${uri}`,
                ]),
              ]);
            }
          }
        }
      }
    },
    [isPaywallFired, articles],
  );

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      };
      observerRef.current.push(
        new IntersectionObserver(handleObserver, option),
      );

      if (el) {
        observerRef.current[observerRef.current.length - 1].observe(el);
      }
    },
    [handleObserver, loadingNextArticle],
  );

  return {
    articles,
    isPaidUser,
    actions: {
      loadMoreCallback,
      setPayedUser: setIsPaidUser,
      resetArticles,
    },
  };
};
