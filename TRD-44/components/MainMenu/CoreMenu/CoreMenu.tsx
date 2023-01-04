import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { List } from '../../List';
import { MainMenuItem } from '../../../graphql';
import { Container } from '../../Container';
import { SwitchTheme } from '../../SwitchTheme';
import { Link } from '../../Link';

export type CoreMenuProps = {
  data: MainMenuItem[];
  className?: string;
  styles: Record<string, string>;
  onLinkClick?: () => void;
};

export const CoreMenu: FunctionComponent<CoreMenuProps> =
  React.memo<CoreMenuProps>(
    ({ data, className, styles, children, onLinkClick }) => {
      const renderCategoryLabelLink = (item: MainMenuItem) => (
        <Link
          onClick={onLinkClick}
          className={styles.categoryLabel}
          key={item.label}
          href={item.url}
        >
          {item.label}
        </Link>
      );

      const renderCategoryItems = ({
        label,
        childItems,
        url,
      }: MainMenuItem) => {
        const items = childItems?.nodes ?? [];

        if (items.length > 0) {
          return (
            <div key={label} className={styles.itemsGroup}>
              <Link
                href={url}
                onClick={onLinkClick}
                className={styles.groupLabel}
              >
                {label}
              </Link>
              <div className={styles.itemsSubGroup}>
                <List items={items} render={renderCategoryLabelLink} />
              </div>
            </div>
          );
        }

        return (
          <Link
            key={label}
            href={url}
            onClick={onLinkClick}
            className={styles.categoryLabel}
          >
            {label}
          </Link>
        );
      };

      const renderCategory = ({ label, url, childItems }: MainMenuItem) => {
        const items = childItems?.nodes ?? [];
        const categoryUrl = items.length > 0 ? '#' : url;

        return (
          <div key={label} className={styles.category}>
            <Link
              href={categoryUrl}
              onClick={onLinkClick}
              className={styles.categoryLink}
            >
              {label}
            </Link>
            {items.length > 0 && (
              <div className={styles.categoryDropdown}>
                <List items={items} render={renderCategoryItems} />
              </div>
            )}
          </div>
        );
      };

      return (
        <div className={cx(styles.root, className)}>
          <Container className={styles.container}>
            {children}

            <nav className={cx(styles.mainMenu)}>
              {data.map(renderCategory)}
            </nav>

            <div className={styles.switchContainer}>
              <SwitchTheme />
            </div>
          </Container>
        </div>
      );
    },
  );
