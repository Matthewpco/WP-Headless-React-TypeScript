/* eslint-disable */
// @ts-nocheck
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDevice } from '../Ad/utils/getDevice';

declare const window: any;

export const useAds = (initAds: () => void) => {
  const { isFallback, isReady } = useRouter();

  const isPageReady = !isFallback && isReady;

  useEffect(() => {
    // cleanup
    return () => {
      document.body.removeAttribute('style');
      window.trd_ad_init = false;
      window.trd = undefined;
      window.adUnits = undefined;
      window.adUnit = undefined;
      window.adsStart = undefined;
      window.AdDisplay = undefined;
      window.adPositions = undefined;
      window.setupArticleScrollerAd = undefined;
    };
  }, []);

  useEffect(() => {
    // load 1. Server config
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      window.googletag
        .pubads()
        .addEventListener('slotRequested', function (event) {
          //
        });
      window.googletag
        .pubads()
        .addEventListener('slotRenderEnded', function (event) {
          //
        });
    });

    // Load 1. GTM: DataLayer
    window.dataLayer = window.dataLayer || [];
    window.tp = window.tp || [];
    window.trd = window.trd || {};
    window.trd.user = window.trd.user || {};
    window.trd.meter = window.trd.meter || {};
    window.trd.start_time = window.trd.start_time || new Date();
    window.trd.end_time = window.trd.end_time || null;
    window.trd._uid_key = '_trd_user_id';
    window.trd._uid_expire = 365;
    window.trd._utp_key = '_trd_user_type';
    window.trd.standalone = window.matchMedia(
      '(display-mode: standalone)',
    ).matches;
    window.trd.piano_loggedin =
      JSON.parse(window.localStorage.getItem('_trd_piano_loggedin')) || false;
    window.trd.user_type =
      window.localStorage.getItem(window.trd._utp_key) || 'anon';
    window.trd.site_url = 'https://therealdeal.com';
    window.trd.ticker_enable = 1;
    window.trd.ad_enabled = true;
    window.trd.ad_blocker = false;
    window.trd.taboola_disable = false;
    window.trd.user.type =
      window.localStorage.getItem(window.trd._utp_key) || 'anon';
    window.trd.user.login =
      JSON.parse(window.localStorage.getItem('_trd.user.login')) || false;

    const user_type = window.localStorage.getItem(window.trd._utp_key);
    window.tp.push(['setUsePianoIdUserProvider', true]);
    window.tp.push([
      'init',
      function () {
        // v1
        window.trd.piano_loggedin = tp.pianoId.isUserValid();
        window.localStorage.setItem(
          '_trd_piano_user',
          JSON.stringify(window.tp.pianoId.getUser(), null, 0),
        );
        window.localStorage.setItem(
          '_trd_piano_loggedin',
          JSON.stringify(tp.pianoId.isUserValid(), null, 0),
        );
        // v2
        window.dispatchEvent(new Event('trd.piano.ready'));
        window.trd.user.login = tp.pianoId.isUserValid();
        window.localStorage.setItem(
          '_trd.user',
          JSON.stringify(window.tp.pianoId.getUser(), null, 0),
        );
        window.localStorage.setItem(
          '_trd.user.login',
          JSON.stringify(tp.pianoId.isUserValid(), null, 0),
        );
        // set user type
        if (!window.trd.user.login) {
          window.trd.user_type = 'anon';
          window.trd.user.type = 'anon';
          window.localStorage.setItem(
            window.trd._utp_key,
            window.trd.user.type,
          );
          window.dataLayer.push({ trd: { user_type: window.trd.user.type } });
          window.dispatchEvent(
            new CustomEvent('trd.user.login.status', {
              detail: {
                status: false,
                user: null,
              },
            }),
          );
          // user type changed
          if (user_type !== window.trd.user_type) {
            window.dispatchEvent(
              new CustomEvent('trd.user.type.update', {
                detail: {
                  new: window.trd.user_type,
                  old: user_type,
                },
              }),
            );
          }
        } else {
          window.trd.user_type = 'lgdin';
          window.trd.user.type = 'lgdin';
          window.dispatchEvent(
            new CustomEvent('trd.user.login.status', {
              detail: {
                status: true,
                user: window.tp.pianoId.getUser(),
              },
            }),
          );
          // paid user check
          window.tp.api.callApi('/access/list', {}, function (result) {
            if (result.total) {
              window.trd.user.access = result.data;
              for (let i = 0, n = result.data.length; i < n; i++) {
                if (result.data[i].granted) {
                  window.trd.user_type = 'paid';
                  window.trd.user.type = 'paid';
                  break;
                }
              }
            }
            if (user_type !== window.trd.user_type) {
              window.dispatchEvent(
                new CustomEvent('trd.user.type.update', {
                  detail: {
                    new: window.trd.user_type,
                    old: user_type,
                  },
                }),
              );
            }
            window.localStorage.setItem(
              window.trd._utp_key,
              window.trd.user.type,
            );
            window.dataLayer.push({ trd: { user_type: window.trd.user.type } });
          });
        }
      },
    ]);

    window.tp.push([
      'addHandler',
      'loginSuccess',
      function () {
        // v1
        window.localStorage.setItem('_trd_piano_paywall_meter', null);
        window.localStorage.setItem(
          '_trd_piano_user',
          JSON.stringify(window.tp.pianoId.getUser(), null, 0),
        );
        window.localStorage.setItem(
          '_trd_piano_loggedin',
          JSON.stringify(window.tp.pianoId.isUserValid(), null, 0),
        );
        window.trd.piano_loggedin = tp.pianoId.isUserValid();
        window.trd.user_type = 'lgdin';
        // v2
        window.localStorage.setItem('_trd.meter.paywall', null);
        window.localStorage.setItem(
          '_trd.user',
          JSON.stringify(window.tp.pianoId.getUser(), null, 0),
        );
        window.localStorage.setItem(
          '_trd.user.login',
          JSON.stringify(window.tp.pianoId.isUserValid(), null, 0),
        );
        window.trd.user.login = tp.pianoId.isUserValid();
        window.trd.user.type = 'lgdin';
        window.dispatchEvent(
          new CustomEvent('trd.user.login.status', {
            detail: {
              status: true,
              user: window.tp.pianoId.getUser(),
            },
          }),
        );
        // paid user check
        window.tp.api.callApi('/access/list', {}, function (result) {
          if (result.total) {
            window.trd.user.access = result.data;
            for (let i = 0, n = result.data.length; i < n; i++) {
              if (result.data[i].granted) {
                window.trd.user_type = 'paid';
                window.trd.user.type = 'paid';
                break;
              }
            }
          }
          if (user_type !== window.trd.user_type) {
            window.dispatchEvent(
              new CustomEvent('trd.user.type.update', {
                detail: {
                  new: window.trd.user_type,
                  old: user_type,
                },
              }),
            );
          }
          window.localStorage.setItem(
            window.trd._utp_key,
            window.trd.user.type,
          );
          window.dataLayer.push({ trd: { user_type: window.trd.user.type } });
        });
      },
    ]);
    window.tp.push([
      'addHandler',
      'meterActive',
      function (data) {
        if ('PaywallMeter' === data.meterName) {
          window.localStorage.setItem(
            '_trd_piano_paywall_meter',
            JSON.stringify(data, null, 0),
          );
          window.localStorage.setItem(
            '_trd.meter.paywall',
            JSON.stringify(data, null, 0),
          );
          window.dispatchEvent(
            new CustomEvent('trd.meter.paywall', { detail: data }),
          );
        }
      },
    ]);
    window.tp.push([
      'addHandler',
      'meterExpired',
      function (data) {
        if ('PaywallMeter' === data.meterName) {
          window.localStorage.setItem(
            '_trd_piano_paywall_meter',
            JSON.stringify(data, null, 0),
          );
          window.localStorage.setItem(
            '_trd.meter.paywall',
            JSON.stringify(data, null, 0),
          );
          window.dispatchEvent(
            new CustomEvent('trd.meter.paywall', { detail: data }),
          );
        }
      },
    ]);

    window.addEventListener('load', () => {
      window.trd = window.trd || {};
      window.trd.end_time = new Date();
      window.dispatchEvent(new Event('trd.loaded'));
    });

    // Load 2: Ads - 0 Dynamic
    window.trd = window.trd || {};
    window.trd.fn = window.trd.fn || {};
    window.trd.fn.dynamicAds = function () {
      var fn = {
        init: function () {
          if ('isAdEnabled' in window && !isAdEnabled()) {
            dataLayer.push({
              event: 'event_tracking',
              'trd.action': 'disabled',
              'trd.category': 'dynamic ads',
              'trd.label': window.slotName + '/' + window.device,
              'trd.non_interaction': false,
            });
            return false;
          }
          if ('updateTRDAds' in window) updateTRDAds();
        },
      };

      return fn.init();
    };

    // Load 2: Ads - 0 Config
    /**
     * Global config vars
     */
    window.CurrentURL = new URL(window.location.href);
    window.networkCode = 1015965;
    window.topLevelAdUnit = 'trd-ny';
    window.s1 = 'hp';
    window.pid = 'homepage';
    window.pgtype = 'landing';
    window.device = 'desktop';
    window.siteName = '';
    window.adUnit = null;
    window.slotName = null;
    window.date = new Date();
    window.adsStart = window.date.getTime();
    window.TIMEOUT = 2000;
    window.REFRESH_RATE = 60000;
    window.adUnits = window.adUnits || [];
    window.test = window.CurrentURL.searchParams.get('test');
    window.trd_prebid_path = '/js/a3.1-prebid-3.14.0.js';

    /**
     * TinyPass DMP
     * @since TWB-110 AC3
     */
    window.cX = window.cX || {};
    window.cX.callQueue = window.cX.callQueue || [];
    /**
     * GT and prebid var
     */
    window.googletag = window.googletag || { cmd: [] };
    window.pbjs = window.pbjs || { que: [] };
    /**
     * Ad size for common potions
     */
    window.adSizes = {
      top: {
        desktop: [
          [970, 250],
          [970, 90],
          [728, 90],
        ],
        tablet: [[728, 90]],
        mobile: [
          [320, 100],
          [320, 50],
        ],
      },
      right: {
        desktop: [
          [300, 600],
          [300, 250],
        ],
        tablet: [[300, 250]],
        mobile: [
          [320, 100],
          [300, 250],
          [320, 50],
          [300, 252],
        ],
        desktopFull: [
          [970, 250],
          [970, 251],
          [970, 90],
          [970, 91],
          [728, 90],
          [728, 91],
          [300, 250],
        ],
        refresh: window.ad_refresh_right || 0,
      },
      mid: {
        desktop: [
          [970, 250],
          [970, 251],
          [970, 90],
          [970, 91],
          [728, 90],
          [728, 91],
        ],
        tablet: [
          [728, 90],
          [300, 250],
        ],
        mobile: [
          [320, 100],
          [300, 250],
          [320, 50],
          [300, 252],
        ],
        desktopFull: [
          [970, 250],
          [970, 251],
          [970, 90],
          [970, 91],
          [728, 90],
          [728, 91],
          [300, 250],
        ],
        refresh: window.ad_refresh_mid || 0,
      },
    };

    /**
     * Create ad postion object with sizes
     */
    window.trdSetAdPosition = function (id, sizes, lazyload = 0) {
      const ad = {
        id,
        lazyload,
      };
      return Object.assign(ad, sizes);
    };

    /**
     * Add the ad postions
     */
    window.adPositions = {};

    /**
     * Display Ads
     */
    window.isAdEnabled = function () {
      return typeof window.trd.ad_enabled === 'boolean'
        ? window.trd.ad_enabled
        : true;
    };

    /**
     * Update top level ad unit base on URL
     */
    window.updateTopLevelAdUnit = function () {
      var pathname = `${window.location.pathname}/`;

      if (pathname.startsWith('/national/')) {
        window.topLevelAdUnit = 'trd-national';
      } else if (pathname.startsWith('/miami/')) {
        window.topLevelAdUnit = 'trd-miami';
      } else if (pathname.startsWith('/chicago/')) {
        window.topLevelAdUnit = 'trd-chicago';
      } else if (pathname.startsWith('/la/')) {
        window.topLevelAdUnit = 'trd-la';
      } else if (pathname.startsWith('/databook/')) {
        window.topLevelAdUnit = 'trd-db';
      } else if (pathname.startsWith('/tristate/')) {
        window.topLevelAdUnit = 'trd-tristate';
      } else if (pathname.startsWith('/sanfrancisco/')) {
        window.topLevelAdUnit = 'trd-sanfrancisco';
      } else if (pathname.startsWith('/texas/')) {
        window.topLevelAdUnit = 'trd-texas';
      } else {
        window.topLevelAdUnit = 'trd-ny';
      }

      return window.topLevelAdUnit;
    };

    // Evalute and set siteName
    window.setSiteName = function () {
      let hostName = `${window.location.hostname}`;
      if (hostName.startsWith('dev')) {
        siteName = 'dev';
      } else if (hostName.startsWith('local')) {
        siteName = 'local';
      } else if (hostName.startsWith('preview')) {
        siteName = 'preview';
      } else if (hostName.startsWith('stg')) {
        siteName = 'stg';
      } else {
        siteName = 'prod';
      }
    };

    /**
     * Update global config var base on other global config vars
     */
    window.updateTRDAds = function () {
      window.adUnit = window.topLevelAdUnit + '/' + window.s1;
      window.slotName = '/' + window.networkCode + '/' + window.adUnit;
    };

    /**
     * Init GPT with PreBid
     */
    window.initGPT = function () {
      window.pbjs.timeStart = window.adsStart;
      window.pbjs.device = window.device;
      window.pbjs.topLevelAdUnit = window.topLevelAdUnit;
      window.pbjs.s1 = window.s1;
      window.pbjs.pgtype = window.pgtype;
    };

    /**
     * Init the DFP with config and tags
     */
    window.initDFP = function () {
      /**
       * @since TWB-110 AC3
       */
      window.cX.callQueue.push([
        'invoke',
        function () {
          window.cX.getUserSegmentIds({
            persistedQueryId: 'cbb70b39cf3dfef346c9c7de7832fc68fd6ba590',
            callback: function (cXsegmentIds) {
              /**
               * @since TWB-110 AC3
               */
              window.googletag.cmd.push(function () {
                googletag.pubads().enableAsyncRendering();
                // Header Bidding Targeting
                window.googletag.pubads().setTargeting('s1', window.s1);
                window.googletag.pubads().setTargeting('pid', window.pid);
                window.googletag.pubads().setTargeting('pgtype', window.pgtype);
                window.googletag
                  .pubads()
                  .setTargeting('category', window.category);
                window.googletag
                  .pubads()
                  .setTargeting('breakpoint', window.device);
                window.googletag
                  .pubads()
                  .setTargeting('siteName', window.siteName); // TWB-110 AC1
                window.googletag
                  .pubads()
                  .setTargeting('CxSegments', cXsegmentIds); // DMP TWB-110 AC3
                if (!!window.trd && window.trd.user_type) {
                  window.googletag
                    .pubads()
                    .setTargeting('utype', window.trd.user_type);
                }
                if (
                  !!window.trd &&
                  window.trd.post &&
                  window.trd.post.tags_slug_string
                ) {
                  window.googletag
                    .pubads()
                    .setTargeting('tags', window.trd.post.tags_slug);
                }
                if (window.test) {
                  window.googletag.pubads().setTargeting('test', window.test);
                }
                // Init DFP
                window.googletag.pubads().collapseEmptyDivs();
                window.googletag
                  .pubads()
                  .addEventListener('slotRequested', function (event) {
                    dataLayer.push({
                      event: 'event_tracking',
                      'trd.action': 'requested',
                      'trd.category': 'dynamic ads',
                      'trd.label':
                        window.slotName +
                        '/' +
                        window.device +
                        '/' +
                        event.slot.getSlotElementId(),
                      'trd.non_interaction': false,
                    });
                  });
                window.googletag
                  .pubads()
                  .addEventListener('slotRenderEnded', function (event) {
                    if (!event.isEmpty) {
                      dataLayer.push({
                        event: 'event_tracking',
                        'trd.action': 'render ended',
                        'trd.category': 'dynamic ads',
                        'trd.label':
                          window.slotName +
                          '/' +
                          window.device +
                          '/' +
                          event.slot.getSlotElementId(),
                        'trd.non_interaction': false,
                      });
                    }
                  });
                window.googletag
                  .pubads()
                  .addEventListener('impressionViewable', function (event) {
                    dataLayer.push({
                      event: 'event_tracking',
                      'trd.action': 'impression viewable',
                      'trd.category': 'dynamic ads',
                      'trd.label':
                        window.slotName +
                        '/' +
                        window.device +
                        '/' +
                        event.slot.getSlotElementId(),
                      'trd.non_interaction': false,
                    });
                  });
                window.googletag
                  .pubads()
                  .addEventListener('slotOnload', function (event) {
                    if (window.device === 'mobile') {
                      if (
                        !event.slot
                          .getSlotElementId()
                          .startsWith('div-id-for-mid') ||
                        !event.slot
                          .getSlotElementId()
                          .startsWith('div-id-for-right')
                      )
                        return;
                    } else {
                      if (
                        !event.slot
                          .getSlotElementId()
                          .startsWith('div-id-for-mid')
                      )
                        return;
                    }
                    var adUnit = document.getElementById(
                      event.slot.getSlotElementId(),
                    );

                    if (adUnit.children[0]?.className.includes('text-center')) {
                      return;
                    }

                    var adText = document.createElement('small');
                    adText.className =
                      'd-block text-muted text-uppercase mb-2 text-center';
                    adText.setAttribute('style', 'font-size: 10px;');
                    adText.innerText = 'ADVERTISEMENT';
                    adUnit.prepend(adText);
                    dataLayer.push({
                      event: 'event_tracking',
                      'trd.action': 'loaded',
                      'trd.category': 'dynamic ads',
                      'trd.label':
                        window.slotName +
                        '/' +
                        window.device +
                        '/' +
                        event.slot.getSlotElementId(),
                      'trd.non_interaction': false,
                    });
                  });
                window.googletag.setAdIframeTitle('ADVERTISEMENT');
                window.googletag.enableServices();
              });
            },
          });
        },
      ]);
    };

    /**
     * Load GPT script
     */
    window.loadGPT = function () {
      var gads = document.createElement('script');
      gads.async = true;
      gads.defer = true;
      gads.type = 'text/javascript';
      gads.src = 'https://www.googletagservices.com/tag/js/gpt.js';
      var node = document.getElementsByTagName('script');
      node = node[node.length - 1];
      node.parentNode.insertBefore(gads, node);
    };

    /**
     * Load PreBid script
     */
    window.loadPreBid = function () {
      // TODO: remove on unload?
      var gads = document.createElement('script');
      gads.async = true;
      gads.defer = true;
      gads.type = 'text/javascript';
      gads.src = window.trd_prebid_path;
      var node = document.getElementsByTagName('script');
      node = node[node.length - 1];
      node.parentNode.insertBefore(gads, node);
    };

    /**
     * Init the Ads on the page
     * note: order of the function is important so don't change it.
     */
    window.initTRDAds = function () {
      if (!isAdEnabled()) {
        return false;
      }
      // lock the function so we don't call it again
      if (window.trd_ad_init === true) {
        return false;
      }
      window.trd_ad_init = true;

      // 0. Load Prebid as fast as possible to get make it available when is called and evaluate siteName.
      setSiteName();
      loadGPT();
      loadPreBid();
      // 1. update the TLAU
      updateTopLevelAdUnit();
      // 3. update the global vars
      updateTRDAds();
      // 4. init GPT
      initGPT();
      // 6. init DFP
      initDFP();
    };
    window.device = getDevice();
    updateTopLevelAdUnit();
  }, []);

  useEffect(() => {
    if (isPageReady) {
      initAds();
    }
  }, [initAds, isPageReady]);
};
