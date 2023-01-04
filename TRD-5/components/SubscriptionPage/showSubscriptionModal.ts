declare const window: any;

export const showSubscriptionModal = (offerId: string, termId: string) => {
  window.tp = window.tp || [];
  window.tp.push([
    'init',
    () => {
      window.tp.offer.startCheckout({
        offerId,
        termId: [termId],
      });
    },
  ]);
};
