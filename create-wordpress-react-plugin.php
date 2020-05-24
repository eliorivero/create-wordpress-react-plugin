<?php
/**
 * Plugin Name: Create WordPress React Plugin
 * Plugin URI: https://startfunction.com/create-wordpress-react-plugin
 * Description: Boilerplate to create a WordPress plugin with a React front end.
 * Version: 1.0.0
 * Author: Elio Rivero
 * Author URI: https://startfunction.com
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Domain Path: /languages
 * Text Domain: create-wp-react-plugin
 * Requires at least: 5.4
 * Requires PHP: 7.0
 *
 * @package create-wp-react-plugin
 */

defined( 'ABSPATH' ) || exit;

add_action( 'plugins_loaded', 'create_wp_react_plugin_load' );

// Set to true when using webpack watch mode
define( 'CWPRP_DEVELOPMENT_MODE', false );

/**
 * Initialize plugin
 *
 * @since 1.0.0
 */
function create_wp_react_plugin_load() {
	require_once 'endpoints.php';
	if ( is_admin() ) {
		load_plugin_textdomain( 'create-wp-react-plugin', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		add_action( 'admin_menu', 'create_wp_react_plugin_admin' );
		add_action( 'admin_enqueue_scripts', 'create_wp_react_plugin_menu_enqueue' );
	}
}

/**
 * Creates an entry in the Admin menus.
 * 
 * @since 1.0.0
 */
function create_wp_react_plugin_admin() {
	add_menu_page(
		esc_html__( 'Create WordPress React Plugin', 'create-wp-react-plugin' ),
		esc_html__( 'Create WP React Plugin', 'create-wp-react-plugin' ),
		'manage_options',
		'create-wp-react-plugin',
		'create_wp_react_plugin_admin_page'
	);
}

/**
 * Renders an admin page.
 * .wrap is the base WordPress page container.
 * Empty h1 is a hack so WP notices are moved inside .wrap.
 * #app is where the React app will be mounted.
 * 
 * @since 1.0.0
 */
function create_wp_react_plugin_admin_page() {
	echo '<div class="wrap"><h1></h1><div id="app"></div></div>';
}

/**
 * Enqueue scripts.
 *
 * @since 1.0.0
 */
function create_wp_react_plugin_menu_enqueue() {
	$plugin_version = create_wp_react_plugin_version();
	if ( CWPRP_DEVELOPMENT_MODE ) {
		$scripts_url = 'http://localhost:3000/js/scripts.js';
	} else {
		wp_enqueue_style(
			'create-wp-react-plugin',
			plugins_url( 'css/styles.css', __FILE__ ),
			array(),
			$plugin_version
		);
		$scripts_url =  plugins_url( 'js/scripts.js', __FILE__ );
	}

	wp_enqueue_script( 
		'create-wp-react-plugin',
		$scripts_url,
		array(),
		$plugin_version,
		true
	);

	$initial_state = array(
		'restUrl'   => esc_url_raw( rest_url() ),
		'nonce'     => wp_create_nonce( 'wp_rest' ),
		'httpError' => esc_html__( 'HTTP Error', 'create-wp-react-plugin' ) . ': ',
		'saving'   => esc_html__( 'Saving', 'create-wp-react-plugin' ),
		'tasks'     => get_option( 'cwrp_tasks', array() ),
	);

	wp_add_inline_script(
		'create-wp-react-plugin',
		'window.CWPRP = JSON.parse(decodeURIComponent("' . rawurlencode( wp_json_encode( $initial_state ) ) . '"));',
		'before'
    );
}

/**
 * Get current plugin information and extract its version.
 * 
 * @since 1.0.0
 * 
 * @return string Current plugin version.
 */
function create_wp_react_plugin_version() {
	if ( ! function_exists( 'get_plugin_data' ) ) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
	return get_plugin_data( __FILE__ )['Version'];
}
