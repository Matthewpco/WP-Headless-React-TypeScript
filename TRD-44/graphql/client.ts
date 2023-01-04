import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { DefaultOptions } from '@apollo/client/core/ApolloClient';

const encode = (str: string) => Buffer.from(str, 'binary').toString('base64');
const httpLink = createHttpLink({
  uri: process.env.WP_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = encode(
    `${process.env.WP_LOGIN}:${process.env.WP_LOGIN_PASSWORD}`,
  );

  return {
    headers: {
      ...headers,
      Authorization: `Basic ${token}`,
    },
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
};

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});
