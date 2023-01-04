import React, { FC } from 'react';
import cx from 'classnames';
import styles from './MarketArticle.module.scss';
import { Link } from '../../Link';
import { PublishedDate } from '../../PublishedDate';
import { ArticleScrollerBaseComponentProps } from '../../ArticleScroller/ArticleScroller';
import { WithAdBlock } from '../../ArticleScroller/WithAdBlock';
import { useHost } from '../../../generic/hooks';
import { CategoryCityLabel } from '../../CategoryCityLabel';
import { HeroSection } from '../../../graphql/getMarketHeroSectionPosts';

const formatting: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export interface MarketArticleProps
  extends ArticleScrollerBaseComponentProps<WithAdBlock<HeroSection>> {
  classNameRoot?: string;
  classNameContainer?: string;
  classNameFigure?: string;
  classNameImage?: string;
  classNameContent?: string;
  classNameTitle?: string;
  classNameCategoryCityLabel?: string;
  classNamePublishedDate?: string;
  classNameDescription?: string;
  classNameHeading?: string;
  author?: string;
  featuredImageCaption?: string;
}

export const MarketArticle: FC<MarketArticleProps> = ({
  article,
  classNameRoot,
  classNameContainer,
  classNameFigure,
  classNameImage,
  classNameContent,
  classNameTitle,
  classNameDescription,
  classNamePublishedDate,
  classNameHeading,
  author,
  featuredImageCaption,
}) => {
  const {
    title,
    featuredImageUri,
    uri,
    sectors,
    markets,
    date,
    alternativeHeadline: { subheadline } = {},
  } = article as HeroSection;
  const hostName = useHost();

  return (
    <Link href={uri} className={cx(styles.root, classNameRoot)}>
      <article className={cx(styles.container, classNameContainer)}>
        <figure className={cx(styles.imageFigure, classNameFigure)}>
          <img
            className={cx(styles.image, classNameImage)}
            src={
              featuredImageUri ? `${hostName}${featuredImageUri}` : undefined
            }
            alt={title}
            loading="lazy"
          />
          {featuredImageCaption && (
            <figcaption className={cx(styles.imageCaption)}>
              {featuredImageCaption}
            </figcaption>
          )}
        </figure>
        <div className={cx(styles.content, classNameContent)}>
          <div className={cx(styles.heading, classNameHeading)}>
            {sectors?.nodes.length > 0 && (
              <CategoryCityLabel
                slug={markets?.nodes?.[0]?.slug}
                category={sectors?.nodes[0].name}
                city={
                  markets?.nodes?.find((item) => item?.slug === 'tristate')
                    ?.name
                }
              />
            )}
            <PublishedDate
              className={cx(styles.publishedDate, classNamePublishedDate)}
              date={new Date(date)}
              formatting={formatting}
            />
          </div>
          <h2 className={cx(styles.title, classNameTitle)}>{title}</h2>
          {author && <span className={styles.author}>{`by ${author}`}</span>}
          {subheadline && (
            <p className={cx(styles.description, classNameDescription)}>
              {subheadline}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};
