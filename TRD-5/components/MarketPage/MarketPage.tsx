import React, { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { Container } from '../Container';
import { HeaderDropdownMenuItem, SeoFullHead } from '../../graphql';
import { RequestGetMarketPosts, ResponseGetMarketPosts } from '../../graphql/getMarketPost';
import { MarketHeroPosts } from './MarketHeroPosts/MarketHeroPosts';
import styles from './MarketPage.module.scss';
import { GenericPost } from '../../graphql/fragmentMarketPosts';
import type { HeroSectionPost } from '../../graphql/getMarketHeroSectionPosts';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { WithAdBlock } from '../ArticleScroller/WithAdBlock';
import { MarketHeading } from './MarketHeading/MarketHeading';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { useAds } from '../Ads/useAds';
import { initAdsMarketPage } from '../Ads/initAdsMarketPage';
import { AdUnit } from '../Ad/units/AdUnit';
import { adSizes } from '../Ad/config/adSizes';
import { useContextAds } from '../Ad/ContextAds';

import { SeoHeadTags } from '../SeoHeadTags';
import { AdUnitFooter } from '../Ad/units/AdUnitFooter';
import { MarketArticle } from './MarketArticle/MarketArticle';

export interface MarketPageProps {
  marketHeroPosts?: HeroSectionPost[];
  market?: GenericPost[];
  marketMenu?: HeaderDropdownMenuItem[];
  seo?: SeoFullHead;
}

export const MarketPage: FC<MarketPageProps> = ({
  marketHeroPosts,
  marketMenu,
  market,
  seo,
}) => {
  const { query } = useRouter();
  const [fetchMarketPosts] = useGraphqlLazyQuery<
    ResponseGetMarketPosts,
    RequestGetMarketPosts
  >(IdGraphqlQuery.getMarketPosts);

  useAds(initAdsMarketPage);

  const [page, setPage] = useState(
    query.pageNumber ? parseInt(query.pageNumber as string, 10) : 1,
  );

  const getNewPosts = () => {
    const newArr: WithAdBlock<GenericPost>[] = market?.slice() ?? [];
    newArr.splice(5, 0, { type: 'ad', id: 6 });
    return newArr;
  };

  const [posts, setPosts] = useState<WithAdBlock<GenericPost>[]>(getNewPosts());

  useEffect(() => {
    setPosts(getNewPosts());
  }, [market]);

  const loadMoreRows = useCallback(async () => {
    const response = await fetchMarketPosts({
      paged: page + 1,
      market: query.firstLevel as string,
    });

    const newPosts: WithAdBlock<GenericPost>[] =
      response.data?.posts?.nodes?.slice() ?? [];
    if (newPosts.length) {
      newPosts.splice(5, 0, { type: 'ad', id: posts.length + 5 });
      newPosts.splice(0, 0, { type: 'ad', id: posts.length });
    }

    setPage(page + 1);
    setPosts([...posts, ...newPosts]);
    return Promise.resolve();
  }, [page, posts]);

  const { device } = useContextAds();

  if (!market?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>
      {seo && <SeoHeadTags seo={seo} />}

      {marketMenu && (
        <MarketHeading
          menuItems={marketMenu}
          className={styles.authorHeading}
        />
      )}

      {marketHeroPosts && <MarketHeroPosts posts={marketHeroPosts} />}

      <div className={styles.container}>
        <div className={styles.center}>
          <ArticleScroller
            posts={posts}
            loadMoreRows={loadMoreRows}
            component={MarketArticle as any}
          />
        </div>

        <aside className={cx(styles.right)}>
          <AdUnit id="div-id-for-right-1" size={adSizes.right[device]} />

          <AdUnit id="div-id-for-right-2" size={adSizes.right[device]} />
        </aside>
      </div>

      <AdUnitFooter />
    </Container>
  );
};
