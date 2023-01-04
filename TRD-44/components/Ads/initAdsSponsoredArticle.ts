import { Article } from '../../graphql';
import { mapArticleToGtag } from './mapArticleToGtag';

declare const window: any;

export const initAdsSponsoredArticle = (article: Article) => {
  window.s1 = 'other';
  window.pgtype = 'landing';
  if (article) {
    mapArticleToGtag(article);
  }
  window.trd.fn.dynamicAds();
  window.initTRDAds();
};
