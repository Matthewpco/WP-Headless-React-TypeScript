import React, { FC } from 'react';
import styles from './IndustryEventsFooter.module.scss';
import { IndustryEventBottomSection } from './getIndustryEvents';
import { Link } from '../../Link';
import { Button } from '../../Button';
import { useHost } from '../../../generic/hooks';

export interface IndustryEventsFooterProps {
  data: IndustryEventBottomSection;
}

export const IndustryEventsFooter: FC<IndustryEventsFooterProps> = ({
  data,
}) => (
  <section className={styles.root}>
    <h3 className={styles.title}>{data?.title}</h3>
    <div className={styles.content}>
      <img
        className={styles.image}
        src={`${useHost()}${data?.imageUri}`}
        alt={data?.title}
        loading="lazy"
      />
      <div>
        <p className={styles.desc}>{data?.description}</p>
        <Link href={data?.link?.url} target={data?.link?.target}>
          <Button color="primary" rounded className={styles.button}>
            {data?.link?.title}
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
