import React from 'react';

const Persons = props => {

    const confirmDeletion = contact => {
        if (window.confirm(`Delete ${contact.name}`)) {
            props.deleteContact(contact.id, contact.name)
        }
    }
    
    return (
        <div>
            {props.contactList.map((contact,i) => (
                <p key={i}>
                    {contact.name} {contact.number}  <button onClick={() => confirmDeletion(contact)}>Delete</button>
                </p>
            ))}
        </div>
        
    )
}

export default Persons;