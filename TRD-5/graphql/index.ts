export { client } from './client';

export { getFooter } from './getFooter';
export type {
  ResponseGetFooter,
  FooterMenuItem,
  SocialLinkItem,
} from './getFooter';

export { getHeader } from './getHeader';
export type { ResponseGetHeader,
  HeaderDropdownMenuItem,
  HeaderDropdownMenu,
} from './getHeader';

export { getMainMenu } from './getMainMenu';
export type { ResponseGetMainMenu, MainMenuItem } from './getMainMenu';

export { getNewsletter } from './getNewsletter';
export type {
  ResponseGetNewsletter,
  NewsletterSection,
  NewsletterSubject,
} from './getNewsletter';

export { fragmentArticle } from './fragmentArticle';
export { getArticle, getSponsorArticle } from './getArticle';
export type {
  RequestGetArticle,
  ResponseGetSponsorArticle,
  ResponseGetArticle,
  ArticleAuthor,
  ArticleTag,
  Article,
  MarketSection,
  ArticleSector,
  CompaniesAndPeopleLink,
} from './getArticle';

export { getNextArticle, getNextSponsorArticle } from './getNextArticle';
export type {
  RequestGetNextArticle,
  ResponseGetNextArticle,
} from './getNextArticle';

// TO DO delete this fragment after release
export { fragmentReadMore } from './fragmentReadMore';
export type {
  ReadMoreCategory,
  ResponseReadMore,
  ReadMoreImage,
  ReadMoreItem,
  ReadMoreMarket,
} from './fragmentReadMore';
// TO DO delete this fragment after release

export { getSponsor } from './getSponsor';
export type {
  Sponsor,
  RequestGetSponsor,
  ResponseGetSponsor,
} from './getSponsor';

export { getTrendingArticle } from './getTrendingArticle';
export type {
  TrendingArticle,
  ResponseGetTrendingArticle,
  RequestGetTrendingArticle,
} from './getTrendingArticle';

export { getTopStories } from './getTopStories';
export type {
  Imarkets,
  ItopStories,
  ResponseGetTopStories,
  RequestGetTopStories,
} from './getTopStories';

export { getRecommendedStories } from './getRecommendedStories';
export type {
  IrecommendedStories,
  ResponseGetRecommendedStories,
  RequestGetRecommendedStories,
} from './getRecommendedStories';

export { getAuthorId, getPropsForm } from './getFormContactAuthor';
export type {
  AuthorId,
  ResponseAuthorId,
  PropsField,
  ResponsePropsForm,
  RequestPropsForm,
} from './getFormContactAuthor';

export { createLetterToAuthor } from './createLetterToAuthor';
export type {
  Iquery,
  RequestCreateLetterToAthor,
  ResponseCreateLetterToAthor,
} from './createLetterToAuthor';

export { getMarketHeroSectionPosts } from './getMarketHeroSectionPosts';
export type {
  RequestGetMarketHeroSectionPosts,
  ResponseGetMarketHeroSectionPosts,
} from './getMarketHeroSectionPosts';

export { getStylesWp } from './getStylesWp';
export type { ResponseGetStylesWp } from './getStylesWp';

export { getChartbeat } from './getChartbeat';
export type { RequestGetChartbeat, ResponseGetChartbeat } from './getChartbeat';

export type { SeoFullHead } from './fragmentSeo';
