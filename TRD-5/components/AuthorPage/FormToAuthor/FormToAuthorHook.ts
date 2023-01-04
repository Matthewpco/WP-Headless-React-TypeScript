import { useCallback } from 'react';
import {
  RequestCreateLetterToAthor,
  ResponseCreateLetterToAthor,
} from '../../../graphql';
import { useGraphqlMutation } from '../../../generic/graphql/useGraphqlMutation';
import { IdGraphqlMutation } from '../../../generic/graphql/IdGraphqlMutation';

export const useFormToAuthor = () => {
  const [subscribe, { data, loading }] = useGraphqlMutation<
    ResponseCreateLetterToAthor,
    RequestCreateLetterToAthor
  >(IdGraphqlMutation.createLetterToAuthor);

  const onSubmit = useCallback(async (args) => {
    const { data: responseData } = await subscribe({
      values: args,
    });
    return responseData?.submitFormToAuthor;
  }, []);

  return { onSubmit, data, loading };
};
