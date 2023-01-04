import React, { FC } from 'react';
import cx from 'classnames';
import styles from './AuthorArticle.module.scss';
import { GenericPost } from '../../../graphql/fragmentAuthorPosts';
import { CategoryCityLabel } from '../../CategoryCityLabel';
import { Link } from '../../Link';
import { PublishedDate } from '../../PublishedDate';
import { ArticleScrollerBaseComponentProps } from '../../ArticleScroller/ArticleScroller';
import { WithAdBlock } from '../../ArticleScroller/WithAdBlock';
import { useHost } from '../../../generic/hooks';

const formatting: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export interface AuthorArticleProps
  extends ArticleScrollerBaseComponentProps<WithAdBlock<GenericPost>> {
  classNameRoot?: string;
  classNameContainer?: string;
  classNameImage?: string;
  classNameContent?: string;
  classNameTitle?: string;
  classNameCategoryCityLabel?: string;
  classNamePublishedDate?: string;
  classNameDescription?: string;
}

export const AuthorArticle: FC<AuthorArticleProps> = ({
  article,
  classNameRoot,
  classNameContainer,
  classNameImage,
  classNameContent,
  classNameTitle,
  classNameDescription,
  classNameCategoryCityLabel,
  classNamePublishedDate,
}) => {
  const {
    title,
    featuredImageUri,
    uri,
    markets,
    primarySector,
    date,
    alternativeHeadline: { subheadline },
  } = article as GenericPost;

  const marketTitle = markets?.nodes?.[0]?.name;
  const marketSlug = markets?.nodes?.[0]?.slug;
  const hostName = useHost();

  return (
    <Link href={uri} className={cx(styles.root, classNameRoot)}>
      <article className={cx(styles.container, classNameContainer)}>
        <img
          className={cx(styles.image, classNameImage)}
          src={featuredImageUri ? `${hostName}${featuredImageUri}` : undefined}
          alt={title}
          loading="lazy"
        />
        <div className={cx(styles.content, classNameContent)}>
          <div className={styles.heading}>
            {marketTitle && (
              <CategoryCityLabel
                className={cx(
                  styles.categoryCityLabel,
                  classNameCategoryCityLabel,
                )}
                slug={marketSlug}
                category={primarySector?.name}
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
