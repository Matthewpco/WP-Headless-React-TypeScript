import React, { FC, MouseEventHandler, useCallback } from 'react';
import cx from 'classnames';
import { List } from '../List';
import styles from './CompaniesAndPeopleLinks.module.scss';
import { CompaniesAndPeopleLink } from '../../graphql';
import angleRight from '../../assets/icons/angle-right.svg';

export interface CompaniesAndPeopleLinksItem
  extends Pick<CompaniesAndPeopleLink, 'uri'>,
    Partial<Pick<CompaniesAndPeopleLink, 'name'>> {
  onClick?: () => void;
}

export interface CompaniesAndPeopleLinksProps {
  items: CompaniesAndPeopleLink[];
  className?: string;
  classNameList?: string;
}

const renderCompaniesAndPeopleLink = (
  { uri, name, onClick }: CompaniesAndPeopleLinksItem,
  index: number,
) => {
  const Icon = angleRight;
  const onClickAnchor: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.preventDefault();

      onClick?.();
    },
    [onClick],
  );
  return (
    <li className={styles.listItem} key={index}>
      <a
        className={styles.listItemAnchor}
        href={uri}
        target="_blank"
        rel="noreferrer"
        onClick={onClick ? onClickAnchor : undefined}
      >
        <p>
          {name}
          <Icon />
        </p>
      </a>
    </li>
  );
};

export const CompaniesAndPeopleLinks: FC<CompaniesAndPeopleLinksProps> = ({
  items,
  className,
  classNameList,
}) => (
  <nav className={cx(styles.root, className)}>
    <ul className={cx(styles.list, classNameList)}>
      <List items={items} render={renderCompaniesAndPeopleLink} />
    </ul>
  </nav>
);
