import React from 'react';
import { MyAccountPage as MyAccountPageLayout } from '../../components/MyAccountPage/MyAccountPage';
import styles from './MyAccountPage.module.scss';
import { getBasePageProps } from '../../generic/getBasePageProps';

const MyAccountPage = () => (
  <div className={styles.container}>
    <MyAccountPageLayout />
  </div>
);

export const getServerSideProps = () => ({ props: getBasePageProps({ param: 'my-account' }) });

export default MyAccountPage;
