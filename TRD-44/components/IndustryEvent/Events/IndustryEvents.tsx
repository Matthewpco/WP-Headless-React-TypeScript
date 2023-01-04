import React, { FC } from 'react';
import styles from './IndustryEvents.module.scss';
import { DataGetIndustryEvents } from './getIndustryEvents';
import { Container } from '../../Container';
import { IndustryEventsHeading } from './IndustryEventsHeading';
import { List } from '../../List';
import { INextEvent } from '../Single/getSingleIndustryEvent';
import { EventCard } from '../EventCard/EventCard';
import { IndustryEventsFooter } from './IndustryEventsFooter';
import { ArticleHead } from '../../ArticleHead';
import { useAds } from '../../Ads/useAds';
import { initAdsHomepage } from '../../Ads/initAdsHomepage';

export interface IndustryEventsProps {
  data: DataGetIndustryEvents;
}

const renderItem = (data: INextEvent) => <EventCard key={data.id} {...data} />;

export const IndustryEvents: FC<IndustryEventsProps> = ({ data }) => {
  useAds(initAdsHomepage);

  return (
    <Container>
      {/* TODO: define suitable title and fullHead defaults. */}
      <ArticleHead seo={data?.seo ?? { title: '', fullHead: '' }} />
      <main className={styles.root}>
        <IndustryEventsHeading
          title={data?.title}
          content={data?.contentFiltered}
        />
        <section>
          <h2 className={styles.title}>UPCOMING EVENTS</h2>
          <div className={styles.list}>
            <List items={data?.upcomingEvents ?? []} render={renderItem} />
          </div>
        </section>
        <IndustryEventsFooter data={data?.bottomSection} />
      </main>
    </Container>
  );
};
