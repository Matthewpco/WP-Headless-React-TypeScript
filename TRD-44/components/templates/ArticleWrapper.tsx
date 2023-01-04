import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
} from 'react';
import cx from 'classnames';
import { ArticleProps } from '../Page/ArticlePage';
import { configTemplate } from './configTemplate';
import { RightRail } from './RightRail/RightRail';
import styles from './ArticleWrapper.module.scss';
import { IdTemplate } from './IdTemplate';
import { isClientSide } from '../../generic/utils';

declare const window: any;

export const showPaywall = () => {
  if (!isClientSide()) {
    return;
  }

  window.tp = window.tp || [];
  window.tp.template?.show({
    templateId: 'OTBW85G29R08',
    displayMode: 'inline',
    containerSelector: '#article-paywall-container',
  });
};

export interface ArticleWrapperProps
  extends Pick<
    ArticleProps,
    'article' | 'trendingArticle' | 'topStories' | 'recommendedStories'
  > {
  articleIndex: number;
}

export const ArticleWrapper = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ArticleWrapperProps>
>(
  (
    {
      article,
      article: {
        template: { templateValue } = { templateValue: IdTemplate.RightRail },
      } = {},
      trendingArticle,
      topStories,
      recommendedStories,
      articleIndex,
    },
    ref,
  ) => {
    const Template = useMemo(
      () => configTemplate.get(templateValue) ?? RightRail,
      [templateValue],
    );

    useEffect(() => {
      window.tp = window.tp || [];
      window.tp.push([
        'init',
        () => {
          window.tp.experience.execute();
        },
      ]);
    }, []);

    return (
      <>
        <div className={cx(styles.desktopAndTabletView)}>
          <Template
            ref={ref}
            article={article}
            trendingArticle={trendingArticle}
            topStories={topStories}
            recommendedStories={recommendedStories}
            articleIndex={articleIndex}
          />
        </div>
        <div className={cx(styles.mobileView)}>
          <RightRail
            ref={ref}
            article={article}
            trendingArticle={trendingArticle}
            topStories={topStories}
            recommendedStories={recommendedStories}
            articleIndex={articleIndex + 1000}
          />
        </div>
      </>
    );
  },
);
