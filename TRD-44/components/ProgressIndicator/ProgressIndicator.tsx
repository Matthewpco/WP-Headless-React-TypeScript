import React, { FC, useRef, useEffect } from 'react';
import styles from './ProgressIndicator.module.scss';
import { useDebounce } from '../../generic/hooks';

interface Props {
  percentCompleted: number;
}

export const ProgressIndicator:FC<Props> = ({percentCompleted}) => {
  const indicator = useRef<HTMLDivElement>(null);

  const timer = useDebounce(3000);

  useEffect(() => {
    const ref = indicator.current;
    if (ref) {
      ref.style.width = `${percentCompleted}%`;
    }
    if (percentCompleted === 100) {
      timer(() => {
        if (ref) {
          ref.style.display = 'none';
        }
      });
    }
  }, [percentCompleted]);

  return (
    <div className={styles.root} ref={indicator} />
  );
};
