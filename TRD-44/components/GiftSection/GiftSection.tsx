import React, { FC, useState } from 'react';
import styles from './GiftSection.module.scss';

interface GiftSectionProps {
  showSubscriptionModal?: (offerId: string, termId: string) => void;
}

export const GiftSection: FC<GiftSectionProps> = ({
  showSubscriptionModal = () => {},
}) => {
  const [offerId, setOfferId] = useState('OFWS2MC61J22');
  // for localhost!!!!!!!
  // const [offerId, setOfferId] = useState('OFC8OJORNIXZ');
  const [termId, setTermId] = useState('TMPOVCV0ZXOO');
  // for localhost!!!!!!!
  // const [termId, setTermId] = useState('TME9633K55DT');

  return (
    <div className={styles.giftContainer}>
      <div className={styles.giftContent}>
        <div className={styles.giftHeader}>
          <h2>Give the gift of The Real Deal!</h2>
          <p>CHOOSE THE GIFT THAT&apos;S RIGHT FOR YOU</p>
        </div>

        <div className={styles.giftList}>
          <div className={styles.giftForm}>
            <label className={styles.giftRadio}>
              <input
                defaultChecked
                type="radio"
                name="gift-term"
                onChange={() => {
                  setOfferId('OFWS2MC61J22');
                  setTermId('TMPOVCV0ZXOO');
                }}
              />
              <span className={styles.giftRadioWrapper}>
                <span className={styles.giftRadioCircle} />
                <span className={styles.giftRadioInfo}>
                  <span className={styles.giftRadioInfoTitle}>
                    1 Year of Digital Access
                  </span>
                  <span className={styles.giftRadioInfoSubtitle}>
                    <s>$249</s> $199 Annual Gift
                  </span>
                </span>
              </span>
            </label>

            <label className={styles.giftRadio}>
              <input
                type="radio"
                name="gift-term"
                onChange={() => {
                  setOfferId('OFWS2MC61J22');
                  setTermId('TMRZ1F0NVIAF');
                }}
              />
              <span className={styles.giftRadioWrapper}>
                <span className={styles.giftRadioCircle} />
                <span className={styles.giftRadioInfo}>
                  <span className={styles.giftRadioInfoTitle}>
                    1 Year of Digital + Print Access
                  </span>
                  <span className={styles.giftRadioInfoSubtitle}>
                    <s>$249</s> $199 Annual Gift
                  </span>
                </span>
              </span>
            </label>

            <label className={styles.giftRadio}>
              <input
                type="radio"
                name="gift-term"
                onChange={() => {
                  setOfferId('OFWS2MC61J22');
                  setTermId('TMVP7CYXLIWJ');
                }}
              />
              <span className={styles.giftRadioWrapper}>
                <span className={styles.giftRadioCircle} />
                <span className={styles.giftRadioInfo}>
                  <span className={styles.giftRadioInfoTitle}>
                    1 Month of Digital Access
                  </span>
                  <span className={styles.giftRadioInfoSubtitle}>
                    $29 Monthly Gift
                  </span>
                </span>
              </span>
            </label>

            <button
              className={styles.giftButton}
              onClick={() => showSubscriptionModal(offerId, termId)}
            >
              <span>give a gift</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
