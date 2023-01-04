import React, { forwardRef, PropsWithChildren } from 'react';
import cx from 'classnames';
import styles from './SponsorFullWidth.module.scss';
import stylesArticleBody from '../../ArticleBody/ArticleBody.module.scss';
import { TemplateSponsorProps } from '../configSponsorTemplate';
import { ArticleBody } from '../../ArticleBody';
import { CategoryCityLabel } from '../../CategoryCityLabel';
import { NewsletterSmall } from '../../Newsletter';
import { FeaturedBlock } from '../../FeaturedBlock';
import { Heading } from '../../Heading';
import { Subheading } from '../../Heading/Subheading';
import { ArticleUtils } from '../../ArticleUtils';
import { ClientSide } from '../../ClientSide';
import { SocialShare } from '../../SocialShare';
import { FontSizeSelector } from '../../FontSize';
import { Authors } from '../../Authors';
import { PublishedDate } from '../../PublishedDate';
import { SponsorsLogo } from '../../SponsorsLogoContainer';
import { useHost } from '../../../generic/hooks';

export const SponsorFullWidth = forwardRef<
  HTMLDivElement,
  PropsWithChildren<TemplateSponsorProps>
>(({ article, sponsors }, ref) => {
  const marketTitle = article?.markets?.nodes?.[0]?.name;
  const marketSlug = article?.markets?.nodes?.[0]?.slug;
  const hostName = useHost();
  const sharedUrl = `${hostName}${article.uri}`;
  return (
    <main ref={ref} className={styles.root}>
      {sponsors && (
        <SponsorsLogo
          className={cx(styles.full, styles.sponsorsLogo)}
          sponsorArr={sponsors}
        />
      )}
      <CategoryCityLabel
        slug={marketSlug}
        city={marketTitle}
        className={cx(styles.full, styles.categoryCityLabelMobile)}
      />
      <div className={cx(styles.full, styles.afterTrend)}>
        <ArticleUtils
          sharedUrl={sharedUrl}
          sharedTitle={article.title}
          className={styles.articleUtils}
        />
      </div>

      <FeaturedBlock
        src={article.featuredImageUri}
        alt={article.featuredImageCaption}
        subtitle={article.featuredImageCaption}
        className={cx(styles.full, styles.featuredBlock)}
      />

      <div className={cx(styles.center, styles.actionButtons)}>
        <ClientSide>
          <SocialShare
            showTitle={false}
            sharedUrl={sharedUrl}
            sharedTitle={article.title}
            className={styles.socialShare}
          />
        </ClientSide>

        <div className={styles.verticalBorder} />

        <FontSizeSelector
          showTitle={false}
          className={styles.fontSizeSelector}
        />
      </div>

      {article.bylineInformation && (
        <Authors
          authors={article.bylineInformation.authors}
          researchers={article.bylineInformation.researchers}
          className={cx(styles.center, styles.authors)}
        />
      )}

      <PublishedDate
        date={new Date(article.archiveDate ?? article.date)}
        className={cx(styles.center, styles.publishedDate)}
      />

      <div className={styles.headings}>
        <CategoryCityLabel
          slug={marketSlug}
          city={marketTitle}
          className={cx(styles.full, styles.categoryCityLabelDesktop)}
        />
        <Heading title={article.title} className={styles.heading} />

        <Subheading
          title={article.alternativeHeadline?.subheadline}
          className={styles.subHeading}
        />
      </div>

      <ArticleBody
        className={cx(styles.center, stylesArticleBody.root)}
        content={article.contentFiltered}
      />

      <div className={styles.center}>
        <NewsletterSmall
          market=""
          marketTitle=""
          className={styles.newsletterSmall}
          isClosable
        />
      </div>
    </main>
  );
});
