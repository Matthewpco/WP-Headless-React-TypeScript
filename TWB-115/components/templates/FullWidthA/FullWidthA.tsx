import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cx from 'classnames';
import styles from './FullWidthA.module.scss';
import stylesArticleBody from '../../ArticleBody/ArticleBody.module.scss';
import { TemplateProps } from '../configTemplate';
import { TrendingArticles } from '../../TrendingArticles';
import { Tags } from '../../Tags';
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
import { SaveArticleSmall } from '../../SaveArticleSmall';
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
import { useAdsInsertComponent } from '../../Ad/useAdsInsertComponent';

declare const window: any;

export const FullWidthA = forwardRef<
  HTMLDivElement,
  PropsWithChildren<TemplateProps>
>(({ article, trendingArticle, articleIndex }, ref) => {
  const marketTitle = article?.markets?.nodes?.[0]?.name;
  const marketSlug = article?.markets?.nodes?.[0]?.slug;
  const sectionTitle = article?.primarySector?.name;
  const hostName = useHost();
  const sharedUrl = `${hostName}${article.uri}`;

  const insertAds = useAdsInsertComponent(true);
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
            className={cx(styles.full, styles.categoryCityLabel)}
          />

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
          classNameCaption={cx(styles.full, styles.featuredBlockCaption)}
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

          <SaveArticleSmall
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
          date={new Date(article.date)}
          className={cx(styles.center, styles.publishedDate)}
        />

        <div className={styles.headings}>
          <Heading title={article.title} className={styles.heading} />

          <Subheading
            title={article.alternativeHeadline?.subheadline}
            className={styles.subHeading}
          />
        </div>

        <ArticleBody
          className={cx(styles.center, stylesArticleBody.root)}
          content={article.contentFiltered}
          insertComponent={insertComponent}
        />

        <Tags
          tags={article.tags.nodes}
          className={cx(styles.center, styles.tags)}
        />
      </main>
    </div>
  );
});
