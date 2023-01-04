import React, { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './MagazinesPage.module.scss';
import { Container } from '../Container';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { WithAdBlock } from '../ArticleScroller/WithAdBlock';
import {
  ArticlesData,
  MagazinesData,
  RequestGetMagazines,
  ResponseGetMagazines,
} from '../../graphql/getMagazineForHomepage';
import { MagazineDisplay } from '../MagazineDisplay';
import { ArticleHead } from '../ArticleHead';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';
import { AdUnitFooter } from '../Ad/units/AdUnitFooter';
import {
  RequestGetMagazineArticles,
  ResponseGetMagazineArticles,
} from '../../graphql/getMagazineArticles';

export interface MagazinesPageProps {
  magazinesData: MagazinesData;
  isLatest?: boolean;
}

export const MagazinesPage: FC<MagazinesPageProps> = ({
  magazinesData,
  isLatest = false,
}) => {
  const { query } = useRouter();

  const [fetchMagazinesPosts] = useGraphqlLazyQuery<
    ResponseGetMagazineArticles | ResponseGetMagazines,
    RequestGetMagazineArticles | RequestGetMagazines
  >(
    isLatest
      ? IdGraphqlQuery.getMagazineForHomepage
      : IdGraphqlQuery.getMagazineArticles,
  );

  const [page, setPage] = useState(extractPageFromQuery(query.pageNumber));
  const [posts, setPosts] = useState<WithAdBlock<ArticlesData>[]>(
    (() => {
      const newArr: WithAdBlock<ArticlesData>[] =
        magazinesData?.articles?.slice() ?? [];
      newArr.splice(5, 0, { type: 'ad', id: 5 });
      return newArr;
    })(),
  );

  useEffect(() => {
    const newArr: WithAdBlock<ArticlesData>[] =
      magazinesData?.articles?.slice() ?? [];
    newArr.splice(5, 0, { type: 'ad', id: 5 });
    setPosts(newArr);
    setPage(1);
  }, [magazinesData]);

  const loadMoreRows = useCallback(async () => {
    const response = await fetchMagazinesPosts({
      name: `/magazine/${magazinesData?.slug}`,
      page: page + 1,
    });

    const data = response.data ?? {};

    const newPosts: WithAdBlock<ArticlesData>[] = (('magazine' in data
      ? (data.magazine as MagazinesData)?.articles?.slice()
      : (
          data as Record<'magazineForHomepage', MagazinesData>
        )?.magazineForHomepage?.articles?.slice()) ?? []) as any;

    if (newPosts.length) {
      newPosts.splice(5, 0, { type: 'ad', id: posts.length + 5 });
      newPosts.splice(0, 0, { type: 'ad', id: posts.length });
    }

    setPage(page + 1);
    setPosts([...posts, ...newPosts]);

    return Promise.resolve();
  }, [page, posts]);

  return (
    <Container className={styles.root}>
      {magazinesData?.seo && <ArticleHead seo={magazinesData.seo} />}

      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          National Issue
          <span>{magazinesData?.title}</span>
        </h1>
        <a
          className={styles.headerLink}
          href={magazinesData?.issueArchivesLink?.url}
          target={magazinesData?.issueArchivesLink?.target}
        >
          {magazinesData?.issueArchivesLink?.title}
        </a>
      </div>

      <div className={styles.content}>
        <ArticleScroller
          posts={posts}
          loadMoreRows={loadMoreRows}
          component={MagazineDisplay}
          fullWidth
        />
      </div>

      <AdUnitFooter />
    </Container>
  );
};
