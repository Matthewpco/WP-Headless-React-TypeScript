import React, { FC } from 'react';
import cx from 'classnames';
import styles from './SponsorHeading.module.scss';
import { SponsoredData } from '../../../graphql/getSponseredPage';
import { useHost } from '../../../generic/hooks';
import { DropdownMarket } from '../../AuthorPage/AuthorHeading/DropdownMarket';
import { DropdownItem } from '../../Dropdown/Dropdown';

export interface SponsorHeadingProps {
  className?: string;
  sponsor: SponsoredData;
  market: string | undefined;
  setMarket: (value: string | undefined) => void;
}

export const SponsorHeading: FC<SponsorHeadingProps> = ({
  className,
  sponsor,
  market,
  setMarket,
}) => {
  const {
    markets,
    logoImageUri,
    name,
    description,
    advertiserFields: { notShowLogo },
  } = sponsor ?? {};

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

  const hostName = useHost();
  const showSponsor = !notShowLogo;
  const imgSponsor = `${hostName}${logoImageUri}`;

  return (
    <section className={cx(styles.root, className)}>
      <div className={styles.container}>
        {showSponsor && (
          <div className={cx(styles.block, styles.blockCenter)}>
            <span>Sponsored by:</span>
            <img
              className={styles.logoImg}
              src={imgSponsor}
              alt={name}
              loading="lazy"
            />
            <div className={styles.description}>{description}</div>
          </div>
        )}

        <div className={cx(styles.block, styles.blockRight)}>
          <DropdownMarket
            initialValue={activeMarket}
            items={dropdownItems}
            className={styles.markets}
            onChange={({ value }) => setMarket(value)}
          />
        </div>
      </div>
    </section>
  );
};
