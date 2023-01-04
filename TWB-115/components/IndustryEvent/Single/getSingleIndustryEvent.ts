import { gql } from '@apollo/client';
import { fragmentSeoPost } from '../../../graphql/fragmentSeo';
import { SeoFullHead } from '../../../graphql';

export const getSingleIndustryEvent = gql`
  ${fragmentSeoPost}

  query getSingleIndustryEvent($id: ID!) {
    event(id: $id, idType: URI) {
      id
      databaseId
      date
      slug
      uri
      title
      contentFiltered
      featuredImageUri
      eventsCptFields {
        registerNowUrl
      }
      eventInformation {
        eventStatus
        startDate
        endDate
        venue {
          id
          name
          venueDetails {
            country
            fullAddress
            streetAddress
          }
        }
      }
      nextEvents {
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
      seo {
        ...fragmentSeoPost
      }
    }
  }
`;

export interface RequestSingleIndustryEvent {
  id: string;
}

export interface SingleIndustryEventCptFields {
  registerNowUrl: string;
}

export interface SingleIndustryEventVenueDetails {
  country: string;
  fullAddress: string;
  streetAddress: string;
}

export interface SingleIndustryEventVenue {
  id: string;
  name: string;
  venueDetails: SingleIndustryEventVenueDetails;
}

export interface SingleIndustryEventInfo {
  eventStatus: string;
  startDate: string;
  endDate: string;
  venue: SingleIndustryEventVenue[];
}

export interface INextEventVenue {
  id: string;
  name: string;
}

export interface INextEventInfo {
  startDate: string;
  venue: INextEventVenue[];
}

export interface INextEvent {
  id: string;
  uri: string;
  featuredImageUri: string;
  title: string;
  excerpt: string;
  eventInformation: INextEventInfo;
}

export interface DataSingleIndustryEvent {
  id: string;
  databaseId: number;
  slug: string;
  date: string;
  uri: string;
  title: string;
  contentFiltered: string;
  featuredImageUri: string;
  eventsCptFields: SingleIndustryEventCptFields;
  eventInformation: SingleIndustryEventInfo;
  nextEvents: INextEvent[];
  seo: SeoFullHead;
}

export interface ResponseSingleIndustryEvent {
  event: DataSingleIndustryEvent;
}
