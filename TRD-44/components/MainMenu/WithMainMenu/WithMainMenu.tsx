import React, { FunctionComponent, MutableRefObject, useEffect, useState } from 'react';
import cx from 'classnames';
import { MainMenu } from '../MainMenu/MainMenu';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';
import { MainMenuItem } from '../../../graphql';
import styles from './WithMainMenu.module.scss';

export type WithMainMenuProps = {
  displayStaticMainMenu?: boolean;
  opened: boolean;
  children: React.ReactNode;
  data: MainMenuItem[];
  onClickOutside: () => void;
  onLinkClick: () => void;
  divRef: MutableRefObject<HTMLDivElement | null>;
  onSearch: () => void;
};

export const WithMainMenu: FunctionComponent<WithMainMenuProps> = React.memo<WithMainMenuProps>(({
  opened,
  data,
  children,
  onClickOutside,
  onLinkClick,
  divRef,
  onSearch,
}) => {
  const [positionTop, setPositionTop] = useState<boolean>(true);

  useEffect(() => {
    setPositionTop(window.scrollY === 0);
  }, [opened]);

  return (
    <div
      className={
        cx(
          styles.withMainMenuWrapper,
          { [styles.withMainMenuWrapperOpened]: opened },
        )
      }
    >
      <div
        ref={divRef}
        className={cx(
          styles.mainMenuContainer,
        )}
      >
        <HamburgerMenu
          onSearch={onSearch}
          data={data}
          className={cx(styles.hamburgerMenuContainer, !positionTop && styles.setTop)}
          onLinkClick={onLinkClick}
        />
        <MainMenu data={data} />
      </div>
      <div className={cx(styles.mainMenuShadow)} onClick={onClickOutside} />
      {children}
    </div>
  );
});
