import classNames from 'classnames';
import React, { FC, MutableRefObject } from 'react';
import styles from './Footer.module.scss';
import { SocialLinks } from '../SocialLinks';
import { SwitchTheme } from '../SwitchTheme';
import { List } from '../List';
import { FooterMenuItem, SocialLinkItem } from '../../graphql';

export interface FooterProps {
  items: FooterMenuItem[];
  itemsMobile?: FooterMenuItem[];
  socialItems: SocialLinkItem[];
  copyrightText: string;
  addressText: string;
  phoneText: string;
  footerRef: MutableRefObject<HTMLDivElement | null>;
}

const renderLink = ({ label, url, id, target }: FooterMenuItem) => (
  <li key={id} className={classNames(styles.listItem)}>
    <a className={classNames(styles.listItemAnchor)} href={url} target={target}>
      {label}
    </a>
  </li>
);

export const Footer: FC<FooterProps> = ({
  items,
  copyrightText,
  addressText,
  phoneText,
  socialItems,
  footerRef,
}) => (
  <footer className={styles.root} ref={footerRef}>
    <div className={styles.section}>
      <SwitchTheme className={styles.switchTheme} />

      <nav className={classNames(styles.nav, styles.mobileNav)}>
        <ul className={classNames(styles.list, styles.listMobile)}>
          <List items={items} render={renderLink} />
        </ul>
      </nav>
    </div>

    <div className={styles.text}>
      <p className={styles.copy}>{copyrightText}</p>

      <address className={styles.address}>
        {`${addressText} Phone: ${phoneText}`}
      </address>
    </div>

    <SocialLinks items={socialItems} classNameList={styles.socialLinksList} />
  </footer>
);
