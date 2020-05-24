/**
 * External dependencies
 */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

/**
 * Internal dependencies
 */
import Tasks from './index';

describe( 'Tasks', () => {
    CWPRP = {
        httpError: 'HTTP Error: ',
        nonce: 'ffa915f3c8',
        restUrl: 'http://localhost/wp-json/',
        saving: 'Saving',
        tasks: {
            '3f8ced0da246645cf8c716b55309045f': 'task one',
            acae3382f33b0b863705677fb478696f: 'second task',
            f6854ec4b74662a6bf760dec369a1ddb: 'last task to address'
        }
    };

    global.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve( {
                id: 'f6854ec4b74662a6bf760dec369a1ddb'
            } ),
        })
    );

    const wrapper = mount(
        <Tasks />,
    );

    afterAll( () => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test( 'Renders list of tasks', () => {
        expect( wrapper.find( 'li' ) ).toHaveLength( 3 );
    } );
    test( 'Removes tasks on click', async done => {
        await act( async() => {
            wrapper.find( 'button' ).at( 2 ).simulate( 'click' );
        })
        wrapper.update();
        expect( global.fetch ).toHaveBeenCalledTimes( 1 );
        expect( wrapper.find( 'li' ) ).toHaveLength( 2 );

        process.nextTick(() => {
            global.fetch.mockClear();
            delete global.fetch;
            done();
        });
    } );
    test( 'Enters editing mode on click', () => {
        wrapper.find( 'span' ).at( 1 ).simulate( 'click' );
        expect( wrapper.find( 'input' ) ).toHaveLength( 1 );
    } );
    test( 'Input has the text to edit', () => {
        expect( wrapper.find( 'input' ).props().value ).toBe( 'second task' );
    } );
} );