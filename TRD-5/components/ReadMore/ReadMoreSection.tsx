// TO DO delete this component after release
import React, { FC } from 'react';
import cx from 'classnames';
import styles from './ReadMoreSection.module.scss';
import { ReadMoreArticle } from './ReadMoreArticle';
import { List } from '../List';
import { ReadMoreItem } from '../../graphql';

export interface ReadMoreSectionProps {
  items: ReadMoreItem[];
  className?: string;
}

const renderItem = (item: ReadMoreItem) => (
  <ReadMoreArticle key={item.title} {...item} />
);

export const ReadMoreSection: FC<ReadMoreSectionProps> = ({
  items,
  className,
}) => (
  <section className={cx(styles.root, className, 'NoStyles')}>
    <h4 className={styles.title}>READ MORE</h4>
    <div className={styles.list}>
      <List items={items} render={renderItem} />
    </div>
  </section>
);
