import { Article } from '../../graphql';
import { DataSingleIndustryEvent } from '../IndustryEvent/Single/getSingleIndustryEvent';
import { MagazineArticle } from '../../graphql/getMagazineArticle';

declare const window: any;

export const mapArticleToGtag = (
  article: Article | DataSingleIndustryEvent | MagazineArticle,
) => {
  const date = article?.date ? new Date(article.date) : null;
  const markets =
    'markets' in article
      ? article.markets?.nodes?.map(({ name }) => name)
      : null;
  const sectors =
    'sectors' in article
      ? article.sectors?.nodes?.map(({ name }) => name)
      : null;
  const tags =
    'tags' in article ? article?.tags?.nodes?.map(({ name }) => name) : null;
  const authors =
    'bylineInformation' in article
      ? article.bylineInformation.authors.map(
          ({ firstName, lastName }) => `${firstName} ${lastName}`,
        )
      : null;

  window.pid = article?.slug?.slice(0, 35) || window.location.pathname;
  window.slug = article?.slug;

  window.category =
    'sectors' in article ? article?.sectors?.nodes?.[0]?.name : undefined;
  window.category =
    'magazineCategories' in article
      ? article?.magazineCategories?.nodes?.[0]?.name
      : window.category;

  window.tags = 'archive-paywall';
  window.slugLimited = 'adam-neumann-lashes-out-at-uber-and';
  window.trd = window.trd || {};
  window.trd.post = {
    id: article?.databaseId,
    title: article?.title,
    slug: article?.slug,
    link: article?.uri,
    publish_date: article?.date,
    publish_gmt_date: date && date.toUTCString(),
    publish_iso_date: date && date.toISOString(),
    publish_timestamp: date && date.getTime(),
    publish_gmt_timestamp: date && date.getTime(),
    type: 'post',
    section: markets,
    section_string: markets?.join(',') ?? null,
    categories: sectors,
    categories_string: sectors?.join(',') ?? null,
    tags_slug: tags,
    tags_slug_string: tags?.join(',') ?? null,
    tags,
    tags_string: tags?.join(',') ?? null,
    author: authors?.[0] ?? null,
    authors,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    trd: {
      ad_enabled: window.trd.ad_enabled,
      ad_blocker: window.trd.ad_blocker,
      ticker_enable: window.trd.ticker_enable,
      post: window.trd.post,
      taboola_disable: window.trd.taboola_disable,
      user_type: window.trd.user_type,
      piano_loggedin: window.trd.piano_loggedin,
    },
  });
};
