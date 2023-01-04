import { gql } from '@apollo/client';
import { INextEvent } from '../Single/getSingleIndustryEvent';
import { fragmentSeoPost } from '../../../graphql/fragmentSeo';
import { SeoFullHead } from '../../../graphql';

export const getIndustryEvents = gql`
  ${fragmentSeoPost}

  query getIndustryEvents($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      contentFiltered
      upcomingEvents {
        id
        uri
        featuredImageUri
        title
        excerpt
        eventInformation {
          startDate
          venue {
            id
            name
          }
        }
      }
      bottomSection {
        title
        imageUri
        description
        link {
          target
          title
          url
        }
      }
      seo {
        ...fragmentSeoPost
      }
    }
  }
`;

export interface RequestGetIndustryEvents {
  slug: string;
}

export interface IndustryEventBottomSection {
  title: string;
  imageUri: string;
  description: string;
  link: {
    target: string;
    title: string;
    url: string;
  };
}

export interface DataGetIndustryEvents {
  id: string;
  title: string;
  contentFiltered: string;
  upcomingEvents: INextEvent[];
  bottomSection: IndustryEventBottomSection;
  seo: SeoFullHead;
}

export interface ResponseGetIndustryEvents {
  page: DataGetIndustryEvents;
}
