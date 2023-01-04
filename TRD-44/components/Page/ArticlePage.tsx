import React, { FC, useCallback, useEffect, useState } from 'react';
import Error from 'next/error';
import cx from 'classnames';
import { Article, ItopStories, Sponsor, TrendingArticle } from '../../graphql';
import { ProviderFontSize } from '../FontSize';
import { List } from '../List';
import { ProviderTree } from '../../generic/provider-tree/ProviderTree';
import { ProviderWithProps } from '../../generic/provider-tree/ProviderTreeProps';
import { BasePageProps } from '../../generic/getBasePageProps';
import { ArticleWrapper, ArticleWrapperProps } from '../templates';
import { PianoRepository } from '../../piano/pianoRepository';
import { IUseArticlesParams, useArticles } from './useArticle.hook';
import { inViewPort } from '../Ad/utils/inViewPort';
import styles from '../templates/ArticleWrapper.module.scss';
import { showPaywall } from '../templates/ArticleWrapper';
import { AdUnitHeader } from '../Ad/units/AdUnitHeader';
import { mapArticleToGtag } from '../Ads/mapArticleToGtag';
import { SponsorArticleWrapperProps } from '../sponsorTempalate';
import { SingleArticle } from './SingleArticle';
import { IDataMeterActive } from './IDataMeterActive';
import { IDataShowTemplate } from './IDataShowTemplate';

declare const window: any;

const providers: ProviderWithProps<unknown>[] = [
  {
    provider: ProviderFontSize,
  },
];

export interface ArticleProps extends BasePageProps {
  article: Article;
  sponsors?: Sponsor[];
  trendingArticle: TrendingArticle[];
  topStories: ItopStories[];
  recommendedStories: ItopStories[];
  template?: FC<ArticleWrapperProps | SponsorArticleWrapperProps>;
}

export interface ArticlePageProps
  extends ArticleProps,
    Pick<IUseArticlesParams, 'nextArticleQuery' | 'extractPostFromResponse'>,
    Partial<Pick<IUseArticlesParams, 'isFreeAccess'>> {
  showHeaderAd?: boolean;
}

export const ArticlePage: FC<ArticlePageProps> = ({
  article,
  sponsors,
  trendingArticle,
  topStories,
  recommendedStories,
  nextArticleQuery,
  extractPostFromResponse,
  isFreeAccess = false,
  showHeaderAd = false,
  template: Template = ArticleWrapper,
}) => {
  const [showFixedMeter, setShowFixedMeter] = useState(false);

  const { actions, articles, isPaidUser } = useArticles({
    isFreeAccess,
    article,
    extractPostFromResponse,
    nextArticleQuery,
  });

  const onScrollEnd = useCallback(() => {
    setShowFixedMeter(true);
    document.body.classList.add('blocked-4');
  }, []);

  useEffect(() => {
    if (article) {
      mapArticleToGtag(article);
    }
  }, [article]);

  useEffect(() => () => actions.resetArticles(), []);

  useEffect(() => {
    const onScroll = () => {
      if (
        inViewPort(
          '[data-article-index]:not([id]):last-of-type .the-content p:nth-of-type(3)',
          0,
        )
      ) {
        onScrollEnd();
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.tp = window.tp || [];

    window.tp.push([
      'addHandler',
      'meterActive',
      (meterData: IDataMeterActive) => {
        if (
          meterData.viewsLeft === 0 &&
          !meterData.incremented &&
          !isFreeAccess
        ) {
          showPaywall();
        }
      },
    ]);

    window.tp.push([
      'addHandler',
      'showTemplate',
      (meterData: IDataShowTemplate) => {
        if (meterData.containerSelector === '#article-paywall-container') {
          window.addEventListener('scroll', onScroll);
        }
      },
    ]);

    return () => window.removeEventListener('scroll', onScroll);
  }, [onScrollEnd]);

  useEffect(() => () => document.body.classList.remove('blocked-4'), []);

  useEffect(() => {
    const pianoUser = JSON.parse(localStorage?.pianoUser ?? '{}');

    if (pianoUser.uid) {
      PianoRepository.getSubscriptions(pianoUser.uid).then(({ active }) => {
        const subscriptionNames = active.map((item) => item.name);

        if (subscriptionNames.length === 0) {
          actions.setPayedUser(false);
        }
      });
    } else {
      actions.setPayedUser(false);
    }
  }, []);

  const renderArticle = useCallback(
    (articleData: Article, index: number) => (
      <SingleArticle
        key={articleData.databaseId}
        sponsors={sponsors}
        isFreeAccess={isFreeAccess}
        articleData={articleData}
        index={index}
        loadMoreCallback={actions.loadMoreCallback}
        template={Template}
        trendingArticle={trendingArticle}
        topStories={topStories}
        recommendedStories={recommendedStories}
        isPaidUser={isPaidUser}
      />
    ),
    [
      actions.loadMoreCallback,
      Template,
      articles,
      trendingArticle,
      topStories,
      recommendedStories,
    ],
  );

  if (!article) {
    return <Error statusCode={404} />;
  }

  return (
    <ProviderTree providers={providers}>
      <div>
        {showHeaderAd && <AdUnitHeader />}
        <List items={articles} render={renderArticle} />
      </div>
      <div id="article-meter-container" className={styles.meterWrapper} />
      <div
        id="article-paywall-container"
        className={cx(styles.paywallWrapper, {
          [styles.paywallWrapperFixed]: showFixedMeter,
        })}
      />
    </ProviderTree>
  );
};
