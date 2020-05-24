/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

Block.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType( [ PropTypes.object, PropTypes.array ] ).isRequired,
};

Block.defaultProps = {
    className: '',
};

export interface BlockProps {
    children: React.ReactNode;
    className: String;
}

/**
 * Displays a bar with a title and links.
 * 
 * @param {Object} props          Component properties.
 * @param {Object} props.children Elements wrapped by this component.
 * @param {Object} props.className Elements wrapped by this component.
 */
export default function Block( props: BlockProps ) {
    return (
        <div className={ `block ${props.className}` }>
            { props.children }
        </div>
    );
}
