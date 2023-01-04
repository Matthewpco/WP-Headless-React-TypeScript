import React, { FC } from 'react';
import {
  AuthorArticle,
  AuthorArticleProps,
} from '../../AuthorPage/AuthorArticle';
import styles from './TagHeadingPost.module.scss';

export interface TagHeadingPostProps
  extends Pick<AuthorArticleProps, 'article'> {}

export const TagHeadingPost: FC<TagHeadingPostProps> = (props) => (
  <AuthorArticle
    {...props}
    classNameRoot={styles.root}
    classNameContainer={styles.container}
    classNameImage={styles.image}
    classNameContent={styles.content}
    classNameTitle={styles.title}
  />
);
