import React, { FC } from 'react';
import cx from 'classnames';
import styles from './FormToAuthor.module.scss';
import { Button } from '../../Button';
import CloseButton from '../../../assets/icons/closeButton.svg';
import { Size } from '../../../generic/types';

interface PopUpMessageProps {
  className?: string;
  message: string;
  size?: Size;
  responseStatus: boolean;
  onClose: () => void;
}

export const PopUpMessage: FC<PopUpMessageProps> = ({
  size = 'medium',
  className,
  message,
  responseStatus,
  onClose,
}) => (
  <div className={cx(className, styles.root)}>
    <CloseButton className={styles.closeButton} onClick={onClose} />
    {responseStatus && (
      <div className={cx(styles.thankYou, styles.message)}>Thank you!</div>
    )}
    <div className={styles.message}>{message}</div>
    <div className={styles.submitButton}>
      <Button color="primary" size={size} rounded onClick={onClose}>
        CLOSE
      </Button>
    </div>
  </div>
);
