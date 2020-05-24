# Create WordPress React Plugin

This is a boilerplate to speed up the development of a WordPress plugin with a React UI rendered in a top level settings page in the WP Admin.

## Features

- TypeScript. Can write modules either in TS or JavaScript
- Jest for testing, assertions, and mocks
- Enzyme for integration testing
- Integration tests mocking API requests
- REST API endpoints for a simple task list
- React hot module replacement
- CSS hot reload
- Minification of production output
- Settings page in WP Admin

# Developing

Clone this repo to your `wp-content/plugins/` directory.

Go to `WP Admin > Plugins` and activate it. This will add a new settings page "Create WP React Plugin" in the menu.

Edit `create-wordpress-react-plugin/create-wordpress-react-plugin.php` and set the `CWPRP_DEVELOPMENT_MODE` to `true`.

This allows to take advantage of the React hot module replacement and CSS hot reload.

Run `npm run watch`.

