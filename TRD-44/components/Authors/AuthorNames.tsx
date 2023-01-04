import React, { FC } from 'react';
import { ArticleAuthor } from '../../graphql';
import { List } from '../List';
import { Link } from '../Link';
import styles from './AuthorNames.module.scss';

export interface AuthorNamesProps {
  authors: ArticleAuthor[];
  prefix?: string;
  className?: string;
}

const renderAuthor = ({ id, uri, firstName, lastName }: ArticleAuthor) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <li key={id} className={styles.listItem}>
      {uri && (
        <Link className={styles.anchor} href={uri}>
          {fullName}
        </Link>
      )}
      {!uri && <span className={styles.anchor}>{fullName}</span>}
    </li>
  );
};

export const AuthorNames: FC<AuthorNamesProps> = ({
  className,
  authors,
  prefix = '',
}) => (
  <div className={className}>
    <span>{`${prefix} `}</span>
    <ul className={styles.list}>
      <List items={authors} render={renderAuthor} />
    </ul>
  </div>
);
