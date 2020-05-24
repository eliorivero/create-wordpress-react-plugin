/**
 * External dependencies
 */
import React from 'react';
import { hot } from 'react-hot-loader/root';

/**
 * Internal dependencies
 */
import Topbar from 'components/Topbar';
import Block from 'components/Block';
import Tasks from 'components/Tasks';
import './style.scss';

export default hot(
    function App() {
        return (
            <div className="create-wp-react-plugin">
                <Topbar title="Create WordPress React Plugin" />
                <Block>
                    <p>Your react app goes here</p>
                </Block>
                <Block>
                    <h3>Tasks</h3>
                    <Tasks />
                </Block>
            </div>
        );
    }
);
