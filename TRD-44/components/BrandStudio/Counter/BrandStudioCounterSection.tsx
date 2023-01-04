import React, { FC } from 'react';
import cx from 'classnames';
import styles from './BrandStudioCounterSection.module.scss';
import { List } from '../../List';

export interface CounterSectionColumn {
  prefix: string;
  number: string;
  suffix: string;
  description: string;
}

export interface BrandStudioCounterSectionProps {
  backgroundColor: string;
  title: string;
  animationTime: string;
  lightMode: string;
  columns: CounterSectionColumn[];
}

const SectionColumn: FC<CounterSectionColumn> = ({
  description,
  prefix,
  suffix,
  number,
}) => (
  <div className={styles.column}>
    <p className={styles.columnValue}>
      {prefix && <span className={styles.columnPrefix}>{prefix}</span>}
      {number && <span className={styles.columnNumber}>{number}</span>}
      {suffix && <span className={styles.columnSuffix}>{suffix}</span>}
    </p>
    {description && <p className={styles.columnTitle}>{description}</p>}
  </div>
);

const renderColumn = (item: CounterSectionColumn) => (
  <SectionColumn key={item.description} {...item} />
);

export const BrandStudioCounterSection: FC<BrandStudioCounterSectionProps> = ({
  backgroundColor,
  title,
  columns,
  lightMode,
}) => (
  <section
    className={cx({
      [styles.root]: true,
      [styles.rootLight]: lightMode === '1',
    })}
    style={{ backgroundColor }}
  >
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.columns}>
      <List items={columns} render={renderColumn} />
    </div>
  </section>
);
