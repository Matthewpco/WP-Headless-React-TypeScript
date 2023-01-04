import React, { FC } from 'react';
import styles from './TagPost.module.scss';
import { AuthorArticle, AuthorArticleProps } from '../AuthorPage/AuthorArticle';

export const TagPost: FC<AuthorArticleProps> = (props) => (
  <AuthorArticle
    {...props}
    classNameCategoryCityLabel={styles.categoryCityLabel}
    classNameDescription={styles.description}
  />
);
