import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import styles from './FullWidthB.module.scss';
import stylesArticleBody from '../../ArticleBody/ArticleBody.module.scss';
import { TemplateProps } from '../configTemplate';
import { Heading } from '../../Heading';
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
import { FeaturedBlock } from '../../FeaturedBlock';
import { ArticleBody } from '../../ArticleBody';
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
import { useHost, useOnScreen } from '../../../generic/hooks';
import { useAdsInsertComponent } from '../../Ad/useAdsInsertComponent';

declare const window: any;

export const FullWidthB = forwardRef<
  HTMLDivElement,
  PropsWithChildren<TemplateProps>
>(({ article, articleIndex }, ref) => {
  const marketSlug = article?.markets?.nodes?.[0]?.slug;
  const marketTitle = article?.markets?.nodes?.[0]?.name;
  const hostName = useHost();
  const sharedUrl = `${hostName}${article.uri}`;
  const featuredBlockRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(featuredBlockRef);
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
    const header = document.getElementById('trd-header');

    const menuEffect = () => {
      if (header && featuredBlockRef.current) {
        const {
          bottom: headerBottom,
          height: headerHeight,
          top: headerTop,
        } = header.getBoundingClientRect();
        const {
          top: blockTop,
          bottom: blockBottom,
          height: blockHeight,
        } = featuredBlockRef.current.getBoundingClientRect();
        if (headerTop < blockTop + headerHeight) {
          header.classList.remove('header');
          header.classList.remove('headerHidden');
        }
        if (headerBottom > blockTop) {
          header.classList.add('header');
          header.classList.remove('headerHidden');
        }
        if (headerBottom >= blockTop + blockHeight / 2) {
          header.classList.add('headerHidden');
        }
        if (headerTop > blockBottom) {
          header.classList.remove('header');
          header.classList.remove('headerHidden');
        }
      }
    };

    if (isVisible) {
      window.addEventListener('scroll', menuEffect);
    } else {
      window.removeEventListener('scroll', menuEffect);
      if (header) {
        header.classList.remove('header');
        header.classList.remove('headerHidden');
      }
    }

    return () => window.removeEventListener('scroll', menuEffect);
  }, [isVisible]);

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
    <main className={styles.root} ref={ref}>
      <div className={cx(styles.full, styles.articleHeadWrapper)}>
        <div className={styles.articleHead}>
          <div className={cx(styles.bigPictureContainer, styles.fullwidth)}>
            <div ref={featuredBlockRef} className={styles.featuredBlockRef}>
              <FeaturedBlock
                src={article.featuredImageUri}
                alt={article.featuredImageCaption}
                subtitle={article.featuredImageCaption}
                className={styles.featuredBlock}
              />
            </div>
            <div className={styles.featuredShadowBlock} />
            <div className={styles.articleHeadText}>
              <div className={styles.afterTrend}>
                <CategoryCityLabel
                  slug={marketSlug}
                  category={article?.primarySector?.name}
                  city={marketTitle}
                  className={styles.categoryCityLabel}
                />
                <ArticleUtils
                  sharedUrl={sharedUrl}
                  sharedTitle={article.title}
                  className={styles.articleUtils}
                />
              </div>
              <Heading title={article.title} className={styles.heading} />
              <Subheading
                title={article.alternativeHeadline?.subheadline}
                className={styles.subHeading}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <aside className={cx(styles.belowFeatured)}>
          <div className={styles.actionButtons}>
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
              className={styles.authors}
            />
          )}
          <PublishedDate
            date={new Date(article.date)}
            className={styles.publishedDate}
          />
        </aside>
        <div>
          <ArticleBody
            content={article.contentFiltered}
            className={cx(styles.articleBody, stylesArticleBody.root)}
            insertComponent={insertComponent}
          />
        </div>
        <div>
          <Tags tags={article.tags.nodes} className={styles.tags} />
        </div>
        <Newsletter className={cx(styles.full, styles.newsletter)} />
      </div>
    </main>
  );
});
