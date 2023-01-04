import React, { FC, useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  defaultChecked,
  ...props
}) => {
  const [checked, setChecked] = useState<boolean>(!!defaultChecked);
  useEffect(() => {
    setChecked(!!defaultChecked);
  }, [defaultChecked]);
  return (
    <span className={className}>
      <input
        {...props}
        checked={checked}
        className={styles.input}
        type="checkbox"
        onClick={() => {
          setChecked(!checked);
        }}
      />
      <div className={styles.checkbox} />
    </span>
  );
};
