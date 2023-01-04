declare const window: any;

export const initAdsHomepage = () => {
  window.s1 = 'hp';
  window.pid = 'homepage';
  window.pgtype = 'landing';
  window.trd.fn.dynamicAds();
  window.initTRDAds();
};
