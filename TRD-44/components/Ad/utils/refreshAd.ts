declare const window: any;

const refreshAdInternal = (id: string, slot: any) => {
  window.googletag.pubads().refresh([slot]);
  window.dataLayer.push({
    event: 'event_tracking',
    'trd.action': 'refresh',
    'trd.category': 'dynamic ads',
    'trd.label': `${window.slotName}/${window.device}/${id}`,
    'trd.non_interaction': false,
  });
};

export const refreshAd = (id: string, slot: any, isOutOfPage = false) => {
  if (isOutOfPage) {
    refreshAdInternal(id, slot);
  } else {
    window.pbjs.que.push(() => {
      window.pbjs.requestBids({
        timeout: window.TIMEOUT,
        adUnitCodes: [id],
        bidsBackHandler: () => {
          window.pbjs.setTargetingForGPTAsync([id]);
          refreshAdInternal(id, slot);
        },
      });
    });
  }
};
