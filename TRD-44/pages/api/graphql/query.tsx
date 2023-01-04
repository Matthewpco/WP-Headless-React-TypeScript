import { NextApiRequest, NextApiResponse } from 'next';
import { FetchResult } from '@apollo/client';
import { client } from '../../../graphql';
import { configGraphqlQuery } from '../../../generic/graphql/configGraphqlQuery';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(403);
  }

  const { query, ...variables } = req.body;
  const graphqlQuery = configGraphqlQuery.get(query);

  if (!graphqlQuery) {
    return res.status(403);
  }

  const response = await client
    .query({
      query: graphqlQuery,
      variables,
    })
    .catch((error) => {
      res.status(error.statusCode).json(error.response);
    });

  return res.status(200).json((response as FetchResult)?.data);
};

export default handler;
