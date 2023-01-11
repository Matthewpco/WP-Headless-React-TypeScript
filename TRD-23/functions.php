<?php

use CPTS\IssuesCPT;
use CPTS\SponsorCPT;
use CPTS\EventCPT;
use CPTS\CareersCPT;
use CPTS\GalleryCPT;
use CPTS\VideoCPT;
use Taxonomies\AdvertiserTerm;
use Taxonomies\CompanyTerm;
use Taxonomies\EventTypeTerm;
use Taxonomies\MagazineCategoryTerm;
use Taxonomies\MarketTerm;
use Taxonomies\NeighborhoodTerm;
use Taxonomies\PeopleTerm;
use Taxonomies\PropertyTerm;
use Taxonomies\PropertyTypeTerm;
use Taxonomies\RegionTerm;
use Taxonomies\VenueTerm;
use Taxonomies\SectorTerm;
use shortcodes\ShortCodes;

define('TEXTDOMAIN', 'the-real-deal');
define('CPTs', ['Post', 'Sponsor', 'Magazine', 'Event']);
define('PIANO_APPLICATION_ID', 'yVAGWJfOMP');
define('PIANO_API_TOKEN', 'BthiI1pOZNljAj0K987rRQwvJq8qDbAh22dxOOpu');

$classes = [
    // WPGraphQL
    'theme-setup/wpgraphql/GraphQL_Autoload.php',
    'theme-setup/wpgraphql/GraphQL_Init.php',
    // CPTs
    'theme-setup/cpts/BaseCPT.php',
    'theme-setup/cpts/SponsorCPT.php',
    'theme-setup/cpts/IssuesCPT.php',
    'theme-setup/cpts/EventCPT.php',
    'theme-setup/cpts/GalleryCPT.php',
    'theme-setup/cpts/CareersCPT.php',
    'theme-setup/cpts/VideoCPT.php',
    // Taxonomies
    'theme-setup/taxonomies/BaseTerm.php',
    'theme-setup/taxonomies/AdvertiserTerm.php',
    'theme-setup/taxonomies/NeighborhoodTerm.php',
    'theme-setup/taxonomies/PropertyTerm.php',
    'theme-setup/taxonomies/PropertyTypeTerm.php',
    'theme-setup/taxonomies/CompanyTerm.php',
    'theme-setup/taxonomies/EventTypeTerm.php',
    'theme-setup/taxonomies/PeopleTerm.php',
    'theme-setup/taxonomies/RegionTerm.php',
    'theme-setup/taxonomies/VenueTerm.php',
    'theme-setup/taxonomies/SectorTerm.php',
    'theme-setup/taxonomies/MagazineCategoryTerm.php',
    'theme-setup/taxonomies/MarketTerm.php',
    // Custom ShortCodes
    'theme-setup/shortcodes/ShortCodes.php',
    //feeds
    'theme-setup/feed/Init.php',
];
foreach ($classes as $file) {
    $filepath = locate_template($file);
    if ($filepath) {
        require_once $filepath;
    }
}

$theme_includes = [
    '/theme-setup/acf-blocks.php',
    '/theme-setup/customizer.php',
    '/theme-setup/acf-customizer.php',
    '/theme-setup/enqueues.php',
    '/theme-setup/helpers.php',
    '/theme-setup/links.php',
    '/theme-setup/menus.php',
    '/theme-setup/wp-columns.php',
    '/theme-setup/options-page.php',
    '/theme-setup/yoast.php',
    '/theme-setup/rest.php',
    '/theme-setup/on_homepage_publish_date.php',
    '/theme-setup/wpcf7.php',
];
foreach ($theme_includes as $file) {
    $filepath = locate_template($file);
    if ($filepath) {
        require_once $filepath;
    }
}

add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_theme_support('wp-block-styles');
    add_theme_support('widgets');
    add_theme_support('widgets-block-editor');
});

// Init all CPTs and Taxonomies
add_action('init', function () {
    // CPTs init
    new SponsorCPT();
    new IssuesCPT();
    new EventCPT();
    new GalleryCPT();
    new CareersCPT();
    new VideoCPT();

    // Taxonomies init
    new AdvertiserTerm();
    new NeighborhoodTerm();
    new PropertyTerm();
    new PropertyTypeTerm();
    new CompanyTerm();
    new EventTypeTerm();
    new PeopleTerm();
    new RegionTerm();
    new VenueTerm();
    new SectorTerm();
    new MagazineCategoryTerm();
    new MarketTerm();

    // Custom ShortCodes
    new ShortCodes();

    // Feeds
    new feed\Init();

    if (class_exists('WPGraphQL\Extensions\Cache\CacheManager')) {
        require_once locate_template('/theme-setup/GQLCache/init.php');
    }
});

// ACF fields sync with JSON files
add_filter('acf/settings/save_json', function ($path) {
    $path = get_stylesheet_directory() . '/acf-json';
    return $path;
});
add_filter('acf/settings/load_json', function ($paths) {
    unset($paths[0]);
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
});

/*
* Add custom Meta Tag to header to fix issues with social share preview twitter:image
*/
function custom_header_metadata() {
    ?>
      <meta name="twitter:image" content="https://preview.therealdeal.com/wp-content/uploads/2023/01/trd-logo.webp" />
    <?php
  }
add_action( 'wp_head', 'custom_header_metadata' );
  
if ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) {

    /* Change Open Graph image URLs in Yoast SEO to fix issues with social share preview og:image
    * Credit: Yoast Development team
    */ 
	add_filter( 'wpseo_opengraph_image', 'change_opengraph_image_url' );

    function change_opengraph_image_url( $url ) {
        return str_replace('https://preview.therealdeal.com/wp-content/uploads/2022/08/importance-of-deadlines.jpg.optimal.webp', 'https://preview.therealdeal.com/wp-content/uploads/2023/01/trd-logo.webp', $url);
    }
}