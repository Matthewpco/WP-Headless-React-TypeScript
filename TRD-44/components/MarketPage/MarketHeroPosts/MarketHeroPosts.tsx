import React, { FC } from 'react';
import styles from './MarketHeroPosts.module.scss';
import { MarketArticle } from '../MarketArticle/MarketArticle';
import { HeroSectionPost } from '../../../graphql/getMarketHeroSectionPosts';
import { AdUnit } from '../../Ad/units/AdUnit';
import { adSizes } from '../../Ad/config/adSizes';

interface MarketHeroPostsProps {
  posts: HeroSectionPost[];
}

export const MarketHeroPosts: FC<MarketHeroPostsProps> = ({ posts }) => {
  const [firstPost] = posts;

  const author = firstPost.post.bylineInformation?.authors
    ? `${firstPost.post.bylineInformation?.authors[0]?.firstName} ${firstPost.post.bylineInformation?.authors[0]?.lastName}`
    : undefined;

  return (
    <div className={styles.root}>
      <div className={styles.leftBlock}>
        <MarketArticle
          classNameContainer={styles.mainArticle}
          article={firstPost.post}
          classNameImage={styles.mainImg}
          classNameFigure={styles.mainFigure}
          classNameTitle={styles.mainTitle}
          classNameHeading={styles.heading}
          classNameDescription={styles.description}
          author={author}
          featuredImageCaption={firstPost?.post?.featuredImageCaption}
        />
      </div>
      <div className={styles.rightBlock}>
        {posts.slice(1, 4).map((item) => (
          <MarketArticle
            key={item?.post?.id}
            classNameTitle={styles.title}
            classNameContainer={styles.article}
            article={item.post}
            classNameFigure={styles.figure}
            classNameImage={styles.img}
            classNameHeading={styles.heading}
            classNameDescription={styles.descriptionRight}
          />
        ))}
        <AdUnit id="div-id-for-sponsored" size={adSizes.sponsored.desktop} />
      </div>
    </div>
  );
};
