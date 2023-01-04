import React, { FC, useMemo } from 'react';
import { RequestPropsForm, ResponsePropsForm } from '../../../graphql';
import { GenericForm } from './GenericForm';
import styles from './BrandStudioForm.module.scss';
import { useGraphqlQuery } from '../../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../../generic/graphql/IdGraphqlQuery';

export interface BrandStudioFormProps {
  formId: number;
}

export const BrandStudioForm: FC<BrandStudioFormProps> = ({ formId }) => {
  const params = useMemo(
    () => ({
      id: formId,
    }),
    [formId],
  );

  const { data } = useGraphqlQuery<ResponsePropsForm, RequestPropsForm>(
    IdGraphqlQuery.getPropsForm,
    params,
  );

  if (!data) {
    return null;
  }

  return (
    <div id="contact-us" className={styles.root}>
      <h3 className={styles.title}>{data?.form?.title}</h3>
      <GenericForm
        className={styles.form}
        fields={data?.form?.fields?.nodes ?? []}
        databaseId={formId}
      />
    </div>
  );
};
