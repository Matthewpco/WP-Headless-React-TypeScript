import { gql } from '@apollo/client';

export const getSponsor = gql`
  query getSponsor($uri: ID!) {
    sponsor(id: $uri, idType: URI) {
      advertisers {
        nodes {
          name
          uri
          logoImageUri
          advertiserFields {
            notShowSponsoredBy
            notShowLogo
          }
        }
      }
    }
    
}`;

export interface Sponsor {
  name: string;
  uri: string;
  logoImageUri: string;
  advertiserFields: {
    notShowSponsoredBy: null | boolean;
    notShowLogo: null | boolean;
  };
}

export interface ResponseGetSponsor {
  sponsor: {
    advertisers : {
        nodes: Sponsor[];
    }
  }
}

export interface RequestGetSponsor {
  uri: string;
}
