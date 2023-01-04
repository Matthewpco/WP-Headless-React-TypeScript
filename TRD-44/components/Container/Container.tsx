import React, { forwardRef, PropsWithChildren } from 'react';
import cx from 'classnames';
import styles from './Container.module.scss';

export interface ContainerProps {
  className?: string;
  id?: string;
}

export const Container = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ContainerProps>
>(({ children, className, id }, ref) => (
  <div ref={ref} className={cx(styles.root, className)} id={id}>
    {children}
  </div>
));
