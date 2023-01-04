import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './Confetti.module.scss';
import { List } from '../../../../List';

export const Confetti = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const { top } = container.current.getBoundingClientRect();
      container.current.style.top = `${Math.abs(top)}px`;
    }
  }, []);
  return (
    <div ref={container} className={styles.container}>
      <div className={styles.wrapper}>
        <List
          items={Array(150).fill(0)}
          render={
        (item, index) => (
          <div className={cx(`confetti-${index}`, styles.confetti)} />
        )
      }
        />
      </div>
    </div>
  );
};
