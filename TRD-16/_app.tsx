import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import ReactGA from 'react-ga';
import '../styles/globals.scss';
import 'react-virtualized/styles.css';
import Head from 'next/head';
import { loadReCaptcha } from 'react-recaptcha-v3';
import TagManager from 'react-gtm-module';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WithMainMenu } from '../components/MainMenu/WithMainMenu';
import {
  ResponseGetChartbeat,
  ResponseGetFooter,
  ResponseGetHeader,
  ResponseGetMainMenu,
  ResponseGetStylesWp,
} from '../graphql';
import { ProviderTree } from '../generic/provider-tree/ProviderTree';
import { ProviderWithProps } from '../generic/provider-tree/ProviderTreeProps';
import { ProviderTheme } from '../generic/theme/ContextTheme';
import { ChartbeatListener } from '../components/ChartbeatListener';
import styles from '../styles/App.module.scss';
import { IdTemplate } from '../components/templates';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProviderAds } from '../components/Ad/ContextAds';
import { PianoScript } from '../components/PianoScript/PianoScript';
import { ClientSide } from '../components/ClientSide';
import { isClientSide } from '../generic/utils';
import { usePianoMessage } from '../components/PianoScript/usePianoMessage';
import { StylesWp } from '../components/Script/StylesWp';
import { ProviderNewsletter } from '../components/NewsLetterPage/useContextNewsletter';

// we need this to add possibility to extend window by new property
declare const window: any;

interface PageProps {
  header: ResponseGetHeader;
  footer: ResponseGetFooter;
  mainMenu: ResponseGetMainMenu;
  stylesWp: ResponseGetStylesWp;
  chartbeat: ResponseGetChartbeat;
}

const providers: ProviderWithProps<any>[] = [
  { provider: ProviderTheme },
  { provider: ProviderAds },
  { provider: ProviderNewsletter },
];

const articleRoutes = new Set([
  '/[firstLevel]/[secondLevel]/[thirdLevel]/[fourthLevel]',
  '/[firstLevel]/[secondLevel]/[thirdLevel]/[fourthLevel]/[fifthLevel]',
  '/[firstLevel]/[secondLevel]/[thirdLevel]/[fourthLevel]/[fifthLevel]/[sixthLevel]',
]);

const onSignOutClick = () => {
  window.tp.pianoId.logout();
  window.localStorage.removeItem('pianoId');
  window.localStorage.removeItem('pianoUser');
  window.location.reload();
};

const onSignInClick = () => {
  window.tp.pianoId.show({
    screen: 'login',
    displayMode: 'modal',
    loggedIn: () => {
      const user = window.tp.pianoId.getUser();
      window.localStorage.setItem('pianoId', user.uid);
      window.localStorage.setItem('pianoUser', JSON.stringify(user));
      window.location.reload();
    },
  });
};

const tagManagerConfig = {
  gtmId: 'GTM-K694XL6',
};

