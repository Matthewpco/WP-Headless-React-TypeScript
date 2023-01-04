import React, { FC } from 'react';
import cx from 'classnames';
import { Checkbox, CheckboxProps } from './Checkbox';
import styles from './CheckboxLabel.module.scss';

export interface CheckboxLabelProps extends CheckboxProps {}

export const CheckboxLabel: FC<CheckboxLabelProps> = ({
  children,
  className,
  ...props
}) => (
  <label className={cx(styles.root, className)}>
    <Checkbox {...props} className={styles.checkbox} />
    <span className={styles.label}>{children}</span>
  </label>
);
