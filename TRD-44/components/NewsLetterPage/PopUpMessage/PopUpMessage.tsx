import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import CloseButton from '../../../assets/icons/closeButton.svg';
import styles from './PopUpMessage.module.scss';

interface Iprops {
    message: string;
    className?: string;
    closePopUp: (arg: false) => void;
}

export const PopUpMessage: FC<Iprops> = ({message, className, closePopUp}) => {
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();
    useEffect(() => {
        const id = setTimeout(() => closePopUp(false), 5000);
        setTimerId(id);
    }, []);
return (
  <div className={cx(styles.root, className)}>
    <span>{message}</span>
    <CloseButton
      className={styles.closeButton}
      onClick={() => {
        if (timerId) clearTimeout(timerId);
        closePopUp(false);
      }}
    />
  </div>
    );
};
