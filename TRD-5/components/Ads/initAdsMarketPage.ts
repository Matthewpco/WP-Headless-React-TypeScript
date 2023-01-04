declare const window: any;

export const initAdsMarketPage = () => {
  window.s1 = 'hp';
  window.pid = window.location.pathname.replace('/', '');
  window.pgtype = 'landing';
  window.trd.fn.dynamicAds();
  window.initTRDAds();
};
