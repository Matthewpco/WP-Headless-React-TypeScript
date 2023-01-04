import React from 'react';
import { GetServerSideProps } from 'next';
import { getBasePageProps } from '../generic/getBasePageProps';
import { PasswordResetPage } from '../components/PasswordResetPage/PasswordResetPage';

/**
 * TRD Password ResetPage page.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} page component.
 */
const PasswordReset = (): React.ReactElement => <PasswordResetPage />;

export const getServerSideProps: GetServerSideProps<any, any> = async () => {
  const [basePageProps] = await Promise.all([
    getBasePageProps({ param: 'password-reset' }),
  ]);

  return {
    props: {
      ...basePageProps,
    },
  };
};

export default PasswordReset;
