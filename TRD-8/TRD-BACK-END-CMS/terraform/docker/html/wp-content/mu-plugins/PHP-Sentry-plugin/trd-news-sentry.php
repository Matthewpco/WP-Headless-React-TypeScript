<?php
/**
 * Plugin Name: TRD News Sentry
 * Plugin URI: https://preview.therealdeal.com/
 * Description: Extends error collection with Sentry
 * Version: 1.0
 * Author: The Real Deal Digital
 * Author URI: https://www.therealdeal.com
 * Text Domain: trd-news-sentry
 *
 */

 if ( ! defined( 'ABSPATH' ) ) {
	die( 'Invalid request.' );
}

// Console logging function for debugging
function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

/**
 * The plugin directory path.
 */
define( 'TRD_NEWS_SENTRY_PATH', plugin_dir_path( __FILE__ ) );

// Rather than use ABSPATH, we're using a relative path based on TRD_PRO_PATH
// because ABSPATH is not present at the time of running PHPUnit tests. Using TRD_PRO_PATH
// works to support the application as well as PHPUnit tests.
require_once TRD_NEWS_SENTRY_PATH . '../../../vendor/autoload.php'; // Load Composer dependencies.
require_once TRD_NEWS_SENTRY_PATH . 'sentry-config.php'; // Load Sentry config to track errors.