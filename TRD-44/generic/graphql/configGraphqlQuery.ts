import { IdGraphqlQuery } from './IdGraphqlQuery';
import {
  getNextArticle,
  getNextSponsorArticle,
  getPropsForm,
  getRecommendedStories,
  getSponsor,
  getTopStories,
} from '../../graphql';
import { getTagPosts } from '../../graphql/getTagPosts';
import { getSponsored } from '../../graphql/getSponsored';
import { getMagazineForHomepage } from '../../graphql/getMagazineForHomepage';
import { getAuthorPosts } from '../../graphql/getAuthorPosts';
import { getSponsoredPosts } from '../../graphql/getSponsoredPost';
import { getSectorPosts } from '../../graphql/getSectorPosts';
import { getMagazineIssueArchivesCards } from '../../graphql/getMagazineIssueArchivesCards';
import { getMarketPosts } from '../../graphql/getMarketPost';
import { getPostsByAdvertiser } from '../../graphql/getPostsByAdvertiser';
import { getSavedArticles } from '../../graphql/getSavedArticles';
import { savedForPiano } from '../../graphql/savedForPiano';
import { getSectionHomePage } from '../../graphql/getSectionHomePage';
import { newsletterSubscriptionsList } from '../../graphql/getNewsletterSubscriptionsList';
import { getCompanyPosts } from '../../graphql/getCompanyPosts';
import { getPersonPosts } from '../../graphql/getPersonPosts';
import { getSectorsForSlider } from '../../graphql/getSectorsForSlider';
import { getPostsForSlider } from '../../graphql/getPostsForSlider';
import { getNextMagazineArticle } from '../../graphql/getNextMagazineArticle';
import { getMagazineArticles } from '../../graphql/getMagazineArticles';

export const configGraphqlQuery = new Map<IdGraphqlQuery, unknown>([
  [IdGraphqlQuery.getNextArticle, getNextArticle],
  [IdGraphqlQuery.getNextSponsorArticle, getNextSponsorArticle],
  [IdGraphqlQuery.getTagPosts, getTagPosts],
  [IdGraphqlQuery.getCompanyPosts, getCompanyPosts],
  [IdGraphqlQuery.getPersonPosts, getPersonPosts],
  [IdGraphqlQuery.getSponsored, getSponsored],
  [IdGraphqlQuery.getMagazineForHomepage, getMagazineForHomepage],
  [IdGraphqlQuery.getAuthorPosts, getAuthorPosts],
  [IdGraphqlQuery.getSponsoredPosts, getSponsoredPosts],
  [IdGraphqlQuery.getSectorPosts, getSectorPosts],
  [IdGraphqlQuery.getMagazineIssueArchivesCards, getMagazineIssueArchivesCards],
  [IdGraphqlQuery.getMarketPosts, getMarketPosts],
  [IdGraphqlQuery.getPropsForm, getPropsForm],
  [IdGraphqlQuery.getPostsByAdvertiser, getPostsByAdvertiser],
  [IdGraphqlQuery.getTopStories, getTopStories],
  [IdGraphqlQuery.getSectionHomePage, getSectionHomePage],
  [IdGraphqlQuery.getRecommendedStories, getRecommendedStories],
  [IdGraphqlQuery.getSavedArticles, getSavedArticles],
  [IdGraphqlQuery.newsletterSubscriptionsList, newsletterSubscriptionsList],
  [IdGraphqlQuery.savedForPiano, savedForPiano],
  [IdGraphqlQuery.getSponsor, getSponsor],
  [IdGraphqlQuery.getSectorsForSlider, getSectorsForSlider],
  [IdGraphqlQuery.getPostsForSlider, getPostsForSlider],
  [IdGraphqlQuery.getNextMagazineArticle, getNextMagazineArticle],
  [IdGraphqlQuery.getMagazineArticles, getMagazineArticles],
]);
