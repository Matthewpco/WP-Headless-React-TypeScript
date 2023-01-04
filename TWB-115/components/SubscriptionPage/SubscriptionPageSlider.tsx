import React, { FC, useCallback, useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import cx from 'classnames';
import styles from './SubscriptionPageSlider.module.scss';
import {
  useGraphqlLazyQuery,
  useGraphqlQuery,
} from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import {
  ResponseGetSectorsForSlider,
  SectorForSlider,
} from '../../graphql/getSectorsForSlider';
import {
  PostForSlider,
  RequestGetPostsForSlider,
  ResponseGetPostsForSlider,
} from '../../graphql/getPostsForSlider';
import { Link } from '../Link';
import { CategoryCityLabel } from '../CategoryCityLabel';

const settings: Settings = {
  dots: false,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  variableWidth: true,
  infinite: true,
};

export const SubscriptionPageSlider: FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [posts, setPosts] = useState<PostForSlider[]>([]);

  const { data: dataSectors } = useGraphqlQuery<ResponseGetSectorsForSlider>(
    IdGraphqlQuery.getSectorsForSlider,
  );

  const [fetch] = useGraphqlLazyQuery<
    ResponseGetPostsForSlider,
    RequestGetPostsForSlider
  >(IdGraphqlQuery.getPostsForSlider);

  const renderSector = useCallback(
    ({ id, name }: SectorForSlider, index: number) => (
      <div
        className={cx(styles.sector, {
          [styles.sectorActive]: activeIdx === index,
        })}
        onClick={() => setActiveIdx(index)}
        key={id}
      >
        {name}
      </div>
    ),
    [activeIdx],
  );

  const renderPost = useCallback(
    ({
      id,
      title,
      uri,
      featuredImageCaption,
      featuredImageUri,
      primarySector,
    }: PostForSlider) => (
      <Link key={id} href={uri}>
        <div className={styles.post}>
          <img
            className={styles.postImage}
            src={featuredImageUri}
            alt={featuredImageCaption}
            loading="lazy"
          />
          <CategoryCityLabel
            className={styles.categoryCityLabel}
            slug={primarySector?.slug}
            category={primarySector?.name}
          />
          <p className={styles.postTitle}>{title}</p>
        </div>
      </Link>
    ),
    [],
  );

  useEffect(() => {
    if (dataSectors?.sectors?.nodes?.length) {
      fetch({ id: dataSectors?.sectors?.nodes?.[activeIdx]?.slug }).then(
        ({ data }) => {
          setPosts(data?.sector?.posts?.nodes ?? []);
        },
      );
    }
  }, [dataSectors, activeIdx]);

  return (
    <div className={styles.root}>
      <div className={styles.sectors}>
        <Slider {...settings}>
          {dataSectors?.sectors?.nodes?.map(renderSector)}
        </Slider>
      </div>

      <div className={styles.posts}>
        <Slider {...settings}>{posts?.map(renderPost)}</Slider>
      </div>
    </div>
  );
};
