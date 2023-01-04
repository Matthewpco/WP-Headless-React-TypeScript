import { useEffect } from 'react';
import { showSubscriptionModal } from '../SubscriptionPage/showSubscriptionModal';

export const usePianoMessage = () => {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const data: {
          type: 'showOffer';
          data: { offerId: string; termId: string };
        } = JSON.parse(event.data);
        if (data && data.type === 'showOffer') {
          showSubscriptionModal(data.data.offerId, data.data.termId);
        }
      } catch {
        //
      }
    };

    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, []);
};
