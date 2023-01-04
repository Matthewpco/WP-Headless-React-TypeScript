import React, { FC } from 'react';
import parse from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import { Closing } from '../Closing';
import { MagazineArticleCards } from '../MagazineArticleCards';
import { ArticleScrollerBaseComponentProps } from '../ArticleScroller/ArticleScroller';
import {
  ArticlesData,
  Authors,
  Category,
  Markets,
} from '../../graphql/getMagazineForHomepage';
import { CoverStory } from '../CoverStory';
import { GetMagazineArticle } from '../../graphql/getMagazine';
import { useHost } from '../../generic/hooks';

export interface FormattedArticle {
  title: string;
  slug: string;
  img: string;
  alt: string;
  link: string;
  category: Category[];
  excerpt: ReturnType<typeof domToReact>;
  authors: Authors[];
  market: Markets[];
}

const mapper = (
  article: ArticlesData | GetMagazineArticle,
  hostName: string,
): FormattedArticle => {
  if ('category' in article) {
    return {
      title: article?.title,
      slug: article?.category?.[0]?.slug,
      img: article?.img?.[0]?.src,
      alt: article?.img?.[0]?.alt,
      link: article?.link,
      category: article?.category,
      market: article?.markets?.nodes,
      excerpt: parse(article?.excerpt ?? ''),
      authors: article?.authors,
    };
  }

  return {
    title: article?.title,
    slug: article?.magazineCategories?.nodes?.[0]?.slug,
    img: `${hostName}${article.featuredImageUri}`,
    alt: article.title,
    link: article?.uri,
    category: article?.magazineCategories?.nodes,
    excerpt: parse(article?.excerpt ?? ''),
    authors: article?.bylineInformation?.authors,
    market: [],
  };
};

export interface MagazineDisplayProps
  extends ArticleScrollerBaseComponentProps<ArticlesData> {}

export const MagazineDisplay: FC<MagazineDisplayProps> = ({
  article,
}: ArticleScrollerBaseComponentProps<ArticlesData | GetMagazineArticle>) => {
  const hostName = useHost();
  const formattedArticle = mapper(article, hostName);

  if (formattedArticle.slug === 'cover-story') {
    return <CoverStory article={formattedArticle} />;
  }

  if (formattedArticle.slug === 'closing') {
    return <Closing article={formattedArticle} />;
  }

  // formattedArticle.slug === 'issue'
  return <MagazineArticleCards article={formattedArticle} />;
};
