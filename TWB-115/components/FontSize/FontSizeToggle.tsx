import React, { FC, useContext } from 'react';
import cx from 'classnames';
import styles from './FontSizeToggle.module.scss';
import { Button } from '../Button';
import { FontSizeSelectorProps } from './FontSizeSelectorProps';
import { FontSize } from '../../generic/types';
import { findNext } from '../../generic/utils';
import { fontSizeItems } from './fontSizeItems';
import { ContextFontSize } from './ContextFontSize';

const mapFontSizeClassName = new Map<FontSize, string>([
  ['small', styles.small],
  ['medium', styles.medium],
  ['large', styles.large],
]);

export const FontSizeToggle: FC<FontSizeSelectorProps> = ({ className }) => {
  const { size, onChange } = useContext(ContextFontSize);

  return (
    <Button
      bordered
      color="secondary"
      className={cx(mapFontSizeClassName.get(size), className, styles.root)}
      onClick={() => onChange(findNext(fontSizeItems, size))}
    >
      A
    </Button>
  );
};
