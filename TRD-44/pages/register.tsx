import React from 'react';
import { GetServerSideProps } from 'next';
import { getBasePageProps } from '../generic/getBasePageProps';
import { RegisterPage } from '../components/RegisterPage/RegisterPage';

/**
 * TRD Register page.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} page component.
 */
const Register = (): React.ReactElement => <RegisterPage />;

export const getServerSideProps: GetServerSideProps<any, any> = async () => {
  const [basePageProps] = await Promise.all([
    getBasePageProps({ param: 'register' }),
  ]);

  return {
    props: {
      ...basePageProps,
    },
  };
};

export default Register;
