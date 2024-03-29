import { getMagazineArticles } from '../../graphql/getMagazineArticles';

export enum IdGraphqlQuery {
  getNextArticle = 'getNextArticle',
  getNextSponsorArticle = 'getNextSponsorArticle',
  getTagPosts = 'getTagPosts',
  getCompanyPosts = 'getCompanyPosts',
  getPersonPosts = 'getPersonPosts',
  getSponsored = 'getSponsored',
  getMagazineForHomepage = 'getMagazineForHomepage',
  getAuthorPosts = 'getAuthorPosts',
  getSponsoredPosts = 'getSponsoredPosts',
  getSectorPosts = 'getSectorPosts',
  getMagazineIssueArchivesCards = 'getMagazineIssueArchivesCards',
  getMarketPosts = 'getMarketPosts',
  getPropsForm = 'getPropsForm',
  getPostsByAdvertiser = 'getPostsByAdvertiser',
  newsletterSubscriptionsList = 'newsletterSubscriptionsList',
  getTopStories = 'getTopStories',
  getRecommendedStories = 'getRecommendedStories',
  getSavedArticles = 'getSavedArticles',
  getSectionHomePage = 'getSectionHomePage',
  savedForPiano = 'savedForPiano',
  getSponsor = 'getSponsor',
  getSectorsForSlider = 'getSectorsForSlider',
  getPostsForSlider = 'getPostsForSlider',
  getNextMagazineArticle = 'getNextMagazineArticle',
  getMagazineArticles = 'getMagazineArticles',
}
