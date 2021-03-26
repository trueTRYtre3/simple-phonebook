import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import contacts from './api/server';


const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [ filterContact, setFilterContact ] = useState([]);

  const [ infoEntered, setInfoEntered ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ successName, setSuccessName ] = useState({});
  const [ serverInfo, setServerInfo ] = useState('');

  useEffect(() => {
    contacts
      .getAll()
      .then(per => {
        setPersons(per)   
      })
  }, [])

  const createContact = (name, newNumber) => {
    const newContact = {
      name: name,
      number: newNumber
    }
    contacts
      .create(newContact)
      .then(response => {
        setPersons(persons.concat(response));
        setInfoEntered(true);
        setSuccess(true);
        setSuccessName({name: name, word: 'Added'});
      })
  }

  const updateContact = (name, newNumber) => {
    const contact = persons.find(person => person.name === name);
    const changeContact = {...contact, number: newNumber}

    contacts
      .update(contact.id, changeContact)
      .then(response => {
        setPersons(persons.map(person => person.name !== name ? person : response));
        setInfoEntered(true);
        setSuccess(true);
        setSuccessName({name: name, word: 'Updated'});
      })
  }

  const deleteContact = (id, name) => {
    contacts
      .deleteId(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setInfoEntered(true);
        setSuccessName({name: name, word: 'Deleted'});
      })
      .catch(error => {
        // setErrorMessage()
        setInfoEntered(true);
        setSuccess(false);
        setServerInfo(`Information of ${name} has already been removed from the server`);
        setPersons(persons.filter(person => person.id !== id));
      })
  }
 
  const serverSuccess = <h2 className="message">{successName.word} {successName.name}</h2>;
  const serverFail = <h2 className="errorMessage">{serverInfo}</h2>;

  const contactList = filterContact.length !== 0 ? filterContact : persons;
  return (
    <div>
      <h1>Phonebook</h1>
        {infoEntered && (success ? serverSuccess : serverFail)}
        <Filter 
          setFilterContact={setFilterContact} 
          persons={persons}
        />
      <h1>Add New Contact</h1>
        <PersonForm 
          persons={persons} 
          setPersons={setPersons}
          updateContact={updateContact}
          createContact={createContact}
        />
      <h1>Contact List</h1>
        <Persons 
          contactList={contactList} 
          deleteContact={deleteContact} 
        />
    </div>
  )
}

export default App;

// {
//   "name": "Arto Hellas",
//   "number": "040-123456",
//   "id": 1
// },
// {
//   "name": "Ada Lovelace",
//   "number": "39-44-5323523",
//   "id": 2
// },
// {
//   "name": "Dan Abramov",
//   "number": "12-43-234345",
//   "id": 3
// }