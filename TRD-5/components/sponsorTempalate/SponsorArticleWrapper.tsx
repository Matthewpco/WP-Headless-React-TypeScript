import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ArticleProps } from '../Page/ArticlePage';
import { configSponsorTemplate } from './configSponsorTemplate';
import { SponsoredRightRail } from './SponsoredRightRail/SponsoredRightRail';
import { ArticleWrapperProps, IdTemplate } from '../templates';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { RequestGetSponsor, ResponseGetSponsor, Sponsor } from '../../graphql';

export interface SponsorArticleWrapperProps
  extends Pick<
      ArticleProps,
      'sponsors' | 'trendingArticle' | 'topStories' | 'recommendedStories'
    >,
    Pick<ArticleWrapperProps, 'articleIndex'> {
  article: ArticleProps['article'] & {
    archiveDate: string;
    isArchive: boolean;
  };
}

export const SponsorArticleWrapper = forwardRef<
  HTMLDivElement,
  PropsWithChildren<SponsorArticleWrapperProps>
>(
  (
    {
      article,
      sponsors,
      trendingArticle,
      topStories,
      recommendedStories,
      articleIndex,
    },
    ref,
  ) => {
    const templateValue =
      article?.template?.templateValue ?? IdTemplate.RightRail;

    const [sponsorState, setSponsorState] = useState<Sponsor[]>();
    const Template = useMemo(
      () => configSponsorTemplate.get(templateValue) ?? SponsoredRightRail,
      [templateValue],
    );
    const isFirstArticle = articleIndex === 0;

    const [fetch] = useGraphqlLazyQuery<ResponseGetSponsor, RequestGetSponsor>(
      IdGraphqlQuery.getSponsor,
    );

    useEffect(() => {
      if (!isFirstArticle) {
        fetch({
          uri: article?.uri,
        }).then(({ data }) => {
          const nodes = data?.sponsor?.advertisers?.nodes ?? [];
          return setSponsorState(nodes);
        });
      }
    }, [isFirstArticle]);

    const currentSponsors: Sponsor[] | undefined = isFirstArticle
      ? sponsors
      : sponsorState;

    return (
      <Template
        ref={ref}
        articleIndex={articleIndex}
        article={article}
        sponsors={currentSponsors}
        trendingArticle={trendingArticle}
        topStories={topStories}
        recommendedStories={recommendedStories}
      />
    );
  },
);
