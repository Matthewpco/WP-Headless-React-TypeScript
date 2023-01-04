import React, { FC } from 'react';
import { List } from '../../List';
import styles from './HeroSection.module.scss';
import { MostViewed, TopStories } from '../../../graphql/getHomePage';
import { Article } from './Article';
import { Newsletter } from './Newsletter/Newsletter';
import { useHost } from '../../../generic/hooks';
import { AdUnit } from '../../Ad/units/AdUnit';
import { adSizes } from '../../Ad/config/adSizes';
import { Link } from '../../Link';

interface HeroSectionProps {
  topStories: TopStories[];
  mostViewed: MostViewed[];
}

const renderMostViewed = (item: MostViewed) => (
  <li key={item.title}>
    <Link href={item.link}>{item.title}</Link>
  </li>
);

const renderTopStories = (item: TopStories, index: number) => (
  <div
    key={item?.title}
    className={index === 0 ? styles.container : styles.secondContainer}
  >
    <Article
      article={item}
      classNameContainer={styles.articleContainer}
      classNameImage={index === 0 ? styles.img : styles.imgNone}
      classNameTitle={styles.title}
      classNamePublishedDate={styles.hidden}
      classNameCategoryCityLabel={styles.label}
    />
  </div>
);

const renderArticle = (item: TopStories) => (
  <Article
    key={item.title}
    classNameTitle={styles.title}
    classNameContainer={styles.container}
    classNameImage={styles.img}
    article={item}
    classNameCategoryCityLabel={styles.label}
    classNamePublishedDate={styles.hidden}
    squareImg
  />
);

export const HeroSection: FC<HeroSectionProps> = ({
  topStories,
  mostViewed,
}) => {
  const hostName = useHost();
  const mainArticle = topStories[0];

  return (
    <section className={styles.root}>
      <div className={styles.left}>
        <div className={styles.topStories}>Top stories</div>
        <ol>
          <List items={mostViewed} render={renderMostViewed} />
        </ol>
        <Newsletter />
        <AdUnit id="div-id-for-sponsored" size={adSizes.sponsored.desktop} />
      </div>
      <article className={styles.center}>
        <Link className={styles.link} href={mainArticle.uri}>
          <div className={styles.container}>
            <div className={styles.title}>{mainArticle.title}</div>
            <div className={styles.subTitle}>
              {mainArticle.alternativeHeadline.subheadline}
            </div>
          </div>
          <figure className={styles.imgFigure}>
            <img
              className={styles.img}
              alt={mainArticle.title}
              src={`${hostName}${mainArticle.featuredImageUri}`}
            />
            <figcaption className={styles.imgCaption}>
              {mainArticle?.featuredImageCaption}
            </figcaption>
          </figure>
        </Link>
      </article>
      <div className={styles.right}>
        <List items={topStories.slice(1, 3)} render={renderTopStories} />
      </div>
      <div className={styles.centerRight}>
        <List items={topStories.slice(3)} render={renderArticle} />
      </div>
    </section>
  );
};
