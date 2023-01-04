import React, { FC } from 'react';
import { IndustryEventSingleHeading } from './IndustryEventSingleHeading';
import { DataSingleIndustryEvent, INextEvent } from './getSingleIndustryEvent';
import { Container } from '../../Container';
import styles from './IndustryEventSingle.module.scss';
import { List } from '../../List';
import { EventCard } from '../EventCard/EventCard';
import { ArticleHead } from '../../ArticleHead';

export interface IIndustryEventSingle {
  data: DataSingleIndustryEvent;
}

const renderItem = (data: INextEvent) => <EventCard key={data.id} {...data} />;

export const IndustryEventSingle: FC<IIndustryEventSingle> = ({
  data: { seo, ...data },
}) => (
  <Container>
    <ArticleHead seo={seo} />
    <main className={styles.root}>
      <IndustryEventSingleHeading {...data} />
      <div className={styles.list}>
        <List items={data.nextEvents ?? []} render={renderItem} />
      </div>
    </main>
  </Container>
);
