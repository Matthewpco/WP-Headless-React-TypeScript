import { gql } from '@apollo/client';
import { IdTemplate } from '../components/templates';
import { fragmentArticle, fragmentSponsorArticle } from './fragmentArticle';
import { SeoFullHead } from './fragmentSeo';
import { Sponsor } from './getSponsor';

export const getArticle = gql`
  ${fragmentArticle}

  query getArticle($uri: ID!) {
    post(id: $uri, idType: URI) {
      ...fragmentArticle
    }
  }
`;

export const getSponsorArticle = gql`
  ${fragmentSponsorArticle}

  query getSponsorArticle($uri: ID!) {
    sponsor(id: $uri, idType: URI) {
      ...fragmentSponsorArticle
    }
  }
`;

export interface ArticleAuthor {
  id: string;
  firstName: string;
  lastName: string;
  uri: string;
}

export interface ArticleTag {
  id: string;
  slug: string;
  name: string;
  uri: string;
}

export interface MarketSection {
  name: string;
  slug: string;
}

export interface ArticleSector {
  uri: string;
  name: string;
  id: string;
}

export interface CompaniesAndPeopleLink {
  name: string;
  uri: string;
}

export interface Article {
  title: string;
  alternativeHeadline: {
    subheadline: string;
  };
  databaseId: number;
  uri: string;
  link: string;
  date: string;
  slug: string;
  featuredImageUri: string;
  featuredImageCaption: string;
  contentFiltered: string;
  sectors: {
    nodes: ArticleSector[];
  };
  markets: {
    nodes: MarketSection[];
  };
  primarySector: MarketSection;
  tags: {
    nodes: ArticleTag[];
  };
  bylineInformation: {
    authors: ArticleAuthor[];
    researchers: ArticleAuthor[];
  };
  template: {
    templateValue: IdTemplate;
  };
  seo: SeoFullHead;
  companies: {
    nodes: CompaniesAndPeopleLink[];
  };
  paywall: {
    type: string;
    content: string;
  };
  people: {
    nodes: CompaniesAndPeopleLink[];
  };
}

export interface ResponseGetArticle {
  post: Article;
}

export interface ResponseGetSponsorArticle {
  sponsor: Article;
  sponsors: Sponsor[];
}

export interface RequestGetArticle {
  uri: string;
}
