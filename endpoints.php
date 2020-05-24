<?php
/**
 * Define endpoint to publish or draft a post.
 *
 * @since 1.0.0
 */
defined( 'ABSPATH' ) || exit;

add_action( 'rest_api_init', 'create_wp_react_plugin_endpoints' );

/**
 * Check if the current user is allowed to access the endpoints.
 * 
 * @since 1.0.0
 * 
 * @return bool
 */
function create_wp_react_plugin_permission() {
	if ( current_user_can( 'manage_options' ) ) {
		return true;
	}

	return new WP_Error(
		'invalid_user_permission',
		esc_html__(
			'You do not have the correct user permissions to perform this action.
			Please contact your site admin if you think this is a mistake.',
			'create-wp-react-plugin'
		),
		array(
			'status' => is_user_logged_in() ? 403 : 401 
		)
	);
}

/**
 * Register endpoints
 * 
 * @since 1.0.0
 */
function create_wp_react_plugin_endpoints() {
	register_rest_route( 'create-wp-react-plugin/v1', '/task', array(
		'methods' => WP_REST_Server::DELETABLE,
		'permission_callback' => 'create_wp_react_plugin_permission',
		'callback' => 'create_wp_react_plugin_task_delete',
		'args'     => array(
			'id' => array(
				'required' => true,
			),
		),
	) );
		
	register_rest_route( 'create-wp-react-plugin/v1', '/task', array(
		'methods' => WP_REST_Server::CREATABLE,
		'permission_callback' => 'create_wp_react_plugin_permission',
		'callback' => 'create_wp_react_plugin_task_create',
		'args'     => array(
			'id' => array(
				'required' => false,
			),
			'text' => array(
				'required' => true,
			),
		),
	) );
}

/**
 * Creates a task.
 * 
 * @since 1.0.0
 * 
 * @param WP_REST_REQUEST $request
 * 
 * @return WP_REST_RESPONSE $response
 */
function create_wp_react_plugin_task_create( WP_REST_Request $request ) {
	$text = $request->get_param( 'text' );
	$id = $request->get_param( 'id' ) ?: wp_hash( $text );

	$tasks = 'cwrp_tasks';
	$list = get_option( $tasks );

	$list[ $id ] = $text;

	update_option( $tasks, $list );
	
	return rest_ensure_response( array(
		'id' => $id,
		'text' => $text,
	) );
}

/**
 * Deletes a task.
 * 
 * @since 1.0.0
 * 
 * @param WP_REST_REQUEST $request
 * 
 * @return WP_REST_RESPONSE $response
 */
function create_wp_react_plugin_task_delete( WP_REST_Request $request ) {
	$tasks = 'cwrp_tasks';
	$id = $request->get_param( 'id' );

	$list = get_option( $tasks );
	unset( $list[ $id ] );

	update_option( $tasks, $list );
	
	return rest_ensure_response( array(
		'id' => $id,
	) );
}
