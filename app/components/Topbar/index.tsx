/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Block from 'components/Block';
import './style.scss';

Topbar.propTypes = {
    title: PropTypes.string.isRequired,
};

export interface TopbarProps {
    title: String;
}

/**
 * Displays a bar with a title and links.
 * 
 * @param {Object} props       Component properties.
 * @param {String} props.title Text to display in the topbar.
 */
export default function Topbar( props: TopbarProps ) {
    return (
        <Block className="topbar">
            <h2>{ props.title }</h2>
        </Block>
    );
}
