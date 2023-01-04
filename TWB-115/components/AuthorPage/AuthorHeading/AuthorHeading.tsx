import React, { FC, useMemo, useState } from 'react';
import cx from 'classnames';
import styles from './AuthorHeading.module.scss';
import { IdSharable, SocialLinks } from '../../SocialLinks';
import { Button } from '../../Button';
import Envelope from '../../../assets/icons/envelope-closed.svg';
import NoAvatar from '../../../assets/icons/no-avatar.svg';
import { AuthorData } from '../../../graphql/getAuthor';
import { SocialLinksItem } from '../../SocialLinks/SocialLinks';
import { FormToAuthor } from '../FormToAuthor';
import { PropsField } from '../../../graphql';
import { DropdownMarket } from './DropdownMarket';
import { useHost } from '../../../generic/hooks';
import { DropdownItem } from '../../Dropdown/Dropdown';

export interface AuthorHeadingProps {
  className?: string;
  author: AuthorData;
  propsField: PropsField[];
  market: string | undefined;
  setMarket: (value: string | undefined) => void;
}

const generateSocialLinks = ({
  twitterProfileUrl,
  linkedinProfileUrl,
}: Pick<
  AuthorData,
  'twitterProfileUrl' | 'linkedinProfileUrl'
>): SocialLinksItem[] => {
  const socialLinks: SocialLinksItem[] = [];

  if (twitterProfileUrl) {
    socialLinks.push({
      url: twitterProfileUrl,
      icon: IdSharable.twitter,
    });
  }

  if (linkedinProfileUrl) {
    socialLinks.push({
      url: linkedinProfileUrl,
      icon: IdSharable.linkedin,
    });
  }

  return socialLinks;
};

export const AuthorHeading: FC<AuthorHeadingProps> = ({
  className,
  propsField,
  author,
  market,
  setMarket,
}) => {
  const {
    databaseId,
    firstName,
    lastName,
    description,
    profileImageUri,
    twitterProfileUrl,
    linkedinProfileUrl,
    markets,
  } = author ?? {};

  const [shadow, setShadow] = useState(false);
  const hostName = useHost();

  const fullName = `${firstName} ${lastName}`;

  const socialLinks = useMemo(
    () => generateSocialLinks({ twitterProfileUrl, linkedinProfileUrl }),
    [twitterProfileUrl, linkedinProfileUrl],
  );

  const dropdownItems: DropdownItem[] =
    markets?.map(({ label, value }) => ({
      // omitting uri to avoid hyperlinks
      label,
      value,
    })) ?? [];

  dropdownItems.unshift({
    label: 'All Markets',
    value: '',
  });

  const activeMarket = dropdownItems.find(({ value }) => value === market);

  return (
    <section className={cx(styles.root, className)}>
      <div className={styles.container}>
        <div className={cx(styles.block, styles.blockLeft)}>
          <div className={styles.profileInfo}>
            {profileImageUri ? (
              <img
                src={`${hostName}${profileImageUri}`}
                alt={fullName}
                className={styles.avatar}
                loading="lazy"
              />
            ) : (
              <NoAvatar className={styles.avatar} />
            )}
            <h1 className={styles.name}>{fullName}</h1>
          </div>

          {socialLinks.length > 0 && (
            <SocialLinks className={styles.socialLinks} items={socialLinks} />
          )}
        </div>

        <div className={cx(styles.block, styles.blockRight)}>
          <Button
            className={styles.contactButton}
            startIcon={Envelope}
            bordered
            onClick={() => {
              setShadow(true);
              document.body.classList.add('blocked-2');
              if (window.scrollY < 300) {
                window.scrollTo(0, 300);
              }
            }}
          >
            <span className={styles.contactButtonText}>Contact Author</span>
          </Button>

          <DropdownMarket
            initialValue={activeMarket}
            items={dropdownItems}
            className={styles.markets}
            onChange={({ value }) => setMarket(value)}
          />
        </div>
      </div>

      <div className={shadow ? styles.shadowOpen : styles.shadowBlock} />
      <FormToAuthor
        propsField={propsField}
        authorName={fullName}
        className={shadow ? styles.formToAuthorOpen : styles.shadowBlock}
        onClose={() => {
          setShadow(false);
          document.body.classList.remove('blocked-2');
        }}
        databaseId={databaseId}
      />

      {description && <p className={styles.desc}>{description}</p>}
    </section>
  );
};
