import { IdGraphqlMutation } from './IdGraphqlMutation';
import { updateNewsletterSubscription } from '../../graphql/updateNewsletterSubscription';
import { createLetterToAuthor } from '../../graphql';
import { submitForm } from '../../graphql/submitForm';
import { createNewsLetterSubscription } from '../../graphql/createNewsletterSubscription';
import { toggleArticleForPiano } from '../../graphql/toggleArticleForPiano';

export const configGraphqlMutation = new Map<IdGraphqlMutation, unknown>([
  [
    IdGraphqlMutation.updateNewsletterSubscription,
    updateNewsletterSubscription,
  ],
  [IdGraphqlMutation.createLetterToAuthor, createLetterToAuthor],
  [IdGraphqlMutation.submitForm, submitForm],
  [
    IdGraphqlMutation.createNewsLetterSubscription,
    createNewsLetterSubscription,
  ],
  [IdGraphqlMutation.toggleArticleForPiano, toggleArticleForPiano],
]);
