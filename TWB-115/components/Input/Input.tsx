import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Input.module.scss';
import { Size } from '../../generic/types';

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'size'
  > {
  size?: Size;
  fullWidth?: boolean;
  rounded?: boolean;
}

const sizeMap = new Map<Size, string>([
  ['medium', styles.medium],
  ['large', styles.large],
]);

export const Input: FC<InputProps> = ({
  size = 'medium',
  fullWidth = false,
  rounded = false,
  className,
  ...props
}) => (
  <input
    {...props}
    className={cx(styles.root, sizeMap.get(size), className, {
      [styles.fullWidth]: fullWidth,
      [styles.rounded]: rounded,
    })}
  />
);
