import React from 'react';
import { Newsletter} from '../../Newsletter';
import styles from './MainBlock.module.scss';

// Changes the reference array
export const pipeNewsletterSignupForm = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    try {
      nodes.splice(
        index,
        1,
        <Newsletter key={`Newsletter_${index}`} className={styles.newsletter} />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
