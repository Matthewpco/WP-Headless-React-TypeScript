import { gql } from '@apollo/client';
import { fragmentSeoPost } from '../../graphql/fragmentSeo';
import { SeoFullHead } from '../../graphql';
import { INextEvent } from '../IndustryEvent/Single/getSingleIndustryEvent';

export const getEvents = gql`
  ${fragmentSeoPost}

  query getEvents {
    pageByType(uri: "events") {
      ... on TRDEventsPage {
        page {
          title
          alternativeHeadline {
            subheadline
          }
          contentFiltered
          seo {
            ...fragmentSeoPost
          }
        }
        bottomSection {
          title
          description
          imageUri
          link {
            target
            title
            url
          }
        }
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
      }
    }
  }
`;

export interface DataPageGetEvents {
  title: string;
  alternativeHeadline: {
    subheadline: string;
  };
  contentFiltered: string;
  seo: SeoFullHead;
}

export interface DataBottomSectionGetEvents {
  title: string;
  description: string;
  imageUri: string;
  link: {
    target: string;
    title: string;
    url: string;
  };
}

export interface DataGetEvents {
  page: DataPageGetEvents;
  bottomSection: DataBottomSectionGetEvents;
  upcomingEvents: INextEvent[];
}

export interface ResponseGetEvents {
  pageByType: DataGetEvents;
}
