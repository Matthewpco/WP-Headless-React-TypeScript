import React, { FC } from 'react';
import Slider, { Settings } from 'react-slick';
import cx from 'classnames';
import { ImageCarouselItem } from './pipeImageCarousel';
import styles from './ImageCarousel.module.scss';

export interface ImageCarouselProps {
  items: ImageCarouselItem[];
}

const settings: Settings = {
  dots: false,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const renderItem = ({ src, alt }: ImageCarouselItem) => (
  <div key={src}>
    <img src={src} alt={alt} className={styles.image} loading="lazy" />
  </div>
);

export const ImageCarousel: FC<ImageCarouselProps> = ({ items }) => (
  <div
    className={cx('NoStyles', styles.root)}
    style={{ width: '100%', display: 'block' }}
  >
    <Slider {...settings} className={styles.slider}>
      {(items ?? []).map(renderItem)}
    </Slider>
  </div>
);
