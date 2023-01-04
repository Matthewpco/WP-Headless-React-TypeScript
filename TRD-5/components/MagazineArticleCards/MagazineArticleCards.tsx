import React, { FC } from 'react';
import styles from './MagazineArticleCards.module.scss';
import { CategoryCityLabel } from '../CategoryCityLabel';
import { ArticleScrollerBaseComponentProps } from '../ArticleScroller/ArticleScroller';
import { FormattedArticle } from '../MagazineDisplay/MagazineDisplay';
import { Link } from '../Link';

export interface MagazineArticleCardsProps
  extends ArticleScrollerBaseComponentProps<FormattedArticle> {}

export const MagazineArticleCards: FC<MagazineArticleCardsProps> = ({
  article,
}) => (
  <Link href={article.link ?? ''} passHref>
    <article className={styles.article}>
      <img
        src={article.img}
        alt={article?.alt}
        className={styles.articleImage}
        loading="lazy"
      />
      <div className={styles.articleInfo}>
        <CategoryCityLabel
          className={styles.articleMarkets}
          slug={article?.market?.[0]?.slug}
          category={undefined}
          city={article?.market?.[0]?.name}
        />
        <div className={styles.articleTitle}>{article.title}</div>
        <div className={styles.articleText}>{article.excerpt}</div>
      </div>
    </article>
  </Link>
);
