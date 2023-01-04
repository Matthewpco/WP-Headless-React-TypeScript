import React from 'react';
import { GetServerSideProps } from 'next';
import { getBasePageProps } from '../generic/getBasePageProps';
import { SignOutPage } from '../components/SignOutPage/SignOutPage';

/**
 * TRD Sign Out page.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} page component.
 */
const SignOut = (): React.ReactElement => <SignOutPage />;

export const getServerSideProps: GetServerSideProps<any, any> = async () => {
  const [basePageProps] = await Promise.all([
    getBasePageProps({ param: 'sign-out' }),
  ]);

  return {
    props: {
      ...basePageProps,
    },
  };
};

export default SignOut;
