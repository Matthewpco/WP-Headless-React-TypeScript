import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { Container } from '../Container';
import styles from './PasswordResetPage.module.scss';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface PasswordResetPageProps {
  className?: string;
}

/**
 * TRD Password Reset page component.
 *
 * A simple page layout that provides a container for Piano to display
 * its `Password Reset` form in an iframe.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} password reset page layout.
 */
export const PasswordResetPage: FC<PasswordResetPageProps> = ({
  className,
}): React.ReactElement => {
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);
  const [showLogInMessage, setShowLogInMessage] = useState(false);

  // Once page loaded display Piano Password Reset form.
  useEffect(() => {
    const tp = window?.tp || [];
    tp.push(['setUsePianoIdUserProvider', true]);
    tp.push([
      'init',
      () => {
        // Password can be reset only if user is anonymous
        if (!tp.user.isUserValid()) {
          // If URL has reset_token parameter
          const tokenMatch = window.location.search.match(
            /reset_token=([A-Za-z0-9]+)/,
          );
          if (tokenMatch) {
            // Get value of the token
            const token = tokenMatch[1];
            // Present password reset form with the found token
            tp.pianoId.show({
              displayMode: 'inline',
              containerSelector: '#password-reset-form',
              resetPasswordToken: token,
              loggedIn: () => {
                // Once user logs in - refresh the page
                window.location.replace(
                  `${window.location.origin}/?utm_source=internal&utm_medium=subscription_password_reset_page`,
                );
              },
            });
          } else {
            // Show expired token message
            setShowExpiredMessage(true);

            tp.pianoId.show({
              displayMode: 'inline',
              containerSelector: '#password-reset-form',
              screen: 'restore',
            });
          }
        } else {
          // Show logged in message
          setShowLogInMessage(true);
        }
      },
    ]);
  });

  return (
    <>
      <ProgressIndicator percentCompleted={100} />
      <Container className={className}>
        {showLogInMessage ? (
          <div
            className={`${styles.loggedInMessage}`}
            id="logged-in-message"
            role="alert"
          >
            We noticed you are currently signed in as{' '}
            <span id="piano-user-email">
              {window?.tp?.pianoId?.getUser().email}
            </span>
            , please visit the{' '}
            <Link href="/my-account/?utm_source=internal&utm_medium=reset-password-page">
              <a>My Account</a>
            </Link>{' '}
            section to reset your password.{' '}
            <Link href="/sign-out" id="piano-signout">
              <a>
                Not{' '}
                <span id="piano-user-email">
                  {window?.tp?.pianoId?.getUser().email}
                </span>{' '}
                ? signout here
              </a>
            </Link>
            .
          </div>
        ) : null}

        {showExpiredMessage ? (
          <div
            className={`${styles.wrongTokenMessage} ${styles.alert} ${styles.alertDanger}`}
            id="piano-wrong-token"
            role="alert"
          >
            Your password reset token has expired. Please try reset your
            password again.
          </div>
        ) : null}

        <div id="password-reset-form" className={styles.formWrapper} />
      </Container>
    </>
  );
};
