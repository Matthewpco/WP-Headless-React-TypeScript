import React from 'react';
import { GetServerSideProps } from 'next';
import { getBasePageProps } from '../generic/getBasePageProps';
import { SignInPage } from '../components/SignInPage/SignInPage';

/**
 * TRD Sign In page.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} page component.
 */
const SignIn = (): React.ReactElement => <SignInPage />;

export const getServerSideProps: GetServerSideProps<any, any> = async () => {
  const [basePageProps] = await Promise.all([
    getBasePageProps({ param: 'sign-in' }),
  ]);

  return {
    props: {
      ...basePageProps,
    },
  };
};

export default SignIn;
