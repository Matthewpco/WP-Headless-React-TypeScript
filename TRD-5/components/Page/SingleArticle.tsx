import React, { useEffect, useRef } from 'react';
import { Article } from '../../graphql';
import { showPaywall } from '../templates/ArticleWrapper';
import { SeoHeadTags } from '../SeoHeadTags';
import { AdUnitFooter } from '../Ad/units/AdUnitFooter';
import { ArticleProps } from './ArticlePage';
import { IUseArticlesParams } from './useArticle.hook';

export interface ISingleArticle
  extends Pick<
      ArticleProps,
      'sponsors' | 'trendingArticle' | 'topStories' | 'recommendedStories'
    >,
    Pick<IUseArticlesParams, 'isFreeAccess'> {
  articleData: Article;
  index: number;
  loadMoreCallback: (el: HTMLDivElement) => void;
  template: any;
  isPaidUser: boolean;
}

export const SingleArticle = ({
  articleData,
  sponsors,
  index,
  loadMoreCallback,
  template: Template,
  trendingArticle,
  topStories,
  recommendedStories,
  isPaidUser,
  isFreeAccess,
}: ISingleArticle) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      loadMoreCallback(ref.current);
    }
  }, [ref.current]);

  useEffect(() => {
    if (
      articleData?.paywall?.type === 'subscriber_only' &&
      !isPaidUser &&
      !isFreeAccess
    ) {
      showPaywall();
    }
  }, [isPaidUser]);

  return (
    <div
      key={articleData?.databaseId ?? index}
      data-article-index={index}
      ref={ref}
    >
      {index === 0 && <SeoHeadTags seo={articleData.seo} />}
      <Template
        articleIndex={index}
        article={articleData}
        sponsors={sponsors}
        trendingArticle={trendingArticle}
        topStories={topStories}
        recommendedStories={recommendedStories}
      />
      <AdUnitFooter id={`div-id-for-footer-${index}`} lazyload={500} />
    </div>
  );
};
