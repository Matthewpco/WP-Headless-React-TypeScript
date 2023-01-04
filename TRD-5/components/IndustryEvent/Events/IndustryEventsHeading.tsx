import React, { FC } from 'react';
import parse from 'html-react-parser';
import styles from './IndustryEventsHeading.module.scss';

export interface IndustryEventsHeadingProps {
  title: string;
  content: string;
}

export const IndustryEventsHeading: FC<IndustryEventsHeadingProps> = ({
  content,
  title,
}) => (
  <header className={styles.root}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.content}>{parse(content ?? '')}</div>
  </header>
);
