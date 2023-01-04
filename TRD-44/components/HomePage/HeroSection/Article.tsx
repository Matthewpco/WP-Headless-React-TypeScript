import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Article.module.scss';
import { TopStories } from '../../../graphql/getHomePage';
import { CategoryCityLabel } from '../../CategoryCityLabel';
import { Link } from '../../Link';
import { PublishedDate } from '../../PublishedDate';
import { useHost } from '../../../generic/hooks';

const formatting: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export interface ArticleProps {
  article: TopStories;
  classNameRoot?: string;
  classNameContainer?: string;
  classNameImage?: string;
  classNameContent?: string;
  classNameTitle?: string;
  classNameCategoryCityLabel?: string;
  classNamePublishedDate?: string;
  classNameDescription?: string;
  classNameHeading?: string;
  squareImg?: boolean;
}

export const Article: FC<ArticleProps> = ({
  article,
  classNameRoot,
  classNameContainer,
  classNameImage,
  classNameContent,
  classNameTitle,
  classNameDescription,
  classNameCategoryCityLabel,
  classNamePublishedDate,
  classNameHeading,
  squareImg,
}) => {
  const {
    title,
    featuredImageUri,
    squareFeaturedImageUri,
    uri,
    markets,
    primarySector,
    date,
    alternativeHeadline: { subheadline } = {},
  } = article;

  const marketTitle = markets?.nodes?.[0]?.name;
  const sectionTitle = primarySector?.name;
  const sectionSlug = primarySector?.slug;
  const hostName = useHost();
  const img = squareImg
    ? squareFeaturedImageUri || featuredImageUri
    : featuredImageUri;
  return (
    <Link href={uri} className={cx(styles.root, classNameRoot)}>
      <article className={cx(styles.container, classNameContainer)}>
        <img
          className={cx(styles.image, classNameImage)}
          src={img ? `${hostName}${img}` : undefined}
          alt={title}
          loading="lazy"
        />
        <div className={cx(styles.content, classNameContent)}>
          <div className={cx(styles.heading, classNameHeading)}>
            {marketTitle && (
              <CategoryCityLabel
                className={cx(
                  styles.categoryCityLabel,
                  classNameCategoryCityLabel,
                )}
                slug={sectionSlug}
                category={sectionTitle}
                city={marketTitle}
              />
            )}
            <PublishedDate
              className={cx(styles.publishedDate, classNamePublishedDate)}
              date={new Date(date)}
              formatting={formatting}
            />
          </div>
          <h2 className={cx(styles.title, classNameTitle)}>{title}</h2>
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