const App: FunctionComponent<AppProps<PageProps>> = ({
  Component,
  pageProps: { header, footer, mainMenu, stylesWp, chartbeat },
  pageProps,
  router,
}) => {
  useEffect(() => {
    loadReCaptcha('6Le1IdIUAAAAAOthoiGq4NNfmiLaxYrl8oAywLtG');
    TagManager.initialize(tagManagerConfig);
  }, []);

  const [isHamburgerMenuOpened, setHamburgerMenuOpened] = useState(false);
  const [isUserLoggedIn, setIdUserLoggedId] =
    useState<boolean | undefined>(undefined);

  const isArticlePage = articleRoutes.has(router.route);
  const isSponsorArticlePage =
    router.route === '/sponsored/[sponsorName]/[sponsorArticleName]';
  const isGenericArticlePage = isArticlePage || isSponsorArticlePage;

  const template = (pageProps as any)?.article?.template?.templateValue;
  const displayStaticMainMenu =
    template !== IdTemplate.FullWidthB && template !== IdTemplate.FullWidthC;

  const { logo, logoDarkMode } = header?.themeSettings ?? {};
  const headerLogo = {
    logoLight: logo?.url ?? '',
    logoDark: logoDarkMode?.url ?? '',
  };

  useEffect((): void => {
    const { body } = document;
    if (window.innerWidth < 641) {
      if (isHamburgerMenuOpened) {
        body.classList.add('blocked-3');
      } else {
        body.classList.remove('blocked-3');
      }
    } else {
      body.classList.remove('blocked-3');
    }
  }, [isHamburgerMenuOpened]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-429437-19');
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(router.asPath);
    }
  }, [router.asPath]);

  const divRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  usePianoMessage();

  const onSearch = () => {
    if (isClientSide()) {
      window.queryly?.init('9eb9cf64eeb041c9', [
        headerRef.current,
        footerRef.current,
        divRef.current,
        mainRef.current,
      ]);
    }
  };
  //  variable to fix block stylying which is missing on local and dev
  const WP_BLOCK_STYLE = `${process.env.NEXT_PUBLIC_WP_URL}/wp-includes/css/dist/block-library/style.min.css`;
  const WP_BLOCK_THEME = `${process.env.NEXT_PUBLIC_WP_URL}/wp-includes/css/dist/block-library/theme.min.css`;
  return (
    <ProviderTree providers={providers}>
      <Head>
        <StylesWp stylesWp={stylesWp} />
        <link rel="stylesheet" href="/fonts/BarlowCondensed/index.css" />
        <link rel="stylesheet" href="/fonts/ProximaNova/index.css" />
        <link rel="stylesheet" href="/fonts/Merriweather/index.css" />
        <link rel="stylesheet" href="/fonts/BarlowSemiCondensed/index.css" />
        <link rel="stylesheet" href="/fonts/Inter/index.css" />
        <link rel="stylesheet" href="/fonts/OpenSans/index.css" />
        <link rel="stylesheet" href="/styles/bootstrap.min.css" />
        <link rel="stylesheet" href={WP_BLOCK_THEME} />
        <link rel="stylesheet" href={WP_BLOCK_STYLE} />

      </Head>
      <Script
        defer
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"
      />
      <ClientSide>
        <PianoScript
          onInit={() => setIdUserLoggedId(window.tp.pianoId.isUserValid())}
        />
      </ClientSide>
      <Script async src="//cdn.cxense.com/cx.js" />
      <Script async src="//cdn.cxense.com/cx.cce.js" />
      <Script async src="https://www.queryly.com/js/queryly.v4.min.js" />
      <Script
        async
        src="https://www.queryly.com/js/therealdeal-advanced-search.js"
      />
      <div className={styles.root}>
        <WithMainMenu
          onSearch={onSearch}
          divRef={divRef}
          displayStaticMainMenu={displayStaticMainMenu}
          opened={isHamburgerMenuOpened}
          onClickOutside={() => setHamburgerMenuOpened(false)}
          onLinkClick={() => setHamburgerMenuOpened(false)}
          data={mainMenu?.menu?.menuItems?.nodes ?? []}
        >
          <Header
            onSearch={onSearch}
            headerRef={headerRef}
            logo={headerLogo}
            displayCrossIcon={isHamburgerMenuOpened}
            displayBurgerIcon={!isHamburgerMenuOpened}
            displayCategoryDropdown={isGenericArticlePage}
            categoryDropdownItems={header?.firstHeaderMenu}
            displayCityDropdown={isGenericArticlePage}
            cityDropdownItems={header?.secondHeaderMenu}
            onCrossIconClick={() => setHamburgerMenuOpened(false)}
            onBurgerIconClick={() => setHamburgerMenuOpened(true)}
            onSignInClick={onSignInClick}
            onSignOutClick={onSignOutClick}
            isSignOutDisplayed={isUserLoggedIn}
          />
          <div ref={mainRef} style={{ flexGrow: 1 }}>
            <Component {...pageProps} />
          </div>
          <Footer
            footerRef={footerRef}
            items={footer?.menu?.menuItems?.nodes ?? []}
            socialItems={footer?.themeSettings?.socialLinks ?? []}
            copyrightText={footer?.themeSettings?.footerReservedText ?? ''}
            addressText={footer?.themeSettings?.address ?? ''}
            phoneText={footer?.themeSettings?.phone ?? ''}
          />
        </WithMainMenu>
      </div>
      {process.env.NODE_ENV === 'production' && (
        <ChartbeatListener
          useCanonical
          useCanonicalDomain
          uid="65926"
          chartbeat={chartbeat}
        />
      )}
    </ProviderTree>
  );
};

export default App;