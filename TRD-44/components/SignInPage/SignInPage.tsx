import React, { FC, useEffect } from 'react';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { Container } from '../Container';
import styles from './SignInPage.module.scss';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface SignInPageProps {
  className?: string;
}

/**
 * TRD Sign In page component.
 *
 * A simple page layout that provides a container for Piano to display
 * its `Sign In` form in an iframe.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} sign in page layout.
 */
export const SignInPage: FC<SignInPageProps> = ({
  className,
}): React.ReactElement => {
  // Once page loaded display Piano Sign In form.
  useEffect(() => {
    const tp = window?.tp || [];
    tp.push(['setUsePianoIdUserProvider', true]);
    tp.push([
      'init',
      () => {
        tp.pianoId.show({
          displayMode: 'inline',
          screen: 'login',
          containerSelector: '#signin-form',
          loggedIn: () =>
            window.location.replace(
              `${window.location.origin}/?utm_source=internal&utm_medium=subscription_login_page`,
            ),
          loggedOut: () => window.location.reload(),
        });
      },
    ]);
  });

  return (
    <>
      <ProgressIndicator percentCompleted={100} />
      <Container className={className}>
        <div id="signin-form" className={styles.formWrapper} />
      </Container>
    </>
  );
};
