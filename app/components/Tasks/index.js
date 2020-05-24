/**
 * External dependencies
 */
import React, { useState } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

function useNewTask() {
    const [ newTask, setNewTask ] = useState( '' );
    return { newTask, setNewTask, onChange: e => setNewTask( e.target.value ) }
}

function Tasks() {
    const { newTask, setNewTask, ...rest } = useNewTask();
    const [tasks, setTasks] = useState( CWPRP.tasks );
    const [taskIdToEdit, setEdit] = useState(null);

    const requestRestApi = ( action, body ) => {
        return fetch( CWPRP.restUrl + 'create-wp-react-plugin/v1/task', {
            method: action,
            headers: {
                'X-WP-Nonce': CWPRP.nonce,
                'Content-type': 'application/json',
            },
            body: JSON.stringify( body ),
        } )
            .then( res => {
                if ( ! res.ok ) {
                    throw new Error( CWPRP.httpError + res.status );
                }
                return res.json();
            } )
            .then( res => {
                return res;
            } )
            .catch( err => console.error( err ) );
    }

    const taskInput = (
        <form onSubmit={ ( e ) => handleUpdate( e ) }>
            <input
                type="text"
                value={ newTask }
                { ...rest }
                autoFocus={ true }
                />
        </form>
    );

    const handleUpdate = e => {
        e.preventDefault();
        if ( null === taskIdToEdit ) {
            requestRestApi( 'POST', { text: newTask } ).then( res => {
                setTasks( {
                    ...tasks,
                    [ res.id ]: res.text
                } );
            } );
        } else {
            setTasks( Object.assign( {}, tasks, { [ taskIdToEdit ]: CWPRP.saving } ) );
            requestRestApi( 'POST', { id: taskIdToEdit, text: newTask } ).then( res => {
                setTasks( Object.assign( {}, tasks, { [ res.id ]: res.text } ) );
            } );
            setEdit( null );
        }
        setNewTask('');
    }
    
    const handleDelete = e => {
        e.preventDefault();
        const toRemove = e.target.dataset.task;
        
        requestRestApi( 'DELETE', { id: toRemove } ).then( res => {
            setTasks(
                Object.keys( tasks ).reduce(
                    ( acc, taskId ) => {
                        return {
                            ...acc,
                            ...(
                                taskId === res.id
                                    ? null
                                    : { [ taskId ]: tasks[ taskId ] }
                            )
                        }
                    },
                    {}
                )
            );
        } );
    };

    return (
        <div className="tasklist">
            {
                tasks && (
                    <ul>
                        {
                            Object.keys( tasks ).map( ( task, index ) => (
                                <li key={ `task-${index}` }>
                                    {
                                        null !== taskIdToEdit && task === taskIdToEdit
                                         ? taskInput
                                         : (
                                            <span onClick={ () => { setEdit(task); setNewTask( tasks[ task ] ); } }>
                                                <div>{ tasks[ task ] }</div>
                                            </span>
                                         )
                                    }
                                    <button data-task={ task } onClick={ handleDelete }>
                                        Delete
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                null === taskIdToEdit && taskInput
            }
        </div>
    );
}

export default Tasks
