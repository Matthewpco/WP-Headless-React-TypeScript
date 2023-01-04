import React, { FC } from 'react';
import { AuthorArticle, AuthorArticleProps } from './AuthorArticle';
import styles from './AuthorPost.module.scss';

export const AuthorPost: FC<AuthorArticleProps> = (props) => (
  <AuthorArticle
    {...props}
    classNamePublishedDate={styles.publishedDate}
    classNameDescription={styles.description}
  />
);
