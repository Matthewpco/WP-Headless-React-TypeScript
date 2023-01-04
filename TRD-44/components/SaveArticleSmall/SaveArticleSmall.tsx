import React, { FC } from 'react';
import cx from 'classnames';
import styles from './SaveArticleSmall.module.scss';
import SaveIcon from '../../assets/icons/save.svg';

export interface SaveArticleSmallProps {
  onSaveArticle: () => void;
  saved: boolean;
  setSaved: (saved: boolean) => void;
}

export const SaveArticleSmall: FC<SaveArticleSmallProps> = ({
  onSaveArticle,
  saved,
  setSaved,
}) => {
  const onActive = () => {
    setSaved(!saved);
    onSaveArticle();
  };

  return (
    <div
      className={cx(styles.saveButton, { [styles.saveButtonActive]: saved })}
      onClick={onActive}
    >
      <SaveIcon
        className={cx({
          [styles.saveIcon]: !saved,
          [styles.saveIconActive]: saved,
        })}
      />
    </div>
  );
};
