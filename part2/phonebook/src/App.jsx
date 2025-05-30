import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')

  const filterNames = (persons, term) => {
    return persons.filter(person => person.name.toLowerCase().includes(term))
  }

  let personsToShow = persons
  if (newSearchTerm !== '') { personsToShow = filterNames(persons, newSearchTerm) }

  useEffect(() => {
    personService
      .render()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('rendered', persons.length, 'person objects')

  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      phoneNumber: newPhoneNumber
    }

    const alreadyExists = persons.find(p => p.name === newPersonObject.name)
    
    if (alreadyExists) {
      confirm(
        `${alreadyExists.name} already exists in the phonebook, replace the old number with a new one?`
      )
      console.log('confirmed, replacing entry', confirm)
      
      if (confirm) {
        const updatedPerson = { ...alreadyExists, phoneNumber: newPersonObject.phoneNumber }

        personService.update(updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name === returnedPerson.name ? updatedPerson : person))
            setNewName('')
            setNewPhoneNumber('')
          })
      }
      return
    }

    personService
      .create(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhoneNumber('')
      })
  }

  const handleRemove = (id) => {
    personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert('error deleting person:', error)
      })
  }

  // value controllers for input fields
  const onNameInputChange = event => setNewName(event.target.value)
  const onPhoneNumberInputChange = event => setNewPhoneNumber(event.target.value)
  const onSearchInputChange = event => setNewSearchTerm(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearchTerm} onChange={onSearchInputChange} />

      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        values={{name: newName, phoneNumber: newPhoneNumber}}
        onChange={{name: onNameInputChange, phoneNumber: onPhoneNumberInputChange}}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default App