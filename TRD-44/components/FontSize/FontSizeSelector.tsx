import React, { FC, useContext } from 'react';
import cx from 'classnames';
import { List } from '../List';
import { Button } from '../Button';
import styles from './FontSizeSelector.module.scss';
import { FontSize } from '../../generic/types';
import { fontSizeItems } from './fontSizeItems';
import { FontSizeSelectorProps } from './FontSizeSelectorProps';
import { ContextFontSize } from './ContextFontSize';

export const mapFontSizeClassName = new Map<FontSize, string>([
  ['small', styles.small],
  ['medium', styles.medium],
  ['large', styles.large],
]);

export const FontSizeSelector: FC<FontSizeSelectorProps> = ({
  showTitle = true,
  className,
}) => {
  const { size, onChange } = useContext(ContextFontSize);

  const renderItem = (item: FontSize) => (
    <Button
      key={item}
      active={size === item}
      square
      bordered
      color="secondary"
      className={cx(mapFontSizeClassName.get(item), styles.button)}
      onClick={() => onChange(item)}
    >
      A
    </Button>
  );

  return (
    <section className={cx(styles.root, className)}>
      {
        showTitle && <p className={styles.title}>FONT SIZE</p>
      }
      <div className={styles.list}>
        <List items={fontSizeItems} render={renderItem} />
      </div>
    </section>
  );
};
