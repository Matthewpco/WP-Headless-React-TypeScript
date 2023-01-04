import React, { FC, useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import styles from './BrandStudioAdvertiserSlider.module.scss';
import { BrandStudioAdvertiserProps } from './BrandStudioAdvertiser';
import {
  GetPostsByAdvertiserItem,
  RequestGetPostsByAdvertiser,
  ResponseGetPostsByAdvertiser,
} from '../../../graphql/getPostsByAdvertiser';
import { useGraphqlQuery } from '../../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../../generic/graphql/IdGraphqlQuery';
import { useHost } from '../../../generic/hooks';

export interface BrandStudioAdvertiserSliderProps
  extends Pick<BrandStudioAdvertiserProps, 'advertiser' | 'postCount'> {}

const settings: Settings = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  variableWidth: true,
  infinite: true,
};

const renderItem = ({
  id,
  uri,
  featuredImageUri,
  title,
}: GetPostsByAdvertiserItem) => {
  const hostName = useHost();
  return (
    <a key={id} href={`${hostName}${uri}`} className={styles.sliderItem}>
      <img
        className={styles.sliderImage}
        alt={title}
        src={`${hostName}${featuredImageUri}`}
        loading="lazy"
      />
      <h4 className={styles.sliderTitle}>{title}</h4>
    </a>
  );
};

export const BrandStudioAdvertiserSlider: FC<BrandStudioAdvertiserSliderProps> =
  ({ advertiser, postCount }) => {
    const params = useMemo(
      () => ({
        slug: advertiser,
        postNum: postCount,
      }),
      [advertiser, postCount],
    );

    const { data } = useGraphqlQuery<
      ResponseGetPostsByAdvertiser,
      RequestGetPostsByAdvertiser
    >(IdGraphqlQuery.getPostsByAdvertiser, params);

    return (
      <div className={styles.root}>
        <Slider {...settings} className={styles.slider}>
          {(data?.postsByAdvertiserBlock ?? []).map(renderItem)}
        </Slider>
      </div>
    );
  };
