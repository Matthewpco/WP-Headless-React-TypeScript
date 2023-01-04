import React from 'react';
import { SearchPage as SearchPageLayout } from '../../components/SearchPage/SearchPage';
import { getBasePageProps } from '../../generic/getBasePageProps';

const SearchPage = () => (
  <div>
    <SearchPageLayout />
  </div>
);

export const getServerSideProps = () => ({ props: getBasePageProps({ params: 'search' }) });

export default SearchPage;
