import React, { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './MagazineIssueArchivesPage.module.scss';
import { Container } from '../Container';
import {
  NodesData,
  RequestGetMagazine,
  ResponseGetMagazine,
} from '../../graphql/getMagazineIssueArchivesCards';
import { WithAdBlock } from '../ArticleScroller/WithAdBlock';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { MagazinePreviewCardWrapper } from '../MagazinePreviewCardWrapper';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';
import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface MagazineIssueArchivesPageProps {
  cardsData: NodesData[];
}

const splitArrayIntoChunksOfLen = (arr: NodesData[], len: number) => {
  const chunks: NodesData[][] = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
};

export const MagazineIssueArchivesPage: FC<MagazineIssueArchivesPageProps> = ({
  cardsData,
}) => {
  const { query } = useRouter();

  const [fetchMagazineCards] = useGraphqlLazyQuery<
    ResponseGetMagazine,
    RequestGetMagazine
  >(IdGraphqlQuery.getMagazineIssueArchivesCards);

  const [page, setPage] = useState(extractPageFromQuery(query.pageNumber));
  const [cards, setCards] = useState<WithAdBlock<NodesData[]>[]>(
    (() => {
      const newArr: WithAdBlock<NodesData[]>[] =
        splitArrayIntoChunksOfLen(cardsData, 4) ?? [];
      newArr.splice(3, 0, { type: 'ad', id: 4 });
      return newArr;
    })(),
  );

  const loadMoreRows = useCallback(async () => {
    const response = await fetchMagazineCards({
      perPage: 16,
      paged: page + 1,
      parent: 0,
      first: 16,
    });

    const newPosts: WithAdBlock<NodesData[]>[] = splitArrayIntoChunksOfLen(
      response.data?.magazines?.nodes ?? [],
      4,
    );

    if (newPosts.length) {
      newPosts.splice(3, 0, { type: 'ad', id: cards.length + 3 });
      newPosts.splice(0, 0, { type: 'ad', id: cards.length });
    }

    setPage(page + 1);
    setCards((prevCards) => [...prevCards, ...newPosts]);

    return Promise.resolve();
  }, [page]);

  return (
    <Container className={styles.root}>
      <h1 className={styles.header}>Issue archives</h1>

      <ArticleScroller
        posts={cards}
        loadMoreRows={loadMoreRows}
        component={MagazinePreviewCardWrapper}
        fullWidth
      />

      <AdUnitFooter />
    </Container>
  );
};
