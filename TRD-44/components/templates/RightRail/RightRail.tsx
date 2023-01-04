import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import styles from './RightRail.module.scss';
import stylesArticleBody from '../../ArticleBody/ArticleBody.module.scss';
import { TemplateProps } from '../configTemplate';
import { Heading } from '../../Heading';
import { TrendingArticles } from '../../TrendingArticles';
import { CategoryCityLabel } from '../../CategoryCityLabel';
import { PublishedDate } from '../../PublishedDate';
import { Authors } from '../../Authors';
import { SocialShare } from '../../SocialShare';
import { ClientSide } from '../../ClientSide';
import { FontSizeSelector } from '../../FontSize';
import { Newsletter, NewsletterSmall } from '../../Newsletter';
import { Tags } from '../../Tags';
import { Subheading } from '../../Heading/Subheading';
import { ArticleUtils } from '../../ArticleUtils';
import { SaveArticleSmall } from '../../SaveArticleSmall';
import { FeaturedBlock } from '../../FeaturedBlock';
import { ArticleBody } from '../../ArticleBody';
import { TopStories } from '../../topStories';
import { CompaniesAndPeople } from '../../CompaniesAndPeople';
import { SaveArticle } from '../../SaveArticle';
import { PopUpMessage } from '../../NewsLetterPage/PopUpMessage/PopUpMessage';
import {
  RequestToggleArticle,
  ResponseToggleArticle,
} from '../../../graphql/toggleArticleForPiano';
import {
  RequestSavedForPiano,
  ResponseSavedForPiano,
} from '../../../graphql/savedForPiano';
import { useGraphqlMutation } from '../../../generic/graphql/useGraphqlMutation';
import { IdGraphqlMutation } from '../../../generic/graphql/IdGraphqlMutation';
import { useGraphqlQuery } from '../../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../../generic/graphql/IdGraphqlQuery';
import { useHost } from '../../../generic/hooks';
import { AdUnit } from '../../Ad/units/AdUnit';
import { adSizes } from '../../Ad/config/adSizes';
import { useContextAds } from '../../Ad/ContextAds';
import { useAdsInsertComponent } from '../../Ad/useAdsInsertComponent';

const rightContentSizes = [250, 445, 250, 400, 250];

declare const window: any;

export const RightRail = forwardRef<
  HTMLDivElement,
  PropsWithChildren<TemplateProps>
