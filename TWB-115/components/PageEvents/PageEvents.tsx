import React, { FC } from 'react';
import cx from 'classnames';
import styles from './PageEvents.module.scss';
import stylesClientList from './ClientList.module.scss';
import { DataGetEvents } from './getEvents';
import { ArticleBody } from '../ArticleBody';
import { Container } from '../Container';
import { Button } from '../Button';
import { Link } from '../Link';
import { List } from '../List';
import { EventCard } from '../IndustryEvent/EventCard/EventCard';
import { ArticleHead } from '../ArticleHead';
import { useHost } from '../../generic/hooks';

export interface PageEventsProps {
  events: DataGetEvents;
}

export const PageEvents: FC<PageEventsProps> = ({ events }) => {
  const eventsPage = events?.page;
  const upcomingEvents = events?.upcomingEvents;
  const bottomSection = events?.bottomSection;
  const hostName = useHost();

  return (
    <Container className={styles.root}>
      {eventsPage?.seo && <ArticleHead seo={eventsPage?.seo} />}

      <section className={styles.heading}>
        <h1 className={styles.headingTitle}>{eventsPage?.title}</h1>
        <p className={styles.headingDesc}>
          {eventsPage?.alternativeHeadline?.subheadline}
        </p>
      </section>

      <section className={styles.events}>
        <h2 className={styles.eventsTitle}>Upcoming Events</h2>
        <div className={styles.eventsList}>
          <List
            items={upcomingEvents?.slice(0, 3) ?? []}
            render={(item) => <EventCard key={item?.id} {...item} />}
          />
        </div>
      </section>

      {bottomSection && (
        <section className={styles.headline}>
          <div className={styles.headlineContent}>
            <h3 className={styles.headlineTitle}>{bottomSection?.title}</h3>
            <p className={styles.headlineDesc}>{bottomSection?.description}</p>
            <Link
              href={bottomSection?.link?.url}
              target={bottomSection?.link?.target}
            >
              <Button color="primary" rounded className={styles.headlineButton}>
                {bottomSection?.link?.title}
              </Button>
            </Link>
          </div>
          <img
            className={styles.headlineImage}
            src={`${hostName}${bottomSection?.imageUri}`}
            alt={bottomSection?.title}
            loading="lazy"
          />
        </section>
      )}

      <ArticleBody
        className={cx(stylesClientList.root)}
        content={events?.page?.contentFiltered ?? ''}
        as="main"
      />
    </Container>
  );
};
