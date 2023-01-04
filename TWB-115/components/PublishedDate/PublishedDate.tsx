import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './PublishedDate.module.scss';

export type PublishedDateProps = {
  date: Date;
  className?: string;
  formatting?: Intl.DateTimeFormatOptions;
  isArchive?: boolean;
};

const defaultFormatting: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export const PublishedDate: FunctionComponent<PublishedDateProps> =
  React.memo<PublishedDateProps>(
    ({
      date,
      className,
      formatting = defaultFormatting,
      isArchive = false,
    }) => (
      <div className={cx(className, styles.publishingDate)}>
        {isArchive && 'Archive'}
        {!isArchive && date.toLocaleDateString('en-US', formatting)}
      </div>
    ),
  );
