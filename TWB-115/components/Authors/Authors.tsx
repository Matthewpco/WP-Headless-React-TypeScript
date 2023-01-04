import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Authors.module.scss';
import { ArticleAuthor } from '../../graphql';
import { AuthorNames } from './AuthorNames';

export interface AuthorsProps {
  authors: ArticleAuthor[];
  researchers: ArticleAuthor[];
  className?: string;
}

const prefixAuthors = 'By';
const prefixResearchers = 'Research by';

export const Authors: FC<AuthorsProps> = ({
  authors,
  researchers,
  className,
}) => (
  <section className={cx(styles.root, className)}>
    {authors && authors.length > 0 && (
      <AuthorNames
        className={styles.label}
        authors={authors}
        prefix={prefixAuthors}
      />
    )}
    {researchers && researchers.length > 0 && (
      <AuthorNames
        className={styles.label}
        authors={researchers}
        prefix={prefixResearchers}
      />
    )}
  </section>
);
