declare const window: any;

export const initAdsBlogroll = (slug?: string) => {
  window.s1 = 'news';
  window.pid = slug || window.location.pathname;
  window.pgtype = 'landing';
  window.trd.fn.dynamicAds();
  window.initTRDAds();
};
