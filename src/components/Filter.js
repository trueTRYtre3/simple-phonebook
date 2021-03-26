import React from 'react';

const Filter = (props) => {
    
    const filterContacts = e => {
        props.setFilterContact(props.persons.filter(element => element.name === e.target.value));
    }

    return (
        <div>
            Filter shown with:  <input 
                onChange={filterContacts}
            />
        </div>
    )
}

export default Filter;