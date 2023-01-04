import { FC } from 'react';
import { IdTemplate } from './IdTemplate';
import { RightRail } from './RightRail/RightRail';
import { FullWidthA } from './FullWidthA/FullWidthA';
import { FullWidthC } from './FullWidthC/FullWidthC';
import { FullWidthB } from './FullWidthB/FullWidthB';
import { ArticleProps } from '../Page/ArticlePage';
import { ArticleWrapperProps } from './ArticleWrapper';

export interface TemplateProps
  extends Pick<
      ArticleProps,
      | 'article'
      | 'trendingArticle'
      | 'topStories'
      | 'recommendedStories'
    >,
    Pick<ArticleWrapperProps, 'articleIndex'> {}

export const configTemplate = new Map<IdTemplate, FC<TemplateProps>>([
  [IdTemplate.RightRail, RightRail],
  [IdTemplate.FullWidthA, FullWidthA],
  [IdTemplate.FullWidthB, FullWidthB],
  [IdTemplate.FullWidthC, FullWidthC],
]);
