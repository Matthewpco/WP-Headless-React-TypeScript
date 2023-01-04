import { gql } from '@apollo/client';
import { fragmentSeoPost } from './fragmentSeo';

export const fragmentArticle = gql`
  ${fragmentSeoPost}

  fragment fragmentArticle on Post {
    title
    alternativeHeadline {
      subheadline
    }
    databaseId
    slug
    uri
    link
    date
    featuredImageUri
    featuredImageCaption
    contentFiltered
    tags {
      nodes {
        id
        slug
        name
        uri
      }
    }
    sectors {
      nodes {
        uri
        name
        id
      }
    }
    markets {
      nodes {
        name
        slug
      }
    }
    primarySector {
      name
      slug
    }
    bylineInformation {
      authors {
        id
        firstName
        lastName
        uri
      }
      researchers {
        id
        firstName
        lastName
        uri
      }
    }
    template {
      templateValue
    }
    seo {
      ...fragmentSeoPost
    }
    companies {
      nodes {
        name
        uri
      }
    }
    paywall {
      type
      content
    }
    people {
      nodes {
        name
        uri
      }
    }
  }
`;

export const fragmentSponsorArticle = gql`
  ${fragmentSeoPost}

  fragment fragmentSponsorArticle on Sponsor {
    title
    alternativeHeadline {
      subheadline
    }
    markets {
      nodes {
        name
        slug
      }
    }
    databaseId
    uri
    link
    slug
    date
    archiveDate
    isArchive
    featuredImageUri
    featuredImageCaption
    contentFiltered
    bylineInformation {
      authors {
        id
        firstName
        lastName
        uri
      }
      researchers {
        id
        firstName
        lastName
        uri
      }
    }
    template {
      templateValue
    }
    seo {
      ...fragmentSeoPost
    }
    paywall {
      type
      content
    }
  }
`;
