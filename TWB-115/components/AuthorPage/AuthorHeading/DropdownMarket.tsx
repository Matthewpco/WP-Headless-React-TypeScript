import React, { FC } from 'react';
import cx from 'classnames';
import styles from './DropdownMarket.module.scss';
import TriangleDown from '../../../assets/icons/triangle-down.svg';
import { Dropdown, DropdownProps } from '../../Dropdown';

export interface DropdownMarketProps
  extends Pick<DropdownProps, 'items' | 'onChange'>,
    Partial<Pick<DropdownProps, 'initialValue'>> {
  className?: string;
}

export const DropdownMarket: FC<DropdownMarketProps> = ({
  items,
  initialValue,
  className,
  onChange,
}) => (
  <Dropdown
    className={cx(styles.markets, className)}
    classNameDropdown={styles.marketsDropdown}
    items={items}
    initialValue={initialValue || items[0]}
    onChange={onChange}
    arrowIcon={TriangleDown}
  />
);
