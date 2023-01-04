import React, { FC } from 'react';
import cx from 'classnames';
import styles from './CompaniesAndPeople.module.scss';
import { CompaniesAndPeopleLinks } from '../CompaniesAndPeopleLinks';
import { CompaniesAndPeopleLink } from '../../graphql';

interface CompaniesAndPeopleProps {
  className?: string;
  companies: CompaniesAndPeopleLink[];
  people: CompaniesAndPeopleLink[];
}

export const CompaniesAndPeople: FC<CompaniesAndPeopleProps> = ({
  className,
  companies,
  people,
}) => (
  <section className={cx(styles.root, className)}>
    <p className={styles.title}>COMPANIES AND PEOPLE</p>
    <CompaniesAndPeopleLinks
      items={[...companies, ...people]}
      className={styles.companiesAndPeopleLinks}
    />
  </section>
);
