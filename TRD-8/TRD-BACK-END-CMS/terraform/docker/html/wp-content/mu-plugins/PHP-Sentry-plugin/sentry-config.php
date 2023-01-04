<?php
/**
 * Setup Sentry
 *
 */

$sentry_config = array(
	'dsn'                => getenv( 'SENTRY_DSN' ) ? (string) getenv( 'SENTRY_DSN' ) : false,
	'environment'        => getenv( 'SENTRY_ENVIRONMENT' ) ? (string) getenv( 'SENTRY_ENVIRONMENT' ) : false,
	'sample_rate'        => getenv( 'SENTRY_SAMPLE_RATE' ) ? (float) getenv( 'SENTRY_SAMPLE_RATE' ) : 1.0,
	'traces_sample_rate' => getenv( 'SENTRY_TRACES_SAMPLE_RATE' ) ? (float) getenv( 'SENTRY_TRACES_SAMPLE_RATE' ) : 1.0,
);

/**
 * Adding release when we have app version.
 *
 * @since 1.0
 * @see https://docs.sentry.io/platforms/php/configuration/releases/#setting-a-release
 */

if ( ! empty( getenv( 'APP_VERSION' ) ) ) {
	$sentry_config['release'] = sprintf( 'trd-news-back-end@%s', (string) getenv( 'APP_VERSION' ) );
}

if ( false !== $sentry_config['dsn'] && false !== $sentry_config['environment'] ) {
	\Sentry\init( $sentry_config );
}
