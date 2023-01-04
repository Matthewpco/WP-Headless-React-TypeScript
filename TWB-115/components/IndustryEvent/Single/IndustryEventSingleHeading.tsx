import React, { FC } from 'react';
import cx from 'classnames';
import styles from './IndustryEventSingleHeading.module.scss';
import { Button } from '../../Button';
import { ArticleBody } from '../../ArticleBody';
import { Link } from '../../Link';
import { SocialShare } from '../../SocialShare';
import { PublishedDate } from '../../PublishedDate';
import { DataSingleIndustryEvent } from './getSingleIndustryEvent';
import { ClientSide } from '../../ClientSide';
import { useHost } from '../../../generic/hooks';

const formatting: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export interface IIndustryEventSingleHeading
  extends Pick<
    DataSingleIndustryEvent,
    | 'title'
    | 'uri'
    | 'contentFiltered'
    | 'featuredImageUri'
    | 'eventInformation'
    | 'eventsCptFields'
  > {}

export const IndustryEventSingleHeading: FC<IIndustryEventSingleHeading> = ({
  title,
  uri,
  contentFiltered,
  featuredImageUri,
  eventInformation: { startDate, endDate, venue },
  eventsCptFields: { registerNowUrl },
}) => {
  const { name, venueDetails } = venue?.[0] ?? {};
  const hostName = useHost();

  return (
    <header className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <time className={styles.date}>
          <PublishedDate
            className={cx(styles.dateItem)}
            date={new Date(startDate)}
            formatting={formatting}
          />
          <span> - </span>
          <PublishedDate
            className={cx(styles.dateItem)}
            date={new Date(endDate)}
            formatting={formatting}
          />
        </time>
        <address className={styles.address}>
          <p>{name}</p>
          <p>{venueDetails?.fullAddress}</p>
        </address>
        <ClientSide>
          <SocialShare
            title="SHARE THIS EVENT"
            sharedUrl={`${hostName}${uri}`}
            sharedTitle={title}
          />
        </ClientSide>
        <ArticleBody
          className={styles.excerpt}
          content={contentFiltered ?? ''}
        />
        <Link href={registerNowUrl} target="_blank">
          <Button color="primary" rounded>
            REGISTER NOW
          </Button>
        </Link>
      </div>
      <figure className={styles.figure}>
        <img
          src={`${hostName}${featuredImageUri}`}
          className={styles.image}
          alt={title}
          loading="lazy"
        />
      </figure>
    </header>
  );
};
