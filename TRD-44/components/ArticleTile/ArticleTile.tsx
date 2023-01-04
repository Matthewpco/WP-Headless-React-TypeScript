import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './ArticleTile.module.scss';

export type ArticleTileProps = {
  imgSrc?: string;
  imgAlt?: string;
  title: string;
  href: string;
  classNameRoot?: string;
  classNameImage?: string;
  classNameTitle?: string;
};

export const ArticleTile: FunctionComponent<ArticleTileProps> =
  React.memo<ArticleTileProps>(
    ({
      imgSrc,
      imgAlt,
      title,
      href,
      classNameRoot,
      classNameImage,
      classNameTitle,
    }) => (
      <a className={cx(classNameRoot, styles.articleTile)} href={href}>
        <img
          className={cx(styles.articleTileImage, classNameImage)}
          src={imgSrc}
          alt={imgAlt}
          draggable="false"
          loading="lazy"
        />
        <span className={cx(styles.articleTileTitle, classNameTitle)}>
          {title}
        </span>
      </a>
    ),
  );
