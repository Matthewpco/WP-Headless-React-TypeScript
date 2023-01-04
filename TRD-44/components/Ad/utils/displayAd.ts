import { AdSize } from '../units/AdUnit';
import { Device } from '../ContextAds';

declare const window: any;

export const displayAd = (
  id: string,
  size: AdSize,
  slotName: string,
  device: Device,
  onDisplay: (slot: any) => void,
) => {
  let slot: any;
  window.googletag.cmd.push(() => {
    if (size === 'OutOfPage') {
      slot = window.googletag
        .defineOutOfPageSlot(slotName, id)
        ?.addService(window.googletag.pubads())
        ?.setTargeting('pos', id);
      // Display OOO now
      window.googletag.display(id);
    } else {
      slot = window.googletag
        .defineSlot(slotName, size, id)
        ?.addService(window.googletag.pubads())
        ?.setTargeting('pos', id);
      // Make bid requests with the display as a callback
      window.pbjs.que.push(() => {
        window.pbjs.loadDynamicAds(
          [
            {
              code: id,
              topLevelAdUnit: window.topLevelAdUnit,
              slotName,
              pos: id,
              size,
            },
          ],
          2000,
          () => {
            window.googletag.display(id);
          },
        );
      });
    }

    window.dataLayer.push({
      event: 'event_tracking',
      'trd.action': 'display',
      'trd.category': 'dynamic ads',
      'trd.label': `${slotName}/${device}/${id}`,
      'trd.non_interaction': false,
    });
    onDisplay(slot);
  });
};
