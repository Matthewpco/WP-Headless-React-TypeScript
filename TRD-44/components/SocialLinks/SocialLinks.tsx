import React, { FC, MouseEventHandler, useCallback, useState } from 'react';
import cx from 'classnames';
import { List } from '../List';
import { SocialLinkItem } from '../../graphql';
import styles from './SocialLinks.module.scss';
import imgFacebook from '../../assets/icons/facebook.svg';
import imgInstagram from '../../assets/icons/instagram.svg';
import imgLinkedIn from '../../assets/icons/linkedin.svg';
import imgNewsletter from '../../assets/icons/newsletter.svg';
import imgTwitter from '../../assets/icons/twitter.svg';
import imgYoutube from '../../assets/icons/youtube.svg';
import imgShare from '../../assets/icons/share.svg';
import { IdSharable } from './IdSharable';

export interface SocialLinksItem
  extends Pick<SocialLinkItem, 'icon'>,
    Partial<Pick<SocialLinkItem, 'url'>> {
  onClick?: () => void;
  successTooltipText?: string;
}

const titleSvgMap = new Map([
  [IdSharable.facebook, imgFacebook],
  [IdSharable.instagram, imgInstagram],
  [IdSharable.linkedin, imgLinkedIn],
  [IdSharable.newsletter, imgNewsletter],
  [IdSharable.share, imgShare],
  [IdSharable.twitter, imgTwitter],
  [IdSharable.youtube, imgYoutube],
]);

const renderSocialLink = (
  { icon, url, onClick, successTooltipText }: SocialLinksItem,
  index: number,
) => {
  const [isSuccessTooltipShown, setIsSuccessTooltipShown] = useState(false);
  const Icon = titleSvgMap.get(icon);

  const onClickAnchor: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }

      if (successTooltipText) {
        setIsSuccessTooltipShown(true);
        setTimeout(() => setIsSuccessTooltipShown(false), 2000);
      }
    },
    [onClick, successTooltipText],
  );

  return (
    <li className={styles.listItem} key={index}>
      {isSuccessTooltipShown && successTooltipText && (
        <div className={styles.listItemTooltip}>{successTooltipText}</div>
      )}
      <a
        className={styles.listItemAnchor}
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={onClickAnchor}
      >
        <Icon />
      </a>
    </li>
  );
};

export interface SocialLinksProps {
  className?: string;
  classNameList?: string;
  items: SocialLinksItem[];
}

export const SocialLinks: FC<SocialLinksProps> = ({
  items,
  className,
  classNameList,
}) => (
  <nav className={cx(styles.root, className)}>
    <ul className={cx(styles.list, classNameList)}>
      <List items={items} render={renderSocialLink} />
    </ul>
  </nav>
);
