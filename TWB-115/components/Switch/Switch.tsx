import React, { FC, ChangeEventHandler, useState } from 'react';
import classNames from 'classnames';
import styles from './Switch.module.scss';

export interface SwitchProps {
  id?: string;
  className?: string;
  value?: boolean;
  onChange?: (isSelected: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({
  id,
  className,
  value,
  onChange = () => {},
}) => {
  const [isSelected, setSelected] = useState(value);

  const onClick: ChangeEventHandler<HTMLInputElement> = () => {
    onChange(!isSelected);
    setSelected(!isSelected);
  };

  return (
    <label className={classNames(styles.root, {[styles.checked]: isSelected}, className)}>
      <input
        id={id}
        type="checkbox"
        className={styles.checkBox}
        checked={isSelected}
        onChange={onClick}
      />
      <span className={styles.slider} />
    </label>
  );
};
