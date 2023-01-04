import React, { FC } from 'react';
import cx from 'classnames';
import { List } from '../List';
import styles from './Tags.module.scss';
import { Tag } from './Tag';
import { ArticleTag } from '../../graphql';

export interface TagsProps {
  tags: ArticleTag[];
  className?: string;
}

const renderTag = (tag: ArticleTag) => <Tag {...tag} key={tag.id} />;

export const Tags: FC<TagsProps> = ({ tags, className }) => (
  <section className={cx(styles.root, className)}>
    <h5 className={styles.title}>Tags</h5>
    <div className={styles.list}>
      <List items={tags} render={renderTag} />
    </div>
  </section>
);
