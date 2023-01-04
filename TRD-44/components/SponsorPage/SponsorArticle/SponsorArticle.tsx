import React, { FC } from 'react';
import cx from 'classnames';
import styles from './SponsorArticle.module.scss';
import { SponsorPost } from '../../../graphql/fragmentSponsorPosts';
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

export interface SponsorArticleProps
  extends ArticleScrollerBaseComponentProps<WithAdBlock<SponsorPost>> {
  classNameRoot?: string;
  classNameContainer?: string;
  classNameImage?: string;
  classNameContent?: string;
  classNameTitle?: string;
  classNameCategoryCityLabel?: string;
  classNamePublishedDate?: string;
  classNameDescription?: string;
}

export const SponsorArticle: FC<SponsorArticleProps> = ({
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
  const hostName = useHost();

  const {
    title,
    featuredImageUri,
    uri,
    markets,
    date,
    excerpt,
    archiveDate,
    isArchive,
  } = article as SponsorPost;

  const marketTitle = markets?.nodes?.[0]?.name;
  const marketSlug = markets?.nodes?.[0]?.slug;

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
                city={marketTitle}
              />
            )}
            <PublishedDate
              className={cx(styles.publishedDate, classNamePublishedDate)}
              date={new Date(archiveDate ?? date)}
              formatting={formatting}
              isArchive={isArchive}
            />
          </div>
          <h2 className={cx(styles.title, classNameTitle)}>{title}</h2>
          {excerpt && (
            <p className={cx(styles.description, classNameDescription)}>
              {excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};
