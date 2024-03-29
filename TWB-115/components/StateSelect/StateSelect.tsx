import React, { DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';
import cx from 'classnames';
import { List } from '../List';
import styles from './StateSelect.module.scss';

export interface StateSelectProps
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  initialValue?: string;
  title?: string;
}

export const StateSelect: FC<StateSelectProps> = ({
  initialValue,
  title,
  className,
  ...props
}) => {
  const renderOption = ({ key, name }: { key: string, name: string }) => (
    <option key={key} selected={initialValue === key} value={key}>{name}</option>
  );

  const states = [
    { key: 'AL', name: 'Alabama' },
    { key: 'AK', name: 'Alaska' },
    { key: 'AZ', name: 'Arizona' },
    { key: 'AR', name: 'Arkansas' },
    { key: 'CA', name: 'California' },
    { key: 'CO', name: 'Colorado' },
    { key: 'CT', name: 'Connecticut' },
    { key: 'DE', name: 'Delaware' },
    { key: 'DC', name: 'District Of Columbia' },
    { key: 'FL', name: 'Florida' },
    { key: 'GA', name: 'Georgia' },
    { key: 'HI', name: 'Hawaii' },
    { key: 'ID', name: 'Idaho' },
    { key: 'IL', name: 'Illinois' },
    { key: 'IN', name: 'Indiana' },
    { key: 'IA', name: 'Iowa' },
    { key: 'KS', name: 'Kansas' },
    { key: 'KY', name: 'Kentucky' },
    { key: 'LA', name: 'Louisiana' },
    { key: 'ME', name: 'Maine' },
    { key: 'MD', name: 'Maryland' },
    { key: 'MA', name: 'Massachusetts' },
    { key: 'MI', name: 'Michigan' },
    { key: 'MN', name: 'Minnesota' },
    { key: 'MS', name: 'Mississippi' },
    { key: 'MO', name: 'Missouri' },
    { key: 'MT', name: 'Montana' },
    { key: 'NE', name: 'Nebraska' },
    { key: 'NV', name: 'Nevada' },
    { key: 'NH', name: 'New Hampshire' },
    { key: 'NJ', name: 'New Jersey' },
    { key: 'NM', name: 'New Mexico' },
    { key: 'NY', name: 'New York' },
    { key: 'NC', name: 'North Carolina' },
    { key: 'ND', name: 'North Dakota' },
    { key: 'OH', name: 'Ohio' },
    { key: 'OK', name: 'Oklahoma' },
    { key: 'OR', name: 'Oregon' },
    { key: 'PA', name: 'Pennsylvania' },
    { key: 'RI', name: 'Rhode Island' },
    { key: 'SC', name: 'South Carolina' },
    { key: 'SD', name: 'South Dakota' },
    { key: 'TN', name: 'Tennessee' },
    { key: 'TX', name: 'Texas' },
    { key: 'UT', name: 'Utah' },
    { key: 'VT', name: 'Vermont' },
    { key: 'VA', name: 'Virginia' },
    { key: 'WA', name: 'Washington' },
    { key: 'WV', name: 'West Virginia' },
    { key: 'WI', name: 'Wisconsin' },
    { key: 'WY', name: 'Wyoming' },
  ];
  const usTerritories = [
    { key: 'AS', name: 'American Samoa' },
    { key: 'GU', name: 'Guam' },
    { key: 'MP', name: 'Northern Mariana Islands' },
    { key: 'PR', name: 'Puerto Rico' },
    { key: 'UM', name: 'United States Minor Outlying Islands' },
    { key: 'VI', name: 'Virgin Islands' },
  ];
  const armedForces = [
    { key: 'AA', name: 'Armed Forces Americas' },
    { key: 'AP', name: 'Armed Forces Pacific' },
    { key: 'AE', name: 'Armed Forces Others' },
  ];

  return (
    <select
      {...props}
      className={cx(styles.root, className)}
    >
      <option selected disabled value="">
        {title}
      </option>

      <optgroup label="States and District">
        <List items={usTerritories} render={renderOption} />
      </optgroup>

      <optgroup label="US Territories">
        <List items={states} render={renderOption} />
      </optgroup>

      <optgroup label="Armed Forces">
        <List items={armedForces} render={renderOption} />
      </optgroup>
    </select>
  );
};
