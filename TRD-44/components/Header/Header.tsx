import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { Container } from '../Container';
import { Link } from '../Link';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import AvatarIcon from '../../assets/icons/avatar.svg';
import BurgerIcon from '../../assets/icons/burger.svg';
import CrossIcon from '../../assets/icons/cross.svg';
import SearchIcon from '../../assets/icons/search.svg';
import TriangleIcon from '../../assets/icons/triangle-down.svg';
import styles from './Header.module.scss';
import { HeaderDropdownMenu } from '../../graphql';
import { SmallUserMenu } from '../SmallUserMenu';
import { IPianoUser } from '../../piano/types';
import { useDebounce } from '../../generic/hooks';
import { Logo, LogoProps } from '../Logo';

export type HeaderProps = {
  className?: string;
  logo: LogoProps;
  onBurgerIconClick: () => void;
  onCrossIconClick: () => void;
  onSignInClick?: () => void;
  isSignOutDisplayed?: boolean;
  onSignOutClick?: () => void;
  onSubscribeClick?: () => void;
  displayBurgerIcon?: boolean;
  displayCrossIcon?: boolean;
  displayCategoryDropdown: boolean;
  categoryDropdownItems: HeaderDropdownMenu;
  displayCityDropdown: boolean;
  cityDropdownItems: HeaderDropdownMenu;
  headerRef: MutableRefObject<HTMLDivElement | null>;
  onSearch: () => void;
};

export const Header: FunctionComponent<HeaderProps> = React.memo<HeaderProps>(
  ({
    className,
    logo,
    onBurgerIconClick,
    onCrossIconClick,
    onSignInClick,
    isSignOutDisplayed,
    onSignOutClick,
    onSubscribeClick,
    displayBurgerIcon,
    displayCrossIcon,
    displayCategoryDropdown,
    categoryDropdownItems,
    displayCityDropdown,
    cityDropdownItems,
    headerRef,
    onSearch,
  }) => {
    const [showMenu, setShowMenu] = useState(false);

    const onShowMenu = () => {
      setShowMenu((prev) => !prev);
    };

    const [pianoUser, setPianoUser] = useState<IPianoUser>({
      uid: '',
      email: '',
      firstName: '',
      lastName: '',
    });

    const router = useRouter();

    const progressIndicator = useRef<HTMLDivElement>(null);
    const debounce = useDebounce(5000);
    const [isScrolledToTop, setIsScrolledToTop] = useState(true);

    useEffect(() => {
      if (localStorage.pianoUser) {
        setPianoUser(JSON.parse(localStorage.pianoUser));
      }

      const ref = progressIndicator.current;

      const handleRouteChange = () => {
        if (ref) {
          ref.classList.add('animate');
          ref.classList.add('width100');
        }
        debounce(() => {
          if (ref) {
            ref.classList.remove('animate');
            ref.classList.remove('width100');
          }
        });
      };

      const handleChangeComplete = () => {
        if (ref) {
          ref.classList.remove('animate');
          ref.classList.remove('width100');
        }
      };

      const handleWheel = () => {
        if (window.scrollY > 0) {
          setIsScrolledToTop(false);
          document.body.classList.add('scrolled');
        } else {
          setIsScrolledToTop(true);
          document.body.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', handleWheel);
      router.events.on('routeChangeComplete', handleChangeComplete);
      router.events.on('routeChangeStart', handleRouteChange);

      return () => {
        window.removeEventListener('scroll', handleWheel);
        router.events.off('routeChangeComplete', handleChangeComplete);
        router.events.off('routeChangeStart', handleRouteChange);
      };
    }, []);

    return (
      <header
        id="trd-header"
        ref={headerRef}
        className={cx(className, styles.wrapper)}
      >
        <Container className={styles.header}>
          <div className={styles.actionButtons}>
            {displayBurgerIcon && (
              <BurgerIcon
                className={cx(className, styles.icon)}
                onClick={onBurgerIconClick}
              />
            )}
            {displayCrossIcon && (
              <CrossIcon className={styles.icon} onClick={onCrossIconClick} />
            )}
            <label htmlFor="queryly_toggle">
              <SearchIcon
                onClick={onSearch}
                className={cx(className, styles.icon, styles.hiddenForMobile)}
              />
            </label>
            <Dropdown
              className={cx(styles.dropdown, {
                [styles.hiddenDropdown]: !displayCategoryDropdown
                  ? true
                  : isScrolledToTop,
              })}
              items={categoryDropdownItems?.menuItems?.nodes || []}
              initialValue={{
                label: categoryDropdownItems?.name || '',
                url: '#',
              }}
            />
            <Dropdown
              className={cx(styles.dropdown, {
                [styles.hiddenDropdown]: !displayCityDropdown
                  ? true
                  : isScrolledToTop,
              })}
              items={cityDropdownItems?.menuItems?.nodes || []}
              initialValue={{ label: cityDropdownItems?.name || '', url: '#' }}
            />
          </div>
          <Logo {...logo} isShrink={!isScrolledToTop} />
          <div className={styles.signUpButtons}>
            {!router.isFallback &&
              typeof isSignOutDisplayed === 'boolean' &&
              (isSignOutDisplayed ? (
                <div className={styles.menu}>
                  <Button
                    className={cx(
                      className,
                      styles.accountButton,
                      styles.signInButton,
                      styles.hiddenForMobile,
                    )}
                    onClick={onShowMenu}
                  >
                    MY Account
                    <TriangleIcon
                      className={cx({ [styles.rotate]: showMenu })}
                    />
                  </Button>
                  <SmallUserMenu
                    pianoUser={pianoUser}
                    showMenu={showMenu}
                    onSubscribe={onSubscribeClick}
                    onSignOut={onSignOutClick}
                    onShowMenu={onShowMenu}
                  />
                </div>
              ) : (
                <div
                  className={cx(styles.signUpButtons, styles.hiddenForMobile)}
                >
                  <Button
                    className={cx(
                      className,
                      styles.button,
                      styles.signInButton,
                    )}
                    onClick={onSignInClick}
                  >
                    Sign in
                  </Button>
                  <Link href="/subscription">
                    <Button
                      className={styles.button}
                      rounded
                      onClick={onSubscribeClick}
                      color="primary"
                    >
                      Subscribe
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
          <div
            className={cx(
              styles.signUpButtons,
              styles.hiddenForDesktop,
              styles.hiddenForTablet,
            )}
          >
            <div
              className={styles.avatarIcon}
              onClick={pianoUser.uid ? onShowMenu : onSignInClick}
            >
              <AvatarIcon className={styles.icon} />
              <TriangleIcon
                className={cx(styles.iconArrow, { [styles.rotate]: showMenu })}
              />
            </div>
            {!isSignOutDisplayed && (
              <Link href="/subscription">
                <Button
                  rounded
                  onClick={onSubscribeClick}
                  size="small"
                  color="primary"
                >
                  Subscribe
                </Button>
              </Link>
            )}
          </div>
        </Container>

        <div className={styles.progressIndicator} ref={progressIndicator} />
      </header>
    );
  },
);
