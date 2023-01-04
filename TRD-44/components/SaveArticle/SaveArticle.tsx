import React, { FC } from 'react';
import cx from 'classnames';
import SaveIcon from '../../assets/icons/save.svg';
import styles from './SaveArticle.module.scss';

export interface SaveArticleProps {
  onSaveArticle: () => void;
  saved: boolean;
  setSaved: (saved: boolean) => void;
}

export const SaveArticle: FC<SaveArticleProps> = ({
  onSaveArticle,
  saved,
  setSaved,
}) => {
  const onActive = () => {
    setSaved(!saved);
    onSaveArticle();
  };

  return (
    <section className={styles.save} onClick={onActive}>
      <SaveIcon
        className={cx({
          [styles.saveIcon]: !saved,
          [styles.saveIconActive]: saved,
        })}
      />
      <p>Save article</p>
    </section>
  );
};
