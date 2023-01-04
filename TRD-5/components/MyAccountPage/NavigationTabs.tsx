import React, { FC } from 'react';
import cx from 'classnames';
import { Container } from '../Container';
import { List } from '../List';

import styles from './NavigationTabs.module.scss';

export interface NavigationTabsProps {
  values: string[];
  value: string;
  onChange: (tabName: string) => void;
}

export const NavigationTabs: FC<NavigationTabsProps> = ({
  values,
  value,
  onChange,
}) => {
  const renderTabLabel = (tabName: string) => (
    <li
      key={tabName}
      className={cx(styles.navigationTab, { [styles.navigationTabActive]: tabName === value })}
    >
      <button onClick={() => onChange(tabName)}>
        {tabName}
      </button>
    </li>
  );

  return (
    <Container className={styles.root}>
      <ul className={styles.navigationTabs}>
        <List items={values} render={renderTabLabel} />
      </ul>
    </Container>
  );
};
