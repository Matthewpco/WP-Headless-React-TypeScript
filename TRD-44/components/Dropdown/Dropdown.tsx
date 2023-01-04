import React, { ComponentType, FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Link } from '../Link';
import { List } from '../List';
import AngleDown from '../../assets/icons/angle-down.svg';
import { useHandleClickOutside } from './useHandleClickOutside';
import styles from './Dropdown.module.scss';

export interface DropdownItem {
  label: string;
  url?: string;
  target?: string;
  value?: string;
}

export interface DropdownProps {
  items: DropdownItem[];
  initialValue: DropdownItem;
  onChange?: (value: DropdownItem) => void;
  className?: string;
  classNameDropdown?: string;
  arrowIcon?: ComponentType;
}

export const Dropdown: FC<DropdownProps> = ({
  items,
  initialValue,
  onChange,
  className,
  classNameDropdown,
  arrowIcon: ArrowIcon = AngleDown,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isOpened, setIsOpened] = useState(false);
  const wrapperRef = useRef(null);
  useHandleClickOutside(wrapperRef, () => setIsOpened(false));

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <ul ref={wrapperRef} className={cx(className, styles.dropdownWrapper)}>
      <button
        className={styles.dropdownOpenButton}
        onClick={() => setIsOpened(!isOpened)}
      >
        <span className={styles.initialValue}>{value?.label}</span>
        <ArrowIcon
          className={isOpened ? styles.angleDown : styles.angleRight}
        />
      </button>
      <section
        className={cx(classNameDropdown, styles.dropdownOptionsGroup, {
          [styles.dropdownOptionsGroupHidden]: !isOpened,
        })}
      >
        <List<DropdownItem>
          items={items}
          render={(item) => (
            <button
              key={item.label}
              className={styles.dropdownOption}
              onClick={() => {
                setValue(item);
                onChange?.(item);
                setIsOpened(false);
              }}
            >
              {item.url && (
                <Link href={item.url} target={item.target}>
                  <li className={styles.dropdownOptionText}>{item.label}</li>
                </Link>
              )}
              {!item.url && (
                <li className={styles.dropdownOptionText}>{item.label}</li>
              )}
            </button>
          )}
        />
      </section>
    </ul>
  );
};
