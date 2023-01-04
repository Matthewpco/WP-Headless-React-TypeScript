import React, { FC, useEffect } from 'react';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { Container } from '../Container';
import styles from './RegisterPage.module.scss';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface RegisterPageProps {
  className?: string;
}

/**
 * TRD Register page component.
 *
 * A simple page layout that provides container for Piano `Register` form.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} register page layout.
 */
export const RegisterPage: FC<RegisterPageProps> = ({
  className,
}): React.ReactElement => {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(['setUsePianoIdUserProvider', true]);
    tp.push([
      'init',
      () =>
        tp.pianoId.show({
          displayMode: 'inline',
          screen: 'register',
          containerSelector: '#register-form',
          loggedIn: () =>
            window.location.replace(
              `${window.location.origin}/?utm_source=internal&utm_medium=subscription_register_page`,
            ),
          registrationSuccess: () =>
            window.location.replace(
              `${window.location.origin}/my-account/?utm_source=internal&utm_medium=subscription_register_page`,
            ),
          loggedOut: () => window.location.reload(),
        }),
    ]);
  });

  return (
    <>
      <ProgressIndicator percentCompleted={100} />
      <Container className={className}>
        <div id="register-form" className={styles.formWrapper} />
      </Container>
    </>
  );
};
