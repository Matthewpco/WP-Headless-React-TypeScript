import React, { forwardRef } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { Color, Size } from '../../generic/types';
import { LinkProps } from '../Link';

const colorMap = new Map<Color, string>([
  ['default', styles.default],
  ['primary', styles.primary],
  ['secondary', styles.secondary],
]);

const sizeMap = new Map<Size, string>([
  ['small', styles.small],
  ['medium', styles.medium],
  ['large', styles.large],
]);

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    Pick<Partial<LinkProps>, 'href'> {
  active?: boolean;
  square?: boolean;
  bordered?: boolean;
  color?: Color;
  component?: any;
  fullWidth?: boolean;
  rounded?: boolean;
  size?: Size;
  endIcon?: any;
  startIcon?: any;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      active = false,
      square = false,
      bordered = false,
      children,
      className,
      color = 'default',
      fullWidth = false,
      rounded = false,
      size = 'medium',

      component: Component = 'button',

      startIcon: StartIcon,
      endIcon: EndIcon,
      ...props
    },
    ref,
  ) => (
    <Component
      {...props}
      ref={ref}
      className={cx(
        className,
        styles.root,
        colorMap.get(color),
        sizeMap.get(size),
        {
          [styles.fullWidth]: fullWidth,
          [styles.rounded]: rounded,
          [styles.bordered]: bordered,
          [styles.hasStartIcon]: !!StartIcon,
          [styles.hasEndIcon]: !!EndIcon,
          [styles.square]: square,
          [styles.active]: active,
        },
      )}
    >
      {StartIcon && <StartIcon className={cx(styles.icon, styles.startIcon)} />}
      {children}
      {EndIcon && <EndIcon className={cx(styles.icon, styles.endIcon)} />}
    </Component>
  ),
);
