import { Article } from '../../graphql';
import { DataSingleIndustryEvent } from '../IndustryEvent/Single/getSingleIndustryEvent';
import { mapArticleToGtag } from './mapArticleToGtag';

declare const window: any;

export const initAdsArticles = (
  article?: Article | DataSingleIndustryEvent,
) => {
  window.s1 = 'news-articles';
  window.pgtype = 'articles';

  if (article) {
    mapArticleToGtag(article);
  }

  window.trd.fn.dynamicAds();
  window.initTRDAds();
};
