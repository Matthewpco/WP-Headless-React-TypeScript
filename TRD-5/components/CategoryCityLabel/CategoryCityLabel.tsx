import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './CategoryCityLabel.module.scss';
import { configMarket, defaultMarketConfig } from './configMarket';

export type CategoryWithCityVariant = {
  slug: string;
  category: string;
  city: string;
};

export type SingleCategoryVariant = {
  slug: string;
  category: string;
  city?: undefined;
};

export type SingleCityVariant = {
  slug: string;
  category?: undefined;
  city: string;
};

export type CategoryCityLabelProps = (
  | CategoryWithCityVariant
  | SingleCategoryVariant
  | SingleCityVariant
) & {
  className?: string;
};

export const CategoryCityLabel: FunctionComponent<CategoryCityLabelProps> =
  React.memo<CategoryCityLabelProps>(({ slug, category, city, className }) => {
    const colorConfig = configMarket.get(slug) ?? defaultMarketConfig;

    return (
      <div className={cx(className, styles.categoryCityLabelWrapper)}>
        {category && (
          <div
            className={styles.categoryLabel}
            style={{ color: colorConfig?.color }}
          >
            {category}
          </div>
        )}
        {city && (
          <div
            className={styles.cityLabel}
            style={{
              backgroundColor: colorConfig?.background,
              color: colorConfig?.color,
            }}
          >
            {city}
          </div>
        )}
      </div>
    );
  });
