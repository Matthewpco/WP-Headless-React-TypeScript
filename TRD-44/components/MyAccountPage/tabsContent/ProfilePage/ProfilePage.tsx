import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Container } from '../../../Container';
import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { Select } from '../../../Select';
import { StateSelect } from '../../../StateSelect';
import { PianoRepository } from '../../../../piano/pianoRepository';
import { IPianoUser, IUserData } from '../../../../piano/types';
import FacebookIcon from '../../../../assets/icons/facebook-colored.svg';
import GoogleIcon from '../../../../assets/icons/google.svg';

import styles from './ProfilePage.module.scss';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface ProfilePageProps {
  pianoUser: IPianoUser;
  className?: string;
}

export const ProfilePage: FC<ProfilePageProps> = ({ pianoUser, className }) => {
  const [myAccountData, setMyAccountData] = useState<IUserData>({});
  const [isPersonalDetailsEdit, setIsPersonalDetailsEdit] = useState(false);
  const [isBillingAddressEdit, setIsBillingAddressEdit] = useState(false);
  const [isShippingAddressEdit, setIsShippingAddressEdit] = useState(false);

  const personalDetailsFormRef = useRef<HTMLFormElement>(null);
  const billingAddressFormRef = useRef<HTMLFormElement>(null);
  const shippingAddressFormRef = useRef<HTMLFormElement>(null);

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid] = useState(true);
  const [phoneValue, setPhoneValue] = useState('');
  const [isPhoneValid] = useState(true);

  const fetchUserData = () => {
    PianoRepository.getUserData(pianoUser.uid).then((data) => {
      setMyAccountData(data);
    });
  };

  useEffect(() => {
    if (pianoUser.uid) {
      fetchUserData();
    }

    if (window.tp) {
      window.tp = window.tp || [];
      window.tp.push(['init', () => PianoRepository.handleSocialLoginResult()]);
    }
  }, [pianoUser.uid]);

  useEffect(() => {
    setEmailValue(myAccountData.personalDetails?.email || '');
    setPhoneValue(myAccountData.personalDetails?.phone || '');
  }, [myAccountData]);

  return (
    <Container className={cx(className, styles.root)}>
      <div className={styles.buttons}>
        <Button
          rounded
          size="large"
          className={styles.button}
          onClick={() => PianoRepository.doSocialLogin('GOOGLE')}
        >
          Connect
          <GoogleIcon />
        </Button>

        <Button
          rounded
          size="large"
          className={styles.button}
          onClick={() => PianoRepository.doSocialLogin('FACEBOOK')}
        >
          Connect
          <FacebookIcon />
        </Button>

        <Button
          rounded
          size="large"
          onClick={() => PianoRepository.resetPassword(pianoUser.email)}
          className={cx(styles.button, styles.resetButton)}
        >
          Reset password
        </Button>
      </div>

      <div
        className={cx(styles.section, {
          [styles.sectionEdit]: isPersonalDetailsEdit,
        })}
      >
        <div className={styles.sectionTitle}>
          Personal details
          {!isPersonalDetailsEdit && (
            <Button
              onClick={() => setIsPersonalDetailsEdit(true)}
              className={styles.editButton}
            >
              EDIT
            </Button>
          )}
          {isPersonalDetailsEdit && (
            <div className={styles.profileEditButtonsGroup}>
              <Button onClick={() => setIsPersonalDetailsEdit(false)}>
                CANCEL
              </Button>
              <Button
                color="primary"
                disabled={!isPhoneValid || !isEmailValid}
                onClick={() => {
                  const formElements = Array.from(
                    personalDetailsFormRef?.current?.elements ?? [],
                  );
                  const personalDetails = formElements.reduce(
                    (buffer, element: any) => ({
                      ...buffer,
                      [element?.name]: element?.value,
                    }),
                    myAccountData.personalDetails ?? {},
                  );

                  PianoRepository.updateUserData({
                    ...myAccountData,
                    personalDetails,
                  }).then((data) => {
                    if (data?.data?.code === 0) {
                      fetchUserData();
                      setIsPersonalDetailsEdit(false);
                    } else {
                      // eslint-disable-next-line no-alert
                      alert(
                        data?.data?.message ??
                          Object.values(data?.data?.validation_errors).join(
                            '\n',
                          ),
                      );
                    }
                  });
                }}
              >
                SAVE
              </Button>
            </div>
          )}
        </div>
        <form
          ref={personalDetailsFormRef}
          className={styles.sectionFieldsWrapper}
        >
          <div className={styles.sectionField}>
            <div className={styles.fieldName}>First name:</div>
            <div className={styles.fieldValue}>
              {myAccountData.personalDetails?.firstName}
            </div>
            <Input
              className={styles.fieldEdit}
              name="firstName"
              defaultValue={myAccountData.personalDetails?.firstName}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Last name:</div>
            <div className={styles.fieldValue}>
              {myAccountData.personalDetails?.lastName}
            </div>
            <Input
              className={styles.fieldEdit}
              name="lastName"
              defaultValue={myAccountData.personalDetails?.lastName}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Email address:</div>
            <div className={styles.fieldValue}>{emailValue}</div>
            <Input
              className={styles.fieldEdit}
              name="email"
              type="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            {!isEmailValid && (
              <div className={styles.fieldError}>Please check email format</div>
            )}
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Phone:</div>
            <div className={styles.fieldValue}>
              {myAccountData.personalDetails?.phone}
            </div>
            <Input
              className={styles.fieldEdit}
              name="phone"
              type="tel"
              value={phoneValue}
              onChange={(e) => setPhoneValue(e.target.value)}
            />
            {!isPhoneValid && (
              <div className={styles.fieldError}>Please check phone format</div>
            )}
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Job title:</div>
            <div className={styles.fieldValue}>
              {myAccountData.personalDetails?.jobTitle}
            </div>
            <Select
              className={styles.fieldEdit}
              name="jobTitle"
              title="Job title"
              initialValue={myAccountData.personalDetails?.jobTitle}
              options={myAccountData?.options?.jobTitle ?? []}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Job role:</div>
            <div className={styles.fieldValue}>
              {myAccountData.personalDetails?.jobRole}
            </div>
            <Select
              className={styles.fieldEdit}
              name="jobRole"
              title="Job role"
              initialValue={myAccountData.personalDetails?.jobRole}
              options={myAccountData?.options?.jobRole ?? []}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Industry:</div>
            <div className={styles.fieldValue}>
              {myAccountData.personalDetails?.jobIndustry}
            </div>
            <Select
              className={styles.fieldEdit}
              name="jobIndustry"
              title="Job industry"
              initialValue={myAccountData.personalDetails?.jobIndustry}
              options={myAccountData?.options?.jobIndustry ?? []}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Company:</div>
            <div className={styles.fieldValue}>
              {myAccountData.personalDetails?.company}
            </div>
            <Input
              className={styles.fieldEdit}
              name="company"
              defaultValue={myAccountData.personalDetails?.company}
            />
          </div>
        </form>
      </div>

      <div
        className={cx(styles.section, {
          [styles.sectionEdit]: isShippingAddressEdit,
        })}
      >
        <div className={styles.sectionTitle}>
          Shipping address
          {!isShippingAddressEdit && (
            <Button
              onClick={() => setIsShippingAddressEdit(true)}
              className={styles.editButton}
            >
              EDIT
            </Button>
          )}
          {isShippingAddressEdit && (
            <div className={styles.profileEditButtonsGroup}>
              <Button onClick={() => setIsShippingAddressEdit(false)}>
                CANCEL
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  const formElements = Array.from(
                    shippingAddressFormRef?.current?.elements ?? [],
                  );
                  const shippingAddress = formElements.reduce(
                    (buffer, element: any) => ({
                      ...buffer,
                      [element?.name]: element?.value,
                    }),
                    {},
                  );

                  PianoRepository.updateUserData({
                    ...myAccountData,
                    shippingAddress,
                  }).then((data) => {
                    if (data?.data?.code === 0) {
                      fetchUserData();
                      setIsShippingAddressEdit(false);
                    } else {
                      // eslint-disable-next-line no-alert
                      alert(
                        data?.data?.message ??
                          Object.values(data?.data?.validation_errors).join(
                            '\n',
                          ),
                      );
                    }
                  });
                }}
              >
                SAVE
              </Button>
            </div>
          )}
        </div>
        <form
          ref={shippingAddressFormRef}
          className={styles.sectionFieldsWrapper}
        >
          <div className={styles.sectionField}>
            <div className={styles.fieldName}>First name:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.firstName}
            </div>
            <Input
              className={styles.fieldEdit}
              name="firstName"
              defaultValue={myAccountData.shippingAddress?.firstName}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Last name:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.lastName}
            </div>
            <Input
              className={styles.fieldEdit}
              name="lastName"
              defaultValue={myAccountData.shippingAddress?.lastName}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Address 1:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.streetAddress1}
            </div>
            <Input
              className={styles.fieldEdit}
              name="streetAddress1"
              defaultValue={myAccountData.shippingAddress?.streetAddress1}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Address 2:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.streetAddress2}
            </div>
            <Input
              className={styles.fieldEdit}
              name="streetAddress2"
              defaultValue={myAccountData.shippingAddress?.streetAddress2}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>City:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.city}
            </div>
            <Input
              className={styles.fieldEdit}
              name="city"
              defaultValue={myAccountData.shippingAddress?.city}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Country:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.country}
            </div>
            <Select
              className={styles.fieldEdit}
              name="country"
              title="Select a country"
              initialValue={myAccountData.shippingAddress?.country}
              options={myAccountData?.options?.country ?? []}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>State:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.region}
            </div>
            <StateSelect
              className={styles.fieldEdit}
              name="region"
              title="Select a state"
              initialValue={myAccountData.shippingAddress?.region}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Postal code:</div>
            <div className={styles.fieldValue}>
              {myAccountData.shippingAddress?.zip}
            </div>
            <Input
              name="zip"
              className={styles.fieldEdit}
              defaultValue={myAccountData.shippingAddress?.zip}
            />
          </div>
        </form>
      </div>

      <div
        className={cx(styles.section, {
          [styles.sectionEdit]: isBillingAddressEdit,
        })}
      >
        <div className={styles.sectionTitle}>
          Billing address
          {!isBillingAddressEdit && (
            <Button
              onClick={() => setIsBillingAddressEdit(true)}
              className={styles.editButton}
            >
              EDIT
            </Button>
          )}
          {isBillingAddressEdit && (
            <div className={styles.profileEditButtonsGroup}>
              <Button onClick={() => setIsBillingAddressEdit(false)}>
                CANCEL
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  const formElements = Array.from(
                    billingAddressFormRef?.current?.elements ?? [],
                  );
                  const billingAddress = formElements.reduce(
                    (buffer, element: any) => ({
                      ...buffer,
                      [element?.name]: element?.value,
                    }),
                    {},
                  );

                  PianoRepository.updateUserData({
                    ...myAccountData,
                    billingAddress,
                  }).then((data) => {
                    if (data?.data?.code === 0) {
                      fetchUserData();
                      setIsBillingAddressEdit(false);
                    } else {
                      // eslint-disable-next-line no-alert
                      alert(
                        data?.data?.message ??
                          Object.values(data?.data?.validation_errors).join(
                            '\n',
                          ),
                      );
                    }
                  });
                }}
              >
                SAVE
              </Button>
            </div>
          )}
        </div>
        <form
          ref={billingAddressFormRef}
          className={styles.sectionFieldsWrapper}
        >
          <div className={styles.sectionField}>
            <div className={styles.fieldName}>First name:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.firstName}
            </div>
            <Input
              className={styles.fieldEdit}
              name="firstName"
              defaultValue={myAccountData.billingAddress?.firstName}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Last name:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.lastName}
            </div>
            <Input
              className={styles.fieldEdit}
              name="lastName"
              defaultValue={myAccountData.billingAddress?.lastName}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Address 1:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.streetAddress1}
            </div>
            <Input
              className={styles.fieldEdit}
              name="streetAddress1"
              defaultValue={myAccountData.billingAddress?.streetAddress1}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Address 2:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.streetAddress2}
            </div>
            <Input
              className={styles.fieldEdit}
              name="streetAddress2"
              defaultValue={myAccountData.billingAddress?.streetAddress2}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>City:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.city}
            </div>
            <Input
              className={styles.fieldEdit}
              name="city"
              defaultValue={myAccountData.billingAddress?.city}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Country:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.country}
            </div>
            <Select
              className={styles.fieldEdit}
              name="country"
              title="Select a country"
              initialValue={myAccountData.billingAddress?.country}
              options={myAccountData?.options?.country ?? []}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>State:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.region ?? ''}
            </div>
            <StateSelect
              className={styles.fieldEdit}
              name="region"
              title="Select a state"
              initialValue={myAccountData.billingAddress?.region}
            />
          </div>

          <div className={styles.sectionField}>
            <div className={styles.fieldName}>Postal code:</div>
            <div className={styles.fieldValue}>
              {myAccountData.billingAddress?.zip}
            </div>
            <Input
              className={styles.fieldEdit}
              name="zip"
              defaultValue={myAccountData.billingAddress?.zip}
            />
          </div>
        </form>
      </div>
    </Container>
  );
};
