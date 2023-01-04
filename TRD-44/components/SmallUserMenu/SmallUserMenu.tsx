import React, { FC, useState, useEffect } from 'react';
import cx from 'classnames';
import { Button } from '../Button';
import { SwitchTheme } from '../SwitchTheme';
import { PianoRepository } from '../../piano/pianoRepository';
import { IPianoUser } from '../../piano/types';
import styles from './SmallUserMenu.module.scss';
import TriangleIcon from '../../assets/icons/triangle-down.svg';
import CrossIcon from '../../assets/icons/cross.svg';
import { Link } from '../Link';

export interface SmallUserMenuProps {
  showMenu: boolean;
  onSubscribe?: () => void;
  onSignOut?: () => void;
  onShowMenu?: () => void;
  pianoUser: IPianoUser;
}

export const SmallUserMenu: FC<SmallUserMenuProps> = ({
  showMenu,
  onSubscribe,
  onSignOut,
  onShowMenu,
  pianoUser,
}) => {
  const defaultTabsList = [
    'Profile',
    'Payment methods',
    'Subscription',
    'Billing history',
    'Saved Articles',
    'Newsletter',
    'Gift',
  ];

  const [tabs, setTabs] = useState(defaultTabsList);

  const [showSubscription, setShowSubscription] = useState(true);

  useEffect(() => {
    if (pianoUser.uid) {
      PianoRepository.getSubscriptions(pianoUser.uid).then(({ active }) => {
        const subscriptionNames = active.map((item) => item.name);

        if (subscriptionNames.length > 0) {
          setShowSubscription(false);
        }

        const checkFn = (item: string) =>
          item.toLowerCase().startsWith('education');
        const startsWithEducation = subscriptionNames.some(checkFn);

        if (startsWithEducation) {
          const newTabs = JSON.parse(JSON.stringify(defaultTabsList));
          newTabs.splice(6, 0, 'Education');
          setTabs(newTabs);
        }
      });
    }
  }, [pianoUser.uid]);

  return (
    <div
      className={cx({ [styles.menu]: showMenu, [styles.hideMenu]: !showMenu })}
    >
      <TriangleIcon className={styles.menuArrow} />

      <div className={styles.menuHeader}>
        <p className={styles.menuHeaderText}>
          {pianoUser.firstName}
          <span>{pianoUser.lastName}</span>
        </p>
        <CrossIcon className={styles.menuCross} onClick={onShowMenu} />
      </div>

      {showSubscription ? (
        <div className={styles.subscription}>
          <p className={styles.subscriptionText}>
            You have no active subscriptions.
          </p>
          <Link href="/subscription">
            <Button
              className={styles.subscriptionButton}
              rounded
              onClick={onSubscribe}
              size="small"
              color="primary"
            >
              Subscribe
            </Button>
          </Link>
        </div>
      ) : null}

      <div className={styles.menuList}>
        {tabs.map((item) => (
          <Link key={item} href={`/my-account?tab=${item}`}>
            {item}
          </Link>
        ))}
      </div>

      <div className={styles.switchContainer}>
        <SwitchTheme />
      </div>

      <Button className={styles.signOutButton} onClick={onSignOut}>
        Sign OUT
      </Button>
    </div>
  );
};
