import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Closing.module.scss';
import { Button } from '../Button';
import { AuthorNames } from '../Authors/AuthorNames';
import { ArticleScrollerBaseComponentProps } from '../ArticleScroller/ArticleScroller';
import { FormattedArticle } from '../MagazineDisplay/MagazineDisplay';
import { Link } from '../Link';

export interface ClosingProps
  extends ArticleScrollerBaseComponentProps<FormattedArticle> {
  className?: string;
  classNameCoverHeaderSize?: string;
}

export const Closing: FC<ClosingProps> = ({
  className,
  classNameCoverHeaderSize,
  article,
}) => (
  <Link href={article.link} passHref>
    <section className={cx(styles.card, className)}>
      <img
        src={article.img}
        alt={article.alt}
        className={styles.cardImage}
        loading="lazy"
      />

      <div className={styles.cardInfo}>
        <p
          className={cx(styles.cardHeader, classNameCoverHeaderSize, {
            [styles.cardHeaderSize]: !classNameCoverHeaderSize,
          })}
        >
          {article.category?.[0]?.name}
        </p>
        <p className={styles.cardTitle}>{article.title}</p>
        {article.authors && (
          <AuthorNames
            authors={article?.authors}
            prefix="by"
            className={styles.cardAuthorField}
          />
        )}
        <p className={styles.cardSubtitle}>{article.excerpt}</p>
        <Button
          className={styles.cardButton}
          type="button"
          color="primary"
          size="medium"
          rounded
        >
          Full Story
        </Button>
      </div>
    </section>
  </Link>
);
