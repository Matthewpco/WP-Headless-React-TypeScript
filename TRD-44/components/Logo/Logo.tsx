import React, { FC, useContext } from 'react';
import cx from 'classnames';
import { Link } from '../Link';
import styles from './Logo.module.scss';
import { ContextTheme } from '../../generic/theme/ContextTheme';
import { IdTheme } from '../../generic/theme/IdTheme';
import { useHost } from '../../generic/hooks';

export interface LogoProps {
  logoLight: string;
  logoDark: string;
  isShrink?: boolean;
}

enum DefaultLogoThemeUrl {
  Light = '/wp-content/uploads/2022/03/16121141/logo.svg',
  Dark = '/wp-content/uploads/2022/04/05110857/darkLogo.svg',
}

export const Logo: FC<LogoProps> = ({ logoLight, logoDark, isShrink }) => {
  const { theme } = useContext(ContextTheme);
  const themeBasedLogoUrl =
    theme === IdTheme.Dark
      ? logoDark || DefaultLogoThemeUrl.Dark
      : logoLight || DefaultLogoThemeUrl.Light;
  const host = useHost();
  const fullLogoUrl = `${host.startsWith('/') ? '' : host}${themeBasedLogoUrl}`;

  return (
    <Link href="/">
      <img
        className={cx(styles.logoImage, {
          [styles.shrink]: isShrink,
        })}
        alt="The Real Deal Logo"
        src={fullLogoUrl}
      />
    </Link>
  );
};