>(
  (
    { article, trendingArticle, topStories, recommendedStories, articleIndex },
    ref,
  ) => {
    const marketTitle = article?.markets?.nodes?.[0]?.name;
    const marketSlug = article?.markets?.nodes?.[0]?.slug;
    const sectionTitle = article?.primarySector?.name;
    const hostName = useHost();
    const sharedUrl = `${hostName}${article?.uri}`;

    const insertAds = useAdsInsertComponent();

    const insertComponent = (nodes: JSX.Element[]): void => {
      const size = nodes.length / 2;
      nodes.splice(
        size,
        0,
        <NewsletterSmall
          key={`${marketSlug}_${size}`}
          market={marketSlug}
          marketTitle={marketTitle}
          isClosable
        />,
      );

      insertAds(nodes, articleIndex);
    };

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const [saved, setSaved] = useState(false);

    const [userId, setUserId] = useState('');

    const { device } = useContextAds();

    useEffect(() => {
      setUserId(localStorage.pianoId);
    }, []);

    const params = useMemo(
      () => ({
        id: article?.uri,
        userIdPiano: userId,
      }),
      [article?.uri, userId],
    );

    const { data } = useGraphqlQuery<
      ResponseSavedForPiano,
      RequestSavedForPiano
    >(IdGraphqlQuery.savedForPiano, params);

    useEffect(() => {
      if (data) {
        setSaved(data?.post?.savedForPiano);
      }
    }, [data]);

    const [onSave] = useGraphqlMutation<
      ResponseToggleArticle,
      RequestToggleArticle
    >(IdGraphqlMutation.toggleArticleForPiano);

    const onSaveArticle = () => {
      if (window.tp.pianoId.isUserValid() === true) {
        onSave({
          databaseId: article?.databaseId,
          userIdPiano: userId,
        })
          .then(({ data: response }) => {
            setMessage(response?.toggleArticleForPiano?.message ?? '');
            setShowMessage(true);
          })
          .catch(() => {
            setMessage('The article is not saved');
            setShowMessage(true);
          });
      } else if (window.tp.pianoId.isUserValid() === false) {
        window.tp.pianoId.show({
          screen: 'login',
          displayMode: 'modal',
          loggedIn: () => {
            const user = window.tp.pianoId.getUser();
            window.localStorage.setItem('pianoId', user.uid);
            window.localStorage.setItem('pianoUser', JSON.stringify(user));
            window.location.reload();
          },
        });
      } else {
        setMessage('The article is not saved');
        setShowMessage(true);
      }
    };

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
    }, [refContent?.current?.offsetHeight]);

    const tagsCount = article?.tags?.nodes?.length ?? 0;
    const companiesPeopleCount =
      (article?.companies?.nodes?.length ?? 0) +
      (article?.people?.nodes?.length ?? 0);

    return (
      <div>
        <main ref={ref} className={styles.root}>
          <TrendingArticles
            title="TRENDING"
            articlesData={trendingArticle}
            className={cx(styles.full, styles.trendingArticles)}
          />

          <div className={cx(styles.full, styles.afterTrend)}>
            <CategoryCityLabel
              slug={marketSlug}
              category={sectionTitle}
              city={marketTitle}
              className={styles.categoryCityLabel}
            />
            <div className={styles.utilsContainer}>
              <ArticleUtils
                sharedUrl={sharedUrl}
                sharedTitle={article?.title}
                className={styles.articleUtils}
              />
              <SaveArticleSmall
                onSaveArticle={onSaveArticle}
                saved={saved}
                setSaved={setSaved}
              />
            </div>
          </div>

          <Heading
            title={article?.title}
            className={cx(styles.full, styles.heading)}
          />

          <Subheading
            title={article?.alternativeHeadline?.subheadline}
            className={cx(styles.full, styles.subHeading)}
          />

          <div className={styles.content}>
            <div ref={refContent}>
              <FeaturedBlock
                src={article?.featuredImageUri}
                alt={article?.featuredImageCaption}
                subtitle={article?.featuredImageCaption}
                className={styles.featuredBlock}
                classNameCaption={styles.featuredBlockCaption}
              />

              <div className={styles.contentCols}>
                <aside className={styles.contentLeft}>
                  <PublishedDate
                    date={new Date(article?.date)}
                    className={styles.publishedDate}
                  />
                  {article?.bylineInformation && (
                    <Authors
                      authors={article?.bylineInformation.authors}
                      researchers={article?.bylineInformation.researchers}
                      className={styles.authors}
                    />
                  )}

                  <SaveArticle
                    onSaveArticle={onSaveArticle}
                    saved={saved}
                    setSaved={setSaved}
                  />
                  {showMessage && (
                    <PopUpMessage
                      className={styles.message}
                      message={message}
                      closePopUp={setShowMessage}
                    />
                  )}

                  <ClientSide>
                    <SocialShare
                      sharedUrl={sharedUrl}
                      sharedTitle={article?.title}
                      className={styles.socialShare}
                    />
                  </ClientSide>
                  <FontSizeSelector className={styles.fontSizeSelector} />

                  <ArticleUtils
                    sharedUrl={sharedUrl}
                    sharedTitle={article?.title}
                    className={cx(styles.articleUtilsTablet)}
                  />
                </aside>

                <div className={styles.center}>
                  <ArticleBody
                    content={article?.contentFiltered ?? ''}
                    className={cx(styles.articleBody, stylesArticleBody.root)}
                    insertComponent={insertComponent}
                  />

                  {companiesPeopleCount > 0 && (
                    <CompaniesAndPeople
                      className={styles.companiesAndPeople}
                      companies={article?.companies?.nodes ?? []}
                      people={article?.people?.nodes ?? []}
                    />
                  )}

                  {tagsCount > 0 && (
                    <Tags
                      tags={article?.tags?.nodes ?? []}
                      className={styles.tags}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className={cx(styles.right)}>
            <div
              className={cx(`${styles.singleAside} single-aside-1`, {
                [styles.hidden]: shownRightItems <= 0,
              })}
            >
              <div className={cx(styles.isPinned)}>
                <AdUnit
                  className="aside-ad"
                  id={`div-id-for-right-${articleIndex + 1}-1`}
                  size={adSizes.right[device]}
                />
              </div>
            </div>
            <TopStories
              title="Top stories"
              topStories={topStories}
              className={cx({
                [styles.hidden]: shownRightItems <= 1,
              })}
            />
            <div
              className={cx(`${styles.singleAside} single-aside-2`, {
                [styles.hidden]: shownRightItems <= 2,
              })}
            >
              <div className={cx(styles.isPinned)}>
                <AdUnit
                  className="aside-ad"
                  id={`div-id-for-right-${articleIndex + 1}-2`}
                  size={adSizes.right[device]}
                />
              </div>
            </div>
            <TopStories
              title="Recommended"
              topStories={recommendedStories}
              className={cx({
                [styles.hidden]: shownRightItems <= 3,
              })}
            />
            <div
              className={cx(`${styles.singleAside} single-aside-3`, {
                [styles.hidden]: shownRightItems <= 4,
              })}
            >
              <div className={cx(styles.isPinned)}>
                <AdUnit
                  className="aside-ad"
                  id={`div-id-for-right-${articleIndex + 1}-3`}
                  size={adSizes.right[device]}
                />
              </div>
            </div>
          </aside>

          <Newsletter className={cx(styles.full, styles.newsletter)} />
        </main>
      </div>
    );
  },
);
