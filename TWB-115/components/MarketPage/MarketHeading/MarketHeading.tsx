import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import styles from './MarketHeading.module.scss';
import { HeaderDropdownMenuItem } from '../../../graphql';
import { Link } from '../../Link';
import { List } from '../../List';
import ArrowDropdown from '../../../assets/icons/arrowDropdoun.svg';
import Button from '../../../assets/icons/buttonSlider.svg';
import { useHandleClickOutside } from '../../Dropdown/useHandleClickOutside';
import { useHost } from '../../../generic/hooks';

export interface MarketHeadingProps {
  className?: string;
  menuItems: HeaderDropdownMenuItem[];
  showSelectedMarket?: boolean;
  isTabSelected?: boolean;
  latestStories?: {
    target: string;
    title: string;
    url: string;
  };
}

export const MarketHeading: FC<MarketHeadingProps> = ({
  className,
  menuItems,
  showSelectedMarket = true,
  isTabSelected = false,
  latestStories,
}) => {
  const [activeDropDown, setActiveDropdown] = useState(true);
  const { query } = useRouter();
  const marketSlug = query.firstLevel;

  const [activeMarket, setActiveMarket] = useState<string>();
  const [activeMenuMarket, setActiveMenuMarket] = useState<string>();
  const wrapperRef = useRef(null);

  const listMarket = useRef<HTMLUListElement>(null);
  useHandleClickOutside(wrapperRef, () => setActiveDropdown(true));
  const [disabled, setDisabled] = useState<boolean>(true);
  const [startClientX, setStartClientX] = useState<number>(20);
  const [finishClientX, setFinishClientX] = useState<number>(20);

  useEffect(() => {
    const marketFromSlug =
      typeof marketSlug === 'string' &&
      menuItems.find(({ url }) => url.includes(`/${marketSlug}/`));
    const initialMarket = marketFromSlug || (isTabSelected && menuItems[0]);
    const initialLabel = initialMarket ? initialMarket.label : '';
    setActiveMarket(initialLabel);
    setActiveMenuMarket(initialLabel);
  }, [menuItems]);

  const onClickRight = () => {
    if (!disabled) {
      return;
    }

    setDisabled(!disabled);
    if (listMarket.current) {
      const step =
        listMarket.current.scrollWidth - listMarket.current.offsetWidth;
      listMarket.current.style.transform = `translateX(-${step}px`;
    }
  };

  const onClickLeft = () => {
    if (disabled) {
      return;
    }

    setDisabled(!disabled);
    if (listMarket.current) {
      listMarket.current.style.transform = `translateX(${0}px`;
    }
  };

  useEffect(() => {
    if (!listMarket.current || startClientX === finishClientX) {
      return;
    }

    if (startClientX > finishClientX) {
      onClickRight();
    } else {
      onClickLeft();
    }
  }, [finishClientX]);

  const hostName = useHost();

  return (
    <section className={cx(styles.root, className)}>
      {showSelectedMarket && (
        <h1 className={styles.heading}>{activeMarket || 'All Markets'}</h1>
      )}
      <div className={cx(styles.block)}>
        <div className={styles.blockLeft}>
          <Link
            href={hostName}
            className={isTabSelected ? styles.latestStories : styles.topStories}
          >
            Top stories
          </Link>
          <Link
            href={latestStories?.url ?? '#'}
            className={isTabSelected ? styles.topStories : styles.latestStories}
          >
            {latestStories?.title ?? 'Latest Stories'}
          </Link>
        </div>
        <div className={styles.blockRight}>
          <Button
            className={styles.buttonSlider}
            onClick={onClickLeft}
            disabled={disabled}
          />
          <div className={styles.container}>
            <ul
              ref={listMarket}
              className={styles.listMarkets}
              onTouchStart={(e) => setStartClientX(e.touches[0].clientX)}
              onTouchEnd={(e) => setFinishClientX(e.changedTouches[0].clientX)}
            >
              <List
                items={menuItems}
                render={(item) => (
                  <li
                    key={item.label}
                    className={cx({
                      [styles.activeMarket]: activeMenuMarket === item.label,
                    })}
                  >
                    <Link
                      href={item.url}
                      onClick={() => {
                        setActiveMarket(item.label);
                        setActiveMenuMarket(item.label);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                )}
              />
            </ul>
          </div>
          <Button
            className={cx(styles.buttonSlider, styles.rightButtonSlider)}
            onClick={onClickRight}
            disabled={!disabled}
          />
          <div ref={wrapperRef}>
            <ArrowDropdown
              className={styles.iconDropDown}
              onClick={() => setActiveDropdown(!activeDropDown)}
            />
            <ul className={styles.dropDownMarkets} hidden={activeDropDown}>
              <List
                items={menuItems}
                render={(item) => (
                  <li key={item.label}>
                    <Link
                      href={item.url}
                      onClick={() => setActiveMarket(item.label)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )}
              />
            </ul>
          </div>
        </div>
        {showSelectedMarket && (
          <h1 className={cx(styles.heading, styles.headingMobile)}>
            {activeMarket}
          </h1>
        )}
      </div>
    </section>
  );
};
