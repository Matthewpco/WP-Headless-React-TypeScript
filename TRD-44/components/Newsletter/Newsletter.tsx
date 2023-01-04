import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Field, FieldAttributes, Form, Formik } from 'formik';
import cx from 'classnames';
import styles from './Newsletter.module.scss';
import { CheckboxLabel } from '../Checkbox';
import { NewsletterForm } from './NewsletterForm';
import { NewsletterSection, NewsletterSubject } from '../../graphql';
import { List } from '../List';
import {
  useContextNewsletter,
  useCreateNewsLetterSubscription,
} from '../NewsLetterPage/useContextNewsletter';
import MailSendIcon from '../../assets/icons/mail-send.svg';
import { extractEmailFromLocalstorage } from '../NewsLetterPage/extractEmailFromLocalstorage';
import { RequestUpdateNewsletterSubscription } from '../../graphql/updateNewsletterSubscription';

export interface NewsletterProps {
  className?: string;
}

const renderSubject = ({ value, label, subscribed }: NewsletterSubject) => (
  <Field key={value} name="lists" value={value}>
    {({ field }: FieldAttributes<any>) => (
      <CheckboxLabel
        {...field}
        name="lists"
        value={value}
        defaultChecked={subscribed}
        className={styles.checkboxLabel}
      >
        {label}
      </CheckboxLabel>
    )}
  </Field>
);

const renderSection = ({ name, list }: NewsletterSection) => (
  <div className={styles.column} key={name}>
    <div className={styles.columnHeader}>{name}</div>
    <div className={styles.columnItems}>
      <List items={list} render={renderSubject} />
    </div>
  </div>
);

export const Newsletter: FC<NewsletterProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const email = useMemo(() => extractEmailFromLocalstorage(), []);
  const [data, setData] = useState<NewsletterSection[]>([]);
  const [initialValues, setInitialValues] =
    useState<RequestUpdateNewsletterSubscription>();

  const { data: fetchedData } = useContextNewsletter(email);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);

      const lists: string[] = fetchedData
        .reduce(
          (buffer: NewsletterSubject[], category) => [
            ...buffer,
            ...category.list,
          ],
          [],
        )
        .filter((item) => item.subscribed)
        .map((item) => item.value);
      if (initialValues?.lists?.length && !lists.length) return;
      setInitialValues({ email: email ?? '', lists });
    }
  }, [fetchedData]);

  const toggleExpanded = useCallback(
    () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded],
  );
  const { onSubmit } = useCreateNewsLetterSubscription();

  if (!initialValues) {
    return null;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values.email, values.lists ?? [], window.location.pathname)}
    >
      <Form
        className={cx(styles.root, className, {
          [styles.expanded]: isExpanded,
        })}
      >
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <MailSendIcon className={styles.headerImage} />
            <span className={styles.headerText}>
              Top stories delivered to your inbox
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          <List items={data} render={renderSection} />
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLink}>
            <div className={styles.expand} onClick={toggleExpanded}>
              {isExpanded ? 'HIDE NEWSLETTERS' : 'VIEW ALL NEWSLETTERS'}
            </div>
          </div>

          <NewsletterForm size="large" className={styles.form} />
        </div>
      </Form>
    </Formik>
  );
};
