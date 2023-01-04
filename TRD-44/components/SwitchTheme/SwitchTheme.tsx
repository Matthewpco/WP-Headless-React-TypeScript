import React, { FC, MouseEventHandler, useContext } from 'react';
import classNames from 'classnames';
import styles from './SwitchTheme.module.scss';
import Moon from '../../assets/icons/moon.svg';
import Sun from '../../assets/icons/sun.svg';
import { ContextTheme } from '../../generic/theme/ContextTheme';
import { IdTheme } from '../../generic/theme/IdTheme';

export interface SwitchThemeProps {
  className?: string;
}

export const SwitchTheme: FC<SwitchThemeProps> = ({ className }) => {
  const { theme, onChange } = useContext(ContextTheme);

  const on = theme === IdTheme.Light;
  const onClick: MouseEventHandler<HTMLButtonElement> = () =>
    onChange(on ? IdTheme.Dark : IdTheme.Light);

  return (
    <button
      onClick={onClick}
      className={classNames(styles.root, className, {
        [styles.rootActive]: on,
      })}
      type="button"
    >
      <div className={styles.highlight} />
      <Moon className={classNames(styles.icon, styles.moon)} />
      <Sun className={classNames(styles.icon, styles.sun)} />
    </button>
  );
};
