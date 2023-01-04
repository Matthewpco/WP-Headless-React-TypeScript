import React, { FC, useEffect } from 'react';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { Container } from '../Container';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface SignOutPageProps {
  className?: string;
}

/**
 * TRD Sign Out page component.
 *
 * A simple page layout that provides Piano `Sign Out` functionality.
 *
 * @since 1.3.5
 * @returns {React.ReactElement} sign out page layout.
 */
export const SignOutPage: FC<SignOutPageProps> = ({
  className,
}): React.ReactElement => {
  const redirectDelayInSec = 10;

  // Once page loaded logout the user and redirect to Home page
  // after `redirectDelayInSec` timeout.
  useEffect(() => {
    const tp = window.tp || [];

    tp.push([
      'init',
      () => {
        tp.pianoId.logout();
        window.setTimeout(() => {
          window.location.replace(
            `${window.location.origin}/?utm_source=internal&utm_medium=subscription_logout_page`,
          );
        }, redirectDelayInSec * 1000);
      },
    ]);
  });

  return (
    <>
      <ProgressIndicator percentCompleted={100} />
      <Container className={className}>
        <h1>
          Logging out from <em>The Real Deal</em>...
        </h1>
      </Container>
    </>
  );
};
