import React, { DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';
import cx from 'classnames';
import { List } from '../List';
import styles from './Select.module.scss';

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  initialValue?: string;
  title?: string;
  options: string[];
}

export const Select: FC<SelectProps> = ({
  options,
  initialValue,
  title,
  className,
  ...props
}) => (
  <select {...props} className={cx(styles.root, className)}>
    {title && (
      <option disabled value="" selected={!initialValue}>
        {title}
      </option>
    )}
    <List
      items={options}
      render={(option) => (
        <option key={option} selected={initialValue === option} value={option}>
          {option}
        </option>
      )}
    />
  </select>
);
