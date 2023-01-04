import React, { FC, useEffect, useRef } from 'react';
import { AdSize, AdUnit } from './AdUnit';
import { adSizes } from '../config/adSizes';
import style from './AdUnitPushdown.module.scss';

const size: AdSize = adSizes.pushdown.desktop;

export const AdUnitPushdown: FC = () => {
  const pushdownRef = useRef<HTMLDivElement>(null);

  /**
   * Update Pushdown Ad Unit container height based on user scroll position.
   *
   * @since 1.4.1
   */
  useEffect(() => {
    const pushdownEl = pushdownRef.current;

    /**
     * Have to return `undefined` here otherwise ESLint would
     * throw `consistent-return` error.
     * @see https://eslint.org/docs/latest/rules/consistent-return
     */
    if (!pushdownEl) return undefined;

    const pushdownElStyles = window.getComputedStyle(pushdownEl);
    const minHeight = parseInt(
      pushdownElStyles.getPropertyValue('min-height'),
      10,
    );
    const maxHeight = parseInt(
      pushdownElStyles.getPropertyValue('max-height'),
      10,
    );

    const bodyEl = document.body;
    bodyEl.classList.add('has-pushdown');
    const config = {
      minHight: Number.isNaN(minHeight) ? 100 : minHeight,
      maxHight: Number.isNaN(maxHeight) ? 400 : maxHeight,
      currentHight: pushdownEl.offsetHeight,
      bodyMT: 0,
    };
    let lastScrollTop = 0;
    let lastScrollDif = 0;
    const scrollMax = config.maxHight - config.minHight;
    let scroll = window.pageYOffset;

    const handleScroll = () => {
      scroll = window.pageYOffset;
      if (scroll < scrollMax) {
        lastScrollDif = scroll - lastScrollTop;
        lastScrollTop = scroll <= 0 ? 0 : scroll; // For Mobile or negative scrolling
        config.currentHight -= lastScrollDif;
        config.bodyMT += lastScrollDif;
        if (
          config.currentHight >= config.minHight &&
          config.currentHight <= config.maxHight
        ) {
          pushdownEl.style.height = `${config.currentHight}px`;
          bodyEl.style.marginTop = `${config.bodyMT}px`;
        }
      } else {
        pushdownEl.style.height = `${config.minHight}px`;
        bodyEl.style.marginTop = `${scrollMax}px`;
      }
    };
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.body.classList.remove('has-pushdown');
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AdUnit
      id="pushdown"
      className={`${style.pushdown} gads-pushdown`}
      size={size}
      loadImmediately
      ref={pushdownRef}
    />
  );
};