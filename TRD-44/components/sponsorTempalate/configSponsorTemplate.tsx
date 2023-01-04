import { FC } from 'react';
import { SponsoredRightRail } from './SponsoredRightRail/SponsoredRightRail';
import { SponsorFullWidth } from './SponsorFullWidth/SponsorFullWidth';
import { ArticleProps } from '../Page/ArticlePage';
import { ArticleWrapperProps, IdTemplate } from '../templates';
import { Article } from '../../graphql';

export interface TemplateSponsorProps
  extends Pick<
      ArticleProps,
      'sponsors' | 'trendingArticle' | 'topStories' | 'recommendedStories'
    >,
    Pick<ArticleWrapperProps, 'articleIndex'> {
  article: Pick<
    Article,
    | 'title'
    | 'alternativeHeadline'
    | 'databaseId'
    | 'uri'
    | 'link'
    | 'date'
    | 'featuredImageUri'
    | 'featuredImageCaption'
    | 'contentFiltered'
    | 'primarySector'
    | 'bylineInformation'
    | 'template'
    | 'seo'
    | 'paywall'
    | 'markets'
  > & {
    archiveDate: string;
    isArchive: boolean;
  };
}

export const configSponsorTemplate = new Map<
  IdTemplate,
  FC<TemplateSponsorProps>
>([
  [IdTemplate.RightRail, SponsoredRightRail],
  [IdTemplate.SponsorFullWidth, SponsorFullWidth],
]);
