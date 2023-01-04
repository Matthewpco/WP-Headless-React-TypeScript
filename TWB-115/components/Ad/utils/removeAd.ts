import { Device } from '../ContextAds';

declare const window: any;

export const removeAd = (id: string, slot: any, slotName: string, device: Device) => {
  window.googletag.cmd.push(() => {
    if (slot) {
      window.googletag.destroySlots([slot]);
      window.dataLayer.push({
        event: 'event_tracking',
        'trd.action': 'destroy',
        'trd.category': 'dynamic ads',
        'trd.label': `${slotName}/${device}/${id}`,
        'trd.non_interaction': false,
      });
    }
  });
};
