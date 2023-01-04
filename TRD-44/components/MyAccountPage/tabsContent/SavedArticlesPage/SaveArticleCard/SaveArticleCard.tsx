import React, { FC, useEffect, useState } from 'react';
import SaveIcon from '../../../../../assets/icons/save-red.svg';
import { PopUpMessage } from '../../../../NewsLetterPage/PopUpMessage/PopUpMessage';
import {
  RequestToggleArticle,
  ResponseToggleArticle,
} from '../../../../../graphql/toggleArticleForPiano';
import styles from './SaveArticleCard.module.scss';
import { IdGraphqlMutation } from '../../../../../generic/graphql/IdGraphqlMutation';
import { useGraphqlMutation } from '../../../../../generic/graphql/useGraphqlMutation';
import { useHost } from '../../../../../generic/hooks';
import { Link } from '../../../../Link';

export interface SaveArticleCardProps {
  title: string;
  featuredImageUri: string;
  date: Date;
  databaseId: number;
  refetch: () => void;
  formatting?: Intl.DateTimeFormatOptions;
  link: string;
}

export const SaveArticleCard: FC<SaveArticleCardProps> = ({
  title,
  link,
  featuredImageUri,
  date,
  databaseId,
  refetch,
  formatting = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(localStorage.pianoId);
  }, []);

  const [onDelete] = useGraphqlMutation<
    ResponseToggleArticle,
    RequestToggleArticle
  >(IdGraphqlMutation.toggleArticleForPiano);

  const onDeleteArticle = () => {
    onDelete({
      databaseId,
      userIdPiano: userId,
    })
      .then(({ data }) => {
        refetch();
        setMessage(data?.toggleArticleForPiano?.message ?? '');
        setShowMessage(true);
      })
      .catch(() => {
        setMessage('The article is not removed');
        setShowMessage(true);
      });
  };

  const hostName = useHost();

  return (
    <div className={styles.article}>
      <Link href={link} passHref>
        <div className={styles.articleInfo}>
          <img
            src={`${hostName}${featuredImageUri}`}
            alt={title}
            className={styles.articleImage}
            loading="lazy"
          />
          <div>
            <p className={styles.articleDate}>
              {date.toLocaleDateString('en-US', formatting)}
            </p>
            <p className={styles.articleText}>{title}</p>
          </div>
        </div>
      </Link>
      <SaveIcon className={styles.articleIcon} onClick={onDeleteArticle} />
      {showMessage && (
        <PopUpMessage
          className={styles.message}
          message={message}
          closePopUp={setShowMessage}
        />
      )}
    </div>
  );
};
