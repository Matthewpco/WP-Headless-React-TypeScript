import React from 'react';
import { GetServerSideProps} from 'next';
import { getBasePageProps } from '../generic/getBasePageProps';
import { NewsLetterPage } from '../components/NewsLetterPage/NewsLetterPage';

export const getServerSideProps: GetServerSideProps<any, any> = async () => {
    const [basePageProps] = await Promise.all([
      getBasePageProps({ param: 'newsletter' }),
    ]);

    return {
      props: {
        ...basePageProps,
      },
    };
  };

const Page = () => (
  <NewsLetterPage />
);

export default Page;
