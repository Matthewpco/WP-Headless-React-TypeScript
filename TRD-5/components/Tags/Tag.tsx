import React, { FC } from 'react';
import { Button } from '../Button';
import styles from './Tag.module.scss';
import { ArticleTag } from '../../graphql';
import { Link } from '../Link';

export const Tag: FC<ArticleTag> = ({ name, uri }) => (
  <Button
    component={Link}
    href={uri}
    className={styles.root}
    size="small"
    bordered
    rounded
  >
    {name}
  </Button>
);
