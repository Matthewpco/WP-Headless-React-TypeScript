import React, { FC } from 'react';
import Slider, { Settings } from 'react-slick';
import styles from './TestimonialsSlider.module.scss';
import { TestimonialsData, TestimonialsItem } from './pipeTestimonialsSlider';
import QuoteIcon from '../../../assets/icons/quote.svg';

const settings: Settings = {
  dots: false,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  variableWidth: false,
  infinite: true,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const renderItem = (
  { name, testimonial, company }: TestimonialsItem,
  index: number,
) => (
  <article key={index} className={styles.item}>
    <div className={styles.inner}>
      <div className={styles.itemHeader}>
        <QuoteIcon />
        <QuoteIcon />
      </div>
      <p className={styles.itemDesc}>{testimonial}</p>

      <div className={styles.itemFooter}>
        <p className={styles.itemName}>{name}</p>
        <p className={styles.itemCompany}>{company}</p>
      </div>
    </div>
  </article>
);

export const TestimonialsSlider: FC<TestimonialsData> = ({
  title,
  testimonials,
}) => (
  <div className={styles.root}>
    <h3 className={styles.title}>{title}</h3>
    <Slider {...settings} className={styles.slider}>
      {(testimonials ?? []).map(renderItem)}
    </Slider>
  </div>
);
