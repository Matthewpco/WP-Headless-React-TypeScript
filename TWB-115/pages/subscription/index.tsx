import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { DigitalSubscriptionPage } from '../../components/DigitalSubscriptionPage/DigitalSubscriptionPage';
import { SubscriptionPage } from '../../components/SubscriptionPage/SubscriptionPage';
import { BasePageProps, getBasePageProps } from '../../generic/getBasePageProps';

const Page: NextPage<BasePageProps> = () => {
  const router = useRouter();
  const [pageComponent, setPageComponent] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    switch (router.query.utm_content) {
      case 'digital':
        setPageComponent(<DigitalSubscriptionPage />);
        return;
      default:
        setPageComponent(<SubscriptionPage />);
    }
  }, [router.query]);

  return pageComponent;
};

export const getServerSideProps = () => ({ props: getBasePageProps({ param: 'subscription'}) });

export default Page;
