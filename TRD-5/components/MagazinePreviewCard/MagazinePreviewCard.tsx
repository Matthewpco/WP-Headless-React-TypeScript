import React, { FC } from 'react';
import cx from 'classnames';
import styles from './MagazinePreviewCard.module.scss';
import { NodesData } from '../../graphql/getMagazineIssueArchivesCards';
import { useHost } from '../../generic/hooks';
import { Link } from '../Link';

export const MagazinePreviewCard: FC<NodesData> = ({
  title,
  featuredImageUri,
  uri,
  markets,
  pdfUrl,
}) => (
  <div className={styles.card}>
    <img src={`${useHost()}${featuredImageUri}`} alt={title} loading="lazy" />
    <div className={styles.cardInfo}>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardText}>{markets?.nodes?.[0]?.name}</p>
      <div className={styles.buttons}>
        {uri && (
          <Link className={styles.cardButton} href={uri}>
            Read now
          </Link>
        )}
        {pdfUrl && (
          <Link
            className={cx(styles.cardButton, styles.cardButtonBlack)}
            href={pdfUrl}
          >
            Digital
          </Link>
        )}
      </div>
    </div>
  </div>
);
