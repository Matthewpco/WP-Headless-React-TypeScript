import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Subheading.module.scss';

export interface SubheadingProps {
  title: string;
  className?: string;
}

export const Subheading: FC<SubheadingProps> = ({ title, className }) => (
  <p className={cx(styles.root, className)}>{title}</p>
);
