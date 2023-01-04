import React, { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './QuickLinks.module.scss';
import { List } from '../../List';
import { Button } from '../../Button';

interface QuickLink {
  section_id: string;
  link_name: string;
}

export interface Links {
  links: QuickLink[];
}

const renderButton = (item: string, onclick: () => void) => (
  <li key={item}>
    <Button
      className={styles.categoryButton}
      onClick={onclick}
    >
      {item}
    </Button>
  </li>
);

export const QuickLinks: FC<Links> = ({links}) => {
  const { push } = useRouter();

  const onChange = (id: string) => {
    push(
      `#${id}`,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Quicklinks:</span>
      </div>
      <div className={styles.listContainer}>
        <ul className={styles.categoryList}>
          <List
            items={links}
            render={(item) =>
              renderButton(item.link_name, () => onChange(item.section_id))}
          />
        </ul>
      </div>
    </div>
  );
};
