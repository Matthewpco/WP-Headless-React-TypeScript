import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  NewsletterSubject,
  RequestGetNewsletter,
  ResponseGetNewsletter,
} from '../../graphql/getNewsletterSubscriptionsList';
import {
  RequestNewsLetterSubscription,
  ResponseCreateNewsLetterSubscription,
} from '../../graphql/createNewsletterSubscription';
import { useGraphqlQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { useGraphqlMutation } from '../../generic/graphql/useGraphqlMutation';
import { IdGraphqlMutation } from '../../generic/graphql/IdGraphqlMutation';
import { ResponseUpdateNewsletterSubscription } from '../../graphql/updateNewsletterSubscription';

export interface IContextNewsletter {
  data: NewsletterSubject[];
  loading: boolean;
  fetch: (email?: string) => void;
  error: any;
}

const ContextNewsletter = createContext<IContextNewsletter>({
  data: [],
  loading: false,
  fetch: () => undefined,
  error: undefined,
});

export const ProviderNewsletter: FC = ({ children }) => {
  const [params, setParams] = useState<{ email: string | undefined }>({
    email: undefined,
  });

  const { loading, data, error } = useGraphqlQuery<
    ResponseGetNewsletter,
    RequestGetNewsletter
  >(IdGraphqlQuery.newsletterSubscriptionsList, params);

  const fetch = useCallback(
    (email?: string) => {
      if (
        email !== params.email ||
        (!data?.newsletterSubscriptionsList && !loading)
      ) {
        setParams({ email });
      }
    },
    [params, data, loading],
  );

  const value: IContextNewsletter = useMemo(
    () => ({
      data: data?.newsletterSubscriptionsList ?? [],
      loading,
      fetch,
      error,
    }),
    [data, loading, error, fetch],
  );

  return (
    <ContextNewsletter.Provider value={value}>
      {children}
    </ContextNewsletter.Provider>
  );
};

export const useContextNewsletter = (email?: string) => {
  const contextNewsletter = useContext(ContextNewsletter);

  useEffect(() => {
    contextNewsletter.fetch(email ?? '');
  }, [email, contextNewsletter.fetch]);

  return useContext(ContextNewsletter);
};

export const useCreateNewsLetterSubscription = () => {
  const [subscribe, { data, loading }] = useGraphqlMutation<
    ResponseCreateNewsLetterSubscription,
    RequestNewsLetterSubscription
  >(IdGraphqlMutation.createNewsLetterSubscription);

  const onSubmit = useCallback(
    async (email: string, lists: string[], place?: string) => {
      const { data: responseData } = await subscribe({
        email,
        lists,
        place,
      });
      return responseData?.createNewsletterSubscription;
    },
    [],
  );

  return { onSubmit, data, loading };
};

export const useUpdateNewsLetterSubscription = () => {
  const [subscribe, { data, loading }] = useGraphqlMutation<
    ResponseUpdateNewsletterSubscription,
    RequestNewsLetterSubscription
  >(IdGraphqlMutation.updateNewsletterSubscription);

  const onSubmit = useCallback(
    async (email: string, lists: string[], place?: string) => {
      const { data: responseData } = await subscribe({
        email,
        lists,
        place,
      });
      return responseData?.updateNewsletterSubscription;
    },
    [],
  );

  return { onSubmit, data, loading };
};
