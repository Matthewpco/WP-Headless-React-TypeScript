import React from 'react';
import styles from './SearchPage.module.scss';

export const SearchPage = () => (
  <div id="queryly_advanced_container">
    <div id="faceteddata" className={styles.faceteddata} />
    <div id="resultdata" className={styles.resultdata} />
  </div>
);
