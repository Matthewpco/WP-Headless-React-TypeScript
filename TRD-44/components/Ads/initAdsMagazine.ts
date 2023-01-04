declare const window: any;

export const initAdsMagazine = (slug: string) => {
  window.s1 = 'magazine';
  window.pid = slug;
  window.pgtype = 'magazineissue';
  window.trd.fn.dynamicAds();
  window.initTRDAds();
};
