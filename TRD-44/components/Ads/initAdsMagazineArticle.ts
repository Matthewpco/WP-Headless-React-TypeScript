import { MagazineArticle } from '../../graphql/getMagazineArticle';
import { mapArticleToGtag } from './mapArticleToGtag';

declare const window: any;

export const initAdsMagazineArticle = (article: MagazineArticle) => {
  window.s1 = 'magazine-articles';
  window.pgtype = 'magazinearticle';
  if (article) {
    mapArticleToGtag(article);
  }
  window.trd.fn.dynamicAds();
  window.initTRDAds();
};
