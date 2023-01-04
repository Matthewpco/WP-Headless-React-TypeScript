import React, { FC } from 'react';
import cx from 'classnames';
import styles from './SponsorsLogo.module.scss';
import { Sponsor } from '../../graphql';
import { useHost } from '../../generic/hooks';
import { Link } from '../Link';

export interface SponsorProps {
  className?: string;
  sponsorArr: Sponsor[];
}

const showOneLogo = (
  name: string,
  img: string,
  showSponsoredBy: boolean,
  className: string | undefined,
  url: string,
  hostName: string,
) => (
  <div className={cx(className, styles.oneSponsor)}>
    {showSponsoredBy && <span className={styles.sponsor}>sponsored by:</span>}
    <div>
      <Link href={`${hostName}${url}`} passHref>
        {img ? (
          <img
            src={`${hostName}${img}`}
            alt={name}
            height="45px"
            className={styles.sponsorImg}
            loading="lazy"
          />
        ) : (
          <h2 className={styles.sponsorName}>{name}</h2>
        )}
      </Link>
    </div>
  </div>
);

export const SponsorsLogo: FC<SponsorProps> = ({ sponsorArr, className }) => {
  const hostName = useHost();

  if (sponsorArr.length === 0) {
    return <div />;
  }

  const brand = sponsorArr[0];
  const imgBrand = `${hostName}${brand.logoImageUri}`;
  const showBrandSponsoredBy =
    brand.advertiserFields.notShowSponsoredBy !== true;
  const showBrand = brand.advertiserFields.notShowLogo !== true;

  if (sponsorArr.length === 1) {
    if (!showBrand) return <div />;

    return showOneLogo(
      brand.name,
      brand.logoImageUri,
      showBrandSponsoredBy,
      className,
      brand.uri,
      hostName,
    );
  }

  const sponsor = sponsorArr[1];
  const imgSponsor = `${hostName}${sponsor.logoImageUri}`;
  const sronsorShowSponsoredBy = !sponsor.advertiserFields.notShowSponsoredBy;
  const showSponsor = !sponsor.advertiserFields.notShowLogo;

  if (!showBrand && !showSponsor) return <div />;

  if (showBrand) {
    return showOneLogo(
      brand.name,
      brand.logoImageUri,
      showBrandSponsoredBy,
      className,
      brand.uri,
      hostName,
    );
  }

  if (showSponsor) {
    return showOneLogo(
      sponsor.name,
      sponsor.logoImageUri,
      sronsorShowSponsoredBy,
      className,
      sponsor.uri,
      hostName,
    );
  }

  return (
    <div className={cx(className, styles.sponsorsLogoAll)}>
      <div className={styles.sponsorsBrand}>
        {showBrandSponsoredBy && (
          <div>
            <span className={styles.sponsor}>sponsored by:</span>
          </div>
        )}
        <div>
          <Link href={`${hostName}${brand.uri}`} passHref>
            {brand.logoImageUri ? (
              <img
                src={imgBrand}
                alt={brand.name}
                height="45px"
                loading="lazy"
              />
            ) : (
              <h2 className={styles.sponsorName}>{brand.name}</h2>
            )}
          </Link>
        </div>
      </div>
      <div className={styles.sponsorsLogo}>
        {sronsorShowSponsoredBy && (
          <div>
            <span className={styles.sponsor}>sponsored by:</span>
          </div>
        )}
        <div>
          <Link href={`${hostName}${sponsor.uri}`} passHref>
            {sponsor.logoImageUri ? (
              <img
                src={imgSponsor}
                alt={sponsor.name}
                height="45px"
                loading="lazy"
              />
            ) : (
              <h2 className={styles.sponsorName}>{sponsor.name}</h2>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
