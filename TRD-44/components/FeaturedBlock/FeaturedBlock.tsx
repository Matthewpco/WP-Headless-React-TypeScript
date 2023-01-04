import React, { FC } from 'react';
import cx from 'classnames';
import parse from 'html-react-parser';
import styles from './FeaturedBlock.module.scss';
import { useHost } from '../../generic/hooks';

export interface FeaturedBlockProps {
  src: string;
  alt: string;
  subtitle?: string;
  className?: string;
  classNameCaption?: string;
}

export const FeaturedBlock: FC<FeaturedBlockProps> = ({
  src,
  alt,
  subtitle,
  className,
  classNameCaption,
}) => (
  <figure className={cx(styles.root, className)}>
    <img
      className={styles.image}
      src={`${useHost()}${src}`}
      alt={alt}
      loading="lazy"
    />
    {subtitle && (
      <p className={cx(styles.subtitle, classNameCaption)}>{parse(subtitle)}</p>
    )}
  </figure>
);
