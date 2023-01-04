import React, {FC, useEffect, useMemo, useState} from 'react';
import cx from 'classnames';
import { Container } from '../../../Container';
import {
  RequestGetArticle,
  ResponseGetArticle,
} from '../../../../graphql/getSavedArticles';
import { SaveArticleCard } from './SaveArticleCard';
import styles from './SavedArticlesPage.module.scss';
import { useGraphqlQuery } from '../../../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../../../generic/graphql/IdGraphqlQuery';

export interface SavedArticlesPageProps {
  className?: string;
}

export const SavedArticlesPage: FC<SavedArticlesPageProps> = ({ className }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(localStorage.pianoId);
  }, []);

  const params = useMemo(
    () => ({
      userIdPiano: userId,
    }),
    [userId],
  );

  const { data, refetch } = useGraphqlQuery<
    ResponseGetArticle,
    RequestGetArticle
  >(IdGraphqlQuery.getSavedArticles, params);

  return (
    <Container className={cx(className, styles.root)}>
      {data?.articlesForPiano?.map((item) => (
        <SaveArticleCard
          refetch={refetch}
          key={item.id}
          title={item.title}
          featuredImageUri={item.featuredImageUri}
          date={new Date(item.date)}
          databaseId={item.databaseId}
          link={item.link}
        />
      ))}
    </Container>
  );
};
