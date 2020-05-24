# Create WordPress React Plugin

This is a boilerplate to speed up the development of a WordPress plugin with a React UI rendered in a top level settings page in the WP Admin.

## Features

- TypeScript. Can write modules either in TS or JavaScript
- Jest for testing, assertions, and mocks. Includes React Test Renderer for rendering snapshots
- async/await Babel plugin to work with act() and be able to test React hooks without warnings
- Enzyme for integration testing
- Integration tests mocking API requests
- REST API endpoints and React component for a complete CRUD task list
- React hot module replacement preserving state
- CSS/SASS hot reload
- Minification of production output
- Settings page in WP Admin

# Development

Clone this repo to your `wp-content/plugins/` directory.

Go to `WP Admin > Plugins` and activate it. This will add a new settings page "Create WP React Plugin" to the WP Admin menu.

Edit `create-wordpress-react-plugin/create-wordpress-react-plugin.php` and set the `CWPRP_DEVELOPMENT_MODE` to `true`.

This allows to take advantage of the React hot module replacement and styles hot reload.

Run `npm run watch`.

# Production Build

Edit `create-wordpress-react-plugin/create-wordpress-react-plugin.php` and set the `CWPRP_DEVELOPMENT_MODE` to `false`.

This will load files from the `js/` and `css/` directories in the plugin.

Run `npm run build`.

-----

Made by [StartFunction.com](https://startfunction.com) Check our blog for articles on [software engineering, front end development, and WordPress](https://startfunction.com/blog/).
