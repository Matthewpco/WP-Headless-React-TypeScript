// TO DO delete this component after release
import React, { FC } from 'react';
import cx from 'classnames';
import styles from './ReadMoreArticle.module.scss';
import { CategoryCityLabel } from '../CategoryCityLabel';
import { ArticleTile } from '../ArticleTile';
import { ReadMoreItem } from '../../graphql';

export interface ReadMoreArticleProps extends ReadMoreItem {
  className?: string;
}

export const ReadMoreArticle: FC<ReadMoreArticleProps> = ({
  link,
  title,
  img: [{ src, alt }],
  markets: [{ name: marketName, slug: marketSlug }],
  category: [{ name: categoryName }],
  className,
}) => (
  <article className={cx(styles.root, className)}>
    <CategoryCityLabel
      slug={marketSlug}
      category={categoryName}
      city={marketName}
    />
    <ArticleTile
      href={link}
      imgSrc={src}
      imgAlt={alt}
      title={title}
      classNameRoot={styles.tileRoot}
      classNameImage={styles.tileImage}
      classNameTitle={styles.tileTitle}
    />
  </article>
);
