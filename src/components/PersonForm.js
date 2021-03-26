import React, { useState } from 'react';

const PersonForm = props => {

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');


    const submitAction = e => {
        e.preventDefault();
        if (props.persons.some(element => element.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
                props.updateContact(newName, newNumber);
                setNewName('');
                setNewNumber('');
            }
        } else {
            props.createContact(newName, newNumber);
            setNewName('');
            setNewNumber('');
        }
    }    
    
    return (
        <form onSubmit={submitAction}>
            <div>
                name: <input onChange={e => setNewName(e.target.value)} value={newName} />
            </div>
            <div>
                number: <input onChange={ e => setNewNumber(e.target.value)} value={newNumber} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>

    )
}

export default PersonForm;