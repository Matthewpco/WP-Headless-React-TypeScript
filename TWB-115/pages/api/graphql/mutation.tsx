import { NextApiRequest, NextApiResponse } from 'next';
import { FetchResult } from '@apollo/client';
import { client } from '../../../graphql';
import { configGraphqlMutation } from '../../../generic/graphql/configGraphqlMutation';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(403);
  }

  const { query, ...variables } = req.body;
  const graphqlMutation = configGraphqlMutation.get(query);

  if (!graphqlMutation) {
    return res.status(403);
  }

  const response = await client
    .mutate({
      mutation: graphqlMutation,
      variables,
    })
    .catch((error) => {
      res.status(error.statusCode).json(error.response);
    });

  return res.status(200).json((response as FetchResult)?.data);
};

export default handler;
