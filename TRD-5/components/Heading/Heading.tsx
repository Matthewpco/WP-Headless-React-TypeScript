import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Heading.module.scss';

export interface HeadingProps {
  className?: string;
  title: string;
}

export const Heading: FC<HeadingProps> = ({ title, className }) => (
  <h1 className={cx(styles.root, className)}>{title}</h1>
);
