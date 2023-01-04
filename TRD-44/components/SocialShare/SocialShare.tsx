import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { SocialLinks } from '../SocialLinks';
import styles from './SocialShare.module.scss';
import { generateSocialShareLinks } from './generateSocialShareLinks';
import { SocialLinksItem } from '../SocialLinks/SocialLinks';
import { SocialShareProps } from './SocialShareProps';

export const SocialShare: FC<SocialShareProps> = ({
  sharedUrl,
  sharedTitle,
  className,
  shortVersion = false,
  showTitle = true,
  title = 'SHARE THIS ARTICLE',
}) => {
  const [socialLinkItems, setSocialLinkItems] = useState<SocialLinksItem[]>([]);

  useEffect(() => {
    setSocialLinkItems(
      generateSocialShareLinks({ sharedUrl, sharedTitle, shortVersion }),
    );
  }, []);

  return (
    <section className={cx(styles.root, className)}>
      {showTitle && <p className={styles.title}>{title}</p>}
      <SocialLinks items={socialLinkItems} className={styles.socialLinks} />
    </section>
  );
};
