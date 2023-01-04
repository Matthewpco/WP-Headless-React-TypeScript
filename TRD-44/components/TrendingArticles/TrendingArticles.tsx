import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { List } from '../List';
import { ArticleTile, ArticleTileProps } from '../ArticleTile';
import { useDebounce } from '../../generic/hooks';
import { TrendingArticle } from '../../graphql';
import Button from '../../assets/icons/buttonSlider.svg';
import styles from './TrendingArticles.module.scss';

export type TrendingArticlesProps = {
  title: string;
  articlesData: TrendingArticle[];
  className?: string;
};

const renderItem = (item: ArticleTileProps) => (
  <ArticleTile key={item.title} {...item} />
);

export const TrendingArticles: FC<TrendingArticlesProps> =
  React.memo<TrendingArticlesProps>(({ title, articlesData, className }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [slider, setSlider] = useState<boolean>();
    const [resizeObserver, setResizeObserver] = useState<ResizeObserver>();
    const [section, setSection] = useState<HTMLElement | null>();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [step, setStep] = useState<string>();
    const [startClientX, setstartClientX] = useState<number>(0);
    const [finishClientX, setFinishClientX] = useState<number>(0);
    const callDebouncedFunction = useDebounce(100);

    const carousel = (): void => {
      callDebouncedFunction(() => {
        if (window.innerWidth < 640) return;
        if (divRef.current && section) {
          divRef.current.removeAttribute('style');
          const margin = divRef.current.getBoundingClientRect().left * 2;
          section.removeAttribute('style');
          setSlider(window.innerWidth < 1008);
          setDisabled(true);
          if (window.innerWidth < 1008) {
            const widthBody = document.body.offsetWidth;
            if (margin > 0) {
              const newStep = Math.floor(widthBody - margin);
              if (widthBody > 900) {
                setStep(`${newStep / 3}px`);
                section.style.width = `${(newStep / 3) * 4}px`;
              } else {
                setStep(`${newStep}px`);
                section.style.width = `${newStep * 2}px`;
              }
              divRef.current.style.width = `${newStep}px`;
            }
          }
        }
      });
    };

    useEffect(() => {
      if (divRef.current) {
        setSection(divRef.current.querySelector('section'));
        setResizeObserver(new ResizeObserver(carousel));
      }
    }, [divRef.current]);

    useEffect(() => {
      resizeObserver?.observe(document.body);
    }, [resizeObserver]);

    useEffect(() => () => resizeObserver?.unobserve(document.body), []);

    const clickLeft = () => {
      if (disabled) return;
      setDisabled(!disabled);
      if (section) section.style.transform = `translateX(${0}px)`;
    };

    const clickRight = () => {
      if (!disabled) return;
      setDisabled(!disabled);
      if (section) section.style.transform = `translateX(-${step})`;
    };

    useEffect(() => {
      if (!slider || startClientX === finishClientX) return;
      if (startClientX > finishClientX) {
        clickRight();
      } else {
        clickLeft();
      }
    }, [finishClientX]);

    const validArticlesData =
      articlesData?.map((item) => ({
        href: item.link,
        title: item.title,
        imgSrc: item.img[0].src,
        imgAlt: item.img[0].alt,
      })) ?? [];

    return (
      <div className={cx(className, styles.trendingArticlesWrapper)}>
        <h3 className={styles.trendingArticlesTitle}>{title}</h3>
        <div className={styles.divWrapper}>
          <Button
            className={styles.buttonSlider}
            onClick={clickLeft}
            disabled={disabled}
          />
          <div
            ref={divRef}
            className={styles.sectionWrapper}
            onTouchStart={(e) => setstartClientX(e.touches[0].clientX)}
            onTouchEnd={(e) => setFinishClientX(e.changedTouches[0].clientX)}
          >
            <section className={styles.trendingArticlesList}>
              <List items={validArticlesData} render={renderItem} />
            </section>
          </div>
          <Button
            className={cx(styles.buttonSlider, styles.rightButtonSlider)}
            onClick={clickRight}
            disabled={!disabled}
          />
        </div>
      </div>
    );
  });
