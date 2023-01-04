import React, { FC } from 'react';
import parse from 'html-react-parser';
import styles from './EventCard.module.scss';
import { INextEvent } from '../Single/getSingleIndustryEvent';
import EventIcon from '../../../assets/icons/event.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import { Link } from '../../Link';
import { Button } from '../../Button';
import { useHost } from '../../../generic/hooks';

const formattingDay: Intl.DateTimeFormatOptions = {
  day: 'numeric',
};

const formattingMonth: Intl.DateTimeFormatOptions = {
  month: 'long',
};

export interface EventCardProps extends INextEvent {}

export const EventCard: FC<EventCardProps> = ({
  title,
  featuredImageUri,
  excerpt,
  uri,
  eventInformation: { startDate, venue },
}) => {
  const name = venue?.[0]?.name;
  const date = new Date(startDate);
  const hostName = useHost();

  return (
    <div className={styles.root}>
      <figure className={styles.figure}>
        <img
          className={styles.image}
          src={`${hostName}${featuredImageUri}`}
          alt={title}
          loading="lazy"
        />
      </figure>
      <div className={styles.content}>
        <div className={styles.date}>
          <EventIcon />
          <div className={styles.dateDivider} />
          <time className={styles.time}>
            <span>{date.toLocaleDateString('en-US', formattingMonth)}</span>
            <span>{date.toLocaleDateString('en-US', formattingDay)}</span>
          </time>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.location}>
            <LocationIcon />
            <span>{name}</span>
          </p>
          <div className={styles.excerpt}>{parse(excerpt)}</div>
          <Link href={`${hostName}${uri}`} className={styles.link}>
            <Button color="primary" rounded>
              LEARN MORE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
