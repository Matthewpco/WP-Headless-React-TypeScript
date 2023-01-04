import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import styles from './SponsoredRightRail.module.scss';
import stylesArticleBody from '../../ArticleBody/ArticleBody.module.scss';
import { TemplateSponsorProps } from '../configSponsorTemplate';
import { Heading } from '../../Heading';
import { CategoryCityLabel } from '../../CategoryCityLabel';
import { PublishedDate } from '../../PublishedDate';
import { Authors } from '../../Authors';
import { Newsletter } from '../../Newsletter';
import { SocialShare } from '../../SocialShare';
import { ClientSide } from '../../ClientSide';
import { FontSizeSelector } from '../../FontSize';
import { Subheading } from '../../Heading/Subheading';
import { ArticleUtils } from '../../ArticleUtils';
import { FeaturedBlock } from '../../FeaturedBlock';
import { ArticleBody } from '../../ArticleBody';
import { SponsorsLogo } from '../../SponsorsLogoContainer';
import { TopStories } from '../../topStories';
import { useHost } from '../../../generic/hooks';
import { useContextAds } from '../../Ad/ContextAds';
import { AdUnit } from '../../Ad/units/AdUnit';
import { adSizes } from '../../Ad/config/adSizes';

const rightContentSizes = [250, 445, 250, 400, 250];

export const SponsoredRightRail = forwardRef<
  HTMLDivElement,
  PropsWithChildren<TemplateSponsorProps>
>(
  (
    { article, sponsors, topStories, recommendedStories, articleIndex },
    ref,
  ) => {
    const { device } = useContextAds();

    const marketTitle = article?.markets?.nodes?.[0]?.name;
    const marketSlug = article?.markets?.nodes?.[0]?.slug;
    const sharedUrl = `${useHost()}${article.uri}`;

    const [shownRightItems, setShownRightItems] = useState(Infinity);
    const refContent = useRef<HTMLDivElement>(null);
    useEffect(() => {
      let totalHeight = 0;
      const offsetHeight = refContent.current?.offsetHeight ?? 0;

      for (let i = 0; i < rightContentSizes.length; i += 1) {
        totalHeight += rightContentSizes[i];
        if (totalHeight > offsetHeight) {
          setShownRightItems(i);
          break;
        }
      }
    }, [refContent.current?.offsetHeight]);

    return (
      <main ref={ref} className={styles.root}>
        {sponsors && (
          <SponsorsLogo
            className={cx(styles.full, styles.sponsorsLogo)}
            sponsorArr={sponsors}
          />
        )}
        <div className={cx(styles.full, styles.afterTrend)}>
          <CategoryCityLabel
            slug={marketSlug}
            city={marketTitle}
            className={styles.categoryCityLabel}
          />

          <ArticleUtils
            sharedUrl={sharedUrl}
            sharedTitle={article.title}
            className={styles.articleUtils}
          />
        </div>

        <Heading
          title={article.title}
          className={cx(styles.full, styles.heading)}
        />

        <Subheading
          title={article.alternativeHeadline?.subheadline}
          className={cx(styles.full, styles.subHeading)}
        />

        <div className={styles.content}>
          <div ref={refContent}>
            <FeaturedBlock
              src={article.featuredImageUri}
              alt={article.featuredImageCaption}
              subtitle={article.featuredImageCaption}
              className={styles.featuredBlock}
            />

            <div className={styles.contentCols}>
              <aside className={styles.contentLeft}>
                <PublishedDate
                  date={new Date(article.archiveDate ?? article.date)}
                  className={styles.publishedDate}
                />
                {article.bylineInformation && (
                  <Authors
                    authors={article.bylineInformation.authors}
                    researchers={article.bylineInformation.researchers}
                    className={styles.authors}
                  />
                )}
                <ClientSide>
                  <SocialShare
                    sharedUrl={sharedUrl}
                    sharedTitle={article.title}
                    className={styles.socialShare}
                  />
                </ClientSide>
                <FontSizeSelector className={styles.fontSizeSelector} />

                <ArticleUtils
                  sharedUrl={sharedUrl}
                  sharedTitle={article.title}
                  className={cx(styles.articleUtilsTablet)}
                />
              </aside>

              <div className={styles.center}>
                <ArticleBody
                  content={article.contentFiltered}
                  className={stylesArticleBody.root}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.right}>
          <div
            className={cx('single-aside single-aside-1', {
              [styles.hidden]: shownRightItems <= 0,
            })}
          >
            <AdUnit
              className="aside-ad"
              id={`div-id-for-right-${articleIndex + 1}-1`}
              size={adSizes.right[device]}
            />
          </div>
          <TopStories
            title="Top stories"
            topStories={topStories}
            className={cx({
              [styles.hidden]: shownRightItems <= 1,
            })}
          />
          <div
            className={cx('single-aside single-aside-2', {
              [styles.hidden]: shownRightItems <= 2,
            })}
          >
            <AdUnit
              className="aside-ad"
              id={`div-id-for-right-${articleIndex + 1}-2`}
              size={adSizes.right[device]}
            />
          </div>
          <TopStories
            title="Recommended"
            topStories={recommendedStories}
            className={cx({
              [styles.hidden]: shownRightItems <= 3,
            })}
          />
          <div
            className={cx('single-aside single-aside-3', {
              [styles.hidden]: shownRightItems <= 4,
            })}
          >
            <AdUnit
              className="aside-ad"
              id={`div-id-for-right-${articleIndex + 1}-3`}
              size={adSizes.right[device]}
            />
          </div>
        </aside>

        <Newsletter className={cx(styles.full, styles.newsletter)} />
      </main>
    );
  },
);
