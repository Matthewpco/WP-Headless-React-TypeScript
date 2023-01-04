import React, { FC } from 'react';
import cx from 'classnames';
import styles from './TagHeading.module.scss';
import { GenericPost } from '../../../graphql/fragmentAuthorPosts';
import { List } from '../../List';
import { TagHeadingPost } from '../TagHeadingPost/TagHeadingPost';
import { DropdownMarket } from '../../AuthorPage/AuthorHeading/DropdownMarket';
import { Markets } from '../../../graphql/getTag';
import { DropdownItem } from '../../Dropdown/Dropdown';

export interface ITagHeading {
  className?: string;
  markets: Markets[];
  title: string;
  mostViewed: GenericPost[];
  market: string | undefined;
  setMarket: (value: string | undefined) => void;
}

export const TagHeading: FC<ITagHeading> = ({
  className,
  title,
  markets,
  mostViewed,
  market,
  setMarket,
}) => {
  const dropdownItems: DropdownItem[] =
    markets?.map(({ label, value }) => ({
      // omitting uri to avoid hyperlinks
      label,
      value,
    })) ?? [];

  dropdownItems.unshift({
    label: 'All Markets',
    value: '',
  });

  const activeMarket = dropdownItems.find(({ value }) => value === market);

  const renderMostViewed = (post: GenericPost) => (
    <TagHeadingPost key={post.id} article={post} />
  );

  const swapMostViewedPosition = () => {
    const swappedMostViewed = [...mostViewed];
    if (swappedMostViewed.length >= 2) {
      [swappedMostViewed[0], swappedMostViewed[1]] = [
        swappedMostViewed[1],
        swappedMostViewed[0],
      ];
    }
    return swappedMostViewed;
  };

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.headerLine}>
        <h1 className={styles.title}>{title}</h1>

        <DropdownMarket
          initialValue={activeMarket}
          items={dropdownItems}
          className={styles.markets}
          onChange={({ value }) => setMarket(value)}
        />
      </div>

      <div className={styles.articles}>
        <List items={swapMostViewedPosition()} render={renderMostViewed} />
      </div>
    </div>
  );
};
