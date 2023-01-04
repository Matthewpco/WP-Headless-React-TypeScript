import { gql } from '@apollo/client';
import { fragmentSeoPost } from './fragmentSeo';
import { Article } from './getArticle';

export const getPage = gql`
  ${fragmentSeoPost}

  query getPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      template {
        templateValue
      }
      contentFiltered
      seo {
        ...fragmentSeoPost
      }
    }
  }
`;

export interface RequestGetPage {
  slug: string;
}

export interface DataGetPage
  extends Pick<Article, 'title' | 'contentFiltered' | 'seo'> {
  template: {
    templateValue: string;
  };
  id: string;
}

export interface ResponseGetPage {
  page: DataGetPage;
}
