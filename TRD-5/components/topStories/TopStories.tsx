import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { useTopStoriesList } from './topStoriesHook';
import { subscribeRecommendedStoriesList } from './subscribeRecommendedStoriesList';
import ArrowDropdoun from '../../assets/icons/arrowDropdoun.svg';
import { useHandleClickOutside } from '../Dropdown/useHandleClickOutside';
import { Imarkets, ItopStories } from '../../graphql';
import styles from './TopStories.module.scss';

import { CategoryCityLabel } from '../CategoryCityLabel';
import { Link } from '../Link';

export const TrdMarkets = new Map([
  ['All Markets', undefined],
  ['Chicago', 'chicago'],
  ['Los Angeles', 'la'],
  ['National', 'national'],
  ['New York', 'ny'],
  ['San Francisco', 'sanfrancisco'],
  ['South Florida', 'miami'],
  ['Texas', 'texas'],
  ['Tri-State', 'tristate'],
]);

interface Props {
  title: string;
  topStories?: ItopStories[];
  className?: string;
}

export const TopStories: FC<Props> = ({ title, topStories, className }) => {
  const [chosenCity, setChosenCity] = useState('All Markets');
  const [activeDropDown, setActiveDropdown] = useState(true);

  const { data, refetch } = useTopStoriesList();

  // keep logic for both of components in the same place to avoid code duplication
  const componentType =
    title === 'Top stories' ? 'TopStories' : 'RecommendedStoried';

  const wrapperRef = useRef(null);
  const markets = Array.from(TrdMarkets.keys());

  const [topStoriesList, setTopStoriesList] = useState(topStories);
  const [recommendedStoriesList, setRecommendedStoriesList] = useState([]);

  useEffect(() => {
    // undefined if default value
    subscribeRecommendedStoriesList(undefined, (recommendedData) => {
      setRecommendedStoriesList(recommendedData);
    });
  }, []);

  const setCity = (el: string) => {
    setChosenCity(el);
    setActiveDropdown(true);

    const marketName = TrdMarkets.get(el);

    if (componentType === 'TopStories') {
      refetch({ market: marketName });
    } else {
      subscribeRecommendedStoriesList(marketName, (recommendedData) => {
        setRecommendedStoriesList(recommendedData);
      });
    }
  };

  useEffect(() => {
    setTopStoriesList(data);
  }, [data]);

  useHandleClickOutside(wrapperRef, () => setActiveDropdown(true));

  const displayData =
    componentType === 'TopStories' ? topStoriesList : recommendedStoriesList;

  return (
    <div className={cx(styles.topStories, className)}>
      <div className={styles.titleContainer}>
        <div>{title}</div>
        <div>
          <div
            className={styles.dropDown}
            onClick={() => {
              setActiveDropdown(!activeDropDown);
            }}
          >
            <span>{chosenCity}</span>
            <ArrowDropdoun />
          </div>
          <ul
            className={styles.cityListActive}
            hidden={activeDropDown}
            ref={wrapperRef}
          >
            {markets.map((el: string) => (
              <li key={el}>
                <div
                  onClick={() => {
                    setCity(el);
                  }}
                >
                  {el}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className={styles.topStoriesContainer}>
        {displayData?.map((item: ItopStories) => (
          <li key={item.link}>
            <div>
              <div>
                {item.markets.map((market: Imarkets) => (
                  <CategoryCityLabel
                    className={styles.market}
                    key={market.slug}
                    slug={market.slug}
                    city={market.name}
                  />
                ))}
              </div>
              <Link href={item.link}>{item.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
