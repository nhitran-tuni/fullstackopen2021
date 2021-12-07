import React, { useEffect, useState } from 'react';

import PhoneList from './components/PhoneList';

import service from "./services/services";

const App = () => {
  const INIT = {
    name: "",
    number: ""
  }

  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState(INIT);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ text: "", error: false })

  useEffect(() => {
    service
      .getAllPhoneList()
      .then(res => setPersons(res.data))
      .catch(err => console.log(err))
  },[]);

  const handleAddBtnClicked = e => {
    e.preventDefault();
    const existed = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase());
    if (existed) {
      if (window.confirm(`${existed.name} is already added to the phonebook, replace old number with the new one?`)) {
        service
          .updatePerson(existed.id, {...existed, number: newPerson.number})
          .then(res => {
            setPersons(persons.map(p => p.id === res.data.id ? res.data : p))
            setMessage({...message, text: `Number of ${res.data.name} is changed successfully`})
            setTimeout(() => setMessage({...message, text: ""}), 5000)
          })
          .catch(err => {
            console.log(err)
            setMessage({ text: `${existed.name} is already removed`, error: true })
            setPersons(persons.filter(person => person.id !== existed.id))
            setTimeout(() => setMessage({text: "", error: false}), 5000)
          })
      }
    } else {
      service
        .createNewPerson(newPerson)
        .then(res => {
          setPersons([...persons, res.data])
          setMessage({...message, text: `Add ${res.data.name}`})
          setTimeout(() => setMessage({...message, text: ""}), 5000)
        })
        .catch(err => console.log(err))
    }
    setNewPerson(INIT);
  }

  const handleDeleteBtnClicked = e => {
    e.preventDefault()
    const id = parseInt(e.target.value,10);
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      const p = persons.find(p => p.id === id);
      service
        .deletePerson(id)
        .then(() => {
          setMessage({ text: `Delete ${p.name}`, error: true })
          setTimeout(() => setMessage({text: "", error: false}), 5000)
        })
        .catch(err => {
          setMessage({ text: `${p.name} is already removed`, error: true })
          setTimeout(() => setMessage({text: "", error: false}), 5000)
        })
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PhoneList
        filter={filter}
        setFilter={setFilter}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        handleAddBtnClicked={handleAddBtnClicked}
        handleDeleteBtnClicked={handleDeleteBtnClicked}
        persons={persons}
        message={message}
      />
    </div>
  )
}

export default App
