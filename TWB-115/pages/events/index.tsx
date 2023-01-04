import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { PageEvents } from '../../components/PageEvents/PageEvents';
import {
  DataGetEvents,
  getEvents,
  ResponseGetEvents,
} from '../../components/PageEvents/getEvents';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';

export interface EventsPageParams {
  [key: string]: string;
}

export interface EventsPageProps extends BasePageProps {
  events: DataGetEvents;
}

export const getServerSideProps: GetServerSideProps<
  EventsPageProps,
  EventsPageParams
> = async () => {
  const [basePageProps, responseEvents] = await Promise.all([
    getBasePageProps({ param: 'events' }),
    client.query<ResponseGetEvents>({
      query: getEvents,
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      events: responseEvents?.data?.pageByType,
    },
  };
};

const Page: NextPage<EventsPageProps> = ({ events }) => (
  <PageEvents events={events} />
);

export default Page;
